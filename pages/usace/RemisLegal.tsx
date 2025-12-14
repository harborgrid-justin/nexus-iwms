import React, { useState } from 'react';
import { Shield, Plus, Filter, AlertTriangle, CheckCircle, Scale } from 'lucide-react';
import { USACE_CLAIMS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { LegalClaimModal } from './components/LegalClaimModal';
import { LegalClaim } from '../../types';

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

export const RemisLegal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<LegalClaim>, reason: string) => {
      console.log("Creating claim:", record, "Reason:", reason);
      alert('Legal claim record initiated. Audit log updated.');
      setIsModalOpen(false);
  };

  const getStatusColor = (state: string) => {
    switch(state) {
        case 'Paid':
        case 'Closed': return 'bg-slate-100 text-slate-800';
        case 'Settled': return 'bg-green-100 text-green-800';
        case 'Denied': return 'bg-red-100 text-red-800';
        case 'Received': return 'bg-blue-100 text-blue-800';
        default: return 'bg-amber-100 text-amber-800'; // Under Investigation, Adjudicated
    }
  };

  const activeClaims = USACE_CLAIMS.filter(c => !['Closed', 'Archived', 'Paid'].includes(c.lifecycleState));
  const totalExposure = activeClaims.reduce((acc, c) => acc + c.claimAmount, 0);

  return (
    <div className="space-y-6">
      <LegalClaimModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Legal Services & Claims</h1>
            <RegulatoryBadge refs={['9']} />
          </div>
          <p className="text-slate-500 mt-1">Record, track, and report on claims and payment information.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
                <Filter size={16} /> Filter
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> File New Claim
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard title="Active Claims" value={activeClaims.length} icon={Scale} color="bg-blue-500" />
          <KpiCard title="Total Exposure" value={`$${totalExposure.toLocaleString()}`} icon={AlertTriangle} color="bg-amber-500" />
          <KpiCard title="Settled (YTD)" value={USACE_CLAIMS.filter(c => c.lifecycleState === 'Settled' || c.lifecycleState === 'Paid').length} icon={CheckCircle} color="bg-green-500" />
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-slate-900">Claims Ledger</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-700">Claimant</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Lifecycle State</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Filed Date</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Claim Amount</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USACE_CLAIMS.map(claim => (
              <tr key={claim.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{claim.claimantInfo?.name || claim.claimant}</div>
                    <div className="text-xs text-blue-600 font-mono">{claim.id}</div>
                </td>
                <td className="px-6 py-4">{claim.claimType}</td>
                 <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(claim.lifecycleState)}`}>{claim.lifecycleState}</span>
                </td>
                <td className="px-6 py-4 text-slate-600">{claim.filedDate}</td>
                <td className="px-6 py-4 text-right font-mono">${claim.claimAmount.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                    <Link to={`/usace/legal/${claim.id}`} className="text-blue-600 font-medium hover:underline text-xs">Manage</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};