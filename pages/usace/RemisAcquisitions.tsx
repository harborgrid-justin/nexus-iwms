import React, { useState } from 'react';
import { ArrowRightLeft, Plus } from 'lucide-react';
import { USACE_ACQUISITIONS } from '../../services/mockData';
import { AcquisitionRecord } from '../../types';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { AcquisitionModal } from './components/AcquisitionModal';

type Stage = 'Planning' | 'Site Selection' | 'NEPA Review' | 'Appraisal' | 'Negotiation' | 'Condemnation' | 'Closing' | 'Closed' | 'Terminated';
const STAGES: Stage[] = ['Planning', 'Site Selection', 'NEPA Review', 'Appraisal', 'Negotiation', 'Condemnation', 'Closing', 'Closed'];

interface KanbanColumnProps {
  title: Stage;
  records: AcquisitionRecord[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, records }) => {
  const getStageColor = (stage: Stage) => {
    if (['Closed', 'Terminated'].includes(stage)) return 'bg-slate-400';
    if (['Closing', 'Negotiation'].includes(stage)) return 'bg-blue-500';
    if (['Appraisal', 'NEPA Review'].includes(stage)) return 'bg-purple-500';
    return 'bg-amber-500';
  };
  
  return (
    <div className="flex-1 min-w-[280px]">
      <div className={`font-semibold text-sm mb-4 px-1 flex items-center gap-2`}><div className={`w-2 h-2 rounded-full ${getStageColor(title)}`}></div>{title} <span className="text-slate-400">{records.length}</span></div>
      <div className="space-y-3 h-full">
        {records.map(r => (
          <Link to={`/usace/acquisitions/${r.id}`} key={r.id} className="block bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 cursor-pointer">
            <p className="font-semibold text-slate-800">Asset: {r.assetId}</p>
            <p className="text-xs text-slate-500 mt-1">Method: {r.acquisitionMethod}</p>
            <p className="font-semibold text-slate-800 mt-2 text-sm">${r.cost.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const RemisAcquisitions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (record: Partial<AcquisitionRecord>, reason: string) => {
    // In a real app, this would be an API call to create/update.
    // For now, we just show an alert and close the modal.
    console.log("Saving record:", record, "Reason:", reason);
    alert('Acquisition record saved (simulation).');
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6 h-full flex flex-col">
      <AcquisitionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex-shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Acquisition Pipeline</h1>
          <p className="text-slate-500 mt-1">Manage and track all real property acquisition processes.</p>
        </div>
        <div className="flex items-start gap-4">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Start New Acquisition
          </button>
          <RegulatoryBadge refs={['4']} />
        </div>
      </div>
      
      <div className="flex-grow bg-slate-50 p-4 rounded-xl border -mx-4 overflow-x-auto">
        <div className="flex gap-4 h-full">
            {STAGES.map(stage => (
                <KanbanColumn 
                    key={stage}
                    title={stage} 
                    records={USACE_ACQUISITIONS.filter(a => a.stage === stage)} 
                />
            ))}
        </div>
      </div>
    </div>
  );
};
