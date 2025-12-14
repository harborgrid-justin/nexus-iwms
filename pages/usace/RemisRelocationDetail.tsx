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
        setRelocation(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...prev.history!] } : undefined);
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
        setRelocation(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...prev.history!] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(relocation.lifecycleState);

    return (
        <div className="space-y-6">
            <RelocationModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} relocation={relocation} />
            <div>
                <button onClick={() => navigate('/usace/relocation')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Program</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">Relocation: {relocation.claimantName}</h1>
                            <Lock size={16} className="text-amber-500" title="Contains PII" />
                        </div>
                        <p className="text-slate-500 font-mono">{relocation.id} • Acq: {acquisition?.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200`}>{relocation.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Edit Case</button>
                        <RegulatoryBadge refs={['6']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('benefits')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'benefits' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Benefits & Payments</button>
                        <button onClick={() => setActiveTab('documents')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'documents' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Documents</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Claimant Profile</h3>
                                <DetailItem label="Name" value={relocation.claimantName} icon={User} isProtected />
                                <DetailItem label="Type" value={relocation.claimantType} icon={Home} />
                                <DetailItem label="Displacement" value={relocation.displacementType} icon={ShieldCheck} />
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
                                <h3 className="font-bold text-slate-800 border-b pb-2">Dates & Asset</h3>
                                <DetailItem label="Initiation Date" value={relocation.initiationDate} icon={Calendar} />
                                <DetailItem label="Eligibility Date" value={relocation.eligibilityDeterminationDate || 'Pending'} icon={Calendar} />
                                <DetailItem label="Related Asset" value={asset?.rpuid || 'N/A'} icon={Building} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'benefits' && (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-slate-50 p-4 rounded-xl border">
                                    <h3 className="font-bold text-slate-800 mb-2">Benefit Summary</h3>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase">Approved Total</p>
                                            <p className="text-2xl font-bold text-slate-900">${relocation.totalAssistance?.toLocaleString() || 0}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 uppercase">Paid to Date</p>
                                            <p className="text-2xl font-bold text-green-600">${relocation.totalBenefitsPaid?.toLocaleString() || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-800 mb-4">Benefit Line Items</h3>
                            <div className="bg-slate-50 rounded-lg border mb-8">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Type</th>
                                            <th className="p-3 font-semibold text-right">Claimed</th>
                                            <th className="p-3 font-semibold text-right">Approved</th>
                                            <th className="p-3 font-semibold">Status</th>
                                            <th className="p-3 font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {relocation.benefits.map(b => (
                                            <tr key={b.id}>
                                                <td className="p-3">{b.type}</td>
                                                <td className="p-3 text-right">${b.amountClaimed.toLocaleString()}</td>
                                                <td className="p-3 text-right font-medium">${b.amountApproved.toLocaleString()}</td>
                                                <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full font-bold ${b.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{b.status}</span></td>
                                                <td className="p-3"><button className="text-blue-600 hover:underline">Review</button></td>
                                            </tr>
                                        ))}
                                        {relocation.benefits.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-slate-500 italic">No benefits recorded yet.</td></tr>}
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="font-bold text-slate-800 mb-4">Payment History (Fund Transactions)</h3>
                            <div className="bg-slate-50 rounded-lg border">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Date</th>
                                            <th className="p-3 font-semibold">Transaction ID</th>
                                            <th className="p-3 font-semibold">Description</th>
                                            <th className="p-3 font-semibold text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {relatedPayments.map(p => (
                                            <tr key={p.id}>
                                                <td className="p-3">{p.date}</td>
                                                <td className="p-3 font-mono text-blue-600">{p.id}</td>
                                                <td className="p-3">{p.description}</td>
                                                <td className="p-3 text-right font-mono">${p.amount.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                        {relatedPayments.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-slate-500 italic">No payments found.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800">Case Documents</h3>
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
                                <h3 className="font-bold text-slate-800">Audit Trail</h3>
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Immutable Log</div>
                            </div>
                            <div className="space-y-4">
                                {relocation.history?.map((event, i) => (
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