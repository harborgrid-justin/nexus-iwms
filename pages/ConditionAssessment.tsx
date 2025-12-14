import React from 'react';
import { Activity, Thermometer, TrendingDown, TrendingUp } from 'lucide-react';
import { PROPERTIES, CONDITION_ASSESSMENTS, ASSETS } from '../services/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const ConditionAssessment: React.FC = () => {

  const getFciColor = (fci: number) => {
    if (fci > 90) return 'text-green-600';
    if (fci > 70) return 'text-blue-600';
    if (fci > 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const chartData = PROPERTIES.map(p => ({ name: p.id, FCI: p.fci }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Condition Assessment</h1>
        <p className="text-slate-500 mt-1">Evaluate facility and asset conditions to prioritize capital planning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3"><Thermometer className="text-blue-500" /><div className="text-slate-500 text-sm font-medium">Portfolio Average FCI</div></div>
            <div className="text-4xl font-bold text-slate-900 mt-2">77 <span className="text-lg">%</span></div>
        </div>
         <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3"><TrendingUp className="text-green-500" /><div className="text-slate-500 text-sm font-medium">Highest Rated Property</div></div>
            <div className="text-2xl font-bold text-slate-900 mt-2">Downtown Retail (95%)</div>
        </div>
         <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex items-center gap-3"><TrendingDown className="text-red-500" /><div className="text-slate-500 text-sm font-medium">Lowest Rated Property</div></div>
            <div className="text-2xl font-bold text-slate-900 mt-2">Satellite Office East (45%)</div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Facility Condition Index (FCI) by Property</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
              <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
              <Bar dataKey="FCI" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Recent Assessment Log</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Asset</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Assessor</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Condition Score</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {CONDITION_ASSESSMENTS.map(ca => {
              const asset = ASSETS.find(a => a.id === ca.assetId);
              return (
                <tr key={ca.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{asset?.name}</td>
                  <td className="px-6 py-4 text-slate-600">{ca.assessmentDate}</td>
                  <td className="px-6 py-4 text-slate-600">{ca.assessedBy}</td>
                  <td className={`px-6 py-4 font-bold text-lg ${getFciColor(ca.conditionScore)}`}>{ca.conditionScore}</td>
                  <td className="px-6 py-4 text-slate-600">{ca.recommendedAction}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
