import React, { useState } from 'react';
import { Maximize, ZoomIn, ZoomOut, Layers, Download } from 'lucide-react';
import { DOCUMENTS } from '../services/mockData';

export const CadViewer: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState(DOCUMENTS.find(d => d.type === 'CAD'));

  const cadDocs = DOCUMENTS.filter(d => d.type === 'CAD' || d.type === 'Blueprint');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">CAD & BIM Viewer</h1>
        <p className="text-slate-500 mt-1">View, annotate, and manage architectural drawings and models.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        {/* Document List */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 font-bold text-slate-900 border-b">Floor Plans & Blueprints</div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {cadDocs.map(doc => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`w-full text-left p-3 hover:bg-slate-50 ${selectedDoc?.id === doc.id ? 'bg-blue-50' : ''}`}
              >
                <p className="font-semibold text-sm text-slate-800 truncate">{doc.name}</p>
                <p className="text-xs text-slate-500">{doc.relatedTo}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Viewer */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-3 border-b flex justify-between items-center bg-slate-50">
            <h2 className="font-semibold text-slate-800">{selectedDoc?.name}</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:bg-slate-200 rounded"><Layers size={16} /></button>
              <button className="p-2 text-slate-500 hover:bg-slate-200 rounded"><ZoomIn size={16} /></button>
              <button className="p-2 text-slate-500 hover:bg-slate-200 rounded"><ZoomOut size={16} /></button>
              <button className="p-2 text-slate-500 hover:bg-slate-200 rounded"><Download size={16} /></button>
              <button className="p-2 text-slate-500 hover:bg-slate-200 rounded"><Maximize size={16} /></button>
            </div>
          </div>
          <div className="flex-1 bg-slate-100 p-4 flex items-center justify-center overflow-hidden">
            <div className="bg-white shadow-lg w-full h-full border-2 border-slate-300">
              {/* Placeholder for actual CAD viewer */}
              <svg viewBox="0 0 800 600" className="w-full h-full">
                <rect width="800" height="600" fill="#f8fafc" />
                <rect x="100" y="100" width="600" height="400" fill="white" stroke="#94a3b8" strokeWidth="2" />
                <line x1="400" y1="100" x2="400" y2="500" stroke="#cbd5e1" strokeWidth="2" />
                <line x1="100" y1="300" x2="700" y2="300" stroke="#cbd5e1" strokeWidth="2" />
                <rect x="120" y="120" width="80" height="80" fill="#dbeafe" stroke="#60a5fa" rx="4" />
                <text x="160" y="165" textAnchor="middle" className="fill-blue-800 text-xs font-sans">Conference</text>
                <rect x="220" y="120" width="160" height="160" fill="#e0e7ff" stroke="#818cf8" rx="4" />
                <text x="300" y="205" textAnchor="middle" className="fill-indigo-800 text-xs font-sans">Open Office Area</text>
                <text x="400" y="50" textAnchor="middle" className="fill-slate-500 font-semibold">Conceptual Floor Plan - For Demonstration Only</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
