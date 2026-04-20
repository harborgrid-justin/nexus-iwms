import React, { useState, useEffect, useMemo } from 'react';
import { Building2, Plus, Filter, Search, CheckCircle, AlertCircle, Clock, X, ChevronsUpDown, Download, ArrowRight, MapPin } from 'lucide-react';
import { USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { useNavigate, useLocation } from 'react-router-dom';
import { RealPropertyAsset } from '../../types';

const CreateAssetModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('New asset record created (simulation).');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-t-2xl md:rounded-xl shadow-2xl w-full max-w-2xl h-[90vh] md:h-auto md:max-h-[90vh] flex flex-col transform transition-transform" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b shrink-0">
          <h2 className="text-lg font-bold text-slate-900">Create New Asset Record</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-500"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 pb-24 md:pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700 mb-1">RPUID</label><input type="text" defaultValue={`USACE-CW-NEW-${Math.floor(Math.random() * 1000)}`} className="block w-full px-3 py-3 md:py-2.5 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base" required /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Asset Name</label><input type="text" placeholder="e.g., New Operations Building" className="block w-full px-3 py-3 md:py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base" required /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Program</label><select className="block w-full px-3 py-3 md:py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"><option>Civil Works</option><option>Military</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Asset Type</label><select className="block w-full px-3 py-3 md:py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"><option>Building</option><option>Structure</option><option>Land</option><option>Linear Structure</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Status</label><select className="block w-full px-3 py-3 md:py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base" defaultValue="In Progress"><option>In Progress</option><option>Active</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Acquisition Date</label><input type="date" className="block w-full px-3 py-3 md:py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base" required /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Cost</label><input type="number" placeholder="25000000" className="block w-full px-3 py-3 md:py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base" required /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-1">Area</label><input type="number" placeholder="120000" className="block w-full px-3 py-3 md:py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base" /></div>
          </div>
        </form>
        <div className="p-4 bg-white border-t flex gap-3 shrink-0 pb-safe fixed bottom-0 w-full md:relative md:w-auto md:bg-slate-50 md:rounded-b-xl z-10">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 active:bg-slate-100">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 active:bg-blue-800 shadow-sm">Create Asset</button>
        </div>
      </div>
    </div>
  );
};

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

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Excess': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Disposed': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getSyncIcon = (status: 'Synced' | 'Pending' | 'Error') => {
    switch(status) {
        case 'Synced': return <div className="flex items-center gap-1.5 text-green-700 text-xs font-medium"><CheckCircle size={14} /> Synced</div>;
        case 'Pending': return <div className="flex items-center gap-1.5 text-amber-700 text-xs font-medium"><Clock size={14} /> Pending</div>;
        case 'Error': return <div className="flex items-center gap-1.5 text-red-700 text-xs font-medium"><AlertCircle size={14} /> Error</div>;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 pb-20 md:pb-0 relative">
      <CreateAssetModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Real Property Inventory</h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Authoritative system of record for all USACE real property assets.</p>
        </div>
        <div className="hidden md:block">
           <RegulatoryBadge refs={['1', '2', '15', '19']} />
        </div>
      </div>

      {/* Sticky Filters Mobile */}
      <div className="sticky top-0 z-20 bg-slate-50 pt-2 pb-2 md:static md:bg-transparent md:pt-0 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 border-b md:border-0 border-slate-200 shadow-sm md:shadow-none">
        <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Search RPUID, Name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 md:py-2 border border-slate-300 md:border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-base md:text-sm shadow-sm"/>
            </div>
            {/* Scrollable Filters on Mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar md:pb-0">
                <select value={programFilter} onChange={e => setProgramFilter(e.target.value)} className="w-auto px-3 py-2 border border-slate-300 md:border-slate-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none flex-shrink-0">
                    <option value="All">All Programs</option><option value="Civil Works">Civil Works</option><option value="Military">Military</option>
                </select>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-auto px-3 py-2 border border-slate-300 md:border-slate-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none flex-shrink-0">
                    <option value="All">All Statuses</option><option value="Active">Active</option><option value="In Progress">In Progress</option><option value="Excess">Excess</option><option value="Disposed">Disposed</option>
                </select>
                <button onClick={() => alert('Exporting data...')} className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-300 md:border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm shrink-0 whitespace-nowrap">
                    <Download size={16} /> Export
                </button>
                <button onClick={() => setIsCreateModalOpen(true)} className="hidden md:flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm shrink-0">
                    <Plus size={16} /> New Asset
                </button>
            </div>
        </div>
      </div>
      
      {/* List / Table Container */}
      <div className="bg-transparent md:bg-white md:rounded-xl md:border md:border-slate-200 md:shadow-sm md:overflow-hidden">
        
        {/* Desktop Table (Hidden on Mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700"><div className="flex items-center gap-1">RPUID <ChevronsUpDown size={14}/></div></th>
                <th className="px-6 py-4 font-semibold text-slate-700">Asset Name</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Program</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-center">CEFMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.map(asset => (
                <tr key={asset.id} onClick={() => navigate(`/usace/inventory/${asset.id}`)} className="hover:bg-slate-50/50 cursor-pointer transition-colors group">
                  <td className="px-6 py-4 font-mono text-blue-600 font-medium group-hover:text-blue-700">{asset.rpuid}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{asset.name}</div>
                    <div className="text-xs text-slate-500">{asset.location}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{asset.program}</td>
                  <td className="px-6 py-4 text-slate-600">{asset.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">{getSyncIcon(asset.cefmsSyncStatus)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (Visible only on Mobile) */}
        <div className="md:hidden space-y-3">
          {filteredAssets.map(asset => (
            <div key={asset.id} onClick={() => navigate(`/usace/inventory/${asset.id}`)} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm active:scale-[0.99] transition-transform">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-2">
                  <div className="text-xs font-mono text-blue-600 font-semibold mb-0.5">{asset.rpuid}</div>
                  <h3 className="font-bold text-slate-900 text-base leading-tight">{asset.name}</h3>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border ${getStatusColor(asset.status)}`}>
                  {asset.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm border-t border-slate-100 pt-3">
                <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                    <div>
                        <div className="text-xs text-slate-500 font-medium">Location</div>
                        <div className="text-slate-700 line-clamp-1">{asset.location}</div>
                    </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Program</div>
                  <div className="text-slate-700">{asset.program}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Type</div>
                  <div className="text-slate-700">{asset.type}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Sync Status</div>
                  <div className="mt-0.5">{getSyncIcon(asset.cefmsSyncStatus)}</div>
                </div>
              </div>
            </div>
          ))}
          {filteredAssets.length === 0 && (
              <div className="text-center py-10">
                  <p className="text-slate-500">No assets found matching your search.</p>
              </div>
          )}
        </div>
      </div>

      {/* Mobile Floating Action Button (FAB) */}
      <button 
        onClick={() => setIsCreateModalOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-transform z-40"
        aria-label="Add New Asset"
      >
        <Plus size={28} />
      </button>
    </div>
  );
};