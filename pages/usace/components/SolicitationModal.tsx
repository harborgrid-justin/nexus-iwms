import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { Solicitation } from '../../../types';
import { USACE_ASSETS } from '../../../services/mockData';

interface SolicitationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<Solicitation>, reason: string) => void;
    solicitation?: Solicitation | null;
}

export const SolicitationModal: React.FC<SolicitationModalProps> = ({ isOpen, onClose, onSave, solicitation }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!solicitation;

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
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Edit Solicitation' : 'Create New Solicitation'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">General Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Related Asset</label><select name="assetId" defaultValue={solicitation?.assetId} className="w-full mt-1 p-2 border rounded-md" required>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Title</label><input name="title" type="text" defaultValue={solicitation?.title} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Type</label><select name="type" defaultValue={solicitation?.type} className="w-full mt-1 p-2 border rounded-md"><option>Invitation for Bid (IFB)</option><option>Request for Proposal (RFP)</option></select></div>
                            <div><label className="text-sm font-medium">Procurement Method</label><select name="procurementMethod" defaultValue={solicitation?.procurementMethod} className="w-full mt-1 p-2 border rounded-md"><option>Sealed Bidding</option><option>Negotiated</option><option>Simplified</option></select></div>
                            <div><label className="text-sm font-medium">Issue Date</label><input name="issueDate" type="date" defaultValue={solicitation?.issueDate} className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div><label className="text-sm font-medium">Close Date</label><input name="closeDate" type="date" defaultValue={solicitation?.closeDate} className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Description</label><textarea name="description" defaultValue={solicitation?.description} className="w-full mt-1 p-2 border rounded-md h-20" /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Explain why this record is being updated..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are versioned and logged in the immutable audit trail (Req 8.8.1).</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update Record' : 'Create Record'}</button>
                </div>
            </div>
        </div>
    );
};
