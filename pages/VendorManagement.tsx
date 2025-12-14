import React from 'react';
import { VENDORS, WORK_ORDERS, CONTRACTS } from '../services/mockData';
import { Filter, Search, Plus, Star, BarChart2, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const VendorManagement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vendor Management</h1>
          <p className="text-slate-500 mt-1">Manage vendor directory, performance, and compliance.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
            <Filter size={16} /> Filter by Trade
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Onboard Vendor
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VENDORS.map(vendor => {
            const vendorWOs = WORK_ORDERS.filter(wo => wo.assignedTo === vendor.id);
            const vendorContracts = CONTRACTS.filter(c => c.vendorId === vendor.id);
            return (
                <div key={vendor.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-lg hover:border-blue-300 transition-all flex flex-col">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{vendor.name}</h3>
                            <p className="text-sm font-medium text-blue-600">{vendor.trade}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${vendor.rating > 4.5 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                           <Star size={12} /> {vendor.rating}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-4 py-4 border-t border-b border-slate-100 flex-grow">
                        <div>
                            <div className="text-xs text-slate-500 uppercase font-semibold">On-Time Rate</div>
                            <div className="text-sm font-medium text-slate-900">{vendor.onTimeCompletionRate}%</div>
                        </div>
                         <div>
                            <div className="text-xs text-slate-500 uppercase font-semibold">Avg. Invoice</div>
                            <div className="text-sm font-medium text-slate-900">${vendor.avgInvoiceCost.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 uppercase font-semibold">Active WOs</div>
                            <div className="text-sm font-medium text-slate-900">{vendorWOs.length}</div>
                        </div>
                         <div>
                            <div className="text-xs text-slate-500 uppercase font-semibold">Contracts</div>
                            <button onClick={() => navigate('/contracts', { state: { vendorFilter: vendor.id } })} className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">{vendorContracts.length} <FileText size={14} /></button>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <button className="flex-1 py-2 text-sm text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                          View Profile
                        </button>
                        <button onClick={() => navigate('/analytics', { state: { vendorId: vendor.id } })} className="flex-1 py-2 text-sm text-slate-600 font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2">
                          <BarChart2 size={14} /> Performance
                        </button>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};