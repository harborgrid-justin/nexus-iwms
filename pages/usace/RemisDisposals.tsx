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
        if (['Closed', 'Archived'].includes(state)) return 'bg-slate-400';
        if (['Executed', 'Authorized'].includes(state)) return 'bg-emerald-500';
        if (['Pending Authorization'].includes(state)) return 'bg-amber-500';
        return 'bg-blue-600';
    };

    return (
        <div className="flex-1 min-w-[280px] bg-slate-50/20 rounded-sm border border-slate-200/60 flex flex-col max-h-full overflow-hidden">
            <div className="p-3 border-b border-slate-200 bg-white flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${getStageColor(title)} shadow-sm`}></div>
                    <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.15em]">{title}</h3>
                </div>
                <span className="text-[9px] font-mono font-black text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{records.length}</span>
            </div>
            
            <div className="p-2 space-y-2 overflow-y-auto flex-1 custom-scrollbar">
                {records.map(r => (
                    <div 
                        key={r.id} 
                        onClick={() => navigate(`/usace/disposals/${r.id}`)}
                        className="bg-white p-3 border border-slate-200 hover:border-red-500 cursor-pointer transition-all group relative overflow-hidden"
                    >
                        <div className="flex flex-col gap-2">
                             <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-mono font-black text-red-600 uppercase tracking-tighter">CASE: {r.id}</span>
                                    <h4 className="font-bold text-slate-900 text-[11px] leading-tight group-hover:text-red-600 transition-colors uppercase tracking-tight mt-0.5">DISP: {r.proposedMethod}</h4>
                                </div>
                                <ArrowUpRight size={12} className="text-slate-200 group-hover:text-red-400 transition-colors" />
                             </div>
                            
                             <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-widest italic pt-1">
                                <span className="bg-slate-50 px-1 py-0.5 rounded border border-slate-100 font-mono">ASSET: {r.assetId}</span>
                                <span className="ml-auto text-[8px]">{r.initiatingOrg}</span>
                             </div>

                             {r.proceeds && (
                                <div className="flex items-center justify-between mt-1 pt-2 border-t border-slate-50 font-mono">
                                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">PROCEEDS</span>
                                    <span className="font-black text-emerald-600 text-xs tracking-tighter italic">${r.proceeds.toLocaleString()}</span>
                                </div>
                             )}
                        </div>
                    </div>
                ))}
                
                {records.length === 0 && (
                    <div className="h-20 border-2 border-dashed border-slate-100 flex items-center justify-center opacity-40 italic">
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Idle</p>
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
    <div className="max-w-[1600px] mx-auto space-y-6 h-full flex flex-col overflow-hidden max-h-[calc(100vh-120px)]">
      <DisposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      
      {/* Strategic Divestiture Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Trash2 size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase px-1">Disposal & Divestiture Command</h1>
            <RegulatoryBadge refs={['5']} />
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-red-600">Strategic Excess Property Lifecycle Management</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Protocol: 40 U.S.C. §§521–559</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 rounded p-1 border border-slate-200">
                <button 
                  onClick={() => setViewMode('kanban')}
                  className={`p-1.5 rounded transition-all ${viewMode === 'kanban' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <LayoutGrid size={14} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <ListIcon size={14} />
                </button>
            </div>
            <button className="btn-pro-primary !bg-slate-900 !hover:bg-black flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
                <Plus size={16} /> Initiate Program Case
            </button>
        </div>
      </div>
      
      <div className="flex-grow pro-card overflow-hidden flex flex-col">
        <div className="p-3 border-b border-slate-100 bg-slate-50/30 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Scan divestiture cases..." className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded text-[11px] bg-white focus:ring-1 focus:ring-blue-500 outline-none italic font-mono" />
            </div>
            <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-widest">
                <Filter size={12} /> Global Filters
            </button>
            <div className="ml-auto">
                <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                    <Download size={14} /> Fiscal Export
                </button>
            </div>
        </div>
        
        <div className="flex-grow overflow-x-auto p-4 bg-[#F8FAFC]">
            <div className="flex gap-4 h-full">
                {STATES.map(state => (
                    <KanbanColumn 
                        key={state}
                        title={state} 
                        records={USACE_DISPOSALS.filter(a => a.lifecycleState === state)} 
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
