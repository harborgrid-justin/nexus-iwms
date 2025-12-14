import React from 'react';
import { WORK_ORDERS } from '../services/mockData';
import { AlertCircle, CheckCircle2, Clock, MoreHorizontal, Settings, Wrench, HardHat, Handshake, Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HubCard = ({ title, value, link, icon: Icon, color }: any) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
        <button onClick={() => navigate(link)} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-full">
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-sm font-medium text-slate-500">{title}</div>
      </div>
    </div>
  );
};

export const Operations: React.FC = () => {

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Operations Work Hub</h1>
        <p className="text-slate-500 mt-1">Manage maintenance, assets, inventory, and safety compliance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HubCard title="Active Work Orders" value={WORK_ORDERS.filter(wo => wo.status !== 'Completed').length} link="/operations" icon={Wrench} color="bg-amber-500" />
        <HubCard title="Critical Assets" value="3" link="/assets" icon={HardHat} color="bg-red-500" />
        <HubCard title="Managed Vendors" value="4" link="/vendors" icon={Handshake} color="bg-blue-500" />
        <HubCard title="Items to Reorder" value="1" link="/operations" icon={Package} color="bg-purple-500" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Priority Work Queue</h2>
        <div className="space-y-4">
            {WORK_ORDERS.sort((a,b) => (a.priority === 'Emergency' ? -1 : 1)).map(wo => (
              <div key={wo.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-blue-400 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-full ${ wo.priority === 'Emergency' ? 'bg-red-100 text-red-600' : wo.priority === 'High' ? 'bg-amber-100 text-amber-600' : wo.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600' }`}>
                     {wo.status === 'Completed' ? <CheckCircle2 size={20} /> : <Wrench size={20} />}
                   </div>
                   <div>
                     <div className="flex items-center gap-2"><h3 className="font-semibold text-slate-900">{wo.title}</h3><span className="text-xs text-slate-400">#{wo.id}</span></div>
                     <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                       <span className="flex items-center gap-1"><Settings size={14} /> {wo.category}</span>
                       <span className="flex items-center gap-1"><Clock size={14} /> Due {wo.dueDate}</span>
                       <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${ wo.priority === 'Emergency' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700' }`}>{wo.priority}</span>
                     </div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block"><div className="text-xs text-slate-400 uppercase">Assigned To</div><div className="text-sm font-medium text-slate-700">{wo.assignedTo}</div></div>
                  <button className="text-slate-400 hover:text-slate-600 p-2"><MoreHorizontal size={20} /></button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
