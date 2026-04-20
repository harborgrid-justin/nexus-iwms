import React from 'react';
import { Package, PackageCheck, ShoppingCart, Filter, Plus, Terminal, Database, ArrowUpRight, Search } from 'lucide-react';
import { INVENTORY } from '../services/mockData';

const KpiCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="pro-card p-5 group transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors`}>
          <Icon size={16} />
        </div>
        {trend && (
            <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 uppercase">
                {trend}
            </span>
        )}
      </div>
      <p className="data-label mb-1">{title}</p>
      <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{value}</p>
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Resource Audit</span>
          <ArrowUpRight size={12} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
      </div>
    </div>
);

export const Inventory: React.FC = () => {
    const totalValue = INVENTORY.reduce((acc, item) => acc + (item.stock * item.costPerUnit), 0);
    const itemsToReorder = INVENTORY.filter(item => item.stock <= item.reorderLevel).length;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Strategic Inventory Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Package size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Global Resource Logistics</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Strategic MRO Parts & Supply Matrix</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Stock Accuracy: 99.8%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search Master SKU..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-primary flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <Plus size={14} /> Register SKU
            </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Aggregate Net Value" value={`$${(totalValue/1000).toFixed(1)}k`} icon={Database} trend="VALUATION" />
        <KpiCard title="Replenishment Alert" value={itemsToReorder} icon={ShoppingCart} trend={itemsToReorder > 0 ? "CRITICAL" : "OPTIMAL"} />
        <KpiCard title="Master SKU Register" value={INVENTORY.length} icon={PackageCheck} trend="STABLE" />
      </div>

      <div className="pro-card overflow-hidden">
        <div className="pro-card-header bg-slate-50/10">
            <div className="flex items-center gap-2">
                <Terminal size={14} className="text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Stock Deployment Ledger</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600 transition-colors"><Filter size={14}/></button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm italic font-mono">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 data-label">Operational Asset</th>
                <th className="px-6 py-4 data-label">Station Node</th>
                <th className="px-6 py-4 data-label text-center">Unit Volume</th>
                <th className="px-6 py-4 data-label text-right">Unit Liquidity</th>
                <th className="px-6 py-4 data-label text-right">Aggregate Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INVENTORY.map(item => {
                const stockStatus = item.stock <= item.reorderLevel ? 'low' : 'optimal';
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-900 not-italic uppercase tracking-tight group-hover:text-blue-600 transition-colors">{item.name}</span>
                        <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter not-italic">SKU: {item.sku}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 not-italic text-xs font-bold uppercase tracking-widest">{item.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className={`text-[13px] font-bold ${stockStatus === 'low' ? 'text-red-600 animate-pulse' : 'text-slate-900'}`}>{item.stock}</span>
                        <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${stockStatus === 'low' ? 'bg-red-500' : 'bg-emerald-500'}`} style={{width: `${Math.min((item.stock / (item.reorderLevel * 2)) * 100, 100)}%`}}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900 text-right font-bold not-italic font-sans text-xs">${item.costPerUnit.toFixed(2)}</td>
                    <td className="px-6 py-4 text-slate-900 text-right font-bold not-italic font-sans text-xs italic">${(item.stock * item.costPerUnit).toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-slate-50/50 border-t border-slate-100 italic text-center">
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                Load Global Supply Chain Telemetry
            </button>
        </div>
      </div>
    </div>
  );
};
