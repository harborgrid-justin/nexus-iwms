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
    <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-slate-950 rounded shadow-xl shadow-black/20 text-white">
                        <Calculator size={32} className="text-blue-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">Operational Budgeting & Cost Centers</h1>
                            <div className="pulse-mission" />
                            <RegulatoryBadge refs={['ER 37-1-30', 'OMB A-11']} />
                        </div>
                        <div className="flex items-center gap-3 mt-2 italic">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none">Command_Sourced_Strategic_Allocation_Matrix</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter italic">FIN_TRACE_ACTIVE::NODE_BUDGET</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-pro-secondary flex items-center gap-2 px-4 py-2 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                        <Download size={14} className="group-hover:text-blue-500" /> Fiscal_Report_GEN
                    </button>
                    <button className="btn-pro-primary flex items-center gap-2 px-6 py-2.5 h-auto text-[10px] font-black uppercase tracking-[0.2em] italic shadow-xl shadow-blue-500/20 active:scale-95">
                        <Calculator size={16} /> Register_New_Allocation
                    </button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-1 pro-card p-6 bg-white flex flex-col h-[450px] border-slate-200 shadow-xl italic font-black">
                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4 italic">
                    <h3 className="text-[11px] text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2 italic">
                        <PieChart size={16} className="text-blue-600" />
                        Appropriation Center Distribution
                    </h3>
                    <div className="text-[9px] font-mono text-slate-300">SEC_LEVEL::L6</div>
                </div>
                <div className="flex-1 w-full min-h-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity cursor-pointer" />
                                ))}
                            </Pie>
                            <Tooltip 
                                 contentStyle={{backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '2px', color: '#fff', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em'}}
                                 itemStyle={{color: '#fff'}}
                            />
                        </RePieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none italic">
                        <span className="text-[9px] text-slate-400 font-black tracking-widest uppercase">Total_Budget</span>
                        <span className="text-xl font-black text-slate-900 font-mono tracking-tighter">14.8M</span>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
                    {chartData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-3 group cursor-pointer transition-all">
                            <div className="w-1.5 h-1.5 rounded-none shadow-[0_0_5px_rgba(37,99,235,0.3)]" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                            <span className="text-[9px] font-black text-slate-500 group-hover:text-slate-900 uppercase tracking-tighter truncate italic">{entry.name.replace(' ', '_')}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6 italic">
                <div className="pro-card overflow-hidden bg-white border-slate-200 shadow-2xl">
                    <div className="px-6 py-4 bg-[#0A0A0B] border-b border-white/5 flex justify-between items-center italic">
                        <div className="flex items-center gap-3">
                            <TrendingUp size={16} className="text-emerald-400" />
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white italic">Strategic Sector Performance Telemetry</span>
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                             <button className="text-[9px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-all italic">GLOBAL_AUDIT_STREAM</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100">
                        {COST_CENTERS.map(cc => (
                            <div key={cc.id} className="p-6 bg-white group hover:bg-slate-950 transition-all cursor-pointer relative overflow-hidden italic">
                                <div className="flex justify-between items-start mb-6 italic">
                                    <div>
                                        <p className="text-[10px] font-mono font-black text-blue-600 group-hover:text-amber-400 uppercase tracking-tighter italic">SECTOR_NODE::{cc.id}</p>
                                        <h4 className="font-black text-slate-900 group-hover:text-white text-[12px] tracking-tighter uppercase leading-tight mt-1 italic">{cc.name}</h4>
                                    </div>
                                    <div className="p-2 border border-slate-100 group-hover:border-white/10 rounded-sm">
                                        <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest font-mono italic">
                                        <span className="text-slate-400 group-hover:text-white/30">UTILIZATION_MAGNITUDE</span>
                                        <span className="text-slate-900 group-hover:text-white transition-colors">
                                            <span className="text-blue-600 group-hover:text-blue-400">${cc.spent.toLocaleString()}</span>
                                            <span className="mx-1 opacity-20">/</span>
                                            <span className="opacity-40 font-bold">${cc.budget.toLocaleString()}</span>
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 group-hover:bg-white/5 h-2 rounded-none overflow-hidden italic">
                                        <div 
                                            className={`h-full transition-all duration-1000 shadow-2xl ${cc.spent / cc.budget > 0.9 ? 'bg-red-500 shadow-red-500/20' : 'bg-blue-600 shadow-blue-500/20'}`} 
                                            style={{width: `${(cc.spent / cc.budget) * 100}%`}}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 italic">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-slate-100 group-hover:bg-white/10 border border-slate-200 group-hover:border-white/5 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:text-white/60 uppercase transition-all shadow-sm">
                                                {cc.owner.charAt(0)}
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 group-hover:text-white/40 uppercase tracking-[0.2em] italic">{cc.owner}</span>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-none border shadow-sm transition-all ${cc.spent / cc.budget > 0.9 ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 group-hover:text-emerald-400 font-mono tracking-tighter italic'}`}>
                                            {cc.spent / cc.budget > 0.9 ? 'RECON_CRITICAL' : 'OPTIMAL_VAR'}
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-950 p-8 border border-white/10 shadow-2xl relative overflow-hidden group italic">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity translate-x-8 -translate-y-8">
                        <Landmark size={200} className="text-white"/>
                    </div>
                    <div className="relative z-10 italic">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck size={20} className="text-blue-500 animate-pulse-subtle" />
                            <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] italic mb-0.5">Budget_Strategic_Protocol::L6</p>
                        </div>
                        <h3 className="text-white text-2xl font-black tracking-tighter uppercase italic mb-6">Command Reconciliation Threshold Breached</h3>
                        <p className="text-white/50 text-[11px] font-black max-w-xl leading-relaxed mb-8 uppercase tracking-tighter italic">
                            Aggregate FY25 budget execution trajectory is currently established at 68.4%. 
                            Two high-priority command sectors are approaching critical authorization ceilings.
                            Strategic instruction: Execute immediate CEFMS reconciliation for P00-Series appropriations.
                        </p>
                        <div className="flex gap-4">
                            <button className="btn-pro-primary h-auto py-3 px-8 text-[10px] uppercase font-black tracking-[0.2em] italic shadow-xl shadow-blue-500/20">
                                ADVANCED_VARIANCE_ANALYSIS
                            </button>
                            <button className="btn-pro-secondary h-auto py-3 px-8 text-[10px] uppercase font-black tracking-[0.2em] italic bg-white/5 border-white/10 text-white hover:bg-white/10">
                                AUDIT_HISTORY_LOG
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="pro-card border-slate-200 overflow-hidden shadow-2xl font-black italic">
             <div className="px-6 py-5 bg-[#0A0A0B] border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] italic text-white/40">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    AUTHORITATIVE_FEDERAL_COMPLIANCE_GRADE_SYNC::ACTIVE
                </div>
                <div className="font-mono text-white/20 tracking-tighter italic uppercase text-[9px]">
                    TRACE_NODE::PROC_BUDGET_CMD_SYS
                </div>
            </div>
        </div>
    </div>
    );
};
