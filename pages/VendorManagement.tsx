import React from 'react';
import { VENDORS, WORK_ORDERS, CONTRACTS } from '../services/mockData';
import { Filter, Search, Plus, Star, BarChart2, FileText, Database, ArrowRight, Settings, Activity, Terminal, ArrowUpRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VendorManagement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Supply Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <ShoppingBag size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Supply Chain & External Resource Terminal</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Vendor Governance & Registry</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Active Vectors: {VENDORS.length} Classified</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search Vendor / Trade / ID..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5">
                <Filter size={14} /> Filter
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Onboard Resource
            </button>
        </div>
      </div>
      
      {/* Professional Vendor Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VENDORS.map(vendor => {
            const vendorWOs = WORK_ORDERS.filter(wo => wo.assignedTo === vendor.id);
            const vendorContracts = CONTRACTS.filter(c => c.vendorId === vendor.id);
            return (
                <div key={vendor.id} className="pro-card p-6 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col group relative">
                    <div className="flex justify-between items-start mb-6">
                        <div className="min-w-0">
                            <h3 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight truncate group-hover:text-blue-600 transition-colors uppercase italic">{vendor.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{vendor.trade}</span>
                                <span className="text-[9px] font-mono font-bold text-slate-300">ID: {vendor.id}</span>
                            </div>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm border shadow-sm ${vendor.rating > 4.5 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                           <Star size={10} className="fill-current" />
                           <span className="text-[10px] font-black font-mono leading-none">{vendor.rating}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 pt-4 border-t border-slate-50">
                        <div>
                            <p className="data-label">On-Time Velocity</p>
                            <p className="text-[13px] font-bold font-mono tracking-tighter text-slate-900 leading-none">{vendor.onTimeCompletionRate}%</p>
                        </div>
                         <div>
                            <p className="data-label">Avg. Disbursement</p>
                            <p className="text-[13px] font-bold font-mono tracking-tighter text-slate-900 leading-none">${vendor.avgInvoiceCost.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="data-label">Active Missions</p>
                            <p className="text-[13px] font-bold font-mono tracking-tighter text-slate-900 leading-none">{vendorWOs.length}</p>
                        </div>
                         <div>
                            <p className="data-label">Active Contracts</p>
                            <button onClick={() => navigate('/contracts', { state: { vendorFilter: vendor.id } })} className="flex items-center gap-2 group/link">
                                <span className="text-[13px] font-bold font-mono tracking-tighter text-blue-600 leading-none underline underline-offset-4">{vendorContracts.length}</span>
                                <ArrowUpRight size={12} className="text-blue-300 group-hover/link:text-blue-600 transition-colors" />
                            </button>
                        </div>
                    </div>

                    {/* Performance Indicator Bar */}
                    <div className="mt-auto space-y-1.5">
                        <div className="flex justify-between items-center px-0.5">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Health</span>
                            <span className="text-[8px] font-mono text-slate-400">{vendor.onTimeCompletionRate}%</span>
                        </div>
                        <div className="w-full bg-slate-50 h-1 rounded-sm overflow-hidden border border-slate-100">
                            <div className="bg-blue-600 h-full transition-all duration-1000" style={{width: `${vendor.onTimeCompletionRate}%`}} />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-colors rounded-sm flex items-center justify-center gap-2">
                           View Profile <ArrowRight size={12} />
                        </button>
                        <button onClick={() => navigate('/analytics', { state: { vendorId: vendor.id } })} className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors rounded-sm flex items-center justify-center gap-2">
                          <Activity size={12} /> Performance
                        </button>
                    </div>
                </div>
            )
        })}
      </div>

      {/* Global Intelligence Overlay */}
      <div className="pro-card p-4 bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-none">
          <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-600/20 text-emerald-500 border border-emerald-600/30 rounded-sm">
                  <ShieldCheck size={16} />
              </div>
              <div className="min-w-[200px]">
                  <p className="data-label !text-emerald-500 !mb-0">Compliance Index</p>
                  <p className="text-[13px] font-bold font-mono tracking-tighter uppercase whitespace-nowrap">Global Vendor Certification: 94% SECURE</p>
              </div>
          </div>
          <div className="flex-grow h-1 bg-white/10 rounded-full overflow-hidden mx-4 max-w-md hidden md:block">
              <div className="h-full bg-emerald-500 w-[94%] shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
          </div>
          <div className="flex items-center gap-6">
              <div className="text-right">
                  <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Active Spend (YTD)</p>
                  <p className="text-[14px] font-black font-mono leading-none">$1.14M</p>
              </div>
              <Terminal size={18} className="text-blue-600" />
          </div>
      </div>
    </div>
  );
};
