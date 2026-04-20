import React, { useState } from 'react';
import { Sliders, Layers, ShieldCheck, Plus, Target, Zap, Activity, Globe, Rocket, Shield, Info, Terminal, Database, Compass, ArrowUpRight, ArrowRight, LayoutDashboard, Search } from 'lucide-react';
import { SPACE_DATA } from '../services/mockData';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const radarData = [
  { subject: 'Utilization', A: 120, fullMark: 150 },
  { subject: 'Condition', A: 98, fullMark: 150 },
  { subject: 'Cost Efficiency', A: 86, fullMark: 150 },
  { subject: 'Sustainability', A: 99, fullMark: 150 },
  { subject: 'Security', A: 85, fullMark: 150 },
  { subject: 'Readiness', A: 65, fullMark: 150 },
];

export const StrategicPortfolio: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState('Consolidate R&D');

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Editorial Intelligence Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Target size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Strategic Portfolio Command</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Decision Intelligence & Scenario Modeling</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Predictive Layer: V.4.2-STABLE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="btn-pro-secondary flex items-center gap-2">
                <Globe size={14} /> Global Map
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> New Scenario
            </button>
        </div>
      </div>

      {/* Strategic Index Buffer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
            { label: 'Portfolio Index', value: '82%', trend: '+12%', icon: Activity, color: 'text-blue-500' },
            { label: 'Efficiency Delta', value: '14.2%', trend: '-2.4%', icon: Zap, color: 'text-emerald-500' },
            { label: 'Active Upgrades', value: '22', trend: 'STABLE', icon: Rocket, color: 'text-amber-500' },
            { label: 'Critical Risks', value: '03', trend: 'ALERT', icon: Shield, color: 'text-red-500' }
         ].map((stat, i) => (
            <div key={i} className="pro-card p-5 group transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
                        <stat.icon size={16} />
                    </div>
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${stat.color === 'text-red-500' ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-50 text-slate-400'}`}>
                        {stat.trend}
                    </span>
                </div>
                <p className="data-label mb-1">{stat.label}</p>
                <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{stat.value}</p>
                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest italic">Live Telemetry</span>
                    <ArrowUpRight size={12} className="text-slate-300 group-hover:text-blue-500" />
                </div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Scenario Analysis Matrix */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="pro-card p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <Terminal size={18} className="text-blue-600" />
                        <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight">Active Scenario Simulation</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Model:</span>
                        <select 
                            value={activeScenario}
                            onChange={(e) => setActiveScenario(e.target.value)}
                            className="bg-slate-100 border-none rounded-sm px-2 py-1 text-[10px] font-bold text-slate-900 uppercase tracking-widest focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                        >
                            <option>Consolidate R&D</option>
                            <option>Portfolio Expansion</option>
                            <option>Divestment Track</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { label: 'Projected Annual Savings', value: '$1.4M', color: 'text-emerald-600', bg: 'bg-emerald-500' },
                        { label: 'Utilization Uplift', value: '+12.5%', color: 'text-blue-600', bg: 'bg-blue-500' },
                        { label: 'Strategic ROI (3YR)', value: '8.2x', color: 'text-slate-900', bg: 'bg-slate-950' }
                    ].map((m, i) => (
                        <div key={i} className="p-4 bg-slate-50/50 border border-slate-100 rounded group hover:shadow-lg transition-all">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">{m.label}</p>
                            <p className={`text-2xl font-black font-mono tracking-tighter ${m.color}`}>{m.value}</p>
                            <div className="mt-3 h-0.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className={`h-full ${m.bg} w-2/3 group-hover:w-full transition-all duration-1000`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pro-card bg-slate-950 text-white p-6 border-none group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all cursor-default scale-150">
                        <Compass size={120} />
                    </div>
                    <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Command Intelligence Output</h4>
                    <p className="text-[13px] font-medium leading-relaxed max-w-xl mb-8 font-mono italic text-slate-400">
                        Recommendation: The "Consolidate R&D" track initializes spatial compression at the legacy clusters. 
                        Target occupancy optimization is identified at <span className="text-white">+8.4%</span> through 
                        synchronized departmental integration. Projected drift in maintenance load is identified as 
                        negligible over the 24-month window.
                    </p>
                    <div className="flex gap-4">
                        <button className="text-[10px] font-black uppercase tracking-widest px-6 py-2.5 bg-blue-600 hover:bg-blue-700 transition-colors rounded-sm">Commit Scenario</button>
                        <button className="text-[10px] font-black uppercase tracking-widest px-6 py-2.5 border border-white/20 hover:bg-white/5 transition-colors rounded-sm">View Risk Audit</button>
                    </div>
                </div>
            </div>

            <div className="pro-card p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <Layers size={16} className="text-blue-500" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Global Spatial Stacking Matrix</span>
                    </div>
                    <button className="text-slate-300 hover:text-slate-500"><Info size={14}/></button>
                </div>
                <div className="space-y-4">
                    {SPACE_DATA.map((floor, i) => (
                        <div key={floor.floor} className="group relative">
                            <div className="flex items-center justify-between mb-1.5 px-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-[11px] font-bold text-slate-900 font-mono italic w-8">F.{floor.floor}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{floor.department}</span>
                                </div>
                                <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${floor.utilization > 80 ? 'text-blue-600' : 'text-slate-400'}`}>UTIL: {floor.utilization}%</span>
                            </div>
                            <div className="h-6 bg-slate-50 rounded-sm border border-slate-100 flex p-0.5 group-hover:border-blue-300 transition-all">
                                <div 
                                    className={`h-full rounded-sm transition-all duration-1000 flex items-center justify-center text-[8px] font-black text-white shadow-sm overflow-hidden ${floor.utilization > 80 ? 'bg-blue-600 animate-pulse' : 'bg-slate-950'}`} 
                                    style={{width: `${floor.utilization}%`}}
                                >
                                    {floor.utilization > 30 && "STRATEGIC ASSET"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Strategic Analysis Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="pro-card p-6 flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-10 text-slate-400">Portfolio Readiness Radar</span>
                <div className="h-64 w-full px-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="#f1f5f9" />
                            <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 8, fontWeight: 700}} />
                            <PolarRadiusAxis axisLine={false} tick={false} />
                            <Radar name="Strategy" dataKey="A" stroke="#2563eb" strokeWidth={2} fill="#2563eb" fillOpacity={0.4} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-8 w-full space-y-2">
                    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-sm">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Target Condition</span>
                        <span className="text-[11px] font-black text-slate-900 font-mono italic">FCI 95+</span>
                    </div>
                </div>
            </div>

            <div className="pro-card p-6 bg-slate-950 text-white relative border-none group overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
                    <ShieldCheck size={160} />
                </div>
                <div className="relative z-10">
                    <div className="p-2 bg-blue-600/20 rounded-sm inline-block mb-6 border border-blue-600/30">
                        <ShieldCheck size={20} className="text-blue-500" />
                    </div>
                    <h4 className="text-[16px] font-bold tracking-tight mb-2 uppercase">Portfolio Integrity Audit</h4>
                    <p className="text-[12px] font-medium leading-relaxed mb-8 uppercase tracking-widest text-slate-400">
                        Unified verification of asset boundaries and legal title status.
                    </p>
                    <div className="space-y-4">
                         <div className="flex justify-between items-center px-1">
                            <span className="text-[9px] font-bold text-slate-500 uppercase">Verification Level</span>
                            <span className="text-[9px] font-mono font-bold">100% SECURE</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-full"></div>
                        </div>
                    </div>
                    <button className="w-full mt-10 py-3 bg-white text-slate-900 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3">
                        Execute Audit Log <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            <div className="pro-card p-6">
                <div className="flex items-center gap-2 mb-8">
                    <LayoutDashboard size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Command Roadmap</span>
                </div>
                <div className="space-y-8 relative before:content-[''] before:absolute before:left-[5px] before:top-1 before:bottom-0 before:w-px before:bg-slate-100">
                    {[
                        { title: 'Nexus Consolidation Phase 1', date: 'Q3 2024', status: 'In Execution', color: 'bg-blue-600' },
                        { title: 'Digital Twin Deployment', date: 'Q4 2024', status: 'Strategic Triage', color: 'bg-slate-900' },
                        { title: 'Predictive ROI Analysis v2', date: 'Q1 2025', status: 'Pending Approval', color: 'bg-slate-200' },
                        { title: 'Global Asset Rationalization', date: 'Q2 2025', status: 'Drafting', color: 'bg-slate-200 text-slate-400' },
                    ].map((item, i) => (
                        <div key={i} className="relative pl-6 group">
                            <div className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-sm border-2 border-white shadow-sm z-10 transition-transform group-hover:scale-125 ${item.color}`}></div>
                            <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">{item.date}</p>
                            <p className="text-[12px] font-bold text-slate-900 tracking-tight leading-tight uppercase group-hover:text-blue-600 transition-colors">{item.title}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic font-mono">Status: {item.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
