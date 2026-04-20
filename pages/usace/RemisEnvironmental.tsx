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
        if (['Under Remediation'].includes(state)) return 'bg-red-500';
        return 'bg-blue-600';
    };

    return (
        <div className="flex-1 min-w-[320px] bg-slate-50/50 rounded-2xl border border-slate-200/50 flex flex-col max-h-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStageColor(title)} shadow-[0_0_8px_rgba(37,99,235,0.3)]`}></div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest">{title}</h3>
                </div>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{records.length}</span>
            </div>
            
            <div className="p-3 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
                {records.map(r => (
                    <div 
                        key={r.id} 
                        onClick={() => navigate(`/usace/environmental/${r.id}`)}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-400 cursor-pointer transition-all hover:-translate-y-1 group relative overflow-hidden"
                    >
                        <div className={`absolute top-0 left-0 w-1 h-full ${r.riskClassification === 'High' ? 'bg-red-500' : r.riskClassification === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-[9px] font-bold text-blue-600 font-mono mb-1 uppercase tracking-wider bg-blue-50 px-1.5 py-0.5 rounded inline-block">SITE ID: {r.id}</div>
                                    <h4 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">{r.siteName}</h4>
                                </div>
                                <MoreHorizontal size={14} className="text-slate-300 group-hover:text-slate-500" />
                            </div>

                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-[9px] font-bold text-slate-500 uppercase tracking-wider">Asset {r.assetId}</span>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                <div className="flex flex-wrap gap-1">
                                    {r.programApplicability.map(p => (
                                        <span key={p} className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">{p}</span>
                                    ))}
                                </div>
                                <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${r.riskClassification === 'High' ? 'text-red-500' : r.riskClassification === 'Medium' ? 'text-amber-500' : 'text-emerald-600'}`}>
                                    {r.riskClassification === 'High' ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />}
                                    {r.riskClassification}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {records.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center">
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Stable Site Matrix</p>
                    </div>
                )}
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
    <div className="space-y-6 h-full flex flex-col overflow-hidden max-h-[calc(100vh-120px)]">
      <EnvironmentalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      
      <div className="flex-shrink-0 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Environmental Compliance Control</h1>
            <RegulatoryBadge refs={['7']} />
          </div>
          <p className="text-slate-500 mt-1 text-sm font-medium">Strategic oversight for environmental liability, NEPA assessments, and remediation (42 U.S.C. §4321).</p>
        </div>
        <div className="flex items-center gap-3">
             <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
                <button 
                  onClick={() => setViewMode('kanban')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <ListIcon size={18} />
                </button>
            </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm shadow-sm">
                <Download size={16} /> Data Export
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                <Plus size={18} /> Register Affected Site
            </button>
        </div>
      </div>
      
      <div className="flex-grow bg-white/50 backdrop-blur-md rounded-2xl border border-slate-200/60 overflow-hidden flex flex-col shadow-inner">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search site IDs, asset markers, program codes..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none" />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                <Filter size={14} /> Refine Site Matrix
            </button>
        </div>
        
        <div className="flex-grow overflow-x-auto p-6 bg-slate-100/20 custom-scrollbar">
            <div className="flex gap-6 h-full pb-4">
                {STATES.map(state => (
                    <KanbanColumn 
                        key={state}
                        title={state} 
                        records={USACE_ENVIRONMENTAL.filter(a => a.lifecycleState === state)} 
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
