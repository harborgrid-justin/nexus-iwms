import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_APPRAISALS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { StatusBadge } from '../../components/StatusBadge';
import { ArrowLeft, Edit, Building, Target, Calendar, User, FileText, Activity, Paperclip, DollarSign, Clock, Database, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { Appraisal, AuditEvent } from '../../types';

export const RemisAppraisalDetail: React.FC = () => {
    const { appraisalId } = useParams<{ appraisalId: string }>();
    const navigate = useNavigate();
    const [appraisal, setAppraisal] = useState<Appraisal | undefined>(USACE_APPRAISALS.find(a => a.id === appraisalId));
    const [activeTab, setActiveTab] = useState('overview');

    if (!appraisal) {
        return <div className="p-6">Appraisal not found. <Link to="/usace/appraisals" className="text-blue-600">Return to Appraisal Log</Link></div>;
    }
    
    const asset = USACE_ASSETS.find(a => a.id === appraisal.assetId);

    const handleStatusChange = (newStatus: Appraisal['status']) => {
        const reason = `Status changed from ${appraisal.status} to ${newStatus}.`;
         const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance', // Simulated logged-in user
            action: 'Status Updated',
            details: reason,
        };
        setAppraisal(prev => prev ? { ...prev, status: newStatus, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        alert(`Appraisal status changed to ${newStatus}. This action has been logged.`);
    }
    
    const isFinalized = appraisal.status === 'Approved' || appraisal.status === 'Archived';

    return (
        <div className="max-w-[1600px] mx-auto space-y-6 italic font-black">
            <div className="flex flex-col gap-6 pb-12 border-b-2 border-slate-900 relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-amber-500 animate-pulse" />
                <button onClick={() => navigate('/usace/appraisals')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 mb-6 transition-colors italic">
                    <ArrowLeft size={14} /> VALUATION_REGISTER_BACK
                </button>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-amber-600 rounded-none text-white shadow-2xl shadow-amber-900/40 transform rotate-2">
                            <Target size={32} />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">Valuation Target Profile</h1>
                                <div className="w-2 h-2 bg-emerald-500 rounded-none transform rotate-45 animate-pulse" />
                            </div>
                            <div className="flex items-center gap-4 italic opacity-80">
                                <span className="text-[11px] font-mono font-black text-amber-600 uppercase tracking-tighter italic">NODE_VAL_IDENT::{appraisal.id}</span>
                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="text-[11px] font-mono font-black text-slate-950 uppercase tracking-tighter underline decoration-amber-600 decoration-2 underline-offset-4">ASSET_VECTOR::{asset?.rpuid || "UNRESOLVED_VECTOR"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end gap-2 pr-6 border-r-2 border-slate-100">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic opacity-40">LIFECYCLE_STATUS</span>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-amber-600 animate-ping" />
                                <span className="text-xl font-black text-slate-900 uppercase tracking-widest italic">{appraisal.status.toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="relative group/select">
                            <select 
                                onChange={(e) => handleStatusChange(e.target.value as Appraisal['status'])} 
                                value={appraisal.status} 
                                disabled={isFinalized} 
                                className="pl-8 pr-16 py-4 bg-slate-950 text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-none hover:bg-slate-900 focus:outline-none appearance-none disabled:opacity-30 cursor-pointer border-2 border-slate-900 transition-all italic shadow-2xl"
                            >
                                <option disabled>COMMAND_STATUS_OVERRIDE</option>
                                <option value="In Progress">INIT_PROC</option>
                                <option value="Under Review">ESCAL_REV</option>
                                <option value="Approved">RATIFY_VAL</option>
                                <option value="Archived">ARCH_NODE</option>
                            </select>
                            <ArrowRight size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none group-hover/select:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>

                <div className="flex flex-col bg-white border-2 border-slate-900 shadow-2xl overflow-hidden relative">
                <div className="bg-slate-950 px-10">
                    <nav className="flex gap-12" aria-label="Tabs">
                        {[
                            { id: 'overview', label: 'VALUATION_TELEMETRY', icon: Database },
                            { id: 'history', label: 'COMMAND_AUDIT_STREAM', icon: Activity }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)} 
                                className={`flex items-center gap-4 py-8 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative italic group ${activeTab === tab.id ? 'text-amber-500 opacity-100' : 'text-white/30 hover:text-white/60'}`}
                            >
                                <tab.icon size={16} className={activeTab === tab.id ? 'text-amber-500' : 'text-white/20 group-hover:text-white/40'} />
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
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
                                        <Activity size={20} className="text-amber-600" />
                                        <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.6em] italic leading-none">CORE_VALUATION_TELEMETRY</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                        <div className="p-10 bg-slate-950 border-2 border-amber-900/20 shadow-2xl relative group overflow-hidden md:col-span-1">
                                             <div className="absolute top-0 right-0 p-3 opacity-10">
                                                 <DollarSign size={64} className="text-white" />
                                             </div>
                                             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-6 block italic leading-none">VALUATION_MAGNITUDE</span>
                                             <span className="text-4xl font-black font-mono tracking-tighter text-white leading-none italic select-all cursor-crosshair">
                                                 <span className="text-amber-600 mr-2">$</span>
                                                 {appraisal.appraisedValue.toLocaleString()}.00
                                             </span>
                                        </div>
                                        <DetailItem label="Inception Valuation Terminal" value={appraisal.appraisalDate.toUpperCase()} icon={Calendar} />
                                        <DetailItem label="Structural Appraisal Class" value={appraisal.type.toUpperCase()} icon={FileText} />
                                    </div>
                                </section>

                                <section className="space-y-10">
                                    <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-4">
                                        <Target size={20} className="text-amber-600" />
                                        <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.6em] italic leading-none">MISSION_PROFILE_MATRIX</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                        <DetailItem label="Strategic Mission Purpose" value={appraisal.purpose.toUpperCase()} icon={Target} />
                                        <DetailItem label="Relational Vector Mapping" value={appraisal.relatedActionId.toUpperCase()} icon={Paperclip} />
                                        <DetailItem label="Certified Command Appraiser" value={appraisal.appraiser.toUpperCase()} icon={User} />
                                    </div>
                                </section>

                                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t-2 border-slate-100">
                                    <div className="space-y-8 p-10 bg-slate-950 border-2 border-slate-950 relative overflow-hidden group shadow-2xl">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                            <FileText size={160} />
                                        </div>
                                        <h3 className="font-black text-amber-500 flex items-center gap-6 text-[11px] uppercase tracking-[0.6em] italic leading-none mb-10"><Terminal size={24}/> STRATEGIC_TECHNICAL_SCOPE</h3>
                                        <div className="p-8 bg-white/5 border border-white/5 shadow-inner">
                                            <p className="text-slate-300 leading-relaxed font-mono font-black text-[12px] italic border-l-4 border-amber-600 pl-8 uppercase tracking-tighter transition-all group-hover:text-white">
                                                {appraisal.scope?.toUpperCase() || "NO_RECORDED_TECHNICAL_SCOPE_L9"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-8 p-10 bg-white border-2 border-slate-100 relative overflow-hidden group shadow-2xl hover:border-amber-500 transition-all">
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                            <ShieldCheck size={160} />
                                        </div>
                                        <h3 className="font-black text-slate-950 flex items-center gap-6 text-[11px] uppercase tracking-[0.6em] italic leading-none mb-10"><Target size={24} className="text-amber-600"/> CRITICAL_AXIOM_PROTOCOL</h3>
                                        <div className="p-8 bg-slate-50 border border-slate-100 shadow-inner">
                                            <p className="text-slate-500 leading-relaxed font-mono font-black text-[12px] border-l-4 border-slate-300 pl-8 uppercase tracking-tighter transition-all group-hover:text-slate-950">
                                                {appraisal.assumptions?.toUpperCase() || "STANDARD_USACE_VECTOR_AXIOMS_L9"}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="lg:col-span-4 space-y-12">
                                <div className="bg-slate-950 p-12 text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                                        <ShieldCheck size={100} className="text-amber-500" />
                                    </div>
                                    <h4 className="text-[12px] font-black uppercase tracking-[0.6em] text-amber-500 mb-12 flex items-center gap-4">
                                        <ShieldCheck size={24} className="animate-pulse" /> REGULATORY_NODE
                                    </h4>
                                    <div className="space-y-10">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] italic">ASSET_CLASS</span>
                                            <span className="text-[14px] font-black font-mono tracking-tighter uppercase text-white italic">{asset?.type}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] italic">PROGRAM_NODE</span>
                                            <span className="text-[14px] font-black font-mono tracking-tighter uppercase text-white italic">{asset?.program}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-white/5 pb-6">
                                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] italic">INTERNAL_SYNC</span>
                                            <span className="text-[14px] font-black font-mono tracking-tighter text-emerald-500 uppercase italic">SYNCHRONIZED_P9</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-16 bg-white text-slate-950 hover:bg-amber-600 hover:text-white py-5 text-[11px] font-black uppercase tracking-[1em] transition-all italic shadow-2xl leading-none">
                                        EXEC_DUE_DILIGENCE_RECON
                                    </button>
                                </div>
                                <div className="p-10 bg-slate-50 border-2 border-slate-100 shadow-2xl italic">
                                    <div className="flex items-center gap-4 mb-8">
                                        <Activity size={20} className="text-amber-600" />
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">OPERATIONAL_TELEMETRY</h4>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="w-4 h-4 bg-emerald-500 rounded-none rotate-45 animate-pulse shadow-2xl shadow-emerald-500/50" />
                                        <span className="text-[13px] font-black uppercase tracking-widest text-slate-950 italic">NODE_LIVE_LOCKED_ACTIVE</span>
                                    </div>
                                </div>
                                <div className="p-10 border-2 border-dashed border-slate-200 text-slate-300 opacity-40 hover:opacity-100 transition-opacity text-center cursor-help">
                                    <span className="text-[10px] font-black tracking-[1em] uppercase italic">RESERVED_VAL_MATRIX_P12</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'history' && (
                         <div className="space-y-16 max-w-5xl">
                             <div className="flex items-center justify-between border-b-2 border-slate-900 pb-8 uppercase">
                                <div className="flex items-center gap-6">
                                    <Activity size={24} className="text-amber-600" /> 
                                    <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-[0.6em] italic">VALUATION_AUDIT_STREAM_LOG</h3>
                                </div>
                                <div className="flex items-center gap-6 text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] italic border-l border-slate-200 pl-10">
                                    <ShieldCheck size={18} className="animate-pulse" /> 
                                    <span>LEDGER_BLOCK_SYNC_LOCKED</span>
                                </div>
                             </div>
                             
                             <div className="space-y-12 relative flex flex-col items-center">
                                {/* Vertical Line */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-slate-100" />
                                
                                {appraisal.history?.map((event, i) => (
                                    <div key={i} className={`flex w-full items-center gap-12 group transition-all ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                        <div className="flex-1">
                                            <div className={`p-10 bg-white border-2 border-slate-100 group-hover:border-slate-900 group-hover:shadow-2xl transition-all relative ${i % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'}`}>
                                                <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-100 group-hover:border-slate-900 rotate-45 ${i % 2 === 0 ? '-right-2' : '-left-2'}`} />
                                                
                                                <div className={`flex flex-col gap-4 ${i % 2 === 0 ? 'items-end' : 'items-start'}`}>
                                                    <span className="text-[10px] font-mono font-black text-amber-600 uppercase tracking-tighter opacity-40 group-hover:opacity-100">{event.timestamp.toUpperCase()}</span>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`text-[11px] font-black px-6 py-1 uppercase tracking-widest italic border-2 ${i === 0 ? 'bg-amber-950 text-amber-400 border-amber-900 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-slate-950 text-white border-slate-900'}`}>{event.action.replace(' ', '_')}</span>
                                                    </div>
                                                    <p className="text-[14px] font-black text-slate-900 uppercase tracking-tighter italic leading-none">{event.user.replace(' ', '_')}</p>
                                                    {event.details && (
                                                        <p className={`text-[11px] font-black leading-relaxed text-slate-400 uppercase italic tracking-[0.3em] max-w-sm ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                                            {event.details.toUpperCase()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="w-12 h-12 flex-shrink-0 bg-slate-950 text-white border-4 border-slate-100 group-hover:border-slate-900 shadow-2xl relative z-20 flex items-center justify-center transform group-hover:scale-125 transition-all rotate-45">
                                            <div className="-rotate-45">
                                                {i === 0 ? <Activity size={18} className="text-amber-500 animate-pulse" /> : <Clock size={16} />}
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
                <div className="px-10 py-6 bg-slate-950 border-t border-white/10 flex justify-between items-center text-[11px] font-black uppercase tracking-[0.6em] italic text-white/40 shadow-inner">
                    <div className="flex items-center gap-6">
                        <CheckCircle size={16} className="text-emerald-500 animate-pulse" />
                        <span>VALUATION_INTEGRITY_SHIELD::ACTIVE_L9_SECURE</span>
                    </div>
                    <div className="flex items-center gap-10">
                        <span className="opacity-20 select-none">USPAP_CRYPTO_ENGINE</span>
                        <span className="font-mono text-amber-600/40 text-[10px]">TRACE_NODE::VAL_CMD_VECTOR_991</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
