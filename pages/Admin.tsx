import React, { useState } from 'react';
import { USERS, AUDIT_LOGS, WORKFLOWS } from '../services/mockData';
import { User, ShieldCheck, Plus, Trash2, Zap, ShieldAlert, Activity, Database, Lock, Key, Search, Filter, ArrowRight, MoreHorizontal, Info, Briefcase, Monitor, Server, ArrowUpRight, Terminal, Settings, LayoutDashboard } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

const getRoleColor = (role: string) => {
  switch(role) {
    case 'Admin': return 'text-red-500 border-red-500/20 bg-red-500/5';
    case 'Project Manager':
    case 'Facility Manager': 
      return 'text-blue-500 border-blue-500/20 bg-blue-500/5';
    case 'Technician': return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
    case 'Financial Analyst': return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
    default: return 'text-slate-500 border-slate-500/20 bg-slate-500/5';
  }
}

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Admin Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <ShieldCheck size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">System Configuration & Governance</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Administration & Security Protocol</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Auth Status: LEVEL-7 ROA</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5">
                <Database size={14} /> System Config
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Provision Security Vector
            </button>
        </div>
      </div>

      {/* Tactical KPI Buffer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
            { label: 'System Reachability', value: '99.9%', trend: 'OPTIMAL', icon: Activity, color: 'text-emerald-500' },
            { label: 'Governance Nodes', value: '42', trend: 'STABLE', icon: ShieldCheck, color: 'text-blue-500' },
            { label: 'Audit Velocity', value: '1,240', trend: 'SYNC', icon: Terminal, color: 'text-slate-900' },
            { label: 'Integrity Violations', value: '00', trend: 'SECURE', icon: Lock, color: 'text-emerald-500' }
         ].map((stat, i) => (
            <div key={i} className="pro-card p-4 group transition-all">
                <div className="flex justify-between items-start mb-3">
                    <div className="p-1.5 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
                        <stat.icon size={14} />
                    </div>
                    <span className={`text-[9px] font-black font-mono border px-1 rounded-sm ${stat.color} border-current opacity-70 tracking-widest`}>
                        {stat.trend}
                    </span>
                </div>
                <p className="data-label !mb-0">{stat.label}</p>
                <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{stat.value}</p>
            </div>
         ))}
      </div>

      {/* Governing Mode Selector */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-sm w-max shadow-sm">
        <button onClick={() => setActiveTab('users')} className={`px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Identity Matrix</button>
        <button onClick={() => setActiveTab('workflows')} className={`px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'workflows' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Protocol Engine</button>
        <button onClick={() => setActiveTab('audit')} className={`px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'audit' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Audit Integrity</button>
      </div>

      {activeTab === 'users' && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="pro-card overflow-hidden">
                <div className="pro-card-header bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard size={14} className="text-blue-500" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Authorized Personnel Ledger</span>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                        <input type="text" placeholder="Filter identities..." className="pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-sm text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-blue-500 w-48" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30 border-b border-slate-100 italic">
                                <th className="px-6 py-3 data-label">Personnel Vector</th>
                                <th className="px-6 py-3 data-label">Clearance Level</th>
                                <th className="px-6 py-3 data-label">Last Auth Window</th>
                                <th className="px-6 py-3 data-label text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 italic font-mono uppercase tracking-tighter">
                            {USERS.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                                                <img src={`https://i.pravatar.cc/100?u=${user.email}`} alt="" />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[12px] font-bold text-slate-950 not-italic uppercase tracking-tight truncate">{user.name}</span>
                                                <span className="text-[9px] text-slate-400 uppercase tracking-tighter not-italic truncate">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.1em] border shadow-sm not-italic ${getRoleColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-mono italic text-slate-500 uppercase">{user.lastLogin}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-300 hover:text-slate-500 transition-colors"><MoreHorizontal size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
          
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="pro-card p-6">
                <div className="flex items-center gap-2 mb-8">
                    <Settings size={14} className="text-slate-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-bold">Access Taxonomy</span>
                </div>
                <div className="space-y-6 relative before:content-[''] before:absolute before:left-[5px] before:top-1 before:bottom-0 before:w-px before:bg-slate-100">
                    {[
                        { title: 'Administrator', desc: 'Root-level governance & config access.', icon: Lock, color: 'text-red-500' },
                        { title: 'Officer / PM', desc: 'Mission-aligned R/W access for projects.', icon: Briefcase, color: 'text-blue-500' },
                        { title: 'Operator / FM', desc: 'Operational control at localized nodes.', icon: Terminal, color: 'text-emerald-500' },
                        { title: 'Field / Tech', desc: 'Restricted tactical order access.', icon: Key, color: 'text-amber-500' },
                    ].map((role, i) => (
                        <div key={i} className="relative pl-6 group">
                            <div className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-sm border-2 border-white shadow-sm z-10 ${role.color} bg-current`}></div>
                            <h4 className="text-[12px] font-bold text-slate-900 tracking-tight leading-none uppercase group-hover:text-blue-600 transition-colors mb-1">{role.title}</h4>
                            <p className="text-[9px] text-slate-400 font-bold leading-relaxed uppercase tracking-widest italic">{role.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pro-card p-6 bg-slate-950 text-white relative border-none group overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                    <Server size={140} />
                </div>
                <div className="relative z-10">
                    <div className="p-2 bg-blue-600/20 rounded-sm inline-block mb-6 border border-blue-600/30">
                        <Activity size={20} className="text-blue-500 font-bold" />
                    </div>
                    <h4 className="text-[15px] font-bold tracking-tight mb-2 uppercase">Core Telemetry Readout</h4>
                    <div className="space-y-4">
                        {[
                            { label: 'Primary Uptime', value: '99.9%', color: 'text-emerald-400' },
                            { label: 'Global Latency', value: '14ms', color: 'text-emerald-400' },
                            { label: 'Cluster Load', value: '0.4%', color: 'text-emerald-400' }
                         ].map((tel, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">{tel.label}</span>
                                <span className={`text-[10px] font-mono font-bold ${tel.color}`}>{tel.value}</span>
                            </div>
                         ))}
                    </div>
                    <button className="w-full mt-8 py-3 bg-white text-slate-900 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3">
                        Initialize Resource Sweep <ArrowRight size={14} />
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'workflows' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
          {WORKFLOWS.map(wf => (
            <div key={wf.id} className="pro-card group overflow-hidden border-slate-200">
              <div className="pro-card-header bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-amber-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-tight truncate">{wf.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest border ${wf.enabled ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm shadow-emerald-500/10' : 'bg-slate-100 text-slate-400 border-slate-200 opacity-50'}`}>{wf.enabled ? 'ACTIVE' : 'STAGED'}</span>
                    <button className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                  </div>
              </div>
              <div className="p-6 space-y-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-sm flex items-center gap-4">
                    <Terminal size={14} className="text-amber-500 shrink-0"/>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Trigger Vector</span>
                        <p className="text-[11px] font-bold text-slate-900 uppercase italic font-mono italic truncate">{wf.trigger}</p>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">Action Sequence</span>
                    {wf.actions.map((action, i) => (
                      <div key={i} className="flex items-center gap-3 group/item">
                        <span className="text-[9px] font-mono font-bold text-slate-400 w-4">{i+1}.</span>
                        <div className="flex-grow p-2 bg-slate-50 border border-slate-100 rounded-sm hover:border-blue-200 transition-colors">
                            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">{action}</span>
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'audit' && (
        <div className="pro-card animate-in fade-in duration-500 overflow-hidden">
            <div className="pro-card-header bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <ShieldAlert size={14} className="text-red-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Immutable Governance Ledger</span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">ENCRYPTION: SHARD-64 ENABLED</span>
            </div>
            <div className="no-scrollbar divide-y divide-slate-100">
                {AUDIT_LOGS.map(log => (
                    <div key={log.id} className="flex items-start md:items-center gap-6 p-4 hover:bg-slate-50 transition-all cursor-pointer group font-mono text-[10px] uppercase italic tracking-tighter">
                        <div className="p-2 bg-white border border-slate-100 rounded text-slate-300 group-hover:text-blue-500 transition-colors hidden md:block">
                            <Activity size={14} />
                        </div>
                        <div className="flex-1">
                            <p className="text-slate-800 leading-relaxed font-bold not-italic">
                                <span className="text-blue-600 font-black italic mr-1">[{log.user}]</span> 
                                <span className="opacity-70">{log.action}</span> ON 
                                <span className="text-slate-950 font-black italic ml-1">{log.entity}</span>
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                                <span className="text-[9px] font-bold text-slate-400 opacity-70">TIMESTAMP: {log.timestamp}</span>
                                <span className="text-[9px] font-bold text-slate-400 opacity-70">VECTOR: {log.id}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-emerald-50 text-[8px] font-black text-emerald-600 border border-emerald-200 not-italic uppercase tracking-widest">
                            <ShieldCheck size={10} /> SECURE
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-blue-600 transition-colors">
                    Commit Ledger Fragment
                </button>
            </div>
        </div>
      )}
    </div>
  );
};
