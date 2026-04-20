import React, { useState } from 'react';
import { ArrowRightLeft, Plus, LayoutGrid, List as ListIcon, Download, Search, Filter, MoreHorizontal, MapPin, DollarSign as DollarIcon, Calendar, Terminal, Activity, ArrowUpRight } from 'lucide-react';
import { USACE_ACQUISITIONS } from '../../services/mockData';
import { AcquisitionRecord } from '../../types';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { AcquisitionModal } from './components/AcquisitionModal';
import { StatusBadge } from '../../components/StatusBadge';

type Stage = 'Planning' | 'Site Selection' | 'NEPA Review' | 'Appraisal' | 'Negotiation' | 'Condemnation' | 'Closing' | 'Closed' | 'Terminated';
const STAGES: Stage[] = ['Planning', 'Site Selection', 'NEPA Review', 'Appraisal', 'Negotiation', 'Condemnation', 'Closing', 'Closed'];

interface KanbanColumnProps {
  title: Stage;
  records: AcquisitionRecord[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, records }) => {
  const navigate = useNavigate();
  
  const getStageColor = (stage: Stage) => {
    if (['Closed', 'Terminated'].includes(stage)) return 'bg-slate-400';
    if (['Closing', 'Negotiation'].includes(stage)) return 'bg-blue-600';
    if (['Appraisal', 'NEPA Review'].includes(stage)) return 'bg-purple-600';
    return 'bg-amber-500';
  };
  
  return (
    <div className="flex-1 min-w-[280px] bg-slate-50/20 border border-slate-200/60 flex flex-col max-h-full overflow-hidden shadow-sm">
      <div className="p-3 border-b border-slate-200 bg-[#0A0A0B] flex items-center justify-between sticky top-0 z-10 text-white">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${getStageColor(title)} shadow-[0_0_8px_rgba(255,255,255,0.2)]`}></div>
          <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] italic" style={{fontFamily: 'Georgia, serif'}}>{title}</h3>
        </div>
        <span className="text-[10px] font-mono font-black text-white/40 bg-white/5 px-1.5 py-0.5 rounded-sm border border-white/10 uppercase tracking-tighter">[{records.length.toString().padStart(2, '0')}]</span>
      </div>
      
      <div className="p-2 space-y-2 overflow-y-auto flex-1 no-scrollbar">
        {records.map(r => (
          <div 
            key={r.id} 
            onClick={() => navigate(`/usace/acquisitions/${r.id}`)}
            className="pro-card p-3 hover:bg-slate-900 group cursor-pointer relative overflow-hidden"
          >
            <div className="flex flex-col gap-2">
               <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono font-black text-blue-600 group-hover:text-amber-400 uppercase tracking-tighter">NODE::{r.id}</span>
                    <h4 className="font-bold text-slate-900 group-hover:text-white text-[11px] leading-tight transition-colors uppercase tracking-tight mt-0.5">INTAKE: {r.acquisitionMethod}</h4>
                  </div>
                  <ArrowUpRight size={12} className="text-slate-200 group-hover:text-blue-400 transition-colors" />
               </div>

               <div className="flex items-center gap-1.5 text-[9px] text-slate-400 group-hover:text-white/40 font-bold uppercase tracking-widest italic">
                  <MapPin size={10} className="text-blue-500 opacity-50" />
                  ASSET_LNK: {r.assetId}
               </div>

               <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-50 group-hover:border-white/5 font-mono">
                  <span className="font-black text-slate-900 group-hover:text-white text-xs tracking-tighter">${r.cost.toLocaleString()}</span>
                  <div className="text-[8px] font-bold text-slate-300 group-hover:text-blue-500 uppercase tracking-widest">PROTOCOL_ACTIVE</div>
               </div>
            </div>
          </div>
        ))}
        
        {records.length === 0 && (
          <div className="h-32 border border-dashed border-slate-200 flex flex-col items-center justify-center opacity-40 bg-white/50">
            <Terminal size={20} className="text-slate-300 mb-2" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] italic">Station_Idle</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const RemisAcquisitions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const handleSave = (record: Partial<AcquisitionRecord>, reason: string) => {
    console.log("Saving record:", record, "Reason:", reason);
    alert('Strategic acquisition record initialized. Authorization pipeline active.');
    setIsModalOpen(false);
  }

  return (
    <div className="max-w-[1700px] mx-auto space-y-8 h-full flex flex-col overflow-hidden max-h-[calc(100vh-120px)] italic font-black">
      <AcquisitionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b-2 border-slate-900 relative flex-shrink-0">
        <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-blue-600 pulse-mission" />
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-none text-white shadow-2xl shadow-blue-900/40 transform rotate-2">
                    <ArrowRightLeft size={24} />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic mb-2">Acquisition Command Pipeline</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-60">STRAT_INTAKE_PROTOCOL_V7</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-tighter italic">BUREAU_LEVEL_AUTH: SECURE_L6</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-6 italic border-l-2 border-slate-100 pl-6">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic opacity-40">GOVERNANCE_CODE</span>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest italic leading-none">ER 405-1-12</span>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic opacity-40">READINESS_INDEX</span>
                    <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest italic leading-none">OPTIMIZED_TRAJECTORY</span>
                </div>
                <RegulatoryBadge refs={['ER 1110', '92']} />
            </div>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="flex bg-slate-50 p-1 border-2 border-slate-900 rounded-none shadow-2xl">
                <button 
                  onClick={() => setViewMode('kanban')}
                  className={`px-4 py-2 transition-all flex items-center gap-2 group ${viewMode === 'kanban' ? 'bg-slate-950 text-white' : 'text-slate-400 hover:text-slate-900'}`}
                >
                    <LayoutGrid size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity">GRID_MATRIX</span>
                </button>
                <div className="w-px h-6 bg-slate-200 my-auto" />
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 transition-all flex items-center gap-2 group ${viewMode === 'list' ? 'bg-slate-950 text-white' : 'text-slate-400 hover:text-slate-900'}`}
                >
                    <ListIcon size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity">FLAT_REGISTRY</span>
                </button>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn-pro-primary flex items-center gap-4 px-10 py-4 h-auto text-[11px] font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-blue-500/20 active:scale-95">
                <Plus size={18} /> INITIATE_STRAT_CASE
            </button>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col bg-white border-2 border-slate-900 shadow-2xl relative">
        <div className="px-10 py-6 border-b-2 border-slate-900 bg-slate-950 flex items-center gap-10 italic">
            <div className="relative flex-1 max-w-xl group">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-blue-600 group-focus-within:h-full transition-all" />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" size={16} />
                <input type="text" placeholder="FILTER_ACQUISITION_NODES..." className="w-full pl-14 pr-6 py-4 bg-white/5 focus:bg-white/10 text-white text-[11px] font-mono font-black uppercase tracking-[0.2em] outline-none transition-all shadow-inner border border-white/5" />
            </div>
            <button className="flex items-center gap-3 text-[10px] font-black text-white/40 hover:text-blue-400 transition-all uppercase tracking-[0.4em] italic leading-none border-r border-white/5 pr-10">
                <Filter size={14} /> MATRIX_PARAMETERS
            </button>
            <div className="ml-auto flex items-center gap-10 h-full">
                <div className="flex items-center gap-3 text-[9px] font-black text-emerald-500 uppercase tracking-widest italic">
                    <Activity size={14} className="animate-pulse" />
                    <span>L6_CORE_READY</span>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <button className="text-[9px] font-black text-white/40 uppercase tracking-[0.5em] hover:text-white flex items-center gap-4 transition-all italic leading-none group">
                    <Download size={16} className="text-blue-500 group-hover:scale-125 transition-transform" /> DATA_EXPORT_P4
                </button>
            </div>
        </div>
        
        <div className="flex-grow overflow-x-auto p-8 bg-slate-900/5 no-scrollbar">
            <div className="flex gap-8 h-full">
                {STAGES.map(stage => (
                    <div key={stage} className="flex-1 min-w-[340px] flex flex-col max-h-full">
                        <div className="flex flex-col gap-2 mb-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-[0.2em] italic flex items-center gap-3">
                                    <div className={`w-3 h-3 rotate-45 ${['Closed', 'Terminated'].includes(stage) ? 'bg-slate-400' : 'bg-blue-600'}`} />
                                    {stage.toUpperCase()}
                                </h3>
                                <span className="bg-slate-950 text-white text-[10px] font-mono font-black px-2 py-0.5 tracking-tighter italic">N.{USACE_ACQUISITIONS.filter(a => a.stage === stage).length.toString().padStart(2, '0')}</span>
                            </div>
                            <div className="h-1 bg-slate-950/5 relative overflow-hidden">
                                <div className={`absolute inset-0 bg-blue-600/20 transform ${['Closed', 'Terminated'].includes(stage) ? 'translate-x-full' : 'translate-x-0'} transition-transform duration-500`} />
                            </div>
                        </div>
                        
                        <div className="flex-grow overflow-y-auto no-scrollbar space-y-4 pr-1">
                            {USACE_ACQUISITIONS.filter(a => a.stage === stage).map(r => (
                                <div 
                                    key={r.id} 
                                    onClick={() => navigate(`/usace/acquisitions/${r.id}`)}
                                    className="bg-white border-2 border-slate-200 p-6 cursor-pointer hover:border-slate-900 hover:shadow-2xl transition-all relative group overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-blue-600/5 rotate-45 group-hover:bg-blue-600/10 transition-colors" />
                                    <div className="flex flex-col gap-4 relative z-10">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-mono font-black text-blue-600 group-hover:text-blue-800 uppercase tracking-tighter italic">HEX_NODE::{r.id}</span>
                                                <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-tight italic leading-tight group-hover:text-blue-600 transition-colors">INTAKE: {r.acquisitionMethod.toUpperCase()}</h4>
                                            </div>
                                            <ArrowUpRight size={14} className="text-slate-200 group-hover:text-blue-600 transition-all translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                                        </div>

                                        <div className="flex flex-col gap-2 pt-4 border-t border-slate-50 italic">
                                            <div className="flex items-center gap-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                                <MapPin size={12} className="text-blue-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                                                ASSET_LNK: {r.assetId}
                                            </div>
                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-[14px] font-mono font-black text-slate-900 tracking-tighter italic">${r.cost.toLocaleString()}</span>
                                                <div className="text-[8px] font-black text-blue-600/40 uppercase tracking-[0.4em] group-hover:text-blue-600 transition-colors leading-none">PROTOCOL_MOD_ACTIVE</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {USACE_ACQUISITIONS.filter(a => a.stage === stage).length === 0 && (
                                <div className="h-48 border-2 border-dashed border-slate-200/50 flex flex-col items-center justify-center opacity-20 grayscale bg-slate-50 italic font-black">
                                    <Terminal size={32} className="text-slate-400 mb-4" />
                                    <p className="text-[10px] uppercase tracking-[0.6em]">NODE_STANDBY_P9</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Terminal Footer Info */}
        <div className="px-10 py-6 bg-slate-950 text-white/40 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.6em] italic leading-none border-t border-white/5">
            <div className="flex items-center gap-12">
                <div className="flex items-center gap-4">
                    <Terminal size={14} className="text-blue-500 animate-pulse" />
                    <span>PIPELINE_STABLE_V4.2::[ {USACE_ACQUISITIONS.length.toString().padStart(3, '0')} NODES ]</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-4">
                    <Activity size={14} className="text-emerald-500" />
                    <span>LIFECYCLE_OPTIMIZED::144MS</span>
                </div>
            </div>
            <div className="flex items-center gap-12">
                <span className="text-white/5 select-none">ENCRYPTED_SIGINT_STREAM</span>
                <div className="flex items-center gap-4 text-emerald-500/60 shadow-emerald-500/20 shadow-lg italic">
                    <StatusBadge status="Closed" className="scale-75 origin-right" /> 
                    <span>CORE_ENGINE_OPERATIONAL</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
