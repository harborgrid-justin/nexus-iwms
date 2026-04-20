import React, { useState } from 'react';
import { X, Building2, Calendar, DollarSign, Square, HardHat, Sigma, CheckCircle } from 'lucide-react';

interface CreateAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateAssetModal: React.FC<CreateAssetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('New asset record created (simulation). Authoritative synchronization with CEFMS will begin shortly.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[90vh] flex flex-col transform transition-all border border-slate-200 overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-none">Create New Asset Record</h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">Standard Real Property Entry</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 pb-24 md:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">RPUID</label>
                <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" readOnly defaultValue={`USACE-CW-NEW-${Math.floor(Math.random() * 1000)}`} className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm text-slate-500 font-mono text-sm cursor-not-allowed" />
                </div>
            </div>
            <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Asset Name</label>
                <input type="text" placeholder="e.g., Lock & Dam Service Building" className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
            </div>
            <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Program</label>
                <select className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer">
                    <option>Civil Works</option>
                    <option>Military</option>
                </select>
            </div>
            <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Asset Type</label>
                <select className="block w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer">
                    <option>Building</option>
                    <option>Structure</option>
                    <option>Land</option>
                    <option>Linear Structure</option>
                </select>
            </div>
            <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Acquisition Date</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="date" className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                </div>
            </div>
            <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Cost (USD)</label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="number" placeholder="0.00" className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" required />
                </div>
            </div>
            <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Area (SQFT)</label>
                <div className="relative">
                    <Square className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="number" placeholder="0" className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none" />
                </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3 items-start">
              <CheckCircle size={20} className="text-blue-500 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700 font-medium">
                  Compliance Check: This entry will be validated against USACE ER 405-1-12 standards upon submission.
              </div>
          </div>
        </form>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 shrink-0 pb-safe fixed bottom-0 w-full md:relative md:w-auto md:bg-slate-50 md:rounded-b-2xl z-10">
          <button type="button" onClick={onClose} className="flex-1 px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="flex-1 px-5 py-2.5 text-sm font-bold text-white bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">Create Asset Record</button>
        </div>
      </div>
    </div>
  );
};
