import React, { useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Building, AlertTriangle, Zap, Wrench, ChevronDown, Terminal, Activity, ShieldCheck, Database, LayoutDashboard } from 'lucide-react';
import { SUSTAINABILITY_DATA, WORK_ORDERS, PROPERTIES, CAPITAL_PROJECTS, LEASES } from '../services/mockData';
import { useNavigate, Link } from 'react-router-dom';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ElementType;
  label: string;
  link?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, trend, icon: Icon, label, link }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => link && navigate(link)} 
      className={`pro-card p-5 group transition-all ${link ? 'cursor-pointer hover:border-blue-400' : ''}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
          <Icon size={16} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
            {change}
            {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          </div>
        )}
      </div>
      <p className="data-label mb-1">{title}</p>
      <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{value}</p>
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        {link && <ArrowUpRight size={12} className="text-slate-300 group-hover:text-blue-500 transition-colors" />}
      </div>
    </div>
  )
};

export const Dashboard: React.FC = () => {
  const activeWorkOrders = WORK_ORDERS.filter(wo => wo.status !== 'Completed').length;
  const portfolioValue = PROPERTIES.reduce((acc, curr) => acc + curr.marketValue, 0) / 1000000;
  const projectsAtRisk = CAPITAL_PROJECTS.filter(p => p.status === 'AtRisk').length;
  const expiringLease = LEASES.find(l => l.status === 'Expiring Soon');
  const overBudgetProject = CAPITAL_PROJECTS.find(p => p.spent > p.totalBudget);
  
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Executive Command Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-900 rounded text-white shadow-sm">
                <Terminal size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">EXECUTIVE COMMAND TERMINAL</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Strategic Portfolio Intelligence</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Session Active: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded p-0.5">
                <button className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white shadow-sm rounded text-slate-900">Live View</button>
                <button className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600">Historical</button>
            </div>
            <button className="btn-pro-secondary flex items-center gap-2">
                <Database size={14} /> Export XML
            </button>
        </div>
      </div>

      {/* Primary KPI Command Center */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <KpiCard 
          title="Portfolio Valuation" 
          value={`$${portfolioValue.toFixed(0)}M`} 
          change="+2.4%" 
          trend="up" 
          icon={DollarSign} 
          label="Market Weighted"
          link="/real-estate"
        />
        <KpiCard 
          title="Spatial Efficiency" 
          value="82.5%" 
          change="-1.2%" 
          trend="down" 
          icon={Building} 
          label="Gross Occupancy"
          link="/space"
        />
        <KpiCard 
          title="Ops Velocity" 
          value={activeWorkOrders} 
          change="+14%" 
          trend="up"
          icon={Activity} 
          label="Active Deployments"
          link="/operations"
        />
        <KpiCard 
          title="Energy Load" 
          value="1.2 GWh" 
          change="-5.0%" 
          trend="down"
          icon={Zap} 
          label="Rolling Annual"
          link="/sustainability"
        />
        <KpiCard 
          title="Critical Risk" 
          value={projectsAtRisk} 
          change="HIGH"
          trend="down"
          icon={ShieldCheck} 
          label="Governance Audit"
          link="/strategic-portfolio"
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Intelligence Stream */}
        <div className="col-span-12 lg:col-span-8 pro-card">
          <div className="pro-card-header bg-slate-50/50">
            <div className="flex items-center gap-2">
                <LayoutDashboard size={14} className="text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Global Consumption Matrix</span>
            </div>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-0.5 bg-blue-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Energy Load</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-0.5 bg-cyan-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hydraulic Flow</span>
                </div>
            </div>
          </div>
          <div className="h-[400px] p-6 pt-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SUSTAINABILITY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="dashboardGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.08}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 9, fill: '#94A3B8', fontWeight: 700}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 9, fill: '#94A3B8', fontWeight: 700}}
                />
                <Tooltip 
                  contentStyle={{backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="energyKWh" stroke="#2563EB" strokeWidth={1.5} fillOpacity={1} fill="url(#dashboardGrad)" />
                <Area type="monotone" dataKey="waterGal" stroke="#06B6D4" strokeWidth={1.5} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Alert Buffer */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="pro-card flex flex-col h-full">
            <div className="pro-card-header">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-red-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Critical Priority Buffer</span>
              </div>
              <span className="text-[10px] font-bold text-red-500 font-mono">3 ACTIVE</span>
            </div>
            
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {overBudgetProject && (
                <div className="p-4 hover:bg-red-50/30 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">Budget Variance</span>
                    <span className="text-[9px] font-mono text-slate-400">14:02Z</span>
                  </div>
                  <h4 className="text-[12px] font-bold text-slate-900 uppercase truncate">{overBudgetProject.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal italic font-mono">
                    System Alert: Variance detected at <span className="text-red-600">-${ (overBudgetProject.spent - overBudgetProject.totalBudget).toLocaleString() }</span>. 
                  </p>
                  <button className="mt-3 text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:underline">
                    Investigate Root <ArrowUpRight size={10} />
                  </button>
                </div>
              )}

              <div className="p-4 hover:bg-red-50/30 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">System Failure</span>
                  <span className="text-[9px] font-mono text-slate-400">13:44Z</span>
                </div>
                <h4 className="text-[12px] font-bold text-slate-900 uppercase truncate">HVAC CRITICAL: SERVER CLUSTER B</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal italic font-mono">
                  Ambient thermal threshold breached (&gt;24°C). Automatic suppression cooldown initialized.
                </p>
              </div>

              {expiringLease && (
                <div className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Lease Expiry</span>
                    <span className="text-[9px] font-mono text-slate-400">09:12Z</span>
                  </div>
                  <h4 className="text-[12px] font-bold text-slate-900 uppercase truncate">{expiringLease.tenantName}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal italic font-mono">
                    Legal Notice: Final 90-day window active. Renewal protocols pending executive signing.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-3 bg-slate-50/50 border-t border-slate-100 italic">
               <button className="w-full text-center py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 border-dashed rounded hover:bg-white transition-colors">
                  Open Master Alert Logs
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
