import React from 'react';
import { FileText, Filter, Search, Plus, Download, Database, ShieldCheck, Terminal, LayoutDashboard, ArrowRight, ArrowUpRight, Activity, Info, Clock, Folder, Settings, MoreHorizontal } from 'lucide-react';
import { DOCUMENTS } from '../services/mockData';

export const DocumentCentral: React.FC = () => {

  const getIconForType = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText size={14} className="text-red-500" />;
      case 'CAD':
      case 'Blueprint':
        return <FileText size={14} className="text-blue-500" />;
      case 'Lease Agreement':
      case 'Contract':
        return <FileText size={14} className="text-emerald-500" />;
      case 'Invoice': return <FileText size={14} className="text-amber-500" />;
      default: return <FileText size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Precision Document Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Database size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Secure Document & Intelligence Vault</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Asset Documentation Repository</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Indexed Assets: {DOCUMENTS.length} Vectors</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search Vault by ID / Meta / Vector..." className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5">
                <Filter size={14} />
            </button>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Upload Vector
            </button>
        </div>
      </div>
      
      {/* High-Density Intelligence Repository */}
      <div className="pro-card overflow-hidden">
        <div className="pro-card-header bg-slate-50/50">
            <div className="flex items-center gap-2">
                <LayoutDashboard size={14} className="text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Encrypted Enterprise Archive</span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic tracking-tighter">Auth: VAULT-ADM-A1</span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-5 py-3 data-label">Document Vector</th>
                        <th className="px-5 py-3 data-label">Taxonomy</th>
                        <th className="px-5 py-3 data-label">Logical Relation</th>
                        <th className="px-5 py-3 data-label">Upload Timestamp</th>
                        <th className="px-5 py-3 data-label">Allocated Size</th>
                        <th className="px-5 py-3 data-label text-right">Audit</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 italic font-mono">
                    {DOCUMENTS.map(doc => (
                        <tr key={doc.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                            <td className="px-5 py-4 min-w-[200px]">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-white border border-slate-100 rounded-sm shadow-sm group-hover:border-blue-300 transition-colors">
                                        {getIconForType(doc.type)}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[12px] font-bold text-slate-900 not-italic uppercase tracking-tight truncate">{doc.name}</span>
                                        <span className="text-[9px] text-slate-400 uppercase tracking-tighter not-italic font-mono">#{doc.id}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-4">
                                <span className="text-[10px] font-bold text-slate-500 not-italic uppercase tracking-widest border border-slate-100 px-1.5 py-0.5 rounded-sm bg-slate-50">
                                    {doc.type}
                                </span>
                            </td>
                            <td className="px-5 py-4">
                                <span className="text-[11px] font-bold text-blue-600 not-italic uppercase tracking-tight italic">
                                    {doc.relatedTo}
                                </span>
                            </td>
                            <td className="px-5 py-4">
                                <span className="text-[10px] font-bold not-italic font-mono text-slate-600">
                                    {doc.uploadedDate}
                                </span>
                            </td>
                            <td className="px-5 py-4">
                                <span className="text-[10px] font-mono italic text-slate-400">
                                    {doc.size}
                                </span>
                            </td>
                            <td className="px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-3 text-slate-300">
                                    <button className="hover:text-blue-600 transition-colors"><Download size={14} /></button>
                                    <ArrowRight size={14} className="hover:text-blue-500 transition-colors" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 italic text-center">
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors flex items-center gap-2 mx-auto">
                <Activity size={10} className="text-blue-500" /> Commit Full Vault Audit <ArrowUpRight size={12} />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="pro-card p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 border border-emerald-100 rounded text-emerald-600">
                    <ShieldCheck size={16} />
                </div>
                <div>
                    <p className="data-label !mb-0">Vault Integrity</p>
                    <p className="text-[13px] font-black font-mono">100% SECURE</p>
                </div>
            </div>
            <Terminal size={14} className="text-slate-200" />
         </div>
         <div className="md:col-span-2 pro-card p-4 bg-slate-50 italic ">
             <div className="flex items-center gap-3">
                <Info size={14} className="text-blue-500 shrink-0" />
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em] leading-relaxed">
                    Automated redundancy protocols are active. All document uploads are subject to global encryption markers and vector indexing for portfolio-wide cross-linking.
                </p>
             </div>
         </div>
      </div>
    </div>
  );
};
