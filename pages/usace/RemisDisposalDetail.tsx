import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_DISPOSALS, USACE_ASSETS, USACE_APPRAISALS, USACE_ENVIRONMENTAL, USACE_CLAIMS, DOCUMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Building, FileText, CheckCircle, AlertTriangle, Scale, Leaf, Trash2, History, Paperclip, ShieldCheck, Lock } from 'lucide-react';
import { DisposalRecord, AuditEvent } from '../../types';
import { DisposalModal } from './components/DisposalModal';
import { validateDisposalAuthorization, validateEnvironmentalForDisposal, validateDisposalProceeds, validateDisposalClean } from '../../utils/usaceRules';

const LIFECYCLE_STATES: DisposalRecord['lifecycleState'][] = ['Initiated', 'Excess Determined', 'Pending Authorization', 'Authorized', 'Executed', 'Closed'];

export const RemisDisposalDetail: React.FC = () => {
    const { disposalId } = useParams<{ disposalId: string }>();
    const navigate = useNavigate();
    const [disposal, setDisposal] = useState<DisposalRecord | undefined>(USACE_DISPOSALS.find(d => d.id === disposalId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!disposal) {
        return <div className="p-6">Disposal record not found. <Link to="/usace/disposals" className="text-blue-600">Return to Pipeline</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === disposal.assetId);
    
    // Derived Data for Integration (5.6.2)
    const relatedAppraisals = USACE_APPRAISALS.filter(a => disposal.appraisalIds.includes(a.id));
    const relatedEnvSites = USACE_ENVIRONMENTAL.filter(e => disposal.environmentalSiteIds.includes(e.id));
    const relatedClaims = USACE_CLAIMS.filter(c => disposal.legalClaimIds.includes(c.id));
    const relatedDocs = DOCUMENTS.filter(d => disposal.documentIds.includes(d.id));

    const handleSave = (updatedRecord: Partial<DisposalRecord>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'James West', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setDisposal(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: DisposalRecord['lifecycleState']) => {
        // Rule 2: Check Authorization prerequisites
        if (newState === 'Authorized') {
            const ruleCheck = validateDisposalAuthorization(disposal);
            if (!ruleCheck.allowed) {
                alert(ruleCheck.reason);
                return;
            }
        }

        // Rule 7 & 49: Check Environmental Clearance
        if (newState === 'Executed') {
            const ruleCheck = validateEnvironmentalForDisposal(disposal, USACE_ENVIRONMENTAL);
            if (!ruleCheck.allowed) {
                alert(ruleCheck.reason);
                return;
            }
            const cleanCheck = validateDisposalClean(disposal, USACE_ENVIRONMENTAL);
            if(!cleanCheck.allowed) {
                alert(cleanCheck.reason);
                if(!confirm("Simulation Override: Proceed with outstanding environmental actions?")) return;
            }

            if (disposal.authorizationStatus !== 'Approved') {
                alert('Compliance Error: Cannot transition to Executed status without approved Authorization.');
                return;
            }
        }

        // Rule 27: Check Proceeds
        if (newState === 'Closed') {
            const proceedsCheck = validateDisposalProceeds(disposal);
            if (!proceedsCheck.allowed) {
                alert(proceedsCheck.reason);
                // Allow override
                if(!confirm("Simulation Override: Proceed closing without proceeds?")) return;
            }
        }

        const reason = `Lifecycle state advanced from ${disposal.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'District Commander', // Simulated Approval Role
            action: 'State Transition',
            details: reason,
        };
        setDisposal(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(disposal.lifecycleState);

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 italic font-black">
            <DisposalModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} disposal={disposal} />
            
            {/* Command Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b-2 border-slate-900 relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-red-600 pulse-mission" />
                <div className="space-y-4">
                    <button 
                        onClick={() => navigate('/usace/disposals')} 
                        className="flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-[0.4em] mb-4 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> COMMAND_PIPELINE_RETURN
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-600 rounded-none text-white shadow-2xl shadow-red-900/40">
                            <Trash2 size={24} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic mb-2">CASE_ID: {disposal.id}</h1>
                            <div className="flex items-center gap-3 italic">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-60">ASSET_VECTOR</span>
                                <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                <span className="text-[12px] font-mono font-black text-blue-600 uppercase tracking-tighter italic">{asset?.name} [#{asset?.rpuid}]</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1 italic opacity-60">LIFECYCLE_POSITION</span>
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-2 bg-slate-950 text-white text-[11px] font-black uppercase tracking-widest italic border border-white/10 shadow-2xl">
                                {disposal.lifecycleState}
                            </span>
                            <RegulatoryBadge refs={['AR 405-90', 'ER 405-1-12']} />
                        </div>
                    </div>
                    <button onClick={() => setIsEditModalOpen(true)} className="btn-pro-primary h-auto py-4 px-8 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-blue-500/20">
                        <Edit size={16} /> MODIFY_RECORD_MD
                    </button>
                </div>
            </div>

            <div className="flex flex-col bg-white border-2 border-slate-200 overflow-hidden shadow-2xl">
                {/* Tactical Tabs */}
                <div className="flex border-b-2 border-slate-200 bg-slate-50 italic">
                    {[
                        { id: 'overview', label: 'CMD_OVERVIEW', icon: Activity },
                        { id: 'determinations', label: 'AUTH_DETERMINATIONS', icon: ShieldCheck },
                        { id: 'artifacts', label: 'LINKED_VECTORS', icon: Paperclip },
                        { id: 'history', label: 'AUDIT_LOG_IMMUTABLE', icon: Lock }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)} 
                            className={`flex items-center gap-3 px-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative group ${activeTab === tab.id ? 'bg-white text-slate-900 border-r-2 border-slate-200' : 'text-slate-400 hover:text-slate-600 border-r border-slate-100'}`}
                        >
                            {activeTab === tab.id && <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />}
                            <tab.icon size={14} className={activeTab === tab.id ? 'text-blue-600' : 'text-slate-300'} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-12">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-1 h-6 bg-red-600" />
                                    <h3 className="font-black text-xl text-slate-900 uppercase tracking-tighter italic">CORE_METADATA</h3>
                                </div>
                                <div className="space-y-6">
                                    <DetailItem label="INIT_ORG_VECTOR" value={disposal.initiatingOrg} icon={Building} />
                                    <DetailItem label="PROPOSED_MTD" value={disposal.proposedMethod} icon={Trash2} />
                                    <div className="pt-4 border-t border-slate-100">
                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 block italic leading-none">STRATEGIC_RATIONALE</span>
                                        <p className="text-[14px] font-black text-slate-900 uppercase tracking-tight italic bg-slate-50 p-6 border-l-4 border-slate-900 leading-relaxed shadow-sm">
                                            {disposal.disposalRationale}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-1 h-6 bg-blue-600" />
                                    <h3 className="font-black text-xl text-slate-900 uppercase tracking-tighter italic">LIFECYCLE_TRAJECTORY</h3>
                                </div>
                                <div className="space-y-4">
                                    {LIFECYCLE_STATES.map((state, i) => (
                                        <div key={state} className={`flex items-center gap-6 p-4 border transition-all ${i === currentStateIndex ? 'bg-blue-600 border-blue-700 text-white shadow-xl scale-105' : i < currentStateIndex ? 'bg-slate-50 border-slate-100 opacity-60' : 'border-slate-100 opacity-20'}`}>
                                            <div className={`w-10 h-10 flex items-center justify-center text-[14px] font-black italic border-2 ${i === currentStateIndex ? 'border-white' : 'border-slate-400 text-slate-400'}`}>
                                                {(i + 1).toString().padStart(2, '0')}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={`text-[12px] font-black uppercase tracking-widest ${i === currentStateIndex ? 'text-white' : 'text-slate-900'}`}>{state}</span>
                                                {i === currentStateIndex && <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/60 animate-pulse mt-1 italic">ACTIVE_PHASE_OVERSIGHT</span>}
                                            </div>
                                            {i < currentStateIndex && <CheckCircle size={18} className="ml-auto text-emerald-500" />}
                                        </div>
                                    ))}
                                </div>
                                {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                    <button 
                                        onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} 
                                        className="w-full py-6 bg-slate-950 text-white font-black text-[12px] uppercase tracking-[0.4em] italic shadow-2xl hover:bg-slate-900 transition-all group flex items-center justify-center gap-4 border border-white/10"
                                    >
                                        EXECUTE_PHASE_TRANSITION <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-1 h-6 bg-slate-950" />
                                    <h3 className="font-black text-xl text-slate-900 uppercase tracking-tighter italic">TEMPORAL_MARKERS</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="group relative p-6 bg-slate-50 border border-slate-200 transition-all hover:bg-white hover:shadow-xl">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900" />
                                        <DetailItem label="DET_EXCESS_TIMESTAMP" value={disposal.excessDeterminationDate || 'PENDING_SIGNAL'} icon={History} />
                                    </div>
                                    <div className="group relative p-6 bg-slate-50 border border-slate-200 transition-all hover:bg-white hover:shadow-xl">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
                                        <DetailItem label="AUTH_TIMESTAMP" value={disposal.authorizationDate || 'PENDING_SIGNAL'} icon={ShieldCheck} />
                                    </div>
                                    <div className="group relative p-6 bg-slate-50 border border-slate-200 transition-all hover:bg-white hover:shadow-xl">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600" />
                                        <DetailItem label="CLOSURE_FINAL_MARK" value={disposal.completionDate || 'NOT_REACHED'} icon={CheckCircle} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'determinations' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="bg-slate-950 p-10 border border-white/10 shadow-2xl italic">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-red-600 text-white">
                                        <FileText size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">DETERMINATION_LOG</h3>
                                </div>
                                <div className="space-y-10">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mb-2 italic">DATE_FILED</span>
                                            <span className="text-lg font-mono font-black text-white tracking-tighter">{disposal.excessDeterminationDate || '-'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mb-2 italic">AUTH_OFFICIAL</span>
                                            <span className="text-lg font-black text-white leading-tight uppercase tracking-widest">{disposal.excessDeterminationAuthority || '-'}</span>
                                        </div>
                                    </div>
                                    <div className="pt-8 border-t border-white/5">
                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mb-4 block italic">JUSTIFICATION_VECTOR</span>
                                        <p className="text-[14px] font-black text-white/80 leading-relaxed bg-white/5 p-8 border-l-4 border-red-600 uppercase italic">
                                            {disposal.excessDeterminationJustification || 'NO_RECORDED_JUSTIFICATION'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-10 border-2 border-slate-900 shadow-2xl italic">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-slate-950 text-white">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">AUTHORITY_GATE</h3>
                                </div>
                                <div className="space-y-10">
                                    <div className="flex items-center justify-between p-6 bg-slate-900 text-white transform rotate-1">
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em] italic">VALIDATION_STATUS</span>
                                        <span className={`px-6 py-2 text-[14px] font-black uppercase tracking-widest italic border border-white/20 ${disposal.authorizationStatus === 'Approved' ? 'bg-emerald-600 animate-pulse shadow-lg' : 'bg-amber-600'}`}>
                                            {disposal.authorizationStatus}
                                        </span>
                                    </div>
                                    <div className="space-y-8 pt-4">
                                        <DetailItem label="COMMAND_OFFICIAL" value={disposal.authorizingOfficial || 'PENDING_ASSIGNMENT'} icon={Building} />
                                        <div className="p-10 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center italic bg-slate-50/50">
                                            <Terminal size={32} className="text-slate-300 mb-4" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-2">AUTH_STAMP_VOID</span>
                                            <span className="text-[8px] font-mono font-black text-slate-300 uppercase">SYSTEM_REQUIRES_DSIGN_V4</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'artifacts' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-10">
                                <div>
                                    <div className="flex items-center justify-between mb-6 border-b-2 border-slate-900 pb-4 italic">
                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-4">
                                            <Sigma size={20} className="text-blue-600"/> APPRAISAL_VECTOR_LOCK
                                        </h3>
                                        <span className="text-[9px] font-mono font-black text-slate-400 uppercase">REG_5.1.5</span>
                                    </div>
                                    {relatedAppraisals.length > 0 ? (
                                        <div className="grid gap-6">{relatedAppraisals.map(a => (
                                            <div key={a.id} className="p-8 border-2 border-slate-200 bg-white hover:border-blue-600 transition-all group cursor-pointer relative shadow-sm hover:shadow-2xl">
                                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
                                                <div className="flex justify-between items-center italic">
                                                    <div>
                                                        <p className="font-black text-slate-900 uppercase tracking-widest text-[14px] mb-2 italic">{a.purpose}::APPRAISAL_RECORD</p>
                                                        <p className="text-[11px] font-mono font-black text-emerald-600 uppercase tracking-tighter font-black italic shadow-emerald-500/20">VAL_MARK_USD: ${a.appraisedValue.toLocaleString()}</p>
                                                    </div>
                                                    <Link to={`/usace/appraisals/${a.id}`} className="p-3 bg-slate-950 text-white transform group-hover:rotate-45 transition-transform"><ArrowRight size={18} /></Link>
                                                </div>
                                            </div>
                                        ))}</div>
                                    ) : (
                                        <div className="p-12 border-2 border-dashed border-slate-100 flex flex-col items-center justify-center opacity-40 italic">
                                            <Activity size={32} className="mb-4 text-slate-300" />
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">NO_APPRAISAL_VECTOR</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-6 border-b-2 border-slate-900 pb-4 italic">
                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-4">
                                            <Leaf size={20} className="text-emerald-600"/> ENVIRONMENTAL_IMPACT_SCAN
                                        </h3>
                                        <span className="text-[9px] font-mono font-black text-slate-400 uppercase">REG_SEC_49</span>
                                    </div>
                                    {relatedEnvSites.length > 0 ? (
                                        <div className="grid gap-6">{relatedEnvSites.map(e => (
                                            <div key={e.id} className="p-8 border-2 border-slate-200 bg-white hover:border-emerald-600 transition-all group cursor-pointer relative shadow-sm hover:shadow-2xl">
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600" />
                                                <div className="flex justify-between items-center italic">
                                                    <div className="flex items-center gap-6">
                                                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-none">
                                                            <Activity size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-slate-900 uppercase tracking-widest text-[14px] mb-2 italic">{e.siteName}</p>
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-black italic">{e.status}</p>
                                                        </div>
                                                    </div>
                                                    <Link to="/usace/environmental" className="p-3 bg-slate-950 text-white transform group-hover:translate-x-2 transition-transform"><ArrowRight size={18} /></Link>
                                                </div>
                                            </div>
                                        ))}</div>
                                    ) : (
                                        <div className="p-12 border-2 border-dashed border-slate-100 flex flex-col items-center justify-center opacity-40 italic">
                                            <Activity size={32} className="mb-4 text-slate-300" />
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">CLEAN_SITE_VECTOR</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div>
                                    <div className="flex items-center justify-between mb-6 border-b-2 border-slate-900 pb-4 italic">
                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-4">
                                            <Scale size={20} className="text-red-600"/> LEGAL_CLAIM_INTERCEPTION
                                        </h3>
                                        <span className="text-[9px] font-mono font-black text-slate-400 uppercase">DEPT_JUSTICE::V3</span>
                                    </div>
                                    {relatedClaims.length > 0 ? (
                                        <div className="grid gap-6">{relatedClaims.map(c => (
                                            <div key={c.id} className="p-8 border-2 border-slate-200 bg-white hover:border-red-600 transition-all group cursor-pointer relative shadow-sm hover:shadow-2xl">
                                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
                                                <div className="flex justify-between items-center italic">
                                                    <div className="flex items-center gap-6">
                                                        <div className="p-2 bg-red-50 text-red-600">
                                                            <AlertTriangle size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-slate-900 uppercase tracking-widest text-[14px] mb-2 italic">{c.claimType}::CLAIM_VECTOR</p>
                                                            <p className="text-[11px] font-black text-red-600 uppercase tracking-tighter font-black italic">{c.claimant}</p>
                                                        </div>
                                                    </div>
                                                    <Link to="/usace/legal" className="p-3 bg-slate-950 text-white transform group-hover:scale-110 transition-transform"><ArrowRight size={18} /></Link>
                                                </div>
                                            </div>
                                        ))}</div>
                                    ) : (
                                        <div className="p-12 border-2 border-dashed border-slate-100 flex flex-col items-center justify-center opacity-40 italic">
                                            <ShieldCheck size={32} className="mb-4 text-slate-300" />
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">NO_LITIGATION_THREAT</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-6 border-b-2 border-slate-900 pb-4 italic">
                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic flex items-center gap-4">
                                            <FileText size={20} className="text-slate-900"/> ARTIFACT_REPOSITORY
                                        </h3>
                                        <span className="text-[9px] font-mono font-black text-slate-400 uppercase">ENCRYPTED_DATA_SHA256</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        {relatedDocs.map(d => (
                                            <div key={d.id} className="p-6 bg-slate-900 border border-white/5 flex justify-between items-center hover:bg-slate-800 transition-all group italic cursor-pointer">
                                                <div className="flex items-center gap-6">
                                                    <Paperclip size={18} className="text-blue-500 group-hover:rotate-12 transition-transform" />
                                                    <div className="flex flex-col">
                                                        <span className="text-[12px] font-black text-white uppercase tracking-widest mb-1 italic">{d.name}</span>
                                                        <span className="text-[9px] font-mono font-black text-white/40 uppercase tracking-widest italic">{d.type}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <div className="w-1 h-8 bg-white/5" />
                                                    <button className="text-[12px] font-black text-blue-500 uppercase tracking-[0.2em] italic hover:text-white transition-colors">PULL_REMOTE</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="max-w-4xl italic">
                            <div className="flex items-center justify-between mb-12 border-b-2 border-slate-900 pb-6">
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">IMMUTABLE_AUDIT_TRAIL</h3>
                                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">
                                        <Lock size={12} className="text-blue-600" /> ENCRYPTION_LAYER_v8.4_ACTIVE
                                    </div>
                                </div>
                                <Activity size={32} className="text-slate-100" />
                            </div>
                            
                            <div className="space-y-12 relative">
                                <div className="absolute left-[20px] top-4 bottom-4 w-px bg-slate-200" />
                                {(disposal.history || []).map((event, i) => (
                                    <div key={i} className="flex gap-10 group relative">
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className={`w-10 h-10 border-2 flex items-center justify-center transform transition-transform group-hover:rotate-45 ${i === 0 ? 'bg-blue-600 border-blue-700 text-white animate-pulse shadow-2xl' : 'bg-white border-slate-200 text-slate-400'}`}>
                                                <History size={16} />
                                            </div>
                                        </div>
                                        <div className="flex-1 pb-12 border-b border-slate-50 last:border-b-0 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest italic">{event.action}</span>
                                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] font-black italic">OPERATOR: {event.user}</span>
                                                </div>
                                                <span className="text-[11px] font-mono font-black text-slate-400 uppercase italic bg-slate-50 px-4 py-1 tracking-tighter">{event.timestamp}</span>
                                            </div>
                                            {event.details && (
                                                <div className="relative">
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900" />
                                                    <div className="p-8 bg-slate-50 italic text-[14px] font-black text-slate-900 uppercase leading-relaxed shadow-inner border border-slate-100">
                                                        {event.details}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Terminal Status bar */}
            <div className="bg-slate-950 p-6 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.6em] italic text-white/30 border border-white/5 shadow-2xl">
                <div className="flex items-center gap-6">
                    <Terminal size={14} className="text-blue-500 animate-pulse" />
                    DISPOSAL_SEC_TERMINAL_V9::READY_FOR_INPUT
                </div>
                <div className="flex gap-12">
                    <span className="text-white/10">CORE_HASH::0x84A2F9ED0...</span>
                    <span>HOD::JAMES_WEST_CMD</span>
                </div>
            </div>
        </div>
    );
};