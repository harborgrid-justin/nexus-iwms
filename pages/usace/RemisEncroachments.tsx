
import React, { useState } from 'react';
import { AlertTriangle, Plus, Filter, Search } from 'lucide-react';
import { USACE_ENCROACHMENTS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { EncroachmentCase } from '../../types';
import { EncroachmentModal } from './components/EncroachmentModal';

export const RemisEncroachments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<EncroachmentCase>, reason: string) => {
      console.log("Creating encroachment case:", record, "Reason:", reason);
      alert('Encroachment case reported. Audit log updated.');
      setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Closed' || status === 'Resolved') return 'bg-green-100 text-green-800';
    if (status === 'Reported') return 'bg-red-100 text-red-800';
    return 'bg-amber-100 text-amber-800';
  };

  const activeCases = USACE_ENCROACHMENTS.filter(e => e.lifecycleState !== 'Closed' && e.lifecycleState !== 'Archived').length;

  return (
    <div className="space-y-6">
      <EncroachmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Encroachment Work Management</h1>
            <RegulatoryBadge refs={['17']} />
          </div>
          <p className="text-slate-500 mt-1">Track and manage encroachment-related tasks and work activities (33 U.S.C. §558).</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
                <Filter size={16} /> Filter
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> Report Encroachment
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-500 text-white"><AlertTriangle size={24} /></div>
              <div><p className="text-slate-500 text-sm font-medium">Active Cases</p><p className="text-2xl font-bold text-slate-900">{activeCases}</p></div>
          </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Encroachment Cases</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input type="text" placeholder="Search cases..." className="pl-9 pr-4 py-1.5 border rounded text-sm" />
            </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-700">Case ID</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Asset</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Date Reported</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Lifecycle State</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USACE_ENCROACHMENTS.map(enc => {
              const asset = USACE_ASSETS.find(a => a.id === enc.assetId);
              return (
              <tr key={enc.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-mono font-medium text-slate-900">{enc.id}</td>
                <td className="px-6 py-4 text-slate-600">{asset?.name}</td>
                <td className="px-6 py-4">{enc.type}</td>
                <td className="px-6 py-4">{enc.dateReported}</td>
                 <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(enc.lifecycleState)}`}>{enc.lifecycleState}</span>
                </td>
                <td className="px-6 py-4 text-right">
                    <Link to={`/usace/encroachments/${enc.id}`} className="text-blue-600 font-medium hover:underline text-xs">Manage Work</Link>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};
