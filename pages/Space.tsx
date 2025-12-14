import React, { useState } from 'react';
import { SPACE_DATA, MOVE_REQUESTS } from '../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#e2e8f0'];

export const Space: React.FC = () => {
  const [activeTab, setActiveTab] = useState('utilization');

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Approved':
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Requested': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Space Management</h1>
        <p className="text-slate-500 mt-1">Analyze utilization, plan moves, and manage workplace reservations.</p>
      </div>

      <div className="border-b border-slate-200">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          <button onClick={() => setActiveTab('utilization')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'utilization' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Utilization & Floor Plans</button>
          <button onClick={() => setActiveTab('moves')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'moves' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Move Management</button>
        </nav>
      </div>

      {activeTab === 'utilization' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive Floor Plan Placeholder */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900">Live Floor Map (Level 1)</h3>
              <div className="flex gap-2">
                 <div className="flex items-center gap-1 text-xs text-slate-500"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Occupied</div>
                 <div className="flex items-center gap-1 text-xs text-slate-500"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Available</div>
              </div>
            </div>
            
            <div className="flex-1 bg-slate-50 border border-slate-200 border-dashed rounded-lg flex items-center justify-center relative overflow-hidden group">
              <svg viewBox="0 0 400 300" className="w-full h-full p-4">
                 <rect x="50" y="50" width="300" height="200" fill="white" stroke="#94a3b8" strokeWidth="2" />
                 <line x1="200" y1="50" x2="200" y2="250" stroke="#cbd5e1" strokeWidth="2" />
                 <line x1="50" y1="150" x2="350" y2="150" stroke="#cbd5e1" strokeWidth="2" />
                 <rect x="60" y="60" width="40" height="40" fill="#3b82f6" rx="4" className="cursor-pointer hover:opacity-80 transition-opacity"><title>Conf Room A (Occupied)</title></rect>
                 <rect x="110" y="60" width="40" height="40" fill="#e2e8f0" rx="4" className="cursor-pointer hover:opacity-80 transition-opacity"><title>Conf Room B (Available)</title></rect>
                 <circle cx="80" cy="180" r="8" fill="#3b82f6" />
                 <circle cx="110" cy="180" r="8" fill="#3b82f6" />
                 <circle cx="140" cy="180" r="8" fill="#e2e8f0" />
                 <circle cx="170" cy="180" r="8" fill="#3b82f6" />
                 <circle cx="230" cy="80" r="8" fill="#e2e8f0" />
                 <circle cx="260" cy="80" r="8" fill="#3b82f6" />
                 <circle cx="290" y="80" r="8" fill="#3b82f6" />
                 <text x="185" y="40" className="text-[10px] fill-slate-400">North Entrance</text>
              </svg>
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 <span className="bg-black/75 text-white px-3 py-1 rounded-full text-xs backdrop-blur">Click zone for details</span>
              </div>
            </div>
          </div>

          {/* Utilization Metrics */}
          <div className="space-y-6">
             {SPACE_DATA.map((floor, i) => (
               <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
                  <div className="w-24 h-24 flex-shrink-0 relative">
                     <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                         <Pie
                           data={[ { name: 'Used', value: floor.utilization }, { name: 'Free', value: 100 - floor.utilization } ]}
                           innerRadius={25}
                           outerRadius={40}
                           paddingAngle={2}
                           dataKey="value"
                         >
                           <Cell key={`cell-0`} fill={floor.utilization > 90 ? '#ef4444' : '#3b82f6'} />
                           <Cell key={`cell-1`} fill="#f1f5f9" />
                         </Pie>
                       </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-xs font-bold text-slate-700">{floor.utilization}%</span>
                     </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-slate-900">{floor.floor}</h4>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{floor.department}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <div className="text-xs text-slate-400">Total Seats</div>
                        <div className="text-sm font-semibold">{floor.seatsTotal}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Available</div>
                        <div className="text-sm font-semibold text-green-600">{floor.seatsAvailable}</div>
                      </div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      )}

      {activeTab === 'moves' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Employee / Department</th>
                <th className="px-6 py-4 font-semibold text-slate-700">From Location</th>
                <th className="px-6 py-4 font-semibold text-slate-700">To Location</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Move Date</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOVE_REQUESTS.map(req => (
                <tr key={req.id}>
                  <td className="px-6 py-4 font-medium text-slate-900">{req.employeeName}</td>
                  <td className="px-6 py-4 text-slate-600">{req.fromLocation}</td>
                  <td className="px-6 py-4 text-slate-600">{req.toLocation}</td>
                  <td className="px-6 py-4 text-slate-600">{req.moveDate}</td>
                  <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>{req.status}</span></td>
                  <td className="px-6 py-4"><button className="font-medium text-blue-600 hover:text-blue-800">Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
