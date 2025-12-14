
import React, { useState } from 'react';
import { Building, Search, Filter, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { USACE_RFMIS_FACILITIES } from '../../../services/mockData';
import { Link } from 'react-router-dom';

export const RfmisInventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [componentFilter, setComponentFilter] = useState('All');

  const filteredFacilities = USACE_RFMIS_FACILITIES.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.rsid.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesComponent = componentFilter === 'All' || f.serviceComponent === componentFilter;
      return matchesSearch && matchesComponent;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recruiting Facility Inventory</h1>
          <p className="text-slate-500 mt-1">System of record for Army, Joint, and Marine recruiting sites.</p>
        </div>
        <div className="flex gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by RSID or Name..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg bg-white w-64" 
                />
            </div>
            <select 
                value={componentFilter}
                onChange={e => setComponentFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white text-slate-700"
            >
                <option value="All">All Components</option>
                <option value="Army">Army</option>
                <option value="Joint">Joint</option>
                <option value="Marines">Marines</option>
            </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">RSID / Facility Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Location</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Organization</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-center">FCI</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredFacilities.map(f => (
              <tr key={f.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{f.name}</div>
                    <div className="text-xs font-mono text-blue-600">{f.rsid}</div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-slate-600"><MapPin size={14}/> {f.city}, {f.state}</div>
                </td>
                <td className="px-6 py-4">
                    <div className="text-slate-800">{f.recruitingBattalion}</div>
                    <div className="text-xs text-slate-500">{f.serviceComponent}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">{f.type}</td>
                <td className="px-6 py-4 text-center">
                    <span className={`font-bold ${f.fci > 80 ? 'text-green-600' : f.fci > 60 ? 'text-amber-600' : 'text-red-600'}`}>{f.fci}</span>
                </td>
                <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${f.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                        {f.status}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <Link to={`/rfmis/inventory/${f.id}`} className="text-blue-600 hover:underline font-medium">Manage</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
