import React from 'react';
import { Trash2, Recycle, Truck, PieChart as PieChartIcon } from 'lucide-react';
import { SUSTAINABILITY_DATA } from '../services/mockData';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const KpiCard = ({ title, value, unit, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className={`mb-4 inline-block p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="text-slate-500 text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold text-slate-900 mt-1">{value} <span className="text-lg font-medium text-slate-400">{unit}</span></div>
    </div>
);

const COLORS = ['#16a34a', '#ef4444'];


export const WasteDashboard: React.FC = () => {

    const totalWaste = SUSTAINABILITY_DATA.reduce((acc, item) => acc + item.wasteKg, 0);
    const totalRecycling = SUSTAINABILITY_DATA.reduce((acc, item) => acc + item.recyclingKg, 0);
    const diversionRate = ((totalRecycling / (totalWaste + totalRecycling)) * 100).toFixed(1);
    
    const pieData = [
        { name: 'Recycled', value: totalRecycling },
        { name: 'Landfill', value: totalWaste },
    ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Waste Management</h1>
        <p className="text-slate-500 mt-1">Track waste streams, recycling rates, and landfill diversion.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Landfill Diversion Rate" value={diversionRate} unit="%" icon={Recycle} color="bg-green-500" />
        <KpiCard title="Total Waste (YTD)" value={(totalWaste/1000).toFixed(1)} unit="Tons" icon={Trash2} color="bg-red-500" />
        <KpiCard title="Waste Hauling Costs (YTD)" value="$12.3" unit="k" icon={Truck} color="bg-slate-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Waste & Recycling Volume (YTD)</h3>
            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SUSTAINABILITY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis label={{ value: 'kg', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }} />
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="wasteKg" name="Waste (kg)" stackId="a" fill="#ef4444" />
                <Bar dataKey="recyclingKg" name="Recycling (kg)" stackId="a" fill="#22c55e" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Total Waste Composition</h3>
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                             {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};
