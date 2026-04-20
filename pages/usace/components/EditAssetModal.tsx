import React, { useState, FormEvent } from 'react';
import { X } from 'lucide-react';
import { RealPropertyAsset } from '../../../types';

interface EditAssetModalProps {
  asset: RealPropertyAsset;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedAsset: RealPropertyAsset, reason: string) => void;
}

export const EditAssetModal: React.FC<EditAssetModalProps> = ({ asset, isOpen, onClose, onSave }) => {
    if (!isOpen) return null;
    const [reason, setReason] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!reason.trim()) {
            alert('A "Reason for Change" is required to save modifications.');
            return;
        }
        onSave(asset, reason); 
        onClose();
    }
    
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 leading-none">Edit Asset Record</h2>
                        <p className="text-xs text-slate-500 mt-1 font-mono">{asset.rpuid}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Asset Name</label>
                            <input type="text" defaultValue={asset.name} className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                            <input type="text" defaultValue={asset.location} className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                        </div>
                    </div>
                     <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-2xl space-y-3">
                        <label className="block text-sm font-bold text-amber-900 flex items-center gap-2">
                             Reason for Change
                             <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded leading-none">Required</span>
                        </label>
                        <textarea 
                            value={reason} 
                            onChange={e => setReason(e.target.value)} 
                            placeholder="Please provide a detailed justification for this record modification..." 
                            className="block w-full px-4 py-3 bg-white border border-amber-200 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none min-h-[100px] text-sm" 
                            required 
                        />
                        <p className="text-xs text-amber-700/70 italic italic flex items-center gap-1.5">
                            This update will be permanently logged in the asset's audit lifecycle history.
                        </p>
                    </div>
                </form>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">Commit Changes</button>
                </div>
            </div>
        </div>
    );
};
