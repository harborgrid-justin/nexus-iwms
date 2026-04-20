import React, { useState } from 'react';
import { MapPinned, Search, Maximize, ArrowRightLeft, Trash2, Leaf, AlertTriangle, Layers, Navigation, Info, Filter, Settings, ZoomIn, ZoomOut, Database, Target, Activity, FileClock, DollarSign, Globe, ArrowUpRight, ShieldCheck, Compass, Map as MapIcon, Plus, LayoutDashboard, X } from 'lucide-react';
import { USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';

export const RemisGisHub: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState('program');
    const [selectedAsset, setSelectedAsset] = useState<typeof USACE_ASSETS[0] | null>(null);
    
  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-140px)] flex flex-col space-y-6 italic font-black">
      {/* Precision Geospatial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b-2 border-slate-900 relative shrink-0">
        <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-blue-600 pulse-mission" />
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-none text-white shadow-2xl shadow-blue-900/40 transform rotate-2">
                    <MapIcon size={24} />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic mb-2">Geospatial Command Hub</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-60">HUB_NODE_SIGINT_882</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-tighter italic">ENTERPRISE_REAL_PROPERTY_VECTOR_SCAN</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-6 italic border-l-2 border-slate-100 pl-6">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic opacity-40">COMM_PROTOCOL</span>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest italic leading-none">L-BAND SECURE</span>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic opacity-40">GEOSPATIAL_REG</span>
                    <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest italic leading-none">ER 1110-1-8156</span>
                </div>
                <RegulatoryBadge refs={['18', '22']} />
            </div>
        </div>
        
        <div className="flex items-center gap-4">
            <button className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400 hover:text-slate-900 transition-all italic flex items-center gap-3 border border-slate-200">
                <Globe size={14} className="text-blue-500" /> GLOBAL_SPHERE_VIEW
            </button>
            <button className="btn-pro-primary flex items-center gap-4 px-10 py-4 h-auto text-[11px] font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-blue-500/20">
                <Plus size={18} /> INJECT_NEW_VECTOR
            </button>
        </div>
      </div>

      <div className="flex-grow flex gap-8 min-h-0">
        {/* Asset Stream Panel */}
        <div className="w-96 flex flex-col bg-white border-2 border-slate-200 shadow-2xl hidden lg:flex">
            <div className="p-6 border-b-2 border-slate-900 bg-slate-50 flex items-center justify-between italic">
                <div className="flex items-center gap-4">
                    <Database size={16} className="text-blue-600" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">RESOURCE_LEDGER_STREAM</span>
                </div>
                <span className="px-3 py-1 bg-slate-950 text-white text-[9px] font-mono font-black italic tracking-tighter">N.{USACE_ASSETS.length}</span>
            </div>
            <div className="p-2 bg-slate-950 border-b border-white/5">
                <div className="relative group">
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-blue-600 group-focus-within:h-full transition-all" />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" size={14} />
                    <input type="text" placeholder="STRAT_FILTER_VECTORS..." className="w-full pl-14 pr-6 py-4 bg-white/5 focus:bg-white/10 text-white text-[11px] font-black uppercase tracking-widest outline-none transition-all italic shadow-inner" />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto no-scrollbar py-2 bg-slate-50">
                {USACE_ASSETS.map(p => (
                    <button key={p.id} onClick={() => setSelectedAsset(p)} className={`w-full text-left px-8 py-6 flex items-start gap-6 hover:bg-white transition-all relative group border-l-4 ${selectedAsset?.id === p.id ? 'bg-white border-blue-600 shadow-xl z-10' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                        <div className={`w-4 h-4 mt-1 shrink-0 ${p.program === 'Civil Works' ? 'bg-blue-600' : 'bg-emerald-600'} transform rotate-45 group-hover:scale-125 transition-transform`}></div>
                        <div className="min-w-0 space-y-1">
                            <p className="text-[12px] font-black text-slate-900 uppercase tracking-tighter truncate group-hover:text-blue-600 transition-colors italic">{p.name}</p>
                            <p className="text-[10px] font-mono font-black text-slate-400 group-hover:text-slate-900 uppercase tracking-tighter italic">HEX_NODE::{p.rpuid}</p>
                        </div>
                    </button>
                ))}
            </div>
            <div className="p-4 bg-slate-950 border-t border-white/5 flex justify-center italic">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.6em]">STREAMING_STABLE_V9</span>
            </div>
        </div>

        {/* Immersive Tactical Map Interface */}
        <div className="flex-grow relative overflow-hidden bg-slate-950 border-2 border-slate-900 shadow-2xl">
            {/* Map Simulator */}
            <div 
                className="absolute inset-0 bg-cover bg-center grayscale opacity-15"
                style={{backgroundImage: "url('https://picsum.photos/seed/usace-map/1920/1080?blur=4')"}}
            />
            {/* Tactical Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 pointer-events-none opacity-40"></div>
            
            {/* Pins */}
            {USACE_ASSETS.map((p, i) => (
                <div 
                    key={p.id} 
                    className="absolute group cursor-pointer" 
                    style={{top: `${15 + i*15}%`, left: `${20 + i*12}%`}}
                    onClick={() => setSelectedAsset(p)}
                >
                    <div className="relative">
                        <div className={`w-4 h-4 ${p.program === 'Civil Works' ? 'bg-blue-600 shadow-blue-500/50' : 'bg-emerald-600 shadow-emerald-500/50'} transform rotate-45 ring-4 ring-slate-950 shadow-2xl group-hover:scale-150 transition-transform duration-500 animate-pulse`}></div>
                        
                        {/* Hover Tooltip (Terminal Style) */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none w-64 z-50 italic">
                            <div className="bg-slate-900/95 backdrop-blur-3xl border-2 border-white/10 p-6 shadow-2xl">
                                <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
                                    <span className="text-[9px] font-black uppercase text-blue-500 tracking-[0.4em] italic">ASSET_VECTOR</span>
                                    <span className="text-[9px] font-mono text-white/40 tracking-tighter">NODE::{p.rpuid}</span>
                                </div>
                                <p className="text-[13px] font-black uppercase text-white truncate mb-2 italic tracking-tight">{p.name}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                    <span className="text-[8px] font-black text-white/30 uppercase tracking-widest italic leading-none">PRIMARY_NODE</span>
                                    <span className={`text-[10px] font-black uppercase italic ${p.program === 'Civil Works' ? 'text-blue-400' : 'text-emerald-400'}`}>{p.program}</span>
                                </div>
                            </div>
                            <div className="w-3 h-3 bg-slate-900 border-r-2 border-b-2 border-white/10 rotate-45 mx-auto -mt-1.5 shadow-2xl"></div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Tactical Compass Overlay */}
            <div className="absolute bottom-12 right-12 opacity-10 pointer-events-none scale-150">
                <Compass size={120} className="text-white animate-[spin_60s_linear_infinite]" strokeWidth={0.5} />
            </div>

            {/* Map Controls */}
            <div className="absolute top-8 right-8 flex flex-col gap-2 italic">
                <button className="w-12 h-12 flex items-center justify-center bg-slate-900/90 backdrop-blur-xl border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-2xl"><ZoomIn size={18} /></button>
                <button className="w-12 h-12 flex items-center justify-center bg-slate-900/90 backdrop-blur-xl border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-2xl"><ZoomOut size={18} /></button>
                <div className="h-px bg-white/10 my-2 mx-2" />
                <button className="w-12 h-12 flex items-center justify-center bg-slate-900/90 backdrop-blur-xl border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 transition-all shadow-2xl"><Layers size={18} /></button>
            </div>

            {/* Mission Layer Controller */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-2 py-2 bg-slate-950 border border-white/5 rounded-none shadow-2xl flex items-center gap-1 italic">
                <div className="flex items-center gap-4 px-8 border-r border-white/5 mr-1 h-12">
                    <Activity size={16} className="text-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 italic">VECTOR_LOCK</span>
                </div>
                {[
                    { id: 'program', label: 'STRAT_PROGRAM_MATRIX', icon: Target },
                    { id: 'acquisistions', label: 'ACQUISITION_PIPELINE', icon: ArrowRightLeft },
                    { id: 'environmental', label: 'ENV_READINESS_WAVES', icon: Leaf }
                ].map(layer => (
                    <button 
                        key={layer.id}
                        onClick={() => setActiveLayer(layer.id)}
                        className={`h-12 flex items-center gap-4 px-8 transition-all relative group ${activeLayer === layer.id ? 'bg-blue-600 text-white shadow-2xl' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                    >
                        <layer.icon size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">{layer.label}</span>
                    </button>
                ))}
            </div>

            {/* Asset Insight Panel */}
            {selectedAsset && (
                 <div className="absolute top-8 left-12 w-96 animate-in slide-in-from-left-8 duration-700 ease-out italic">
                    <div className="bg-slate-900/95 backdrop-blur-3xl border-2 border-white/10 p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-12 -bottom-12 opacity-5 scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-0">
                            <Target size={160} className="text-blue-500" />
                        </div>
                        <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-4 bg-blue-600" />
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] italic">GEOSPATIAL_TELEMETRY</span>
                            </div>
                            <button onClick={() => setSelectedAsset(null)} className="text-white/20 hover:text-white hover:rotate-90 transition-all p-2 bg-white/5"><X size={18}/></button>
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic shadow-sm">{selectedAsset.name}</h3>
                        <p className="text-[11px] font-mono font-black text-blue-400/60 uppercase mb-10 italic tracking-tighter">NODE_IDENT:: {selectedAsset.rpuid}</p>
                        
                        <div className="space-y-8 relative z-10">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.4em] italic leading-none">CORE_PROGRAM</p>
                                    <p className="text-[14px] font-black text-white uppercase italic tracking-tight">{selectedAsset.program}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.4em] italic leading-none">ACREAGE_VEC</p>
                                    <p className="text-[14px] font-mono font-black text-emerald-400 italic tracking-tighter">{selectedAsset.area.toLocaleString()} {selectedAsset.unit.toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="pt-10 border-t border-white/5 flex flex-col gap-3">
                                <Link to={`/usace/inventory/${selectedAsset.id}`} className="w-full py-6 bg-blue-600 text-white text-[12px] font-black uppercase tracking-[0.4em] hover:bg-blue-700 transition-all flex items-center justify-center gap-4 italic border border-white/10 shadow-2xl">
                                    PULL_FULL_TELEMETRY <ArrowUpRight size={18} />
                                </Link>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-4 bg-slate-800 text-white/40 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-3 italic border border-white/5">
                                        <FileClock size={14} className="text-blue-500" /> LEASE_ADMIN
                                    </button>
                                    <button className="py-4 bg-slate-800 text-white/40 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-3 italic border border-white/5">
                                        <DollarSign size={14} className="text-emerald-500" /> FISCAL_LOG
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            )}
            
            {/* Map Coordinate System Grid */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-8 opacity-20 pointer-events-none italic">
                <span className="text-[9px] font-mono font-black text-white vertical-text tracking-[1em]">N 42.3601</span>
                <div className="w-px h-24 bg-white/40 mx-auto" />
                <span className="text-[9px] font-mono font-black text-white vertical-text tracking-[1em]">N 42.3650</span>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-12 opacity-20 pointer-events-none italic">
                <span className="text-[9px] font-mono font-black text-white tracking-[1em]">W 71.0589</span>
                <span className="text-[9px] font-mono font-black text-white tracking-[1em]">W 71.0650</span>
            </div>
        </div>
      </div>
    </div>
  );
  );
};
