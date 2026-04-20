import React, { useState } from 'react';
import { CAPITAL_PROJECTS, PROPERTIES, EMPLOYEES, PPBE_FUNDS, FUND_TRANSACTIONS } from '../services/mockData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { ShieldAlert, Database, ArrowUpRight, Terminal, LayoutDashboard, Plus, Search, Filter, HardHat, Compass, Activity, Banknote, Calendar, Info, Settings, MoreHorizontal } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void}) => (
    <button 
        onClick={onClick} 
        className={`shrink-0 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm ${isActive ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
    >
        {label}
    </button>
);

export const CapitalProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(CAPITAL_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState('overview');

  const totalVariance = selectedProject.spent - selectedProject.totalBudget;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Capital Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <HardHat size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Capital Infrastructure Lifecycle</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Investment Command</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Project Horizon: FY24-FY30</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search Projects / RPUID / PM..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Initialize Project
            </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-[600px]">
        {/* Investment Ledger Sidebar */}
        <div className="col-span-12 lg:col-span-4 pro-card flex flex-col overflow-hidden">
            <div className="pro-card-header bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <Database size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Global Project Registry</span>
                </div>
                <button className="text-slate-300 hover:text-slate-500"><Filter size={14}/></button>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar divide-y divide-slate-100">
                {CAPITAL_PROJECTS.map(p => {
                    const property = PROPERTIES.find(prop => prop.id === p.propertyId);
                    const progress = (p.spent / p.totalBudget) * 100;
                    return (
                        <button 
                            key={p.id} 
                            onClick={() => { setSelectedProject(p); setActiveTab('overview'); }} 
                            className={`w-full text-left p-4 hover:bg-slate-50 transition-colors group relative ${selectedProject.id === p.id && 'bg-blue-50/50 border-r-2 border-r-blue-600'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-tight truncate group-hover:text-blue-600 transition-colors pr-4">{p.name}</h3>
                                <StatusBadge status={p.status} />
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                <span className="flex items-center gap-1"><Compass size={10} className="text-blue-500" /> {property?.name}</span>
                                <span className="px-1 border border-slate-200 rounded-sm font-mono tracking-tighter">{p.id}</span>
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-end text-[9px] font-bold uppercase tracking-widest">
                                    <span className="text-slate-400">Yield Progress</span>
                                    <span className="text-slate-900 font-mono italic">${(p.spent / 1000).toFixed(0)}K / ${(p.totalBudget / 1000).toFixed(0)}K</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-sm overflow-hidden">
                                    <div className="bg-blue-600 h-full transition-all duration-1000" style={{width: `${Math.min(progress, 100)}%`}}></div>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">Aggregate Investment Load Established</span>
            </div>
        </div>

        {/* Project Intelligence Command */}
        <div className="col-span-12 lg:col-span-8 pro-card flex flex-col overflow-hidden">
            <div className="pro-card-header !bg-white border-b-slate-100">
                <div className="flex items-center gap-3">
                    <div className={`p-1 bg-slate-900 rounded rounded-sm text-white`}>
                        <Activity size={14} />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-tight leading-none">{selectedProject.name}</h2>
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-1 italic">Strategic Asset: {PROPERTIES.find(prop => prop.id === selectedProject.propertyId)?.name}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-slate-300 hover:text-slate-500"><Settings size={14}/></button>
                    <button className="text-slate-300 hover:text-slate-500"><MoreHorizontal size={14}/></button>
                </div>
            </div>

            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
                <TabButton label="Operations Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                <TabButton label="Tactical Schedule" isActive={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} />
                <TabButton label="Asset Cashflow" isActive={activeTab === 'cashflow'} onClick={() => setActiveTab('cashflow')} />
                <TabButton label="Capital Funding" isActive={activeTab === 'funding'} onClick={() => setActiveTab('funding')} />
                <TabButton label="Change Registry" isActive={activeTab === 'changeorders'} onClick={() => setActiveTab('changeorders')} />
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-8 no-scrollbar bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px]">
                {activeTab === 'overview' && (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Inception Date', value: selectedProject.startDate, icon: Calendar },
                                { label: 'Contractual Close', value: selectedProject.endDate, icon: Calendar },
                                { label: 'Mission Lead', value: EMPLOYEES.find(e => e.id === selectedProject.manager)?.name, icon: Terminal },
                                { label: 'Fiscal Variance', value: `${totalVariance > 0 ? '-' : '+'}$${Math.abs(totalVariance).toLocaleString()}`, icon: Activity, color: totalVariance > 0 ? 'text-red-600' : 'text-emerald-600' }
                            ].map((met, i) => (
                                <div key={i} className="pro-card p-4 group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="p-1 px-1.5 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
                                            <met.icon size={12} />
                                        </div>
                                        <ArrowUpRight size={12} className="text-slate-200 group-hover:text-blue-500" />
                                    </div>
                                    <p className="data-label !text-[8px]">{met.label}</p>
                                    <p className={`text-[13px] font-black font-mono tracking-tighter uppercase truncate ${met.color || 'text-slate-950'}`}>{met.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="pro-card p-6">
                                <div className="flex items-center gap-2 mb-8">
                                    <Activity size={14} className="text-blue-600" />
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Budget vs. Actual Matrix</span>
                                </div>
                                <div className="h-64 pt-6">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={selectedProject.budgetItems?.map(item => ({ name: item.category, Budgeted: item.budgeted, Actual: item.actual })) || []}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 8, fill: '#94a3b8', fontWeight: 700}} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 8, fill: '#94a3b8', fontWeight: 700}} tickFormatter={(val) => `$${(val/1000)}k`} />
                                            <Tooltip cursor={{fill: 'rgba(241, 245, 249, 0.5)'}} contentStyle={{backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '9px'}} />
                                            <Bar dataKey="Budgeted" fill="#E2E8F0" radius={[2, 2, 0, 0]} barSize={16} />
                                            <Bar dataKey="Actual" fill="#2563EB" radius={[2, 2, 0, 0]} barSize={16} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="pro-card">
                                <div className="pro-card-header bg-slate-50/50">
                                    <div className="flex items-center gap-2">
                                        <ShieldAlert size={14} className="text-blue-500" />
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Milestone Integrity Buffer</span>
                                    </div>
                                    <Info size={14} className="text-slate-300" />
                                </div>
                                <div className="p-4 space-y-2">
                                    {selectedProject.milestones?.map(m => (
                                        <div key={m.id} className="p-2.5 bg-slate-50/50 border border-slate-100 rounded group flex justify-between items-center transition-colors hover:border-blue-200">
                                            <div>
                                                <p className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">{m.name}</p>
                                                <p className="text-[9px] font-mono text-slate-400 mt-0.5 italic uppercase tracking-widest">Due Window: {m.dueDate}</p>
                                            </div>
                                            <StatusBadge status={m.status} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'schedule' && (
                    <div className="h-full flex flex-col">
                        <div className="bg-slate-50 border border-slate-200 rounded border-dashed flex-grow flex flex-col items-center justify-center text-slate-300 gap-4">
                            <LayoutDashboard size={40} className="opacity-10" />
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30">Initialize Critical Path Engine</span>
                        </div>
                    </div>
                )}

                {activeTab === 'funding' && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Banknote size={14} className="text-emerald-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Capital Ledger Stream</span>
                        </div>
                        {FUND_TRANSACTIONS.filter(ft => ft.projectId === selectedProject.id).map(ft => {
                            const fund = PPBE_FUNDS.find(f => f.id === ft.fundId);
                            return (
                                <div key={ft.id} className="p-4 bg-white border border-slate-100 rounded-sm hover:border-emerald-200 transition-all flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-sm bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                                            <Banknote size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black uppercase text-slate-900 font-mono italic">{ft.type}: ${ft.amount.toLocaleString()}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Vector: {fund?.name} | {ft.date}</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={14} className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            
            <div className="p-3 bg-slate-950 text-white italic text-center">
                <button className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-blue-400 transition-colors">
                    Initialize Full Integrity Sync
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
