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
        <div className="max-w-[1600px] mx-auto space-y-6 italic font-black">
            {/* Dashboard Command Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 pb-12 border-b-2 border-slate-900 relative italic">
                <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-blue-600 animate-pulse" />
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-slate-950 rounded-none text-white shadow-2xl shadow-blue-950/40 transform rotate-2">
                        <Terminal size={32} className="text-blue-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-4xl font-black text-slate-900 tracking-[0.02em] uppercase leading-none italic select-none">REMIS_COMMAND_OPERATIONS</h1>
                            <div className="w-3 h-3 bg-blue-600 rounded-none rotate-45 animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
                        </div>
                        <div className="flex items-center gap-6 italic border-l-2 border-slate-100 pl-6 h-10">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1 italic opacity-40">SYSTEM_NODE</span>
                                <span className="text-[12px] font-black text-blue-600 uppercase tracking-widest italic leading-none font-mono tracking-tighter">NAV_REMIS_ALFA_42</span>
                            </div>
                            <div className="w-px h-6 bg-slate-100" />
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1 italic opacity-40">PROTOCOL_STATUS</span>
                                <span className="text-[12px] font-black text-emerald-600 uppercase tracking-widest italic leading-none font-mono tracking-tighter">MISSION::LOCKED_SYNC</span>
                            </div>
                            <RegulatoryBadge refs={['ER 405-1-12', 'CH 1']} />
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-6">
                    <button className="btn-pro-secondary bg-white text-slate-950 hover:bg-slate-100 flex items-center gap-3 px-8 py-4 h-auto text-[11px] font-black uppercase tracking-[0.4em] italic shadow-2xl border-2 border-slate-900">
                        <Globe size={18} /> G2_INTEL_STREAM
                    </button>
                    <button className="btn-pro-primary bg-slate-950 text-white hover:bg-blue-600 flex items-center gap-3 px-10 py-4 h-auto text-[11px] font-black uppercase tracking-[0.4em] italic shadow-2xl transition-all active:scale-95">
                        <Activity size={18} className="animate-pulse" /> EXECUTE_RECON_AUDIT
                    </button>
                </div>
            </div>

            {/* Tactical Vector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'CIVIL_WORKS_ASSETS', value: civilWorksAssets, trend: '+2.4%', sub: 'NAV_FLOOD_CONTROL', icon: Waves, color: 'text-blue-500', link: '/usace/inventory', id: 'CW_0' },
                    { label: 'MILITARY_MISSION_NODES', value: militaryAssets, trend: '+1.8%', sub: 'READINESS_SUSTAINMENT', icon: Sword, color: 'text-emerald-500', link: '/usace/inventory', id: 'MIL_1' },
                    { label: 'ACTIVE_PIPELINE_VECTOR', value: activeAcquisitions, trend: 'STABLE', sub: 'REAL_PROPERTY_INBOUND', icon: Target, color: 'text-amber-500', link: '/usace/acquisitions', id: 'ACQ_2' },
                    { label: 'CRITICAL_RISK_VECTOR', value: expiringOutgrants, trend: '-5%', sub: '90D_EXPIRATION_THRESHOLD', icon: AlertCircle, color: 'text-rose-600', link: '/usace/outgrants', id: 'RSK_3' }
                ].map((kpi, i) => (
                    <div key={i} onClick={() => navigate(kpi.link)} className="pro-card p-10 group transition-all cursor-pointer hover:border-slate-950 hover:shadow-2xl relative overflow-hidden bg-white border-2 border-slate-100 shadow-xl">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity pointer-events-none transform translate-x-4 -translate-y-4">
                            <kpi.icon size={140} />
                        </div>
                        <div className="absolute top-0 right-0 p-6 font-mono text-[9px] text-slate-200 group-hover:text-slate-400 italic pointer-events-none">
                            {kpi.id}
                        </div>
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className={`p-4 bg-slate-950 rounded-none ${kpi.color} shadow-2xl transform transition-transform group-hover:scale-110 group-hover:-rotate-3`}>
                                <kpi.icon size={24} />
                            </div>
                            <span className="text-[10px] font-black font-mono text-slate-500 px-4 py-1.5 rounded-none border-2 border-slate-50 uppercase tracking-tighter italic bg-slate-50/50 shadow-inner group-hover:border-slate-950 transition-colors">
                                {kpi.trend}
                            </span>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4 italic group-hover:text-slate-950 transition-colors">{kpi.label}</p>
                        <p className="text-5xl font-black font-mono tracking-tighter text-slate-950 leading-none italic select-all">{kpi.value.toString().padStart(3, '0')}</p>
                        <div className="mt-10 pt-6 border-t-2 border-slate-50 flex items-center justify-between relative z-10">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic opacity-60 group-hover:opacity-100 group-hover:text-slate-950 transition-all">{kpi.sub}</span>
                            <div className="w-8 h-8 rounded-none border-2 border-slate-50 group-hover:border-slate-950 flex items-center justify-center transition-all bg-white group-hover:bg-slate-950">
                                <ArrowRightLeft size={16} className="text-slate-200 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Mission Readiness Flux */}
                <div className="pro-card bg-slate-950 border-2 border-slate-900 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                        <Activity size={240} className="text-blue-500" />
                    </div>
                    <div className="px-10 py-8 border-b-2 border-white/5 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <Activity size={20} className="text-blue-500 animate-pulse" />
                            <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white italic">Strategic_Execution_Velocity</span>
                        </div>
                        <div className="flex items-center gap-6">
                             <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-blue-600 rounded-none shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic leading-none">MISSION_BURNDOWN_INDEX</span>
                             </div>
                        </div>
                    </div>
                    <div className="h-[400px] p-12 relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" strokeOpacity={0.3} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11, fontWeight: 900}} dy={20} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11, fontWeight: 900}} />
                                <Tooltip 
                                    cursor={{stroke: '#334155', strokeWidth: 2}}
                                    contentStyle={{backgroundColor: '#000', border: '2px solid #2563eb', borderRadius: '0px', padding: '16px', fontSize: '11px'}}
                                    itemStyle={{color: '#60a5fa', fontWeight: 900, textTransform: 'uppercase'}}
                                />
                                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" animationDuration={2500} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tactical Acquisition Pipeline */}
                <div className="pro-card bg-white border-2 border-slate-900 shadow-2xl relative overflow-hidden group hover:shadow-[0_0_80px_rgba(37,99,235,0.05)] transition-all">
                     <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover:opacity-[0.1] transition-opacity">
                        <Target size={240} className="text-slate-950" />
                    </div>
                    <div className="px-10 py-8 border-b-2 border-slate-900 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                            <Target size={20} className="text-amber-500" />
                            <span className="text-[12px] font-black uppercase tracking-[0.6em] text-slate-950 italic">Acquisition_Vector_Distribution</span>
                        </div>
                        <span className="text-[10px] font-black text-white bg-slate-950 px-5 py-2 rounded-none border-2 border-slate-950 uppercase tracking-[0.4em] italic shadow-2xl">SYNC::GLOBAL_L6</span>
                    </div>
                    <div className="h-[400px] p-12 relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={[
                                { name: 'INITIATION', value: 4 },
                                { name: 'MAPPING', value: 7 },
                                { name: 'VALUATION', value: 5 },
                                { name: 'NEGOTIATION', value: 3 },
                                { name: 'FINAL', value: 2 }
                            ]} margin={{top: 20, bottom: 20}}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={20} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    contentStyle={{borderRadius: '0px', border: '2px solid #000', padding: '16px', boxShadow: '20px 20px 0px rgba(0,0,0,0.1)'}}
                                />
                                <Bar dataKey="value" radius={[0, 0, 0, 0]} barSize={50} animationDuration={2000}>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 pro-card overflow-hidden bg-white border-2 border-slate-900 shadow-2xl group italic">
                    <div className="px-10 py-8 border-b-2 border-slate-900 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-6">
                            <Terminal size={20} className="text-blue-600" />
                            <span className="text-[12px] font-black uppercase tracking-[0.6em] text-slate-950 italic">MISSION_COMMAND_ACTIVITY_STREAM</span>
                        </div>
                        <button className="text-[10px] font-black text-white bg-slate-950 uppercase tracking-[0.4em] hover:bg-blue-600 px-8 py-3 transition-all shadow-2xl italic">ACCESS_FULL_LOG_TERMINAL</button>
                    </div>
                    <div className="divide-y-2 divide-slate-100 italic uppercase tracking-[0.05em]">
                        {USACE_ACQUISITIONS.slice(0, 6).map((item, i) => (
                            <div key={i} className="px-10 py-8 flex items-center justify-between group/row hover:bg-slate-950 transition-all duration-500 cursor-crosshair border-l-8 border-transparent hover:border-blue-600 relative">
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-slate-100 group-hover/row:bg-blue-950 transition-colors" />
                                <div className="flex items-center gap-10">
                                     <div className={`p-4 rounded-none border-2 shrink-0 shadow-2xl ${i === 0 ? 'bg-amber-600 border-amber-900 text-white animate-pulse' : 'bg-slate-50 border-slate-200 text-slate-400'} group-hover/row:bg-blue-600 group-hover/row:border-blue-900 group-hover/row:text-white transition-all transform group-hover/row:scale-110 group-hover/row:rotate-3`}>
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-6 mb-2">
                                            <span className="text-[15px] font-black text-slate-950 font-mono tracking-tighter group-hover/row:text-white transition-colors uppercase select-all">{item.id.replace(' ', '_')}</span>
                                            {i === 0 && <span className="text-[9px] bg-rose-600 text-white px-4 py-1.5 rounded-none font-black tracking-[0.4em] shadow-2xl animate-bounce italic ring-4 ring-rose-600/20">PRIORITY_ALPHA</span>}
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-[11px] font-black text-slate-400 group-hover/row:text-white/40 uppercase tracking-[0.3em]">VECTOR: <span className="text-blue-600 group-hover/row:text-blue-400">{item.stage.toUpperCase()}</span></span>
                                            <div className="w-2 h-2 bg-slate-100 rounded-none group-hover/row:bg-white/10 rotate-45" />
                                            <span className="text-[11px] font-black text-slate-400 group-hover/row:text-emerald-400 font-mono italic tracking-[0.3em]">{item.fundingSource.replace(' ', '_')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right hidden sm:block">
                                        <div className="text-[10px] font-black text-slate-400 group-hover/row:text-white/30 mb-2 tracking-[0.3em]">TIMESTAMP</div>
                                        <div className="text-[13px] font-black text-slate-950 group-hover/row:text-white font-mono uppercase tracking-tighter">20_APR_2024::2027Z</div>
                                    </div>
                                    <div className="p-3 border-2 border-slate-50 group-hover/row:border-white/20 group-hover/row:bg-white/5 transition-all">
                                        <ArrowUpRight size={24} className="text-slate-200 group-hover/row:text-blue-400 group-hover/row:translate-x-1 group-hover/row:-translate-y-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pro-card bg-slate-950 text-white overflow-hidden relative shadow-2xl flex flex-col group border-2 border-slate-900 italic">
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity" style={{backgroundImage: 'linear-gradient(#475569 1.5px, transparent 1.5px), linear-gradient(90deg, #475569 1.5px, transparent 1.5px)', backgroundSize: '60px 60px'}}></div>
                    <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none transform translate-x-10 -translate-y-10">
                        <ShieldCheck size={380} />
                    </div>
                    
                    <div className="p-16 relative z-10 flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-16">
                            <div className="p-6 bg-blue-600 rounded-none shadow-[0_0_50px_rgba(37,99,235,0.4)] transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all">
                                <ShieldCheck size={40} />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[12px] font-black uppercase tracking-[0.6em] text-blue-400 italic">COMMAND_TERM_01</span>
                                <span className="text-[9px] font-mono text-white/20 uppercase">SEC_LVL::TS_SCI</span>
                            </div>
                        </div>
                        
                        <h3 className="text-5xl font-black uppercase tracking-tight mb-8 leading-[0.85] italic group-hover:text-blue-400 transition-colors select-none">Strategic Portfolio Readiness Audit</h3>
                        <p className="text-[12px] text-white/30 uppercase tracking-[0.3em] font-black leading-relaxed mb-16 border-l-4 border-blue-600 pl-10 italic max-w-sm">Comprehensive verification of RPUID synchronization, financial authority mapping, and mission-essential asset readiness across all Naval core districts.</p>
                        
                        <div className="space-y-8 flex-grow">
                            <div className="flex justify-between items-center text-[12px] uppercase font-black tracking-[0.5em] border-b-2 border-white/5 pb-6 group/item">
                                <span className="text-white/20 group-hover/item:text-white transition-colors italic">Sync Velocity</span>
                                <span className="text-emerald-500 font-mono group-hover:scale-125 transition-transform">OPTIMAL_L6</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px] uppercase font-black tracking-[0.5em] border-b-2 border-white/5 pb-6 group/item">
                                <span className="text-white/20 group-hover/item:text-white transition-colors italic">Encryption Layer</span>
                                <span className="text-blue-500 font-mono tracking-tighter italic shadow-blue-500/20 shadow-2xl">FIPS-140-2_LEVEL_4</span>
                            </div>
                            <div className="flex justify-between items-center text-[12px] uppercase font-black tracking-[0.5em] border-b-2 border-white/5 pb-6 group/item">
                                <span className="text-white/20 group-hover/item:text-white transition-colors italic">Network Node</span>
                                <span className="text-white/90 font-mono italic">USACE_CORE_ALFA_SITE</span>
                            </div>
                        </div>

                        <button className="w-full mt-20 py-8 bg-blue-600 text-white text-[14px] font-black uppercase tracking-[1em] rounded-none hover:bg-white hover:text-slate-950 transition-all flex items-center justify-center gap-6 italic shadow-[0_0_80px_rgba(37,99,235,0.3)] group/btn overflow-hidden relative active:scale-95">
                            <span className="relative z-10 flex items-center gap-6">
                                INITIATE_COMMAND_PROTOCOL <ArrowUpRight size={22} className="group-hover/btn:translate-x-3 group-hover/btn:-translate-y-3 transition-transform" />
                            </span>
                        </button>
                    </div>

                    <div className="px-16 py-8 bg-white/5 border-t-2 border-white/10 flex justify-between items-center text-[11px] font-black uppercase tracking-[0.6em] italic text-white/20">
                        <div className="flex items-center gap-4">
                            <Zap size={18} className="text-blue-500 animate-pulse" />
                            OPERATIONAL::ENCRYPTED_L9
                        </div>
                        <span className="font-mono text-[10px] opacity-20 hover:opacity-100 transition-opacity cursor-wait">UTC::20_APR_24::2027Z</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
