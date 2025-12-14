import React from 'react';
import { Receipt, Plus, Filter, Check, AlertTriangle, Clock } from 'lucide-react';
import { INVOICES, VENDORS, PURCHASE_ORDERS, WORK_ORDERS } from '../services/mockData';

export const Invoicing: React.FC = () => {

  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'Paid': return { icon: Check, color: 'text-green-600', bg: 'bg-green-100'};
      case 'Approved': return { icon: Check, color: 'text-blue-600', bg: 'bg-blue-100'};
      case 'Disputed': return { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100'};
      default: return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100'};
    }
  };

  const totalPayables = INVOICES.filter(i => i.status !== 'Paid').reduce((acc, i) => acc + i.amount, 0);
  const overdue = INVOICES.filter(i => new Date(i.dueDate) < new Date() && i.status !== 'Paid').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoicing & Payables</h1>
          <p className="text-slate-500 mt-1">Automate invoice processing, approvals, and vendor payments.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Submit Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Total Payables</div><div className="text-3xl font-bold mt-2">${(totalPayables/1000).toFixed(1)}k</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Invoices Awaiting Approval</div><div className="text-3xl font-bold mt-2">{INVOICES.filter(i => i.status === 'Submitted').length}</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Overdue Invoices</div><div className="text-3xl font-bold mt-2 text-red-500">{overdue}</div></div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Invoice Register</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Invoice #</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Vendor</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Due Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700">3-Way Match</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Amount</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {INVOICES.map(inv => {
              const vendor = VENDORS.find(v => v.id === inv.vendorId);
              const status = getStatusInfo(inv.status);
              const relatedDoc = inv.purchaseOrderId || inv.workOrderId;
              return (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">{inv.invoiceNumber}</td>
                  <td className="px-6 py-4 text-slate-600">{vendor?.name}</td>
                  <td className="px-6 py-4 text-slate-600">{inv.dueDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                        <span className="text-green-500"><Check size={14}/></span>
                        <span className="text-xs font-medium text-slate-600">{relatedDoc}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-right font-mono">${inv.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                        <status.icon size={12}/>
                        {inv.status}
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