import React from 'react';
import { ShoppingCart, Plus, Filter, Truck } from 'lucide-react';
import { PURCHASE_ORDERS, VENDORS } from '../services/mockData';

export const Procurement: React.FC = () => {

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Issued': return 'bg-blue-100 text-blue-800';
      case 'Received':
      case 'Closed':
         return 'bg-green-100 text-green-800';
      case 'Partially Received': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const totalOpenPoValue = PURCHASE_ORDERS.filter(p => p.status !== 'Closed').reduce((acc, p) => acc + p.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Procurement Management</h1>
          <p className="text-slate-500 mt-1">Create and track purchase orders for materials and services.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> New Purchase Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Open PO Value</div><div className="text-3xl font-bold mt-2">${(totalOpenPoValue/1000).toFixed(1)}k</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">POs Issued (Last 30 Days)</div><div className="text-3xl font-bold mt-2">2</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Pending Deliveries</div><div className="text-3xl font-bold mt-2">1</div></div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Purchase Order Log</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">PO Number</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Vendor</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Linked To</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Amount</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PURCHASE_ORDERS.map(po => {
              const vendor = VENDORS.find(v => v.id === po.vendorId);
              return (
                <tr key={po.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">{po.id}</td>
                  <td className="px-6 py-4 text-slate-600">{vendor?.name}</td>
                  <td className="px-6 py-4 text-slate-600">{po.orderDate}</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">{po.projectId || po.workOrderId}</td>
                  <td className="px-6 py-4 text-slate-600 text-right font-mono">${po.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(po.status)}`}>
                      {po.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};