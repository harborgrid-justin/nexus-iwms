
import React, { useState, FormEvent } from 'react';
import { X, Plus, Trash2, AlertTriangle, Lock } from 'lucide-react';
import { UtilizationInspection, InspectionFinding, InspectionRecommendation } from '../../../types';
import { USACE_ASSETS, USACE_OUTGRANTS } from '../../../services/mockData';

interface InspectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<UtilizationInspection>, reason: string) => void;
    inspection?: UtilizationInspection | null;
    outGrantId?: string; // Optional context
    assetId?: string; // Optional context
}

export const InspectionModal: React.FC<InspectionModalProps> = ({ isOpen, onClose, onSave, inspection, outGrantId, assetId }) => {
    const [reason, setReason] = useState('');
    const [activeTab, setActiveTab] = useState<'plan' | 'findings' | 'results'>('plan');
    const isEditMode = !!inspection;
    const isFinalized = inspection?.lifecycleState === 'Approved' || inspection?.lifecycleState === 'Closed' || inspection?.lifecycleState === 'Archived';

    // Local state for complex nested arrays
    const [findings, setFindings] = useState<InspectionFinding[]>(inspection?.findings || []);
    const [recommendations, setRecommendations] = useState<InspectionRecommendation[]>(inspection?.recommendations || []);

    if (!isOpen) return null;

    const addFinding = () => {
        setFindings([...findings, { id: `F-NEW-${Date.now()}`, description: '', severity: 'Minor', status: 'Open' }]);
    };

    const updateFinding = (index: number, field: keyof InspectionFinding, value: string) => {
        const updated = [...findings];
        updated[index] = { ...updated[index], [field]: value };
        setFindings(updated);
    };

    const removeFinding = (index: number) => {
        setFindings(findings.filter((_, i) => i !== index));
    };

    const addRecommendation = () => {
        setRecommendations([...recommendations, { id: `R-NEW-${Date.now()}`, description: '' }]);
    };

    const updateRecommendation = (index: number, field: keyof InspectionRecommendation, value: string) => {
        const updated = [...recommendations];
        updated[index] = { ...updated[index], [field]: value };
        setRecommendations(updated);
    };

    const removeRecommendation = (index: number) => {
        setRecommendations(recommendations.filter((_, i) => i !== index));
    };

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
            assetId: assetId || data.assetId,
            outGrantId: outGrantId || data.outGrantId,
            findings,
            recommendations
        };

        // 16.7.4 Check
        if (data.lifecycleState === 'Closed' && findings.some(f => f.status === 'Open')) {
            if (!confirm('Warning: Closing inspection with OPEN findings. Are you sure?')) {
                return;
            }
        }

        onSave(processedData as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Manage Inspection' : 'Schedule New Inspection'}</h2>
                        <p className="text-xs text-slate-500">Utilization Inspection (40 U.S.C. §524)</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                
                <div className="flex border-b border-slate-200">
                    <button onClick={() => setActiveTab('plan')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'plan' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>Inspection Plan</button>
                    <button onClick={() => setActiveTab('findings')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'findings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>Execution & Findings</button>
                    <button onClick={() => setActiveTab('results')} className={`px-6 py-3 text-sm font-medium ${activeTab === 'results' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>Results & Summary</button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    {activeTab === 'plan' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Asset</label><select name="assetId" defaultValue={inspection?.assetId || assetId} className="w-full mt-1 p-2 border rounded-md" required disabled={!!assetId}>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Out-Grant (Optional)</label><select name="outGrantId" defaultValue={inspection?.outGrantId || outGrantId} className="w-full mt-1 p-2 border rounded-md" disabled={!!outGrantId}><option value="">-- None --</option>{USACE_OUTGRANTS.map(og => <option key={og.id} value={og.id}>{og.id} ({og.grantee})</option>)}</select></div>
                            
                            <div><label className="text-sm font-medium">Scheduled Date</label><input name="inspectionDate" type="date" defaultValue={inspection?.inspectionDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Type</label><select name="type" defaultValue={inspection?.type} className="w-full mt-1 p-2 border rounded-md"><option>Routine</option><option>Compliance</option><option>Termination</option><option>Utilization</option><option>Audit</option></select></div>
                            
                            <div className="md:col-span-2"><label className="text-sm font-medium">Inspection Scope (16.1.2)</label><textarea name="scope" defaultValue={inspection?.scope} className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Define the scope..." required /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Inspection Criteria</label><textarea name="criteria" defaultValue={inspection?.criteria} className="w-full mt-1 p-2 border rounded-md h-20" placeholder="Standards or lease clauses to check..." required /></div>
                            
                            <div><label className="text-sm font-medium">Inspector / Lead</label><input name="inspector" type="text" defaultValue={inspection?.inspector} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Responsible Org</label><input name="responsibleOrg" type="text" defaultValue={inspection?.responsibleOrg} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div className="md:col-span-2"><label className="text-sm font-medium">Team Composition</label><input name="teamComposition" type="text" defaultValue={inspection?.teamComposition} className="w-full mt-1 p-2 border rounded-md" placeholder="Names/Titles of team members..." /></div>
                        </div>
                    )}

                    {activeTab === 'findings' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800">Inspection Findings (16.1.4)</h3>
                                <button type="button" onClick={addFinding} disabled={isFinalized} className="text-sm text-blue-600 hover:underline flex items-center gap-1 disabled:opacity-50"><Plus size={14}/> Add Finding</button>
                            </div>
                            {isFinalized && <div className="mb-4 text-xs bg-amber-50 text-amber-700 p-2 rounded border border-amber-200 flex items-center gap-2"><Lock size={12}/> Inspection is finalized. Findings cannot be modified.</div>}
                            
                            <div className="space-y-3">
                                {findings.map((finding, idx) => (
                                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded border">
                                        <div className="flex-1 space-y-2">
                                            <input type="text" value={finding.description} onChange={e => updateFinding(idx, 'description', e.target.value)} placeholder="Description of observation..." className="w-full p-2 border rounded text-sm" disabled={isFinalized}/>
                                            <div className="flex gap-2">
                                                <select value={finding.severity} onChange={e => updateFinding(idx, 'severity', e.target.value)} className="p-1 border rounded text-xs" disabled={isFinalized}><option>Minor</option><option>Major</option><option>Critical</option></select>
                                                <select value={finding.status} onChange={e => updateFinding(idx, 'status', e.target.value)} className="p-1 border rounded text-xs" disabled={isFinalized}><option>Open</option><option>Closed</option></select>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => removeFinding(idx)} disabled={isFinalized} className="text-slate-400 hover:text-red-500 disabled:opacity-50"><Trash2 size={16}/></button>
                                    </div>
                                ))}
                                {findings.length === 0 && <p className="text-sm text-slate-500 italic text-center py-4">No findings recorded.</p>}
                            </div>
                        </div>
                    )}

                    {activeTab === 'results' && (
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium">Utilization Summary (16.1.5)</label>
                                    {isFinalized && <Lock size={14} className="text-slate-400"/>}
                                </div>
                                <textarea name="utilizationSummary" defaultValue={inspection?.utilizationSummary} className="w-full p-2 border rounded-md h-24" placeholder="Overall summary of utilization and compliance..." disabled={isFinalized}/>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-slate-800 text-sm">Recommendations (16.1.5)</h3>
                                    <button type="button" onClick={addRecommendation} disabled={isFinalized} className="text-xs text-blue-600 hover:underline flex items-center gap-1 disabled:opacity-50"><Plus size={12}/> Add</button>
                                </div>
                                <div className="space-y-2">
                                    {recommendations.map((rec, idx) => (
                                        <div key={idx} className="flex gap-2 items-center">
                                            <input type="text" value={rec.description} onChange={e => updateRecommendation(idx, 'description', e.target.value)} className="flex-1 p-2 border rounded text-sm" placeholder="Recommendation..." disabled={isFinalized}/>
                                            <button type="button" onClick={() => removeRecommendation(idx)} disabled={isFinalized} className="text-slate-400 hover:text-red-500 disabled:opacity-50"><Trash2 size={14}/></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <label className="text-sm font-bold text-blue-900">Lifecycle State</label>
                                <select name="lifecycleState" defaultValue={inspection?.lifecycleState || 'Planned'} className="w-full mt-1 p-2 border rounded-md bg-white">
                                    <option>Planned</option>
                                    <option>Scheduled</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                    <option>Reviewed</option>
                                    <option>Approved</option>
                                    <option>Closed</option>
                                    <option>Archived</option>
                                </select>
                                <p className="text-xs text-blue-700 mt-1">State transitions are logged. Inspections with open findings cannot be closed.</p>
                            </div>
                        </div>
                    )}

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Justification for update..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are versioned and logged in the immutable audit trail (Req 16.8.1).</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update Inspection' : 'Schedule Inspection'}</button>
                </div>
            </div>
        </div>
    );
};
