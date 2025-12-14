import React from 'react';
import { CONTRACTS, VENDORS } from '../services/mockData';
import { Filter, Search, Plus, FileText, AlertTriangle } from 'lucide-react';

export const ContractManagement: React.FC = () => {
    
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-slate-100 text-slate-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contract Management</h1>
          <p className="text-slate-500 mt-1">Central repository for all service, lease, and construction contracts.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Add Contract
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Contract Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Vendor</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-4 font-semibold text-slate-700">End Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {CONTRACTS.map(contract => {
              const vendor = VENDORS.find(v => v.id === contract.vendorId);
              const isExpiringSoon = new Date(contract.endDate) > new Date() && (new Date(contract.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24) < 90;
              return (
                <tr key={contract.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{contract.name}</div>
                    <div className="text-xs text-slate-500">ID: {contract.id}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{vendor?.name}</td>
                  <td className="px-6 py-4 text-slate-700">{contract.type}</td>
                  <td className="px-6 py-4 text-slate-700">
                    <div className="flex items-center gap-2">
                        {isExpiringSoon && <AlertTriangle size={16} className="text-amber-500" />}
                        {contract.endDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700 text-right font-mono">${contract.value.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
