import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ACQUISITIONS, USACE_ASSETS, USACE_APPRAISALS, USACE_ENVIRONMENTAL, FUND_TRANSACTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { StatusBadge } from '../../components/StatusBadge';
import { ArrowLeft, Edit, Building, MapPin, Calendar, DollarSign, Shield, Sigma, BookOpen, FileText, Check, MoreVertical, Paperclip, Activity, Users, Target, Clock, Terminal, CheckCircle } from 'lucide-react';
import { AcquisitionRecord, AuditEvent } from '../../types';
import { AcquisitionModal } from './components/AcquisitionModal';
import { validateNEPAForAcquisition, validateAcquisitionFunding, validateAppraisalRecency } from '../../utils/usaceRules';

const STAGES: AcquisitionRecord['stage'][] = ['Planning', 'Site Selection', 'NEPA Review', 'Appraisal', 'Negotiation', 'Condemnation', 'Closing', 'Closed'];

export const RemisAcquisitionDetail: React.FC = () => {
    const { acquisitionId } = useParams<{ acquisitionId: string }>();
    const navigate = useNavigate();
    const [acquisition, setAcquisition] = useState<AcquisitionRecord | undefined>(USACE_ACQUISITIONS.find(a => a.id === acquisitionId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!acquisition) {
        return <div className="p-6">Acquisition record not found. <Link to="/usace/acquisitions" className="text-blue-600">Return to Pipeline</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === acquisition.assetId);
    
    const handleSave = (updatedRecord: Partial<AcquisitionRecord>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance',
            action: 'Record Updated',
            details: reason
        };
        setAcquisition(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStageChange = (newStage: AcquisitionRecord['stage']) => {
        if (STAGES.indexOf(newStage) <= STAGES.indexOf(acquisition.stage)) {
            alert("Cannot move to a previous or current stage.");
            return;
        }

        // Rule 20: NEPA check before Closing
        if (newStage === 'Closing') {
            const ruleCheck = validateNEPAForAcquisition(acquisition, USACE_ENVIRONMENTAL);
            if (!ruleCheck.allowed) {
                alert(ruleCheck.reason);
                if (!confirm("Simulation Override: Proceed despite NEPA warning?")) return;
            }
        }

        // Rule 26: Funding Obligation check before Closing
        if (newStage === 'Closing') {
            const fundCheck = validateAcquisitionFunding(acquisition, FUND_TRANSACTIONS);
            if (!fundCheck.allowed) {
                alert(fundCheck.reason);
                if (!confirm("Simulation Override: Proceed without obligated funds?")) return;
            }
        }

        // Rule 28 check (implicitly during flow, but checked here for demonstration on appraisal stage)
        if (newStage === 'Negotiation') {
             const linkedAppraisals = USACE_APPRAISALS.filter(a => acquisition.appraisalIds.includes(a.id));
             for (const app of linkedAppraisals) {
                 const recencyCheck = validateAppraisalRecency(app);
                 if (!recencyCheck.allowed) {
                     alert(`Warning for Appraisal ${app.id}: ${recencyCheck.reason}`);
                 }
             }
        }

        const reason = `Stage advanced from ${acquisition.stage} to ${newStage}.`;
         const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance',
            action: 'Stage Changed',
            details: reason,
        };
        setAcquisition(prev => prev ? { ...prev, stage: newStage, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        alert(`Acquisition stage advanced to ${newStage}. This action has been logged.`);
    }
    
    const currentStageIndex = STAGES.indexOf(acquisition.stage);

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 italic font-black">
        <AcquisitionModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} acquisition={acquisition} />
        
        {/* Command Header */}
        <div className="flex flex-col gap-6 pb-12 border-b-2 border-slate-900 relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-blue-600 pulse-mission" />
            <button onClick={() => navigate('/usace/acquisitions')} className="flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-[0.4em] italic mb-4"><ArrowLeft size={14} /> PIPELINE_COMMAND_BACK</button>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-blue-600 rounded-none text-white shadow-2xl shadow-blue-900/40 transform rotate-2">
                        <Terminal size={32} />
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">Acquisition Case Vector</h1>
                            <div className="w-2 h-2 bg-emerald-500 rounded-none transform rotate-45 shadow-2xl shadow-emerald-500/50 animate-pulse" />
                        </div>
                        <div className="flex items-center gap-4 italic opacity-80">
                            <span className="text-[11px] font-mono font-black text-blue-600 uppercase tracking-tighter italic">NODE_CASE_IDENT::{acquisition.id}</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[11px] font-mono font-black text-slate-950 uppercase tracking-tighter underline decoration-blue-600 decoration-2 underline-offset-4">ASSET_TARGET::{asset?.rpuid || "UNRESOLVED_VECTOR"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end gap-2 pr-6 border-r-2 border-slate-100">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic opacity-40">MISSION_PHASE</span>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-600 animate-ping" />
                            <span className="text-xl font-black text-slate-900 uppercase tracking-widest italic">{acquisition.stage.toUpperCase()}</span>
                        </div>
                    </div>
                    <button onClick={() => setIsEditModalOpen(true)} className="px-8 py-4 bg-slate-950 text-white text-[11px] font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-blue-900/40 hover:bg-blue-600 transition-all flex items-center gap-4">
                        <Edit size={16} /> MODIFY_MASTER_RECORD
                    </button>
                </div>
            </div>
        </div>

        <div className="flex flex-col bg-white border-2 border-slate-900 shadow-2xl overflow-hidden relative">
            <div className="bg-slate-950 px-10">
                <nav className="flex gap-12" aria-label="Tabs">
                    {[
                        { id: 'overview', label: 'TACTICAL_OVERVIEW', icon: Activity },
                        { id: 'lifecycle', label: 'PROCUREMENT_LIFECYCLE', icon: Target },
                        { id: 'documents', label: 'SUPPORTING_MANIFESTS', icon: FileText },
                        { id: 'history', label: 'IMMUTABLE_AUDIT_LOG', icon: Shield }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)} 
                            className={`flex items-center gap-4 py-8 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative italic group ${activeTab === tab.id ? 'text-blue-500 opacity-100' : 'text-white/30 hover:text-white/60'}`}
                        >
                            <tab.icon size={16} className={activeTab === tab.id ? 'text-blue-500' : 'text-white/20 group-hover:text-white/40'} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-16">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 italic">
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b-2 border-slate-900 pb-4">
                                <Activity size={18} className="text-blue-600" />
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.5em] italic">MISSION_TELEMETRY</h3>
                            </div>
                            <div className="space-y-10">
                                <DetailItem label="Asset Vector Identification" value={asset?.rpuid || '—'} icon={Building} />
                                <DetailItem label="Strategic Mission Purpose" value={acquisition.purpose.toUpperCase()} icon={Target} />
                                <DetailItem label="Lead Operational Command" value={acquisition.responsibleOrg.toUpperCase()} icon={Users} />
                            </div>
                        </div>
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b-2 border-slate-900 pb-4">
                                <Shield size={18} className="text-blue-600" />
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.5em] italic">AUTHORIZATION_MATRIX</h3>
                            </div>
                            <div className="space-y-10">
                                <DetailItem label="Primary Intake Protocol" value={acquisition.acquisitionMethod.toUpperCase()} icon={BookOpen} />
                                <DetailItem label="Command Authority Code" value={acquisition.authority.toUpperCase()} icon={Shield} />
                                <DetailItem label="Statutory Source Link" value={acquisition.statutoryBasis.toUpperCase()} icon={Shield} />
                            </div>
                        </div>
                        <div className="space-y-12">
                            <div className="flex items-center gap-4 border-b-2 border-slate-900 pb-4">
                                <DollarSign size={18} className="text-blue-600" />
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.5em] italic">FISCAL_MAGNITUDE</h3>
                            </div>
                            <div className="space-y-10">
                                <DetailItem label="Assigned Appropriation Channel" value={acquisition.fundingSource.toUpperCase()} icon={Sigma} isProtected />
                                <div className="p-8 bg-slate-950 border-2 border-blue-900/20 shadow-2xl relative group overflow-hidden">
                                     <div className="absolute top-0 right-0 p-2 opacity-10">
                                         <Sigma size={60} className="text-white" />
                                     </div>
                                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-4 block italic leading-none">GROSS_FISCAL_ESTIMATE</span>
                                     <span className="text-4xl font-black font-mono tracking-tighter text-white leading-none italic select-all cursor-crosshair">
                                         <span className="text-blue-600 mr-2">$</span>
                                         {acquisition.cost.toLocaleString()}.00
                                     </span>
                                </div>
                                <DetailItem label="Target Chrono Terminal" value={acquisition.closeDate.toUpperCase()} icon={Calendar} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'lifecycle' && (
                     <div className="space-y-24 italic bg-slate-50/50 p-12 border-2 border-slate-900/5">
                        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-8">
                            <div className="flex items-center gap-6">
                                <Activity size={24} className="text-blue-600" /> 
                                <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.6em] italic">PROCUREMENT_LIFECYCLE_STEPS</h3>
                            </div>
                            <span className="text-[11px] font-black text-white bg-blue-600 px-6 py-2 uppercase tracking-[0.4em] shadow-2xl">IDX_0{currentStageIndex + 1}</span>
                        </div>
                        
                        <div className="flex items-center px-16 relative">
                            {/* Connector Line Background */}
                            <div className="absolute left-20 right-20 h-0.5 bg-slate-200 top-5 -translate-y-1/2" />
                            
                            {STAGES.map((stage, i) => (
                                <React.Fragment key={stage}>
                                    <div className="flex flex-col items-center group relative z-10 flex-1">
                                        <div className={`w-10 h-10 rounded-none flex items-center justify-center border-2 transition-all duration-700 ${i <= currentStageIndex ? 'bg-slate-950 border-slate-950 text-white shadow-2xl shadow-blue-500/40 transform rotate-45' : 'bg-white border-slate-200 text-slate-200'}`}>
                                           <div className="-rotate-45">
                                               {i < currentStageIndex ? <Check size={20} className="text-emerald-400" /> : <span className="text-[11px] font-black font-mono">{i+1}</span>}
                                           </div>
                                        </div>
                                        <div className={`absolute top-16 w-40 text-center transition-all duration-500 ${i === currentStageIndex ? 'opacity-100 scale-110' : 'opacity-30 group-hover:opacity-100'}`}>
                                            <p className={`text-[10px] font-black uppercase tracking-[0.2em] italic leading-tight ${i <= currentStageIndex ? 'text-slate-950' : 'text-slate-400'}`}>{stage.toUpperCase()}</p>
                                        </div>
                                    </div>
                                    {i < STAGES.length - 1 && (
                                        <div className="absolute h-0.5 top-5 z-20 pointer-events-none transition-all duration-1000 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]" 
                                             style={{ 
                                                 left: `${(i / (STAGES.length-1)) * 100}%`, 
                                                 width: i < currentStageIndex ? `${(1 / (STAGES.length-1)) * 100}%` : '0%' 
                                             }} 
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        
                        <div className="mt-24 pt-24 border-t border-slate-900/5 flex flex-col items-center">
                            {currentStageIndex < STAGES.length - 1 ? (
                                <div className="space-y-10 flex flex-col items-center w-full max-w-2xl">
                                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] italic flex items-center gap-6">
                                        <div className="h-px w-12 bg-slate-200" />
                                        AWAITING_COMMAND_AUTHORIZATION
                                        <div className="h-px w-12 bg-slate-200" />
                                    </div>
                                    <button onClick={() => handleStageChange(STAGES[currentStageIndex+1])} className="w-full bg-slate-950 text-white hover:bg-blue-600 py-10 text-[14px] font-black uppercase tracking-[0.8em] italic transition-all shadow-2xl relative group overflow-hidden border-2 border-slate-900 border-dashed hover:border-solid">
                                        <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        <span className="relative z-10 flex items-center justify-center gap-6">
                                            EXECUTE_MOD::STAGE_{STAGES[currentStageIndex+1].toUpperCase()}
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <div className="py-12 px-20 bg-emerald-950 border-4 border-emerald-900 text-emerald-400 text-base font-black uppercase tracking-[1em] italic shadow-2xl flex items-center gap-8 translate-y-12">
                                    <CheckCircle size={32} /> MISSION_COMPLETE
                                </div>
                            )}
                        </div>
                     </div>
                )}

                {activeTab === 'documents' && (
                     <div className="space-y-12 italic">
                         <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-8">
                            <FileText size={24} className="text-blue-600" /> 
                            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.6em] italic">PROCUREMENT_MANIFEST_REGISTRY</h3>
                         </div>
                         <div className="border-2 border-slate-900 bg-white overflow-hidden shadow-2xl">
                             <table className="w-full text-left border-collapse italic">
                                 <thead className="bg-slate-950">
                                     <tr>
                                         <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.5em] border-b border-white/5 italic">MANIFEST_CATEGORY</th>
                                         <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.5em] border-b border-white/5">SYSTEM_TRACE_ID</th>
                                         <th className="px-10 py-6 text-[10px] font-black text-white/40 uppercase tracking-[0.5em] border-b border-white/5 text-center">VECTOR_STATUS</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-slate-100">
                                    {acquisition.appraisalIds.map(id => {
                                        const appraisal = USACE_APPRAISALS.find(a => a.id === id);
                                        return (
                                           <tr key={id} onClick={() => navigate(`/usace/appraisals/${id}`)} className="group cursor-pointer hover:bg-slate-50 transition-all">
                                               <td className="px-10 py-8 relative">
                                                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
                                                   <div className="flex items-center gap-6">
                                                       <div className="p-4 bg-slate-100 text-slate-400 group-hover:bg-slate-900 group-hover:text-blue-500 shadow-xl transition-all border border-slate-200 group-hover:border-slate-900">
                                                           <Paperclip size={18} />
                                                       </div>
                                                       <span className="text-[13px] font-black text-slate-900 uppercase tracking-tighter italic">REAL_PROPERTY_APPRAISAL_NODE</span>
                                                   </div>
                                               </td>
                                               <td className="px-10 py-8">
                                                   <span className="text-blue-600 font-mono font-black text-[14px] tracking-tighter uppercase group-hover:text-blue-800 transition-colors">TRC::{id.toUpperCase()}</span>
                                               </td>
                                               <td className="px-10 py-8">
                                                   <div className="flex justify-center">
                                                       <StatusBadge status={appraisal?.status || 'Unknown'} />
                                                   </div>
                                               </td>
                                           </tr>
                                        )
                                    })}
                                 </tbody>
                             </table>
                         </div>
                     </div>
                )}

                {activeTab === 'history' && (
                     <div className="space-y-16 italic">
                         <div className="flex items-center justify-between border-b-2 border-slate-900 pb-8">
                            <div className="flex items-center gap-6">
                                <Activity size={24} className="text-blue-600" /> 
                                <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.6em] italic">IMMUTABLE_AUDIT_LOG_TRANSCRIPT</h3>
                            </div>
                            <div className="flex items-center gap-6 text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] italic border-l border-slate-200 pl-10">
                                <Shield size={18} className="animate-pulse" /> 
                                <span>SECURE_BLOCKCHAIN_SYNC::ENGAGED</span>
                            </div>
                         </div>
                         
                         <div className="space-y-12 relative flex flex-col items-center">
                            {/* Vertical Line */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-100" />
                            
                            {acquisition.history?.map((event, i) => (
                                <div key={i} className={`flex w-full items-center gap-12 group transition-all ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className="flex-1">
                                        <div className={`p-10 bg-white border-2 border-slate-100 group-hover:border-slate-900 group-hover:shadow-2xl transition-all relative ${i % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'}`}>
                                            <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-100 group-hover:border-slate-900 rotate-45 ${i % 2 === 0 ? '-right-2' : '-left-2'}`} />
                                            
                                            <div className={`flex flex-col gap-4 ${i % 2 === 0 ? 'items-end' : 'items-start'}`}>
                                                <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-tighter opacity-40 group-hover:opacity-100">{event.timestamp.toUpperCase()}</span>
                                                <div className="flex items-center gap-4">
                                                    <span className={`text-[11px] font-black px-6 py-1 uppercase tracking-widest italic border-2 ${i === 0 ? 'bg-emerald-950 text-emerald-400 border-emerald-900 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-950 text-white border-slate-900'}`}>{event.action.replace(' ', '_')}</span>
                                                </div>
                                                <p className="text-[14px] font-black text-slate-900 uppercase tracking-tighter italic leading-none">{event.user.replace(' ', '_')}</p>
                                                {event.details && (
                                                    <p className={`text-[11px] font-black leading-relaxed text-slate-400 uppercase italic tracking-widest max-w-sm ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                                        {event.details.toUpperCase()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="w-12 h-12 flex-shrink-0 bg-slate-950 text-white border-4 border-slate-100 group-hover:border-slate-900 shadow-2xl relative z-20 flex items-center justify-center transform group-hover:scale-125 transition-all rotate-45">
                                        <div className="-rotate-45">
                                            {i === 0 ? <Activity size={18} className="text-blue-500 animate-pulse" /> : <Clock size={16} />}
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 opacity-10 font-mono text-[60px] font-black text-slate-900 pointer-events-none select-none italic text-center">
                                       0{i+1}
                                    </div>
                                </div>
                            ))}
                         </div>
                     </div>
                )}
            </div>
            <div className="px-10 py-6 bg-slate-950 border-t border-white/10 flex justify-between items-center text-[11px] font-black uppercase tracking-[0.5em] italic text-white/40 shadow-inner">
                <div className="flex items-center gap-6">
                    <CheckCircle size={16} className="text-emerald-500 animate-pulse" />
                    <span>INTEGRITY_SHIELD::ACTIVE_L6_SECURE</span>
                </div>
                <div className="flex items-center gap-10">
                    <span className="opacity-20 select-none">AES_256_GCM_AUTH</span>
                    <span className="font-mono text-blue-600/40 text-[10px]">TRACE_NODE::ACQ_CMD_ALPHA_941</span>
                </div>
            </div>
        </div>
    </div>
    );
};