import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { DisposalRecord } from '../../../types';
import { USACE_ASSETS } from '../../../services/mockData';

interface DisposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<DisposalRecord>, reason: string) => void;
    disposal?: DisposalRecord | null;
}

export const DisposalModal: React.FC<DisposalModalProps> = ({ isOpen, onClose, onSave, disposal }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!disposal;

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
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Edit Disposal Case' : 'Initiate Disposal Case'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 5.1.1 & 5.1.2 Initiation Data */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Case Initiation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Asset to Dispose</label><select name="assetId" defaultValue={disposal?.assetId} className="w-full mt-1 p-2 border rounded-md" required>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Initiating Organization</label><input name="initiatingOrg" type="text" defaultValue={disposal?.initiatingOrg} placeholder="e.g., DPW" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Proposed Method</label><select name="proposedMethod" defaultValue={disposal?.proposedMethod} className="w-full mt-1 p-2 border rounded-md"><option>Public Sale</option><option>Transfer</option><option>Donation</option><option>Demolition</option><option>Exchange</option></select></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Disposal Rationale</label><textarea name="disposalRationale" defaultValue={disposal?.disposalRationale} placeholder="Justification for disposal..." className="w-full mt-1 p-2 border rounded-md h-20" required /></div>
                        </div>
                    </div>

                    {/* 5.1.3 Determination of Excess */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Determination of Excess</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Determination Date</label><input name="excessDeterminationDate" type="date" defaultValue={disposal?.excessDeterminationDate} className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div><label className="text-sm font-medium"> determining Authority</label><input name="excessDeterminationAuthority" type="text" defaultValue={disposal?.excessDeterminationAuthority} placeholder="e.g., District Commander" className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Justification</label><textarea name="excessDeterminationJustification" defaultValue={disposal?.excessDeterminationJustification} className="w-full mt-1 p-2 border rounded-md h-20" /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Explain why this record is being updated..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are versioned and logged in the immutable audit trail (Req 5.8.1).</p>
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
