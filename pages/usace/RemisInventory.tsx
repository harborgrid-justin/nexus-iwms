import React, { useState, useEffect, useMemo } from 'react';
import { Building2, Plus, Filter, Search, CheckCircle, AlertCircle, Clock, X, ChevronsUpDown, Download, ArrowRight, MapPin, Terminal, Database, Activity, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { StatusBadge } from '../../components/StatusBadge';
import { SyncStatus } from '../../components/SyncStatus';
import { CreateAssetModal } from './components/CreateAssetModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { RealPropertyAsset } from '../../types';

export const RemisInventory: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  const filteredAssets = useMemo(() => {
    return USACE_ASSETS.filter(asset => {
      const matchesSearch = searchTerm === '' || 
        asset.rpuid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProgram = programFilter === 'All' || asset.program === programFilter;
      const matchesStatus = statusFilter === 'All' || asset.status === statusFilter;

      return matchesSearch && matchesProgram && matchesStatus;
    });
  }, [searchTerm, programFilter, statusFilter]);

  useEffect(() => {
    if (location.state?.showCreateModal) {
      setIsCreateModalOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 italic font-black">
      <CreateAssetModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      
      {/* Authoritative Inventory Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 pb-16 border-b-4 border-slate-950 relative italic">
        <div className="absolute -left-8 top-0 bottom-0 w-2 bg-blue-600 animate-pulse" />
        <div className="space-y-6">
            <div className="flex items-center gap-6">
                <div className="p-5 bg-slate-950 rounded-none text-white shadow-[0_0_50px_rgba(37,99,235,0.2)] transform rotate-3 active:rotate-0 transition-transform cursor-pointer">
                    <Database size={32} className="text-blue-500" />
                </div>
                <div>
                    <h1 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none italic mb-4 select-none">Strategic Asset Command</h1>
                    <div className="flex items-center gap-6">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em] opacity-40">REGISTRY_NODE_ALPHA_921</span>
                        <div className="w-2 h-2 bg-blue-600 rotate-45 animate-pulse" />
                        <span className="text-[11px] font-mono font-black text-blue-600 uppercase tracking-tighter italic shadow-blue-500/10">MASTER_DATABASE_ACCESS::[LEVEL_9]</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-10 italic border-l-4 border-slate-100 pl-10 h-14">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1 italic opacity-40">PRIMARY_PROTOCOL</span>
                    <span className="text-[13px] font-black text-slate-950 uppercase tracking-widest italic leading-none font-mono tracking-tighter">AR_405_10::REMIS_CORE</span>
                </div>
                <div className="w-px h-10 bg-slate-100" />
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1 italic opacity-40">MISSION_CRITICALITY</span>
                    <span className="text-[13px] font-black text-emerald-600 uppercase tracking-widest italic leading-none font-mono tracking-tighter shadow-emerald-500/10">MAX_READINESS_COHERENCE</span>
                </div>
                <RegulatoryBadge refs={['ER 405-1-12', '12', '16']} />
            </div>
        </div>
        
        <div className="flex items-center gap-8 w-full md:w-auto">
            <div className="relative flex-grow md:w-[450px] group">
                <div className="absolute -left-2 top-0 bottom-0 w-1.5 bg-blue-600 scale-y-0 group-focus-within:scale-y-100 transition-transform duration-500 origin-bottom" />
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors animate-pulse" size={20} />
                <input 
                  type="text" 
                  placeholder="SCAN_RPUID_OR_NOMENCLATURE..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-20 pr-10 py-6 bg-slate-50 border-2 border-slate-100 focus:border-slate-950 text-[12px] font-black uppercase tracking-[0.3em] outline-none transition-all italic shadow-2xl placeholder:opacity-20 focus:scale-[1.02] transform origin-right" 
                />
            </div>
            <button onClick={() => setIsCreateModalOpen(true)} className="w-20 h-20 bg-slate-950 text-white flex items-center justify-center group hover:bg-blue-600 transition-all shadow-[0_0_40px_rgba(0,0,0,0.1)] active:scale-90">
                <Plus size={32} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
        </div>
      </div>

      {/* Global Vector Flux Bar */}
      <div className="flex items-center gap-0 p-0 bg-slate-950 border-2 border-slate-900 shadow-2xl relative z-10 italic">
        <div className="flex items-center gap-4 px-10 h-16 border-r-2 border-slate-900 bg-white/5 group transition-colors">
            <Filter size={18} className="text-blue-500 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] italic leading-none">FLUX_VECTOR_CONTROL</span>
        </div>
        <div className="flex flex-grow bg-slate-950">
            <div className="flex flex-col flex-1 border-r-2 border-slate-900 h-16 group hover:bg-white/5 transition-colors">
                <span className="px-10 pt-3 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic mb-0.5">PROGRAM_SELECTOR</span>
                <select value={programFilter} onChange={e => setProgramFilter(e.target.value)} className="w-full bg-transparent text-[11px] font-black text-white uppercase tracking-[0.3em] px-10 outline-none cursor-pointer italic appearance-none leading-none">
                    <option value="All" className="bg-slate-950">GLOBAL_PROGRAMS_STREAM</option>
                    <option value="Civil Works" className="bg-slate-950 text-blue-400">CIVIL_WORKS::NAV_FLOOD</option>
                    <option value="Military" className="bg-slate-950 text-amber-400">MILITARY::READINESS_SUSTAIN</option>
                </select>
            </div>
            <div className="flex flex-col flex-1 border-r-2 border-slate-900 h-16 group hover:bg-white/5 transition-colors">
                <span className="px-10 pt-3 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic mb-0.5">STATUS_TELEMETRY</span>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full bg-transparent text-[11px] font-black text-white uppercase tracking-[0.3em] px-10 outline-none cursor-pointer italic appearance-none leading-none">
                    <option value="All" className="bg-slate-950">ALL_OPERATIONAL_STATES</option>
                    <option value="Active" className="bg-slate-950 text-emerald-400">ACTIVE_COMMAND_READY</option>
                    <option value="In Progress" className="bg-slate-950 text-blue-400">IN_RECON_PHASE_STABLE</option>
                    <option value="Excess" className="bg-slate-950 text-red-500">EXCESS_DECOMMISSION_VECTOR</option>
                </select>
            </div>
        </div>
        
        <div className="flex items-center h-16 divide-x-2 divide-slate-900">
            <button className="h-full px-12 text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] hover:text-white hover:bg-blue-600 flex items-center gap-4 transition-all italic group">
                <Download size={16} className="group-hover:scale-125 transition-transform" /> DATA_EXPORT_MATRIX
            </button>
            <div className="flex items-center gap-8 px-12 bg-white/5">
                <div className="flex items-center gap-4">
                    <Activity size={18} className="text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] font-mono italic">STREAMING_LIVE</span>
                </div>
            </div>
        </div>
      </div>
      
      {/* Registry Table - Bloomberg High-Density */}
      <div className="flex flex-col bg-white border-2 border-slate-950 overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse font-black">
            <thead className="bg-[#0A0A0B] border-b-2 border-slate-900 tracking-tighter italic">
              <tr>
                <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">RPUID_NODE_UUID</th>
                <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5 italic">STRATEGIC_NOMENCLATURE</th>
                <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">PROGRAM</th>
                <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">CLASSIFICATION</th>
                <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5 text-center">VALIDATION</th>
                <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] text-right italic">SYNC_IDX</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-50 italic">
              {filteredAssets.map((asset, idx) => (
                <tr key={asset.id} onClick={() => navigate(`/usace/inventory/${asset.id}`)} className="group cursor-crosshair hover:bg-slate-900 transition-all duration-300">
                  <td className="px-12 py-10 relative border-r-2 border-slate-50 group-hover:border-slate-900 flex flex-col justify-center">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-full group-hover:translate-x-0" />
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-[16px] font-black tracking-tighter text-blue-600 group-hover:text-white transition-colors uppercase leading-none select-all">
                          {asset.rpuid}
                        </span>
                        <div className="w-2 h-2 bg-slate-100 rotate-45 group-hover:bg-blue-600 transition-all opacity-20 group-hover:opacity-100" />
                    </div>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] italic mt-2 opacity-0 group-hover:opacity-100 transition-opacity">NODE_SEQUENCE_L{idx.toString().padStart(2, '0')}</span>
                  </td>
                  <td className="px-12 py-10 border-r-2 border-slate-50 group-hover:border-slate-800">
                    <div className="font-black text-slate-950 group-hover:text-blue-400 transition-colors uppercase tracking-[0.02em] text-[15px] leading-[0.9] mb-3 italic transform group-hover:scale-105 origin-left transition-transform duration-500">{asset.name.replace(' ', '_')}</div>
                    <div className="text-[10px] font-black text-slate-400 group-hover:text-emerald-400 flex items-center gap-4 uppercase tracking-[0.3em] transition-colors italic">
                      <MapPin size={14} className="opacity-40 group-hover:animate-bounce" /> 
                      {asset.location.toUpperCase().replace(',', '::')}
                    </div>
                  </td>
                  <td className="px-12 py-10 border-r-2 border-slate-50 group-hover:border-slate-800">
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-950 px-6 py-2 bg-slate-50 border-2 border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-700 transition-all italic leading-none inline-block transform rotate-2">
                        {asset.program.toUpperCase().replace(' ', '_')}
                    </span>
                  </td>
                  <td className="px-12 py-10 text-[12px] font-black uppercase tracking-[0.3em] text-slate-300 group-hover:text-slate-100 transition-colors border-r-2 border-slate-50 group-hover:border-slate-800 italic">
                    {asset.type.toUpperCase().replace(' ', '_')}
                  </td>
                  <td className="px-12 py-10 border-r-2 border-slate-50 group-hover:border-slate-800">
                    <div className="flex justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                      <StatusBadge status={asset.status} />
                    </div>
                  </td>
                  <td className="px-12 py-10 text-right bg-slate-50/10 group-hover:bg-slate-950 transition-all border-l-2 border-transparent group-hover:border-white/10">
                      <div className="flex justify-end gap-6 items-center">
                          <SyncStatus status={asset.cefmsSyncStatus} showLabel={true} />
                          <ArrowRight size={18} className="text-slate-100 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAssets.length === 0 && (
            <div className="py-64 flex flex-col items-center justify-center text-slate-950 bg-slate-50 border-t-4 border-slate-950 relative overflow-hidden italic">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none grayscale" style={{backgroundImage: 'url(https://picsum.photos/seed/command/1920/1080)', backgroundSize: 'cover'}} />
                <ShieldAlert size={120} className="mb-12 text-slate-950 animate-bounce relative z-10" />
                <p className="text-[20px] font-black uppercase tracking-[1em] relative z-10 leading-none">MISSION_CRITICAL_FAILURE</p>
                <p className="text-[12px] font-black uppercase tracking-[0.4em] opacity-40 mt-6 relative z-10">NO_MATCHING_ASSET_VECTORS_FOUND_IN_NODE_CORE</p>
                <button onClick={() => {setSearchTerm(''); setProgramFilter('All'); setStatusFilter('All');}} className="mt-16 px-16 py-6 bg-slate-950 text-white font-black text-[12px] uppercase tracking-[0.8em] hover:bg-blue-600 transition-all italic relative z-10 shadow-2xl active:scale-95">RESET_COMMAND_SENSOR_ARRAY</button>
            </div>
          )}
        </div>
        
        {/* Terminal Footer Info */}
        <div className="px-12 py-10 bg-slate-950 text-white/40 flex justify-between items-center text-[12px] font-black uppercase tracking-[1em] italic leading-none border-t-4 border-slate-900 shadow-inner">
            <div className="flex items-center gap-16">
                <div className="flex items-center gap-6">
                    <Terminal size={20} className="text-blue-500 animate-pulse" />
                    <span className="flex items-center gap-4">
                        INVENTORY_ENGINE_V9.6 <span className="w-2 h-2 rounded-none bg-blue-600" /> [ {filteredAssets.length.toString().padStart(3, '0')} ACTIVE_PATHS ]
                    </span>
                </div>
                <div className="w-[1px] h-10 bg-white/5 opacity-50" />
                <div className="flex items-center gap-6">
                    <Activity size={20} className="text-emerald-500" />
                    <span>LATENCY_SYNC::OPTIMAL (11MS)</span>
                </div>
            </div>
            <div className="flex items-center gap-20">
                <span className="text-white/5 font-mono text-[10px]">AUTH_MODE::SECURE_L9_AES_GCM_CORE_891X</span>
                <div className="flex items-center gap-6 text-emerald-500 shadow-emerald-500/10 shadow-2xl italic group">
                    <div className="p-2 border border-emerald-500/20 group-hover:border-emerald-500 transition-all">
                        <CheckCircle size={18} className="text-emerald-500 group-hover:scale-125 transition-transform" /> 
                    </div>
                    <span>SYSTEM_MASTER_SYNC_ESTABLISHED</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
