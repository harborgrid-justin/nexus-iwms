import React from 'react';
import { Calendar, Plus, Users, User, Clock, Database, Terminal, LayoutDashboard, ArrowRight, Activity, Search, MapIcon, Info, Settings, MoreHorizontal, Video } from 'lucide-react';
import { RESERVATIONS, EMPLOYEES } from '../services/mockData';
import { StatusBadge } from '../components/StatusBadge';

export const Reservations: React.FC = () => {

  const myReservations = RESERVATIONS.filter(r => r.reservedBy === 'E-004' || r.reservedBy === 'E-005');

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Scheduling Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Calendar size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Resource Scheduling Terminal</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Workspace & Asset Reservation</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Active Nodes: {RESERVATIONS.length}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="btn-pro-secondary flex items-center gap-2">
                <Database size={14} /> Room Registry
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Initialize Booking
            </button>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Precision Booking Console */}
        <div className="col-span-12 lg:col-span-4 pro-card p-6 self-start">
            <div className="flex items-center gap-2 mb-8">
                <Settings size={14} className="text-slate-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Resource Allocation Parameters</span>
            </div>
            <form className="space-y-6">
                <div>
                    <label className="data-label">Asset Classification</label>
                    <div className="flex gap-2 mt-2">
                        <button type="button" className="flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest border border-blue-600 bg-blue-50 text-blue-600 rounded-sm">Conference Room</button>
                        <button type="button" className="flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors rounded-sm">Individual Desk</button>
                    </div>
                </div>
                <div>
                   <label className="data-label">Temporal Window</label>
                   <div className="relative mt-2">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-100 rounded-sm text-[12px] font-mono font-bold uppercase tracking-tighter outline-none focus:ring-1 focus:ring-blue-500" />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                       <label className="data-label">Alpha Time</label>
                       <input type="time" defaultValue="10:00" className="w-full mt-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-sm text-[12px] font-mono font-bold outline-none focus:ring-1 focus:ring-blue-500" />
                   </div>
                   <div>
                       <label className="data-label">Omega Time</label>
                       <input type="time" defaultValue="11:00" className="w-full mt-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-sm text-[12px] font-mono font-bold outline-none focus:ring-1 focus:ring-blue-500" />
                   </div>
                </div>
                <button type="button" className="w-full mt-4 py-3 bg-slate-950 text-white font-black text-[10px] uppercase tracking-widest rounded-sm hover:bg-slate-900 transition-all flex items-center justify-center gap-3">
                   Analyze Available Vectors <ArrowRight size={14} />
                </button>
            </form>
        </div>

        {/* Active Reservation Ledger */}
        <div className="col-span-12 lg:col-span-8 pro-card overflow-hidden">
            <div className="pro-card-header bg-slate-50/50">
                <div className="flex items-center gap-2">
                    <LayoutDashboard size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Personnel Allocation Stream</span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">Auth: RES-TX-SECURE</span>
            </div>
            <div className="no-scrollbar divide-y divide-slate-100 overflow-y-auto max-h-[600px]">
                {myReservations.map(res => {
                    const isRoom = res.spaceName.includes('Room');
                    return (
                        <div key={res.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-l-blue-600">
                             <div className="flex items-center gap-5">
                                <div className={`w-10 h-10 rounded-sm flex items-center justify-center border shadow-sm transition-transform group-hover:scale-105 ${isRoom ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                  {isRoom ? <Users size={18} /> : <User size={18} />}
                                </div>
                                <div>
                                  <div className="text-[12px] font-bold text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{res.spaceName}</div>
                                  <div className="flex items-center gap-2 mt-1">
                                      <Clock size={12} className="text-slate-300" />
                                      <span className="text-[10px] font-mono italic text-slate-400 uppercase tracking-tighter">{res.date} | {res.startTime}-{res.endTime}</span>
                                  </div>
                                </div>
                             </div>
                             <div className="flex items-center gap-6">
                                <div className="hidden md:flex flex-col text-right">
                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Vector</span>
                                    <StatusBadge status={res.status} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-300 hover:text-red-500 transition-colors"><MoreHorizontal size={16} /></button>
                                </div>
                             </div>
                        </div>
                    )
                })}
            </div>
            {myReservations.length === 0 && (
                <div className="p-20 flex flex-col items-center justify-center text-slate-300 gap-4 grayscale opacity-40">
                    <Calendar size={48} />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">No Active Reservations Found</span>
                </div>
            )}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 italic text-center">
                <button className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">
                    Load Historical Booking Archives
                </button>
            </div>
        </div>
      </div>
      
      {/* Tactical Telemetry Overlay */}
      <div className="pro-card p-4 bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-none">
          <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-600/20 text-blue-500 border border-blue-600/30 rounded-sm">
                  <Activity size={16} />
              </div>
              <div className="min-w-[200px]">
                  <p className="data-label !text-blue-400 !mb-0">Spatial Demand Density</p>
                  <p className="text-[13px] font-bold font-mono tracking-tighter uppercase">High Utilization Warning: Zone A1</p>
              </div>
          </div>
          <div className="flex-grow h-1 bg-white/10 rounded-full overflow-hidden mx-4 max-w-md hidden md:block">
              <div className="h-full bg-blue-600 w-3/4 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
          </div>
          <div className="flex items-center gap-4">
              <div className="text-right">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Global Avail</p>
                  <p className="text-[14px] font-black font-mono leading-none">24 Nodes</p>
              </div>
              <ArrowRight size={18} className="text-blue-600" />
          </div>
      </div>
    </div>
  );
};
