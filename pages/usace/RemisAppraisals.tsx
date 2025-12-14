import React, { useState } from 'react';
import { DollarSign, Plus, Filter, Search, Lock, X } from 'lucide-react';
import { USACE_APPRAISALS, USACE_ASSETS, USACE_ACQUISITIONS, USACE_DISPOSALS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Appraisal } from '../../types';
import { useNavigate } from 'react-router-dom';

const AppraisalModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('New Appraisal Record created (simulation). This action has been logged.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-slate-900">Initiate New Appraisal</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700">Real Property Asset</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md" required>{USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}</select></div>
            <div><label className="block text-sm font-medium text-slate-700">Related Action</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md"><option value="ACQ-02">ACQ-02</option><option value="DIS-01">DIS-01</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700">Purpose</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md"><option>Acquisition</option><option>Disposal</option><option>Outgrant</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700">Appraisal Type</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md"><option>Market Value</option><option>In-Kind Consideration</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700">Appraiser</label><input type="text" placeholder="e.g., JLL Valuation Services" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md" required /></div>
            <div><label className="block text-sm font-medium text-slate-700">Valuation Date</label><input type="date" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md" required /></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-slate-700">Scope of Work</label><textarea placeholder="Describe the scope of the appraisal..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md h-20"></textarea></div>
          </div>
        </form>
        <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">Initiate Appraisal</button>
        </div>
      </div>
    </div>
  );
};


export const RemisAppraisals: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-amber-100 text-amber-800';
      case 'Archived': return 'bg-slate-100 text-slate-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <AppraisalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Real Property Appraisals</h1>
            <RegulatoryBadge refs={['3']} />
          </div>
          <p className="text-slate-500 mt-1">Manage appraisal activities and associated data with controlled access.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> New Appraisal Record
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Appraisal Log</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Asset ID</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Appraiser</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Purpose</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Appraised Value</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {USACE_APPRAISALS.map(app => (
              <tr key={app.id} onClick={() => navigate(`/usace/appraisals/${app.id}`)} className="hover:bg-slate-50/50 cursor-pointer">
                <td className="px-6 py-4 font-mono font-medium text-blue-600">{app.assetId}</td>
                <td className="px-6 py-4 text-slate-600">{app.appraiser}</td>
                <td className="px-6 py-4 text-slate-600">{app.appraisalDate}</td>
                <td className="px-6 py-4 text-slate-600">{app.purpose}</td>
                <td className="px-6 py-4 text-slate-600 text-right font-mono flex justify-end items-center gap-2">
                    <Lock size={12} className="text-slate-400" title="Controlled Access Data" />
                    ${app.appraisedValue.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
