import React, { useState } from 'react';
import { USERS, AUDIT_LOGS, WORKFLOWS } from '../services/mockData';
import { User, ShieldCheck, Clock, Plus, Share2, ToggleRight, Trash2, Zap } from 'lucide-react';

const getRoleColor = (role: string) => {
  switch(role) {
    case 'Admin': return 'bg-red-100 text-red-800';
    case 'Project Manager':
    case 'Facility Manager': 
      return 'bg-blue-100 text-blue-800';
    case 'Technician': return 'bg-amber-100 text-amber-800';
    case 'Financial Analyst': return 'bg-green-100 text-green-800';
    default: return 'bg-slate-100 text-slate-800';
  }
}

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Administration</h1>
        <p className="text-slate-500 mt-1">Manage users, roles, permissions, and system automations.</p>
      </div>
      
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex gap-6" aria-label="Tabs">
          <button onClick={() => setActiveTab('users')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Users & Roles</button>
          <button onClick={() => setActiveTab('workflows')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'workflows' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Workflow Automation</button>
          <button onClick={() => setActiveTab('audit')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'audit' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Audit Log</button>
        </nav>
      </div>

      {activeTab === 'users' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm self-start">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-bold text-slate-900">User Management</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                <Plus size={16} /> Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-700">Name</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Role</th>
                    <th className="px-6 py-4 font-semibold text-slate-700">Last Login</th>
                    <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {USERS.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4"><div className="font-semibold text-slate-900">{user.name}</div><div className="text-slate-500">{user.email}</div></td>
                      <td className="px-6 py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>{user.role}</span></td>
                      <td className="px-6 py-4 text-slate-600">{user.lastLogin}</td>
                      <td className="px-6 py-4 text-right"><button className="font-medium text-blue-600 hover:text-blue-800">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm self-start">
            <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">Role Permissions</h2></div>
            <div className="p-4 space-y-4 divide-y">
              <div className="pt-2"><h3 className="font-semibold text-slate-800">Admin</h3><p className="text-xs text-slate-500">Full system access. Can manage users and settings.</p></div>
              <div className="pt-2"><h3 className="font-semibold text-slate-800">Project Manager</h3><p className="text-xs text-slate-500">Full access to assigned projects. Read-only on finances.</p></div>
              <div className="pt-2"><h3 className="font-semibold text-slate-800">Technician</h3><p className="text-xs text-slate-500">Can view and update assigned work orders.</p></div>
              <div className="pt-2"><h3 className="font-semibold text-slate-800">Financial Analyst</h3><p className="text-xs text-slate-500">Full access to Finance module. Read-only on all other modules.</p></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'workflows' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900">Workflow Automation</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
              <Plus size={16} /> New Workflow
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WORKFLOWS.map(wf => (
              <div key={wf.id} className="bg-white border rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-800 text-lg">{wf.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${wf.enabled ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>{wf.enabled ? 'Active' : 'Disabled'}</span>
                    <button className="text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xs font-semibold text-slate-500 mb-1">WHEN (Trigger)</div>
                    <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <Zap size={16} className="text-amber-500"/>
                      <span>{wf.trigger}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xs font-semibold text-slate-500 mb-1">DO (Actions)</div>
                    <div className="space-y-2">
                    {wf.actions.map((action, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <Share2 size={16} className="text-blue-500"/>
                        <span>{action}</span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">System Audit Log</h2></div>
          <div className="overflow-y-auto max-h-[70vh]">
            <ul className="divide-y divide-slate-100">{AUDIT_LOGS.map(log => (<li key={log.id} className="p-4 flex items-center gap-4 hover:bg-slate-50/50"><div className="p-2 bg-slate-100 rounded-full"><User size={16} className="text-slate-500" /></div><div><p className="text-sm text-slate-800"><span className="font-semibold">{log.user}</span> {log.action} on <span className="font-medium text-blue-600">{log.entity}</span>.</p><p className="text-xs text-slate-400 mt-1">{log.timestamp}</p></div></li>))}</ul>
          </div>
        </div>
      )}
    </div>
  );
};