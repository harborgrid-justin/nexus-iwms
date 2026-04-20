import React from 'react';
import { Calendar, AlertTriangle, CheckCircle2, History, Plus, Filter, Clock, Database, Terminal, Settings, ArrowRight, ShieldCheck, Activity, Search, LayoutDashboard, Info, ArrowUpRight } from 'lucide-react';
import { PM_SCHEDULES, ASSETS } from '../services/mockData';
import { StatusBadge } from '../components/StatusBadge';

export const PreventiveMaintenance: React.FC = () => {
    
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Scheduled': return 'text-blue-600 border-blue-200 bg-blue-50';
      case 'Overdue': return 'text-red-600 border-red-200 bg-red-50 animate-pulse';
      case 'Completed': return 'text-emerald-600 border-emerald-200 bg-emerald-50';
      default: return 'text-slate-500 border-slate-200 bg-slate-50';
    }
  };

  const overdue = PM_SCHEDULES.filter(p => p.status === 'Overdue').length;
  const upcoming = PM_SCHEDULES.filter(p => {
    const dueDate = new Date(p.nextDueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  }).length;


  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Maintenance Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Settings size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Preventive Protocol & Asset Lifecycle Terminal</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Maintenance Logistics & Governance</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Protocol: PM-LOG-CORE-Alpha</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search Protocol / Task / ID..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-secondary flex items-center gap-2">
                <Filter size={14} /> Filter
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> New Protocol
            </button>
        </div>
      </div>
      
      {/* Tactical KPI Buffer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         {[
            { label: 'Critical Overdue Protocols', value: overdue, icon: AlertTriangle, color: 'text-red-500', trend: 'CRITICAL' },
            { label: 'Upcoming (30d Window)', value: upcoming, icon: Calendar, color: 'text-amber-500', trend: 'STABLE' },
            { label: 'Lifecycle Integrity (YTD)', value: '92%', icon: CheckCircle2, color: 'text-emerald-500', trend: 'OPTIMAL' }
         ].map((stat, i) => (
            <div key={i} className="pro-card p-5 group transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
                        <stat.icon size={16} />
                    </div>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm border ${stat.color} border-current opacity-70 tracking-widest`}>
                        {stat.trend}
                    </span>
                </div>
                <p className="data-label mb-1">{stat.label}</p>
                <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{stat.value}</p>
            </div>
         ))}
      </div>

      <div className="pro-card overflow-hidden">
        <div className="pro-card-header bg-slate-50/50">
            <div className="flex items-center gap-2">
                <LayoutDashboard size={14} className="text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Enterprise Preventive Protocol Stream</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">Sync: SECURE-L6</span>
        </div>
        
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100 italic">
                <th className="px-6 py-3 data-label">Task / Asset Vector</th>
                <th className="px-6 py-3 data-label">Temporal Frequency</th>
                <th className="px-6 py-3 data-label">Target Due Window</th>
                <th className="px-6 py-3 data-label">Last Lifecycle Action</th>
                <th className="px-6 py-3 data-label text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 italic font-mono uppercase tracking-tighter">
              {PM_SCHEDULES.map(pm => {
                const asset = ASSETS.find(a => a.id === pm.assetId);
                return (
                  <tr key={pm.id} className="hover:bg-slate-50 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-l-blue-600">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-950 not-italic uppercase tracking-tight group-hover:text-blue-600 transition-colors">{pm.task}</span>
                        <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-tighter not-italic truncate">{asset?.name} <span className="opacity-40 italic ml-1">{asset?.id}</span></span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-500">
                            <History size={12} className="opacity-40" />
                            <span className="text-[10px] font-bold opacity-70">{pm.frequency}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <Clock size={12} className="text-slate-300" />
                            <span className="text-[11px] font-black text-slate-900 not-italic uppercase italic">{pm.nextDueDate}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-slate-400 opacity-60">{pm.lastCompletedDate || 'INITIAL-ARCHIVE'}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-[8px] font-black uppercase tracking-widest border shadow-sm not-italic ${getStatusStyle(pm.status)}`}>
                          {pm.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-slate-950 text-white italic text-center">
            <button className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-blue-400 transition-colors flex items-center gap-2 mx-auto italic">
                <ShieldCheck size={12} className="text-emerald-500" /> Commit Protocol Integrity Log <ArrowUpRight size={12} />
            </button>
        </div>
      </div>

      {/* Actionable Information Bubble */}
      <div className="pro-card p-4 bg-slate-50 border-slate-200 flex items-center justify-between gap-6 group">
          <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-600/10 text-blue-600 rounded-sm">
                  <Activity size={16} />
              </div>
              <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Fleet Maintenance Telemetry</p>
                  <p className="text-[11px] font-bold text-slate-700 italic uppercase">System health optimal. No critical failures detected in global nodes.</p>
              </div>
          </div>
          <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
              <ArrowRight size={18} />
          </button>
      </div>
    </div>
  );
};
