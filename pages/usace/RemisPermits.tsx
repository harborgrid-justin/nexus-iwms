import React, { useState } from 'react';
import { Scroll, Plus, Filter, ShieldCheck, Activity, Calendar } from 'lucide-react';
import { USACE_PERMITS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { Permit } from '../../types';
import { PermitModal } from './components/PermitModal';

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

export const RemisPermits: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<Permit>, reason: string) => {
      console.log("Creating permit:", record, "Reason:", reason);
      alert('Permit record created. Audit log updated.');
      setIsModalOpen(false);
  };

  const getStatusColor = (state: string) => {
    switch(state) {
        case 'Active': return 'bg-green-100 text-green-800 border-green-200';
        case 'Issued': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Under Review': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'Expired': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const activePermits = USACE_PERMITS.filter(p => p.lifecycleState === 'Active').length;
  const underReview = USACE_PERMITS.filter(p => p.lifecycleState === 'Under Review' || p.lifecycleState === 'Submitted').length;

  return (
    <div className="space-y-6">
      <PermitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Permit Tracking</h1>
            <RegulatoryBadge refs={['13']} />
          </div>
          <p className="text-slate-500 mt-1">Manage regulatory permits (Section 10, 404, 408) associated with real property.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
                <Filter size={16} /> Filter
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> New Permit
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard title="Active Permits" value={activePermits} icon={ShieldCheck} color="bg-green-500" />
          <KpiCard title="Under Review" value={underReview} icon={Activity} color="bg-blue-500" />
          <KpiCard title="Total Records" value={USACE_PERMITS.length} icon={Scroll} color="bg-slate-500" />
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-slate-900">Permit Registry</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-700">Permit ID</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Asset</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Permittee</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Lifecycle State</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Expiration</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USACE_PERMITS.map(permit => {
                const asset = USACE_ASSETS.find(a => a.id === permit.assetId);
                const permittee = permit.parties.find(p => p.role === 'Permittee' || p.role === 'Applicant')?.name || 'N/A';
                return (
                <tr key={permit.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{permit.uniqueIdentifier}</div>
                        <div className="text-xs text-blue-600 font-mono">{permit.id}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{asset?.name}</td>
                    <td className="px-6 py-4">{permit.type}</td>
                    <td className="px-6 py-4 text-slate-600">{permittee}</td>
                    <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(permit.lifecycleState)}`}>{permit.lifecycleState}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono">{permit.expirationDate}</td>
                    <td className="px-6 py-4 text-right">
                        <Link to={`/usace/permits/${permit.id}`} className="text-blue-600 font-medium hover:underline text-xs">Manage</Link>
                    </td>
                </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};