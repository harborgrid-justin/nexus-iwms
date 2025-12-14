import React, { useState } from 'react';
import { MapPin, Layout, List, Filter, Download, Plus, AlertTriangle, MoreHorizontal, Wrench, Presentation } from 'lucide-react';
import { PROPERTIES, LEASES, TRANSACTIONS, WORK_ORDERS, CAPITAL_PROJECTS } from '../services/mockData';
import { useNavigate } from 'react-router-dom';

const KanbanColumn = ({ title, transactions, color }: { title: string, transactions: any[], color: string }) => (
  <div className="flex-1 min-w-[280px]">
    <div className={`font-semibold text-sm mb-4 px-1 flex items-center gap-2`}><div className={`w-2 h-2 rounded-full ${color}`}></div>{title} <span className="text-slate-400">{transactions.length}</span></div>
    <div className="space-y-3">
      {transactions.map(t => (
        <div key={t.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:shadow-md cursor-grab">
          <div className="flex justify-between items-start">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.type === 'Acquisition' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{t.type}</span>
            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16}/></button>
          </div>
          <p className="font-semibold text-slate-800 mt-2">Deal Value: ${(t.dealValue/1000000).toFixed(1)}M</p>
          <p className="text-xs text-slate-500 mt-1">Property ID: {t.propertyId}</p>
          <p className="text-xs text-slate-500">Target Close: {t.closeDate}</p>
        </div>
      ))}
    </div>
  </div>
);

export const RealEstate: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Real Estate Portfolio</h1>
          <p className="text-slate-500 mt-1">Manage properties, leases, and occupancy strategies.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-1 flex">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <List size={20} />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Layout size={20} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Add Property
          </button>
        </div>
      </div>

      {/* Property Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROPERTIES.map(prop => {
            const activeWos = WORK_ORDERS.filter(wo => wo.propertyId === prop.id && wo.status !== 'Completed').length;
            const activeProjects = CAPITAL_PROJECTS.filter(p => p.propertyId === prop.id && p.status !== 'Closed').length;
            return (
              <div key={prop.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 bg-slate-200 relative">
                  <img src={prop.imageUrl} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur text-xs font-bold rounded text-slate-800 shadow-sm">
                    {prop.type}
                  </div>
                  <div className={`absolute bottom-3 left-3 px-2 py-1 text-xs font-bold rounded text-white shadow-sm ${prop.status === 'Good' ? 'bg-emerald-500' : prop.status === 'Warning' ? 'bg-amber-500' : 'bg-red-500'}`}>
                    {prop.status}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{prop.name}</h3>
                    <div className="flex gap-2">
                      {activeWos > 0 && <button onClick={() => navigate('/operations')} className="flex items-center gap-1 text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-800 rounded-full"><Wrench size={12}/>{activeWos}</button>}
                      {activeProjects > 0 && <button onClick={() => navigate('/projects')} className="flex items-center gap-1 text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full"><Presentation size={12}/>{activeProjects}</button>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                    <MapPin size={16} />
                    {prop.address}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100">
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Size</div>
                      <div className="text-sm font-medium text-slate-900">{prop.sizeSqFt.toLocaleString()} sqft</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Occupancy</div>
                      <div className="text-sm font-medium text-slate-900">{prop.occupancyRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-semibold">Value</div>
                      <div className="text-sm font-medium text-slate-900">${(prop.marketValue / 1000000).toFixed(1)}M</div>
                    </div>
                    <div>
                       <div className="text-xs text-slate-500 uppercase font-semibold">ID</div>
                       <div className="text-sm font-medium text-slate-900">{prop.id}</div>
                    </div>
                  </div>
                  <button className="w-full mt-2 py-2 text-sm text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Property Name</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Size (sqft)</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Occupancy</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PROPERTIES.map(prop => (
                <tr key={prop.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{prop.name}</td>
                  <td className="px-6 py-4 text-slate-600">{prop.type}</td>
                  <td className="px-6 py-4 text-slate-600">{prop.sizeSqFt.toLocaleString()}</td>
                  <td className="px-6 py-4">
                     <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500" style={{width: `${prop.occupancyRate}%`}}></div>
                     </div>
                     <span className="text-xs text-slate-500 mt-1 block">{prop.occupancyRate}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${prop.status === 'Good' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="font-medium text-blue-600 hover:text-blue-800">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Transaction Pipeline</h2>
        <div className="bg-slate-50 p-4 rounded-xl border -mx-4">
          <div className="flex gap-4 overflow-x-auto pb-4">
              <KanbanColumn title="Prospecting" transactions={TRANSACTIONS.filter(t => t.stage === 'Prospecting')} color="bg-gray-400" />
              <KanbanColumn title="Due Diligence" transactions={TRANSACTIONS.filter(t => t.stage === 'Due Diligence')} color="bg-yellow-400" />
              <KanbanColumn title="Negotiation" transactions={TRANSACTIONS.filter(t => t.stage === 'Negotiation')} color="bg-orange-400" />
              <KanbanColumn title="Closing" transactions={TRANSACTIONS.filter(t => t.stage === 'Closing')} color="bg-blue-400" />
          </div>
        </div>
      </div>

      {/* Lease Administration Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Lease Administration</h2>
          <button className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
            <Download size={14} /> Export Report
          </button>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
           <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Lease ID</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Tenant</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Term End</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Next Critical Date</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LEASES.map(lease => (
                <tr key={lease.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{lease.id}</td>
                  <td className="px-6 py-4 text-slate-600">{lease.tenantName}</td>
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
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lease.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                      {lease.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};