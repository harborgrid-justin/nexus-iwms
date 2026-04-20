import React from 'react';
import { ASSETS, PROPERTIES, CONDITION_ASSESSMENTS, PM_SCHEDULES } from '../services/mockData';
import { Filter, Search, Plus, Calendar, Database, Activity, LayoutDashboard, Terminal, ArrowUpRight, ArrowRight, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AssetRegistry: React.FC = () => {
  const navigate = useNavigate();
  const getConditionColor = (condition: number) => {
    if (condition > 80) return { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: 'bg-emerald-500' };
    if (condition > 50) return { bg: 'bg-amber-50', text: 'text-amber-600', bar: 'bg-amber-500' };
    return { bg: 'bg-red-50', text: 'text-red-600', bar: 'bg-red-500' };
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Asset Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Database size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Global Resource Ledger</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Asset Inventory</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Indexed Nodes: {ASSETS.length}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search Serial / Asset / Node..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5">
                <Filter size={14} />
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Register Node
            </button>
        </div>
      </div>
      
      {/* High-Density Asset Registry Terminal */}
      <div className="pro-card overflow-hidden">
        <div className="pro-card-header bg-slate-50/50">
            <div className="flex items-center gap-2">
                <LayoutDashboard size={14} className="text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Operational Resource Registry</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Encrypted Ledger Access</span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-5 py-3 data-label">Node Profile</th>
                        <th className="px-5 py-3 data-label">Spatial Vector</th>
                        <th className="px-5 py-3 data-label">Condition Index</th>
                        <th className="px-5 py-3 data-label">Protocol: PM</th>
                        <th className="px-5 py-3 data-label text-right">Maint. Cost (YTD)</th>
                        <th className="px-5 py-3 data-label text-right">Audit</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 italic font-mono">
                    {ASSETS.map(asset => {
                        const latestAssessment = CONDITION_ASSESSMENTS.find(ca => ca.assetId === asset.id);
                        const nextPm = PM_SCHEDULES.find(pm => pm.assetId === asset.id && pm.status !== 'Completed');
                        const colors = getConditionColor(latestAssessment?.conditionScore || asset.condition);
                        const property = PROPERTIES.find(p => p.id === asset.propertyId);
                        return (
                            <tr key={asset.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => navigate(`/assets/${asset.id}`)}>
                                <td className="px-5 py-4 min-w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-slate-900 not-italic uppercase tracking-tight">{asset.name}</span>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter not-italic bg-slate-100 px-1 rounded-sm">S/N</span>
                                            <span className="text-[10px] text-slate-500 font-mono italic tracking-tighter uppercase">{asset.serialNumber}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex flex-col opacity-70">
                                        <span className="text-[11px] font-bold text-slate-700 not-italic uppercase tracking-tight">{asset.location}</span>
                                        <span className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-tighter not-italic truncate max-w-[120px]">{property?.name}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden shrink-0">
                                            <div className={`h-full ${colors.bar}`} style={{ width: `${latestAssessment?.conditionScore || asset.condition}%` }} />
                                        </div>
                                        <span className={`text-[10px] font-bold not-italic font-mono ${colors.text}`}>
                                            {latestAssessment?.conditionScore || asset.condition}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    {nextPm ? (
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Calendar size={12} className="shrink-0" />
                                            <span className="text-[10px] font-bold not-italic font-mono">{nextPm.nextDueDate}</span>
                                        </div>
                                    ) : (
                                        <span className="text-[9px] font-bold text-slate-300 uppercase not-italic italic">N/A</span>
                                    )}
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <span className="text-[11px] font-bold text-slate-900 not-italic font-mono">
                                        ${asset.maintenanceCostYTD?.toLocaleString()}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 text-slate-300">
                                        <Settings size={14} className="hover:text-blue-500 transition-colors" />
                                        <ArrowRight size={14} className="hover:text-blue-500 transition-colors" />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 italic text-center">
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors flex items-center gap-2 mx-auto">
                <Activity size={10} className="text-blue-500" /> Initialize Full Resource Audit <ArrowUpRight size={12} />
            </button>
        </div>
      </div>
    </div>
  );
};
