import React, { useState } from 'react';
import { Landmark, DollarSign as DollarIcon, Plus, Download, Filter, Search, Activity, Briefcase, FileText, CheckCircle, Clock, AlertTriangle, ArrowRight, ShieldCheck, ShoppingCart, Truck, Gavel } from 'lucide-react';
import { PURCHASE_ORDERS, VENDORS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisProcurement: React.FC = () => {
    const [view, setView] = useState('pos');

    return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
            <div className="p-2.5 bg-slate-950 rounded shadow-lg shadow-black/10 text-white">
                <ShoppingCart size={24} className="text-blue-400" />
            </div>
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">Strategic Procurement & PO Lifecycle Hub</h1>
                    <div className="pulse-mission" />
                    <RegulatoryBadge refs={['ER 37-1-30', 'FAR Part 13']} />
                </div>
                <div className="flex items-center gap-3 mt-1.5 italic">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none">Enterprise Supply Chain • Requisition Authority</span>
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter italic">Mission Critical Acquisition Infrastructure</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                <Download size={14} className="group-hover:text-blue-500" /> Requisition Export
            </button>
            <button className="btn-pro-primary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-[0.25em] italic">
                <ShoppingCart size={14} /> New PO Requisition
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="pro-card p-6 flex flex-col group hover:border-blue-400 transition-all cursor-pointer bg-white">
              <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><Briefcase size={18}/></div>
                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-100 uppercase tracking-widest italic">ACTIVE_FY24</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none text-blue-900/60">Live Strategic Purchase Orders</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{PURCHASE_ORDERS.length}_UNITS</p>
          </div>
          <div className="pro-card p-6 flex flex-col group hover:border-emerald-400 transition-all cursor-pointer bg-white">
              <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><DollarIcon size={18}/></div>
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-widest italic">CAPITAL_LIQUIDITY</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none text-emerald-900/60">Total Enforced Procurement Value</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">$824.5k_USD</p>
          </div>
          <div className="pro-card p-6 flex flex-col group hover:border-amber-400 transition-all cursor-pointer bg-white">
              <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><Truck size={18}/></div>
                  <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-100 uppercase tracking-widest italic">LOGISTICS_LEAD</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none text-amber-900/60">Asset Transit Lifecycle Modules</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">12_VECTORS</p>
          </div>
      </div>

      <div className="pro-card overflow-hidden flex flex-col bg-white">
        <div className="px-6 border-b border-white/5 bg-[#0A0A0B] py-5 flex flex-col md:flex-row justify-between items-center gap-4 italic">
            <nav className="flex gap-10">
                <button onClick={() => setView('pos')} className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all italic ${view === 'pos' ? 'text-blue-400 border-b-2 border-blue-600 pb-1' : 'text-white/30 hover:text-white/60'}`}>Command Registry</button>
                <button onClick={() => setView('requisitions')} className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all italic ${view === 'requisitions' ? 'text-blue-400 border-b-2 border-blue-600 pb-1' : 'text-white/30 hover:text-white/60'}`}>Internal Modules</button>
            </nav>
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                    <input type="text" placeholder="QUERY_PO_SUPPLY_CHAIN..." className="w-full pl-9 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black italic text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500 transition-all uppercase tracking-widest" />
                </div>
            </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">PURCHASE_IDENTIFIER</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">CONTRACT_ENTITY</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">STRATEGIC_ASSET_NODE</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic text-right">FISCAL_MAGNITUDE</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic text-right">LIFECYCLE_STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PURCHASE_ORDERS.map((po, i) => {
                  const vendor = VENDORS.find(v => v.id === po.vendorId);
                  const asset = USACE_ASSETS[i % USACE_ASSETS.length];
                  return (
                  <tr key={po.id} className="pro-data-row group">
                      <td className="px-6 py-5">
                          <div className="font-black text-slate-900 text-[12px] uppercase tracking-tight leading-none mb-1 group-hover:text-blue-600 transition-colors italic">{po.id}</div>
                          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono italic">EPOCH::{po.orderDate}</div>
                      </td>
                      <td className="px-6 py-5">
                          <div className="font-black text-slate-900 text-[11px] uppercase tracking-tight italic">{vendor?.name}</div>
                          <div className="text-[10px] font-black text-blue-600 uppercase tracking-tighter italic">{vendor?.trade}_STRAT_PARTNER</div>
                      </td>
                      <td className="px-6 py-5">
                          <div className="flex flex-col italic">
                              <Link to={`/usace/inventory/${asset.id}`} className="font-black text-blue-600 hover:text-blue-800 font-mono text-[11px] uppercase tracking-tighter leading-none mb-1">{asset.rpuid}</Link>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-none">{asset.name.replace(' ', '_')}</span>
                          </div>
                      </td>
                      <td className="px-6 py-5 text-right font-mono font-black text-slate-900 text-[13px] tracking-tighter uppercase italic group-hover:text-emerald-700 transition-colors">
                          <div className="flex items-center justify-end gap-1">
                              <DollarIcon size={12} className="text-slate-300" />
                              {po.totalAmount.toLocaleString()}_USD
                          </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                          <StatusBadge status={po.status} />
                      </td>
                  </tr>
              )})}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-5 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] italic">
            <div className="flex items-center gap-3 text-white/40">
                <Gavel size={14} className="text-blue-400" />
                ACQUISITION_INTEGRITY_SYNC_ACTIVE [FAR::P13_VERIFIED]
            </div>
            <button className="flex items-center gap-2 text-blue-400 hover:text-white transition-all transform hover:translate-x-1">
                SUPPLY_CHAIN_TELEMETRY <ArrowRight size={12} />
            </button>
        </div>
      </div>
    </div>
    );
};
