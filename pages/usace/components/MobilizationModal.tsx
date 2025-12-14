import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { MobilizationProfile } from '../../../types';
import { USACE_ASSETS } from '../../../services/mockData';

interface MobilizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<MobilizationProfile>, reason: string) => void;
    profile?: MobilizationProfile | null;
}

export const MobilizationModal: React.FC<MobilizationModalProps> = ({ isOpen, onClose, onSave, profile }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!profile;

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
            condition: Number(data.condition),
        };

        onSave(processedData as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Update Mobilization Profile' : 'Create Mobilization Profile'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 10.1.1 & 10.1.2 Data Establishment */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Applicability & Readiness</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Asset</label><select name="assetId" defaultValue={profile?.assetId} className="w-full mt-1 p-2 border rounded-md" required disabled={isEditMode}>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Criticality</label><select name="missionCriticality" defaultValue={profile?.missionCriticality} className="w-full mt-1 p-2 border rounded-md"><option>Mission Critical</option><option>Mission Essential</option><option>Non-Critical</option></select></div>
                            <div><label className="text-sm font-medium">Readiness Designation</label><select name="readinessDesignation" defaultValue={profile?.readinessDesignation} className="w-full mt-1 p-2 border rounded-md"><option>P1 - Immediate</option><option>P2 - 24 Hours</option><option>P3 - 72 Hours</option><option>Reserve</option></select></div>
                            <div><label className="text-sm font-medium">Condition Score (0-100)</label><input name="condition" type="number" defaultValue={profile?.condition} min="0" max="100" className="w-full mt-1 p-2 border rounded-md" required /></div>
                        </div>
                    </div>

                    {/* 10.1.3 & 10.1.4 Capacity & Association */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Capacity & Operations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Facility Type</label><input name="facilityType" type="text" defaultValue={profile?.facilityType} placeholder="e.g. Barracks" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Contingency Plan ID</label><input name="contingencyPlanId" type="text" defaultValue={profile?.contingencyPlanId} placeholder="e.g. PLAN-ALPHA" className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Functional Capability</label><textarea name="functionalCapability" defaultValue={profile?.functionalCapability} placeholder="Describe capacity..." className="w-full mt-1 p-2 border rounded-md h-20" required /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Operational Requirement</label><input name="operationalRequirement" type="text" defaultValue={profile?.operationalRequirement} className="w-full mt-1 p-2 border rounded-md" /></div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Administrative</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Initiating Org</label><input name="initiatingOrg" type="text" defaultValue={profile?.initiatingOrg} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Responsible Official</label><input name="responsibleOfficial" type="text" defaultValue={profile?.responsibleOfficial} className="w-full mt-1 p-2 border rounded-md" required /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Justification for update (10.3.3)..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are logged in the immutable audit trail (Req 10.8.1).</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update Profile' : 'Create Profile'}</button>
                </div>
            </div>
        </div>
    );
};