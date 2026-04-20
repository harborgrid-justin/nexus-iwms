import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { PROPERTIES, WORK_ORDERS, VENDORS } from '../services/mockData';
import { BarChart3, Database, Activity, TrendingUp, Filter, Download, Terminal, Settings, ArrowUpRight, ShieldCheck, PieChart } from 'lucide-react';

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
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Intelligence Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <BarChart3 size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Operations Intelligence Bureau</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Business Intelligence & Analytics</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Protocol: BI-ALPHA-GRID</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button className="btn-pro-secondary flex items-center gap-2">
                <Download size={14} /> Audit Export
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Terminal size={14} /> Global Report
            </button>
        </div>
      </div>
      
      {/* Performance KPI Buffer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
            { label: 'Mean Close Velocity', value: '3.2 Days', trend: '-0.4d', icon: Activity, color: 'text-blue-500' },
            { label: 'Aggregate Maintenance (YTD)', value: '$1.2M', trend: 'STABLE', icon: Database, color: 'text-slate-900' },
            { label: 'Benchmark Occupancy (Peak)', value: '98%', sub: 'Property: P004', icon: TrendingUp, color: 'text-emerald-500' },
            { label: 'System Integrity Floor', value: '60%', sub: 'Asset: Generator', icon: ShieldCheck, color: 'text-red-500' }
         ].map((stat, i) => (
            <div key={i} className="pro-card p-5 group transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
                        <stat.icon size={16} />
                    </div>
                    {stat.trend && (
                        <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 uppercase">
                            {stat.trend}
                        </span>
                    )}
                </div>
                <p className="data-label mb-1">{stat.label}</p>
                <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{stat.value}</p>
                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{stat.sub || 'Portfolio Aggregate'}</span>
                    <ArrowUpRight size={12} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spatial Efficiency Matrix */}
        <div className="pro-card">
           <div className="pro-card-header bg-slate-50/50">
              <div className="flex items-center gap-2">
                  <PieChart size={14} className="text-blue-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Maintenance Load Distribution</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-2.5 h-1 bg-blue-600" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Cost / SF ($)</span>
              </div>
           </div>
           <div className="h-[380px] p-6 pt-10">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={costPerSqFtData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 700}}
                       dy={10}
                    />
                    <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 700}}
                    />
                    <Tooltip 
                       cursor={{fill: 'rgba(241, 245, 249, 0.5)'}}
                       contentStyle={{backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="Cost/SqFt" fill="#2563EB" radius={[2, 2, 0, 0]} barSize={24} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Tactical Scorecard */}
        <div className="pro-card">
           <div className="pro-card-header bg-slate-50/50">
              <div className="flex items-center gap-2">
                  <Settings size={14} className="text-slate-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Resource Performance Scorecard</span>
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">BUREAU ANALYTICS V.3</span>
           </div>
           <div className="h-[380px] p-6 flex flex-col items-center">
              <div className="flex-grow w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={vendorPerformanceData}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 8, fontWeight: 700}} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} axisLine={false} tick={false} />
                    <Radar name="Quality Rating" dataKey="A" stroke="#2563eb" strokeWidth={2} fill="#2563eb" fillOpacity={0.4}/>
                    <Radar name="On-Time Completion" dataKey="B" stroke="#0ea5e9" strokeWidth={2} fill="#0ea5e9" fillOpacity={0.4}/>
                    <Legend 
                        iconType="circle"
                        wrapperStyle={{fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', paddingTop: '20px'}} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
