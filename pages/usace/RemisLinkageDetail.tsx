import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_LINKAGES, USACE_ASSETS, DOCUMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Link as LinkIcon, Calendar, Building, FileText, Lock, CheckCircle, ShieldCheck } from 'lucide-react';
import { RealPropertyLinkage, AuditEvent } from '../../types';
import { LinkageModal } from './components/LinkageModal';

const LIFECYCLE_STATES: RealPropertyLinkage['lifecycleState'][] = ['Established', 'Active', 'Amended', 'Superseded', 'Inactive', 'Archived'];

export const RemisLinkageDetail: React.FC = () => {
    const { linkageId } = useParams<{ linkageId: string }>();
    const navigate = useNavigate();
    const [linkage, setLinkage] = useState<RealPropertyLinkage | undefined>(USACE_LINKAGES.find(l => l.id === linkageId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!linkage) {
        return <div className="p-6">Linkage record not found. <Link to="/usace/linkages" className="text-blue-600">Return to Dashboard</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === linkage.assetId);
    const document = DOCUMENTS.find(d => d.id === linkage.relatedDocumentId);

    const handleSave = (updatedRecord: Partial<RealPropertyLinkage>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Real Property Officer', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setLinkage(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: RealPropertyLinkage['lifecycleState']) => {
        // 14.7.4 Prevent archival of active interests
        if (newState === 'Archived' && (linkage.lifecycleState === 'Active' || linkage.lifecycleState === 'Amended')) {
            alert('Compliance Error (14.7.4): Cannot Archive linkages supporting active legal interests.');
            return;
        }

        const reason = `Lifecycle state advanced from ${linkage.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Real Property Officer', 
            action: 'State Transition',
            details: reason,
        };
        setLinkage(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(linkage.lifecycleState);

    return (
        <div className="space-y-6">
            <LinkageModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} linkage={linkage} />
            <div>
                <button onClick={() => navigate('/usace/linkages')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Dashboard</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">{linkage.instrumentNumber}</h1>
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded border text-slate-600 font-mono">{linkage.instrumentType}</span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">Asset: {asset?.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200`}>{linkage.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Update Linkage</button>
                        <RegulatoryBadge refs={['14']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('lifecycle')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'lifecycle' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Lifecycle Management</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Instrument Details</h3>
                                <DetailItem label="Number" value={linkage.instrumentNumber} icon={FileText} />
                                <DetailItem label="Type" value={linkage.instrumentType} icon={LinkIcon} />
                                <DetailItem label="Authority" value={linkage.executingAuthority} icon={ShieldCheck} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Validity & Dates</h3>
                                <DetailItem label="Effective Date" value={linkage.effectiveDate} icon={Calendar} />
                                <DetailItem label="Expiration Date" value={linkage.expirationDate || 'Perpetual'} icon={Calendar} />
                                <DetailItem label="Status" value={linkage.status} icon={CheckCircle} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Context</h3>
                                <DetailItem label="Asset" value={asset?.name} icon={Building} />
                                <DetailItem label="Initiating Org" value={linkage.initiatingOrg} icon={Building} />
                                {document && (
                                    <div className="mt-2 bg-slate-50 p-3 rounded border flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-slate-500 font-semibold">Linked Document</p>
                                            <p className="text-sm text-blue-600 font-medium">{document.name}</p>
                                        </div>
                                        <FileText size={16} className="text-slate-400" />
                                    </div>
                                )}
                            </div>
                            <div className="col-span-full">
                                <h3 className="font-bold text-slate-800 border-b pb-2 mb-2">Description</h3>
                                <p className="text-sm text-slate-700">{linkage.description}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lifecycle' && (
                        <div>
                            <div className="bg-slate-50 p-5 rounded-xl border mb-8 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Current State: {linkage.lifecycleState}</h3>
                                    <p className="text-sm text-slate-600 mt-1">Instrument: {linkage.instrumentNumber}</p>
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
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Securely Logged (Req 14.8)</div>
                            </div>
                            <div className="space-y-4">
                                {(linkage.history || []).map((event, i) => (
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