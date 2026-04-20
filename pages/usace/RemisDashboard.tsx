import React from 'react';
import { Landmark, Building2, ArrowRightLeft, FileClock, Shield, BarChart, Activity, ExternalLink, ChevronRight, PieChart as PieIcon, TrendingUp, AlertCircle, FileText, CheckCircle, Database, Globe, ArrowUpRight, Terminal, Clock, ShieldCheck, Target, Zap, Waves, Sword, Menu, X } from 'lucide-react';
import { USACE_ASSETS, USACE_ACQUISITIONS, USACE_OUTGRANTS, FUND_TRANSACTIONS } from '../../services/mockData';
import { useNavigate } from 'react-router-dom';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';

const data = [
  { month: 'Oct', value: 400 },
  { month: 'Nov', value: 300 },
  { month: 'Dec', value: 600 },
  { month: 'Jan', value: 800 },
  { month: 'Feb', value: 700 },
  { month: 'Mar', value: 900 },
  { month: 'Apr', value: 1100 },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const RemisDashboard: React.FC = () => {
    const navigate = useNavigate();
    const civilWorksAssets = USACE_ASSETS.filter(a => a.program === 'Civil Works').length;
    const militaryAssets = USACE_ASSETS.filter(a => a.program === 'Military').length;
    const activeAcquisitions = USACE_ACQUISITIONS.filter(a => a.stage !== 'Closing').length;
    const expiringOutgrants = USACE_OUTGRANTS.filter(o => {
        const C = new Date(o.endDate);
        const T = new Date();
        const D = (C.getTime() - T.getTime()) / (1000 * 3600 * 24);
        return D > 0 && D <= 365;
    }).length;

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Command Terminal Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-slate-950 rounded-sm text-white shadow-sm">
                            <Landmark size={16} />
                        </div>
                        <div className="flex items-center gap-3">
                           <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Strategy Command Center</h1>
                           <RegulatoryBadge refs={['ER 405-1-12', 'CH 1']} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="data-label text-blue-600">REMIS Enterprise Mission Terminal</span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider italic tracking-tighter">Status: MISSION-READY-L1</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5 h-auto">
                        <Globe size={14} /> G2 Intel
                    </button>
                    <button className="btn-pro-primary flex items-center gap-2 px-3 py-1.5 h-auto">
                        <Activity size={14} /> Systems Audit
                    </button>
                </div>
            </div>

            {/* Logical Vector Buffers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Civil Works Assets', value: civilWorksAssets, trend: '+2.4%', sub: 'Navigation & Flood Control', icon: Waves, color: 'text-blue-500', link: '/usace/inventory' },
                    { label: 'Military Missions', value: militaryAssets, trend: '+1.8%', sub: 'Readiness & Sustainment', icon: Sword, color: 'text-emerald-500', link: '/usace/inventory' },
                    { label: 'Active Pipeline', value: activeAcquisitions, trend: 'STABLE', sub: 'Real Property Acquisition', icon: Target, color: 'text-amber-500', link: '/usace/acquisitions' },
                    { label: 'Critical Expirations', value: expiringOutgrants, trend: '-5%', sub: '90-Day Outgrant Risk', icon: AlertCircle, color: 'text-rose-500', link: '/usace/outgrants' }
                ].map((kpi, i) => (
                    <div key={i} onClick={() => navigate(kpi.link)} className="pro-card p-5 group transition-all cursor-pointer hover:border-blue-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 bg-slate-50 border border-slate-100 rounded ${kpi.color} group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all`}>
                                <kpi.icon size={16} />
                            </div>
                            <span className="text-[9px] font-black font-mono text-slate-400 px-1.5 py-0.5 rounded border border-slate-100 uppercase tracking-tighter italic">
                                {kpi.trend}
                            </span>
                        </div>
                        <p className="data-label mb-1 uppercase tracking-widest">{kpi.label}</p>
                        <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{kpi.value.toString().padStart(2, '0')}</p>
                        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest italic">{kpi.sub}</span>
                            <ChevronRight size={14} className="text-slate-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mission Readiness Flux */}
                <div className="pro-card">
                    <div className="pro-card-header bg-slate-50/50">
                        <div className="flex items-center gap-2">
                            <Activity size={14} className="text-blue-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Mission Execution Intensity</span>
                        </div>
                        <div className="flex items-center gap-3">
                             <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                <span className="text-[9px] font-bold text-slate-400 uppercase">Operational Velocity</span>
                             </div>
                        </div>
                    </div>
                    <div className="h-[300px] p-6 pt-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 700}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 700}} />
                                <Tooltip 
                                    cursor={{stroke: '#e2e8f0', strokeWidth: 1}}
                                    contentStyle={{backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '10px'}}
                                />
                                <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tactical Acquisition Pipeline */}
                <div className="pro-card">
                    <div className="pro-card-header bg-slate-50/50">
                        <div className="flex items-center gap-2">
                            <Target size={14} className="text-amber-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Acquisition Vector Distribution</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">L-BAND SYNC</span>
                    </div>
                    <div className="h-[300px] p-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={[
                                { name: 'Initiation', value: 4 },
                                { name: 'Mapping', value: 7 },
                                { name: 'Valuation', value: 5 },
                                { name: 'Negotiation', value: 3 },
                                { name: 'Final', value: 2 }
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 700}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 700}} />
                                <Bar dataKey="value" radius={[2, 2, 0, 0]} barSize={32}>
                                    {COLORS.map((color, index) => (
                                        <Cell key={`cell-${index}`} fill={color} />
                                    ))}
                                </Bar>
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Authoritative Command Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 pro-card overflow-hidden">
                    <div className="pro-card-header bg-slate-50/50">
                        <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-blue-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Command Activity Stream</span>
                        </div>
                        <button className="text-[9px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Full Log</button>
                    </div>
                    <div className="divide-y divide-slate-50 italic uppercase tracking-tighter">
                        {USACE_ACQUISITIONS.slice(0, 5).map((item, i) => (
                            <div key={i} className="p-4 flex items-center justify-between group hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                     <div className={`p-2 rounded-sm border shrink-0 ${i === 0 ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                        <Clock size={14} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-black text-slate-900 not-italic uppercase tracking-tight">{item.name}</span>
                                            {i === 0 && <span className="text-[8px] bg-amber-500 text-white px-1 py-0.5 rounded-sm font-black not-italic">PRIORITY</span>}
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[9px] font-mono text-slate-400 font-bold opacity-60">STG: {item.stage}</span>
                                            <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                            <span className="text-[9px] font-mono text-blue-500 font-black not-italic italic opacity-60">{item.fundSource}</span>
                                        </div>
                                    </div>
                                </div>
                                <ArrowUpRight size={14} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pro-card bg-slate-950 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
                    <div className="p-6 relative z-10 h-full flex flex-col justify-between">
                        <div>
                             <div className="flex justify-between items-start mb-8">
                                <div className="p-2 bg-blue-600 rounded shadow-lg shadow-blue-500/20">
                                    <ShieldCheck size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 italic">Auth Terminal</span>
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-2">Portfolio Readiness Audit</h3>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold leading-relaxed mb-8">Comprehensive verification of RPUID synchronization, financial authority mapping, and mission-essential asset readiness.</p>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest border-b border-white/5 pb-2">
                                    <span className="text-white/40">Sync Status</span>
                                    <span className="text-emerald-400">OPTIMAL</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-widest border-b border-white/5 pb-2">
                                    <span className="text-white/40">Encryption</span>
                                    <span className="text-blue-400 font-mono tracking-tighter italic">FIPS-140-2 L3</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-10 py-3 bg-white text-slate-950 text-[11px] font-black uppercase tracking-[0.3em] rounded-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2 italic">
                            Execute Protocol <ArrowUpRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
