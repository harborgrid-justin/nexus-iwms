import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { LegalClaim } from '../../../types';
import { USACE_ASSETS } from '../../../services/mockData';

interface LegalClaimModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<LegalClaim>, reason: string) => void;
    claim?: LegalClaim | null;
}

export const LegalClaimModal: React.FC<LegalClaimModalProps> = ({ isOpen, onClose, onSave, claim }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!claim;

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

        // Construct complex objects from flat form data
        const processedData = {
            ...data,
            claimantInfo: {
                name: data.claimantName,
                address: data.claimantAddress,
                phone: data.claimantPhone,
                email: data.claimantEmail
            },
            claimAmount: Number(data.claimAmount),
            claimant: data.claimantName // map for legacy support
        };

        onSave(processedData as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Update Claim Record' : 'Initiate New Claim'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 9.1.1 & 9.1.2 Initiation */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Claimant Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2"><label className="text-sm font-medium">Claimant Name</label><input name="claimantName" type="text" defaultValue={claim?.claimantInfo?.name} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Address</label><input name="claimantAddress" type="text" defaultValue={claim?.claimantInfo?.address} className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div><label className="text-sm font-medium">Phone</label><input name="claimantPhone" type="text" defaultValue={claim?.claimantInfo?.phone} className="w-full mt-1 p-2 border rounded-md" /></div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Case Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Related Asset</label><select name="assetId" defaultValue={claim?.assetId} className="w-full mt-1 p-2 border rounded-md" required>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Claim Type</label><select name="claimType" defaultValue={claim?.claimType} className="w-full mt-1 p-2 border rounded-md"><option>Tort</option><option>Title Dispute</option><option>Contract</option><option>Relocation Appeal</option><option>Property Damage</option></select></div>
                            <div><label className="text-sm font-medium">Incident Date</label><input name="incidentDate" type="date" defaultValue={claim?.incidentDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Date Received</label><input name="filedDate" type="date" defaultValue={claim?.filedDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Claim Amount ($)</label><input name="claimAmount" type="number" defaultValue={claim?.claimAmount} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Incident Description</label><textarea name="description" defaultValue={claim?.description} className="w-full mt-1 p-2 border rounded-md h-20" required /></div>
                        </div>
                    </div>

                    {/* 9.1.3 Legal Basis */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Legal Framework</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Statutory Basis</label><input name="statutoryBasis" type="text" defaultValue={claim?.statutoryBasis} placeholder="e.g., Federal Tort Claims Act" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Jurisdiction</label><input name="jurisdiction" type="text" defaultValue={claim?.jurisdiction} placeholder="e.g., District Court" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Assigned Legal Office</label><input name="assignedOffice" type="text" defaultValue={claim?.assignedOffice} className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div><label className="text-sm font-medium">Responsible Official</label><input name="responsibleOfficial" type="text" defaultValue={claim?.responsibleOfficial} className="w-full mt-1 p-2 border rounded-md" /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Explain why this record is being updated..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are versioned and logged in the immutable audit trail (Req 9.3.5 & 9.8.1).</p>
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