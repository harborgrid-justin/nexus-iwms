import React from 'react';
import { KeyRound, UserCheck, History, Plus, Filter, Search } from 'lucide-react';
import { KEY_RECORDS, EMPLOYEES } from '../services/mockData';

export const KeyManagement: React.FC = () => {
    
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Key & Access Management</h1>
          <p className="text-slate-500 mt-1">Track physical keys, access cards, and core assignments.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search by key #, employee..." className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Issue Key
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4"><KeyRound size={24} className="text-blue-500" /><div><div className="text-slate-500 text-sm">Total Keys Managed</div><div className="text-2xl font-bold">{KEY_RECORDS.length}</div></div></div>
          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4"><UserCheck size={24} className="text-green-500" /><div><div className="text-slate-500 text-sm">Keys Issued</div><div className="text-2xl font-bold">{KEY_RECORDS.filter(k => !k.returnDate).length}</div></div></div>
          <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4"><History size={24} className="text-amber-500" /><div><div className="text-slate-500 text-sm">Overdue Keys</div><div className="text-2xl font-bold">1</div></div></div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Key Register</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Key / Card Number</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Assigned To</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Accesses</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Issue Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {KEY_RECORDS.map(key => {
              const employee = EMPLOYEES.find(e => e.id === key.assignedTo);
              return (
                <tr key={key.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">{key.keyNumber}</td>
                  <td className="px-6 py-4 text-slate-600">{key.type}</td>
                  <td className="px-6 py-4 text-slate-600">{employee?.name}</td>
                  <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{key.accesses}</td>
                  <td className="px-6 py-4 text-slate-600">{key.issueDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${key.returnDate ? 'bg-slate-100 text-slate-800' : 'bg-green-100 text-green-800'}`}>
                      {key.returnDate ? 'Returned' : 'Issued'}
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
