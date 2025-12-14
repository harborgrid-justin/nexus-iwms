import React from 'react';
import { LocateFixed, Sliders, Layers, ShieldCheck, Plus } from 'lucide-react';
import { PROPERTIES, SPACE_DATA } from '../services/mockData';

export const StrategicPortfolio: React.FC = () => {

  const totalSqFt = PROPERTIES.reduce((acc, p) => acc + p.sizeSqFt, 0);
  const totalValue = PROPERTIES.reduce((acc, p) => acc + p.marketValue, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Strategic Portfolio Planning</h1>
          <p className="text-slate-500 mt-1">Analyze portfolio performance and model future-state scenarios.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> New Scenario
          </button>
        </div>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Total Properties</div><div className="text-3xl font-bold mt-2">{PROPERTIES.length}</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Total Area</div><div className="text-3xl font-bold mt-2">{(totalSqFt/1000000).toFixed(2)}M sqft</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Total Market Value</div><div className="text-3xl font-bold mt-2">${(totalValue/1000000).toFixed(1)}M</div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Sliders/> Scenario Analysis: "Consolidate P005"</h3>
          <p className="text-sm text-slate-600 mb-4">Model the financial and operational impact of strategic portfolio changes. Compare scenarios to make data-driven decisions.</p>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 border rounded-lg">
                <p className="font-semibold text-slate-800">Projected Annual Savings</p>
                <p className="text-2xl font-bold text-green-600">$1.2M</p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-lg">
                <p className="font-semibold text-slate-800">One-Time Relocation Cost</p>
                <p className="text-2xl font-bold text-red-600">$450,000</p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-lg">
                <p className="font-semibold text-slate-800">Impact on Portfolio Occupancy</p>
                <p className="text-2xl font-bold text-green-600">+8%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Layers/> Stacking Plan: Nexus HQ</h3>
          <div className="space-y-2">
            {SPACE_DATA.map(floor => (
                <div key={floor.floor} className="flex items-center gap-2">
                    <div className="w-16 text-sm font-semibold text-slate-600">{floor.floor}</div>
                    <div className="flex-1 bg-slate-100 rounded p-2 flex items-center">
                        <div className="h-6 bg-blue-500 rounded-l" style={{width: `${floor.utilization}%`}}></div>
                        <div className="h-6 bg-slate-200 rounded-r" style={{width: `${100-floor.utilization}%`}}></div>
                    </div>
                    <div className="w-24 text-xs text-slate-500">{floor.department}</div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};