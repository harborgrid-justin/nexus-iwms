import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_SOLICITATIONS, USACE_ASSETS, DOCUMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Calendar, FileText, CheckCircle, Lock, Gavel, User, Plus } from 'lucide-react';
import { Solicitation, AuditEvent } from '../../types';
import { SolicitationModal } from './components/SolicitationModal';

const LIFECYCLE_STATES: Solicitation['lifecycleState'][] = ['Draft', 'Issued', 'Under Evaluation', 'Awarded', 'Closed'];

export const RemisSolicitationDetail: React.FC = () => {
    const { solicitationId } = useParams<{ solicitationId: string }>();
    const navigate = useNavigate();
    const [solicitation, setSolicitation] = useState<Solicitation | undefined>(USACE_SOLICITATIONS.find(s => s.id === solicitationId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!solicitation) {
        return <div className="p-6">Solicitation record not found. <Link to="/usace/solicitations" className="text-blue-600">Return to Management</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === solicitation.assetId);
    const relatedDocs = DOCUMENTS.filter(d => solicitation.documentIds.includes(d.id));

    const handleSave = (updatedRecord: Partial<Solicitation>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'David Procurement', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setSolicitation(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: Solicitation['lifecycleState']) => {
        const reason = `Lifecycle state advanced from ${solicitation.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'David Procurement', 
            action: 'State Transition',
            details: reason,
        };
        setSolicitation(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(solicitation.lifecycleState);

    return (
    <div className="max-w-[1600px] mx-auto space-y-6">
        <SolicitationModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} solicitation={solicitation} />
        <div className="border-b border-slate-200 pb-6">
            <button onClick={() => navigate('/usace/solicitations')} className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-blue-600 mb-4 transition-colors uppercase tracking-[0.2em] italic"><ArrowLeft size={14} /> Back to Solicitation Control</button>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-slate-950 rounded shadow-xl shadow-black/20 text-white">
                        <Gavel size={32} className="text-blue-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">{solicitation.title}</h1>
                            <div className="pulse-mission" />
                            <span className="text-[10px] font-mono font-black px-2.5 py-1 bg-slate-100 text-slate-600 rounded-sm uppercase tracking-tighter italic border shadow-sm">
                                SOL_{solicitation.id}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 italic">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none">Target Asset: {asset?.rpuid || "UNASSIGNED"}</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter italic">Enterprise Procurement Chain</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                     <div className="flex flex-col items-end mr-4 italic">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic leading-none">Protocol_Status</span>
                        <span className="text-xs font-black px-3 py-1 uppercase tracking-widest border shadow-sm bg-slate-900 border-slate-800 text-white leading-none">
                            {solicitation.lifecycleState.toUpperCase()}
                        </span>
                    </div>
                    <button onClick={() => setIsEditModalOpen(true)} className="btn-pro-secondary flex items-center gap-2 px-4 py-2 h-auto text-[10px] font-black uppercase tracking-widest italic animate-pulse-subtle">
                        <Edit size={14} /> Modify Solicitation Schema
                    </button>
                    <RegulatoryBadge refs={['FAR P8']} />
                </div>
            </div>
        </div>

        <div className="pro-card flex flex-col bg-white overflow-hidden shadow-2xl border-slate-200">
            <div className="px-6 border-b border-white/5 bg-[#0A0A0B]">
                <nav className="-mb-px flex gap-10" aria-label="Tabs">
                    {[
                        { id: 'overview', label: 'Schematic Overview' },
                        { id: 'biditems', label: 'Requirement Matrix' },
                        { id: 'responses', label: 'Bid Responses' },
                        { id: 'documents', label: 'Supporting Docs' },
                        { id: 'history', label: 'Audit Transcript' }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)} 
                            className={`shrink-0 border-b-2 px-1 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all italic ${activeTab === tab.id ? 'border-blue-600 text-blue-400 opacity-100' : 'border-transparent text-white/30 hover:text-white/60 hover:border-white/10'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-8">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 italic">
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">Procurement Parameters</h3>
                            <div className="space-y-4">
                                <DetailItem label="Submission Type" value={solicitation.type} icon={Gavel} />
                                <DetailItem label="Acquisition Method" value={solicitation.procurementMethod} icon={FileText} />
                                <DetailItem label="Procurement Officer" value={solicitation.pointOfContact || 'NOT_ASSIGNED'} icon={User} />
                            </div>
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">Lifecycle Control Grid</h3>
                            <div className="space-y-4 relative pl-4">
                                 <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-100" />
                                {LIFECYCLE_STATES.map((state, i) => (
                                    <div key={state} className={`flex items-center gap-4 group transition-all ${i > currentStateIndex ? 'opacity-30' : 'opacity-100'}`}>
                                        <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-[10px] font-black font-mono tracking-tighter border shadow-sm z-10 transition-colors ${i < currentStateIndex ? 'bg-emerald-500 border-emerald-400 text-white' : i === currentStateIndex ? 'bg-blue-600 border-blue-500 text-white animate-pulse' : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-300'}`}>
                                            {i < currentStateIndex ? <CheckCircle size={14} /> : i + 1}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${i === currentStateIndex ? 'text-blue-900 group-hover:text-blue-600' : 'text-slate-500'}`}>{state}</span>
                                    </div>
                                ))}
                            </div>
                             {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="btn-pro-primary w-full py-2.5 h-auto text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-blue-500/20 active:scale-95 transition-all mt-4">
                                    ADVANCE_LIFECYCLE:: {LIFECYCLE_STATES[currentStateIndex + 1]}
                                </button>
                            )}
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">Operational Timeline</h3>
                            <div className="space-y-4">
                                <DetailItem label="Release Epoch" value={solicitation.issueDate || 'PENDING'} icon={Calendar} />
                                <DetailItem label="Closure ETD" value={solicitation.closeDate || 'PENDING'} icon={Calendar} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'biditems' && (
                    <div className="space-y-6 italic">
                        <div className="flex justify-between items-center mb-2 italic">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                                <FileText size={16} className="text-blue-500" /> Statutory Requirement Line-Items
                            </h3>
                            <button className="btn-pro-secondary py-1.5 h-auto px-4 text-[9px] font-black uppercase tracking-widest italic hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                <Plus size={14} /> Inject Requirement
                            </button>
                        </div>
                        <div className="pro-card border-slate-200 overflow-hidden shadow-md">
                            <table className="w-full text-left">
                                <thead className="bg-[#1A1B1E] border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic">ITEM_NODE</th>
                                        <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic">SPECIFICATION_DESCRIPTION</th>
                                        <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic text-right">QUANTITY</th>
                                        <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic">UNIT_TYPE</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {(solicitation.bidItems || []).map((item) => (
                                        <tr key={item.id} className="pro-data-row group">
                                            <td className="px-6 py-5 font-mono font-black text-blue-600 text-[12px] group-hover:scale-105 transition-transform origin-left">{item.itemNumber}</td>
                                            <td className="px-6 py-5 font-black text-slate-900 text-[12px] uppercase tracking-tighter group-hover:text-blue-700 transition-colors">{item.description}</td>
                                            <td className="px-6 py-5 text-right font-mono font-black text-slate-500 text-[12px]">{item.quantity}</td>
                                            <td className="px-6 py-5 font-black text-slate-400 text-[10px] uppercase tracking-widest">{item.unit.toUpperCase()}</td>
                                        </tr>
                                    ))}
                                    {(!solicitation.bidItems || solicitation.bidItems.length === 0) && (
                                        <tr><td colSpan={4} className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">NULL_ITEM_SET :: DEFINE REQUIREMENTS TO CONTINUE</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'responses' && (
                    <div className="space-y-6 italic">
                        <div className="flex justify-between items-center mb-2 italic">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                                <Gavel size={16} className="text-blue-500" /> Sealed Bid Response Telemetry
                            </h3>
                            <div className="flex items-center gap-3 px-4 py-2 bg-amber-50 border border-amber-200 shadow-sm">
                                <Lock size={14} className="text-amber-500 animate-pulse" />
                                <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest italic">Vault Locked: Responses Sealed Until Opening Event</span>
                            </div>
                        </div>
                        <div className="pro-card border-slate-200 overflow-hidden shadow-md">
                            <table className="w-full text-left">
                                <thead className="bg-[#1A1B1E] border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic">BIDDER_ENTITY</th>
                                        <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic">SUBMISSION_TS</th>
                                        <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic text-right">TOTAL_MAGNITUDE</th>
                                        <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic text-center">INTEGRITY_SAFE</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {(solicitation.responses || []).map((resp) => (
                                        <tr key={resp.id} className="pro-data-row group">
                                            <td className="px-6 py-5 font-black text-slate-900 text-[12px] uppercase tracking-tighter group-hover:text-blue-700 transition-colors">{resp.bidderName.replace(' ', '_')}</td>
                                            <td className="px-6 py-5 font-mono font-black text-slate-400 text-[10px]">{resp.submissionDate.toUpperCase()}</td>
                                            <td className="px-6 py-5 text-right font-mono font-black text-emerald-600 text-[13px] tracking-tighter">+${resp.totalBidAmount.toLocaleString()}.00</td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-[9px] font-black px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-widest italic shadow-sm">{resp.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!solicitation.responses || solicitation.responses.length === 0) && (
                                        <tr><td colSpan={4} className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] italic">ZERO_RESPONSES_RECORDED :: MONITORING_VORTEX_ACTIVE</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="space-y-6 italic">
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] border-b border-slate-100 pb-3 italic">Acquisition Document Vault</h3>
                        {relatedDocs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {relatedDocs.map(d => (
                                    <div key={d.id} className="pro-card p-5 bg-slate-50 border-slate-200 flex justify-between items-center hover:bg-slate-100 hover:border-blue-300 group transition-all shadow-sm">
                                        <div className="flex items-center gap-5">
                                            <div className="p-2.5 bg-slate-900 rounded-sm text-white group-hover:bg-blue-600 transition-all shadow-md">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-[11px] uppercase tracking-tight leading-none mb-1.5">{d.name.replace(' ', '_')}</p>
                                                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                                    <span className="text-blue-600">{d.type}</span>
                                                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                                    <span>UPLOAD_TS::{d.uploadedDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn-pro-secondary py-1.5 h-auto px-4 text-[9px] font-black uppercase tracking-widest italic group-hover:bg-slate-950 group-hover:text-white transition-all shadow-sm">VIEW_REQUISITION</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <div className="pro-card p-12 bg-slate-50 border-dashed border-slate-300 flex flex-col items-center justify-center italic opacity-60">
                                <FileText size={48} className="text-slate-300 mb-4" />
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">NULL_DOCUMENT_SET</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="space-y-8 italic">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 italic">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2 italic">
                                <FileText size={14} className="text-blue-500" /> Immutable Operational Log
                            </h3>
                            <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 tracking-widest uppercase italic font-mono">
                                <Lock size={12} className="text-slate-300" /> SEC_AUDIT_LOCKED::ON
                            </div>
                        </div>
                        <div className="space-y-6 pt-2 pl-4 border-l-2 border-slate-100">
                            {(solicitation.history || []).map((event, i) => (
                                <div key={i} className="flex gap-8 relative group italic">
                                     <div className="absolute -left-[11px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 transition-all group-hover:border-blue-400 shadow-sm">
                                        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                                    </div>
                                    <div className="pro-card p-4 bg-slate-50 border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50/20 flex-1 transition-all shadow-sm">
                                        <div className="flex justify-between items-start mb-2 uppercase tracking-widest text-[9px] font-black italic">
                                            <p className="text-slate-400 font-mono tracking-tighter uppercase">{event.timestamp.toUpperCase()}</p>
                                            <span className="text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-sm shadow-sm">{event.action.replace(' ', '_')}</span>
                                        </div>
                                        <p className="font-black text-blue-900 text-[11px] uppercase tracking-tight leading-none mb-2 italic">AUTH:: {event.user.replace(' ', '_')}</p>
                                        {event.details && <p className="text-[10px] text-slate-500 italic mt-2 border-t border-slate-100 pt-2 leading-relaxed">{event.details}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="px-6 py-5 bg-slate-950 border-t border-white/10 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] italic text-white/50">
                 <div className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-emerald-400 pulse-mission" />
                    ACQUISITION_INTEGRITY_SHIELD_OPERATIONAL
                </div>
                <div className="font-mono tracking-tighter text-white/20 uppercase">SEC_TRACE_NODE::PROC_SOL_CMD</div>
            </div>
        </div>
    </div>
            </div>
        </div>
    );
};
