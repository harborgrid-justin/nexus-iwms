import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { RelocationCase } from '../../../types';
import { USACE_ACQUISITIONS } from '../../../services/mockData';

interface RelocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<RelocationCase>, reason: string) => void;
    relocation?: RelocationCase | null;
}

export const RelocationModal: React.FC<RelocationModalProps> = ({ isOpen, onClose, onSave, relocation }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!relocation;

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

        onSave(data as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Edit Relocation Case' : 'Initiate Relocation Case'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 6.1.1 Case Initiation */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Case Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Related Acquisition</label><select name="acquisitionId" defaultValue={relocation?.acquisitionId} className="w-full mt-1 p-2 border rounded-md" required>{USACE_ACQUISITIONS.map(a => <option key={a.id} value={a.id}>{a.id} (Asset: {a.assetId})</option>)}</select></div>
                            <div><label className="text-sm font-medium">Displacement Type</label><select name="displacementType" defaultValue={relocation?.displacementType} className="w-full mt-1 p-2 border rounded-md"><option>Physical</option><option>Economic</option></select></div>
                        </div>
                    </div>

                    {/* 6.1.2 Claimant Info (PII) */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Claimant Information (PII)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2"><label className="text-sm font-medium">Claimant Name</label><input name="claimantName" type="text" defaultValue={relocation?.claimantName} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Claimant Type</label><select name="claimantType" defaultValue={relocation?.claimantType} className="w-full mt-1 p-2 border rounded-md"><option>Residential Owner</option><option>Residential Tenant</option><option>Business</option><option>Farm</option><option>Non-Profit</option></select></div>
                            <div><label className="text-sm font-medium">Initiation Date</label><input name="initiationDate" type="date" defaultValue={relocation?.initiationDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Explain why this record is being updated..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are versioned and logged in the immutable audit trail (Req 6.8.1).</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update Case' : 'Initiate Case'}</button>
                </div>
            </div>
        </div>
    );
};
