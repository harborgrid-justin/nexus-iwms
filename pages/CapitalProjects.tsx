import React, { useState } from 'react';
import { CAPITAL_PROJECTS, PROPERTIES, EMPLOYEES } from '../services/mockData';
import { Status } from '../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { ArrowUp, ArrowDown, ShieldAlert, FileText, Download } from 'lucide-react';

const getStatusColor = (status: Status) => {
  switch (status) {
    case Status.OnTrack: return 'bg-green-100 text-green-800';
    case Status.AtRisk: return 'bg-amber-100 text-amber-800';
    case Status.Overdue: return 'bg-red-100 text-red-800';
    case Status.Pending: return 'bg-slate-100 text-slate-800';
    default: return 'bg-slate-100 text-slate-800';
  }
};

export const CapitalProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(CAPITAL_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState('budget');

  const budgetData = selectedProject.budgetItems?.map(item => ({ name: item.category, Budgeted: item.budgeted, Actual: item.actual })) || [];
  const totalVariance = selectedProject.spent - selectedProject.totalBudget;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Capital Projects</h1><p className="text-slate-500 mt-1">Manage the lifecycle of major portfolio investments.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Project List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <h2 className="p-4 text-lg font-bold text-slate-900 border-b">All Projects</h2>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {CAPITAL_PROJECTS.map(p => {
              const property = PROPERTIES.find(prop => prop.id === p.propertyId);
              const progress = (p.spent / p.totalBudget) * 100;
              return (<button key={p.id} onClick={() => { setSelectedProject(p); setActiveTab('budget'); }} className={`w-full text-left p-4 hover:bg-slate-50 ${selectedProject.id === p.id && 'bg-blue-50'}`}>
                <div className="flex justify-between items-center mb-2"><h3 className="font-semibold text-slate-800 truncate">{p.name}</h3><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(p.status)}`}>{p.status}</span></div>
                <p className="text-xs text-slate-500">{p.type} @ {property?.name}</p>
                <div className="mt-3"><div className="flex justify-between text-[10px] font-medium text-slate-500 mb-1"><span>${(p.spent / 1000).toFixed(0)}k</span><span>${(p.totalBudget / 1000).toFixed(0)}k</span></div><div className="w-full bg-slate-200 h-1.5 rounded-full"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${Math.min(progress, 100)}%`}}></div></div></div>
              </button>)
            })}
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-y-auto p-6 space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <div><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(selectedProject.status)}`}>{selectedProject.status}</span><h2 className="text-xl font-bold text-slate-900 mt-2">{selectedProject.name}</h2><p className="text-slate-500">{PROPERTIES.find(prop => prop.id === selectedProject.propertyId)?.name}</p></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
              <div className="bg-slate-50 p-3 rounded-lg border"><div className="text-xs text-slate-500 uppercase">Start Date</div><div className="font-semibold">{selectedProject.startDate}</div></div>
              <div className="bg-slate-50 p-3 rounded-lg border"><div className="text-xs text-slate-500 uppercase">End Date</div><div className="font-semibold">{selectedProject.endDate}</div></div>
              <div className="bg-slate-50 p-3 rounded-lg border"><div className="text-xs text-slate-500 uppercase">Manager</div><div className="font-semibold">{EMPLOYEES.find(e => e.id === selectedProject.manager)?.name}</div></div>
              <div className="bg-slate-50 p-3 rounded-lg border"><div className="text-xs text-slate-500 uppercase">Variance</div><div className={`font-semibold flex items-center justify-center gap-1 ${totalVariance > 0 ? 'text-red-600' : 'text-green-600'}`}>{totalVariance > 0 ? <ArrowUp size={14}/> : <ArrowDown size={14} />} ${Math.abs(totalVariance).toLocaleString()}</div></div>
            </div>
          </div>
          
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              <button onClick={() => setActiveTab('budget')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'budget' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Budget</button>
              <button onClick={() => setActiveTab('docs')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'docs' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Documents</button>
              <button onClick={() => setActiveTab('risks')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'risks' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Risks</button>
            </nav>
          </div>

          {activeTab === 'budget' && (<div><h3 className="text-lg font-bold text-slate-900 mb-4">Budget vs. Actual</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={budgetData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tick={{fontSize: 12}} /><YAxis tick={{fontSize: 12}} tickFormatter={(val) => `$${(val/1000)}k`} /><Tooltip cursor={{fill: 'rgba(241, 245, 249, 0.5)'}} contentStyle={{borderRadius: '8px', border: 'none'}} /><Bar dataKey="Budgeted" fill="#a5b4fc" radius={[4, 4, 0, 0]} /><Bar dataKey="Actual" fill="#4f46e5" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></div>)}
          
          {activeTab === 'docs' && (<div><h3 className="text-lg font-bold text-slate-900 mb-4">Documents</h3><div className="space-y-3">{selectedProject.documents?.map(doc => (<div key={doc.id} className="p-3 bg-slate-50/80 border rounded-lg flex justify-between items-center"><div className="flex items-center gap-3"><FileText size={20} className="text-blue-500"/><div ><div className="font-semibold text-sm text-slate-800">{doc.name}</div><p className="text-xs text-slate-500 mt-1">{doc.type} &middot; {doc.size}</p></div></div><button className="p-2 text-slate-500 hover:text-blue-600"><Download size={16}/></button></div>))}</div></div>)}

          {activeTab === 'risks' && (<div><h3 className="text-lg font-bold text-slate-900 mb-4">Risk Log</h3><div className="space-y-3">{selectedProject.risks?.map(risk => (<div key={risk.id} className="p-3 bg-slate-50/80 border rounded-lg"><div className="flex items-center gap-2 font-semibold text-sm text-slate-800"><ShieldAlert size={16} className="text-amber-500"/>{risk.description}</div><p className="text-xs text-slate-500 mt-1 pl-6">Mitigation: {risk.mitigation}</p></div>))}</div></div>)}
        </div>
      </div>
    </div>
  );
};
