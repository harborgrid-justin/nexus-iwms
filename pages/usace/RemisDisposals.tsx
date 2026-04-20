import React, { useState } from 'react';
import { Trash2, Plus, ArrowRight, Filter, Search, Download, LayoutGrid, List as ListIcon, Clock, CheckCircle, AlertCircle, MoreHorizontal, Terminal, Activity, ArrowUpRight } from 'lucide-react';
import { USACE_DISPOSALS } from '../../services/mockData';
import { DisposalRecord } from '../../types';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { DisposalModal } from './components/DisposalModal';
import { StatusBadge } from '../../components/StatusBadge';

type LifecycleState = 'Initiated' | 'Excess Determined' | 'Pending Authorization' | 'Authorized' | 'Executed' | 'Closed' | 'Archived';
const STATES: LifecycleState[] = ['Initiated', 'Excess Determined', 'Pending Authorization', 'Authorized', 'Executed', 'Closed'];

interface KanbanColumnProps {
  title: LifecycleState;
  records: DisposalRecord[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, records }) => {
    const navigate = useNavigate();
    
    const getStageColor = (state: LifecycleState) => {
        if (['Closed', 'Archived'].includes(state)) return 'bg-slate-500';
        if (['Executed', 'Authorized'].includes(state)) return 'bg-emerald-500';
        if (['Pending Authorization'].includes(state)) return 'bg-amber-500';
        return 'bg-blue-600';
    };

    return (
        <div className="flex-1 min-w-[320px] bg-slate-50/50 border-r border-slate-200 flex flex-col max-h-full overflow-hidden last:border-r-0 italic font-black">
            <div className="p-4 border-b-2 border-slate-900 bg-white flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-none ${getStageColor(title)} shadow-lg active-pulse`}></div>
                    <h3 className="font-black text-[11px] uppercase tracking-widest italic">{title}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-black text-slate-300 uppercase tracking-tighter">UNITS_LOADED</span>
                    <span className="text-[10px] font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-200 uppercase tracking-tighter">[{records.length.toString().padStart(2, '0')}]</span>
                </div>
            </div>
            
            <div className="p-4 space-y-4 overflow-y-auto flex-1 no-scrollbar bg-slate-100/30">
                {records.map(r => (
                    <div 
                        key={r.id} 
                        onClick={() => navigate(`/usace/disposals/${r.id}`)}
                        className="group cursor-pointer relative"
                    >
                        {/* Decorative background elements for Bloomberg feel */}
                        <div className="absolute inset-0 bg-white border border-slate-200 shadow-sm group-hover:shadow-2xl group-hover:border-slate-900 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 z-10" />
                        <div className="absolute inset-0 bg-slate-900 translate-y-1 -translate-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300" />

                        <div className="relative p-5 z-20 flex flex-col gap-4">
                             <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1 h-3 bg-red-600" />
                                        <span className="text-[9px] font-mono font-black text-slate-400 group-hover:text-red-600 uppercase tracking-tighter transition-colors">NODE_EXCESS::{r.id}</span>
                                    </div>
                                    <h4 className="font-black text-slate-900 text-[12px] leading-tight transition-colors uppercase tracking-tight italic">DISP_MTD: {r.proposedMethod}</h4>
                                </div>
                                <div className="p-1 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                    <ArrowUpRight size={14} className="text-slate-300 transition-colors" />
                                </div>
                             </div>
                            
                             <div className="flex items-center gap-3 text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] italic pt-2 border-t border-slate-50 group-hover:border-slate-100 transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-[7px] text-slate-300 mb-0.5 tracking-widest uppercase">ASSET_VECTOR</span>
                                    <span className="font-mono text-slate-900 group-hover:text-blue-600 transition-colors">#{r.assetId}</span>
                                </div>
                                <div className="ml-auto flex flex-col items-end">
                                    <span className="text-[7px] text-slate-300 mb-0.5 tracking-widest uppercase">ORG_ORIGIN</span>
                                    <span className="group-hover:text-slate-900 transition-colors">{r.initiatingOrg}</span>
                                </div>
                             </div>

                             {r.proceeds && (
                                <div className="flex items-center justify-between mt-1 p-3 bg-slate-50 group-hover:bg-slate-900 transition-colors italic font-black">
                                    <div className="flex flex-col">
                                        <span className="text-[7px] text-slate-400 group-hover:text-white/40 uppercase tracking-[0.2em]">EST_RECOVERY</span>
                                        <span className="text-[12px] text-emerald-600 group-hover:text-emerald-400 font-mono tracking-tighter">${r.proceeds.toLocaleString()}</span>
                                    </div>
                                    <Activity size={12} className="text-slate-200 group-hover:text-blue-500" />
                                </div>
                             )}
                        </div>
                    </div>
                ))}
                
                {records.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center opacity-20 italic bg-white/50">
                        <Terminal size={20} className="mb-2 text-slate-400" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">NO_RECORDS::STANDBY</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export const RemisDisposals: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

    const handleSave = (record: Partial<DisposalRecord>, reason: string) => {
        console.log("Saving disposal:", record, "Reason:", reason);
        alert('Disposal case initiated. Authoritative audit trail updated per regulations.');
        setIsModalOpen(false);
    };

    return (
    <div className="max-w-[1600px] mx-auto space-y-8 h-full flex flex-col overflow-hidden max-h-[calc(100vh-80px)] p-6 italic font-black">
        <DisposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
        
        {/* Strategic Divestiture Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b-2 border-slate-900 flex-shrink-0 relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-red-600 pulse-mission" />
            <div className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-red-600 rounded-none text-white shadow-2xl shadow-red-900/40 transform -rotate-2">
                        <Trash2 size={24} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none italic mb-2">Strategic Divestiture Command</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-none opacity-60">REGISTRY_NODE_DIV_084</span>
                            <div className="w-1 h-1 bg-slate-200 rounded-full" />
                            <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-tighter italic">PROTOCOL_L6::ACTIVE</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6 italic border-l-2 border-slate-100 pl-6">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic opacity-40">LEGAL_AUTHORITY_VECTOR</span>
                        <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest italic">40 U.S.C. §§521–559</span>
                    </div>
                    <div className="w-px h-8 bg-slate-100" />
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic opacity-40">MISSION_CRITICALITY</span>
                        <span className="text-[11px] font-black text-red-600 uppercase tracking-widest italic">HIGH_IMPACT_DIVESTITURE</span>
                    </div>
                    <RegulatoryBadge refs={['AR 405-90', 'ER 405-1-12']} />
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="flex bg-slate-950 p-1 rounded-none border border-white/10 shadow-2xl">
                    <button 
                        onClick={() => setViewMode('kanban')}
                        className={`px-4 py-2 text-[10px] uppercase font-black tracking-widest transition-all italic flex items-center gap-2 ${viewMode === 'kanban' ? 'bg-white text-slate-900' : 'text-white/40 hover:text-white'}`}
                    >
                        <LayoutGrid size={14} /> MATRIX
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 text-[10px] uppercase font-black tracking-widest transition-all italic flex items-center gap-2 ${viewMode === 'list' ? 'bg-white text-slate-900' : 'text-white/40 hover:text-white'}`}
                    >
                        <ListIcon size={14} /> REGISTRY
                    </button>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-pro-primary flex items-center gap-4 px-8 py-4 h-auto text-[11px] font-black uppercase tracking-[0.3em] italic shadow-2xl shadow-blue-500/20">
                    <Plus size={18} /> INITIATE_DIVESTITURE_PROTOCOL
                </button>
            </div>
        </div>
        
        <div className="flex-grow flex flex-col bg-slate-50/50 border-2 border-slate-200 overflow-hidden shadow-2xl">
            <div className="px-8 py-4 border-b-2 border-slate-200 bg-white flex items-center gap-8 italic">
                <div className="relative flex-1 max-w-md group">
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-600 group-hover:h-full transition-all duration-300" />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-600 transition-colors" size={16} />
                    <input type="text" placeholder="SCAN_DIVESTITURE_COORDINATES..." className="w-full pl-14 pr-6 py-3 border-none bg-slate-50 focus:bg-white text-[11px] outline-none italic font-black uppercase tracking-widest transition-all" />
                </div>
                <button className="flex items-center gap-3 text-[10px] font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-[0.4em] italic leading-none group">
                    <Filter size={14} className="group-hover:rotate-180 transition-transform" /> VECTOR_LOCK_FILTERS
                </button>
                <div className="ml-auto flex items-center gap-8">
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">ACTIVE_DIV_FLUX</span>
                        <span className="text-[12px] font-mono font-black text-slate-900 italic leading-none tracking-tighter">74_UNITS</span>
                    </div>
                    <button className="flex items-center gap-3 px-6 py-2.5 bg-slate-950 text-white text-[9px] font-black uppercase tracking-[0.4em] hover:bg-slate-900 transition-all italic border border-white/10 shadow-xl">
                        <Download size={14} className="text-blue-500" /> FISCAL_AUDIT_EXPORT
                    </button>
                </div>
            </div>
            
            <div className="flex-grow overflow-x-auto p-8 bg-[#F1F5F9] no-scrollbar">
                <div className="flex gap-8 h-full">
                    {STATES.map(state => (
                        <KanbanColumn 
                            key={state}
                            title={state} 
                            records={USACE_DISPOSALS.filter(a => a.lifecycleState === state)} 
                        />
                    ))}
                </div>
            </div>

            <div className="px-8 py-3 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.5em] italic text-white/30">
                <div className="flex items-center gap-4">
                    <Terminal size={12} className="text-blue-500 animate-pulse" />
                    DIVESTITURE_TERMINAL_V8_COMMISSIONED::READY
                </div>
                <div className="flex gap-8">
                    <span>OVERSIGHT::HQ_CIVIL_WORKS</span>
                    <span className="text-white/10">RECORD_HASH::0x84A2F...</span>
                </div>
            </div>
        </div>
    </div>
    );
};
