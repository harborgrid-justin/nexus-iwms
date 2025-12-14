import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, Building, AlertTriangle, Zap, Wrench } from 'lucide-react';
import { SUSTAINABILITY_DATA, WORK_ORDERS, PROPERTIES, CAPITAL_PROJECTS, LEASES } from '../services/mockData';
import { Status } from '../types';
import { useNavigate, Link } from 'react-router-dom';

const KpiCard = ({ title, value, change, trend, icon: Icon, color, subtleText, link, filterState }: any) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if(link) navigate(link, { state: filterState });
  }
  return (
    <div onClick={handleNavigate} className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all ${link ? 'cursor-pointer' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {change && <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        </div>}
      </div>
      <div className="text-slate-500 text-sm font-medium">{title}</div>
      <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
      {subtleText && <div className="text-xs text-slate-400 mt-2">{subtleText}</div>}
    </div>
  )
};

export const Dashboard: React.FC = () => {
  const activeWorkOrders = WORK_ORDERS.filter(wo => wo.status !== 'Completed').length;
  const portfolioValue = PROPERTIES.reduce((acc, curr) => acc + curr.marketValue, 0) / 1000000;
  const projectsAtRisk = CAPITAL_PROJECTS.filter(p => p.status === Status.AtRisk).length;
  const expiringLease = LEASES.find(l => l.status === 'Expiring Soon');
  const overBudgetProject = CAPITAL_PROJECTS.find(p => p.spent > p.totalBudget);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executive Overview</h1>
          <p className="text-slate-500 mt-1">Real-time insights across your real estate portfolio.</p>
        </div>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
             Q4 2023
           </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KpiCard 
          title="Portfolio Value" 
          value={`$${portfolioValue.toFixed(0)}M`} 
          change="+2.4%" 
          trend="up" 
          icon={DollarSign} 
          color="bg-emerald-500"
          link="/real-estate"
        />
        <KpiCard 
          title="Avg. Occupancy" 
          value="82.5%" 
          change="-1.2%" 
          trend="down" 
          icon={Building} 
          color="bg-blue-500" 
          link="/space"
        />
        <KpiCard 
          title="Active Work Orders" 
          value={activeWorkOrders} 
          change="+5" 
          trend="up"
          icon={Wrench} 
          color="bg-amber-500" 
          link="/operations"
          filterState={{ status: ['Open', 'In Progress'] }}
        />
        <KpiCard 
          title="Energy Usage" 
          value="1.2 GWh" 
          change="-5.0%" 
          trend="down"
          icon={Zap} 
          color="bg-purple-500"
          subtleText="Year to Date"
          link="/sustainability"
        />
        <KpiCard 
          title="Projects At Risk" 
          value={projectsAtRisk} 
          icon={AlertTriangle} 
          color="bg-red-500"
          subtleText="vs. 0 last quarter"
          link="/projects"
          filterState={{ status: Status.AtRisk }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Utility Consumption Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SUSTAINABILITY_DATA}>
                <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="energyKWh" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorEnergy)" name="Energy (kWh)" />
                <Area type="monotone" dataKey="waterGal" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorWater)" name="Water (Gal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* List Widget */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Critical Alerts</h3>
          <div className="flex-1 overflow-y-auto space-y-4">
            {overBudgetProject && (
              <Link to="/projects" state={{ selectedId: overBudgetProject.id }} className="block p-3 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100">
                <div className="flex gap-4 items-start">
                  <AlertTriangle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-red-900">Project Over Budget</h4>
                    <p className="text-xs text-red-700 mt-1"><b>{overBudgetProject.name}</b> is currently ${ (overBudgetProject.spent - overBudgetProject.totalBudget).toLocaleString() } over budget.</p>
                    <span className="text-[10px] font-medium text-red-500 mt-2 block">Updated 2 hours ago</span>
                  </div>
                </div>
              </Link>
            )}
            <Link to="/operations" state={{ selectedId: 'WO-2024-889'}} className="block p-3 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100">
              <div className="flex gap-4 items-start">
                  <AlertTriangle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-red-900">HVAC Failure P001</h4>
                    <p className="text-xs text-red-700 mt-1">Temperature exceeded threshold in Server Room B. Ticket automatically created.</p>
                    <span className="text-[10px] font-medium text-red-500 mt-2 block">20 mins ago</span>
                  </div>
              </div>
            </Link>
            {expiringLease && (
              <Link to="/contracts" state={{ filter: 'Expiring Soon' }} className="block p-3 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100">
                 <div className="flex gap-4 items-start">
                    <AlertTriangle size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-900">Lease Expiry Warning</h4>
                      <p className="text-xs text-amber-700 mt-1">{expiringLease.tenantName} lease expires in 90 days.</p>
                    </div>
                  </div>
              </Link>
            )}
          </div>
          <button className="mt-4 w-full py-2 text-sm text-slate-600 font-medium hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors">
            View All Alerts
          </button>
        </div>
      </div>
    </div>
  );
};