import React, { useState } from 'react';
import { EMPLOYEES, SERVICE_REQUESTS } from '../services/mockData';
import { Mail, Phone, MapPin, Search } from 'lucide-react';

export const People: React.FC = () => {
  const [activeTab, setActiveTab] = useState('directory');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">People & Workplace</h1>
        <p className="text-slate-500 mt-1">Employee directory and workplace service requests.</p>
      </div>
      
       <div className="border-b border-slate-200">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          <button onClick={() => setActiveTab('directory')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'directory' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Employee Directory</button>
          <button onClick={() => setActiveTab('services')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'services' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Workplace Services</button>
        </nav>
      </div>

      {activeTab === 'directory' && (<>
        <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} /><input type="text" placeholder="Search employees by name, title, department..." className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EMPLOYEES.map(emp => (
            <div key={emp.id} className="bg-white p-5 rounded-xl border shadow-sm text-center flex flex-col items-center">
              <img src={emp.imageUrl} alt={emp.name} className="w-20 h-20 rounded-full mb-3" />
              <h3 className="font-bold text-slate-900">{emp.name}</h3>
              <p className="text-sm text-blue-600 font-medium">{emp.title}</p>
              <p className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mt-2">{emp.department}</p>
              <div className="mt-4 pt-4 border-t w-full space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-center gap-2"><Mail size={14} /><a href={`mailto:${emp.email}`} className="hover:underline">{emp.email}</a></div>
                <div className="flex items-center justify-center gap-2"><Phone size={14} />{emp.phone}</div>
                <div className="flex items-center justify-center gap-2"><MapPin size={14} />{emp.location}</div>
              </div>
            </div>
          ))}
        </div>
      </>)}

      {activeTab === 'services' && (<>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-xl border shadow-sm">
            <div className="p-4 border-b"><h2 className="text-lg font-bold">My Service Requests</h2></div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50"><tr><th className="px-4 py-3 font-semibold text-slate-600">Request ID</th><th className="px-4 py-3 font-semibold text-slate-600">Type</th><th className="px-4 py-3 font-semibold text-slate-600">Location</th><th className="px-4 py-3 font-semibold text-slate-600">Status</th></tr></thead>
              <tbody>{SERVICE_REQUESTS.map(sr => (
                <tr key={sr.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-mono text-slate-600">{sr.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{sr.type}</td>
                  <td className="px-4 py-3 text-slate-600">{sr.location}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-1 rounded-full ${sr.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{sr.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-bold">New Request</h2>
            <form className="mt-4 space-y-4">
              <div><label className="text-sm font-medium text-slate-700">Request Type</label><select className="w-full mt-1 p-2 border rounded-lg bg-slate-50"><option>Temperature</option><option>Maintenance</option><option>Janitorial</option><option>IT</option></select></div>
              <div><label className="text-sm font-medium text-slate-700">Location</label><input type="text" placeholder="e.g., HQ Floor 2" className="w-full mt-1 p-2 border rounded-lg bg-slate-50"/></div>
              <div><label className="text-sm font-medium text-slate-700">Details</label><textarea placeholder="Please describe the issue..." className="w-full mt-1 p-2 border rounded-lg bg-slate-50 h-24"></textarea></div>
              <button type="button" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Submit Request</button>
            </form>
          </div>
        </div>
      </>)}
    </div>
  );
};
