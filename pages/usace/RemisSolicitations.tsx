import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { USACE_SOLICITATIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Solicitation } from '../../types';
import { Link } from 'react-router-dom';
import { SolicitationModal } from './components/SolicitationModal';

type LifecycleState = 'Draft' | 'Issued' | 'Amended' | 'Closed' | 'Under Evaluation' | 'Awarded' | 'Cancelled' | 'Archived';
const STATES: LifecycleState[] = ['Draft', 'Issued', 'Under Evaluation', 'Awarded', 'Closed'];

interface KanbanColumnProps {
  title: LifecycleState;
  records: Solicitation[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, records }) => {
    const getStageColor = (state: LifecycleState) => {
        if (['Closed', 'Archived', 'Cancelled'].includes(state)) return 'bg-slate-400';
        if (['Awarded'].includes(state)) return 'bg-green-500';
        if (['Issued', 'Amended'].includes(state)) return 'bg-blue-500';
        if (['Under Evaluation'].includes(state)) return 'bg-purple-500';
        return 'bg-amber-500'; // Draft
    };

    return (
        <div className="flex-1 min-w-[280px]">
            <div className={`font-semibold text-sm mb-4 px-1 flex items-center gap-2`}><div className={`w-2 h-2 rounded-full ${getStageColor(title)}`}></div>{title} <span className="text-slate-400">{records.length}</span></div>
            <div className="space-y-3 h-full">
            {records.map(r => (
                <Link to={`/usace/solicitations/${r.id}`} key={r.id} className="block bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 cursor-pointer">
                    <p className="font-semibold text-slate-800 text-sm">{r.title}</p>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-slate-500">{r.id}</p>
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{r.type.split(' ')[0]}</span>
                    </div>
                    {r.closeDate && <p className="text-xs text-slate-500 mt-2">Closes: {r.closeDate}</p>}
                </Link>
            ))}
            </div>
        </div>
    );
};

export const RemisSolicitations: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (record: Partial<Solicitation>, reason: string) => {
      console.log("Saving solicitation:", record, "Reason:", reason);
      alert('Solicitation record created. Audit log updated.');
      setIsModalOpen(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 flex flex-col h-full">
      <SolicitationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      
      <div className="flex-shrink-0 flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
            <div className="p-2.5 bg-slate-950 rounded shadow-lg shadow-black/10 text-white">
                <FileText size={24} className="text-blue-400" />
            </div>
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none italic">Solicitation Control Terminal</h1>
                    <div className="pulse-mission" />
                    <RegulatoryBadge refs={['FAR Part 14/15']} />
                </div>
                <div className="flex items-center gap-3 mt-1.5 italic">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none text-blue-900/60">IFB/RFP Generation • Proposal Evaluation Queue</span>
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter italic">Statutory Acquisition Protocol</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
            <button onClick={() => setIsModalOpen(true)} className="btn-pro-primary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-[0.25em] italic">
                <Plus size={14} /> New Solicitation Trace
            </button>
        </div>
      </div>
      
      <div className="flex-grow bg-[#F8F9FA] p-8 -mx-8 overflow-x-auto min-h-[600px] border-t border-slate-200 shadow-inner">
        <div className="flex gap-8 h-full">
            {STATES.map(state => {
                const records = USACE_SOLICITATIONS.filter(a => a.lifecycleState === state);
                const getStageColor = (s: LifecycleState) => {
                    if (['Closed', 'Archived', 'Cancelled'].includes(s)) return 'bg-slate-400';
                    if (['Awarded'].includes(s)) return 'bg-emerald-500';
                    if (['Issued', 'Amended'].includes(s)) return 'bg-blue-600';
                    if (['Under Evaluation'].includes(s)) return 'bg-amber-500';
                    return 'bg-blue-300'; // Draft
                };
                return (
                    <div key={state} className="flex-1 min-w-[320px] max-w-[360px] flex flex-col group">
                        <div className="flex items-end justify-between mb-4 px-2 italic">
                            <div className="flex items-center gap-2.5">
                                <div className={`w-1.5 h-6 ${getStageColor(state)} shadow-[0_0_8px_rgba(37,99,235,0.2)]`} />
                                <div>
                                    <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] leading-none mb-1">{state}</h3>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">ACTIVE_COUNT::{records.length}</span>
                                </div>
                            </div>
                            <div className="text-[10px] font-mono font-black text-slate-300 group-hover:text-blue-500 transition-colors uppercase tracking-tight">SOL_STG_{STATES.indexOf(state) + 1}</div>
                        </div>
                        <div className="space-y-4 bg-slate-200/20 p-2 rounded-sm h-full border border-slate-200/50 shadow-sm relative overflow-y-auto">
                            {records.map(r => (
                                <Link to={`/usace/solicitations/${r.id}`} key={r.id} className="pro-card p-5 bg-white border-slate-200/80 hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group/item relative overflow-hidden flex flex-col">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 group-hover/item:bg-blue-500 transition-all shadow-[0_0_4px_rgba(59,130,246,0.3)]" />
                                    <div className="flex justify-between items-start mb-4 italic">
                                        <p className="font-black text-slate-900 text-[11px] uppercase tracking-tighter truncate w-40 leading-none group-hover/item:text-blue-700" title={r.title}>{r.title}</p>
                                        <span className="text-[9px] font-black px-2 py-0.5 bg-slate-950 text-white rounded-sm uppercase tracking-widest">{r.type.split(' ')[0]}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 mb-4 italic">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">SOL_ID:</span>
                                        <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 border border-blue-100 rounded-sm tracking-tighter leading-none">{r.id}</span>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center italic">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Timeline_Status</span>
                                            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] leading-none">CYCLE_FLOW_SECURE</span>
                                        </div>
                                        {r.closeDate && (
                                            <div className="text-right">
                                                <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest mb-1 leading-none">CLOSURE_ETD</span>
                                                <p className="font-mono font-black text-amber-600 text-[11px] tracking-tighter leading-none uppercase">{r.closeDate}</p>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
      
      <div className="flex-shrink-0 px-8 py-5 bg-slate-950 -mx-8 -mb-8 mt-auto border-t border-white/10 flex justify-between items-center italic">
          <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full pulse-mission" />
              <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Acquisition Compliance Radar Operational [FAR_REGS_V8.2]</span>
          </div>
          <div className="flex items-center gap-6">
              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Signal_Lock::GBL_AQ</span>
              <div className="h-4 w-px bg-white/10" />
              <button className="text-[10px] font-black text-blue-400 hover:text-white transition-colors uppercase tracking-[0.2em]">Procurement Lifecycle Audit</button>
          </div>
      </div>
    </div>
  );
};
