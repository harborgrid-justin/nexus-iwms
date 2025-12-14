import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { OutGrant } from '../../../types';
import { USACE_ASSETS } from '../../../services/mockData';

interface OutGrantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<OutGrant>, reason: string) => void;
    outgrant?: OutGrant | null;
}

export const OutGrantModal: React.FC<OutGrantModalProps> = ({ isOpen, onClose, onSave, outgrant }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!outgrant;

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

        const processedData = {
            ...data,
            revenue: Number(data.revenue),
        };

        onSave(processedData as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Update Out-Grant Record' : 'Establish New Out-Grant'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 12.1.1 & 12.1.2 Establishment */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Grant Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Asset ID</label><select name="assetId" defaultValue={outgrant?.assetId} className="w-full mt-1 p-2 border rounded-md" required disabled={isEditMode}>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Grantee</label><input name="grantee" type="text" defaultValue={outgrant?.grantee} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Type</label><select name="type" defaultValue={outgrant?.type} className="w-full mt-1 p-2 border rounded-md"><option>Lease</option><option>License</option><option>Easement</option><option>Permit</option></select></div>
                            <div><label className="text-sm font-medium">Authority</label><input name="authority" type="text" defaultValue={outgrant?.authority} placeholder="e.g. 10 U.S.C. §2667" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Permitted Use</label><textarea name="permittedUse" defaultValue={outgrant?.permittedUse} className="w-full mt-1 p-2 border rounded-md h-20" required /></div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Terms & Revenue</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div><label className="text-sm font-medium">Start Date</label><input name="startDate" type="date" defaultValue={outgrant?.startDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">End Date</label><input name="endDate" type="date" defaultValue={outgrant?.endDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Annual Revenue ($)</label><input name="revenue" type="number" defaultValue={outgrant?.revenue} className="w-full mt-1 p-2 border rounded-md" /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Justification for update (Req 12.3.4)..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are logged in the immutable audit trail (Req 12.8.1).</p>
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