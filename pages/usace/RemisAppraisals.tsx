
import React, { useState } from 'react';
import { DollarSign, Plus, Filter, Search, Lock, X, Building, Calendar, User, FileEdit, Database, Target, ArrowUpRight, Activity, ArrowRight, LayoutDashboard, Terminal, Info, Settings, MoreHorizontal } from 'lucide-react';
import { USACE_APPRAISALS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { StatusBadge } from '../../components/StatusBadge';
import { useNavigate } from 'react-router-dom';

const AppraisalModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-sm shadow-2xl w-full max-w-2xl flex flex-col border border-slate-200 overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
             <div className="p-1.5 bg-slate-950 rounded-sm text-white">
                <Target size={14} />
             </div>
             <div>
                <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight leading-none">Initiate Valuation Request</h2>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest italic tracking-tighter">Official USACE Regulatory Protocol</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-300 hover:text-slate-600 transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
                <label className="data-label">Real Property Asset</label>
                <select className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-[11px] font-bold outline-none focus:ring-1 focus:ring-blue-500" required>
                    {USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}
                </select>
            </div>
            <div className="space-y-1.5">
                <label className="data-label">Related Strategic Action</label>
                <select className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-[11px] font-bold outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="ACQ-02">ACQ-02 Acquisition Cluster</option>
                    <option value="DIS-01">DIS-01 Divestiture Node</option>
                </select>
            </div>
            <div className="space-y-1.5">
                <label className="data-label">Valuation Purpose</label>
                <select className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-[11px] font-bold outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Acquisition</option>
                    <option>Disposal</option>
                    <option>Outgrant</option>
                </select>
            </div>
            <div className="space-y-1.5">
                <label className="data-label">Appraisal Class</label>
                <select className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-[11px] font-bold outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Market Value</option>
                    <option>In-Kind Consideration</option>
                </select>
            </div>
            <div className="space-y-1.5">
                <label className="data-label">Assigned Appraiser</label>
                <input type="text" placeholder="e.g., JLL Valuation Services" className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-[11px] font-bold outline-none focus:ring-1 focus:ring-blue-500" required />
            </div>
            <div className="space-y-1.5">
                <label className="data-label">Target Epoch Date</label>
                <input type="date" className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-[11px] font-bold outline-none focus:ring-1 focus:ring-blue-500" required />
            </div>
          </div>
        </form>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="px-6 py-2 bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-slate-900 transition-all flex items-center gap-3">
             Initialize Request <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};


export const RemisAppraisals: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <AppraisalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Precision Appraisal Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded-sm text-white shadow-sm">
                <Target size={16} />
            </div>
            <div className="flex items-center gap-3">
               <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Strategic Valuation & Appraisals</h1>
               <RegulatoryBadge refs={['AR 405-10', '3']} />
            </div>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Appraisal Lifecycle Management</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Indexed Appraisals: {USACE_APPRAISALS.length}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search RPUID / Appraiser / Office..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> New Request
            </button>
        </div>
      </div>
      
      {/* High-Density Appraisal Register */}
      <div className="pro-card overflow-hidden">
        <div className="pro-card-header bg-slate-50/50">
            <div className="flex items-center gap-2">
                <Database size={14} className="text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Unified Valuation Pipeline</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">Auth: VAL-CORPS-GLOBAL</span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 data-label">Asset RPUID</th>
                    <th className="px-6 py-4 data-label">Valuation Authority</th>
                    <th className="px-6 py-4 data-label">Maturity Window</th>
                    <th className="px-6 py-4 data-label">Strategic Purpose</th>
                    <th className="px-6 py-4 data-label text-right">Appraised Value</th>
                    <th className="px-6 py-4 data-label text-right">Lifecycle</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 italic font-mono uppercase tracking-tighter">
                {USACE_APPRAISALS.map(app => (
                <tr key={app.id} onClick={() => navigate(`/usace/appraisals/${app.id}`)} className="hover:bg-slate-50 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-l-blue-600">
                    <td className="px-6 py-5">
                       <div className="flex flex-col">
                           <span className="text-[11px] font-black text-blue-600 not-italic uppercase tracking-tight group-hover:underline">{app.assetId}</span>
                           <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-widest not-italic italic">Vector Identification</span>
                       </div>
                    </td>
                    <td className="px-6 py-5">
                        <span className="text-[11px] font-bold text-slate-700 not-italic uppercase tracking-tight">{app.appraiser}</span>
                    </td>
                    <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Calendar size={12} className="text-slate-300" />
                            <span className="text-[11px] font-bold opacity-70 not-italic">{app.appraisalDate}</span>
                        </div>
                    </td>
                    <td className="px-6 py-5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest not-italic">{app.purpose}</span>
                    </td>
                    <td className="px-6 py-5 text-right font-mono font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        <div className="flex justify-end items-center gap-2 not-italic">
                            <span title="Controlled Access Data (Logged Access)">
                            <Lock size={12} className="text-slate-200 group-hover:text-amber-500 transition-colors" />
                            </span>
                            <span className="text-[12px] font-black tracking-tighter">${app.appraisedValue.toLocaleString()}</span>
                        </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                        <StatusBadge status={app.status} />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 italic text-center">
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors flex items-center gap-2 mx-auto justify-center">
                <Activity size={12} className="text-blue-500" /> Initialize Comprehensive Valuation Audit <ArrowUpRight size={12} />
            </button>
        </div>
      </div>
    </div>
  );
};
