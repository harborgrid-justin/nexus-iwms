import React, { useState } from 'react';
import { Layers, Building, Search, Maximize } from 'lucide-react';
import { PROPERTIES } from '../services/mockData';
import { Status } from '../types';

export const GisMap: React.FC = () => {
    const [selectedProperty, setSelectedProperty] = useState(PROPERTIES[0]);

    const getStatusColor = (status: Status) => {
        switch (status) {
            case Status.Good: return 'bg-green-500';
            case Status.Warning: return 'bg-amber-500';
            case Status.Critical: return 'bg-red-500';
            default: return 'bg-slate-500';
        }
    };
    
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-900">GIS Portfolio Map</h1>
        <p className="text-slate-500 mt-1">Visualize your entire real estate portfolio with geospatial data.</p>
      </div>

      <div className="flex-grow bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Map Placeholder */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{backgroundImage: "url('https://source.unsplash.com/random/1600x900/?map,city')"}}
        >
            <div className="absolute inset-0 bg-slate-800/20"></div>
            {/* Mock property pins */}
            <div title="P001" className="absolute top-[25%] left-[30%] w-3 h-3 bg-green-500 rounded-full ring-4 ring-white/50 animate-pulse"></div>
            <div title="P002" className="absolute top-[50%] left-[50%] w-3 h-3 bg-green-500 rounded-full ring-4 ring-white/50"></div>
            <div title="P003" className="absolute top-[40%] left-[70%] w-3 h-3 bg-amber-500 rounded-full ring-4 ring-white/50"></div>
            <div title="P004" className="absolute top-[65%] left-[20%] w-3 h-3 bg-green-500 rounded-full ring-4 ring-white/50"></div>
            <div title="P005" className="absolute top-[70%] left-[80%] w-3 h-3 bg-red-500 rounded-full ring-4 ring-white/50 animate-pulse"></div>
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="bg-white p-3 rounded-lg shadow-md hover:bg-slate-100"><Layers size={20} className="text-slate-700" /></button>
            <button className="bg-white p-3 rounded-lg shadow-md hover:bg-slate-100"><Building size={20} className="text-slate-700" /></button>
            <button className="bg-white p-3 rounded-lg shadow-md hover:bg-slate-100"><Maximize size={20} className="text-slate-700" /></button>
        </div>

        {/* Info Panel */}
        <div className="absolute top-4 left-4 w-80 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 flex flex-col max-h-[calc(100%-2rem)]">
           <div className="p-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search properties..." className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-white" />
            </div>
           </div>
           <div className="flex-grow overflow-y-auto">
                {PROPERTIES.map(p => (
                    <button key={p.id} className="w-full text-left p-3 flex items-center gap-3 hover:bg-slate-100 border-b last:border-0">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getStatusColor(p.status)}`}></div>
                        <div>
                            <p className="font-semibold text-sm text-slate-800">{p.name}</p>
                            <p className="text-xs text-slate-500">{p.address}</p>
                        </div>
                    </button>
                ))}
           </div>
        </div>
      </div>
    </div>
  );
};
