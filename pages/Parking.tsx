import React from 'react';
import { Car, Ticket, Users, Plus, Filter, Search } from 'lucide-react';
import { PARKING_PERMITS, EMPLOYEES } from '../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#e2e8f0'];

export const Parking: React.FC = () => {

  const lotUtilizationData = [
    { name: 'Assigned', value: 180 },
    { name: 'Available', value: 70 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Parking Management</h1>
          <p className="text-slate-500 mt-1">Administer parking permits and monitor lot utilization.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Assign Permit
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border shadow-sm flex flex-col items-center justify-center">
             <h3 className="text-lg font-bold text-slate-900 mb-4">HQ Lot B Utilization</h3>
             <div className="w-48 h-48">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={lotUtilizationData} innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                           {lotUtilizationData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                         <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
             </div>
             <div className="text-4xl font-bold mt-4">72%</div>
             <div className="text-slate-500">180 / 250 Spaces Assigned</div>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-lg font-bold text-slate-900">Permit Holder Registry</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Search by employee, plate..." className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-white" />
                </div>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-700">Assigned To</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Permit / Lot</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Vehicle</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Expires</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PARKING_PERMITS.map(permit => {
                    const employee = EMPLOYEES.find(e => e.id === permit.assignedTo);
                    return (
                      <tr key={permit.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900">{employee?.name}</div>
                          <div className="text-xs text-slate-500">{employee?.department}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-mono text-slate-900">{permit.permitNumber}</div>
                          <div className="text-xs text-slate-500">{permit.lot}{permit.spot ? ` (#${permit.spot})` : ''}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{permit.vehicle}</td>
                        <td className="px-6 py-4 text-slate-600">{permit.expiryDate}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  );
};
