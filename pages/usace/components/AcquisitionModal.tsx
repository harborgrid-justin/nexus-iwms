
import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
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
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-sm" onClick={onClose}>
            <div 
                className="bg-white md:rounded-xl shadow-2xl w-full max-w-3xl h-[100dvh] md:h-auto md:max-h-[90vh] flex flex-col transform transition-transform" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b shrink-0 bg-white md:rounded-t-xl pt-safe">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Edit Acquisition Record' : 'Create New Acquisition'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 active:bg-slate-200"><X size={24} /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 pb-24 md:pb-6 bg-slate-50 md:bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4">
                        <div>
                            <label className="text-sm font-medium block mb-1.5 text-slate-700">Associated Asset</label>
                            <select name="assetId" defaultValue={acquisition?.assetId} className="w-full p-3 md:p-2.5 border border-slate-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm">{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid}</option>)}</select>
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1.5 text-slate-700">Acquisition Method</label>
                            <select name="acquisitionMethod" defaultValue={acquisition?.acquisitionMethod} className="w-full p-3 md:p-2.5 border border-slate-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"><option>Purchase</option><option>Donation</option><option>Transfer</option><option>Condemnation</option></select>
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1.5 text-slate-700">Interest Type</label>
                            <select name="interestType" defaultValue={acquisition?.interestType} className="w-full p-3 md:p-2.5 border border-slate-300 rounded-lg bg-white text-base focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"><option>Fee</option><option>Easement</option><option>Leasehold</option><option>Permit</option></select>
                        </div>
                        <div className="lg:col-span-3">
                            <label className="text-sm font-medium block mb-1.5 text-slate-700">Purpose</label>
                            <input name="purpose" type="text" defaultValue={acquisition?.purpose} placeholder="e.g., Flood Control Project" className="w-full p-3 md:p-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1.5 text-slate-700">Authority</label>
                            <input name="authority" type="text" defaultValue={acquisition?.authority} placeholder="e.g., WRDA 2022" className="w-full p-3 md:p-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1.5 text-slate-700">Statutory Basis</label>
                            <input name="statutoryBasis" type="text" defaultValue={acquisition?.statutoryBasis} placeholder="e.g., PL 91-646" className="w-full p-3 md:p-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1.5 text-slate-700">Responsible Org</label>
                            <input name="responsibleOrg" type="text" defaultValue={acquisition?.responsibleOrg} placeholder="e.g., Portland District" className="w-full p-3 md:p-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1.5 text-slate-700">Funding Source</label>
                            <input name="fundingSource" type="text" defaultValue={acquisition?.fundingSource} placeholder="e.g., MILCON FY24" className="w-full p-3 md:p-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1.5 text-slate-700">Total Cost</label>
                            <input name="cost" type="number" defaultValue={acquisition?.cost} className="w-full p-3 md:p-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1.5 text-slate-700">Target Close Date</label>
                            <input name="closeDate" type="date" defaultValue={acquisition?.closeDate} className="w-full p-3 md:p-2.5 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" />
                        </div>
                    </div>
                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mt-4 shadow-sm">
                            <label className="block text-sm font-bold text-amber-800 mb-2">Reason for Change</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g., 'Updated cost based on final appraisal.'" className="mt-1 block w-full p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500 text-base" rows={3} required />
                            <p className="text-xs text-amber-700 mt-1">An audit entry will be created for this update.</p>
                        </div>
                    )}
                </form>
                
                {/* Sticky Footer */}
                <div className="p-4 bg-white border-t flex gap-3 shrink-0 pb-safe absolute bottom-0 w-full md:relative md:w-auto md:rounded-b-xl z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <button type="button" onClick={onClose} className="flex-1 px-4 py-3.5 md:py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 active:bg-slate-100">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="flex-1 px-4 py-3.5 md:py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 active:bg-blue-800 shadow-sm">Save Changes</button>
                </div>
            </div>
        </div>
    );
};
