import React from 'react';
import { ShieldCheck, ShieldAlert, DollarSign, Calendar, Plus, Filter } from 'lucide-react';
import { INSURANCE_POLICIES, PROPERTIES } from '../services/mockData';

const KpiCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className={`mb-4 inline-block p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="text-slate-500 text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold text-slate-900 mt-1">{value}</div>
    </div>
);

export const Insurance: React.FC = () => {

  const totalPremium = INSURANCE_POLICIES.reduce((acc, p) => acc + p.premium, 0);
  const policiesExpiringSoon = INSURANCE_POLICIES.filter(p => {
    const expiry = new Date(p.expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 90;
  }).length;
    
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Insurance Management</h1>
          <p className="text-slate-500 mt-1">Track policies, coverage, and claims to mitigate portfolio risk.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
            <Filter size={16} /> Filter by Type
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Add Policy
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Total Annual Premium" value={`$${(totalPremium/1000).toFixed(1)}k`} icon={DollarSign} color="bg-green-500" />
        <KpiCard title="Total Coverage Value" value="$235M" icon={ShieldCheck} color="bg-blue-500" />
        <KpiCard title="Policies Expiring (90 days)" value={policiesExpiringSoon} icon={ShieldAlert} color="bg-amber-500" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Policy Register</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Policy / Property</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Provider</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Expiry Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Coverage</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {INSURANCE_POLICIES.map(policy => {
              const property = PROPERTIES.find(p => p.id === policy.propertyId);
              return (
                <tr key={policy.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{policy.policyNumber}</div>
                    <div className="text-xs text-slate-500">{property?.name}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{policy.provider}</td>
                  <td className="px-6 py-4 text-slate-600">{policy.type}</td>
                  <td className="px-6 py-4 text-slate-600">{policy.expiryDate}</td>
                  <td className="px-6 py-4 text-slate-600 text-right font-mono">${(policy.coverageAmount/1000000).toFixed(1)}M</td>
                  <td className="px-6 py-4 text-slate-600 text-right font-mono">${policy.premium.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
