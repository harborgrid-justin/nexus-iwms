import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { Permit } from '../../../types';
import { USACE_ASSETS } from '../../../services/mockData';

interface PermitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<Permit>, reason: string) => void;
    permit?: Permit | null;
}

export const PermitModal: React.FC<PermitModalProps> = ({ isOpen, onClose, onSave, permit }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!permit;

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (isEditMode && !reason) {
            alert('A "Reason for Change" is required to save modifications for audit purposes.');
            return;
        }

        // Mock nested data structure for new records since form is flat
        const processedData = {
            ...data,
            parties: permit?.parties || [], // Preserve existing or initialize empty for mock
            addresses: permit?.addresses || []
        };

        onSave(processedData as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Update Permit Record' : 'Create Permit Record'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 13.1.1 & 13.1.2 Identification */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Permit Identification</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Related Asset</label><select name="assetId" defaultValue={permit?.assetId} className="w-full mt-1 p-2 border rounded-md" required disabled={isEditMode}>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Unique Permit ID</label><input name="uniqueIdentifier" type="text" defaultValue={permit?.uniqueIdentifier} placeholder="e.g. PER-2024-001" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Permit Type</label><select name="type" defaultValue={permit?.type} className="w-full mt-1 p-2 border rounded-md"><option>Section 10</option><option>Section 404</option><option>Section 408</option><option>General</option></select></div>
                            <div><label className="text-sm font-medium">Authority</label><input name="authority" type="text" defaultValue={permit?.authority} placeholder="e.g. Clean Water Act" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Description</label><textarea name="description" defaultValue={permit?.description} className="w-full mt-1 p-2 border rounded-md h-20" required /></div>
                        </div>
                    </div>

                    {/* 13.1.5 Dates */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Effective Dates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div><label className="text-sm font-medium">Issue Date</label><input name="issueDate" type="date" defaultValue={permit?.issueDate} className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div><label className="text-sm font-medium">Effective Date</label><input name="effectiveDate" type="date" defaultValue={permit?.effectiveDate} className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div><label className="text-sm font-medium">Expiration Date</label><input name="expirationDate" type="date" defaultValue={permit?.expirationDate} className="w-full mt-1 p-2 border rounded-md" /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Justification for update (Req 13.3.4)..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are logged in the immutable audit trail (Req 13.8.1).</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update Permit' : 'Create Permit'}</button>
                </div>
            </div>
        </div>
    );
};