import React, { useState } from 'react';
import { MapPinned, Search, Maximize, ArrowRightLeft, Trash2, Leaf, AlertTriangle, Layers, Navigation, Info, Filter, Settings, ZoomIn, ZoomOut, Database, Target, Activity, FileClock, DollarSign, Globe, ArrowUpRight, ShieldCheck, Compass, Map as MapIcon, Plus, LayoutDashboard } from 'lucide-react';
import { USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';

export const RemisGisHub: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState('program');
    const [selectedAsset, setSelectedAsset] = useState<typeof USACE_ASSETS[0] | null>(null);
    
  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-140px)] flex flex-col space-y-4">
      {/* Precision Geospatial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded-sm text-white shadow-sm">
                <MapIcon size={16} />
            </div>
            <div className="flex items-center gap-3">
               <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">USACE Geospatial Command Hub</h1>
               <RegulatoryBadge refs={['ER 1110-1-8156', '18']} />
            </div>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Real Property Vector Analysis</span>
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
                <span className="text-[9px] font-mono font-bold text-slate-400">[N.{USACE_ASSETS.length}]</span>
            </div>
            <div className="p-3 bg-slate-50 border-b border-slate-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Filter vectors..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[11px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar">
                {USACE_ASSETS.map(p => (
                    <button key={p.id} onClick={() => setSelectedAsset(p)} className={`w-full text-left p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors border-b last:border-0 group ${selectedAsset?.id === p.id ? 'bg-blue-50/50 border-l-2 border-l-blue-600' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 shadow-sm ${p.program === 'Civil Works' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                        <div className="min-w-0">
                            <p className="text-[11px] font-bold text-slate-900 uppercase tracking-tight truncate group-hover:text-blue-600 transition-colors">{p.name}</p>
                            <p className="text-[9px] font-mono text-slate-400 mt-0.5 truncate uppercase tracking-tighter italic">ID: {p.rpuid}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>

        {/* Immersive Tactical Map Interface */}
        <div className="flex-grow pro-card relative overflow-hidden bg-slate-950">
            {/* Map Simulator */}
            <div 
                className="absolute inset-0 bg-cover bg-center grayscale opacity-10"
                style={{backgroundImage: "url('https://picsum.photos/seed/usace-map/1920/1080?blur=4')"}}
            />
            {/* Tactical Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
            
            {/* Mock Property Pins (Tactical Distribution) */}
            {USACE_ASSETS.map((p, i) => (
                <div 
                    key={p.id} 
                    className="absolute group cursor-pointer" 
                    style={{top: `${15 + i*15}%`, left: `${20 + i*12}%`}}
                    onClick={() => setSelectedAsset(p)}
                >
                    <div className="relative">
                        <div className={`w-3 h-3 ${p.program === 'Civil Works' ? 'bg-blue-500 shadow-blue-500/50' : 'bg-emerald-500 shadow-emerald-500/50'} rounded-full ring-2 ring-white/5 shadow-lg group-hover:scale-150 transition-transform duration-500 animate-pulse`}></div>
                        
                        {/* Hover Tooltip (Terminal Style) */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none w-48">
                            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/20 p-3 rounded-sm shadow-2xl">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[8px] font-black uppercase text-blue-400 tracking-widest">Asset Vector</span>
                                    <span className="text-[8px] font-mono text-white/50">{p.rpuid}</span>
                                </div>
                                <p className="text-[10px] font-black uppercase text-white truncate mb-1">{p.name}</p>
                                <div className="flex justify-between items-center pt-2 border-t border-white/10 mt-2">
                                    <span className="text-[9px] font-bold text-white/40 uppercase">Program:</span>
                                    <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase">{p.program}</span>
                                </div>
                            </div>
                            <div className="w-1.5 h-1.5 bg-slate-900 border-r border-b border-white/20 rotate-45 mx-auto -mt-1 shadow-2xl"></div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Tactical Compass Overlay */}
            <div className="absolute bottom-6 right-6 opacity-20 pointer-events-none">
                <Compass size={100} className="text-white animate-[spin_30s_linear_infinite]" strokeWidth={0.5} />
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="p-2.5 bg-slate-900/80 backdrop-blur border border-white/10 text-white rounded hover:bg-slate-800 transition-all shadow-2xl"><ZoomIn size={14} /></button>
                <button className="p-2.5 bg-slate-900/80 backdrop-blur border border-white/10 text-white rounded hover:bg-slate-800 transition-all shadow-2xl"><ZoomOut size={14} /></button>
                <div className="h-px bg-white/10 my-1 mx-1" />
                <button className="p-2.5 bg-slate-900/80 backdrop-blur border border-white/10 text-white rounded hover:bg-slate-800 transition-all shadow-2xl"><Layers size={14} /></button>
            </div>

            {/* Mission Layer Controller */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl flex items-center gap-6">
                <div className="flex items-center gap-2 border-r border-white/10 pr-6 mr-2">
                    <Activity size={12} className="text-blue-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Active Layer</span>
                </div>
                {[
                    { id: 'program', label: 'Program Structure', icon: Target },
                    { id: 'acquisistions', label: 'Acquisition Pipeline', icon: ArrowRightLeft },
                    { id: 'environmental', label: 'Environmental Readiness', icon: Leaf }
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

            {/* Asset Insight Panel */}
            {selectedAsset && (
                 <div className="absolute top-4 left-6 w-80 animate-in slide-in-from-left-4 duration-500">
                    <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 p-5 rounded-sm shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Target size={120} className="text-white" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Vector Inspection</span>
                            <button onClick={() => setSelectedAsset(null)} className="text-white/20 hover:text-white transition-colors"><X size={14}/></button>
                        </div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1">{selectedAsset.name}</h3>
                        <p className="text-[10px] font-mono text-white/40 uppercase mb-6 italic tracking-tighter">RPUID: {selectedAsset.rpuid}</p>
                        
                        <div className="space-y-4 relative z-10">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">Program</p>
                                    <p className="text-[11px] font-bold text-blue-400 uppercase">{selectedAsset.program}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">Acreage</p>
                                    <p className="text-[11px] font-bold font-mono text-white italic">{selectedAsset.acreage} AC</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
                                <Link to={`/usace/inventory/${selectedAsset.id}`} className="w-full py-2 bg-white text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                                    Full Telemetry <ArrowUpRight size={12} />
                                </Link>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="py-2 bg-slate-800 text-white/60 text-[8px] font-black uppercase tracking-widest rounded-sm hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-1.5">
                                        <FileClock size={10} /> Leases
                                    </button>
                                    <button className="py-2 bg-slate-800 text-white/60 text-[8px] font-black uppercase tracking-widest rounded-sm hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-1.5">
                                        <DollarSign size={10} /> Finance
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            )}
        </div>
      </div>
    </div>
  );
};
