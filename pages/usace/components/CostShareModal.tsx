import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { CostShareAgreement } from '../../../types';
import { USACE_ASSETS } from '../../../services/mockData';

interface CostShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<CostShareAgreement>, reason: string) => void;
    agreement?: CostShareAgreement | null;
}

export const CostShareModal: React.FC<CostShareModalProps> = ({ isOpen, onClose, onSave, agreement }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!agreement;

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
            totalProjectCost: Number(data.totalProjectCost),
            partnerContribution: Number(data.partnerContribution),
            federalSharePercentage: Number(data.federalSharePercentage),
            partner: data.sponsor // map partner to sponsor for display consistency
        };

        onSave(processedData as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Update Cost-Share Agreement' : 'New Cost-Share Agreement'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 11.1.1 & 11.1.2 Establishment */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Project & Sponsor</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Asset</label><select name="assetId" defaultValue={agreement?.assetId} className="w-full mt-1 p-2 border rounded-md" required disabled={isEditMode}>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Project ID</label><input name="projectId" type="text" defaultValue={agreement?.projectId} placeholder="e.g. P-105" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Non-Federal Sponsor</label><input name="sponsor" type="text" defaultValue={agreement?.sponsor} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Agreement Date</label><input name="agreementDate" type="date" defaultValue={agreement?.agreementDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                        </div>
                    </div>

                    {/* 11.1.2 & 11.1.3 Authority & Financials */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Authority & Financials</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div><label className="text-sm font-medium">Authority</label><input name="authority" type="text" defaultValue={agreement?.authority} placeholder="e.g. WRDA 1986" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Statutory Basis</label><input name="statutoryBasis" type="text" defaultValue={agreement?.statutoryBasis} placeholder="e.g. 33 U.S.C. §2211" className="w-full mt-1 p-2 border rounded-md" /></div>
                            
                            <div><label className="text-sm font-medium">Cost Share Ratio</label><input name="costShareRatio" type="text" defaultValue={agreement?.costShareRatio} placeholder="e.g. 65/35" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Fed Share %</label><input name="federalSharePercentage" type="number" defaultValue={agreement?.federalSharePercentage} className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div><label className="text-sm font-medium">Total Project Cost</label><input name="totalProjectCost" type="number" defaultValue={agreement?.totalProjectCost} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Sponsor Contribution (Target)</label><input name="partnerContribution" type="number" defaultValue={agreement?.partnerContribution} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Responsible Org</label><input name="responsibleOrg" type="text" defaultValue={agreement?.responsibleOrg} className="w-full mt-1 p-2 border rounded-md" /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Justification for update (Req 11.3.3)..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are versioned and logged in the immutable audit trail (Req 11.8.1).</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update Agreement' : 'Establish Agreement'}</button>
                </div>
            </div>
        </div>
    );
};