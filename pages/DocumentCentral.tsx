import React from 'react';
import { FileText, Filter, Search, Plus, Download } from 'lucide-react';
import { DOCUMENTS } from '../services/mockData';

export const DocumentCentral: React.FC = () => {

  const getIconForType = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText className="text-red-500" />;
      case 'CAD':
      case 'Blueprint':
        return <FileText className="text-blue-500" />;
      case 'Lease Agreement':
      case 'Contract':
        return <FileText className="text-green-500" />;
      case 'Invoice': return <FileText className="text-purple-500" />;
      default: return <FileText className="text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Document Central</h1>
          <p className="text-slate-500 mt-1">A unified repository for all documents across your portfolio.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search documents..." className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Upload
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Related To</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Date Uploaded</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Size</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {DOCUMENTS.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        {getIconForType(doc.type)}
                        <span className="font-semibold text-slate-900">{doc.name}</span>
                    </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{doc.type}</td>
                <td className="px-6 py-4 text-slate-600 font-medium text-blue-700">{doc.relatedTo}</td>
                <td className="px-6 py-4 text-slate-600">{doc.uploadedDate}</td>
                <td className="px-6 py-4 text-slate-600 font-mono">{doc.size}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-slate-100">
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
