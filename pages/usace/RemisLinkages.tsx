import React, { useState } from 'react';
import { Link as LinkIcon, Plus, Filter, FileText, Layers, ShieldCheck } from 'lucide-react';
import { USACE_LINKAGES, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { RealPropertyLinkage } from '../../types';
import { LinkageModal } from './components/LinkageModal';

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

export const RemisLinkages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<RealPropertyLinkage>, reason: string) => {
      console.log("Creating linkage:", record, "Reason:", reason);
      alert('Linkage record established. Audit log updated.');
      setIsModalOpen(false);
  };

  const getStatusColor = (state: string) => {
    switch(state) {
        case 'Active': return 'bg-green-100 text-green-800 border-green-200';
        case 'Established': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Amended': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'Archived': return 'bg-slate-100 text-slate-800 border-slate-200';
        default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const activeLinkages = USACE_LINKAGES.filter(l => l.lifecycleState === 'Active').length;
  const deeds = USACE_LINKAGES.filter(l => l.instrumentType === 'Deed').length;

  return (
    <div className="space-y-6">
      <LinkageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Instrument Linkages</h1>
            <RegulatoryBadge refs={['14']} />
          </div>
          <p className="text-slate-500 mt-1">Maintain traceability between real property assets and legal instruments.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
                <Filter size={16} /> Filter
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> Establish Linkage
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard title="Active Linkages" value={activeLinkages} icon={LinkIcon} color="bg-green-500" />
          <KpiCard title="Deeds Recorded" value={deeds} icon={ShieldCheck} color="bg-blue-500" />
          <KpiCard title="Total Records" value={USACE_LINKAGES.length} icon={Layers} color="bg-slate-500" />
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-slate-900">Linkage Registry</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-700">Instrument #</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Asset</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Authority</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Effective Date</th>
              <th className="px-6 py-3 font-semibold text-slate-700">State</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USACE_LINKAGES.map(linkage => {
                const asset = USACE_ASSETS.find(a => a.id === linkage.assetId);
                return (
                <tr key={linkage.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{linkage.instrumentNumber}</div>
                        <div className="text-xs text-blue-600 font-mono">{linkage.id}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{asset?.name} ({asset?.rpuid})</td>
                    <td className="px-6 py-4">{linkage.instrumentType}</td>
                    <td className="px-6 py-4 text-slate-600">{linkage.executingAuthority}</td>
                    <td className="px-6 py-4 text-slate-600 font-mono">{linkage.effectiveDate}</td>
                    <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(linkage.lifecycleState)}`}>{linkage.lifecycleState}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <Link to={`/usace/linkages/${linkage.id}`} className="text-blue-600 font-medium hover:underline text-xs">Manage</Link>
                    </td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};