import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
// FIX: The 'AcquisitionRecord' type is defined in 'types.ts', not exported from 'mockData.ts'.
import { USACE_ASSETS } from '../../../services/mockData';
import { AcquisitionRecord } from '../../../types';

interface AcquisitionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<AcquisitionRecord>, reason: string) => void;
    acquisition?: AcquisitionRecord | null;
}

export const AcquisitionModal: React.FC<AcquisitionModalProps> = ({ isOpen, onClose, onSave, acquisition }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!acquisition;

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (isEditMode && !reason) {
            alert('A "Reason for Change" is required to save modifications.');
            return;
        }

        // In a real app, you would structure the data object properly
        onSave(data as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Edit Acquisition Record' : 'Create New Acquisition Record'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div><label className="text-sm font-medium">Associated Asset</label><select name="assetId" defaultValue={acquisition?.assetId} className="w-full mt-1 p-2 border rounded-md">{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid}</option>)}</select></div>
                        <div><label className="text-sm font-medium">Acquisition Method</label><select name="acquisitionMethod" defaultValue={acquisition?.acquisitionMethod} className="w-full mt-1 p-2 border rounded-md"><option>Purchase</option><option>Donation</option><option>Transfer</option><option>Condemnation</option></select></div>
                        <div><label className="text-sm font-medium">Interest Type</label><select name="interestType" defaultValue={acquisition?.interestType} className="w-full mt-1 p-2 border rounded-md"><option>Fee</option><option>Easement</option><option>Leasehold</option><option>Permit</option></select></div>
                        <div className="lg:col-span-3"><label className="text-sm font-medium">Purpose</label><input name="purpose" type="text" defaultValue={acquisition?.purpose} placeholder="e.g., Flood Control Project" className="w-full mt-1 p-2 border rounded-md" /></div>
                        <div><label className="text-sm font-medium">Authority</label><input name="authority" type="text" defaultValue={acquisition?.authority} placeholder="e.g., WRDA 2022, Section 101" className="w-full mt-1 p-2 border rounded-md" /></div>
                        <div><label className="text-sm font-medium">Statutory Basis</label><input name="statutoryBasis" type="text" defaultValue={acquisition?.statutoryBasis} placeholder="e.g., Public Law 91-646" className="w-full mt-1 p-2 border rounded-md" /></div>
                        <div><label className="text-sm font-medium">Responsible Org</label><input name="responsibleOrg" type="text" defaultValue={acquisition?.responsibleOrg} placeholder="e.g., Portland District" className="w-full mt-1 p-2 border rounded-md" /></div>
                        <div><label className="text-sm font-medium">Funding Source</label><input name="fundingSource" type="text" defaultValue={acquisition?.fundingSource} placeholder="e.g., MILCON FY24" className="w-full mt-1 p-2 border rounded-md" /></div>
                        <div><label className="text-sm font-medium">Total Cost</label><input name="cost" type="number" defaultValue={acquisition?.cost} className="w-full mt-1 p-2 border rounded-md" /></div>
                        <div><label className="text-sm font-medium">Target Close Date</label><input name="closeDate" type="date" defaultValue={acquisition?.closeDate} className="w-full mt-1 p-2 border rounded-md" /></div>
                    </div>
                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mt-4">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g., 'Updated cost based on final appraisal.'" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">An audit entry will be created for this update.</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">Save Changes</button>
                </div>
            </div>
        </div>
    );
};
