import React from 'react';
import { FileClock, Plus, AlertTriangle, Calendar, FileText, Search, Database, ArrowUpRight, ArrowRight, LayoutDashboard, Terminal, Info } from 'lucide-react';
import { LEASES, PROPERTIES, LEASE_CLAUSES } from '../services/mockData';
import { StatusBadge } from '../components/StatusBadge';

export const LeaseAdmin: React.FC = () => {
  const expiringSoon = LEASES.filter(l => l.status === 'Expiring Soon').length;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Lease Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <FileClock size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Contractual Abstraction Terminal</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Lease & Obligation Ledger</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Active Contracts: {LEASES.length}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search Lease / Tenant / RPUID..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Register Lease
            </button>
        </div>
      </div>

      {/* Contractual KPI Buffer */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         {[
            { label: 'Active Leases', value: LEASES.filter(l => l.status === 'Active').length, sub: 'Strategic Tenants' },
            { label: 'Expiring (90 Days)', value: expiringSoon, sub: 'Critical Triage Window', color: expiringSoon > 0 ? 'text-amber-600' : 'text-slate-900' },
            { label: 'Market Yield Δ', value: '$32.50', sub: 'Average Rent / SF', mono: true }
         ].map((kpi, i) => (
            <div key={i} className="pro-card p-5 group transition-all">
                <p className="data-label mb-1">{kpi.label}</p>
                <div className="flex items-end justify-between">
                    <p className={`text-2xl font-black font-mono tracking-tighter leading-none ${kpi.color || 'text-slate-900'}`}>{kpi.value}</p>
                    <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4 pt-4 border-t border-slate-50">{kpi.sub}</p>
            </div>
         ))}
      </div>
      
      {/* Main Lease Portfolio Terminal */}
      <div className="pro-card overflow-hidden">
        <div className="pro-card-header bg-slate-50/50">
            <div className="flex items-center gap-2">
                <Database size={14} className="text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Unified Portfolio Abstraction</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">Auth: LEASE-ADM-GLOBAL</span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-5 py-3 data-label">Tenant Profile</th>
                        <th className="px-5 py-3 data-label">Maturity Window</th>
                        <th className="px-5 py-3 data-label">Critical Date Buffer</th>
                        <th className="px-5 py-3 data-label text-right">Inflow Rate (Monthly)</th>
                        <th className="px-5 py-3 data-label text-right">Identifier</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 italic font-mono">
                    {LEASES.map(lease => {
                        const property = PROPERTIES.find(p => p.id === lease.propertyId);
                        return (
                            <tr key={lease.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                                <td className="px-5 py-4 min-w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-slate-900 not-italic uppercase tracking-tight">{lease.tenantName}</span>
                                        <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-tighter not-italic truncate max-w-[150px]">{property?.name}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-bold text-slate-700 not-italic uppercase tracking-tight">END: {lease.endDate}</span>
                                        <StatusBadge status={lease.status} />
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        {lease.status === 'Expiring Soon' && <AlertTriangle size={12} className="text-amber-500" />}
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold not-italic text-slate-500 uppercase tracking-widest">{lease.criticalDates[0].name}</span>
                                            <span className="text-[10px] font-mono italic">{lease.criticalDates[0].date}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <span className="text-[11px] font-bold text-slate-900 not-italic font-mono">
                                        ${lease.monthlyRent.toLocaleString()}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 text-slate-300">
                                        <span className="text-[10px] uppercase tracking-tighter font-mono mr-2">{lease.id}</span>
                                        <ArrowRight size={14} className="hover:text-blue-500 transition-colors" />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Date Intelligence */}
        <div className="pro-card">
            <div className="pro-card-header">
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Critical Milestone Buffer</span>
                </div>
                <Terminal size={14} className="text-slate-300" />
            </div>
            <div className="p-6">
                <div className="h-48 bg-slate-50 border border-slate-100 rounded border-dashed flex flex-col items-center justify-center text-slate-300 gap-3">
                    <Calendar size={24} className="opacity-20" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Initialize Lifecycle Calendar</span>
                </div>
            </div>
        </div>

        {/* Legal Clause Repository */}
        <div className="pro-card">
            <div className="pro-card-header">
                <div className="flex items-center gap-2">
                    <FileText size={14} className="text-emerald-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Legal Clause Repository</span>
                </div>
                <Info size={14} className="text-slate-300 cursor-help" />
            </div>
            <div className="p-4 space-y-2">
                {LEASE_CLAUSES.slice(0,4).map(clause => (
                    <div key={clause.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded hover:border-blue-200 transition-colors cursor-pointer group flex justify-between items-center">
                        <div>
                            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">{clause.name}</span>
                            <p className="text-[9px] font-mono text-slate-400 mt-0.5">CONTRACT VECTOR: {clause.leaseId}</p>
                        </div>
                        <ArrowUpRight size={12} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
                    </div>
                ))}
            </div>
            <div className="p-3 border-t border-slate-50 text-center">
               <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Full Clause Taxonomy</button>
            </div>
        </div>
      </div>
    </div>
  );
};
