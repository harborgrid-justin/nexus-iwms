import React from 'react';
import { Calendar, AlertTriangle, CheckCircle2, History, Plus, Filter } from 'lucide-react';
import { PM_SCHEDULES, ASSETS } from '../services/mockData';

export const PreventiveMaintenance: React.FC = () => {
    
  const getStatusInfo = (status: string) => {
    switch(status) {
      case 'Scheduled': return { icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'Overdue': return { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' };
      case 'Completed': return { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' };
      default: return { icon: History, color: 'text-slate-600', bg: 'bg-slate-100' };
    }
  };

  const overdue = PM_SCHEDULES.filter(p => p.status === 'Overdue').length;
  const upcoming = PM_SCHEDULES.filter(p => {
    const dueDate = new Date(p.nextDueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 30;
  }).length;


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Preventive Maintenance</h1>
          <p className="text-slate-500 mt-1">Schedule and track recurring maintenance to maximize asset lifespan.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> New PM Schedule
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <AlertTriangle className="text-red-500" size={24}/>
            <div><div className="text-slate-500 text-sm">Overdue PMs</div><div className="text-2xl font-bold">{overdue}</div></div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <Calendar className="text-amber-500" size={24}/>
            <div><div className="text-slate-500 text-sm">Due in 30 Days</div><div className="text-2xl font-bold">{upcoming}</div></div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <CheckCircle2 className="text-green-500" size={24}/>
            <div><div className="text-slate-500 text-sm">On-Time Completion (YTD)</div><div className="text-2xl font-bold">92%</div></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">PM Schedule</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Task / Asset</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Frequency</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Next Due Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Last Completed</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PM_SCHEDULES.map(pm => {
              const asset = ASSETS.find(a => a.id === pm.assetId);
              const statusInfo = getStatusInfo(pm.status);
              return (
                <tr key={pm.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{pm.task}</div>
                    <div className="text-xs text-slate-500">{asset?.name} ({asset?.id})</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{pm.frequency}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{pm.nextDueDate}</td>
                  <td className="px-6 py-4 text-slate-600">{pm.lastCompletedDate || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                        <statusInfo.icon size={12}/>
                        {pm.status}
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
