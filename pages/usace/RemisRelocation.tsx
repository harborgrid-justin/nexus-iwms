import React, { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { USACE_RELOCATION } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { RelocationCase } from '../../types';
import { Link } from 'react-router-dom';
import { RelocationModal } from './components/RelocationModal';

type LifecycleState = 'Initiated' | 'Eligibility Determined' | 'Assistance Approved' | 'Assistance Provided' | 'Closed' | 'Archived';
const STATES: LifecycleState[] = ['Initiated', 'Eligibility Determined', 'Assistance Approved', 'Assistance Provided', 'Closed'];

interface KanbanColumnProps {
  title: LifecycleState;
  records: RelocationCase[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, records }) => {
    const getStageColor = (state: LifecycleState) => {
        if (['Closed', 'Archived'].includes(state)) return 'bg-slate-400';
        if (['Assistance Provided', 'Assistance Approved'].includes(state)) return 'bg-green-500';
        if (['Eligibility Determined'].includes(state)) return 'bg-amber-500';
        return 'bg-blue-500';
    };

    return (
        <div className="flex-1 min-w-[280px]">
            <div className={`font-semibold text-sm mb-4 px-1 flex items-center gap-2`}><div className={`w-2 h-2 rounded-full ${getStageColor(title)}`}></div>{title} <span className="text-slate-400">{records.length}</span></div>
            <div className="space-y-3 h-full">
            {records.map(r => (
                <Link to={`/usace/relocation/${r.id}`} key={r.id} className="block bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 cursor-pointer">
                    <div className="flex justify-between items-start">
                        <p className="font-semibold text-slate-800 text-sm truncate w-32" title={r.claimantName}>{r.claimantName}</p>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-500">{r.claimantType.split(' ')[0]}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Acquisition: {r.acquisitionId}</p>
                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs font-medium px-2 py-0.5 bg-slate-50 rounded text-slate-600">{r.displacementType}</span>
                        {r.totalBenefitsPaid > 0 && <p className="font-semibold text-green-600 text-xs">${r.totalBenefitsPaid.toLocaleString()}</p>}
                    </div>
                </Link>
            ))}
            </div>
        </div>
    );
};

export const RemisRelocation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (record: Partial<RelocationCase>, reason: string) => {
      console.log("Saving relocation case:", record, "Reason:", reason);
      alert('Relocation case initiated. Audit log updated.');
      setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <RelocationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex-shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relocation Assistance Program</h1>
          <p className="text-slate-500 mt-1">Manage displacement and relocation assistance per Uniform Act (42 U.S.C. §§4601–4655).</p>
        </div>
        <div className="flex items-start gap-4">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> New Relocation Case
            </button>
            <RegulatoryBadge refs={['6']} />
        </div>
      </div>
      
      <div className="flex-grow bg-slate-50 p-4 rounded-xl border -mx-4 overflow-x-auto">
        <div className="flex gap-4 h-full">
            {STATES.map(state => (
                <KanbanColumn 
                    key={state}
                    title={state} 
                    records={USACE_RELOCATION.filter(a => a.lifecycleState === state)} 
                />
            ))}
        </div>
      </div>
    </div>
  );
};