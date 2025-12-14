import React, { useState } from 'react';
import { Landmark, Plus, Filter, PieChart, DollarSign, FileText } from 'lucide-react';
import { USACE_COSTSHARE, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { CostShareAgreement } from '../../types';
import { CostShareModal } from './components/CostShareModal';

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

export const RemisCostShare: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<CostShareAgreement>, reason: string) => {
      console.log("Creating cost share agreement:", record, "Reason:", reason);
      alert('Cost Share Agreement established. Audit log updated.');
      setIsModalOpen(false);
  };

  const getStatusColor = (state: string) => {
    switch(state) {
        case 'Active': return 'bg-green-100 text-green-800 border-green-200';
        case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Adjusted': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'Closed': return 'bg-slate-100 text-slate-800 border-slate-200';
        default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const activeAgreements = USACE_COSTSHARE.filter(c => c.lifecycleState === 'Active').length;
  const totalPartnerContrib = USACE_COSTSHARE.reduce((acc, c) => acc + c.partnerContribution, 0);

  return (
    <div className="space-y-6">
      <CostShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Cost-Share Programs</h1>
            <RegulatoryBadge refs={['11']} />
          </div>
          <p className="text-slate-500 mt-1">Manage sponsor agreements, LERRD credits, and financial compliance (33 U.S.C. §2211).</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
                <Filter size={16} /> Filter
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> New Agreement
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard title="Active Agreements" value={activeAgreements} icon={FileText} color="bg-blue-500" />
          <KpiCard title="Total Sponsor Obligation" value={`$${(totalPartnerContrib/1000000).toFixed(1)}M`} icon={DollarSign} color="bg-green-500" />
          <KpiCard title="Open Projects" value={USACE_COSTSHARE.length} icon={Landmark} color="bg-slate-500" />
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-slate-900">Cost-Share Ledger</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-700">Project</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Sponsor</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Split (Fed/Non)</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Status</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Total Cost</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USACE_COSTSHARE.map(agreement => {
                const asset = USACE_ASSETS.find(a => a.id === agreement.assetId);
                return (
                <tr key={agreement.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{agreement.projectId}</div>
                        <div className="text-xs text-blue-600 font-mono">{asset?.name}</div>
                    </td>
                    <td className="px-6 py-4">{agreement.sponsor}</td>
                    <td className="px-6 py-4 text-slate-600">{agreement.costShareRatio}</td>
                    <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(agreement.lifecycleState)}`}>{agreement.lifecycleState}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono">${agreement.totalProjectCost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                        <Link to={`/usace/cost-share/${agreement.id}`} className="text-blue-600 font-medium hover:underline text-xs">Manage</Link>
                    </td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};