import React from 'react';
import { SUSTAINABILITY_DATA, SUSTAINABILITY_INITIATIVES } from '../services/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Leaf, Droplet, Zap, Trash2, CheckCircle, Clock } from 'lucide-react';

const MetricCard = ({ icon: Icon, title, value, unit, color }: any) => (
  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-full ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-xl font-bold text-slate-900">{value} <span className="text-sm font-normal text-slate-400">{unit}</span></div>
    </div>
  </div>
);

export const Sustainability: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Sustainability Dashboard</h1>
        <p className="text-slate-500 mt-1">Track and manage your portfolio's environmental impact.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={Zap} title="Energy Use (Jun)" value="58,000" unit="kWh" color="bg-blue-500" />
        <MetricCard icon={Droplet} title="Water Use (Jun)" value="15,500" unit="Gal" color="bg-cyan-500" />
        <MetricCard icon={Leaf} title="Carbon Footprint (Jun)" value="16.5" unit="Tons CO₂e" color="bg-slate-500" />
        <MetricCard icon={Trash2} title="Waste Generated (Jun)" value="600" unit="kg" color="bg-amber-500" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Portfolio Consumption Trends (YTD)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={SUSTAINABILITY_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{fontSize: 12}} />
              <YAxis yAxisId="left" tick={{fontSize: 12}} />
              <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12}} />
              <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Line yAxisId="left" type="monotone" dataKey="energyKWh" stroke="#3b82f6" strokeWidth={2} name="Energy (kWh)" />
              <Line yAxisId="left" type="monotone" dataKey="waterGal" stroke="#06b6d4" strokeWidth={2} name="Water (Gal)" />
              <Line yAxisId="right" type="monotone" dataKey="carbonTons" stroke="#64748b" strokeWidth={2} name="Carbon (Tons)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Active Initiatives</h3>
        <div className="space-y-4">
          {SUSTAINABILITY_INITIATIVES.map(item => (
            <div key={item.id} className="p-4 border border-slate-100 rounded-lg flex items-center justify-between">
              <div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  item.type === 'Energy' ? 'bg-blue-100 text-blue-800' :
                  item.type === 'Water' ? 'bg-cyan-100 text-cyan-800' :
                  'bg-amber-100 text-amber-800'
                }`}>{item.type}</span>
                <h4 className="font-semibold text-slate-900 mt-2">{item.name}</h4>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm">
                  {item.status === 'Completed' ? <CheckCircle className="text-green-500" size={16}/> : <Clock className="text-slate-500" size={16}/>}
                  {item.status}
                </div>
                <div className="text-xs text-slate-500 mt-1">Est. Savings: {item.projectedSavings}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
