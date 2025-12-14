import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_PERMITS, USACE_ASSETS, DOCUMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, FileText, Calendar, ShieldCheck, CheckCircle, Lock, Building, Users, MapPin, Scale } from 'lucide-react';
import { Permit, AuditEvent } from '../../types';
import { PermitModal } from './components/PermitModal';

const LIFECYCLE_STATES: Permit['lifecycleState'][] = ['Drafted', 'Submitted', 'Under Review', 'Issued', 'Active', 'Expired', 'Closed', 'Archived'];

export const RemisPermitDetail: React.FC = () => {
    const { permitId } = useParams<{ permitId: string }>();
    const navigate = useNavigate();
    const [permit, setPermit] = useState<Permit | undefined>(USACE_PERMITS.find(p => p.id === permitId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!permit) {
        return <div className="p-6">Permit record not found. <Link to="/usace/permits" className="text-blue-600">Return to Dashboard</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === permit.assetId);
    const relatedDocs = DOCUMENTS.filter(d => permit.documentIds.includes(d.id));

    const handleSave = (updatedRecord: Partial<Permit>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Reggie Permit', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setPermit(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: Permit['lifecycleState']) => {
        // 13.7.4 Prevent activation without issuance dates
        if (newState === 'Active' && (!permit.issueDate || !permit.effectiveDate)) {
            alert('Compliance Error (13.7.4): Cannot Activate permit without Issue Date and Effective Date.');
            return;
        }

        const reason = `Lifecycle state advanced from ${permit.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'District Commander', 
            action: 'State Transition',
            details: reason,
        };
        setPermit(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(permit.lifecycleState);

    return (
        <div className="space-y-6">
            <PermitModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} permit={permit} />
            <div>
                <button onClick={() => navigate('/usace/permits')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Dashboard</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">{permit.uniqueIdentifier}</h1>
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded border text-slate-600 font-mono">{permit.type}</span>
                        </div>
                        <p className="text-slate-500 font-mono mt-1">Asset: {asset?.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200`}>{permit.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Update Permit</button>
                        <RegulatoryBadge refs={['13']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('parties')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'parties' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Parties & Addresses</button>
                        <button onClick={() => setActiveTab('lifecycle')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'lifecycle' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Lifecycle</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Audit & Compliance</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Authority & Asset</h3>
                                <DetailItem label="Asset Name" value={asset?.name} icon={Building} />
                                <DetailItem label="Authority" value={permit.authority} icon={Scale} />
                                <DetailItem label="Permit Type" value={permit.type} icon={FileText} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Key Dates</h3>
                                <DetailItem label="Issue Date" value={permit.issueDate || 'Pending'} icon={Calendar} />
                                <DetailItem label="Effective Date" value={permit.effectiveDate || 'Pending'} icon={CheckCircle} />
                                <DetailItem label="Expiration Date" value={permit.expirationDate || 'N/A'} icon={Calendar} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Description</h3>
                                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded border">{permit.description}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'parties' && (
                        <div>
                            <h3 className="font-bold text-slate-800 mb-4">Permit Parties</h3>
                            <div className="bg-slate-50 rounded-lg border overflow-hidden mb-8">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Role</th>
                                            <th className="p-3 font-semibold">Name</th>
                                            <th className="p-3 font-semibold">Email</th>
                                            <th className="p-3 font-semibold">Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {permit.parties.map((p, idx) => (
                                            <tr key={idx}>
                                                <td className="p-3 font-medium text-blue-600">{p.role}</td>
                                                <td className="p-3">{p.name}</td>
                                                <td className="p-3 text-slate-600">{p.email || '-'}</td>
                                                <td className="p-3 text-slate-600">{p.phone || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <h3 className="font-bold text-slate-800 mb-4">Permit Addresses</h3>
                            <div className="bg-slate-50 rounded-lg border overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Type</th>
                                            <th className="p-3 font-semibold">Address</th>
                                            <th className="p-3 font-semibold">City</th>
                                            <th className="p-3 font-semibold">State</th>
                                            <th className="p-3 font-semibold">Zip</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {permit.addresses.map((a, idx) => (
                                            <tr key={idx}>
                                                <td className="p-3 font-medium">{a.type}</td>
                                                <td className="p-3">{a.addressLine1}</td>
                                                <td className="p-3">{a.city}</td>
                                                <td className="p-3">{a.state}</td>
                                                <td className="p-3 font-mono">{a.zip}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lifecycle' && (
                        <div>
                            <div className="bg-slate-50 p-5 rounded-xl border mb-8 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Current State: {permit.lifecycleState}</h3>
                                    <p className="text-sm text-slate-600 mt-1">Status: {permit.status}</p>
                                </div>
                                <div className="flex gap-2">
                                    {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                        <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                                            Advance to {LIFECYCLE_STATES[currentStateIndex + 1]}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-800 mb-6">State Progression</h3>
                            <div className="flex items-center overflow-x-auto pb-4">
                                {LIFECYCLE_STATES.map((state, i) => (
                                    <React.Fragment key={state}>
                                        <div className="flex flex-col items-center min-w-[80px]">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${i <= currentStateIndex ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>
                                                {i < currentStateIndex ? <CheckCircle size={16}/> : <span className="text-xs font-bold">{i+1}</span>}
                                            </div>
                                            <p className={`text-xs mt-2 text-center font-medium ${i <= currentStateIndex ? 'text-blue-700' : 'text-slate-400'}`}>{state}</p>
                                        </div>
                                        {i < LIFECYCLE_STATES.length - 1 && <div className={`flex-1 h-1 min-w-[40px] ${i < currentStateIndex ? 'bg-blue-600' : 'bg-slate-200'}`}></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800">Immutable Audit Trail</h3>
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Securely Logged (Req 13.8)</div>
                            </div>
                            <div className="space-y-4">
                                {(permit.history || []).map((event, i) => (
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