import React, { useState } from 'react';
import { Landmark, DollarSign as DollarIcon, Plus, Download, Filter, Search, ShieldCheck, Activity, BarChart3, GanttChart, FileCheck, Layers, AlertCircle, TrendingUp, Briefcase, Calculator, PieChart, ArrowUpRight } from 'lucide-react';
import { COST_CENTERS, PPBE_FUNDS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { StatusBadge } from '../../components/StatusBadge';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const RemisBudgeting: React.FC = () => {
    const [view, setView] = useState('ops');

    const chartData = COST_CENTERS.map(cc => ({ name: cc.name, value: cc.budget }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Operational Budgeting & Cost Centers</h1>
                        <RegulatoryBadge refs={['ER 37-1-30', 'OMB A-11']} />
                    </div>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Strategic allocation and tracking of operational budgets across USACE command districts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm shadow-sm transition-all">
                        <Download size={16} /> Budget Report
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <Calculator size={18} /> New Allocation
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 font-mono">
                            <PieChart size={18} className="text-blue-600" />
                            Cost Center Distribution
                        </h3>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                     contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '10px'}}
                                     itemStyle={{color: '#fff'}}
                                />
                            </RePieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {chartData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight truncate">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4 bg-slate-50/30 -mx-6 px-6 -mt-6">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 py-4">
                                <TrendingUp size={18} className="text-emerald-600" />
                                Strategic Center Performance
                            </h3>
                            <button className="text-[10px] font-bold text-blue-600 hover:underline">View All Centers</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {COST_CENTERS.map(cc => (
                                <div key={cc.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="text-[10px] font-bold text-blue-600 font-mono tracking-tighter uppercase">{cc.id}</p>
                                            <h4 className="font-bold text-slate-900 text-sm tracking-tight">{cc.name}</h4>
                                        </div>
                                        <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-blue-600 transition-colors">
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                            <span className="text-slate-400">Strategic Spent</span>
                                            <span className="text-slate-900">$ {cc.spent.toLocaleString()} / $ {cc.budget.toLocaleString()}</span>
                                        </div>
                                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-1000 ${cc.spent / cc.budget > 0.9 ? 'bg-red-500' : 'bg-blue-600'}`} 
                                                style={{width: `${(cc.spent / cc.budget) * 100}%`}}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">{cc.owner.charAt(0)}</div>
                                                <span className="text-[10px] font-bold text-slate-500">{cc.owner}</span>
                                            </div>
                                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${cc.spent / cc.budget > 0.9 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                {cc.spent / cc.budget > 0.9 ? 'Warning' : 'Balanced'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-3xl shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><Landmark size={120} className="text-white"/></div>
                        <div className="relative z-10">
                            <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">Budget Strategic Outlook</p>
                            <h3 className="text-white text-2xl font-bold tracking-tight mb-4">Command Reconciliation Required</h3>
                            <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-6">Aggregate FY24 budget execution is at 68%. Two cost centers are approaching authorized ceiling thresholds (90%+). Immediate CEFMS reconciliation advised for P00-Series appropriations.</p>
                            <div className="flex gap-4">
                                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">Analyze Variance</button>
                                <button className="px-6 py-2.5 bg-white/10 text-white rounded-xl font-bold text-xs hover:bg-white/20 transition-all backdrop-blur-md">Audit History</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                 <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Authoritative Cost Center Budget Analysis (Federal Compliance Grade)
                </div>
            </div>
        </div>
    );
};
