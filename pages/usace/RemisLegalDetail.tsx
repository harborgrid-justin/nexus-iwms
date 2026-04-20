
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_CLAIMS, USACE_ASSETS, DOCUMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Gavel, Calendar, DollarSign, FileText, CheckCircle, Lock, Building, Scale, AlertTriangle, User } from 'lucide-react';
import { LegalClaim, AuditEvent } from '../../types';
import { LegalClaimModal } from './components/LegalClaimModal';
import { validateLegalStatute, validateAuditCommentDetail } from '../../utils/usaceRules';

const LIFECYCLE_STATES: LegalClaim['lifecycleState'][] = ['Received', 'Under Investigation', 'Adjudicated', 'Settled', 'Denied', 'Paid', 'Closed'];

export const RemisLegalDetail: React.FC = () => {
    const { claimId } = useParams<{ claimId: string }>();
    const navigate = useNavigate();
    const [claim, setClaim] = useState<LegalClaim | undefined>(USACE_CLAIMS.find(c => c.id === claimId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!claim) {
        return <div className="p-6">Claim record not found. <Link to="/usace/legal" className="text-blue-600">Return to Claims Ledger</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === claim.assetId);
    const relatedDocs = DOCUMENTS.filter(d => claim.documentIds.includes(d.id));

    // Rule 39 Check
    const statuteCheck = validateLegalStatute(claim);

    const handleSave = (updatedRecord: Partial<LegalClaim>, reason: string) => {
        const commentCheck = validateAuditCommentDetail(reason);
        if (!commentCheck.allowed) {
            alert(commentCheck.reason);
            // In strict mode we might return, but for simulation we proceed with warning
        }

        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Amanda Legal', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setClaim(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: LegalClaim['lifecycleState']) => {
        // 9.7.2 Enforce valid transitions (simulation)
        if (newState === 'Paid' && claim.lifecycleState === 'Denied') {
            alert('Error: Cannot pay a denied claim.');
            return;
        }
        if (newState === 'Closed' && !['Paid', 'Denied', 'Settled'].includes(claim.lifecycleState)) {
             alert('Error: Claim must be fully adjudicated/paid before closing (Req 9.7.4).');
             return;
        }

        const reason = `Lifecycle state advanced from ${claim.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Amanda Legal', 
            action: 'State Transition',
            details: reason,
        };
        setClaim(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(claim.lifecycleState);

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
        <LegalClaimModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} claim={claim} />
        <div className="border-b border-slate-200 pb-6">
            <button onClick={() => navigate('/usace/legal')} className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-blue-600 mb-4 transition-colors uppercase tracking-[0.2em] italic"><ArrowLeft size={14} /> Back to Command Legal Ledger</button>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-slate-950 rounded shadow-xl shadow-black/20 text-white">
                        <Scale size={32} className="text-blue-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">Claim: {claim.claimantInfo?.name?.replace(' ', '_')}</h1>
                            <div className="pulse-mission" />
                            <span className="text-[9px] font-black px-2.5 py-1 rounded-sm border uppercase tracking-widest italic leading-none bg-red-950 text-white border-red-900">
                                TYPE::{claim.claimType.toUpperCase()}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 italic">
                            <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-tighter">CLAIM_ID::{claim.id}</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-tighter italic">ASSET_NODE::{asset?.rpuid || "ORPHANED_RECORD"}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end mr-4 group cursor-help italic">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic leading-none">Lifecycle Phase</span>
                        <span className="text-xs font-black px-3 py-1 bg-slate-950 text-white uppercase tracking-widest leading-none border border-white/5">{claim.lifecycleState.toUpperCase()}</span>
                    </div>
                    <button onClick={() => setIsEditModalOpen(true)} className="btn-pro-secondary flex items-center gap-2 px-4 py-2 h-auto text-[10px] font-black uppercase tracking-widest italic group animate-pulse-subtle">
                        <Edit size={14} className="group-hover:text-amber-400" /> Modify Manifest Matrix
                    </button>
                    <RegulatoryBadge refs={['ER 405-1-12', 'Rule 39']} />
                </div>
            </div>
        </div>

        {!statuteCheck.allowed && (
            <div className="p-4 bg-red-950 border border-red-900 rounded-sm flex items-start gap-4 animate-in fade-in slide-in-from-top-2 shadow-xl">
                <AlertTriangle className="text-red-400 mt-0.5" size={20} />
                <div>
                    <h4 className="text-[11px] font-black text-red-400 uppercase tracking-widest mb-1 italic">STRATEGIC_COMPLIANCE_FAILURE::PROTOCOL_LOCK</h4>
                    <p className="text-[11px] font-black text-white/80 uppercase tracking-tight leading-relaxed italic">{statuteCheck.reason}</p>
                </div>
            </div>
        )}

        <div className="pro-card flex flex-col bg-white overflow-hidden shadow-2xl border-slate-200">
            <div className="px-6 border-b border-white/5 bg-[#0A0A0B]">
                <nav className="-mb-px flex gap-10" aria-label="Tabs">
                    {[
                        { id: 'overview', label: 'Tactical Overview' },
                        { id: 'adjudication', label: 'Adjudication Control' },
                        { id: 'documents', label: 'Evidence Vault' },
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

            <div className="p-10">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 italic">
                        <div className="space-y-10">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border-b border-slate-100 pb-3 italic">Claimant Identification Node</h3>
                            <div className="space-y-6">
                                <DetailItem label="Full Name" value={claim.claimantInfo?.name} icon={User} isProtected />
                                <DetailItem label="Legal Address" value={claim.claimantInfo?.address || '-'} icon={Building} isProtected />
                                <DetailItem label="Comms Vector" value={claim.claimantInfo?.phone || '-'} icon={User} isProtected />
                            </div>
                        </div>
                        <div className="space-y-10">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border-b border-slate-100 pb-3 italic">Procedural Workflow Chain</h3>
                            <div className="space-y-4 relative pl-4">
                                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-slate-100" />
                                {LIFECYCLE_STATES.map((state, i) => (
                                    <div key={state} className={`flex items-center gap-5 group transition-all ${i > currentStateIndex ? 'opacity-20' : 'opacity-100'}`}>
                                        <div className={`w-8 h-8 rounded-none flex items-center justify-center text-[10px] font-black font-mono shadow-sm border transition-all ${i < currentStateIndex ? 'bg-emerald-600 border-emerald-500 text-white' : i === currentStateIndex ? 'bg-blue-600 border-blue-500 text-white scale-110 shadow-xl shadow-blue-500/20 animate-pulse' : 'bg-white border-slate-200 text-slate-400'}`}>
                                            {i < currentStateIndex ? <CheckCircle size={16} /> : <span>{i + 1}</span>}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest italic ${i === currentStateIndex ? 'text-blue-900 group-hover:text-blue-600 underline underline-offset-8 decoration-blue-400/30' : 'text-slate-500'}`}>{state}</span>
                                    </div>
                                ))}
                            </div>
                            {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="btn-pro-primary w-full py-3 h-auto text-[10px] font-black uppercase tracking-[0.25em] italic mt-8 shadow-2xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">
                                    ADVANCE_LIFECYCLE:: {LIFECYCLE_STATES[currentStateIndex + 1]}
                                </button>
                            )}
                        </div>
                        <div className="space-y-10">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border-b border-slate-100 pb-3 italic">Incident Basis & Statutory Basis</h3>
                            <div className="space-y-6">
                                <DetailItem label="Epoch Date" value={claim.incidentDate} icon={Calendar} />
                                <DetailItem label="Statutory Source" value={claim.statutoryBasis} icon={Scale} />
                                <DetailItem label="Active Jurisdiction" value={claim.jurisdiction} icon={Gavel} />
                            </div>
                            <div className="mt-8 p-6 bg-slate-900 border border-white/5 rounded-none italic shadow-2xl">
                                <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.3em] mb-3">Incident_Log_Excerpt</p>
                                <p className="text-[11px] font-black text-white/60 uppercase tracking-tighter leading-relaxed italic">{claim.description}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'adjudication' && (
                    <div className="space-y-8 italic">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8 italic">
                            <div className="pro-card p-8 bg-slate-50 border-slate-200 shadow-xl italic font-black">
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] mb-10 flex items-center gap-4 italic border-b border-slate-100 pb-4">
                                    <Gavel size={20} className="text-blue-600" /> Official Determination Matrix
                                </h3>
                                <div className="space-y-8 italic">
                                    <DetailItem label="Assigned Command Office" value={claim.assignedOffice} icon={Building} />
                                    <DetailItem label="Investigating Official" value={claim.responsibleOfficial} icon={User} />
                                    <div className="flex justify-between items-center bg-white p-5 border border-slate-200 rounded-none italic shadow-inner">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Gross Claim Magnitude</span>
                                        <span className="text-2xl font-black font-mono tracking-tighter text-slate-900">${claim.claimAmount.toLocaleString()}.00</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-blue-950 p-5 border border-blue-900 rounded-none italic shadow-2xl relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors pointer-events-none" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 z-10">Settlement Calibration</span>
                                        <span className="text-2xl font-black font-mono tracking-tighter text-blue-400 z-10 underline underline-offset-8 decoration-blue-400/20">${claim.settlementAmount?.toLocaleString() || '0.00'}.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pro-card p-8 bg-white border-slate-200 shadow-xl italic font-black">
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] mb-10 flex items-center gap-4 italic border-b border-slate-100 pb-4">
                                    <DollarSign size={20} className="text-emerald-600" /> Strategic Fund Disbursement (9.3.3)
                                </h3>
                                {claim.paymentDetails ? (
                                    <div className="space-y-8 italic">
                                        <DetailItem label="Disbursed Sum" value={`$${claim.paymentDetails.amount.toLocaleString()}.00`} icon={DollarSign} />
                                        <DetailItem label="Execution Epoch" value={claim.paymentDetails.date} icon={Calendar} />
                                        <DetailItem label="Spending Authority" value={claim.paymentDetails.authority} icon={Scale} />
                                        <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 rounded-none italic shadow-inner">
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">TX_REF_NODE_UUID</span>
                                            <span className="text-[10px] font-mono font-black text-blue-600 tracking-tighter">{claim.paymentDetails.transactionReference.toUpperCase()}</span>
                                        </div>
                                        <div className="mt-8 py-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-emerald-600/20 text-center italic border border-emerald-400">STATUS::MISSION_PAYMENT_FINALIZED</div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-100 rounded-none h-full italic opacity-60">
                                        <DollarSign size={48} className="text-slate-200 mb-6" />
                                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8 italic">DISBURSEMENT_RECORD::DATA_NULL</p>
                                        <button className="btn-pro-primary h-auto py-3 px-10 text-[10px] uppercase font-black tracking-[0.3em] italic shadow-2xl shadow-blue-600/20">Init_Payment_Protocol</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="space-y-10 italic">
                        <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] flex items-center gap-3 italic border-b border-slate-100 pb-4 uppercase">
                            <FileText size={18} className="text-blue-500" /> Sovereign Documentation & Evidentiary Vault
                        </h3>
                        {relatedDocs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedDocs.map(d => (
                                    <div key={d.id} className="pro-card p-6 bg-slate-50 border-slate-200 hover:border-blue-500/50 flex justify-between items-center transition-all group cursor-pointer shadow-xl italic font-black">
                                        <div className="flex items-center gap-6">
                                            <div className="p-3 bg-slate-950 rounded-none shadow-2xl text-white group-hover:bg-blue-600 group-hover:scale-105 transition-all">
                                                <FileText size={20}/>
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 text-[13px] uppercase tracking-tighter leading-none mb-2 group-hover:text-blue-700 transition-colors italic">{d.name.replace(' ', '_')}</p>
                                                <div className="flex items-center gap-3 text-[9px] text-slate-400 font-black uppercase tracking-widest italic leading-none">
                                                    <span className="text-blue-500">{d.type}</span>
                                                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                                    <span>UPLOAD_TS::{d.uploadedDate.toUpperCase()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] italic hover:text-blue-400 transition-colors border-b border-transparent hover:border-blue-400/30 pb-0.5">VIEW_INDEX</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-20 text-center border-2 border-dashed border-slate-100 rounded-none text-slate-300 italic uppercase font-black text-[11px] tracking-[0.5em] flex flex-col items-center">
                                <FileText size={48} className="text-slate-100 mb-6" />
                                EVIDENTIARY_ARCHIVE_DATA_EMPTY
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="space-y-10 italic">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-5 italic font-black">
                            <h3 className="text-[11px] text-slate-900 uppercase tracking-[0.4em] flex items-center gap-3 italic">
                                <FileText size={16} className="text-blue-500" /> Tactical Operational History Ledger
                            </h3>
                            <div className="flex items-center gap-3 text-[9px] text-slate-400 tracking-[0.3em] uppercase italic font-mono">
                                <Lock size={12} className="text-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" /> SEC_AUDIT_LOCKED::ON
                            </div>
                        </div>
                        <div className="space-y-8 pt-4 pl-6 border-l-2 border-slate-100">
                            {(claim.history || []).map((event, i) => (
                                <div key={i} className="flex gap-10 relative group italic font-black">
                                     <div className="absolute -left-[13px] top-2 w-5 h-5 rounded-none bg-white border-2 border-slate-200 flex items-center justify-center z-10 transition-all group-hover:border-blue-400 shadow-sm group-hover:scale-110">
                                        <div className={`w-2 h-2 rounded-none ${i === 0 ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                                    </div>
                                    <div className="pro-card p-6 bg-slate-50 border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50/20 flex-1 transition-all shadow-xl italic">
                                        <div className="flex justify-between items-start mb-4 italic">
                                            <p className="text-[10px] font-black text-slate-400 font-mono tracking-tighter uppercase italic">{event.timestamp.toUpperCase()}</p>
                                            <span className="text-[9px] font-black text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 uppercase tracking-widest italic shadow-sm">{event.action.replace(' ', '_')}</span>
                                        </div>
                                        <p className="font-black text-slate-900 text-[12px] uppercase tracking-tighter leading-none mb-3 italic">AUTHORIZED_PERSONNEL::{event.user.replace(' ', '_')}</p>
                                        {event.details && <p className="text-[11px] text-slate-500 italic mt-3 border-t border-slate-200 pt-3 leading-relaxed tracking-tight">{event.details}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="px-6 py-5 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] italic text-white/40">
                <div className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-emerald-500 pulse-mission" />
                    ACQUISITION_INTEGRITY_SHIELD_OPERATIONAL::LEGAL_L4
                </div>
                <div className="font-mono text-white/10 tracking-[0.2em] uppercase text-[9px]">TRACE_NODE::LEGAL_CLAIM_CMD_NODE_V1.2</div>
            </div>
        </div>
    </div>
    );
};
