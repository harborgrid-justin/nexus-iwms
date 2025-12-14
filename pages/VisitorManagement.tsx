import React from 'react';
import { UserCheck, LogIn, LogOut, Plus, Search } from 'lucide-react';
import { VISITORS, EMPLOYEES } from '../services/mockData';

export const VisitorManagement: React.FC = () => {

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Checked In': return 'bg-green-100 text-green-800';
            case 'Expected': return 'bg-blue-100 text-blue-800';
            case 'Checked Out': return 'bg-slate-100 text-slate-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };
    
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visitor Management</h1>
          <p className="text-slate-500 mt-1">Manage guest registration, check-ins, and security notifications.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Pre-register Visitor
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4"><UserCheck size={24} className="text-blue-500" /><div><div className="text-slate-500 text-sm">Expected Today</div><div className="text-2xl font-bold">{VISITORS.filter(v => v.status === 'Expected').length}</div></div></div>
          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4"><LogIn size={24} className="text-green-500" /><div><div className="text-slate-500 text-sm">Currently On-site</div><div className="text-2xl font-bold">{VISITORS.filter(v => v.status === 'Checked In').length}</div></div></div>
          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4"><LogOut size={24} className="text-slate-500" /><div><div className="text-slate-500 text-sm">Checked Out Today</div><div className="text-2xl font-bold">{VISITORS.filter(v => v.status === 'Checked Out').length}</div></div></div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-bold text-slate-900">Visitor Log</h2>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search visitors..." className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-white" />
            </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Visitor Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Company</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Host</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Arrival Time</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {VISITORS.map(visitor => {
              const host = EMPLOYEES.find(e => e.id === visitor.host);
              return (
                <tr key={visitor.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-semibold text-slate-900">{visitor.name}</td>
                  <td className="px-6 py-4 text-slate-600">{visitor.company}</td>
                  <td className="px-6 py-4 text-slate-600">{host?.name}</td>
                  <td className="px-6 py-4 text-slate-600">{new Date(visitor.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(visitor.status)}`}>
                      {visitor.status}
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
