import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { RealPropertyLinkage } from '../../../types';
import { USACE_ASSETS, DOCUMENTS } from '../../../services/mockData';

interface LinkageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<RealPropertyLinkage>, reason: string) => void;
    linkage?: RealPropertyLinkage | null;
}

export const LinkageModal: React.FC<LinkageModalProps> = ({ isOpen, onClose, onSave, linkage }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!linkage;

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
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Update Instrument Linkage' : 'Establish Linkage'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 14.1.1 & 14.1.2 Establishment */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Asset & Instrument</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Real Property Asset</label><select name="assetId" defaultValue={linkage?.assetId} className="w-full mt-1 p-2 border rounded-md" required disabled={isEditMode}>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Instrument Number</label><input name="instrumentNumber" type="text" defaultValue={linkage?.instrumentNumber} placeholder="e.g. D-1234-567" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Instrument Type</label><select name="instrumentType" defaultValue={linkage?.instrumentType} className="w-full mt-1 p-2 border rounded-md"><option>Contract</option><option>Agreement</option><option>Deed</option><option>Easement</option><option>Conveyance</option><option>Permit</option></select></div>
                            <div><label className="text-sm font-medium">Related Document</label><select name="relatedDocumentId" defaultValue={linkage?.relatedDocumentId} className="w-full mt-1 p-2 border rounded-md"><option value="">-- None --</option>{DOCUMENTS.map(d => <option key={d.id} value={d.id}>{d.name} ({d.type})</option>)}</select></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Description</label><textarea name="description" defaultValue={linkage?.description} className="w-full mt-1 p-2 border rounded-md h-20" required /></div>
                        </div>
                    </div>

                    {/* 14.1.3 Attributes */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Execution Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Executing Authority</label><input name="executingAuthority" type="text" defaultValue={linkage?.executingAuthority} placeholder="e.g. District Engineer" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Initiating Org</label><input name="initiatingOrg" type="text" defaultValue={linkage?.initiatingOrg} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Effective Date</label><input name="effectiveDate" type="date" defaultValue={linkage?.effectiveDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Expiration Date</label><input name="expirationDate" type="date" defaultValue={linkage?.expirationDate} className="w-full mt-1 p-2 border rounded-md" /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Justification for update (Req 14.3.3)..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are logged in the immutable audit trail (Req 14.8.1).</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update Linkage' : 'Establish Linkage'}</button>
                </div>
            </div>
        </div>
    );
};