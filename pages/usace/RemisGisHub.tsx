import React, { useState } from 'react';
import { MapPinned, Search, Maximize, ArrowRightLeft, Trash2, Leaf, AlertTriangle } from 'lucide-react';
import { USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';

export const RemisGisHub: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState('program');
    
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-shrink-0">
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">REMIS Geospatial Hub</h1>
            <RegulatoryBadge refs={['18']} />
        </div>
        <p className="text-slate-500 mt-1">Visualize real property and task data with integrated GIS.</p>
      </div>

      <div className="flex-grow bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Map Placeholder */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{backgroundImage: "url('https://source.unsplash.com/random/1600x900/?satellite,map')"}}
        >
            <div className="absolute inset-0 bg-slate-800/20"></div>
            {/* Mock property pins */}
            {USACE_ASSETS.map((p, i) => (
                 <div key={p.id} title={p.name} className={`absolute w-3 h-3 ${p.program === 'Civil Works' ? 'bg-blue-400' : 'bg-green-400'} rounded-full ring-4 ring-white/50 animate-pulse`} style={{top: `${15 + i*15}%`, left: `${20 + i*12}%`}}></div>
            ))}
        </div>
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="bg-white p-3 rounded-lg shadow-md hover:bg-slate-100"><Maximize size={20} className="text-slate-700" /></button>
        </div>

        {/* Layer Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border p-2 flex gap-1">
            <button onClick={() => setActiveLayer('program')} className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium ${activeLayer === 'program' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}>Program</button>
            <button onClick={() => setActiveLayer('acquisitions')} className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium ${activeLayer === 'acquisitions' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}><ArrowRightLeft size={14}/> Acquisitions</button>
            <button onClick={() => setActiveLayer('disposals')} className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium ${activeLayer === 'disposals' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}><Trash2 size={14}/> Disposals</button>
            <button onClick={() => setActiveLayer('environmental')} className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium ${activeLayer === 'environmental' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}><Leaf size={14}/> Environmental</button>
            <button onClick={() => setActiveLayer('encroachments')} className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium ${activeLayer === 'encroachments' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100'}`}><AlertTriangle size={14}/> Encroachments</button>
        </div>

        {/* Info Panel */}
        <div className="absolute top-4 left-4 w-80 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 flex flex-col max-h-[calc(100%-2rem)]">
           <div className="p-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search by RPUID..." className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-white" />
            </div>
           </div>
           <div className="flex-grow overflow-y-auto">
                {USACE_ASSETS.map(p => (
                    <button key={p.id} className="w-full text-left p-3 flex items-center gap-3 hover:bg-slate-100 border-b last:border-0">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.program === 'Civil Works' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                        <div>
                            <p className="font-semibold text-sm text-slate-800">{p.name}</p>
                            <p className="text-xs text-slate-500 font-mono">{p.rpuid}</p>
                        </div>
                    </button>
                ))}
           </div>
        </div>
      </div>
    </div>
  );
};
