import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { PROPERTIES, WORK_ORDERS, VENDORS } from '../services/mockData';

const KpiCard = ({ title, value }: {title: string, value: string}) => (
  <div className="bg-white p-6 rounded-xl border shadow-sm">
    <div className="text-sm text-slate-500">{title}</div>
    <div className="text-3xl font-bold text-slate-900 mt-2">{value}</div>
  </div>
);

export const Analytics: React.FC = () => {
  
  const costPerSqFtData = PROPERTIES.map(p => ({
    name: p.id,
    'Cost/SqFt': (WORK_ORDERS.filter(wo => wo.propertyId === p.id).reduce((acc, wo) => acc + wo.cost, 0) / p.sizeSqFt).toFixed(2)
  }));

  const vendorPerformanceData = VENDORS.map(v => ({
    subject: v.name,
    A: v.rating * 20, // Scale rating to 0-100
    B: v.onTimeCompletionRate,
    fullMark: 100,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics & Business Intelligence</h1>
        <p className="text-slate-500 mt-1">Customizable dashboards for deep insights across all modules.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard title="Avg. Time to Close WO" value="3.2 Days" />
        <KpiCard title="Total Maintenance Cost (YTD)" value="$1.2M" />
        <KpiCard title="Highest Occupancy Property" value="P004 (98%)" />
        <KpiCard title="Lowest Asset Condition" value="Generator (60%)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Maintenance Cost per Square Foot by Property</h3>
          <div className="h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={costPerSqFtData}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="name" tick={{fontSize: 12}} /><YAxis tick={{fontSize: 12}} tickFormatter={(val) => `$${val}`} /><Tooltip formatter={(val) => `$${val}`} /><Bar dataKey="Cost/SqFt" fill="#4f46e5" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Vendor Performance Scorecard</h3>
          <div className="h-80"><ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={vendorPerformanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{fontSize: 10}}/>
              <PolarRadiusAxis angle={30} domain={[0, 100]}/>
              <Radar name="Quality Rating" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
              <Radar name="On-Time %" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>
              <Legend />
            </RadarChart>
          </ResponsiveContainer></div>
        </div>
      </div>
    </div>
  );
};
