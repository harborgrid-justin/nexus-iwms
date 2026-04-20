import React, { useState } from 'react';
import { SPACE_DATA, MOVE_REQUESTS } from '../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Map as MapIcon, ArrowRight, ShieldCheck, Zap, Activity, Users2, Search, Plus, Layout, Clock, Grid3X3, ArrowUpRight, Database, Terminal, Settings, Info, Layers, LayoutDashboard, Calendar } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

export const Space: React.FC = () => {
  const [activeTab, setActiveTab] = useState('utilization');

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Spatial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Grid3X3 size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Spatial Logistics & Occupancy</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Mobility & Asset Allocation</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Indexed Nodes: HQ-SPACE-2024</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search Vectors / Personnel / RPUID..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Assign Vector
            </button>
        </div>
      </div>

      {/* Governing Mode Selector */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-sm w-max shadow-sm">
        <button onClick={() => setActiveTab('utilization')} className={`px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'utilization' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Utilization Matrix</button>
        <button onClick={() => setActiveTab('moves')} className={`px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'moves' ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Mobility Ledger</button>
      </div>

      {activeTab === 'utilization' && (
        <div className="grid grid-cols-12 gap-6">
          {/* Immersive Strategic Overlay */}
          <div className="col-span-12 lg:col-span-8 pro-card overflow-hidden">
            <div className="pro-card-header bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <MapIcon size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Strategic Overlay: Level 01</span>
                </div>
                <div className="flex gap-4">
                     <div className="flex items-center gap-2">
                        <div className="w-2.5 h-1 bg-blue-600 rounded-sm" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Assigned</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2.5 h-1 bg-slate-200 rounded-sm" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Available</span>
                     </div>
                </div>
            </div>
            
            <div className="aspect-[16/8] bg-slate-950 relative flex items-center justify-center p-12 overflow-hidden">
               {/* Map Grid Simulator */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
               
               {/* Minimal Tactical Map SVG */}
               <svg viewBox="0 0 400 220" className="w-full h-full max-w-2xl drop-shadow-2xl">
                  <rect x="0" y="0" width="400" height="220" fill="transparent" />
                  <rect x="10" y="10" width="380" height="200" fill="#1e293b" fillOpacity="0.4" stroke="#334155" strokeWidth="1" rx="2" />
                  
                  {/* Strategic Zones */}
                  <rect x="30" y="30" width="100" height="70" fill="#1e3a8a" fillOpacity="0.3" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 2" rx="1" />
                  <text x="35" y="42" className="text-[6px] font-bold fill-blue-500 uppercase tracking-tighter">VECTOR-A1</text>
                  
                  <rect x="270" y="30" width="100" height="160" fill="#0f172a" fillOpacity="0.6" stroke="#334155" strokeWidth="1" rx="1" />
                  <text x="275" y="42" className="text-[6px] font-bold fill-slate-500 uppercase tracking-tighter">CORE-B2</text>

                  {/* Individual Units (Tactical Matrix) */}
                  {[0, 1, 2, 3, 4, 5, 6, 7].map(idx => (
                    <rect key={idx} x={145 + (idx % 4 * 25)} y={40 + (Math.floor(idx/4) * 25)} width="16" height="16" fill={idx < 5 ? '#2563EB' : '#334155'} rx="1" />
                  ))}
                  
                  <circle cx="200" cy="110" r="50" fill="none" stroke="#2563EB" strokeWidth="0.2" strokeDasharray="3 3" className="animate-[spin_30s_linear_infinite]" />
               </svg>
               
               <div className="absolute top-4 left-6 pointer-events-none">
                    <div className="bg-slate-900/40 p-3 border border-white/5 backdrop-blur-sm rounded">
                        <p className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Tactical Readout</p>
                        <div className="space-y-1">
                            <div className="flex justify-between gap-6">
                                <span className="text-[9px] font-bold text-white/40 uppercase">F-INDEX</span>
                                <span className="text-[9px] font-mono text-white">0.92</span>
                            </div>
                            <div className="flex justify-between gap-6">
                                <span className="text-[9px] font-bold text-white/40 uppercase">G-VECTOR</span>
                                <span className="text-[9px] font-mono text-emerald-400">ACTIVE</span>
                            </div>
                        </div>
                    </div>
               </div>

               <div className="absolute bottom-4 right-6 flex flex-col gap-2">
                    <button className="p-1.5 bg-slate-900/80 border border-white/10 text-white rounded shadow-2xl hover:bg-slate-800"><Layers size={12} /></button>
                    <button className="p-1.5 bg-slate-950 text-white border border-white/10 rounded shadow-2xl hover:bg-slate-900"><Plus size={12} /></button>
               </div>
            </div>
          </div>

          {/* Precision Analytics Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
             <div className="pro-card p-6 bg-slate-950 text-white relative border-none group overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                    <LayoutDashboard size={140} />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-blue-500">Mission Readiness Index</span>
                            <h2 className="text-4xl font-black font-mono tracking-tighter mt-1 italic leading-none">92.4%</h2>
                        </div>
                        <div className="p-2 bg-blue-600/20 text-blue-500 border border-blue-600/30 rounded-sm animate-pulse">
                            <ShieldCheck size={18} />
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-[9px] font-bold uppercase text-slate-500 tracking-wider">Command Threshold</span>
                            <span className="text-[11px] font-mono font-black italic">95.0% TARGET</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[92.4%] shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Assigned Load</p>
                            <p className="text-lg font-black font-mono">14.2K <span className="text-[9px] font-bold text-slate-700">SF</span></p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Delta Available</p>
                            <p className="text-lg font-black font-mono text-emerald-400 italic">1.8K <span className="text-[9px] font-bold text-slate-700">SF</span></p>
                        </div>
                    </div>
                </div>
             </div>

             <div className="pro-card">
                <div className="pro-card-header">
                    <div className="flex items-center gap-2">
                        <Database size={14} className="text-blue-500" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Spatial Vector Breakdown</span>
                    </div>
                    <button className="text-slate-300 hover:text-slate-500"><Info size={14}/></button>
                </div>
                <div className="p-2 space-y-2">
                    {SPACE_DATA.map((floor, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-sm transition-colors group cursor-pointer border border-transparent hover:border-slate-100 italic font-mono">
                            <div className="w-10 h-10 shrink-0 relative flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[ { name: 'U', value: floor.utilization }, { name: 'F', value: 100 - floor.utilization } ]}
                                            innerRadius={14}
                                            outerRadius={18}
                                            stroke="none"
                                            dataKey="value"
                                        >
                                            <Cell key={`cell-0`} fill={floor.utilization > 90 ? '#EF4444' : '#2563EB'} />
                                            <Cell key={`cell-1`} fill="#F1F5F9" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <span className="absolute text-[8px] font-black text-slate-950 not-italic">{floor.utilization}%</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[11px] font-black text-slate-950 uppercase tracking-tight truncate mb-0.5">{floor.floor}</h4>
                                <p className="text-[9px] text-slate-400 uppercase tracking-tighter not-italic truncate">{floor.department}</p>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-200 group-hover:text-blue-600 transition-colors" />
                        </div>
                    ))}
                </div>
                <div className="p-3 bg-slate-50/50 border-t border-slate-100 text-center">
                    <button className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Global Occupancy Stream</button>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'moves' && (
        <div className="pro-card animate-in fade-in duration-500 overflow-hidden">
            <div className="pro-card-header bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <Zap size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Personnel Mobility & Yield Ledger</span>
                </div>
                <StatusBadge status="Live" />
            </div>
            
            <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/30 border-b border-slate-100 italic">
                            <th className="px-6 py-3 data-label">Personnel Vector</th>
                            <th className="px-6 py-3 data-label">Origin Cluster</th>
                            <th className="px-6 py-3 data-label">Target Cluster</th>
                            <th className="px-6 py-3 data-label">Execution Date</th>
                            <th className="px-6 py-3 data-label text-right">Reference</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 italic font-mono uppercase tracking-tighter">
                        {MOVE_REQUESTS.map(req => (
                            <tr key={req.id} className="hover:bg-slate-50 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-l-blue-600">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 rounded bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-sm grayscale group-hover:grayscale-0 transition-all">
                                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${req.employeeName}`} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-bold text-slate-950 not-italic uppercase tracking-tight">{req.employeeName}</span>
                                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-widest mt-1 w-max border ${req.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>{req.status}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col opacity-60">
                                        <span className="text-[11px] font-bold text-slate-700 not-italic uppercase tracking-tight leading-none">{req.fromLocation}</span>
                                        <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-tighter not-italic italic">Verified Exit</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-bold text-blue-600 not-italic uppercase tracking-tight leading-none italic">{req.toLocation}</span>
                                        <span className="text-[9px] text-blue-400/60 mt-1 uppercase tracking-tighter not-italic font-bold">Planned Entry</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Calendar size={12} className="text-slate-300" />
                                        <span className="text-[10px] font-mono italic text-slate-500">{req.moveDate}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-[10px] font-mono font-bold text-slate-300 opacity-60">TXN.{req.id}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="p-4 bg-slate-950 text-white italic text-center">
                <button className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-blue-400 transition-colors">
                    Initialize Full Mobility Audit Sync
                </button>
            </div>
        </div>
      )}
    </div>
  );
};
