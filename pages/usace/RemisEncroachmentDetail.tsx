
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ENCROACHMENTS, USACE_ASSETS, USACE_OUTGRANTS, USACE_PERMITS, USACE_CLAIMS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, AlertTriangle, Calendar, ShieldCheck, CheckCircle, Lock, Building, FileText, Activity, Plus, Trash2, ListChecks } from 'lucide-react';
import { EncroachmentCase, AuditEvent, EncroachmentTask } from '../../types';
import { EncroachmentModal } from './components/EncroachmentModal';

const LIFECYCLE_STATES: EncroachmentCase['lifecycleState'][] = ['Reported', 'Triaged', 'Investigated', 'Action Planned', 'Under Corrective Action', 'Resolved', 'Closed', 'Archived'];

export const RemisEncroachmentDetail: React.FC = () => {
    const { caseId } = useParams<{ caseId: string }>();
    const navigate = useNavigate();
    const [encroachment, setEncroachment] = useState<EncroachmentCase | undefined>(USACE_ENCROACHMENTS.find(e => e.id === caseId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!encroachment) {
        return <div className="p-6">Encroachment case not found. <Link to="/usace/encroachments" className="text-blue-600">Return to Dashboard</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === encroachment.assetId);
    // 17.1.5 Associations
    const relatedOutGrant = USACE_OUTGRANTS.find(o => o.id === encroachment.relatedOutGrantId);
    const relatedPermit = USACE_PERMITS.find(p => p.id === encroachment.relatedPermitId);
    const relatedClaim = USACE_CLAIMS.find(c => c.id === encroachment.relatedLegalClaimId);

    const handleSave = (updatedRecord: Partial<EncroachmentCase>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Enforcement Officer', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setEncroachment(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: EncroachmentCase['lifecycleState']) => {
        // 17.7.3 Enforce valid transitions
        if (newState === 'Closed' && encroachment.lifecycleState !== 'Resolved') {
            alert('Governance Error: Case must be Resolved before it can be Closed.');
            return;
        }

        const reason = `Lifecycle state advanced from ${encroachment.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'District Commander', 
            action: 'State Transition',
            details: reason,
        };
        setEncroachment(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(encroachment.lifecycleState);

    // Mock Task Management
    const addTask = () => {
        const newTask: EncroachmentTask = {
            id: `TASK-${Date.now()}`,
            caseId: encroachment.id,
            title: 'New Investigation Task',
            type: 'Investigation',
            assignedTo: 'Unassigned',
            dueDate: new Date().toISOString().split('T')[0],
            lifecycleState: 'Assigned',
            workActivities: []
        };
        setEncroachment(prev => prev ? { ...prev, tasks: [...(prev.tasks || []), newTask] } : undefined);
    };

    return (
        <div className="space-y-6">
            <EncroachmentModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} encroachment={encroachment} />
            <div>
                <button onClick={() => navigate('/usace/encroachments')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Dashboard</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">Encroachment: {encroachment.id}</h1>
                            <span className={`text-xs px-2 py-1 rounded-full font-bold border ${encroachment.type === 'Structure' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-slate-100 text-slate-800 border-slate-200'}`}>{encroachment.type}</span>
                        </div>
                        <p className="text-slate-500 font-mono text-sm mt-1">Asset: {asset?.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-slate-100 text-slate-800 border-slate-200`}>{encroachment.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Update Case</button>
                        <RegulatoryBadge refs={['17']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Case Overview</button>
                        <button onClick={() => setActiveTab('work')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'work' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Work Management (Req 17)</button>
                        <button onClick={() => setActiveTab('lifecycle')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'lifecycle' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Lifecycle Governance</button>
                        <button onClick={() => setActiveTab('related')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'related' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Related Artifacts</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Audit Trail</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Discovery Information</h3>
                                <DetailItem label="Asset" value={asset?.name} icon={Building} />
                                <DetailItem label="Discovery Date" value={encroachment.discoveryDate} icon={Calendar} />
                                <DetailItem label="Official" value={encroachment.responsibleOfficial} icon={ShieldCheck} />
                            </div>
                            <div className="space-y-6 lg:col-span-2">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Location & Assessment</h3>
                                <DetailItem label="Location" value={encroachment.locationDescription} icon={AlertTriangle} />
                                <div className="mt-4 bg-slate-50 p-3 rounded border">
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Initial Assessment</p>
                                    <p className="text-sm text-slate-800">{encroachment.initialAssessment}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'work' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-900 text-lg">Encroachment Tasks & Activities (17.3)</h3>
                                <button onClick={addTask} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-xs"><Plus size={14}/> Add Task</button>
                            </div>
                            
                            <div className="space-y-4">
                                {(encroachment.tasks || []).map((task, idx) => (
                                    <div key={task.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                                        <div className="bg-slate-50 p-3 border-b flex justify-between items-center">
                                            <div>
                                                <h4 className="font-bold text-slate-800 flex items-center gap-2"><ListChecks size={16}/> {task.title}</h4>
                                                <p className="text-xs text-slate-500">{task.type} • Assigned: {task.assignedTo} • Due: {task.dueDate}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full border bg-white font-medium`}>{task.lifecycleState}</span>
                                        </div>
                                        <div className="p-3">
                                            <h5 className="text-xs font-bold text-slate-500 uppercase mb-2">Work Activities</h5>
                                            <table className="w-full text-xs text-left">
                                                <thead className="text-slate-500 bg-slate-50/50"><tr><th className="p-2">Description</th><th className="p-2">Planned Date</th><th className="p-2">Responsible</th><th className="p-2">Outcome</th></tr></thead>
                                                <tbody>
                                                    {task.workActivities.map(wa => (
                                                        <tr key={wa.id} className="border-t border-slate-100">
                                                            <td className="p-2">{wa.description}</td>
                                                            <td className="p-2">{wa.plannedDate}</td>
                                                            <td className="p-2">{wa.responsibleParty}</td>
                                                            <td className="p-2 text-slate-600">{wa.outcome || '-'}</td>
                                                        </tr>
                                                    ))}
                                                    {task.workActivities.length === 0 && <tr><td colSpan={4} className="p-2 text-center text-slate-400 italic">No activities logged.</td></tr>}
                                                </tbody>
                                            </table>
                                            <button className="mt-2 text-xs text-blue-600 hover:underline flex items-center gap-1"><Plus size={12}/> Log Activity</button>
                                        </div>
                                    </div>
                                ))}
                                {(!encroachment.tasks || encroachment.tasks.length === 0) && <p className="text-slate-500 italic text-sm text-center py-8">No tasks established.</p>}
                            </div>
                        </div>
                    )}

                    {activeTab === 'lifecycle' && (
                        <div>
                            <div className="bg-slate-50 p-5 rounded-xl border mb-8 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Current State: {encroachment.lifecycleState}</h3>
                                    <p className="text-sm text-slate-600 mt-1">Resolution: {encroachment.resolution || 'Pending'}</p>
                                </div>
                                <div className="flex gap-2">
                                    {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                        <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                                            Advance to {LIFECYCLE_STATES[currentStateIndex + 1]}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-800 mb-6">Case Progression</h3>
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

                    {activeTab === 'related' && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800 mb-2">Associated Records (17.1.5)</h3>
                            {relatedOutGrant && <div className="p-3 border rounded bg-slate-50 flex justify-between items-center"><div><p className="font-semibold text-sm">Related Out-Grant</p><p className="text-xs text-slate-500">{relatedOutGrant.id} ({relatedOutGrant.grantee})</p></div><Link to={`/usace/outgrants/${relatedOutGrant.id}`} className="text-blue-600 text-sm hover:underline">View</Link></div>}
                            {relatedPermit && <div className="p-3 border rounded bg-slate-50 flex justify-between items-center"><div><p className="font-semibold text-sm">Related Permit</p><p className="text-xs text-slate-500">{relatedPermit.uniqueIdentifier}</p></div><Link to={`/usace/permits/${relatedPermit.id}`} className="text-blue-600 text-sm hover:underline">View</Link></div>}
                            {relatedClaim && <div className="p-3 border rounded bg-slate-50 flex justify-between items-center"><div><p className="font-semibold text-sm">Related Legal Claim</p><p className="text-xs text-slate-500">{relatedClaim.id}</p></div><Link to={`/usace/legal/${relatedClaim.id}`} className="text-blue-600 text-sm hover:underline">View</Link></div>}
                            {!relatedOutGrant && !relatedPermit && !relatedClaim && <p className="text-sm text-slate-500 italic">No related records linked.</p>}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800">Immutable Audit Trail</h3>
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Securely Logged (Req 17.8)</div>
                            </div>
                            <div className="space-y-4">
                                {(encroachment.history || []).map((event, i) => (
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
