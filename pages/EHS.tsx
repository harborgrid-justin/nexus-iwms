import React from 'react';
import { SAFETY_INCIDENTS, PROPERTIES } from '../services/mockData';
import { AlertOctagon, HeartPulse, ShieldCheck, BarChart, Terminal, Database, Activity, ShieldAlert, ArrowUpRight, Plus, Search, Filter } from 'lucide-react';

const KpiCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="pro-card p-5 group transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
        <Icon size={16} />
      </div>
      {trend && (
        <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 uppercase">
          {trend}
        </span>
      )}
    </div>
    <p className="data-label mb-1">{title}</p>
    <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{value}</p>
    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Security Protocol</span>
        <ArrowUpRight size={12} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
    </div>
  </div>
);

export const EHS: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Governance Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <ShieldAlert size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Biological & Hazard Governance</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-red-600">Health, Safety & Environmental Integrity Console</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Audit Cycle: Q3-DELTA</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search Incident Logs..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-primary !bg-red-600 !hover:bg-red-700 flex items-center gap-2">
                <Plus size={14} /> Log Incident
            </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Active Hazards" value={SAFETY_INCIDENTS.filter(i => i.status !== 'Closed').length} icon={AlertOctagon} trend="ALERT" />
        <KpiCard title="Safe Mission Window" value="144 Days" icon={HeartPulse} trend="+12D" />
        <KpiCard title="Protocol Integrity" value="98%" icon={ShieldCheck} trend="OPTIMAL" />
        <KpiCard title="Evaluations Due" value="02" icon={BarChart} trend="PENDING" />
      </div>

      <div className="pro-card overflow-hidden">
        <div className="pro-card-header">
            <div className="flex items-center gap-2">
                <Terminal size={14} className="text-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Mission Incident Triage Ledger</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600"><Filter size={14}/></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm italic font-mono">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 data-label">Incident Protocol</th>
                <th className="px-6 py-4 data-label">Operational Site</th>
                <th className="px-6 py-4 data-label">Temporal Stamp</th>
                <th className="px-6 py-4 data-label">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SAFETY_INCIDENTS.map(si => (
                <tr key={si.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-slate-900 not-italic uppercase tracking-tight group-hover:text-red-600 transition-colors">{si.type}</span>
                      <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter not-italic">Ref: {si.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 not-italic font-sans text-xs">
                    {PROPERTIES.find(p => p.id === si.propertyId)?.name}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs font-bold uppercase tracking-widest">{si.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest border border-slate-200 bg-slate-50 text-slate-400 group-hover:bg-white transition-colors`}>
                      {si.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-slate-50/50 border-t border-slate-100 italic text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aggregate safety clearance verified: 100% SECURE</span>
        </div>
      </div>
    </div>
  );
};
