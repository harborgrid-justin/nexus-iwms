import React from 'react';
import { Zap, Sun, DollarSign, Cloud, BarChart, LineChart } from 'lucide-react';
import { SUSTAINABILITY_DATA } from '../services/mockData';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Legend } from 'recharts';

const KpiCard = ({ title, value, unit, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className={`mb-4 inline-block p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="text-slate-500 text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold text-slate-900 mt-1">{value} <span className="text-lg font-medium text-slate-400">{unit}</span></div>
    </div>
);

export const EnergyDashboard: React.FC = () => {

    const latestMonth = SUSTAINABILITY_DATA[SUSTAINABILITY_DATA.length - 1];
    const totalEnergy = SUSTAINABILITY_DATA.reduce((acc, item) => acc + item.energyKWh, 0);
    const totalCarbon = SUSTAINABILITY_DATA.reduce((acc, item) => acc + item.carbonTons, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Energy Management</h1>
        <p className="text-slate-500 mt-1">Analyze energy consumption, costs, and carbon footprint.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Consumption (YTD)" value={(totalEnergy/1000).toFixed(1)} unit="MWh" icon={Zap} color="bg-blue-500" />
        <KpiCard title="Est. Cost (YTD)" value="$45.8" unit="k" icon={DollarSign} color="bg-green-500" />
        <KpiCard title="Carbon Footprint (YTD)" value={totalCarbon.toFixed(1)} unit="Tons CO₂e" icon={Cloud} color="bg-slate-500" />
        <KpiCard title="Renewable Mix" value="15" unit="%" icon={Sun} color="bg-amber-500" />
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Energy Consumption & Carbon Emissions (YTD)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={SUSTAINABILITY_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Tons CO₂e', angle: -90, position: 'insideRight' }} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="energyKWh" name="Energy (kWh)" barSize={20} fill="#4f46e5" />
              <Line yAxisId="right" type="monotone" dataKey="carbonTons" name="Carbon (Tons)" stroke="#ef4444" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Peak Demand Analysis</h3>
                <p className="text-sm text-center text-slate-400">(Placeholder for peak demand chart)</p>
            </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Energy Use Intensity (EUI)</h3>
                <p className="text-sm text-center text-slate-400">(Placeholder for EUI benchmark chart)</p>
            </div>
       </div>

    </div>
  );
};
