import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ENVIRONMENTAL, USACE_ASSETS, DOCUMENTS, FUND_TRANSACTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Building, Calendar, Leaf, AlertTriangle, ShieldCheck, CheckCircle, Lock, FileText, Activity, Database, Target, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { EnvironmentalSite, AuditEvent } from '../../types';
import { EnvironmentalModal } from './components/EnvironmentalModal';

const LIFECYCLE_STATES: EnvironmentalSite['lifecycleState'][] = ['Identified', 'Assessed', 'Under Remediation', 'Compliant', 'Closed'];

export const RemisEnvironmentalDetail: React.FC = () => {
    const { siteId } = useParams<{ siteId: string }>();
    const navigate = useNavigate();
    const [site, setSite] = useState<EnvironmentalSite | undefined>(USACE_ENVIRONMENTAL.find(s => s.id === siteId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!site) {
        return <div className="p-6">Environmental site record not found. <Link to="/usace/environmental" className="text-blue-600">Return to Program</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === site.assetId);
    const relatedDocs = DOCUMENTS.filter(d => site.documentIds.includes(d.id));
    const relatedFunds = FUND_TRANSACTIONS.filter(ft => ft.environmentalSiteId === site.id);

    const handleSave = (updatedRecord: Partial<EnvironmentalSite>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Sarah Green', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setSite(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: EnvironmentalSite['lifecycleState']) => {
        // 7.7.4 Prevent closure with unresolved obligations (simulation)
        if (newState === 'Closed' && site.status !== 'Compliant') {
            alert('Compliance Error: Cannot close site record until status is Compliant.');
            return;
        }

        const reason = `Lifecycle state advanced from ${site.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Sarah Green', 
            action: 'State Transition',
            details: reason,
        };
        setSite(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(site.lifecycleState);

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            <EnvironmentalModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} site={site} />
            <div className="flex flex-col gap-6 pb-12 border-b-2 border-slate-900 relative italic font-black">
                <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-emerald-500 animate-pulse" />
                <button onClick={() => navigate('/usace/environmental')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 mb-6 transition-colors italic">
                    <ArrowLeft size={14} /> ENVIRONMENTAL_PORTFOLIO_BACK
                </button>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-emerald-600 rounded-none text-white shadow-2xl shadow-emerald-900/40 transform rotate-2">
                            <Leaf size={32} />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">{site.siteName.replace(' ', '_')}</h1>
                                <div className="w-2 h-2 bg-emerald-500 rounded-none transform rotate-45 animate-pulse" />
                            </div>
                            <div className="flex items-center gap-4 italic opacity-80">
                                <span className="text-[11px] font-mono font-black text-emerald-600 uppercase tracking-tighter italic">SITE_NODE_VECTOR::{site.id}</span>
                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="text-[11px] font-mono font-black text-slate-950 uppercase tracking-tighter underline decoration-emerald-600 decoration-2 underline-offset-4">ASSET_TARGET_RP::{asset?.rpuid || "UNRESOLVED_RPUID"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className={`p-4 border-2 shadow-2xl skew-x-[-12deg] ${site.riskClassification === 'High' ? 'bg-rose-50 border-rose-900/10 text-rose-600' : site.riskClassification === 'Medium' ? 'bg-amber-50 border-amber-900/10 text-amber-600' : 'bg-emerald-50 border-emerald-900/10 text-emerald-600'}`}>
                            <div className="skew-x-[12deg] flex flex-col items-center">
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-1">RISK_STRATA</span>
                                <span className="text-[14px] font-black uppercase tracking-widest">{site.riskClassification}_LEVEL</span>
                            </div>
                        </div>
                        <button onClick={() => setIsEditModalOpen(true)} className="btn-pro-secondary flex items-center gap-3 px-8 py-4 h-auto text-[11px] font-black uppercase tracking-[0.4em] bg-slate-950 text-white hover:bg-emerald-600 transition-all shadow-2xl">
                            <Edit size={16} /> REFINE_MANIFEST
                        </button>
                    </div>
                </div>
            </div>

                <div className="flex flex-col bg-white border-2 border-slate-900 shadow-2xl overflow-hidden relative italic font-black">
                <div className="bg-slate-950 px-10">
                    <nav className="flex gap-12" aria-label="Tabs">
                        {[
                            { id: 'overview', label: 'TACTICAL_SITE_VIEW', icon: Database },
                            { id: 'remediation', label: 'REMEDIATION_PIPELINE', icon: Activity },
                            { id: 'documents', label: 'VALIDATED_ARCHIVE', icon: FileText },
                            { id: 'history', label: 'IMMUTABLE_LOG', icon: ShieldCheck }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)} 
                                className={`flex items-center gap-4 py-8 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative italic group ${activeTab === tab.id ? 'text-emerald-500 opacity-100' : 'text-white/30 hover:text-white/60'}`}
                            >
                                <tab.icon size={16} className={activeTab === tab.id ? 'text-emerald-500' : 'text-white/20 group-hover:text-white/40'} />
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-16 flex-grow italic">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 italic">
                            <div className="lg:col-span-8 space-y-16">
                                <section className="space-y-10">
                                    <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-4">
                                        <Activity size={20} className="text-emerald-600" />
                                        <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.6em] italic leading-none">SITE_IDENTIFICATION_TELEMETRY</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                        <DetailItem label="Asset Target Focus" value={asset?.name} icon={Building} />
                                        <DetailItem label="Initiating Command Org" value={site.initiatingOrg.toUpperCase()} icon={Database} />
                                        <DetailItem label="Inception Date Epoch" value={site.initiationDate.toUpperCase()} icon={Calendar} />
                                    </div>
                                </section>

                                <section className="space-y-10">
                                    <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-4">
                                        <Target size={20} className="text-emerald-600" />
                                        <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.6em] italic leading-none">WORKFLOW_PILLAR_PROGRESSION</h3>
                                    </div>
                                    <div className="space-y-10 bg-slate-50 p-10 border-2 border-slate-100 relative">
                                        <div className="flex items-center justify-between gap-4">
                                            {LIFECYCLE_STATES.map((state, i) => (
                                                <div key={state} className={`flex flex-col items-center gap-4 group flex-1 relative ${i > currentStateIndex ? 'opacity-20' : 'opacity-100'}`}>
                                                    <div className={`w-12 h-12 flex items-center justify-center text-xs font-black shadow-2xl transition-all rotate-45 border-2 ${i < currentStateIndex ? 'bg-emerald-600 border-emerald-900 text-white' : i === currentStateIndex ? 'bg-slate-950 border-emerald-500 text-emerald-400 scale-125' : 'bg-white border-slate-200 text-slate-300'}`}>
                                                        <div className="-rotate-45">
                                                            {i < currentStateIndex ? <CheckCircle size={18} /> : <span>0{i + 1}</span>}
                                                        </div>
                                                    </div>
                                                    <span className={`text-[9px] font-black uppercase tracking-[0.3em] italic text-center mt-4 ${i === currentStateIndex ? 'text-emerald-600' : 'text-slate-500'}`}>{state.replace(' ', '_')}</span>
                                                    {i < LIFECYCLE_STATES.length - 1 && (
                                                        <div className={`absolute top-6 -right-[50%] w-full h-0.5 border-t-2 border-dashed ${i < currentStateIndex ? 'border-emerald-600' : 'border-slate-200'} -z-10`} />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                            <div className="flex justify-center mt-12 pt-8 border-t border-slate-200 italic">
                                                <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="bg-slate-950 hover:bg-emerald-600 text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl active:scale-95 leading-none">
                                                    COMMIT_ACTIVATION_STAGE::{LIFECYCLE_STATES[currentStateIndex + 1].toUpperCase().replace(' ', '_')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <section className="space-y-10 group">
                                    <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-4">
                                        <ShieldCheck size={20} className="text-emerald-600" />
                                        <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.6em] italic leading-none">INTEGRITY_COMPLIANCE_VECTOR</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-6">
                                            <DetailItem label="Legal Command Authority" value={site.authority.toUpperCase()} icon={ShieldCheck} />
                                            <div className="mt-8 p-8 bg-rose-950 text-rose-400 border-2 border-rose-900 relative overflow-hidden shadow-2xl">
                                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                                    <AlertTriangle size={80} />
                                                </div>
                                                <div className="flex items-center gap-4 mb-6">
                                                    <AlertTriangle size={18} className="animate-pulse" />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.5em]">ACTIVE_CONTAMINANT_STREAM</span>
                                                </div>
                                                <p className="text-[16px] font-black uppercase tracking-tighter italic border-l-4 border-rose-500 pl-6 leading-none">
                                                    {site.contaminants.join(' :: ') || 'STABLE_ZERO_VECTORS'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-8 bg-slate-50 p-10 border-2 border-slate-100 shadow-xl group-hover:border-emerald-500 transition-all">
                                            <label className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] italic flex items-center gap-3 mb-6 leading-none">
                                                <Activity size={18} className="text-emerald-500" /> TACTICAL_INDICATORS
                                            </label>
                                            <div className="text-[12px] font-black text-slate-700 uppercase tracking-tight italic leading-relaxed font-mono border-l-4 border-slate-200 pl-8">
                                                {site.contaminationIndicators?.toUpperCase() || "NO_ANOMALOUS_INDICATORS_IN_RANGE"}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="lg:col-span-4 space-y-12">
                                <div className="bg-slate-950 p-12 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                                        <ShieldCheck size={100} className="text-emerald-500" />
                                    </div>
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.6em] text-emerald-500 mb-12 flex items-center gap-4">
                                        <ShieldCheck size={24} className="animate-pulse" /> REGULATORY_ENFORCEMENT
                                    </h4>
                                    <div className="space-y-10">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] italic">REG_PROTOCOL</span>
                                            <span className="text-[14px] font-black font-mono tracking-tighter uppercase text-white italic">ER_200-3-1</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] italic">MISSION_TAG</span>
                                            <span className="text-[14px] font-black font-mono tracking-tighter uppercase text-white italic">FUDS-7_ACTIVE</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] italic">INTERNAL_SYNC</span>
                                            <span className="text-[14px] font-black font-mono tracking-tighter text-emerald-500 uppercase italic">LOCKED_SYNC_V4</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-16 bg-white text-slate-950 hover:bg-emerald-600 hover:text-white py-5 text-[11px] font-black uppercase tracking-[1em] transition-all italic shadow-2xl leading-none">
                                        EXEC_DUE_DILIGENCE_RECON
                                    </button>
                                </div>
                                <div className="p-10 bg-emerald-50 border-2 border-emerald-900/10 shadow-2xl italic">
                                    <div className="flex items-center gap-4 mb-8">
                                        <Activity size={20} className="text-emerald-600" />
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-700">STATUS_TELEMETRY</h4>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="w-4 h-4 bg-emerald-500 rounded-none rotate-45 animate-pulse shadow-2xl shadow-emerald-500/50" />
                                        <span className="text-[13px] font-black uppercase tracking-widest text-slate-950 italic">NODE_LIVE_LOCKED_ACTIVE</span>
                                    </div>
                                </div>
                                <div className="p-10 border-2 border-dashed border-slate-200 text-slate-300 opacity-40 hover:opacity-100 transition-opacity text-center cursor-help">
                                    <span className="text-[10px] font-black tracking-[1em] uppercase italic">RESERVED_COMPLIANCE_CORE</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'remediation' && (
                        <div className="space-y-24 italic">
                            <section className="space-y-10 group">
                                <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-4">
                                    <Activity size={20} className="text-amber-600" />
                                    <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.6em] italic leading-none">REMEDIATION_ACTION_PIPELINE_REQ_P7.3.3</h3>
                                </div>
                                <div className="bg-white border-2 border-slate-900 overflow-hidden shadow-2xl transition-all group-hover:shadow-[0_0_50px_rgba(0,0,0,0.1)]">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-950 border-b-2 border-slate-900">
                                            <tr>
                                                <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">ACTION_VECTOR_DESCRIPTION</th>
                                                <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">EPOCH_DATE</th>
                                                <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic text-right">LIFECYCLE_STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-slate-50 italic">
                                            {site.remediationActions.map((action, idx) => (
                                                <tr key={idx} className="group/row cursor-crosshair hover:bg-slate-50 transition-all font-black">
                                                    <td className="px-10 py-8 text-slate-900 text-[14px] uppercase tracking-tighter italic transition-colors group-hover/row:text-amber-600">{action.description}</td>
                                                    <td className="px-10 py-8 font-mono text-slate-400 text-[12px] italic group-hover/row:text-slate-950 transition-colors uppercase">{action.date}</td>
                                                    <td className="px-10 py-8 text-right">
                                                        <span className={`text-[10px] px-6 py-2 rounded-none font-black uppercase tracking-widest italic border-2 shadow-2xl ${action.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-900/10' : 'bg-amber-50 text-amber-700 border-amber-900/10'}`}>
                                                            {action.status.toUpperCase()}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {site.remediationActions.length === 0 && <tr><td colSpan={3} className="px-10 py-16 text-center text-slate-300 italic font-black uppercase tracking-[0.6em] transition-all group-hover:text-slate-950">0_INFLIGHT_PIPELINE_ACTIONS</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                            
                            <section className="space-y-10 group">
                                <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-4">
                                    <DollarSign size={20} className="text-emerald-600" />
                                    <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.6em] italic leading-none">FISCAL_OBLIGATION_NETWORK_MAP</h3>
                                </div>
                                <div className="bg-white border-2 border-slate-900 overflow-hidden shadow-2xl transition-all group-hover:shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#0A0A0B] border-b-2 border-slate-900">
                                            <tr>
                                                <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">TIMESTAMP</th>
                                                <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">TRANS_TYPE</th>
                                                <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic">MISSION_CONTEXT</th>
                                                <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic text-right">VAL_CREDIT</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-slate-50 italic">
                                            {relatedFunds.map(ft => (
                                                <tr key={ft.id} className="group/row hover:bg-emerald-50/10 transition-all font-black">
                                                    <td className="px-10 py-8 font-mono text-slate-400 text-[12px] italic uppercase">{ft.date}</td>
                                                    <td className="px-10 py-8 text-slate-950 text-[11px] uppercase tracking-[0.2em] italic border-l border-slate-100 ml-4 pl-4">{ft.type.replace(' ', '_')}</td>
                                                    <td className="px-10 py-8 text-slate-500 group-hover/row:text-slate-950 text-[13px] uppercase tracking-tighter transition-colors">{ft.description}</td>
                                                    <td className="px-10 py-8 text-right font-mono text-slate-950 group-hover/row:text-emerald-600 tracking-tighter text-[16px] italic leading-none">${ft.amount.toLocaleString()}.00</td>
                                                </tr>
                                            ))}
                                             {relatedFunds.length === 0 && <tr><td colSpan={4} className="px-10 py-16 text-center text-slate-300 italic font-black uppercase tracking-[0.6em]">NO_FISCAL_MANIFESTS_COLLECTED</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-12 italic">
                            <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-4">
                                <FileText size={20} className="text-emerald-600" />
                                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.6em] italic leading-none">VALIDATED_ENVIRONMENTAL_ARCHIVE_REGISTRY</h3>
                            </div>
                            {relatedDocs.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {relatedDocs.map(d => (
                                        <div key={d.id} className="p-10 bg-white border-2 border-slate-100 hover:border-slate-950 group cursor-pointer transition-all shadow-xl hover:shadow-2xl relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <FileText size={80} />
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="p-4 bg-slate-950 text-emerald-500 shadow-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all transform rotate-2">
                                                    <FileText size={24}/>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="font-black text-slate-950 text-[14px] uppercase tracking-tight leading-none italic group-hover:text-emerald-600 transition-colors underline decoration-slate-100 decoration-2 underline-offset-8 decoration-transparent group-hover:decoration-emerald-500/20">{d.name.replace(' ', '_')}</p>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] italic leading-none">{d.type} • AUTH::<span className="text-slate-900">{d.uploadedDate.toUpperCase()}</span></p>
                                                </div>
                                            </div>
                                            <div className="mt-10 flex justify-end">
                                                <button className="text-[10px] font-black text-emerald-600 hover:text-emerald-800 uppercase tracking-[0.5em] italic transition-all flex items-center gap-4">
                                                    INIT_SECURE_ACCESS <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : <div className="p-24 text-center border-4 border-dashed border-slate-100 text-slate-200 italic uppercase font-black text-[12px] tracking-[1em]">ARCHIVE_STREAMS_EMPTY_L9</div>}
                        </div>
                    )}

                    {activeTab === 'history' && (
                         <div className="space-y-16 max-w-5xl italic">
                             <div className="flex items-center justify-between border-b-2 border-slate-900 pb-8 uppercase">
                                <div className="flex items-center gap-6">
                                    <Activity size={24} className="text-emerald-600" /> 
                                    <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.6em] italic">IMMUTABLE_MISSION_AUDIT_STREAM</h3>
                                </div>
                                <div className="flex items-center gap-6 text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] italic border-l border-slate-200 pl-10">
                                    <ShieldCheck size={18} className="animate-pulse" /> 
                                    <span>LEDGER_BLOCK_LOCKED_ENCRYPTED</span>
                                </div>
                             </div>
                             
                             <div className="space-y-12 relative flex flex-col items-center">
                                {/* Vertical Line */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-100" />
                                
                                {site.history?.map((event, i) => (
                                    <div key={i} className={`flex w-full items-center gap-12 group transition-all ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                        <div className="flex-1">
                                            <div className={`p-10 bg-white border-2 border-slate-100 group-hover:border-slate-950 group-hover:shadow-2xl transition-all relative ${i % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'}`}>
                                                <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-100 group-hover:border-slate-950 rotate-45 ${i % 2 === 0 ? '-right-2' : '-left-2'}`} />
                                                
                                                <div className={`flex flex-col gap-4 ${i % 2 === 0 ? 'items-end' : 'items-start'}`}>
                                                    <span className="text-[10px] font-mono font-black text-emerald-600 uppercase tracking-tighter opacity-40 group-hover:opacity-100">{event.timestamp.toUpperCase()}</span>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`text-[11px] font-black px-6 py-1 uppercase tracking-widest italic border-2 ${i === 0 ? 'bg-emerald-950 text-emerald-400 border-emerald-900 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-950 text-white border-slate-950'}`}>{event.action.replace(' ', '_')}</span>
                                                    </div>
                                                    <p className="text-[14px] font-black text-slate-950 uppercase tracking-tighter italic leading-none">{event.user.replace(' ', '_')}</p>
                                                    {event.details && (
                                                        <p className={`text-[11px] font-black leading-relaxed text-slate-400 uppercase italic tracking-[0.3em] max-w-sm ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                                            "{event.details.toUpperCase()}"
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="w-12 h-12 flex-shrink-0 bg-slate-950 text-white border-4 border-slate-100 group-hover:border-slate-950 shadow-2xl relative z-20 flex items-center justify-center transform group-hover:scale-125 transition-all rotate-45">
                                            <div className="-rotate-45">
                                                {i === 0 ? <Activity size={18} className="text-emerald-500 animate-pulse" /> : <Clock size={16} />}
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1 opacity-10 font-mono text-[70px] font-black text-slate-950 pointer-events-none select-none italic text-center">
                                           0{i+1}
                                        </div>
                                    </div>
                                ))}
                             </div>
                         </div>
                    )}
                </div>
                <div className="px-10 py-8 bg-slate-950 border-t-2 border-white/10 flex justify-between items-center text-[11px] font-black uppercase tracking-[0.8em] italic text-white/40 shadow-inner">
                    <div className="flex items-center gap-6">
                        <CheckCircle size={18} className="text-emerald-500 animate-pulse" />
                        <span>INTEGRATED_PROGRAM_ENVIRONMENTAL_SECURITY_V8.4::OPERATIONAL::ENCRYPTED_L9</span>
                    </div>
                    <div className="flex items-center gap-12 font-mono text-white/10 tracking-[0.3em]">
                        <span className="border-l border-white/5 pl-12 uppercase text-[9px]">SIG::ENVIRO_COMMAND_DELTA</span>
                        <span className="text-amber-500/20 text-[10px]">VECTOR::99X_BETA</span>
                    </div>
                </div>
        </div>
    );
};
