import React from 'react';
import { SAFETY_INCIDENTS, PROPERTIES } from '../services/mockData';
import { AlertOctagon, HeartPulse, ShieldCheck, BarChart } from 'lucide-react';

const KpiCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className={`mb-4 inline-block p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div className="text-slate-500 text-sm font-medium">{title}</div>
    <div className="text-3xl font-bold text-slate-900 mt-1">{value}</div>
  </div>
);

export const EHS: React.FC = () => {
    
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Closed': return 'bg-blue-100 text-blue-800';
      case 'Under Investigation': return 'bg-amber-100 text-amber-800';
      case 'Corrective Action Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'border-red-500';
      case 'High': return 'border-orange-500';
      case 'Medium': return 'border-yellow-500';
      default: return 'border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Environmental, Health & Safety (EHS)</h1>
        <p className="text-slate-500 mt-1">Manage incidents, compliance, and safety programs.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Open Incidents" value={SAFETY_INCIDENTS.filter(i => i.status !== 'Closed').length} icon={AlertOctagon} color="bg-red-500" />
        <KpiCard title="Days Since Last Injury" value="5" icon={HeartPulse} color="bg-green-500" />
        <KpiCard title="Compliance Status" value="98%" icon={ShieldCheck} color="bg-blue-500" />
        <KpiCard title="Inspections Due" value="2" icon={BarChart} color="bg-amber-500" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Incident Log</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Incident Details</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Property</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {SAFETY_INCIDENTS.map(si => (
              <tr key={si.id} className="hover:bg-slate-50/50">
                <td className={`px-6 py-4 border-l-4 ${getSeverityColor(si.severity)}`}>
                  <div className="font-semibold text-slate-900">{si.type} <span className="text-xs text-slate-400 font-mono">({si.id})</span></div>
                  <div className="text-xs text-slate-500 truncate max-w-md">{si.description}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">{PROPERTIES.find(p => p.id === si.propertyId)?.name}</td>
                <td className="px-6 py-4 text-slate-600">{si.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(si.status)}`}>
                    {si.status}
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