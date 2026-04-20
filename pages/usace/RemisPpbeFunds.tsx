import React, { useState } from 'react';
import { Landmark, DollarSign as DollarIcon, Plus, Download, Filter, Search, ShieldCheck, Activity, BarChart3, GanttChart, FileCheck, Layers, AlertCircle, TrendingUp, Briefcase } from 'lucide-react';
import { PPBE_FUNDS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisPpbeFunds: React.FC = () => {
    const [activeCycle, setActiveCycle] = useState('execution');

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PPBE Fund Management & Programming</h1>
                        <RegulatoryBadge refs={['ER 37-1-30', 'Title 31']} />
                    </div>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Strategic orchestration of Planning, Programming, Budgeting, and Execution cycles for Real Property.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm shadow-sm transition-all">
                        <Download size={16} /> POM Export
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <Plus size={18} /> New Appropriation
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { id: 'planning', label: '1. Planning', icon: <Layers size={18}/>, status: 'Completed', color: 'blue' },
                    { id: 'programming', label: '2. Programming', icon: <BarChart3 size={18}/>, status: 'In Review', color: 'indigo' },
                    { id: 'budgeting', label: '3. Budgeting', icon: <Briefcase size={18}/>, status: 'Authorized', color: 'emerald' },
                    { id: 'execution', label: '4. Execution', icon: <Activity size={18}/>, status: 'Active (Current)', color: 'blue' }
                ].map((cycle) => (
                    <button 
                        key={cycle.id}
                        onClick={() => setActiveCycle(cycle.id)}
                        className={`p-6 rounded-3xl border transition-all text-left relative overflow-hidden group ${activeCycle === cycle.id ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20' : 'bg-white border-slate-200 text-slate-400 hover:border-blue-200'}`}
                    >
                        <div className={`p-3 rounded-2xl mb-4 w-fit ${activeCycle === cycle.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'} group-hover:scale-110 transition-transform`}>
                            {cycle.icon}
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{cycle.label}</p>
                        <p className={`text-xs font-bold ${activeCycle === cycle.id ? 'text-slate-400' : 'text-slate-500'}`}>{cycle.status}</p>
                        {activeCycle === cycle.id && <div className="absolute top-4 right-4"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div></div>}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <GanttChart size={18} className="text-blue-600" />
                            Strategic Programming Timeline (FY25-FY29)
                        </h3>
                        <div className="space-y-4">
                            {[
                                { fy: 'FY25', phase: 'Current Budget Execution', progress: 85 },
                                { fy: 'FY26', phase: 'OMB Submission Phase', progress: 40 },
                                { fy: 'FY27', phase: 'POM Development', progress: 10 },
                                { fy: 'FY28', phase: 'Planning Guidance', progress: 5 },
                            ].map((p, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono font-bold text-slate-400 text-xs">{p.fy}</span>
                                            <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">{p.phase}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-500">{p.progress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{width: `${p.progress}%`}}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <AlertCircle size={18} className="text-amber-500" />
                            Unfunded Requirements (UFRs) - Priority Alpha
                        </h3>
                        <div className="space-y-3">
                            {[
                                { title: 'Emergency Flood Wall Armor', cost: '1.2M', priority: 'Critical', category: 'Civil Works' },
                                { title: 'Barracks Energy Retrofit', cost: '850K', priority: 'High', category: 'Military' },
                                { title: 'GIS Hub Multi-Domain Integration', cost: '400K', priority: 'Medium', category: 'Tech' },
                            ].map((ufr, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${ufr.priority === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{ufr.title}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{ufr.category}</p>
                                        </div>
                                    </div>
                                    <p className="font-mono font-bold text-slate-900 text-xs">$ {ufr.cost}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
                        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">Active Appropriation Registry</h2>
                        <button className="p-2 text-slate-400 hover:text-slate-600"><Filter size={18}/></button>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        <div className="divide-y divide-slate-100">
                             {PPBE_FUNDS.map(fund => (
                                <div key={fund.id} className="p-6 hover:bg-blue-50/30 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="text-[10px] font-bold text-blue-600 font-mono tracking-tighter uppercase mb-1">{fund.id}</div>
                                            <h4 className="text-sm font-bold text-slate-900 tracking-tight">{fund.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{fund.appropriationType} • {fund.programElement}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-slate-900">FY{fund.fiscalYear}</p>
                                            <StatusBadge status="Authorized" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="bg-slate-50 p-3 rounded-2xl flex flex-col">
                                                <span className="text-[9px] text-slate-500 font-bold uppercase">Total</span>
                                                <span className="text-xs font-bold text-slate-900 font-mono">${(fund.totalAmount / 1000000).toFixed(1)}M</span>
                                            </div>
                                            <div className="bg-blue-50 p-3 rounded-2xl flex flex-col">
                                                <span className="text-[9px] text-blue-500 font-bold uppercase">Obligated</span>
                                                <span className="text-xs font-bold text-blue-900 font-mono">${(fund.obligated / 1000000).toFixed(1)}M</span>
                                            </div>
                                            <div className="bg-emerald-50 p-3 rounded-2xl flex flex-col">
                                                <span className="text-[9px] text-emerald-500 font-bold uppercase">Expended</span>
                                                <span className="text-xs font-bold text-emerald-900 font-mono">${(fund.expended / 1000000).toFixed(1)}M</span>
                                            </div>
                                        </div>
                                        <div className="relative pt-1">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div><span className="text-[10px] font-bold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">Execution Progress</span></div>
                                                <div className="text-right"><span className="text-xs font-bold inline-block text-blue-600">{Math.round((fund.expended / fund.totalAmount) * 100)}%</span></div>
                                            </div>
                                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-50">
                                                <div style={{ width: `${(fund.obligated / fund.totalAmount) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-300"></div>
                                                <div style={{ width: `${(fund.expended / fund.totalAmount) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 -ml-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             ))}
                        </div>
                    </div>
                    <div className="px-6 py-4 bg-slate-900 text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-3">
                         <FileCheck size={14} className="text-blue-400" />
                         Authoritative Congressional Appropriation Data
                    </div>
                </div>
            </div>
        </div>
    );
};
