import React, { useState } from 'react';
import { COST_CENTERS, PROPERTIES, LEASES } from '../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FileText, Banknote, ChevronsRight } from 'lucide-react';

const COLORS = ['#3b82f6', '#ef4444'];

export const Financials: React.FC = () => {
  const [activeTab, setActiveTab] = useState('cost-centers');
  
  const totalBudget = COST_CENTERS.reduce((acc, cc) => acc + cc.budget, 0);
  const totalSpent = COST_CENTERS.reduce((acc, cc) => acc + cc.spent, 0);

  const budgetData = [
    { name: 'Spent', value: totalSpent },
    { name: 'Remaining', value: totalBudget - totalSpent }
  ];

  const propertyNOIData = PROPERTIES.map(p => ({ name: p.id, noi: p.noi / 1000000 }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Financials</h1>
        <p className="text-slate-500 mt-1">Manage cost centers, budgets, and portfolio financial performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="w-24 h-24"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={budgetData} innerRadius={30} outerRadius={40} dataKey="value" paddingAngle={3}>{budgetData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip formatter={(value) => `$${value.toLocaleString()}`} /></PieChart></ResponsiveContainer></div>
          <div><div className="text-sm text-slate-500">Total Ops Budget</div><div className="text-2xl font-bold">${(totalBudget/1000000).toFixed(1)}M</div><div className={`text-sm font-medium ${totalSpent > totalBudget ? 'text-red-600' : 'text-green-600'}`}>{((totalSpent/totalBudget)*100).toFixed(1)}% Utilized</div></div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Portfolio NOI (YTD)</div><div className="text-3xl font-bold mt-2">${(PROPERTIES.reduce((acc, p) => acc + p.noi, 0)/1000000).toFixed(1)}M</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Upcoming Rent (30 days)</div><div className="text-3xl font-bold mt-2">${LEASES.filter(l=>l.status === 'Active').reduce((acc, l) => acc + l.monthlyRent, 0).toLocaleString()}</div></div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Portfolio Net Operating Income (NOI)</h2></div>
        <div className="h-64 p-4"><ResponsiveContainer width="100%" height="100%"><BarChart data={propertyNOIData}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" tick={{fontSize: 12}} /><YAxis tick={{fontSize: 12}} tickFormatter={(val) => `$${val}M`} /><Tooltip formatter={(val) => `$${val}M`} /><Bar dataKey="noi" fill="#3b82f6" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Cost Centers</h2></div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50"><tr className="border-b"><th className="px-6 py-3 font-semibold text-slate-600">Name</th><th className="px-6 py-3 font-semibold text-slate-600">Owner</th><th className="px-6 py-3 font-semibold text-slate-600">Budget Utilization</th></tr></thead>
          <tbody>{COST_CENTERS.map(cc => {
            const utilization = (cc.spent / cc.budget) * 100;
            return(<tr key={cc.id} className="border-b last:border-0 hover:bg-slate-50/50">
              <td className="px-6 py-4 font-medium text-slate-800">{cc.name}</td>
              <td className="px-6 py-4 text-slate-600">{cc.owner}</td>
              <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="w-full bg-slate-200 h-2 rounded-full"><div className={`h-2 rounded-full ${utilization > 100 ? 'bg-red-500' : 'bg-blue-500'}`} style={{width: `${Math.min(utilization, 100)}%`}}></div></div><span className={`font-mono text-xs w-16 text-right ${utilization > 100 ? 'text-red-600' : 'text-slate-600'}`}>{utilization.toFixed(1)}%</span></div></td>
            </tr>)
          })}</tbody>
        </table>
      </div>

    </div>
  );
};
