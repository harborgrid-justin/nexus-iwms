import React from 'react';
import { CheckCircle2, AlertTriangle, Clock, ShieldCheck, Plus, Filter } from 'lucide-react';
import { COMPLIANCE_TASKS, PROPERTIES } from '../services/mockData';

const KpiCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className={`mb-4 inline-block p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="text-slate-500 text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold text-slate-900 mt-1">{value}</div>
    </div>
);

export const Compliance: React.FC = () => {

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Completed': return { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100' };
      case 'Overdue': return { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100' };
      default: return { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100' };
    }
  };

  const overdueTasks = COMPLIANCE_TASKS.filter(t => t.status === 'Overdue').length;
  const totalTasks = COMPLIANCE_TASKS.length;
  const completedTasks = COMPLIANCE_TASKS.filter(t => t.status === 'Completed').length;
  const complianceRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(0) : 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compliance Management</h1>
          <p className="text-slate-500 mt-1">Track permits, inspections, and regulatory tasks across the portfolio.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
            <Filter size={16} /> Filter by Type
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Add Compliance Task
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Overall Compliance" value={`${complianceRate}%`} icon={ShieldCheck} color="bg-blue-500" />
        <KpiCard title="Overdue Tasks" value={overdueTasks} icon={AlertTriangle} color="bg-red-500" />
        <KpiCard title="Tasks Due in 30 Days" value="3" icon={Clock} color="bg-amber-500" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Compliance Task Log</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Task Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Property</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Due Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Assigned To</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {COMPLIANCE_TASKS.map(task => {
              const statusInfo = getStatusInfo(task.status);
              const property = PROPERTIES.find(p => p.id === task.propertyId);
              return (
                <tr key={task.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{task.name}</td>
                  <td className="px-6 py-4 text-slate-600">{property?.name}</td>
                  <td className="px-6 py-4 text-slate-600">{task.type}</td>
                  <td className="px-6 py-4 text-slate-600">{task.dueDate}</td>
                  <td className="px-6 py-4 text-slate-600">{task.assignedTo}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                      <statusInfo.icon size={12} />
                      {task.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
