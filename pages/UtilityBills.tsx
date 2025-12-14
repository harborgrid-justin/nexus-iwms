import React from 'react';
import { FileText, BarChart, Droplet, Zap, Plus, Filter } from 'lucide-react';
import { UTILITY_BILLS, PROPERTIES } from '../services/mockData';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Legend } from 'recharts';

export const UtilityBills: React.FC = () => {

  const data = UTILITY_BILLS.reduce((acc, bill) => {
    const month = new Date(bill.serviceDate + '-02').toLocaleString('default', { month: 'short' });
    const existing = acc.find(item => item.name === month);
    if(existing) {
        existing[bill.utility] = bill.cost;
    } else {
        acc.push({ name: month, [bill.utility]: bill.cost });
    }
    return acc;
  }, [] as any[]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Utility Bill Management</h1>
          <p className="text-slate-500 mt-1">Track, analyze, and manage utility invoices and costs.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Upload Bill
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Utility Spend by Type</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} stackOffset="sign">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={val => `$${val/1000}k`}/>
              <Tooltip formatter={val => `$${(val as number).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="Electric" fill="#3b82f6" stackId="a" />
              <Bar dataKey="Water" fill="#06b6d4" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Invoice Log</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Property</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Utility Type</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Service Period</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Consumption</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {UTILITY_BILLS.map(bill => {
              const property = PROPERTIES.find(p => p.id === bill.propertyId);
              return (
                <tr key={bill.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{property?.name}</td>
                  <td className="px-6 py-4 text-slate-600">{bill.utility}</td>
                  <td className="px-6 py-4 text-slate-600">{bill.serviceDate}</td>
                  <td className="px-6 py-4 text-slate-600 text-right font-mono">{bill.consumption.toLocaleString()} {bill.unit}</td>
                  <td className="px-6 py-4 text-slate-600 text-right font-mono">${bill.cost.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
