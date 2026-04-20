import React from 'react';
import { WORK_ORDERS, PM_SCHEDULES, VENDORS, USACE_ENCROACHMENTS, SAFETY_INCIDENTS } from '../services/mockData';
import { MoreHorizontal, Wrench, Handshake, Activity, BarChart3, TrendingUp, Search, Plus, Filter, Zap, LayoutDashboard, Terminal, ShieldAlert, ArrowUpRight, CheckCircle2, MapPin, Settings, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

const data = [
  { day: 'Mon', active: 12, completed: 8 },
  { day: 'Tue', active: 15, completed: 12 },
  { day: 'Wed', active: 18, completed: 14 },
  { day: 'Thu', active: 14, completed: 22 },
  { day: 'Fri', active: 10, completed: 18 },
];

const ReadinessCard = ({ title, value, subText, icon: Icon, color, trend }: any) => (
  <div className="pro-card p-5 group transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
        <Icon size={16} />
      </div>
      {trend && (
        <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${trend.startsWith('+') ? 'text-blue-600 bg-blue-50' : 'text-emerald-600 bg-emerald-50'}`}>
          {trend}
        </span>
      )}
    </div>
    <p className="data-label mb-1">{title}</p>
    <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{value}</p>
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4 pt-4 border-t border-slate-50">{subText}</p>
  </div>
);

export const Operations: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Strategic Operations Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Terminal size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Operational Command Hub</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Global Maintenance & Readiness Terminal</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Mission Readiness: Level 1</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Command Search..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> New Deployment
            </button>
        </div>
      </div>

      {/* Readiness Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReadinessCard title="Active Operations" value={WORK_ORDERS.filter(wo => wo.status !== 'Completed').length} subText="Across Global Sites" icon={Activity} color="text-blue-600" trend="+4%" />
        <ReadinessCard title="Critical Latency" value={PM_SCHEDULES.filter(pm => pm.status === 'Overdue').length} subText="Triage Required" icon={ShieldAlert} color="text-red-600" />
        <ReadinessCard title="Tactical Vendors" value={VENDORS.length} subText="Prime Performance Opt." icon={Handshake} color="text-emerald-600" trend="Stable" />
        <ReadinessCard title="Open Encroachments" value={USACE_ENCROACHMENTS.filter(e => e.status !== 'Resolved').length} subText="G-3 Engineering Audit" icon={LayoutDashboard} color="text-amber-500" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Tactical Execution Queue */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Activity size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Operational Mission Queue</span>
                </div>
                <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600"><Filter size={14}/></button>
            </div>
            
            <div className="pro-card divide-y divide-slate-100 overflow-hidden">
                {WORK_ORDERS.sort((a,b) => (a.priority === 'Emergency' ? -1 : 1)).map(wo => (
                    <div key={wo.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-4 flex-1">
                            <div className={`w-10 h-10 rounded border flex items-center justify-center shrink-0 ${
                                wo.priority === 'Emergency' ? 'bg-red-50 border-red-100 text-red-600' : 
                                wo.status === 'Completed' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                'bg-blue-50 border-blue-100 text-blue-600'
                            }`}>
                                {wo.status === 'Completed' ? <CheckCircle2 size={16} /> : <Wrench size={16} />}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="text-[13px] font-bold text-slate-900 uppercase tracking-tight truncate max-w-[300px]">{wo.title}</h4>
                                    <span className="text-[9px] font-mono text-slate-400">#{wo.id}</span>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                    <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest"><MapPin size={10} className="text-blue-500" /> {wo.propertyId}</span>
                                    <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest"><Settings size={10} /> {wo.category}</span>
                                    <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest"><Clock size={10} /> {wo.dueDate}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-2 md:pt-0">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded border border-slate-200 overflow-hidden grayscale">
                                    <img src={`https://i.pravatar.cc/100?u=${wo.assignedTo}`} alt="" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{wo.assignedTo}</span>
                            </div>
                            <div className={`min-w-[80px] px-2 py-0.5 rounded-sm text-center text-[9px] font-bold uppercase tracking-widest border ${
                                wo.priority === 'Emergency' ? 'bg-red-600 text-white border-red-700' : 'bg-slate-50 text-slate-500 border-slate-200'
                            }`}>
                                {wo.priority}
                            </div>
                            <button className="text-slate-300 hover:text-slate-500"><MoreHorizontal size={14}/></button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center text-center p-4">
                <button className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">
                    Load Archive Matrix
                </button>
            </div>
        </div>

        {/* Operational Analytics Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="pro-card p-6 bg-slate-950 text-white relative border-none overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <BarChart3 size={100} />
                </div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">Mean Recovery Time</span>
                        <h3 className="text-3xl font-black font-mono tracking-tighter mt-1">15.2h</h3>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400">
                        <TrendingUp size={14} />
                        <span className="text-[9px] font-bold uppercase">-1.2h</span>
                    </div>
                </div>
                
                <div className="h-40 -mx-2 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{backgroundColor: '#000', border: 'none', borderRadius: '4px', fontSize: '9px'}}
                      />
                      <Bar dataKey="active" fill="#2563EB" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 relative z-10">
                    <div>
                        <p className="text-[8px] font-bold text-slate-500 uppercase">Ops Integrity</p>
                        <p className="text-[13px] font-bold font-mono">99.4%</p>
                    </div>
                    <div>
                        <p className="text-[8px] font-bold text-slate-500 uppercase">Safe Window</p>
                        <p className="text-[13px] font-bold font-mono text-emerald-400">144D</p>
                    </div>
                </div>
            </div>

            <div className="pro-card">
                <div className="pro-card-header">
                    <div className="flex items-center gap-2">
                        <ShieldAlert size={14} className="text-red-500" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Hazard Integrity Monitor</span>
                    </div>
                    <span className="text-[10px] font-bold text-red-500">ACTIVE</span>
                </div>
                <div className="p-4 space-y-4">
                     {SAFETY_INCIDENTS.map(incident => (
                         <div key={incident.id} className="p-3 bg-slate-50 border-l-2 border-red-500 rounded-sm">
                             <div className="flex items-center justify-between mb-1">
                                <p className="text-[10px] font-bold text-slate-900 uppercase tracking-tight truncate pr-4">{incident.type}</p>
                                <span className="text-[8px] font-bold text-red-600 font-mono">[{incident.severity}]</span>
                             </div>
                             <p className="text-[10px] text-slate-500 font-medium line-clamp-2 leading-relaxed mb-2 uppercase tracking-tighter italic">{incident.description}</p>
                             <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 font-mono tracking-widest">
                                 <span>{incident.date}</span>
                                 <span>{incident.id}</span>
                             </div>
                         </div>
                     ))}
                     <button className="w-full py-2 border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
                        Safety Ledger Audit
                     </button>
                </div>
            </div>

            <div className="pro-card p-6 bg-slate-50">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-slate-950 text-white rounded shadow-sm">
                        <Zap size={14} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-slate-900 uppercase tracking-tight leading-none">Condition Score</p>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 italic">Aggregate FCI (Global)</p>
                    </div>
                </div>
                <div className="flex items-end justify-between mb-4">
                    <p className="text-4xl font-black text-slate-900 tracking-tighter font-mono">88.4</p>
                    <div className="text-right">
                        <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Status: Operational</p>
                        <div className="w-24 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{width: '88.4%'}} />
                        </div>
                    </div>
                </div>
                <button className="w-full mt-4 btn-pro-primary flex items-center justify-center gap-2 py-2.5">
                    Strategic Maintenance Map <ArrowUpRight size={12} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
