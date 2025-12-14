
import React, { useState } from 'react';
import { AlertTriangle, Plus, Filter, Search } from 'lucide-react';
import { USACE_ENCROACHMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { EncroachmentModal } from './components/EncroachmentModal';
import { EncroachmentCase } from '../../types';

export const RemisEncroachments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<EncroachmentCase>, reason: string) => {
      console.log("Creating encroachment case:", record, "Reason:", reason);
      alert('Encroachment case created. Audit log updated.');
      setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    if (status.includes('Resolved') || status.includes('Closed')) return 'bg-green-100 text-green-800 border-green-200';
    if (status.includes('Investigated') || status.includes('Corrective')) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-amber-100 text-amber-800 border-amber-200';
  };

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
                <Plus size={16} /> New Case
            </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Encroachment Cases</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search cases..." className="w-64 pl-10 pr-4 py-2 text-sm border rounded-lg bg-white" />
            </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-700">Case ID</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Asset</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Discovery Date</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Lifecycle State</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Tasks</th>
              <th className="px-6 py-3 font-semibold text-slate-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USACE_ENCROACHMENTS.map(enc => (
              <tr key={enc.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-mono font-medium text-blue-600">{enc.id}</td>
                <td className="px-6 py-4 text-slate-600">{enc.assetId}</td>
                <td className="px-6 py-4">{enc.type}</td>
                <td className="px-6 py-4">{enc.discoveryDate}</td>
                 <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(enc.lifecycleState)}`}>{enc.lifecycleState}</span>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">{enc.tasks?.length || 0}</td>
                <td className="px-6 py-4 text-right">
                    <Link to={`/usace/encroachments/${enc.id}`} className="text-blue-600 hover:underline font-medium text-xs">Manage</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
