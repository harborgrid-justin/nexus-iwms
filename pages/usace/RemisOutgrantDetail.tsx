
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_OUTGRANTS, USACE_ASSETS, DOCUMENTS, USACE_INSPECTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Calendar, DollarSign, FileText, CheckCircle, Lock, Building, Scale, ClipboardList, Plus, AlertTriangle } from 'lucide-react';
import { OutGrant, AuditEvent, UtilizationInspection } from '../../types';
import { OutGrantModal } from './components/OutGrantModal';
import { InspectionModal } from './components/InspectionModal';

const LIFECYCLE_STATES: OutGrant['lifecycleState'][] = ['Proposed', 'Active', 'Amended', 'Suspended', 'Expired', 'Terminated', 'Closed', 'Archived'];

export const RemisOutgrantDetail: React.FC = () => {
    const { outgrantId } = useParams<{ outgrantId: string }>();
    const navigate = useNavigate();
    const [outgrant, setOutgrant] = useState<OutGrant | undefined>(USACE_OUTGRANTS.find(og => og.id === outgrantId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState<UtilizationInspection | null>(null);

    // Filter inspections for this specific outgrant
    const inspections = USACE_INSPECTIONS.filter(i => i.outGrantId === outgrantId);

    if (!outgrant) {
        return <div className="p-6">Out-Grant record not found. <Link to="/usace/outgrants" className="text-blue-600">Return to Dashboard</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === outgrant.assetId);
    const relatedDocs = DOCUMENTS.filter(d => outgrant.documentIds.includes(d.id));

    const handleSaveOutGrant = (updatedRecord: Partial<OutGrant>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Alex Realty', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setOutgrant(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleSaveInspection = (record: Partial<UtilizationInspection>, reason: string) => {
        console.log("Saving inspection:", record, reason);
        alert("Inspection record saved with full lifecycle data.");
        setIsInspectionModalOpen(false);
    }

    const handleStateTransition = (newState: OutGrant['lifecycleState']) => {
        const reason = `Lifecycle state advanced from ${outgrant.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'District Commander', 
            action: 'State Transition',
            details: reason,
        };
        setOutgrant(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(outgrant.lifecycleState);

    return (
        <div className="space-y-6">
            <OutGrantModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveOutGrant} outgrant={outgrant} />
            <InspectionModal 
                isOpen={isInspectionModalOpen} 
                onClose={() => setIsInspectionModalOpen(false)} 
                onSave={handleSaveInspection} 
                inspection={selectedInspection} 
                outGrantId={outgrant.id}
                assetId={outgrant.assetId} 
            />
            
            <div>
                <button onClick={() => navigate('/usace/outgrants')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Dashboard</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">Out-Grant: {outgrant.grantee}</h1>
                            <span className="text-xs bg-slate-100 px-2 py-1 rounded border text-slate-600 font-mono">{outgrant.id}</span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">Asset: {asset?.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200`}>{outgrant.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Edit Record</button>
                        <RegulatoryBadge refs={['12', '16']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('utilization')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'utilization' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Utilization & Compliance</button>
                        <button onClick={() => setActiveTab('inspections')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'inspections' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Inspections (Req 16)</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Agreement Details</h3>
                                <DetailItem label="Type" value={outgrant.type} icon={FileText} />
                                <DetailItem label="Authority" value={outgrant.authority} icon={Scale} />
                                <DetailItem label="Permitted Use" value={outgrant.permittedUse} icon={Building} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Lifecycle Status</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {LIFECYCLE_STATES.slice(0, 5).map((state, i) => (
                                        <div key={state} className={`text-xs px-2 py-1 rounded border ${state === outgrant.lifecycleState ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                                            {state}
                                        </div>
                                    ))}
                                </div>
                                {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                    <div className="flex gap-2">
                                        <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium">Advance to {LIFECYCLE_STATES[currentStateIndex + 1]}</button>
                                        {outgrant.lifecycleState === 'Active' && <button onClick={() => handleStateTransition('Terminated')} className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-medium">Terminate</button>}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Term & Revenue</h3>
                                <DetailItem label="Start Date" value={outgrant.startDate} icon={Calendar} />
                                <DetailItem label="End Date" value={outgrant.endDate} icon={Calendar} />
                                <DetailItem label="Annual Revenue" value={`$${outgrant.revenue.toLocaleString()}`} icon={DollarSign} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'utilization' && (
                        <div>
                            <h3 className="font-bold text-slate-800 mb-4">Utilization Summary</h3>
                            {outgrant.utilizationSummary ? (
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`p-2 rounded-full ${outgrant.utilizationSummary.isCompliant ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {outgrant.utilizationSummary.isCompliant ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{outgrant.utilizationSummary.isCompliant ? 'Compliant Usage' : 'Non-Compliant Usage'}</p>
                                            <p className="text-xs text-slate-500">Last Updated: {outgrant.utilizationSummary.lastUpdated} by {outgrant.utilizationSummary.updatedBy}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-700">{outgrant.utilizationSummary.observedUse}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 italic">No utilization summary recorded.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'inspections' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800">Inspection History</h3>
                                <button onClick={() => { setSelectedInspection(null); setIsInspectionModalOpen(true); }} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-xs"><Plus size={14}/> Schedule Inspection</button>
                            </div>
                            <div className="bg-slate-50 rounded-lg border overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Date</th>
                                            <th className="p-3 font-semibold">Type</th>
                                            <th className="p-3 font-semibold">Inspector</th>
                                            <th className="p-3 font-semibold">State</th>
                                            <th className="p-3 font-semibold">Findings</th>
                                            <th className="p-3 font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {inspections.map((insp) => (
                                            <tr key={insp.id}>
                                                <td className="p-3">{insp.inspectionDate}</td>
                                                <td className="p-3">{insp.type}</td>
                                                <td className="p-3">{insp.inspector}</td>
                                                <td className="p-3"><span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded-full font-medium">{insp.lifecycleState}</span></td>
                                                <td className="p-3">
                                                    {insp.findings.length > 0 ? <span className="text-red-600 font-bold">{insp.findings.length} Issues</span> : <span className="text-green-600">None</span>}
                                                </td>
                                                <td className="p-3"><button onClick={() => { setSelectedInspection(insp); setIsInspectionModalOpen(true); }} className="text-blue-600 hover:underline font-medium">Manage</button></td>
                                            </tr>
                                        ))}
                                        {inspections.length === 0 && <tr><td colSpan={6} className="p-4 text-center text-slate-500 italic">No inspections recorded.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800">Immutable Audit Trail</h3>
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Securely Logged</div>
                            </div>
                            <div className="space-y-4">
                                {(outgrant.history || []).map((event, i) => (
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
