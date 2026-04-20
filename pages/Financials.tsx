import React, { useState } from 'react';
import { COST_CENTERS, PROPERTIES, LEASES } from '../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Banknote, Database, Activity, TrendingUp, DollarSign, ArrowUpRight, Filter, Download, Terminal } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

const COLORS = ['#2563EB', '#E2E8F0'];

export const Financials: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cost-centers');
  
  const totalBudget = COST_CENTERS.reduce((acc, cc) => acc + cc.budget, 0);
  const totalSpent = COST_CENTERS.reduce((acc, cc) => acc + cc.spent, 0);

  const budgetData = [
    { name: 'Spent', value: totalSpent },
    { name: 'Remaining', value: Math.max(0, totalBudget - totalSpent) }
  ];

  const propertyNOIData = PROPERTIES.map(p => ({ 
    name: p.id, 
    noi: p.noi / 1000000 
  }));

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Financial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Banknote size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Command Finance Operations</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Budgetary Intelligence</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Auth: FINANCE-EX-002</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button className="btn-pro-secondary flex items-center gap-2">
                <Download size={14} /> Fiscal Export
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Terminal size={14} /> New Allocation
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Budget Hub Card */}
        <div className="pro-card p-5 flex items-center gap-6">
          <div className="w-20 h-20 shrink-0">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie 
                    data={budgetData} 
                    innerRadius={25} 
                    outerRadius={35} 
                    stroke="none"
                    dataKey="value"
                 >
                   {budgetData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
               </PieChart>
             </ResponsiveContainer>
          </div>
          <div>
             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Total Ops Budget</span>
             <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">${(totalBudget/1000000).toFixed(1)}M</p>
             <div className="flex items-center gap-2 mt-3">
               <div className={`w-1.5 h-1.5 rounded-full ${totalSpent > totalBudget ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
               <span className={`text-[10px] font-bold uppercase tracking-wider ${totalSpent > totalBudget ? 'text-red-600' : 'text-emerald-600'}`}>
                 {((totalSpent/totalBudget)*100).toFixed(1)}% Utilized
               </span>
             </div>
          </div>
        </div>

        {/* Portfolio NOI Card */}
        <div className="pro-card p-5">
           <div className="flex justify-between items-start mb-6">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Portfolio NOI (YTD)</span>
              <TrendingUp size={14} className="text-emerald-500" />
           </div>
           <p className="text-3xl font-black font-mono tracking-tighter text-slate-900 leading-none">
             ${(PROPERTIES.reduce((acc, p) => acc + p.noi, 0)/1000000).toFixed(2)}M
           </p>
           <p className="text-[9px] font-bold text-slate-400 uppercase mt-4 pt-4 border-t border-slate-50 flex items-center gap-1.5">
             <Activity size={10} className="text-blue-500" /> +8.4% Variance vs Benchmark
           </p>
        </div>

        {/* Short Term Rent Card */}
        <div className="pro-card p-5">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Upcoming Rent (30d)</span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded cursor-pointer hover:bg-blue-100 transition-colors">T-Minus 30</span>
           </div>
           <p className="text-3xl font-black font-mono tracking-tighter text-slate-900 leading-none">
             ${LEASES.filter(l=>l.status === 'Active').reduce((acc, l) => acc + l.monthlyRent, 0).toLocaleString()}
           </p>
           <p className="text-[9px] font-bold text-slate-400 uppercase mt-4 pt-4 border-t border-slate-50">
             Strategic Inflow Projection
           </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* NOI Distribution Chart */}
        <div className="col-span-12 lg:col-span-7 pro-card">
           <div className="pro-card-header bg-slate-50/50">
              <div className="flex items-center gap-2">
                  <Database size={14} className="text-blue-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Net Operating Income Matrix</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2.5 h-1 bg-blue-500 rounded-px" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">NOI Contribution ($M)</span>
              </div>
           </div>
           <div className="h-[350px] p-6 pt-10">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={propertyNOIData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fontSize: 9, fill: '#94A3B8', fontWeight: 700}}
                       dy={10}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fontSize: 9, fill: '#94A3B8', fontWeight: 700}}
                    />
                    <Tooltip 
                       cursor={{fill: 'rgba(241, 245, 249, 0.5)'}}
                       contentStyle={{backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="noi" fill="#2563EB" radius={[2, 2, 0, 0]} barSize={24} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Cost Centers Ledger */}
        <div className="col-span-12 lg:col-span-5 pro-card overflow-hidden">
           <div className="pro-card-header">
              <div className="flex items-center gap-2">
                  <Filter size={14} className="text-slate-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Cost Center Ledger</span>
              </div>
              <button className="text-[9px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Full Audit</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                       <th className="px-5 py-3 data-label">Fiscal Entity</th>
                       <th className="px-5 py-3 data-label text-right">Utilization %</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 italic font-mono">
                    {COST_CENTERS.map(cc => {
                       const utilization = (cc.spent / cc.budget) * 100;
                       return (
                          <tr key={cc.id} className="hover:bg-slate-50 transition-colors group">
                             <td className="px-5 py-4 min-w-[200px]">
                                <div className="flex flex-col">
                                   <span className="text-[12px] font-bold text-slate-900 not-italic uppercase tracking-tight">{cc.name}</span>
                                   <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter not-italic">Custodian: {cc.owner}</span>
                                </div>
                             </td>
                             <td className="px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-3">
                                   <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                                      <div 
                                         className={`h-full ${utilization > 100 ? 'bg-red-500' : 'bg-blue-500'}`} 
                                         style={{width: `${Math.min(utilization, 100)}%`}} 
                                      />
                                   </div>
                                   <span className={`text-[11px] font-bold not-italic font-mono ${utilization > 100 ? 'text-red-600' : 'text-slate-900'}`}>
                                      {utilization.toFixed(1)}%
                                   </span>
                                </div>
                             </td>
                          </tr>
                       );
                    })}
                 </tbody>
              </table>
           </div>
           <div className="p-4 bg-slate-50/50 border-t border-slate-100 italic text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aggregate fiscal coherence established</span>
           </div>
        </div>
      </div>
    </div>
  );
};
