import React, { useState } from 'react';
import { Leaf, Plus } from 'lucide-react';
import { USACE_ENVIRONMENTAL } from '../../services/mockData';
import { EnvironmentalSite } from '../../types';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';
import { EnvironmentalModal } from './components/EnvironmentalModal';

type LifecycleState = 'Identified' | 'Assessed' | 'Under Remediation' | 'Compliant' | 'Closed' | 'Archived';
const STATES: LifecycleState[] = ['Identified', 'Assessed', 'Under Remediation', 'Compliant', 'Closed'];

interface KanbanColumnProps {
  title: LifecycleState;
  records: EnvironmentalSite[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, records }) => {
    const getStageColor = (state: LifecycleState) => {
        if (['Closed', 'Archived'].includes(state)) return 'bg-slate-400';
        if (['Compliant'].includes(state)) return 'bg-green-500';
        if (['Under Remediation'].includes(state)) return 'bg-red-500';
        return 'bg-blue-500';
    };

    return (
        <div className="flex-1 min-w-[280px]">
            <div className={`font-semibold text-sm mb-4 px-1 flex items-center gap-2`}><div className={`w-2 h-2 rounded-full ${getStageColor(title)}`}></div>{title} <span className="text-slate-400">{records.length}</span></div>
            <div className="space-y-3 h-full">
            {records.map(r => (
                <Link to={`/usace/environmental/${r.id}`} key={r.id} className="block bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 cursor-pointer">
                    <p className="font-semibold text-slate-800 text-sm">{r.siteName}</p>
                    <p className="text-xs text-slate-500 mt-1">Asset: {r.assetId}</p>
                    <div className="mt-2 flex justify-between items-center">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${r.riskClassification === 'High' ? 'bg-red-100 text-red-700' : r.riskClassification === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{r.riskClassification} Risk</span>
                        <div className="flex gap-1">{r.programApplicability.map(p => <span key={p} className="text-[10px] bg-slate-100 px-1 rounded text-slate-600">{p}</span>)}</div>
                    </div>
                </Link>
            ))}
            </div>
        </div>
    );
};

export const RemisEnvironmental: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (record: Partial<EnvironmentalSite>, reason: string) => {
      console.log("Saving environmental site:", record, "Reason:", reason);
      alert('Environmental site record created. Audit log updated.');
      setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <EnvironmentalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex-shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Environmental Program Management</h1>
          <p className="text-slate-500 mt-1">Manage sites, assessments, and remediation per NEPA/CERCLA (42 U.S.C. §4321/§9601).</p>
        </div>
        <div className="flex items-start gap-4">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> Identify New Site
            </button>
            <RegulatoryBadge refs={['7']} />
        </div>
      </div>
      
      <div className="flex-grow bg-slate-50 p-4 rounded-xl border -mx-4 overflow-x-auto">
        <div className="flex gap-4 h-full">
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
  );
};
