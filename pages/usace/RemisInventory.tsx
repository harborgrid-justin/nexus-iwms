import React, { useState, useEffect, useMemo } from 'react';
import { Building2, Plus, Filter, Search, CheckCircle, AlertCircle, Clock, X, ChevronsUpDown, Download, ArrowRight, MapPin, Terminal, Database, Activity, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { StatusBadge } from '../../components/StatusBadge';
import { SyncStatus } from '../../components/SyncStatus';
import { CreateAssetModal } from './components/CreateAssetModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { RealPropertyAsset } from '../../types';

export const RemisInventory: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [programFilter, setProgramFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  const filteredAssets = useMemo(() => {
    return USACE_ASSETS.filter(asset => {
      const matchesSearch = searchTerm === '' || 
        asset.rpuid.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProgram = programFilter === 'All' || asset.program === programFilter;
      const matchesStatus = statusFilter === 'All' || asset.status === statusFilter;

      return matchesSearch && matchesProgram && matchesStatus;
    });
  }, [searchTerm, programFilter, statusFilter]);

  useEffect(() => {
    if (location.state?.showCreateModal) {
      setIsCreateModalOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <CreateAssetModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      
      {/* Authoritative Inventory Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                <Database size={16} />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase px-1">USACE Real Property Registry</h1>
            <RegulatoryBadge refs={['1', '2', '15', '19']} />
          </div>
          <div className="flex items-center gap-3">
             <span className="data-label text-blue-600">Enterprise Asset Inventory Terminal</span>
             <div className="w-1 h-1 bg-slate-300 rounded-full" />
             <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Auth: RPUID-MASTER-004</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Scan RPUID / Name..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded text-[12px] font-medium outline-none focus:ring-1 focus:ring-blue-500" 
                />
            </div>
            <button className="btn-pro-primary flex items-center gap-2">
                <Plus size={14} /> Register Asset
            </button>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 p-1 bg-slate-50 border border-slate-100 rounded-sm">
        <select value={programFilter} onChange={e => setProgramFilter(e.target.value)} className="bg-transparent text-[11px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1 outline-none cursor-pointer hover:text-blue-600 transition-colors">
            <option value="All">Global Programs</option>
            <option value="Civil Works">Civil Works</option>
            <option value="Military">Military</option>
        </select>
        <div className="w-px h-4 bg-slate-200" />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-transparent text-[11px] font-bold text-slate-500 uppercase tracking-widest px-3 py-1 outline-none cursor-pointer hover:text-blue-600 transition-colors">
            <option value="All">Operational Status</option>
            <option value="Active">Active</option>
            <option value="In Progress">In Progress</option>
            <option value="Excess">Excess</option>
        </select>
        <div className="ml-auto flex items-center gap-2 px-2">
            <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                <Download size={14} /> Export CSV
            </button>
        </div>
      </div>
      
      {/* Registry Table */}
      <div className="pro-card overflow-hidden">
        <div className="overflow-x-auto italic font-mono">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0A0A0B] text-white border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 data-label text-slate-400 font-black">RPUID NODE</th>
                <th className="px-6 py-4 data-label text-slate-400 font-black">ASSET NOMENCLATURE</th>
                <th className="px-6 py-4 data-label text-slate-400 font-black">PROGRAM</th>
                <th className="px-6 py-4 data-label text-slate-400 font-black">CLASSIFICATION</th>
                <th className="px-6 py-4 data-label text-slate-400 font-black">VERIFICATION</th>
                <th className="px-6 py-4 data-label text-slate-400 font-black text-center">SYNCHRONIZATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.map(asset => (
                <tr key={asset.id} onClick={() => navigate(`/usace/inventory/${asset.id}`)} className="hover:bg-slate-50 cursor-pointer transition-all group">
                  <td className="px-6 py-5 font-bold text-blue-600 group-hover:bg-blue-50/30 transition-colors uppercase pr-10">{asset.rpuid}</td>
                  <td className="px-6 py-5 not-italic">
                    <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{asset.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-1 uppercase tracking-tighter italic"><MapPin size={10} className="text-blue-500"/> {asset.location}</div>
                  </td>
                  <td className="px-6 py-5 text-slate-600 font-bold text-xs uppercase tracking-widest">{asset.program}</td>
                  <td className="px-6 py-5 text-slate-600 font-bold text-xs uppercase tracking-widest">{asset.type}</td>
                  <td className="px-6 py-5 not-italic">
                    <StatusBadge status={asset.status} />
                  </td>
                  <td className="px-6 py-5 text-center not-italic bg-slate-50/30 group-hover:bg-transparent transition-colors">
                      <div className="flex justify-center">
                          <SyncStatus status={asset.cefmsSyncStatus} showLabel={true} />
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 italic text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aggregate inventory coherence established: {filteredAssets.length} Nodes</span>
        </div>
      </div>
    </div>
  );
};
