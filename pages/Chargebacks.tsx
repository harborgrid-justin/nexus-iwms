import React from 'react';
import { ArrowRightLeft, Plus, Sliders } from 'lucide-react';
import { CHARGEBACKS, COST_CENTERS } from '../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899'];

export const Chargebacks: React.FC = () => {

  const data = [
    { name: 'Space', value: CHARGEBACKS.filter(c => c.type === 'Space').reduce((acc, c) => acc + c.amount, 0) },
    { name: 'Service', value: CHARGEBACKS.filter(c => c.type === 'Service').reduce((acc, c) => acc + c.amount, 0) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Chargebacks & Cost Allocation</h1>
          <p className="text-slate-500 mt-1">Allocate shared costs to internal departments and cost centers.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> New Chargeback
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Chargeback Ledger</h2></div>
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                    <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">From</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">To</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Description</th>
                    <th className="px-6 py-4 font-semibold text-slate-700 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {CHARGEBACKS.map(cb => {
                    const from = COST_CENTERS.find(cc => cc.id === cb.fromCostCenterId);
                    const to = COST_CENTERS.find(cc => cc.id === cb.toCostCenterId);
                    return (
                        <tr key={cb.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 text-slate-600">{cb.date}</td>
                        <td className="px-6 py-4 text-slate-600">{from?.name}</td>
                        <td className="px-6 py-4 text-slate-600">{to?.name}</td>
                        <td className="px-6 py-4 text-slate-800 font-medium">{cb.description}</td>
                        <td className="px-6 py-4 text-slate-600 text-right font-mono">${cb.amount.toLocaleString()}</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Chargebacks by Type</h3>
           <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                             {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(val) => `$${(val as number).toLocaleString()}`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
          <div className="mt-6">
            <h3 className="text-lg font-bold text-slate-900">Allocation Rules</h3>
            <div className="mt-2 p-4 bg-slate-50 border rounded-lg">
                <p className="text-sm font-semibold">Space Allocation Rule</p>
                <p className="text-xs text-slate-500">Facility costs are allocated monthly to department cost centers based on occupied square footage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};