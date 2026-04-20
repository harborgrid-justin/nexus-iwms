
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
    <div className="max-w-[1700px] mx-auto space-y-8 italic font-black h-full flex flex-col overflow-hidden max-h-[calc(100vh-120px)]">
      <AppraisalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Valuation Hub Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b-2 border-slate-900 relative flex-shrink-0">
        <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-amber-500 animate-pulse" />
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-600 rounded-none text-white shadow-2xl shadow-amber-900/40 transform rotate-2">
                    <Target size={24} />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic mb-2">Valuation Command Hub</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-60">VAL_INTEL_PROTOCOL_V4</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[10px] font-mono font-black text-amber-600 uppercase tracking-tighter italic">BUREAU_VALUATION_LEVEL: L9_SECURE</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-6 italic border-l-2 border-slate-100 pl-6">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic opacity-40">USPAP_COMPLIANCE</span>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest italic leading-none">FED_REG_SYNC_ACTIVE</span>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic opacity-40">REGULATORY_ANCHOR</span>
                    <span className="text-[11px] font-black text-amber-600 uppercase tracking-widest italic leading-none">ER 405-1-12</span>
                </div>
                <RegulatoryBadge refs={['AR 405-10', '92']} />
            </div>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="relative flex-grow md:w-80 group italic">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-amber-500 group-focus-within:h-full transition-all" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={16} />
                <input type="text" placeholder="SCAN_VALUATION_NODES..." className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-900 rounded-none text-[11px] font-mono font-black uppercase tracking-widest outline-none shadow-xl" />
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn-pro-primary bg-slate-950 hover:bg-amber-600 flex items-center gap-4 px-10 py-4 h-auto text-[11px] font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-amber-500/20 active:scale-95">
                <Plus size={18} /> INITIALIZE_NEW_REQUEST
            </button>
        </div>
      </div>
      
      {/* High-Density Registry */}
      <div className="flex-grow flex flex-col bg-white border-2 border-slate-900 shadow-2xl relative overflow-hidden italic">
        <div className="px-10 py-6 border-b-2 border-slate-900 bg-slate-950 flex items-center justify-between italic">
            <div className="flex items-center gap-6">
                <Database size={18} className="text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white">Unified Valuation Pipeline Registry</span>
            </div>
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-3 text-[9px] font-black text-emerald-500 uppercase tracking-widest italic">
                    <Activity size={14} className="animate-pulse" />
                    <span>L6_VAL_SYNC_READY</span>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] italic leading-none">CORE_ENGINE_STATE::LOCKED</span>
            </div>
        </div>
        
        <div className="flex-grow overflow-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200">
                <tr>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">ASSET_NODE_VECTOR</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">VALUATION_AUTHORITY</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">WINDOW_TERMINAL</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic">STRATEGIC_PURPOSE</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic text-right">VALUATION_MAGNITUDE</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic text-right">PROTOCOL_STATUS</th>
                </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-50">
                {USACE_APPRAISALS.map(app => (
                <tr key={app.id} onClick={() => navigate(`/usace/appraisals/${app.id}`)} className="group cursor-pointer hover:bg-slate-50 transition-all font-black">
                    <td className="px-10 py-8 relative">
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 opacity-0 group-hover:opacity-100 transition-all" />
                       <div className="flex items-center gap-6">
                           <div className="p-4 bg-slate-950 text-white shadow-xl group-hover:bg-amber-600 transition-all rotate-2">
                               <Target size={18} />
                           </div>
                           <div className="flex flex-col">
                               <span className="font-mono text-[14px] text-amber-600 group-hover:text-amber-800 uppercase tracking-tighter transition-colors select-all leading-tight">HEX::{app.assetId}</span>
                               <span className="text-[8px] text-slate-300 uppercase tracking-widest mt-1 italic font-black">VECTOR_IDENT_STREAM</span>
                           </div>
                       </div>
                    </td>
                    <td className="px-10 py-8 text-[13px] text-slate-900 uppercase tracking-tighter group-hover:text-amber-600 transition-colors italic">
                        {app.appraiser.replace(' ', '_')}
                    </td>
                    <td className="px-10 py-8">
                        <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-900 font-mono italic text-[11px] transition-colors">
                            <Calendar size={14} className="opacity-40 group-hover:text-amber-600 group-hover:opacity-100" />
                            {app.appraisalDate.toUpperCase()}
                        </div>
                    </td>
                    <td className="px-10 py-8">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-300 group-hover:text-slate-950 transition-colors border-l border-slate-100 pl-4">VAL::{app.purpose.toUpperCase()}</span>
                    </td>
                    <td className="px-10 py-8 text-right font-black italic">
                        <div className="flex justify-end items-center gap-4 font-mono group-hover:scale-110 transition-transform origin-right">
                            <Lock size={14} className="text-amber-500 opacity-20 group-hover:opacity-100 animate-pulse" />
                            <span className="text-[15px] tracking-tighter text-slate-950 group-hover:text-amber-600 transition-colors uppercase leading-none">${app.appraisedValue.toLocaleString()}.00</span>
                        </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                        <StatusBadge status={app.status} className="scale-90 origin-right shadow-2xl" />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Terminal Info Footer */}
        <div className="px-10 py-6 bg-slate-950 text-white/40 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.6em] italic leading-none border-t border-white/5">
            <div className="flex items-center gap-12">
                <div className="flex items-center gap-4">
                    <Activity size={14} className="text-amber-500 animate-pulse" />
                    <span>LIFECYCLE_STABLE_V9.4::[ {USACE_APPRAISALS.length.toString().padStart(3, '0')} VAL_NODES ]</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-4">
                    <Terminal size={14} className="text-blue-500" />
                    <span>USPAP_ENGINE_READY::33ms</span>
                </div>
            </div>
            <div className="flex items-center gap-12">
                <span className="text-white/5 select-none">AUTHORIZED_SIGINT_COLLECTOR</span>
                <button className="flex items-center gap-4 text-amber-500/60 hover:text-amber-400 transition-all italic underline decoration-transparent hover:decoration-amber-400 underline-offset-4 decoration-2">
                    <ArrowUpRight size={14} /> INITIALIZE_COMPREHENSIVE_AUDIT
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
