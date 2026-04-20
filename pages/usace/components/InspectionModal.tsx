import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { OutGrantInspection } from '../../../types';

interface InspectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<OutGrantInspection>) => void;
    inspection?: OutGrantInspection | null;
    outGrantId: string;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({ isOpen, onClose, onSave, inspection, outGrantId }) => {
    const isEditMode = !!inspection;

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const processedData = {
            ...data,
            outGrantId: outGrantId // Ensure link
        };

        onSave(processedData as any);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Update Inspection Record' : 'Schedule New Inspection'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-sm font-medium">Type</label><select name="type" defaultValue={inspection?.type} className="w-full mt-1 p-2 border rounded-md"><option>Routine</option><option>Compliance</option><option>Termination</option></select></div>
                        <div><label className="text-sm font-medium">Status</label><select name="status" defaultValue={inspection?.status || 'Scheduled'} className="w-full mt-1 p-2 border rounded-md"><option>Scheduled</option><option>Completed</option><option>Reviewed</option><option>Closed</option></select></div>
                        <div><label className="text-sm font-medium">Inspection Date</label><input name="inspectionDate" type="date" defaultValue={inspection?.inspectionDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                        <div><label className="text-sm font-medium">Inspector</label><input name="inspector" type="text" defaultValue={inspection?.inspector} className="w-full mt-1 p-2 border rounded-md" required /></div>
                        <div className="md:col-span-2"><label className="text-sm font-medium">Findings</label><textarea name="findings" defaultValue={inspection?.findings} className="w-full mt-1 p-2 border rounded-md h-24" placeholder="Observation details..." required /></div>
                        <div className="md:col-span-2"><label className="text-sm font-medium">Corrective Actions</label><textarea name="correctiveActions" defaultValue={inspection?.correctiveActions} className="w-full mt-1 p-2 border rounded-md h-24" placeholder="Required remediations..." /></div>
                    </div>

                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update' : 'Schedule'}</button>
                </div>
            </div>
        </div>
    );
};