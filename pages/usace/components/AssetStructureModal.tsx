
import React, { useState, FormEvent } from 'react';
import { X, Lock } from 'lucide-react';
import { AssetComponent } from '../../../types';

interface AssetStructureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<AssetComponent>, reason: string) => void;
    parentAssetId: string;
    parentImprovementId?: string; // If provided, we are creating a Component (Level 3)
    existingItem?: AssetComponent;
}

export const AssetStructureModal: React.FC<AssetStructureModalProps> = ({ isOpen, onClose, onSave, parentAssetId, parentImprovementId, existingItem }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!existingItem;
    
    // Determine the type of item we are working with
    const defaultType = parentImprovementId ? 'Component' : 'Improvement';
    const [itemType, setItemType] = useState<AssetComponent['type']>(existingItem?.type || defaultType);

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
            cost: Number(data.cost),
            appraisalValue: data.appraisalValue ? Number(data.appraisalValue) : undefined,
            parentAssetId,
            parentImprovementId
        };

        onSave(processedData as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">
                        {isEditMode ? `Edit ${existingItem.type}` : `Add New ${parentImprovementId ? 'Component/Betterment' : 'Improvement'}`}
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 15.1.1 Establishment */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Item Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2"><label className="text-sm font-medium">Name / Description</label><input name="name" type="text" defaultValue={existingItem?.name} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            
                            <div>
                                <label className="text-sm font-medium">Type</label>
                                <select 
                                    name="type" 
                                    value={itemType} 
                                    onChange={(e) => setItemType(e.target.value as any)} 
                                    className="w-full mt-1 p-2 border rounded-md"
                                    disabled={!!parentImprovementId && isEditMode} // Lock type if editing
                                >
                                    {!parentImprovementId && <option value="Improvement">Improvement</option>}
                                    {parentImprovementId && <option value="Component">Component</option>}
                                    {parentImprovementId && <option value="Betterment">Betterment</option>}
                                    {!parentImprovementId && !isEditMode && <option value="Betterment">Betterment (Direct)</option>}
                                </select>
                            </div>

                            <div><label className="text-sm font-medium">Lifecycle State</label><select name="lifecycleState" defaultValue={existingItem?.lifecycleState || 'Planned'} className="w-full mt-1 p-2 border rounded-md"><option>Planned</option><option>Active</option><option>Modified</option><option>Retired</option><option>Archived</option></select></div>
                            <div><label className="text-sm font-medium">Install Date</label><input name="installDate" type="date" defaultValue={existingItem?.installDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Cost ($)</label><input name="cost" type="number" defaultValue={existingItem?.cost} className="w-full mt-1 p-2 border rounded-md" required /></div>
                        </div>
                    </div>

                    {/* 15.1.5 Valuation - Only for Improvements */}
                    {(itemType === 'Improvement' || itemType === 'Betterment') && (
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider flex items-center gap-2">Valuation <Lock size={12} className="text-slate-400"/></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="text-sm font-medium">Appraisal Value ($)</label><input name="appraisalValue" type="number" defaultValue={existingItem?.appraisalValue} className="w-full mt-1 p-2 border rounded-md" /></div>
                                <p className="text-xs text-slate-500 md:col-span-2 mt-1">Appraisal values are recorded at the improvement level per DoDI 4165.14.</p>
                            </div>
                        </div>
                    )}

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Justification for update (Req 15.3.4)..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are logged in the immutable audit trail (Req 15.8.1).</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update' : 'Add Item'}</button>
                </div>
            </div>
        </div>
    );
};
