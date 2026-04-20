import React from 'react';
import { SUSTAINABILITY_DATA, SUSTAINABILITY_INITIATIVES } from '../services/mockData';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Leaf, Droplet, Zap, Trash2, ShieldCheck, Activity, Globe, Wind, Sun, Battery, ArrowUpRight, Info, Filter, Plus, Radio } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

const MetricCard = ({ icon: Icon, title, value, unit, trend, subLabel }: any) => (
  <div className="pro-card p-5 group transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-emerald-500 transition-colors">
        <Icon size={16} />
      </div>
      {trend && (
        <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${trend.startsWith('+') ? 'text-blue-600 bg-blue-50' : 'text-emerald-600 bg-emerald-50'}`}>
          {trend}
        </span>
      )}
    </div>
    <p className="data-label mb-1">{title}</p>
    <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">
      {value} <span className="text-xs font-normal text-slate-400 font-sans tracking-normal">{unit}</span>
    </p>
    {subLabel && <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-3 pt-3 border-t border-slate-50">{subLabel}</p>}
  </div>
);

export const Sustainability: React.FC = () => {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-emerald-950 rounded text-emerald-400 shadow-sm border border-emerald-900">
                <Leaf size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">ESG & ENVIRONMENTAL COMMAND</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-emerald-600">Executive Neutrality Audit</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">EO 14057 Compliant</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button className="btn-pro-secondary flex items-center gap-2">
                <Globe size={14} /> Carbon Hub
            </button>
            <button className="btn-pro-primary flex items-center gap-2 !bg-emerald-600 !hover:bg-emerald-700">
                <Plus size={14} /> New Program
            </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={Zap} title="Energy Intensity" value="58.2" unit="kWh/SF" trend="-4.2%" subLabel="84% Goal Progress" />
        <MetricCard icon={Droplet} title="Water Capacity" value="15.5" unit="m³" trend="-1.8%" subLabel="Aquifer Integrity: High" />
        <MetricCard icon={ShieldCheck} title="Regulatory Rating" value="A+" unit="Audit" subLabel="32 CFR Part 989" />
        <MetricCard icon={Trash2} title="Waste Divergence" value="68.0" unit="%" trend="+12%" subLabel="MSR Target: 75%" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Real-time Consumption Matrix */}
        <div className="col-span-12 lg:col-span-8 pro-card">
          <div className="pro-card-header bg-slate-50/50">
            <div className="flex items-center gap-2">
                <Activity size={14} className="text-emerald-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Multi-Vector Consumption Terminal</span>
            </div>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-0.5 bg-blue-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Energy</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-0.5 bg-cyan-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Water</span>
                </div>
            </div>
          </div>
          <div className="h-[400px] p-6 pt-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SUSTAINABILITY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="energyKWh" stroke="#2563EB" strokeWidth={1.5} fillOpacity={1} fill="url(#energyGrad)" />
                <Area type="monotone" dataKey="waterGal" stroke="#06B6D4" strokeWidth={1.5} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ESG Readiness Console */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="pro-card bg-[#0A0A0B] text-white border-none p-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-500">Net Zero Countdown</p>
                <h3 className="text-3xl font-black font-mono tracking-tighter mt-1">2030 TARGET</h3>
              </div>
              <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center">
                <Radio size={20} className="text-emerald-500 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-center mb-8">
               <div className="w-32 h-32 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{v: 72}, {v: 28}]}
                        innerRadius={45}
                        outerRadius={60}
                        paddingAngle={0}
                        dataKey="v"
                        startAngle={90}
                        endAngle={-270}
                      >
                        <Cell fill="#10B981" />
                        <Cell fill="rgba(255,255,255,0.05)" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black font-mono">72%</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase">Verified</span>
                  </div>
               </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span>Renewable Mix</span>
                <span className="text-white">15.2%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[15.2%]" />
              </div>
            </div>

            <button className="w-full mt-8 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded hover:bg-slate-200 transition-colors">
              Execute Strategy Audit
            </button>
          </div>

          <div className="pro-card">
            <div className="pro-card-header">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Generation Sources</span>
                <Info size={14} className="text-slate-300" />
            </div>
            <div className="p-4 space-y-3">
               {[
                  { label: 'Photovoltaic Array', value: '42.1%', icon: Sun, color: 'text-amber-500' },
                  { label: 'Offshore Hybrid', value: '28.4%', icon: Wind, color: 'text-blue-500' },
                  { label: 'BESS Storage', value: '15.2%', icon: Battery, color: 'text-emerald-500' }
               ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50/50 rounded border border-slate-100 hover:border-emerald-200 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <item.icon size={14} className={item.color} />
                      <span className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">{item.label}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500">{item.value}</span>
                  </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Initiatives Terminal */}
      <div className="pro-card overflow-hidden">
        <div className="pro-card-header bg-white">
            <div className="flex items-center gap-2">
                <Plus size={14} className="text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Active ESG Strategic Programs</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600"><Filter size={14}/></button>
        </div>
        <div className="divide-y divide-slate-100">
            {SUSTAINABILITY_INITIATIVES.map(item => (
                <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors truncate group">
                    <div className="flex items-center gap-4 flex-1">
                        <div className={`w-10 h-10 rounded flex items-center justify-center shrink-0 border ${
                            item.type === 'Energy' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                            item.type === 'Water' ? 'bg-cyan-50 border-cyan-100 text-cyan-600' :
                            'bg-emerald-50 border-emerald-100 text-emerald-600'
                        }`}>
                            {item.type === 'Energy' ? <Zap size={16} /> : item.type === 'Water' ? <Droplet size={16} /> : <Leaf size={16} />}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <h4 className="text-[13px] font-bold text-slate-900 uppercase tracking-tight">{item.name}</h4>
                                <span className="text-[9px] font-mono text-slate-400">[{item.id}]</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Type: {item.type}</span>
                                <span className="text-slate-200">|</span>
                                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">ROI Terminal: 1.4y</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                        <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Est. Impact</p>
                            <p className="text-[13px] font-black text-emerald-600 font-mono italic">{item.projectedSavings}</p>
                        </div>
                        <div className="min-w-[100px]">
                            <span className={`inline-block px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest border ${
                                item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'
                            }`}>{item.status}</span>
                        </div>
                        <button className="text-slate-300 hover:text-slate-600"><ArrowUpRight size={16}/></button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
