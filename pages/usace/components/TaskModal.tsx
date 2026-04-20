
import React, { useState, FormEvent } from 'react';
import { X, CheckSquare, Activity } from 'lucide-react';
import { EncroachmentTask, WorkActivity } from '../../../types';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<EncroachmentTask> | Partial<WorkActivity>, type: 'Task' | 'Activity') => void;
    mode: 'Task' | 'Activity';
    parentTaskId?: string;
    existingTask?: EncroachmentTask | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, mode, parentTaskId, existingTask }) => {
    
    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (mode === 'Task') {
            const taskData = { ...data, activities: [] }; // Init empty activities
            onSave(taskData as any, 'Task');
        } else {
            const activityData = { 
                ...data, 
                taskId: parentTaskId,
                id: `ACT-${Date.now()}` // Mock ID generation
            };
            onSave(activityData as any, 'Activity');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        {mode === 'Task' ? <CheckSquare size={20}/> : <Activity size={20}/>}
                        {existingTask ? 'Update Task' : mode === 'Task' ? 'Add Task' : 'Log Activity'}
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-4">
                    
                    {mode === 'Task' && (
                        <>
                            <div><label className="text-sm font-medium">Description</label><input name="description" type="text" defaultValue={existingTask?.description} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-sm font-medium">Assigned To</label><input name="assignedTo" type="text" defaultValue={existingTask?.assignedTo} className="w-full mt-1 p-2 border rounded-md" required /></div>
                                <div><label className="text-sm font-medium">Due Date</label><input name="dueDate" type="date" defaultValue={existingTask?.dueDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            </div>
                            <div><label className="text-sm font-medium">Status</label><select name="status" defaultValue={existingTask?.status || 'Assigned'} className="w-full mt-1 p-2 border rounded-md"><option>Assigned</option><option>In Progress</option><option>Blocked</option><option>Completed</option><option>Verified</option></select></div>
                        </>
                    )}

                    {mode === 'Activity' && (
                        <>
                            <div><label className="text-sm font-medium">Action Taken</label><input name="action" type="text" placeholder="e.g. Site Visit, Phone Call" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-sm font-medium">Date</label><input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full mt-1 p-2 border rounded-md" required /></div>
                                <div><label className="text-sm font-medium">Performed By</label><input name="performedBy" type="text" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            </div>
                            <div><label className="text-sm font-medium">Outcome / Result</label><textarea name="outcome" placeholder="Describe the result..." className="w-full mt-1 p-2 border rounded-md h-24" required /></div>
                        </>
                    )}

                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">Save {mode}</button>
                </div>
            </div>
        </div>
    );
};
