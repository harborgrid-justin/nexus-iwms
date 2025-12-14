import React, { useState } from 'react';
import { Trash2, Plus, ArrowRight } from 'lucide-react';
import { USACE_DISPOSALS } from '../../services/mockData';
import { DisposalRecord } from '../../types';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';
import { DisposalModal } from './components/DisposalModal';

type LifecycleState = 'Initiated' | 'Excess Determined' | 'Pending Authorization' | 'Authorized' | 'Executed' | 'Closed' | 'Archived';
const STATES: LifecycleState[] = ['Initiated', 'Excess Determined', 'Pending Authorization', 'Authorized', 'Executed', 'Closed'];

interface KanbanColumnProps {
  title: LifecycleState;
  records: DisposalRecord[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, records }) => {
    const getStageColor = (state: LifecycleState) => {
        if (['Closed', 'Archived'].includes(state)) return 'bg-slate-400';
        if (['Executed', 'Authorized'].includes(state)) return 'bg-green-500';
        if (['Pending Authorization'].includes(state)) return 'bg-amber-500';
        return 'bg-blue-500';
    };

    return (
        <div className="flex-1 min-w-[280px]">
            <div className={`font-semibold text-sm mb-4 px-1 flex items-center gap-2`}><div className={`w-2 h-2 rounded-full ${getStageColor(title)}`}></div>{title} <span className="text-slate-400">{records.length}</span></div>
            <div className="space-y-3 h-full">
            {records.map(r => (
                <Link to={`/usace/disposals/${r.id}`} key={r.id} className="block bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 cursor-pointer">
                    <p className="font-semibold text-slate-800">Asset: {r.assetId}</p>
                    <p className="text-xs text-slate-500 mt-1">Method: {r.proposedMethod}</p>
                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 rounded text-slate-600">{r.initiatingOrg}</span>
                        {r.proceeds && <p className="font-semibold text-green-600 text-xs">${r.proceeds.toLocaleString()}</p>}
                    </div>
                </Link>
            ))}
            </div>
        </div>
    );
};

export const RemisDisposals: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (record: Partial<DisposalRecord>, reason: string) => {
      console.log("Saving disposal:", record, "Reason:", reason);
      alert('Disposal case initiated. Audit log updated.');
      setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <DisposalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex-shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Disposal Pipeline</h1>
          <p className="text-slate-500 mt-1">Manage lifecycle for disposing of excess real property (40 U.S.C. §§521–559).</p>
        </div>
        <div className="flex items-start gap-4">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> Initiate Disposal Case
            </button>
            <RegulatoryBadge refs={['5']} />
        </div>
      </div>
      
      <div className="flex-grow bg-slate-50 p-4 rounded-xl border -mx-4 overflow-x-auto">
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
  );
};
