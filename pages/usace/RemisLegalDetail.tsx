import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_CLAIMS, USACE_ASSETS, DOCUMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Gavel, Calendar, DollarSign, FileText, CheckCircle, Lock, Building, Scale, AlertTriangle, User } from 'lucide-react';
import { LegalClaim, AuditEvent } from '../../types';
import { LegalClaimModal } from './components/LegalClaimModal';

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

    const handleSave = (updatedRecord: Partial<LegalClaim>, reason: string) => {
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
        <div className="space-y-6">
            <LegalClaimModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} claim={claim} />
            <div>
                <button onClick={() => navigate('/usace/legal')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Claims</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">Claim: {claim.claimantInfo?.name}</h1>
                            <span className="text-xs bg-red-100 text-red-800 border border-red-200 px-2 py-1 rounded-full font-bold">{claim.claimType}</span>
                        </div>
                        <p className="text-slate-500 font-mono">{claim.id} • Asset: {asset?.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200`}>{claim.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Update Claim</button>
                        <RegulatoryBadge refs={['9']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('adjudication')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'adjudication' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Adjudication & Payments</button>
                        <button onClick={() => setActiveTab('documents')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'documents' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Evidence & Docs</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Claimant Data</h3>
                                <DetailItem label="Name" value={claim.claimantInfo?.name} icon={User} isProtected />
                                <DetailItem label="Address" value={claim.claimantInfo?.address || '-'} icon={Building} isProtected />
                                <DetailItem label="Phone" value={claim.claimantInfo?.phone || '-'} icon={User} isProtected />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Lifecycle Status</h3>
                                <div className="space-y-4">
                                    {LIFECYCLE_STATES.map((state, i) => (
                                        <div key={state} className={`flex items-center gap-3 ${i > currentStateIndex ? 'opacity-40' : ''}`}>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < currentStateIndex ? 'bg-green-500 text-white' : i === currentStateIndex ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                {i < currentStateIndex ? <CheckCircle size={14} /> : i + 1}
                                            </div>
                                            <span className={`text-sm ${i === currentStateIndex ? 'font-bold text-blue-700' : 'text-slate-700'}`}>{state}</span>
                                        </div>
                                    ))}
                                </div>
                                {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                    <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm mt-4">
                                        Advance to {LIFECYCLE_STATES[currentStateIndex + 1]}
                                    </button>
                                )}
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Incident & Basis</h3>
                                <DetailItem label="Incident Date" value={claim.incidentDate} icon={Calendar} />
                                <DetailItem label="Statutory Basis" value={claim.statutoryBasis} icon={Scale} />
                                <DetailItem label="Jurisdiction" value={claim.jurisdiction} icon={Gavel} />
                                <div className="mt-4 bg-slate-50 p-3 rounded border">
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Description</p>
                                    <p className="text-sm text-slate-800">{claim.description}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'adjudication' && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Gavel size={18}/> Determination</h3>
                                    <div className="space-y-4">
                                        <DetailItem label="Assigned Office" value={claim.assignedOffice} icon={Building} />
                                        <DetailItem label="Official" value={claim.responsibleOfficial} icon={User} />
                                        <div className="flex justify-between items-center bg-white p-3 rounded border">
                                            <span className="text-sm font-semibold">Claim Amount</span>
                                            <span className="text-lg font-bold">${claim.claimAmount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-white p-3 rounded border border-blue-200">
                                            <span className="text-sm font-semibold">Settlement Amount</span>
                                            <span className="text-lg font-bold text-blue-700">${claim.settlementAmount?.toLocaleString() || '0.00'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><DollarSign size={18}/> Payment Record (9.3.3)</h3>
                                    {claim.paymentDetails ? (
                                        <div className="space-y-4">
                                            <DetailItem label="Paid Amount" value={`$${claim.paymentDetails.amount.toLocaleString()}`} icon={DollarSign} />
                                            <DetailItem label="Payment Date" value={claim.paymentDetails.date} icon={Calendar} />
                                            <DetailItem label="Authority" value={claim.paymentDetails.authority} icon={Scale} />
                                            <DetailItem label="Transaction Ref" value={claim.paymentDetails.transactionReference} icon={FileText} />
                                            <div className="mt-4 p-2 bg-green-100 text-green-800 text-xs rounded font-bold text-center">Payment Finalized</div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-slate-500 text-sm mb-4">No payment recorded.</p>
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Record Payment</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800">Legal Documents & Evidence</h3>
                            {relatedDocs.length > 0 ? (
                                <div className="grid gap-3">{relatedDocs.map(d => (
                                    <div key={d.id} className="p-3 border rounded bg-slate-50 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <FileText size={16} className="text-slate-600"/>
                                            <div><p className="font-semibold text-sm">{d.name}</p><p className="text-xs text-slate-500">{d.type} • {d.uploadedDate}</p></div>
                                        </div>
                                        <button className="text-blue-600 text-sm hover:underline">View</button>
                                    </div>
                                ))}</div>
                            ) : <p className="text-sm text-slate-500 italic">No documents attached.</p>}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800">Immutable Audit Trail</h3>
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Securely Logged</div>
                            </div>
                            <div className="space-y-4">
                                {(claim.history || []).map((event, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex flex-col items-center"><div className={`w-4 h-4 rounded-full ring-4 ${i === 0 ? 'bg-blue-500 ring-blue-100 animate-pulse' : 'bg-slate-300 ring-slate-100'} z-10`}></div><div className="w-0.5 flex-1 bg-slate-200"></div></div>
                                        <div>
                                            <p className="text-xs text-slate-500">{event.timestamp}</p>
                                            <p className="font-medium text-slate-800">{event.action} by {event.user}</p>
                                            {event.details && <p className="text-sm text-slate-600 mt-1 p-2 bg-slate-50 rounded-md border">{event.details}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};