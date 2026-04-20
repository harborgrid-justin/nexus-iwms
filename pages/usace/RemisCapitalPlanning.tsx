import React, { useState } from 'react';
import { Landmark, DollarSign as DollarIcon, Plus, Download, Filter, Search, Activity, GanttChart, BarChart3, ShieldCheck, MapPin, Calendar, Clock, Building2, Hammer, ClipboardList, TrendingUp } from 'lucide-react';
import { CAPITAL_PLAN, USACE_ASSETS, CAPITAL_PROJECTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisCapitalPlanning: React.FC = () => {
    const [view, setView] = useState('planning');

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-950 rounded shadow-lg shadow-black/10 text-white">
                        <Hammer size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">Capital & Strategic Infrastructure</h1>
                            <div className="pulse-mission" />
                            <RegulatoryBadge refs={['ER 1110-2-1150', '33 U.S.C. 2211']} />
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 italic">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">Command Planning • Rehabilitation • Strategic Growth</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter">Multi-Domain Infrastructure Command</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                        <Download size={14} className="group-hover:text-blue-500" /> 5-Year Master Export
                    </button>
                    <button className="btn-pro-primary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-[0.2em] italic">
                        <Plus size={14} /> Initiate Program Node
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="pro-card p-6 flex flex-col group hover:border-blue-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><Hammer size={18}/></div>
                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-100 uppercase tracking-widest italic">STRATEGIC_READY</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Active Strategic Projects</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{CAPITAL_PROJECTS.length}</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[65%]" />
                    </div>
                </div>
                <div className="pro-card p-6 flex flex-col group hover:border-emerald-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><TrendingUp size={18}/></div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-widest italic">FY25-FY29_WINDOW</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Planned Capital Investment</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">$45.2M</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 w-[82%]" />
                    </div>
                </div>
                <div className="pro-card p-6 flex flex-col group hover:border-amber-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><ClipboardList size={18}/></div>
                        <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-100 uppercase tracking-widest italic">PRIORITY_ALPHA</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Deferred Tactical Requirements</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">12_NODES</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[40%]" />
                    </div>
                </div>
            </div>

            <div className="pro-card overflow-hidden flex flex-col bg-white">
                <div className="px-6 border-b border-slate-100 bg-[#0A0A0B] flex justify-between items-center">
                    <nav className="-mb-px flex gap-10">
                        {[
                            { id: 'planning', label: 'Strategic Plan (FY25-29)' },
                            { id: 'active', label: 'Active Major Executions' }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setView(tab.id)} 
                                className={`shrink-0 border-b-2 px-1 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all italic ${view === tab.id ? 'border-blue-600 text-blue-400 opacity-100' : 'border-transparent text-white/30 hover:text-white/60 hover:border-white/10'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                    <div className="hidden md:flex items-center gap-3">
                         <Search size={14} className="text-white/20" />
                         <input type="text" placeholder="FILTER_COMMAND_PROJECTS..." className="bg-transparent border-none text-[10px] font-bold text-white/40 uppercase tracking-widest outline-none focus:text-white transition-colors w-40" />
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    {view === 'planning' && (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 pro-col-header">COMMAND_PROJECT_NODE</th>
                                    <th className="px-6 py-4 pro-col-header">STRATEGIC_ASSET (RPUID)</th>
                                    <th className="px-6 py-4 pro-col-header">WINDOW_FY</th>
                                    <th className="px-6 py-4 pro-col-header text-right">PROJECTED_STRATEGIC_VALUE</th>
                                    <th className="px-6 py-4 pro-col-header text-right">LIFECYCLE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {CAPITAL_PLAN.map((plan, i) => {
                                    const asset = USACE_ASSETS[i % USACE_ASSETS.length];
                                    return (
                                        <tr key={plan.id} className="pro-data-row group">
                                            <td className="px-6 py-5">
                                                <div className="font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-tight text-[12px]">{plan.projectName}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <Link to={`/usace/inventory/${asset.id}`} className="text-[11px] font-black text-blue-600 hover:text-amber-500 font-mono tracking-tighter uppercase italic py-1 px-2.5 bg-blue-50 border border-blue-100 rounded-sm inline-block transition-all">{asset.rpuid}</Link>
                                            </td>
                                            <td className="px-6 py-5 font-black text-slate-600 font-mono text-[11px] italic">FY{plan.fiscalYear}</td>
                                            <td className="px-6 py-5 text-right font-mono font-black text-slate-900 group-hover:text-emerald-600 text-[13px] tracking-tighter">
                                                <div className="flex items-center justify-end gap-2">
                                                    <DollarIcon size={14} className="text-slate-300" />
                                                    ${plan.projectedCost.toLocaleString()}.00
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right flex justify-end">
                                                <StatusBadge status={plan.fundingStatus} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    {view === 'active' && (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 pro-col-header">ACTIVE_EXECUTION_NODE</th>
                                    <th className="px-6 py-4 pro-col-header">STRATEGIC_ASSET</th>
                                    <th className="px-6 py-4 pro-col-header">EXECUTION_VELOCITY</th>
                                    <th className="px-6 py-4 pro-col-header text-right">COMMAND_AUTHORIZED</th>
                                    <th className="px-6 py-4 pro-col-header text-right">LIFECYCLE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {CAPITAL_PROJECTS.map(proj => {
                                     const asset = USACE_ASSETS.find(a => a.id === proj.propertyId) || USACE_ASSETS[0];
                                     return (
                                        <tr key={proj.id} className="pro-data-row group">
                                            <td className="px-6 py-5">
                                                <div className="font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-tight text-[12px] leading-tight">{proj.name}</div>
                                                <div className="text-[9px] font-black text-blue-600/60 font-mono tracking-tighter uppercase mt-1 italic">STRAT_EXEC::{proj.id}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <Link to={`/usace/inventory/${asset.id}`} className="text-[11px] font-black text-slate-500 hover:text-blue-600 font-mono tracking-tighter uppercase bg-slate-50 border border-slate-100 px-2 py-1 rounded-sm">{asset.rpuid}</Link>
                                            </td>
                                            <td className="px-6 py-5 min-w-[200px]">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] italic">VELOCITY</span>
                                                    <span className="text-[11px] font-black text-slate-900 font-mono tracking-tighter">{Math.round((proj.spent / proj.totalBudget) * 100)}%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden border border-slate-200/50">
                                                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{width: `${(proj.spent / proj.totalBudget) * 100}%`}}></div>
                                                </div>
                                            </td>
                                             <td className="px-6 py-5 text-right font-mono font-black text-slate-900 text-[13px] tracking-tighter">
                                                <div className="flex items-center justify-end gap-2">
                                                    <DollarIcon size={14} className="text-slate-300" />
                                                    ${(proj.totalBudget / 1000000).toFixed(1)}M
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right flex justify-end">
                                                <StatusBadge status={proj.status} />
                                            </td>
                                        </tr>
                                     );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                 <div className="px-6 py-5 bg-slate-950 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] italic flex items-center gap-3">
                        <ShieldCheck size={14} className="text-blue-400" />
                        Authoritative Multi-Year Strategic Infrastructure Plan Verified by Command Center
                    </span>
                    <span className="text-[9px] font-bold text-blue-500/60 uppercase font-mono">SYS_READY_V7.2</span>
                </div>
            </div>
        </div>
    );
};
