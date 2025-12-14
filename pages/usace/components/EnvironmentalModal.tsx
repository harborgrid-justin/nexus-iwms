import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { EnvironmentalSite } from '../../../types';
import { USACE_ASSETS } from '../../../services/mockData';

interface EnvironmentalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<EnvironmentalSite>, reason: string) => void;
    site?: EnvironmentalSite | null;
}

export const EnvironmentalModal: React.FC<EnvironmentalModalProps> = ({ isOpen, onClose, onSave, site }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!site;

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Handle multi-select for program applicability manually if needed, 
        // for this mock we just take simple inputs.
        
        if (isEditMode && !reason) {
            alert('A "Reason for Change" is required to save modifications for audit purposes.');
            return;
        }

        const processedData = {
            ...data,
            programApplicability: [data.programApplicability], // Mock handling for array
            contaminants: (data.contaminants as string).split(',').map(s => s.trim())
        };

        onSave(processedData as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Edit Environmental Site' : 'Identify New Environmental Site'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 7.1.1 Initiation */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Site Identification</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Related Asset</label><select name="assetId" defaultValue={site?.assetId} className="w-full mt-1 p-2 border rounded-md" required>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Site Name</label><input name="siteName" type="text" defaultValue={site?.siteName} placeholder="e.g., Underground Tank #2" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Initiating Org</label><input name="initiatingOrg" type="text" defaultValue={site?.initiatingOrg} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Initiation Date</label><input name="initiationDate" type="date" defaultValue={site?.initiationDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                        </div>
                    </div>

                    {/* 7.1.2 & 7.1.3 Condition & Program */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Condition & Compliance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Primary Authority</label><select name="authority" defaultValue={site?.authority} className="w-full mt-1 p-2 border rounded-md"><option>NEPA</option><option>CERCLA</option><option>RCRA</option><option>Clean Water Act</option></select></div>
                            <div><label className="text-sm font-medium">Risk Classification</label><select name="riskClassification" defaultValue={site?.riskClassification} className="w-full mt-1 p-2 border rounded-md"><option>Low</option><option>Medium</option><option>High</option></select></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Contaminants (comma separated)</label><input name="contaminants" type="text" defaultValue={site?.contaminants.join(', ')} placeholder="e.g. Lead, Asbestos, Petroleum" className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Contamination Indicators</label><textarea name="contaminationIndicators" defaultValue={site?.contaminationIndicators} className="w-full mt-1 p-2 border rounded-md h-20" /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Explain why this record is being updated..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are versioned and logged in the immutable audit trail (Req 7.8.1).</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update Site' : 'Create Record'}</button>
                </div>
            </div>
        </div>
    );
};
