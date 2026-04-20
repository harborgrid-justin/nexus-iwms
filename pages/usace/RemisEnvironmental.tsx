import React, { useState } from 'react';
import { Leaf, Plus, LayoutGrid, List as ListIcon, Download, Search, Filter, MoreHorizontal, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { USACE_ENVIRONMENTAL } from '../../services/mockData';
import { EnvironmentalSite } from '../../types';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { EnvironmentalModal } from './components/EnvironmentalModal';
import { StatusBadge } from '../../components/StatusBadge';

type LifecycleState = 'Identified' | 'Assessed' | 'Under Remediation' | 'Compliant' | 'Closed' | 'Archived';
const STATES: LifecycleState[] = ['Identified', 'Assessed', 'Under Remediation', 'Compliant', 'Closed'];

interface KanbanColumnProps {
  title: LifecycleState;
  records: EnvironmentalSite[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, records }) => {
    const navigate = useNavigate();
    
    const getStageColor = (state: LifecycleState) => {
        if (['Closed', 'Archived'].includes(state)) return 'bg-slate-400';
        if (['Compliant'].includes(state)) return 'bg-emerald-500';
        if (['Under Remediation'].includes(state)) return 'bg-rose-600';
        return 'bg-amber-500';
    };

    return (
        <div className="flex-1 min-w-[340px] bg-slate-50 border-2 border-slate-900 flex flex-col max-h-full overflow-hidden shadow-2xl italic group/col">
            <div className="p-5 border-b-2 border-slate-900 bg-slate-950 flex items-center justify-between sticky top-0 z-10 text-white">
                <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-none rotate-45 ${getStageColor(title)} shadow-[0_0_15px_rgba(255,255,255,0.2)]`}></div>
                    <h3 className="font-black text-[11px] uppercase tracking-[0.4em] italic">{title.replace(' ', '_')}</h3>
                </div>
                <span className="text-[10px] font-mono font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-none border border-emerald-500/20">[{records.length.toString().padStart(2, '0')}]</span>
            </div>
            
            <div className="p-4 space-y-4 overflow-y-auto flex-1 no-scrollbar bg-slate-50/50">
                {records.map(r => (
                    <div 
                        key={r.id} 
                        onClick={() => navigate(`/usace/environmental/${r.id}`)}
                        className="pro-card p-6 bg-white border-2 border-slate-100 hover:border-slate-950 group cursor-pointer relative overflow-hidden transition-all shadow-xl hover:shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                            <Leaf size={60} />
                        </div>
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${r.riskClassification === 'High' ? 'bg-rose-600' : r.riskClassification === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="text-[9px] font-black text-emerald-600 group-hover:text-emerald-700 font-mono uppercase tracking-tighter italic">SITE_NODE_HEX::{r.id}</div>
                                    <h4 className="font-black text-slate-900 text-[14px] leading-tight transition-colors uppercase tracking-tight italic select-all">{r.siteName}</h4>
                                </div>
                                <MoreHorizontal size={14} className="text-slate-300 group-hover:text-slate-950 transition-colors" />
                            </div>

                            <div className="flex items-center gap-4 text-[10px] text-slate-400 group-hover:text-slate-950 font-black uppercase italic tracking-widest transition-colors">
                                <span className="opacity-40">MKT_ASSET_UID::</span>
                                <span className="text-slate-600 group-hover:text-slate-950 font-mono underline decoration-emerald-500/30 decoration-2 underline-offset-4">{r.assetId}</span>
                            </div>

                            <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 font-black">
                                <div className="flex flex-wrap gap-2">
                                    {r.programApplicability.map(p => (
                                        <span key={p} className="text-[8px] font-black bg-slate-950 text-white px-2 py-1 rounded-none uppercase tracking-tighter border border-slate-900 group-hover:bg-emerald-600 transition-colors shadow-lg shadow-black/10">{p}</span>
                                    ))}
                                </div>
                                <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] italic ${r.riskClassification === 'High' ? 'text-rose-600' : r.riskClassification === 'Medium' ? 'text-amber-500' : 'text-emerald-500'}`}>
                                    {r.riskClassification === 'High' ? <AlertTriangle size={12} className="animate-pulse" /> : <ShieldCheck size={12} />}
                                    {r.riskClassification.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {records.length === 0 && (
                    <div className="h-40 border-2 border-dashed border-slate-200 rounded-none flex flex-col items-center justify-center bg-white/30 group-hover/col:border-slate-300 transition-colors">
                        <ShieldCheck size={24} className="text-slate-200 mb-3" />
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] italic">Compliant_Sector</p>
                    </div>
                )}
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 italic text-center">
                <button className="text-[9px] font-black text-slate-400 hover:text-slate-950 uppercase tracking-[0.3em] transition-all">
                    INIT_STAGE_RECON
                </button>
            </div>
        </div>
    );
};

export const RemisEnvironmental: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const handleSave = (record: Partial<EnvironmentalSite>, reason: string) => {
      console.log("Saving environmental site:", record, "Reason:", reason);
      alert('Environmental impact profile registered. Compliance tracking active.');
      setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 h-full flex flex-col overflow-hidden max-h-[calc(100vh-120px)] italic font-black">
      <EnvironmentalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      
      {/* Environmental Command Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-10 border-b-2 border-slate-900 relative flex-shrink-0">
        <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-emerald-500 animate-pulse" />
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600 rounded-none text-white shadow-2xl shadow-emerald-900/40 transform rotate-2">
                    <Leaf size={24} />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic mb-2">Environmental Strategic Vector</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-60">NEPA_COMPLIANCE_STREAM_V7</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[10px] font-mono font-black text-emerald-600 uppercase tracking-tighter italic">REG_AUTHORITY_SYNC: 42 U.S.C. §4321</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-6 italic border-l-2 border-slate-100 pl-6">
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic opacity-40">MISSION_CRITICAL</span>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest italic leading-none">LIABILITY_MITIGATION_ACTIVE</span>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic opacity-40">SYSTEM_PROTOCOL</span>
                    <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest italic leading-none">CERCLA_SYNC::READY</span>
                </div>
                <RegulatoryBadge refs={['7']} />
            </div>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="flex bg-slate-950 p-1 border-2 border-slate-950 shadow-2xl shrink-0">
                <button 
                  onClick={() => setViewMode('kanban')}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all italic flex items-center gap-2 ${viewMode === 'kanban' ? 'bg-white text-slate-950 shadow-inner' : 'text-white/40 hover:text-white'}`}
                >
                    <LayoutGrid size={14} /> KANBAN_STREAM
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all italic flex items-center gap-2 ${viewMode === 'list' ? 'bg-white text-slate-950 shadow-inner' : 'text-white/40 hover:text-white'}`}
                >
                    <ListIcon size={14} /> REGISTER_VIEW
                </button>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn-pro-primary bg-slate-950 hover:bg-emerald-600 flex items-center gap-4 px-10 py-4 h-auto text-[11px] font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-emerald-500/20 active:scale-95">
                <Plus size={18} /> REGISTER_AFFECTED_NODE
            </button>
        </div>
      </div>
      
      {/* Tactical Environment Area */}
      <div className="flex-grow flex flex-col bg-white border-2 border-slate-900 shadow-2xl relative overflow-hidden">
        <div className="px-10 py-6 border-b-2 border-slate-900 bg-slate-950 flex items-center justify-between italic">
            <div className="flex items-center gap-6">
                <Leaf size={18} className="text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white">Environmental Compliance Deployment Pipeline</span>
            </div>
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-3 text-[9px] font-black text-emerald-500 uppercase tracking-widest italic">
                    <Activity size={14} className="animate-pulse" />
                    <span>L6_ENV_RECON_ACTIVE</span>
                </div>
                <button className="flex items-center gap-3 text-[9px] font-black text-white/40 hover:text-white uppercase tracking-[0.4em] italic leading-none transition-colors">
                    <Download size={14} /> EXPORT_DATA_STREAM
                </button>
            </div>
        </div>
        
        <div className="p-8 border-b-2 border-slate-100 bg-slate-50/30 flex items-center gap-6 italic">
            <div className="relative flex-1 max-w-lg group">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-emerald-500 group-focus-within:h-full transition-all" />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
                <input type="text" placeholder="SCAN_SITE_NODES::ASSET_MARKERS_PROGRAM_VECTORS..." className="w-full pl-16 pr-6 py-4 bg-white border-2 border-slate-900 rounded-none text-[11px] font-mono font-black uppercase tracking-widest outline-none shadow-xl" />
            </div>
            <button className="flex items-center gap-4 px-6 py-4 text-[11px] font-black text-slate-400 hover:text-slate-950 uppercase tracking-[0.3em] border-2 border-transparent hover:border-slate-900 transition-all italic">
                <Filter size={16} /> REFINE_SITE_MATRIX
            </button>
        </div>
        
        <div className="flex-grow overflow-x-auto p-10 bg-slate-50/50 custom-scrollbar">
            <div className="flex gap-10 h-full pb-6">
                {STATES.map(state => (
                    <KanbanColumn 
                        key={state}
                        title={state} 
                        records={USACE_ENVIRONMENTAL.filter(a => a.lifecycleState === state)} 
                    />
                ))}
            </div>
        </div>

        {/* Terminal Info Footer */}
        <div className="px-10 py-6 bg-slate-950 text-white/40 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.6em] italic leading-none border-t border-white/5">
            <div className="flex items-center gap-12">
                <div className="flex items-center gap-4">
                    <ShieldCheck size={14} className="text-emerald-500 animate-pulse" />
                    <span>AUDIT_STABLE_V9.4::[ {USACE_ENVIRONMENTAL.length.toString().padStart(3, '0')} ENV_NODES ]</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-4">
                    <Clock size={14} className="text-blue-500" />
                    <span>LTM_SYNC_LATENCY::[ 44ms ]</span>
                </div>
            </div>
            <span className="text-white/5 select-none font-mono">BUREAU_ENVIRONMENTAL_VECTORS_L6_SECURE</span>
        </div>
      </div>
    </div>
  );
};
