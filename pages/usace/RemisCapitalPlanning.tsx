import React, { useState } from 'react';
import { Landmark, DollarSign as DollarIcon, Plus, Download, Filter, Search, Activity, GanttChart, BarChart3, ShieldCheck, MapPin, Calendar, Clock, Building2, Hammer, ClipboardList, TrendingUp } from 'lucide-react';
import { CAPITAL_PLAN, USACE_ASSETS, CAPITAL_PROJECTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisCapitalPlanning: React.FC = () => {
    const [view, setView] = useState('planning');

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Capital Planning & Strategic Infrastructure</h1>
                        <RegulatoryBadge refs={['ER 1110-2-1150', '33 U.S.C. 2211']} />
                    </div>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Authoritative long-term planning for major infrastructure rehabilitation and new strategic construction.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm shadow-sm transition-all">
                        <Download size={16} /> 5-Year Plan Export
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <Plus size={18} /> Initiate Program Case
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-blue-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20"><Hammer size={20}/></div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Strategic Phase</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Major Projects</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{CAPITAL_PROJECTS.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-emerald-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20"><TrendingUp size={20}/></div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">FY25-FY29</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Planned Investment</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">$45.2M</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-amber-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/20"><ClipboardList size={20}/></div>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Priority Alpha</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Deferred Requirements</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">12 Actions</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 border-b border-slate-200 bg-slate-50/30 flex justify-between items-center">
                    <nav className="-mb-px flex gap-8">
                        <button onClick={() => setView('planning')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${view === 'planning' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Strategic Master Plan (FY25-29)</button>
                        <button onClick={() => setView('active')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${view === 'active' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Current Major Executions</button>
                    </nav>
                </div>

                <div className="overflow-x-auto">
                    {view === 'planning' && (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Command Project Name</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Strategic Asset (RPUID)</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Target FY</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Projected Strategic Value</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Funding Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {CAPITAL_PLAN.map((plan, i) => {
                                    const asset = USACE_ASSETS[i % USACE_ASSETS.length];
                                    return (
                                        <tr key={plan.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-5 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{plan.projectName}</td>
                                            <td className="px-6 py-5">
                                                <Link to={`/usace/inventory/${asset.id}`} className="text-[11px] font-bold text-blue-600 hover:underline font-mono tracking-tighter uppercase">{asset.rpuid}</Link>
                                            </td>
                                            <td className="px-6 py-5 font-bold text-slate-600 font-mono text-xs">FY{plan.fiscalYear}</td>
                                            <td className="px-6 py-5 text-right font-mono font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                                <div className="flex items-center justify-end gap-1">
                                                    <DollarIcon size={12} className="text-slate-300" />
                                                    ${plan.projectedCost.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <StatusBadge status={plan.fundingStatus} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    {view === 'active' && (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Active Strategic Execution</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Strategic Asset</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Lifecycle Progress</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Command Authorized</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {CAPITAL_PROJECTS.map(proj => {
                                     const asset = USACE_ASSETS.find(a => a.id === proj.propertyId) || USACE_ASSETS[0];
                                     return (
                                        <tr key={proj.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{proj.name}</div>
                                                <div className="text-[10px] font-bold text-blue-600 font-mono tracking-tighter uppercase mt-1">{proj.id}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <Link to={`/usace/inventory/${asset.id}`} className="text-[11px] font-bold text-slate-600 hover:text-blue-600 font-mono tracking-tighter uppercase">{asset.rpuid}</Link>
                                            </td>
                                            <td className="px-6 py-5 min-w-[200px]">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Execution Rate</span>
                                                    <span className="text-[10px] font-bold text-slate-900">{Math.round((proj.spent / proj.totalBudget) * 100)}%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600 rounded-full" style={{width: `${(proj.spent / proj.totalBudget) * 100}%`}}></div>
                                                </div>
                                            </td>
                                             <td className="px-6 py-5 text-right font-mono font-bold text-slate-900">
                                                <div className="flex items-center justify-end gap-1">
                                                    <DollarIcon size={12} className="text-slate-300" />
                                                    ${(proj.totalBudget / 1000000).toFixed(1)}M
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <StatusBadge status={proj.status} />
                                            </td>
                                        </tr>
                                     );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                 <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Authoritative Multi-Year Strategic Infrastructure Plan
                </div>
            </div>
        </div>
    );
};
