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
        <div className="space-y-6">
            <SolicitationModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} solicitation={solicitation} />
            <div>
                <button onClick={() => navigate('/usace/solicitations')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Management</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">{solicitation.title}</h1>
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded border text-slate-600 font-mono">{solicitation.id}</span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">Asset: {asset?.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200`}>{solicitation.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Edit Record</button>
                        <RegulatoryBadge refs={['8']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('biditems')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'biditems' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Bid Items</button>
                        <button onClick={() => setActiveTab('responses')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'responses' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Responses (IFB)</button>
                        <button onClick={() => setActiveTab('documents')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'documents' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Documents</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Procurement Details</h3>
                                <DetailItem label="Type" value={solicitation.type} icon={Gavel} />
                                <DetailItem label="Method" value={solicitation.procurementMethod} icon={FileText} />
                                <DetailItem label="Point of Contact" value={solicitation.pointOfContact || 'N/A'} icon={User} />
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
                                <h3 className="font-bold text-slate-800 border-b pb-2">Schedule</h3>
                                <DetailItem label="Issue Date" value={solicitation.issueDate || 'Pending'} icon={Calendar} />
                                <DetailItem label="Close Date" value={solicitation.closeDate || 'Pending'} icon={Calendar} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'biditems' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800">Line Items</h3>
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-medium text-xs"><Plus size={14}/> Add Item</button>
                            </div>
                            <div className="bg-slate-50 rounded-lg border overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Item #</th>
                                            <th className="p-3 font-semibold">Description</th>
                                            <th className="p-3 font-semibold text-right">Qty</th>
                                            <th className="p-3 font-semibold">Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {(solicitation.bidItems || []).map((item) => (
                                            <tr key={item.id}>
                                                <td className="p-3 font-mono">{item.itemNumber}</td>
                                                <td className="p-3">{item.description}</td>
                                                <td className="p-3 text-right">{item.quantity}</td>
                                                <td className="p-3">{item.unit}</td>
                                            </tr>
                                        ))}
                                        {(!solicitation.bidItems || solicitation.bidItems.length === 0) && <tr><td colSpan={4} className="p-4 text-center text-slate-500 italic">No bid items defined.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'responses' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800">Bid Responses</h3>
                                <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                                    <Lock size={12} /> Responses are sealed until Opening Date.
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-lg border overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Bidder</th>
                                            <th className="p-3 font-semibold">Submission Date</th>
                                            <th className="p-3 font-semibold text-right">Total Bid</th>
                                            <th className="p-3 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {(solicitation.responses || []).map((resp) => (
                                            <tr key={resp.id}>
                                                <td className="p-3 font-medium">{resp.bidderName}</td>
                                                <td className="p-3 text-slate-600">{resp.submissionDate}</td>
                                                <td className="p-3 text-right font-mono">${resp.totalBidAmount.toLocaleString()}</td>
                                                <td className="p-3"><span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{resp.status}</span></td>
                                            </tr>
                                        ))}
                                        {(!solicitation.responses || solicitation.responses.length === 0) && <tr><td colSpan={4} className="p-4 text-center text-slate-500 italic">No responses received yet.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800">Solicitation Documents</h3>
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
                                {(solicitation.history || []).map((event, i) => (
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
