import React from 'react';
import { ASSETS, PROPERTIES, CONDITION_ASSESSMENTS, PM_SCHEDULES } from '../services/mockData';
import { Filter, Search, Plus, HardHat, Calendar, BookCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AssetRegistry: React.FC = () => {
  const navigate = useNavigate();
  const getConditionColor = (condition: number) => {
    if (condition > 80) return { bg: 'bg-green-100', text: 'text-green-800', bar: 'bg-green-500' };
    if (condition > 50) return { bg: 'bg-amber-100', text: 'text-amber-800', bar: 'bg-amber-500' };
    return { bg: 'bg-red-100', text: 'text-red-800', bar: 'bg-red-500' };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Asset Registry</h1>
          <p className="text-slate-500 mt-1">Manage all physical assets across the portfolio.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search by name, S/N, location..." className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white"/>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Add Asset
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Asset Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Location</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Condition</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Next PM</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Maint. Cost (YTD)</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ASSETS.map(asset => {
              const latestAssessment = CONDITION_ASSESSMENTS.find(ca => ca.assetId === asset.id);
              const nextPm = PM_SCHEDULES.find(pm => pm.assetId === asset.id && pm.status !== 'Completed');
              const colors = getConditionColor(latestAssessment?.conditionScore || asset.condition);
              const property = PROPERTIES.find(p => p.id === asset.propertyId);
              return (
                <tr key={asset.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{asset.name}</div>
                    <div className="text-xs text-slate-500">S/N: {asset.serialNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-700">{asset.location}</div>
                    <div className="text-xs text-slate-500">{property?.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => navigate('/condition-assessment')} className="flex items-center gap-2 group">
                      <div className="w-24 h-1.5 bg-slate-200 rounded-full">
                        <div className={`h-1.5 rounded-full ${colors.bar}`} style={{ width: `${latestAssessment?.conditionScore || asset.condition}%` }}></div>
                      </div>
                      <span className={`font-mono text-xs w-10 text-right ${colors.text} group-hover:underline`}>{latestAssessment?.conditionScore || asset.condition}%</span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {nextPm ? (
                      <button onClick={() => navigate('/preventive-maintenance')} className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 group">
                        <Calendar size={14} className="group-hover:text-blue-600" />
                        <span className="group-hover:underline">{nextPm.nextDueDate}</span>
                      </button>
                    ) : (
                      <span className="text-slate-400">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-right font-mono">${asset.maintenanceCostYTD?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="font-medium text-blue-600 hover:text-blue-800">Details</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};