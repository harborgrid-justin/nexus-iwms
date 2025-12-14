import React from 'react';
import { FileClock, Plus, Filter, AlertTriangle, Calendar, FileText } from 'lucide-react';
import { LEASES, PROPERTIES, LEASE_CLAUSES } from '../services/mockData';

export const LeaseAdmin: React.FC = () => {

  const expiringSoon = LEASES.filter(l => l.status === 'Expiring Soon').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Lease Administration</h1>
          <p className="text-slate-500 mt-1">Manage lease agreements, critical dates, and financial obligations.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Add Lease
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Active Leases</div><div className="text-3xl font-bold mt-2">{LEASES.filter(l => l.status === 'Active').length}</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Leases Expiring (90 days)</div><div className="text-3xl font-bold mt-2 text-amber-500">{expiringSoon}</div></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><div className="text-sm text-slate-500">Avg. Rent / sqft</div><div className="text-3xl font-bold mt-2">$32.50</div></div>
      </div>
      
       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Lease Portfolio</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Property / Tenant</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Term End</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Next Critical Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Monthly Rent</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {LEASES.map(lease => {
              const property = PROPERTIES.find(p => p.id === lease.propertyId);
              return (
                <tr key={lease.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{lease.tenantName}</div>
                    <div className="text-xs text-slate-500">{property?.name}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{lease.endDate}</td>
                   <td className="px-6 py-4 text-slate-600">
                     <div className="flex items-center gap-2">
                       {lease.status === 'Expiring Soon' && <AlertTriangle size={16} className="text-amber-500" />}
                       <div>
                         <div>{lease.criticalDates[0].name}</div>
                         <div className="text-xs text-slate-500">{lease.criticalDates[0].date}</div>
                       </div>
                     </div>
                   </td>
                  <td className="px-6 py-4 text-slate-600 text-right font-mono">${lease.monthlyRent.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lease.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                      {lease.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Calendar/> Critical Dates Calendar</h3>
            <div className="h-64 bg-slate-50 border-2 border-dashed rounded-lg flex items-center justify-center text-slate-500">Calendar View Placeholder</div>
        </div>
         <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><FileText/> Lease Clause Library</h3>
            <div className="space-y-2">
                {LEASE_CLAUSES.slice(0,3).map(clause => (
                    <div key={clause.id} className="p-2 bg-slate-50 border rounded">
                        <p className="font-semibold text-xs text-slate-700">{clause.name} <span className="font-normal text-blue-600">(Lease {clause.leaseId})</span></p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};