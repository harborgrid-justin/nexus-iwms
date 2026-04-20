
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ENCROACHMENTS, USACE_ASSETS, DOCUMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, AlertTriangle, Calendar, ShieldAlert, CheckCircle, Lock, Building, MapPin, Activity, CheckSquare, Plus, FileText, User } from 'lucide-react';
import { EncroachmentCase, AuditEvent, EncroachmentTask, WorkActivity } from '../../types';
import { EncroachmentModal } from './components/EncroachmentModal';
import { TaskModal } from './components/TaskModal';
import { validateEncroachmentTransition, validateEncroachmentClosure } from '../../utils/usaceRules';

export const RemisEncroachmentDetail: React.FC = () => {
    const { caseId } = useParams<{ caseId: string }>();
    const navigate = useNavigate();
    const [encroachment, setEncroachment] = useState<EncroachmentCase | undefined>(USACE_ENCROACHMENTS.find(e => e.id === caseId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [taskModalState, setTaskModalState] = useState<{ open: boolean, mode: 'Task'|'Activity', parentTaskId?: string, task?: EncroachmentTask }>({ open: false, mode: 'Task' });

    if (!encroachment) {
        return <div className="p-6">Encroachment case not found. <Link to="/usace/encroachments" className="text-blue-600">Return to Dashboard</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === encroachment.assetId);
    
    const handleSaveCase = (updatedRecord: Partial<EncroachmentCase>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Alex Realty',
            action: 'Record Updated',
            details: reason
        };
        setEncroachment(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleSaveTaskData = (data: any, type: 'Task' | 'Activity') => {
        if (!encroachment) return;
        
        let updatedTasks = [...encroachment.tasks];
        
        if (type === 'Task') {
            if (taskModalState.task) {
                // Update existing
                updatedTasks = updatedTasks.map(t => t.id === taskModalState.task!.id ? { ...t, ...data } : t);
            } else {
                // Add new
                const newTask: EncroachmentTask = { 
                    id: `TSK-${Date.now()}`, 
                    caseId: encroachment.id,
                    activities: [],
                    ...data 
                };
                updatedTasks.push(newTask);
            }
        } else {
            // Add Activity
            updatedTasks = updatedTasks.map(t => {
                if (t.id === taskModalState.parentTaskId) {
                    return { ...t, activities: [...t.activities, data] };
                }
                return t;
            });
        }

        setEncroachment({ ...encroachment, tasks: updatedTasks });
        setTaskModalState({ open: false, mode: 'Task' });
    };

    const handleStateTransition = (newState: EncroachmentCase['lifecycleState']) => {
        const transitionCheck = validateEncroachmentTransition(encroachment.lifecycleState, newState);
        if (!transitionCheck.allowed) {
            alert(transitionCheck.reason);
            return;
        }

        if (newState === 'Closed') {
            const closureCheck = validateEncroachmentClosure(encroachment);
            if (!closureCheck.allowed) {
                alert(closureCheck.reason);
                return;
            }
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

    return (
        <div className="space-y-6">
            <EncroachmentModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveCase} encroachment={encroachment} />
            <TaskModal 
                isOpen={taskModalState.open} 
                onClose={() => setTaskModalState({...taskModalState, open: false})} 
                onSave={handleSaveTaskData} 
                mode={taskModalState.mode} 
                parentTaskId={taskModalState.parentTaskId}
                existingTask={taskModalState.task}
            />

            <div>
                <button onClick={() => navigate('/usace/encroachments')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Dashboard</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">Encroachment: {encroachment.id}</h1>
                            <span className="text-xs bg-red-100 text-red-800 border border-red-200 px-2 py-1 rounded-full font-bold">{encroachment.type}</span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">Asset: {asset?.rpuid} • {asset?.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200`}>{encroachment.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Update Case</button>
                        <RegulatoryBadge refs={['17']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('work')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'work' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Work Management</button>
                        <button onClick={() => setActiveTab('documents')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'documents' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Evidence & Docs</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Discovery & Location</h3>
                                <DetailItem label="Date Reported" value={encroachment.dateReported} icon={Calendar} />
                                <DetailItem label="Method" value={encroachment.discoveryMethod} icon={Activity} />
                                <DetailItem label="Location" value={encroachment.locationDescription} icon={MapPin} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Assessment</h3>
                                <div className="p-3 bg-slate-50 rounded border">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Initial Assessment</p>
                                    <p className="text-sm text-slate-800 mt-1">{encroachment.initialAssessment}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded border">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Resolution Plan</p>
                                    <p className="text-sm text-slate-800 mt-1">{encroachment.resolutionPlan || 'Plan pending development.'}</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Actions</h3>
                                <div className="flex flex-col gap-2">
                                    {encroachment.lifecycleState === 'Reported' && <button onClick={() => handleStateTransition('Triaged')} className="w-full py-2 bg-blue-600 text-white rounded text-sm">Triage Case</button>}
                                    {encroachment.lifecycleState === 'Triaged' && <button onClick={() => handleStateTransition('Investigated')} className="w-full py-2 bg-blue-600 text-white rounded text-sm">Mark Investigated</button>}
                                    {encroachment.lifecycleState === 'Investigated' && <button onClick={() => handleStateTransition('Action Planned')} className="w-full py-2 bg-blue-600 text-white rounded text-sm">Finalize Plan</button>}
                                    {encroachment.lifecycleState === 'Resolved' && <button onClick={() => handleStateTransition('Closed')} className="w-full py-2 bg-green-600 text-white rounded text-sm">Close Case</button>}
                                    <p className="text-xs text-slate-400 text-center mt-2">Current State: {encroachment.lifecycleState}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'work' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2"><CheckSquare size={20}/> Tasks & Activities</h3>
                                <button onClick={() => setTaskModalState({ open: true, mode: 'Task', task: null })} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-xs"><Plus size={14}/> Add Task</button>
                            </div>
                            
                            <div className="space-y-4">
                                {encroachment.tasks.length === 0 && <p className="text-slate-500 italic text-center py-8">No tasks assigned. Create a task to track work.</p>}
                                {encroachment.tasks.map(task => (
                                    <div key={task.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                        <div className="bg-slate-50 p-4 flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-slate-900">{task.description}</h4>
                                                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{task.status}</span>
                                                </div>
                                                <div className="text-xs text-slate-500 mt-1 flex gap-3">
                                                    <span className="flex items-center gap-1"><User size={12}/> {task.assignedTo}</span>
                                                    <span className="flex items-center gap-1"><Calendar size={12}/> Due: {task.dueDate}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => setTaskModalState({ open: true, mode: 'Task', task })} className="text-xs text-blue-600 hover:underline">Edit</button>
                                                <button onClick={() => setTaskModalState({ open: true, mode: 'Activity', parentTaskId: task.id })} className="flex items-center gap-1 text-xs bg-white border px-2 py-1 rounded hover:bg-slate-50 text-slate-700"><Activity size={12}/> Log Activity</button>
                                            </div>
                                        </div>
                                        {task.activities.length > 0 && (
                                            <div className="bg-white border-t border-slate-100">
                                                <table className="w-full text-xs text-left">
                                                    <thead className="bg-slate-50/50 text-slate-500"><tr><th className="p-2 pl-4">Date</th><th>Action</th><th>Performed By</th><th>Outcome</th></tr></thead>
                                                    <tbody className="divide-y divide-slate-50">
                                                        {task.activities.map(act => (
                                                            <tr key={act.id}>
                                                                <td className="p-2 pl-4 text-slate-600 w-24">{act.date}</td>
                                                                <td className="p-2 font-medium w-48">{act.action}</td>
                                                                <td className="p-2 text-slate-600 w-32">{act.performedBy}</td>
                                                                <td className="p-2 text-slate-700">{act.outcome}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-slate-800">Evidence & Documentation</h3>
                                <button className="text-xs text-blue-600 hover:underline">Upload Document</button>
                            </div>
                            <div className="p-8 border-2 border-dashed border-slate-200 rounded-lg text-center text-slate-400">
                                <FileText size={32} className="mx-auto mb-2 opacity-50"/>
                                <p>No documents attached. Upload photos, reports, or notices here.</p>
                            </div>
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
