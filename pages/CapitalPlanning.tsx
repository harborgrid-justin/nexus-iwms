import React from 'react';
import { Presentation, Plus, Sliders, TrendingUp } from 'lucide-react';
import { CAPITAL_PLAN, PROPERTIES, UNFUNDED_REQUIREMENTS } from '../services/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const CapitalPlanning: React.FC = () => {

  const dataByYear = CAPITAL_PLAN.reduce((acc, item) => {
    const year = `FY${item.fiscalYear}`;
    if (!acc[year]) {
      acc[year] = { name: year, Funded: 0, Unfunded: 0 };
    }
    if (item.fundingStatus === 'Funded' || item.fundingStatus === 'Partial') {
      acc[year].Funded += item.projectedCost;
    } else {
      acc[year].Unfunded += item.projectedCost;
    }
    return acc;
  }, {} as any);

  const chartData = Object.values(dataByYear);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Capital Planning & Forecasting</h1>
          <p className="text-slate-500 mt-1">Develop and manage long-range capital investment plans.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
            <Sliders size={16} /> Scenario Modeling
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">5-Year Capital Forecast (by Funding Status)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={val => `$${val / 1000000}M`} />
              <Tooltip formatter={val => `$${(val as number).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="Funded" stackId="a" fill="#3b82f6" />
              <Bar dataKey="Unfunded" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Capital Plan Details</h2>
            <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-xs shadow-sm">
              <Plus size={14} /> Add Project
            </button>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-700">Project</th>
                <th className="px-6 py-3 font-semibold text-slate-700">FY</th>
                <th className="px-6 py-3 font-semibold text-slate-700 text-right">Cost</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CAPITAL_PLAN.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-3 font-medium text-slate-900">{item.projectName}</td>
                  <td className="px-6 py-3 text-slate-600">{item.fiscalYear}</td>
                  <td className="px-6 py-3 text-slate-600 text-right font-mono">${(item.projectedCost/1000000).toFixed(2)}M</td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.fundingStatus === 'Funded' ? 'bg-green-100 text-green-800' : item.fundingStatus === 'Unfunded' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>{item.fundingStatus}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Project Prioritization Scorecard</h3>
          <p className="text-sm text-slate-500 mb-4">Projects are scored based on mission impact, risk reduction, and FCI improvement.</p>
          <div className="space-y-3">
            {UNFUNDED_REQUIREMENTS.map((ufr, index) => {
              const score = 95 - index*7;
              return (
              <div key={ufr.id} className="p-3 bg-slate-50 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-sm">{ufr.title}</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className={score > 80 ? 'text-green-500' : 'text-amber-500'} />
                    <span className="font-bold text-lg text-slate-900">{score}</span>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};