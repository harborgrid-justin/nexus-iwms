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
    <div className="space-y-6 h-full flex flex-col">
      <SolicitationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex-shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Solicitation Management</h1>
          <p className="text-slate-500 mt-1">Manage IFBs, RFPs, and bid evaluations per FAR requirements.</p>
        </div>
        <div className="flex items-start gap-4">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> New Solicitation
            </button>
            <RegulatoryBadge refs={['8']} />
        </div>
      </div>
      
      <div className="flex-grow bg-slate-50 p-4 rounded-xl border -mx-4 overflow-x-auto">
        <div className="flex gap-4 h-full">
            {STATES.map(state => (
                <KanbanColumn 
                    key={state}
                    title={state} 
                    records={USACE_SOLICITATIONS.filter(a => a.lifecycleState === state)} 
                />
            ))}
        </div>
      </div>
    </div>
  );
};
