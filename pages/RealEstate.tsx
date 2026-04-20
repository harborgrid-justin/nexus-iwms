import React, { useState } from 'react';
import { MapPin, Layout, List, Plus, MoreHorizontal, Wrench, Presentation, Building2, TrendingUp, DollarSign, Square, ArrowRight, Activity, Search, ShieldCheck, Database, Globe, ArrowUpRight } from 'lucide-react';
import { PROPERTIES, TRANSACTIONS, WORK_ORDERS, CAPITAL_PROJECTS } from '../services/mockData';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { StatusBadge } from '../components/StatusBadge';

const KanbanColumn = ({ title, transactions, color }: { title: string, transactions: any[], color: string }) => (
  <div className="flex-1 min-w-[260px]">
    <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
            <div className={`w-1 h-3 rounded-sm ${color}`}></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</span>
        </div>
        <span className="text-[9px] font-mono font-bold text-slate-400">[{transactions.length}]</span>
    </div>
    <div className="space-y-3">
      {transactions.map(t => (
        <div key={t.id} className="pro-card p-4 hover:border-blue-400 transition-all cursor-pointer group relative">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-slate-300 hover:text-slate-500"><MoreHorizontal size={14}/></button>
          </div>
          
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-widest border ${t.type === 'Acquisition' ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>{t.type}</span>
            <span className="text-[9px] font-mono font-bold text-slate-400">#{t.id}</span>
          </div>
          
          <p className="text-[12px] font-bold text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">Strategic {t.type} Case</p>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Property: <span className="font-mono text-blue-600">{t.propertyId}</span></p>
          
          <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
            <div>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Deal Value</p>
              <p className="text-[11px] font-bold text-slate-900 font-mono italic">${(t.dealValue/1000000).toFixed(1)}M</p>
            </div>
            <div className="text-right">
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Close Window</p>
              <p className="text-[11px] font-bold text-slate-600 font-mono">{t.closeDate}</p>
            </div>
          </div>
        </div>
      ))}
      {transactions.length === 0 && (
          <div className="py-10 border border-slate-100 border-dashed rounded flex flex-col items-center justify-center text-slate-300">
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">Zero active entries</span>
          </div>
      )}
    </div>
  </div>
);

export const RealEstate: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const portfolioStats = [
    { label: 'Portfolio Valuation', value: '$144.5M', trend: '+4.2%', icon: DollarSign, color: 'text-emerald-600' },
    { label: 'Global Occupancy', value: '88.5%', trend: '-1.2%', icon: Globe, color: 'text-blue-600' },
    { label: 'Strategic Footprint', value: '595k SF', trend: 'Stable', icon: Square, color: 'text-slate-600' },
    { label: 'Capital Pipeline', value: '$8.9M', trend: '3 Nodes', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const chartData = [
    { name: '2019', value: 92 }, { name: '2020', value: 95 }, { name: '2021', value: 94 },
    { name: '2022', value: 98 }, { name: '2023', value: 125 }, { name: '2024', value: 144 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Building2 size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Strategic Property Ledger</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Asset Inventory</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Audit Protocol: R-22-ALPHA</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search RPUID/Asset..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Register Asset
            </button>
        </div>
      </div>

      {/* KPI Stream */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioStats.map((stat, i) => (
          <div key={i} className="pro-card p-5 group transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
                <stat.icon size={16} />
              </div>
              <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${stat.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-50'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="data-label mb-1">{stat.label}</p>
            <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{stat.value}</p>
            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Global Aggregate</span>
                <ArrowUpRight size={12} className="text-slate-300 group-hover:text-blue-500" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Asset Terminal */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Database size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Asset Registry Terminal</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-100 rounded p-0.5">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><Layout size={14} /></button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}><List size={14} /></button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PROPERTIES.map(prop => (
                        <div key={prop.id} onClick={() => navigate(`/usace/inventory/${prop.id}`)} className="pro-card group cursor-pointer overflow-hidden hover:border-blue-400 transition-all">
                            <div className="h-40 relative">
                                <img src={prop.imageUrl} alt={prop.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-sm text-[9px] font-bold text-slate-900 border border-slate-200 uppercase tracking-widest">
                                    {prop.type}
                                </div>
                                <div className="absolute bottom-3 left-3 flex items-end gap-3 text-white">
                                    <div>
                                        <p className="text-[8px] font-bold uppercase tracking-widest text-white/50">RPUID</p>
                                        <p className="text-[11px] font-mono font-bold">{prop.id}</p>
                                    </div>
                                    <StatusBadge status={prop.status} />
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{prop.name}</h3>
                                    <div className="flex gap-1.5">
                                        <Wrench size={12} className="text-slate-300" />
                                        <Presentation size={12} className="text-slate-300" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-5">
                                    <MapPin size={10} className="text-blue-500" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate">{prop.address}</span>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-50 mb-4">
                                    <div>
                                        <p className="data-label !text-[8px]">Gross Area</p>
                                        <p className="text-[12px] font-black font-mono leading-none mt-1">{prop.sizeSqFt.toLocaleString()} <span className="text-[8px] font-normal font-sans">SF</span></p>
                                    </div>
                                    <div>
                                        <p className="data-label !text-[8px]">Occupancy</p>
                                        <p className="text-[12px] font-black font-mono leading-none mt-1">{prop.occupancyRate}%</p>
                                    </div>
                                    <div>
                                        <p className="data-label !text-[8px]">Valuation</p>
                                        <p className="text-[12px] font-black font-mono text-emerald-600 leading-none mt-1">${(prop.marketValue / 1000000).toFixed(1)}M</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-dashed border-slate-100">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Commands: 08</p>
                                    <ArrowUpRight size={14} className="text-slate-300 transition-colors group-hover:text-blue-500" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="pro-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-5 py-3 data-label">Operational Asset</th>
                                <th className="px-5 py-3 data-label">Type</th>
                                <th className="px-5 py-3 data-label">Market Value</th>
                                <th className="px-5 py-3 data-label">Utilization</th>
                                <th className="px-5 py-3 data-label text-right">Identifier</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 italic font-mono">
                            {PROPERTIES.map(prop => (
                                <tr key={prop.id} className="hover:bg-slate-50 transition-colors group" onClick={() => navigate(`/usace/inventory/${prop.id}`)}>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded border border-slate-200 overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all">
                                                <img src={prop.imageUrl} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-[12px] font-bold text-slate-900 not-italic uppercase tracking-tight">{prop.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 data-value opacity-60">{prop.type}</td>
                                    <td className="px-5 py-3 text-emerald-600 text-[12px] font-bold not-italic">${(prop.marketValue / 1000000).toFixed(2)}M</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 max-w-[60px] h-1 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500" style={{width: `${prop.occupancyRate}%`}} />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-900 not-italic">{prop.occupancyRate}%</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-right data-value text-slate-400">{prop.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

        {/* Intelligence Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="pro-card p-6 bg-slate-900 text-white relative border-none">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">Yield Intelligence</span>
                        <h3 className="text-3xl font-black font-mono tracking-tighter mt-1">$144.5M</h3>
                    </div>
                    <Activity size={18} className="text-emerald-400" />
                </div>
                
                <div className="h-40 -mx-2 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#valGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                    <div>
                        <p className="text-[8px] font-bold text-slate-500 uppercase">Cap Rate Avg</p>
                        <p className="text-[13px] font-bold font-mono">6.2%</p>
                    </div>
                    <div>
                        <p className="text-[8px] font-bold text-slate-500 uppercase">Portfolio NOI</p>
                        <p className="text-[13px] font-bold font-mono">$8.4M</p>
                    </div>
                </div>
                <button className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                    Download Full Performance Audit
                </button>
            </div>

            <div className="pro-card">
                <div className="pro-card-header">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Legal Compromise Security</span>
                    <ShieldCheck size={14} className="text-emerald-500" />
                </div>
                <div className="p-6">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={20} className="text-emerald-600" />
                            <div>
                                <p className="text-[14px] font-black font-mono leading-none italic">98.2%</p>
                                <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Policy Maturity</p>
                            </div>
                        </div>
                        <span className="text-[9px] font-mono font-bold text-slate-400">V.24.1</span>
                    </div>
                    
                    <div className="space-y-2">
                        <button className="w-full btn-pro-secondary text-[10px] py-2.5">Global Insurance Audit</button>
                        <button className="w-full btn-pro-secondary text-[10px] py-2.5 !border-dashed">Contractual Oversight</button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Strategic Pipeline Board */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Activity size={14} className="text-orange-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Command Acquisition Pipeline</span>
            </div>
            <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Full Lifecycle Ledger</button>
        </div>
        <div className="bg-slate-50/50 p-6 rounded border border-slate-100 overflow-x-auto no-scrollbar">
          <div className="flex gap-6 w-max pr-6">
              <KanbanColumn title="Strategic Prospecting" transactions={TRANSACTIONS.filter(t => t.stage === 'Prospecting')} color="bg-slate-300" />
              <KanbanColumn title="Due Diligence" transactions={TRANSACTIONS.filter(t => t.stage === 'Due Diligence')} color="bg-blue-500" />
              <KanbanColumn title="Strategic Negotiation" transactions={TRANSACTIONS.filter(t => t.stage === 'Negotiation')} color="bg-orange-500" />
              <KanbanColumn title="Final Closing" transactions={TRANSACTIONS.filter(t => t.stage === 'Closing')} color="bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
