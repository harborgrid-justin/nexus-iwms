
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_RELOCATION, USACE_ACQUISITIONS, USACE_ASSETS, DOCUMENTS, FUND_TRANSACTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, User, Home, Calendar, DollarSign, FileText, CheckCircle, Lock, ShieldCheck, Banknote, Building } from 'lucide-react';
import { RelocationCase, AuditEvent } from '../../types';
import { RelocationModal } from './components/RelocationModal';

const LIFECYCLE_STATES: RelocationCase['lifecycleState'][] = ['Initiated', 'Eligibility Determined', 'Assistance Approved', 'Assistance Provided', 'Closed'];

export const RemisRelocationDetail: React.FC = () => {
    const { relocationId } = useParams<{ relocationId: string }>();
    const navigate = useNavigate();
    const [relocation, setRelocation] = useState<RelocationCase | undefined>(USACE_RELOCATION.find(r => r.id === relocationId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!relocation) {
        return <div className="p-6">Relocation case not found. <Link to="/usace/relocation" className="text-blue-600">Return to Program</Link></div>;
    }

    const acquisition = USACE_ACQUISITIONS.find(a => a.id === relocation.acquisitionId);
    const asset = USACE_ASSETS.find(a => a.id === relocation.assetId || a.id === acquisition?.assetId);
    const relatedDocs = DOCUMENTS.filter(d => relocation.documentIds.includes(d.id));
    const relatedPayments = FUND_TRANSACTIONS.filter(ft => ft.relocationCaseId === relocation.id);

    const handleSave = (updatedRecord: Partial<RelocationCase>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Linda Grey', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setRelocation(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: RelocationCase['lifecycleState']) => {
        // 6.7.4 Prevent closure with pending obligations (simulation)
        if (newState === 'Closed' && relocation.totalBenefitsPaid < relocation.totalAssistance) {
            alert('Compliance Error: Cannot close case with outstanding benefit obligations.');
            return;
        }

        const reason = `Lifecycle state advanced from ${relocation.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Linda Grey', 
            action: 'State Transition',
            details: reason,
        };
        setRelocation(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(relocation.lifecycleState);

    return (
    <div className="max-w-[1600px] mx-auto space-y-6">
        <RelocationModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} relocation={relocation} />
        <div className="border-b border-slate-200 pb-6">
            <button onClick={() => navigate('/usace/relocation')} className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-blue-600 mb-4 transition-colors uppercase tracking-[0.2em] italic"><ArrowLeft size={14} /> Back to Relocation Program Hub</button>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-slate-950 rounded shadow-xl shadow-black/20 text-white">
                        <Users size={32} className="text-blue-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">Relocation Protocol: {relocation.claimantName}</h1>
                            <div className="pulse-mission" />
                            <span className="text-[10px] font-black px-2.5 py-1 bg-slate-900 text-white rounded-sm uppercase tracking-widest italic shadow-sm flex items-center gap-2">
                                <Lock size={12} className="text-amber-500" /> SEC_PII_PROTECTED
                            </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 italic">
                            <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-tighter">CASE_ID::{relocation.id}</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-tighter">ACQUISITION_NODE::{acquisition?.id}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end mr-4">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Lifecycle State</span>
                        <span className="text-xs font-black px-3 py-1 uppercase tracking-widest leading-none border shadow-sm bg-slate-900 border-slate-800 text-white italic">
                            {relocation.lifecycleState.replace(' ', '_')}
                        </span>
                    </div>
                    <button onClick={() => setIsEditModalOpen(true)} className="btn-pro-secondary flex items-center gap-2 px-4 py-2 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                        <Edit size={14} className="group-hover:text-blue-500" /> Modify Case Schematic
                    </button>
                    <RegulatoryBadge refs={['URA', 'Section 6']} />
                </div>
            </div>
        </div>

        <div className="pro-card flex flex-col bg-white overflow-hidden shadow-2xl border-slate-200">
            <div className="px-6 border-b border-white/5 bg-[#0A0A0B]">
                <nav className="-mb-px flex gap-10" aria-label="Tabs">
                    {[
                        { id: 'overview', label: 'Case Overview' },
                        { id: 'benefits', label: 'Statutory Benefits' },
                        { id: 'documents', label: 'Document Vault' },
                        { id: 'history', label: 'History Ledger' }
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
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">Claimant Profile Vector</h3>
                            <div className="space-y-4">
                                <DetailItem label="Legal Name" value={relocation.claimantName} icon={User} isProtected />
                                <DetailItem label="Claimant Type" value={relocation.claimantType} icon={Home} />
                                <DetailItem label="Displacement Vector" value={relocation.displacementType} icon={ShieldCheck} />
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
                                <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="btn-pro-primary w-full py-2.5 h-auto text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                                    ELEVATE_TO:: {LIFECYCLE_STATES[currentStateIndex + 1]}
                                </button>
                            )}
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3">Temporal & Asset Telemetry</h3>
                            <div className="space-y-4">
                                <DetailItem label="Initiation Epoch" value={relocation.initiationDate} icon={Calendar} />
                                <DetailItem label="Eligibility Determination" value={relocation.eligibilityDeterminationDate || 'PENDING'} icon={Calendar} />
                                <DetailItem label="Strategic Asset Node" value={asset?.rpuid || 'N/A'} icon={Building} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'benefits' && (
                    <div className="space-y-10 italic">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="pro-card p-6 bg-slate-900 border-slate-800 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><DollarSign size={80} className="text-white" /></div>
                                <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-6 relative z-10">Statutory Benefit Aggregate</h3>
                                <div className="flex justify-between items-end relative z-10">
                                    <div>
                                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2 leading-none">Approved Limit</p>
                                        <p className="text-4xl font-black text-white tracking-tighter font-mono">${relocation.totalAssistance?.toLocaleString() || 0}_USD</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2 leading-none">Disbursed Funds</p>
                                        <p className="text-4xl font-black text-emerald-400 tracking-tighter font-mono">${relocation.totalBenefitsPaid?.toLocaleString() || 0}_NET</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2 italic">
                                <Banknote size={16} className="text-blue-500" /> Benefit Line-Item Matrix
                            </h3>
                            <div className="pro-card border-slate-200 overflow-hidden shadow-md">
                                <table className="w-full text-left">
                                    <thead className="bg-[#1A1B1E] border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic">BENEFIT_SCHEMATIC</th>
                                            <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic text-right">CLAIM_MAGNITUDE</th>
                                            <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic text-right">APPROVED_QUOTA</th>
                                            <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic text-center">FUNDS_STATUS</th>
                                            <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic text-right">OPERATION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {relocation.benefits.map(b => (
                                            <tr key={b.id} className="pro-data-row group">
                                                <td className="px-6 py-5 font-black text-slate-900 text-[12px] uppercase tracking-tighter group-hover:text-blue-700 transition-colors">{b.type.replace(' ', '_')}</td>
                                                <td className="px-6 py-5 text-right font-mono font-black text-slate-500 text-[12px] tracking-tighter uppercase">${b.amountClaimed.toLocaleString()}</td>
                                                <td className="px-6 py-5 text-right font-mono font-black text-emerald-600 text-[13px] tracking-tighter uppercase">${b.amountApproved.toLocaleString()}</td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className={`text-[9px] font-black px-3 py-1 rounded-full border uppercase tracking-widest italic shadow-sm transition-all ${b.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>{b.status}</span>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <button className="btn-pro-secondary py-1.5 h-auto px-4 text-[9px] font-black uppercase tracking-widest italic group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">VERIFY_CLAIM</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {relocation.benefits.length === 0 && <tr><td colSpan={5} className="px-6 py-8 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic">NO_BENEFIT_ENTRIES_FOUND (NULL_SET)</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2 italic text-blue-950">
                                <DollarSign size={16} className="text-blue-500" /> Strategic Fund Disbursement History
                            </h3>
                            <div className="pro-card border-slate-200 overflow-hidden shadow-md">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">TX_DATE</th>
                                            <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">TRANSACTION_HASH</th>
                                            <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">OPERATIONAL_DESC</th>
                                            <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic text-right">MAGNITUDE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-mono italic">
                                        {relatedPayments.map(p => (
                                            <tr key={p.id} className="pro-data-row group">
                                                <td className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-tighter">{p.date}</td>
                                                <td className="px-6 py-5 font-black text-blue-600 text-[11px] uppercase tracking-tighter">{p.id}</td>
                                                <td className="px-6 py-5 font-black text-slate-700 text-[11px] uppercase tracking-tighter">{p.description}</td>
                                                <td className="px-6 py-5 text-right font-black text-emerald-700 text-[12px] tracking-tighter uppercase leading-none">+${p.amount.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                        {relatedPayments.length === 0 && <tr><td colSpan={4} className="px-6 py-8 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic">NO_TRANSACTION_TELEMETRY</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="space-y-6 italic">
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] border-b border-slate-100 pb-3 italic">Strategic Case Document Vault</h3>
                        {relatedDocs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {relatedDocs.map(d => (
                                    <div key={d.id} className="pro-card p-5 bg-slate-50 border-slate-200 flex justify-between items-center hover:bg-slate-100 hover:border-blue-300 group transition-all shadow-sm">
                                        <div className="flex items-center gap-5">
                                            <div className="p-2.5 bg-slate-900 rounded-sm text-white group-hover:scale-110 group-hover:bg-blue-600 transition-all shadow-md">
                                                <FileText size={18} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-[11px] uppercase tracking-tight leading-none mb-1.5">{d.name.replace(' ', '_')}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{d.type}</span>
                                                    <div className="w-0.5 h-0.5 bg-slate-300" />
                                                    <span className="text-[9px] font-mono font-black text-slate-400 uppercase tracking-tighter italic">UPLOAD_DATE::{d.uploadedDate}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn-pro-secondary py-1.5 h-auto px-4 text-[9px] font-black uppercase tracking-widest italic group-hover:bg-slate-950 group-hover:text-white transition-all">VIEW_REQUISITION</button>
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
                    <div className="space-y-8">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 italic">
                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2 italic">
                                <FileText size={14} className="text-blue-500" /> Immutable Operational Log
                            </h3>
                            <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 tracking-widest uppercase italic font-mono">
                                <Lock size={12} className="text-slate-300" /> INTEGRITY_HASH::SHA256_ACTIVE
                            </div>
                        </div>
                        <div className="space-y-6 pt-2 pl-4 border-l-2 border-slate-100 italic">
                            {relocation.history?.map((event, i) => (
                                <div key={i} className="flex gap-8 relative group">
                                     <div className="absolute -left-[11px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 transition-all group-hover:border-blue-400">
                                        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                                    </div>
                                    <div className="pro-card p-4 bg-slate-50 border-slate-200 group-hover:border-blue-200 flex-1 transition-all shadow-sm">
                                        <div className="flex justify-between items-start mb-2 uppercase tracking-widest text-[9px]">
                                            <p className="font-black text-slate-400 font-mono tracking-tighter italic">{event.timestamp.toUpperCase()}</p>
                                            <span className="text-[8px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-sm italic">{event.action.replace(' ', '_')}</span>
                                        </div>
                                        <p className="font-black text-blue-900/80 text-[11px] uppercase tracking-tight leading-none mb-2 italic">CMD_OFFICER::{event.user.replace(' ', '_')}</p>
                                        {event.details && <p className="text-[10px] text-slate-500 italic mt-2 border-t border-slate-100 pt-2 leading-relaxed">{event.details}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="px-6 py-5 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] italic">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={14} className="text-emerald-400 pulse-mission" />
                    Statutory Relocation Protocol Integrated Compliance Authenticated
                </div>
                <div className="text-white/20 font-mono tracking-tighter">SEC_VALID_NODE_HASH::URA_LOGISTICS_CMD</div>
            </div>
        </div>
    </div>
            </div>
        </div>
    );
};