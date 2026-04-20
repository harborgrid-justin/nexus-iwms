import React from 'react';
import { Zap, Sun, DollarSign, Cloud, Activity, Terminal, Database, ArrowUpRight, ArrowRight, LayoutDashboard, Search, Filter, Plus, PieChart, Info, Settings, InfoIcon, ShieldCheck } from 'lucide-react';
import { SUSTAINABILITY_DATA } from '../services/mockData';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Legend } from 'recharts';

export const EnergyDashboard: React.FC = () => {

    const totalEnergy = SUSTAINABILITY_DATA.reduce((acc, item) => acc + item.energyKWh, 0);
    const totalCarbon = SUSTAINABILITY_DATA.reduce((acc, item) => acc + item.carbonTons, 0);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Energy Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Zap size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Resource Consumption & Grid Intelligence</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Energy Management & Lifecycle Analysis</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Indexed Nodes: GRID-B5-SECURE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="btn-pro-secondary flex items-center gap-2">
                <Database size={14} /> Consumption Logs
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Log Utility Record
            </button>
        </div>
      </div>
      
      {/* Tactical KPI Buffer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
            { label: 'Consumption (YTD)', value: (totalEnergy/1000).toFixed(1), unit: 'MWh', icon: Zap, color: 'text-blue-500' },
            { label: 'Fiscal Expenditure (YTD)', value: '$45.8', unit: 'K', icon: DollarSign, color: 'text-emerald-500' },
            { label: 'Carbon Intensity (YTD)', value: totalCarbon.toFixed(1), unit: 'T CO₂e', icon: Cloud, color: 'text-slate-400' },
            { label: 'Renewable Velocity', value: '15', unit: '%', icon: Sun, color: 'text-amber-500' }
         ].map((stat, i) => (
            <div key={i} className="pro-card p-5 group transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-400 group-hover:text-blue-500 transition-colors">
                        <stat.icon size={16} />
                    </div>
                    <ArrowUpRight size={12} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="data-label mb-1">{stat.label}</p>
                <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">
                    {stat.value}
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest ml-1 uppercase">{stat.unit}</span>
                </p>
            </div>
         ))}
      </div>

      {/* Grid Intelligence Matrix */}
      <div className="pro-card overflow-hidden">
        <div className="pro-card-header bg-slate-50/50">
            <div className="flex items-center gap-2">
                <LayoutDashboard size={14} className="text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Enterprise Consumption & Emission Flux</span>
            </div>
            <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-1 bg-blue-600" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">KWh</span>
                 </div>
                 <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                    <div className="w-2.5 h-1 bg-red-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CO₂e</span>
                 </div>
            </div>
        </div>
        <div className="h-[400px] p-6 pt-10">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={SUSTAINABILITY_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 700}}
                dy={10}
              />
              <YAxis 
                yAxisId="left" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 700}} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 700}} 
              />
              <Tooltip
                cursor={{fill: 'rgba(241, 245, 249, 0.5)'}}
                contentStyle={{backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '4px', fontSize: '10px'}}
              />
              <Bar yAxisId="left" dataKey="energyKWh" name="Energy" barSize={20} fill="#2563EB" radius={[2, 2, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="carbonTons" name="Carbon" stroke="#EF4444" strokeWidth={2} dot={{r: 3, fill: '#EF4444'}} activeDot={{r: 5}} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <div className="pro-card p-6">
                <div className="flex items-center gap-2 mb-8">
                    <Activity size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Peak Demand Analysis Cluster</span>
                </div>
                <div className="h-48 bg-slate-50 border border-slate-100 rounded border-dashed flex flex-col items-center justify-center text-slate-300 gap-3">
                    <Terminal size={24} className="opacity-20" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 italic">Initialize Spectral Demand Sweep</span>
                </div>
            </div>
             <div className="pro-card p-6">
                <div className="flex items-center gap-2 mb-8">
                    <Settings size={14} className="text-slate-400" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Energy Use Intensity (EUI) Benchmarking</span>
                </div>
                <div className="space-y-4">
                    {[
                        { label: 'Site EUI (Target)', value: '42.4', color: 'text-blue-600' },
                        { label: 'Source EUI (Actual)', value: '48.2', color: 'text-slate-900' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-sm border border-slate-100">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{item.label}</span>
                            <span className={`text-[12px] font-black font-mono italic ${item.color}`}>{item.value} KBTU/SF</span>
                        </div>
                    ))}
                </div>
            </div>
       </div>

       {/* Immutable Data Verification */}
       <div className="pro-card p-4 bg-slate-50 text-center border-slate-200">
           <button className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] hover:text-blue-600 transition-colors flex items-center gap-2 mx-auto italic">
              <ShieldCheck size={12} className="text-emerald-500" /> Commit Resource Integrity Sync <ArrowUpRight size={12} />
           </button>
       </div>
    </div>
  );
};
