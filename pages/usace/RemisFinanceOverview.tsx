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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-slate-950 rounded-sm text-white shadow-sm">
                            <Landmark size={16} />
                        </div>
                        <div className="flex items-center gap-3">
                           <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Strategic Fiscal Command Overview</h1>
                           <RegulatoryBadge refs={['ER 37-1-30', '14.2']} />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="data-label text-blue-600">Enterprise Capital Expenditure & Appropriation Control</span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Financial Authority: USACE-FIN-BUREAU</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="btn-pro-secondary flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <Download size={14} /> CEFMS Interface
                    </button>
                    <button className="btn-pro-primary flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <TrendingUp size={14} /> Budget Recon
                    </button>
                </div>
            </div>

            {/* Tactical KPI Buffer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Obligated Capacity (FY24)', value: '$42.5M', trend: '+12%', subValue: 'Strategic Execution', icon: Landmark, color: 'text-blue-500' },
                    { label: 'Disbursement Volume (YTD)', value: '$28.2M', trend: '-4%', subValue: 'Yield Velocity', icon: DollarIcon, color: 'text-emerald-500' },
                    { label: 'Contractual Buffer', value: '$5.8M', trend: 'STABLE', subValue: 'Pending Commitments', icon: Clock, color: 'text-amber-500' },
                    { label: 'Operational Variance', value: '+2.4%', trend: 'OPTIMAL', subValue: 'Efficiency Metric', icon: Activity, color: 'text-slate-900' }
                ].map((stat, i) => (
                    <div key={i} className="pro-card p-5 group transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
                                <stat.icon size={16} />
                            </div>
                            <span className="text-[9px] font-black font-mono text-slate-400 px-1.5 py-0.5 rounded border border-slate-100 uppercase tracking-tighter italic">
                                {stat.trend}
                            </span>
                        </div>
                        <p className="data-label mb-1">{stat.label}</p>
                        <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{stat.value}</p>
                        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest italic">{stat.subValue}</span>
                            <ArrowUpRight size={12} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Appropriation Flow Matrix */}
                 <div className="pro-card">
                    <div className="pro-card-header bg-slate-50/50">
                        <div className="flex items-center gap-2">
                            <Activity size={14} className="text-blue-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Appropriation Flux & Variance</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-1 bg-blue-600" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Budget</span>
                        </div>
                    </div>
                    <div className="h-[350px] p-6 pt-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorBudget" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 700}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 700}} tickFormatter={(val) => `$${val/1000}k`} />
                                <Tooltip 
                                    cursor={{stroke: '#e2e8f0', strokeWidth: 1}}
                                    contentStyle={{backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '10px'}}
                                />
                                <Area type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="transparent" />
                                <Area type="monotone" dataKey="budget" stroke="#2563eb" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorBudget)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Program Allocation Strategy */}
                <div className="pro-card">
                    <div className="pro-card-header bg-slate-50/50">
                        <div className="flex items-center gap-2">
                            <PieIcon size={14} className="text-emerald-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Strategic Program Diversification</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">BUREAU-ARCHIVE-L4</span>
                    </div>
                    <div className="h-[350px] p-6 flex items-start gap-8">
                         <div className="flex-grow w-1/2 h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                    { name: 'Civil Works', value: 4500000 },
                                    { name: 'Military', value: 3200000 },
                                    { name: 'RE Ops', value: 1200000 },
                                    { name: 'Emergencies', value: 800000 }
                                ]} layout="vertical" margin={{ left: -30 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 700}} width={100} />
                                    <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={20}>
                                        {COLORS.map((color, index) => (
                                            <Cell key={`cell-${index}`} fill={color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                         </div>
                         <div className="space-y-5 w-1/2 pr-4 pt-4">
                             {[
                                { name: 'Civil Works', amount: '4.5M', percent: 45, color: 'bg-blue-600' },
                                { name: 'Military', amount: '3.2M', percent: 32, color: 'bg-emerald-500' },
                                { name: 'RE Ops', amount: '1.2M', percent: 12, color: 'bg-amber-500' },
                             ].map((p, i) => (
                                 <div key={i} className="flex flex-col group">
                                     <div className="flex justify-between items-center mb-2">
                                         <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{p.name}</span>
                                         <span className="text-[10px] font-bold text-slate-400 font-mono italic">${p.amount}</span>
                                     </div>
                                     <div className="w-full bg-slate-50 border border-slate-100 h-1.5 rounded-full overflow-hidden">
                                         <div className={`h-full ${p.color} rounded-full transition-all duration-1000`} style={{width: `${p.percent}%`}}></div>
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                </div>
            </div>

            {/* Strategic Financial Ledger */}
            <div className="pro-card overflow-hidden">
                <div className="pro-card-header bg-slate-50/50">
                    <div className="flex items-center gap-2">
                        <Database size={14} className="text-blue-500" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Cross-Portfolio Resource Ledger</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">CEFMS-SYNC: SECURE-L6</span>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30 border-b border-slate-100 italic">
                                <th className="px-6 py-3 data-label">Asset RPUID / Strategic Vector</th>
                                <th className="px-6 py-3 data-label">Appropriation Node</th>
                                <th className="px-6 py-3 data-label">Maturity Status</th>
                                <th className="px-6 py-3 data-label">Epoch Date</th>
                                <th className="px-6 py-3 data-label text-right">Strategic Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 italic font-mono uppercase tracking-tighter">
                            {FUND_TRANSACTIONS.map((ft, i) => {
                                const asset = USACE_ASSETS.find(a => a.id === ft.projectId || a.id === ft.workOrderId) || USACE_ASSETS[i % USACE_ASSETS.length];
                                return (
                                    <tr key={ft.id} className="hover:bg-slate-50 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-l-blue-600">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span onClick={() => navigate(`/usace/inventory/${asset.id}`)} className="text-[11px] font-black text-blue-600 not-italic uppercase tracking-tight group-hover:underline">{asset.rpuid}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest not-italic truncate italic mt-1">{asset.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                 <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-sm text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                                                    <Briefcase size={12} />
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-900 text-[11px] not-italic">{ft.fundId}</div>
                                                    <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest not-italic italic opacity-60">O&M Operations</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={ft.type} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <Clock size={12} className="text-slate-300" />
                                                <span className="text-[11px] font-bold opacity-70 not-italic uppercase group-hover:text-blue-600 transition-colors">{ft.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                            <div className="flex items-center justify-end gap-1.5 not-italic">
                                                <span className="text-[13px] font-black tracking-tighter">${ft.amount.toLocaleString()}</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-4 bg-slate-950 text-white italic text-center">
                    <button className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-blue-400 transition-colors flex items-center gap-2 mx-auto italic">
                        <ShieldCheck size={12} className="text-emerald-500" /> Commit Strategic Fiscal Reconciliation <ArrowUpRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};

