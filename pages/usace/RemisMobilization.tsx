import React, { useState } from 'react';
import { Siren, Plus, Filter, Target, Activity, ShieldAlert } from 'lucide-react';
import { USACE_MOBILIZATION_DATA, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { MobilizationProfile } from '../../types';
import { MobilizationModal } from './components/MobilizationModal';

const KpiCard = ({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: any, color: string }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color} text-white`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    </div>
);

export const RemisMobilization: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<MobilizationProfile>, reason: string) => {
      console.log("Creating mobilization profile:", record, "Reason:", reason);
      alert('Mobilization profile created. Audit log updated.');
      setIsModalOpen(false);
  };

  const getStatusColor = (state: string) => {
    switch(state) {
        case 'Activated': return 'bg-green-100 text-green-800 border-green-200';
        case 'Ready': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Validated': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'Deactivated': return 'bg-slate-100 text-slate-800 border-slate-200';
        default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const activatedAssets = USACE_MOBILIZATION_DATA.filter(p => p.lifecycleState === 'Activated').length;
  const criticalAssets = USACE_MOBILIZATION_DATA.filter(p => p.missionCriticality === 'Mission Critical').length;

  return (
    <div className="space-y-6">
      <MobilizationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Mobilization Support</h1>
            <RegulatoryBadge refs={['10']} />
          </div>
          <p className="text-slate-500 mt-1">Manage real property readiness for mobilization planning and execution.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
                <Filter size={16} /> Filter
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> New Profile
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard title="Activated Assets" value={activatedAssets} icon={Activity} color="bg-green-500" />
          <KpiCard title="Mission Critical" value={criticalAssets} icon={ShieldAlert} color="bg-red-500" />
          <KpiCard title="Total Profiles" value={USACE_MOBILIZATION_DATA.length} icon={Target} color="bg-blue-500" />
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-slate-900">Mobilization Readiness Ledger</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-700">Asset</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Criticality</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Readiness</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Lifecycle State</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Condition</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USACE_MOBILIZATION_DATA.map(profile => {
                const asset = USACE_ASSETS.find(a => a.id === profile.assetId);
                return (
                <tr key={profile.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{asset?.name}</div>
                        <div className="text-xs text-blue-600 font-mono">{asset?.rpuid}</div>
                    </td>
                    <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded font-medium ${profile.missionCriticality === 'Mission Critical' ? 'text-red-700 bg-red-50' : 'text-slate-600 bg-slate-50'}`}>{profile.missionCriticality}</span></td>
                    <td className="px-6 py-4 text-slate-600">{profile.readinessDesignation}</td>
                    <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(profile.lifecycleState)}`}>{profile.lifecycleState}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono">{profile.condition}/100</td>
                    <td className="px-6 py-4 text-right">
                        <Link to={`/usace/mobilization/${profile.id}`} className="text-blue-600 font-medium hover:underline text-xs">Manage</Link>
                    </td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};