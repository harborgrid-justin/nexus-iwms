import React, { useState } from 'react';
import { Layers, Search, Maximize2, Shield, Users, Thermometer, Terminal, Database, ArrowRight, Activity, Info, Map as MapIcon, Globe, Compass, LayoutDashboard, Plus, Filter, Settings, ExternalLink, MapPin } from 'lucide-react';
import { PROPERTIES } from '../services/mockData';

export const GisMap: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState('status');

    const getPinColorForLayer = (property: typeof PROPERTIES[0], layer: string) => {
        if (layer === 'status') {
            switch (property.status) {
                case 'Good': return 'bg-emerald-500 shadow-emerald-500/50';
                case 'Warning': return 'bg-amber-500 shadow-amber-500/50';
                case 'Critical': return 'bg-red-500 shadow-red-500/50';
                default: return 'bg-slate-500 shadow-slate-500/50';
            }
        }
        if (layer === 'occupancy') {
            if (property.occupancyRate > 90) return 'bg-blue-600 shadow-blue-500/50';
            if (property.occupancyRate > 70) return 'bg-blue-400 shadow-blue-400/50';
            return 'bg-amber-500 shadow-amber-500/50';
        }
        if (layer === 'fci') {
            if (property.fci > 90) return 'bg-emerald-500 shadow-emerald-500/50';
            if (property.fci > 70) return 'bg-blue-500 shadow-blue-500/50';
            if (property.fci > 50) return 'bg-amber-500 shadow-amber-500/50';
            return 'bg-red-500 shadow-red-500/50';
        }
        return 'bg-slate-500 shadow-slate-500/50';
    };
    
  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-140px)] flex flex-col space-y-4">
      {/* Precision Geospatial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <MapIcon size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Geospatial Intelligence Terminal</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Asset Vector Analysis</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Sync: L-BAND SECURE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button className="btn-pro-secondary flex items-center gap-2">
                <Globe size={14} /> Global View
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Add Vector
            </button>
        </div>
      </div>

      <div className="flex-grow flex gap-6 min-h-0">
        {/* Asset Stream Panel */}
        <div className="w-80 pro-card flex flex-col hidden lg:flex">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Database size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Resource Ledger</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-400">[N.{PROPERTIES.length}]</span>
            </div>
            <div className="p-3 bg-slate-50 border-b border-slate-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Filter vectors..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar">
                {PROPERTIES.map(p => (
                    <button key={p.id} className="w-full text-left p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors border-b last:border-0 group">
                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 shadow-sm ${getPinColorForLayer(p, activeLayer)}`}></div>
                        <div className="min-w-0">
                            <p className="text-[12px] font-bold text-slate-900 uppercase tracking-tight truncate group-hover:text-blue-600 transition-colors">{p.name}</p>
                            <p className="text-[9px] font-mono text-slate-400 mt-0.5 truncate uppercase tracking-tighter italic">ID: {p.id}</p>
                        </div>
                    </button>
                ))}
            </div>
            <div className="p-3 bg-slate-50/50 border-t border-slate-100 text-center">
                <button className="text-[9px] font-bold text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-2 mx-auto">
                    Global Audit Stream <ArrowRight size={10} />
                </button>
            </div>
        </div>

        {/* Immersive Tactical Map Interface */}
        <div className="flex-grow pro-card relative overflow-hidden bg-slate-950">
            {/* Map Simulator */}
            <div 
                className="absolute inset-0 bg-cover bg-center grayscale opacity-20"
                style={{backgroundImage: "url('https://picsum.photos/seed/map/1920/1080?blur=4')"}}
            />
            {/* Tactical Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
            
            {/* Mock Property Pins (Tactical Distribution) */}
            {PROPERTIES.map((p, i) => (
                <div 
                    key={p.id} 
                    className="absolute group cursor-pointer" 
                    style={{top: `${20 + i*18}%`, left: `${15 + i*14}%`}}
                >
                    <div className="relative">
                        <div className={`w-3.5 h-3.5 ${getPinColorForLayer(p, activeLayer)} rounded-full ring-2 ring-white/5 shadow-lg group-hover:scale-150 transition-transform duration-500 animate-pulse`}></div>
                        
                        {/* Hover Tooltip (Terminal Style) */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none w-48">
                            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 p-3 rounded-sm shadow-2xl">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[8px] font-black uppercase text-blue-400 tracking-widest">Asset Vector</span>
                                    <span className="text-[8px] font-mono text-white/50">{p.id}</span>
                                </div>
                                <p className="text-[11px] font-black uppercase text-white truncate mb-1">{p.name}</p>
                                <div className="flex justify-between items-center pt-2 border-t border-white/10 mt-2">
                                    <span className="text-[9px] font-bold text-white/40 uppercase">Status:</span>
                                    <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase">{p.status}</span>
                                </div>
                            </div>
                            <div className="w-2 h-2 bg-slate-900 border-r border-b border-white/20 rotate-45 mx-auto -mt-1 shadow-2xl"></div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Tactical Compass Overlay */}
            <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none">
                <Compass size={120} className="text-white animate-[spin_20s_linear_infinite]" strokeWidth={0.5} />
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="p-2.5 bg-slate-900/80 backdrop-blur border border-white/10 text-white rounded hover:bg-slate-800 transition-all shadow-2xl"><Layers size={14} /></button>
                <button className="p-2.5 bg-slate-900/80 backdrop-blur border border-white/10 text-white rounded hover:bg-slate-800 transition-all shadow-2xl"><Maximize2 size={14} /></button>
                <div className="h-px bg-white/10 my-1 mx-1" />
                <button className="p-2.5 bg-slate-900/80 backdrop-blur border border-white/10 text-white rounded hover:bg-slate-800 transition-all shadow-2xl"><LayoutDashboard size={14} /></button>
            </div>

            {/* Mission Layer Controller */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl flex items-center gap-6">
                <div className="flex items-center gap-2 border-r border-white/10 pr-6 mr-2">
                    <Activity size={12} className="text-blue-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Active Layer</span>
                </div>
                {[
                    { id: 'status', label: 'Mission Health', icon: Shield },
                    { id: 'occupancy', label: 'Spatial Density', icon: Users },
                    { id: 'fci', label: 'Integrity Index', icon: Thermometer }
                ].map(layer => (
                    <button 
                        key={layer.id}
                        onClick={() => setActiveLayer(layer.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all group ${activeLayer === layer.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <layer.icon size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{layer.label}</span>
                    </button>
                ))}
            </div>

            {/* Telemetry Readout Overlay */}
            <div className="absolute top-4 left-6 pointer-events-none hidden md:block">
                <div className="bg-slate-950/40 p-4 rounded border border-white/5 backdrop-blur-sm">
                    <p className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4">Command Situational Readout</p>
                    <div className="space-y-3">
                        <div className="flex justify-between gap-8">
                            <span className="text-[9px] font-bold text-white/40 uppercase">Global Vectors</span>
                            <span className="text-[9px] font-mono text-white">{PROPERTIES.length}</span>
                        </div>
                        <div className="flex justify-between gap-8">
                            <span className="text-[9px] font-bold text-white/40 uppercase">Sat Latency</span>
                            <span className="text-[9px] font-mono text-emerald-400">22ms</span>
                        </div>
                        <div className="flex justify-between gap-8">
                            <span className="text-[9px] font-bold text-white/40 uppercase">G-SENS Sensitivity</span>
                            <span className="text-[9px] font-mono text-white">0.08X</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
