import React, { useState } from 'react';
import { CAPITAL_PROJECTS, PROPERTIES, EMPLOYEES, PPBE_FUNDS, FUND_TRANSACTIONS } from '../services/mockData';
import { Status, ChangeOrder, ProjectMilestone } from '../types';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';
// FIX: Import 'Calendar' icon from lucide-react.
import { ArrowUp, ArrowDown, ShieldAlert, FileText, Download, GanttChartSquare, DollarSign, Banknote, ListChecks, FilePlus2, AlertCircle, Calendar } from 'lucide-react';

const getStatusColor = (status: Status | string) => {
  switch (status) {
    case Status.OnTrack:
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case Status.AtRisk: return 'bg-amber-100 text-amber-800';
    case Status.Overdue: return 'bg-red-100 text-red-800';
    case Status.Pending:
    case Status.Planning:
    case 'In Progress':
    case 'Not Started':
      return 'bg-slate-100 text-slate-800';
    default: return 'bg-slate-100 text-slate-800';
  }
};

const TabButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void}) => (
    <button onClick={onClick} className={`shrink-0 border-b-2 px-3 pb-3 text-sm font-medium ${isActive ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>{label}</button>
);

export const CapitalProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(CAPITAL_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState('overview');

  const totalVariance = selectedProject.spent - selectedProject.totalBudget;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Capital Projects Command Center</h1><p className="text-slate-500 mt-1">Manage the lifecycle of major portfolio investments.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Project List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <h2 className="p-4 text-lg font-bold text-slate-900 border-b">All Projects</h2>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {CAPITAL_PROJECTS.map(p => {
              const property = PROPERTIES.find(prop => prop.id === p.propertyId);
              const progress = (p.spent / p.totalBudget) * 100;
              return (<button key={p.id} onClick={() => { setSelectedProject(p); setActiveTab('overview'); }} className={`w-full text-left p-4 hover:bg-slate-50 ${selectedProject.id === p.id && 'bg-blue-50'}`}>
                <div className="flex justify-between items-center mb-2"><h3 className="font-semibold text-slate-800 truncate">{p.name}</h3><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(p.status)}`}>{p.status}</span></div>
                <p className="text-xs text-slate-500">{p.type} @ {property?.name}</p>
                <div className="mt-3"><div className="flex justify-between text-[10px] font-medium text-slate-500 mb-1"><span>${(p.spent / 1000).toFixed(0)}k</span><span>${(p.totalBudget / 1000).toFixed(0)}k</span></div><div className="w-full bg-slate-200 h-1.5 rounded-full"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: `${Math.min(progress, 100)}%`}}></div></div></div>
              </button>)
            })}
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(selectedProject.status)}`}>{selectedProject.status}</span><h2 className="text-xl font-bold text-slate-900 mt-2">{selectedProject.name}</h2><p className="text-slate-500">{PROPERTIES.find(prop => prop.id === selectedProject.propertyId)?.name}</p></div>
            </div>
          </div>
          <div className="px-6 border-b border-slate-200">
            <nav className="-mb-px flex gap-4" aria-label="Tabs">
              <TabButton label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
              <TabButton label="Schedule (Gantt)" isActive={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} />
              <TabButton label="Cash Flow" isActive={activeTab === 'cashflow'} onClick={() => setActiveTab('cashflow')} />
              <TabButton label="Funding" isActive={activeTab === 'funding'} onClick={() => setActiveTab('funding')} />
              <TabButton label="Change Orders" isActive={activeTab === 'changeorders'} onClick={() => setActiveTab('changeorders')} />
              <TabButton label="Submittals/RFIs" isActive={activeTab === 'submittals'} onClick={() => setActiveTab('submittals')} />
            </nav>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {activeTab === 'overview' && (<>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-50 p-3 rounded-lg border"><div className="text-xs text-slate-500 uppercase">Start Date</div><div className="font-semibold">{selectedProject.startDate}</div></div>
                <div className="bg-slate-50 p-3 rounded-lg border"><div className="text-xs text-slate-500 uppercase">End Date</div><div className="font-semibold">{selectedProject.endDate}</div></div>
                <div className="bg-slate-50 p-3 rounded-lg border"><div className="text-xs text-slate-500 uppercase">Manager</div><div className="font-semibold">{EMPLOYEES.find(e => e.id === selectedProject.manager)?.name}</div></div>
                <div className="bg-slate-50 p-3 rounded-lg border"><div className="text-xs text-slate-500 uppercase">Variance</div><div className={`font-semibold flex items-center justify-center gap-1 ${totalVariance > 0 ? 'text-red-600' : 'text-green-600'}`}>{totalVariance > 0 ? <ArrowUp size={14}/> : <ArrowDown size={14} />} ${Math.abs(totalVariance).toLocaleString()}</div></div>
              </div>
              <div><h3 className="text-lg font-bold text-slate-900 mb-4">Budget vs. Actual</h3><div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={selectedProject.budgetItems?.map(item => ({ name: item.category, Budgeted: item.budgeted, Actual: item.actual })) || []} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tick={{fontSize: 12}} /><YAxis tick={{fontSize: 12}} tickFormatter={(val) => `$${(val/1000)}k`} /><Tooltip cursor={{fill: 'rgba(241, 245, 249, 0.5)'}} contentStyle={{borderRadius: '8px', border: 'none'}} /><Bar dataKey="Budgeted" fill="#a5b4fc" radius={[4, 4, 0, 0]} /><Bar dataKey="Actual" fill="#4f46e5" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></div>
              <div><h3 className="text-lg font-bold text-slate-900 mb-4">Milestone Status</h3><div className="space-y-3">{selectedProject.milestones?.map(m => (<div key={m.id} className="p-3 bg-slate-50/80 border rounded-lg flex justify-between items-center"><div className="font-semibold text-sm text-slate-800">{m.name}</div><div className="flex items-center gap-4"><span className="text-xs text-slate-500">Due: {m.dueDate}</span><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(m.status)}`}>{m.status}</span></div></div>))}</div></div>
            </>)}

            {activeTab === 'schedule' && (<div className="h-full flex flex-col"><h3 className="text-lg font-bold text-slate-900 mb-4">Project Schedule</h3><div className="flex-grow bg-slate-50 border-2 border-dashed rounded-lg flex items-center justify-center text-slate-500">Gantt Chart Placeholder - Full interactive timeline with dependencies would be rendered here.</div></div>)}

            {activeTab === 'cashflow' && (<div><h3 className="text-lg font-bold text-slate-900 mb-4">Cash Flow Forecast</h3><div className="h-80"><ResponsiveContainer width="100%" height="100%"><AreaChart data={[] /* Mock cash flow data here */ }><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Area type="monotone" dataKey="Projected" stroke="#8884d8" fill="#8884d8" /><Area type="monotone" dataKey="Actual" stroke="#82ca9d" fill="#82ca9d" /></AreaChart></ResponsiveContainer></div></div>)}
            
            {activeTab === 'funding' && (<div><h3 className="text-lg font-bold text-slate-900 mb-4">Funding Sources & Disbursements</h3><div className="space-y-3">{FUND_TRANSACTIONS.filter(ft => ft.projectId === selectedProject.id).map(ft => { const fund = PPBE_FUNDS.find(f => f.id === ft.fundId); return(<div key={ft.id} className="p-3 bg-slate-50/80 border rounded-lg flex justify-between items-center"><div className="flex items-center gap-3"><Banknote size={20} className="text-green-600"/><div ><div className="font-semibold text-sm text-slate-800">{ft.type}: ${ft.amount.toLocaleString()}</div><p className="text-xs text-slate-500 mt-1">From {fund?.name} on {ft.date}</p></div></div></div>)})}</div></div>)}
            
            {activeTab === 'changeorders' && (<div><h3 className="text-lg font-bold text-slate-900 mb-4">Change Order Log</h3><div className="space-y-3">{selectedProject.changeOrders?.map(co => (<div key={co.id} className="p-3 bg-slate-50/80 border rounded-lg "><div className="flex justify-between items-start"><div className="font-semibold text-sm text-slate-800">{co.title}</div><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(co.status)}`}>{co.status}</span></div><div className="flex gap-6 mt-2 pt-2 border-t text-xs"><div className="flex items-center gap-1"><DollarSign size={12}/> Cost: <span className={co.costImpact > 0 ? 'text-red-600' : 'text-green-600'}>${co.costImpact.toLocaleString()}</span></div><div className="flex items-center gap-1"><Calendar size={12}/> Schedule: {co.scheduleImpactDays} days</div></div></div>))}</div></div>)}

            {activeTab === 'submittals' && (<div className="h-full flex flex-col"><h3 className="text-lg font-bold text-slate-900 mb-4">Submittals & RFIs</h3><div className="flex-grow bg-slate-50 border-2 border-dashed rounded-lg flex items-center justify-center text-slate-500">Document Log Placeholder</div></div>)}
          </div>
        </div>
      </div>
    </div>
  );
};