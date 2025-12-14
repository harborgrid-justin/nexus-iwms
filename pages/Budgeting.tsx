import React from 'react';
import { Plus, Download, Filter, ChevronsUpDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COST_CENTERS } from '../services/mockData';

export const Budgeting: React.FC = () => {

  const data = COST_CENTERS.map(cc => ({
    name: cc.name.replace('Facility Operations', '').replace('R&D Facilities', '').replace('Maintenance', '').trim(),
    Budget: cc.budget,
    Spent: cc.spent,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Budgeting & Forecasting</h1>
          <p className="text-slate-500 mt-1">Create, track, and manage operational and capital budgets.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Create New Budget
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Cost Center Performance</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value as number / 1000)}k`} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => `$${(value as number).toLocaleString()}`}
              />
              <Legend />
              <Bar dataKey="Budget" fill="#a5b4fc" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Spent" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Budget Line Items - FY2024 Operations</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Cost Center</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Budget</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Spent</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Remaining</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Utilization</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {COST_CENTERS.map(cc => {
              const remaining = cc.budget - cc.spent;
              const utilization = (cc.spent / cc.budget) * 100;
              return (
                <tr key={cc.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{cc.name}</td>
                  <td className="px-6 py-4 text-slate-600 text-right font-mono">${cc.budget.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-600 text-right font-mono">${cc.spent.toLocaleString()}</td>
                  <td className={`px-6 py-4 text-right font-mono ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>${remaining.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${utilization > 100 ? 'bg-red-500' : utilization > 90 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(utilization, 100)}%` }}></div>
                      </div>
                      <span className={`w-12 text-right font-mono text-xs ${utilization > 100 ? 'text-red-600' : 'text-slate-600'}`}>{utilization.toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
