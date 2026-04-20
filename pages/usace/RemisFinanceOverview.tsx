import React, { useState } from 'react';
import { Landmark, DollarSign as DollarIcon, TrendingUp, TrendingDown, PieChart as PieIcon, Activity, Plus, Download, Filter, Search, ArrowUpRight, ArrowDownRight, ShieldCheck, Clock, FileText, Briefcase, Database, LayoutDashboard, Terminal, ArrowRight } from 'lucide-react';
import { USACE_ASSETS, PPBE_FUNDS, FUND_TRANSACTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, ComposedChart, Line } from 'recharts';

const data = [
  { month: 'Oct', budget: 4000, actual: 2400 },
  { month: 'Nov', budget: 3000, actual: 1398 },
  { month: 'Dec', budget: 2000, actual: 9800 },
  { month: 'Jan', budget: 2780, actual: 3908 },
  { month: 'Feb', budget: 1890, actual: 4800 },
  { month: 'Mar', budget: 2390, actual: 3800 },
  { month: 'Apr', budget: 3490, actual: 4300 },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const RemisFinanceOverview: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Precision Financial Header */}
            <div className="border-b-4 border-slate-950 pb-12 mb-12">
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">
                    <div className="flex items-center gap-10">
                        <div className="p-6 bg-slate-950 rounded-none shadow-[0_0_50px_rgba(0,0,0,0.3)] text-white transform -rotate-2 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity" />
                            <Landmark size={48} className="text-blue-500 relative z-10" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-6 mb-4">
                                <h1 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none italic select-none">Strategic Fiscal Command</h1>
                                <div className="p-px bg-emerald-500 h-10 w-1 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                                <div className="bg-slate-950 text-white px-6 py-2 text-[11px] font-black uppercase tracking-[0.4em] italic shadow-2xl">SYST::LIVE_FEED</div>
                                <RegulatoryBadge refs={['ER 37-1-30', 'CH 14.2']} />
                            </div>
                            <div className="flex items-center gap-6 italic">
                                <span className="text-[12px] font-black text-blue-600 uppercase tracking-[0.6em] leading-none bg-blue-50 px-4 py-2 border border-blue-100 italic">Appropriation Control Terminal V9.2</span>
                                <div className="w-1.5 h-1.5 bg-slate-300 rotate-45" />
                                <span className="text-[12px] font-mono font-black text-slate-400 uppercase tracking-widest italic leading-none">AUTH_STRAT::USACE-BUREAU-ALPHA-CORE // SYNC: OPTIMAL_L9</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6 shrink-0">
                        <button className="bg-white border-2 border-slate-950 text-slate-950 flex items-center gap-4 px-8 py-4 h-auto text-[11px] font-black uppercase tracking-[0.4em] italic shadow-xl hover:bg-slate-50 transition-all active:translate-y-1">
                            <Terminal size={18} className="text-blue-600" /> CEFMS_Interface_SYS
                        </button>
                        <button className="bg-slate-950 text-white flex items-center gap-4 px-10 py-5 h-auto text-[11px] font-black uppercase tracking-[0.4em] italic shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:bg-blue-600 transition-all transform active:scale-95 group">
                            <TrendingUp size={20} className="group-hover:animate-bounce" /> STRATEGIC_BUDGET_RECON
                        </button>
                    </div>
                </div>
            </div>

            {/* Tactical KPI Buffer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 italic">
                {[
                    { label: 'Obligated Capacity (FY24)', value: '$42.5M', trend: '+12%_DELTA', subValue: 'Strategic Execution', icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Disbursement Volume (YTD)', value: '$28.2M', trend: '-4%_VAR', subValue: 'Yield Velocity', icon: DollarIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Contractual Buffer', value: '$5.8M', trend: 'STABLE_NODE', subValue: 'Pending Commitments', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Operational Variance', value: '+2.4%', trend: 'OPTIMAL_VAR', subValue: 'Efficiency Metric', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' }
                ].map((stat, i) => (
                    <div key={i} className="pro-card p-10 group transition-all border-2 border-slate-950 bg-white relative overflow-hidden shadow-2xl hover:-translate-y-2">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rotate-45 translate-x-16 -translate-y-16 group-hover:bg-blue-50 transition-colors" />
                        <div className="flex justify-between items-start mb-10 relative z-10 italic">
                            <div className={`p-4 rounded-none ${stat.bg} ${stat.color} border-2 border-current/10 shadow-lg group-hover:scale-110 transition-transform`}>
                                <stat.icon size={28} />
                            </div>
                            <span className="text-[10px] font-black font-mono text-slate-950 px-4 py-2 border-2 border-slate-950 uppercase tracking-widest italic bg-white shadow-[4px_4px_0_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-slate-400 text-[12px] font-black uppercase tracking-[0.4em] mb-3 italic leading-none">{stat.label}</p>
                        <p className="text-4xl font-black font-mono tracking-tighter text-slate-950 leading-none italic uppercase group-hover:text-blue-600 transition-colors">{stat.value}</p>
                        <div className="mt-8 pt-8 border-t-2 border-slate-100 flex items-center justify-between italic relative z-10">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic">{stat.subValue}</span>
                            <ArrowUpRight size={20} className="text-slate-300 group-hover:text-blue-600 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 italic">
                 {/* Appropriation Flow Matrix */}
                 <div className="pro-card shadow-[0_0_80px_rgba(0,0,0,0.1)] border-2 border-slate-950 bg-white group/chart">
                    <div className="px-10 py-6 bg-slate-950 border-b-2 border-slate-800 flex items-center justify-between italic">
                        <div className="flex items-center gap-5">
                            <Activity size={24} className="text-blue-500 animate-pulse" />
                            <span className="text-[14px] font-black uppercase tracking-[0.6em] text-white italic">Appropriation Flux & Variance Terminal</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-1 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">BUDGET_BASELINE</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">ACTUAL_YIELD</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[450px] p-10 pt-16 relative">
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 0), linear-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px'}} />
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" strokeWidth={2} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#0f172a', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em'}} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#0f172a', fontSize: 10, fontWeight: 900, letterSpacing: '0.1em'}} tickFormatter={(val) => `$${val/1000}k`} />
                                <Tooltip 
                                    cursor={{stroke: '#0f172a', strokeWidth: 2}}
                                    contentStyle={{backgroundColor: '#020617', border: '2px solid #1e293b', borderRadius: '0', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: '#fff', letterSpacing: '0.2em', padding: '12px'}}
                                    itemStyle={{padding: '4px 0'}}
                                />
                                <Area type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorActual)" animationDuration={2000} />
                                <Area type="monotone" dataKey="budget" stroke="#2563eb" strokeWidth={4} strokeDasharray="8 8" fillOpacity={1} fill="url(#colorBudget)" animationDuration={2500} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Program Allocation Strategy */}
                <div className="pro-card shadow-[0_0_80px_rgba(0,0,0,0.1)] border-2 border-slate-950 bg-white group/alloc">
                    <div className="px-10 py-6 bg-slate-950 border-b-2 border-slate-800 flex items-center justify-between italic">
                        <div className="flex items-center gap-5">
                            <PieIcon size={24} className="text-emerald-500" />
                            <span className="text-[14px] font-black uppercase tracking-[0.6em] text-white italic">Strategic Program Diversification Matrix</span>
                        </div>
                        <span className="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] italic leading-none">BUREAU-ARCHIVE-L9_SECURE</span>
                    </div>
                    <div className="h-[450px] p-12 flex items-start gap-16 italic relative">
                         <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}} />
                         <div className="flex-grow w-1/2 h-full italic relative z-10 transition-transform duration-700 group-hover/alloc:scale-105">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { name: 'Civil Works', value: 4500000 },
                                    { name: 'Military', value: 3200000 },
                                    { name: 'RE Ops', value: 1200000 },
                                    { name: 'Emergencies', value: 800000 }
                                ]} layout="vertical" margin={{ left: -10 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#0f172a', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em'}} width={120} />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32} animationDuration={1500}>
                                        {COLORS.map((color, index) => (
                                            <Cell key={`cell-${index}`} fill={color} className="hover:opacity-80 transition-all cursor-cell" />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                         </div>
                         <div className="space-y-12 w-1/2 pr-6 pt-6 italic relative z-10">
                             {[
                                { name: 'Civil Works', amount: '4.5M', percent: 45, color: 'bg-blue-600', icon: Landmark },
                                { name: 'Military', amount: '3.2M', percent: 32, color: 'bg-emerald-500', icon: ShieldCheck },
                                { name: 'RE Ops', amount: '1.2M', percent: 12, color: 'bg-amber-500', icon: Database },
                             ].map((p, i) => (
                                 <div key={i} className="flex flex-col group/item italic hover:translate-x-2 transition-transform duration-300">
                                     <div className="flex justify-between items-end mb-4 italic">
                                         <div className="flex items-center gap-4 text-[12px] font-black text-slate-950 uppercase tracking-[0.2em] italic">
                                            <p.icon size={18} className="text-slate-300" />
                                            {p.name.replace(' ', '_')}
                                         </div>
                                         <span className="text-[14px] font-black text-slate-950 font-mono italic tracking-tighter leading-none">${p.amount}</span>
                                     </div>
                                     <div className="w-full bg-slate-50 border-2 border-slate-200 h-4 rounded-none overflow-hidden italic shadow-inner p-0.5">
                                         <div className={`h-full ${p.color} transition-all duration-1000 shadow-[0_0_15px_rgba(0,0,0,0.1)] group-hover/item:animate-pulse`} style={{width: `${p.percent}%`}}></div>
                                     </div>
                                 </div>
                             ))}
                             <button className="w-full py-5 border-2 border-slate-950 text-slate-950 text-[11px] font-black uppercase tracking-[0.6em] hover:bg-slate-950 hover:text-white transition-all italic active:translate-y-1 mt-4">
                                CALIBRATE_STRATEGIC_NODES
                             </button>
                         </div>
                    </div>
                </div>
            </div>

            {/* Strategic Financial Ledger */}
            <div className="pro-card shadow-2xl border-2 border-slate-950 bg-white">
                <div className="px-10 py-6 bg-slate-950 border-b-2 border-slate-800 flex items-center justify-between italic">
                    <div className="flex items-center gap-5">
                        <Database size={24} className="text-blue-500 animate-pulse" />
                        <span className="text-[14px] font-black uppercase tracking-[0.6em] text-white italic">Cross-Portfolio Resource Ledger Node</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="h-4 w-4 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse rotate-45" />
                        <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.5em] italic leading-none">CEFMS-SYNC: SECURE-L9_AUTH</span>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left italic border-collapse">
                        <thead>
                            <tr className="bg-slate-950/95 border-b-2 border-slate-800 italic">
                                <th className="px-10 py-8 text-[11px] font-black text-white/40 uppercase tracking-[0.4em] border-r border-white/5">ASSET_RPUID // STRATEGIC_VECTOR</th>
                                <th className="px-10 py-8 text-[11px] font-black text-white/40 uppercase tracking-[0.4em] border-r border-white/5">APPROPRIATION_NODE</th>
                                <th className="px-10 py-8 text-[11px] font-black text-white/40 uppercase tracking-[0.4em] border-r border-white/5 text-center">MATURITY_STATUS</th>
                                <th className="px-10 py-8 text-[11px] font-black text-white/40 uppercase tracking-[0.4em] border-r border-white/5">EPOCH_DATE</th>
                                <th className="px-10 py-8 text-[11px] font-black text-white/40 uppercase tracking-[0.4em] text-right">STRATEGIC_AMOUNT_USD</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-slate-100">
                            {FUND_TRANSACTIONS.map((ft, i) => {
                                const asset = USACE_ASSETS.find(a => a.id === ft.projectId || a.id === ft.workOrderId) || USACE_ASSETS[i % USACE_ASSETS.length];
                                return (
                                    <tr key={ft.id} onClick={() => navigate(`/usace/inventory/${asset.id}`)} className="group/row cursor-crosshair transition-all duration-300 hover:bg-slate-950">
                                        <td className="px-10 py-8 border-r-2 border-slate-50 group-hover/row:border-slate-800 relative overflow-hidden">
                                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 opacity-0 group-hover/row:opacity-100 transition-all transform -translate-x-full group-hover/row:translate-x-0" />
                                            <div className="flex flex-col italic">
                                                <span className="text-[18px] font-black text-slate-950 uppercase tracking-tighter group-hover/row:text-blue-400 transition-colors leading-none mb-3 group-hover/row:scale-105 origin-left duration-300">{asset.rpuid}</span>
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] truncate italic opacity-80 group-hover/row:opacity-100 group-hover/row:text-white/40">{asset.name.toUpperCase().replace(' ', '_')}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 border-r-2 border-slate-50 group-hover/row:border-slate-800">
                                            <div className="flex items-center gap-6 italic">
                                                 <div className="p-4 bg-slate-950 text-white rounded-none border border-white/10 group-hover/row:bg-blue-600 group-hover/row:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                                                    <Briefcase size={20} />
                                                </div>
                                                <div className="italic">
                                                    <div className="font-black text-slate-950 text-[13px] uppercase tracking-[0.2em] leading-none mb-2 group-hover/row:text-white">{ft.fundId.toUpperCase()}</div>
                                                    <div className="text-[10px] text-blue-600 font-black uppercase tracking-[0.4em] italic opacity-60 group-hover/row:opacity-100 group-hover/row:text-blue-300">O&M_CIVIL_OPERATIONS</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 border-r-2 border-slate-50 group-hover/row:border-slate-800 text-center">
                                            <div className="inline-block group-hover/row:scale-110 transition-transform">
                                                <StatusBadge status={ft.type} />
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 border-r-2 border-slate-50 group-hover/row:border-slate-800">
                                            <div className="flex items-center gap-4 text-slate-500 italic">
                                                <Calendar size={18} className="text-slate-300 group-hover/row:text-blue-500 group-hover/row:animate-pulse" />
                                                <span className="text-[12px] font-black font-mono uppercase tracking-widest group-hover/row:text-white">{ft.date.toUpperCase()}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right bg-slate-50 group-hover/row:bg-slate-950 border-l-2 border-transparent group-hover/row:border-white/10 transition-all">
                                            <div className="flex items-center justify-end gap-3 italic">
                                                <DollarIcon size={20} className="text-slate-300 group-hover/row:text-emerald-500 group-hover/row:animate-pulse" />
                                                <span className="text-[20px] font-black font-mono tracking-tighter uppercase text-slate-950 group-hover/row:text-emerald-400 group-hover/row:scale-110 origin-right duration-300">{ft.amount.toLocaleString()}.00</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="px-10 py-8 bg-slate-950 border-t-2 border-white/5 flex justify-between items-center text-[11px] font-black uppercase tracking-[0.8em] italic text-white/30 group">
                    <div className="flex items-center gap-5">
                        <ShieldCheck size={20} className="text-emerald-500 animate-pulse" />
                        AUTHENTICATED_SECURE_TRACE_ACTIVE::COMMAND_NODE_FINANCE_L9
                    </div>
                    <button className="text-[11px] font-black text-white hover:text-blue-400 opacity-60 hover:opacity-100 transition-all flex items-center gap-6 uppercase italic tracking-[0.4em] bg-white/5 px-8 py-3 outline outline-1 outline-white/10 hover:outline-blue-500/50">
                        Commit Strategic Fiscal Reconciliation <ArrowUpRight size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

