
import React, { useState, useEffect, useMemo } from 'react';
import { Building2, Plus, Filter, Search, CheckCircle, AlertCircle, Clock, X, ChevronsUpDown, Download, Lock } from 'lucide-react';
import { USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { useNavigate, useLocation } from 'react-router-dom';
import { RealPropertyAsset } from '../../types';

const CreateAssetModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  // Req 19.1.1: Auto-generate RPUID
  const generatedRpuid = `USACE-CW-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to create asset would go here. A new AuditEvent would be added to its history.
    alert(`New asset record created with RPUID: ${generatedRpuid}. Audit log updated (Req 19.8.1).`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold text-slate-900">Create New Asset Record</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
             <label className="block text-sm font-bold text-blue-900 flex items-center gap-2">
                RPUID (Auto-Generated) <Lock size={12}/>
             </label>
             <input type="text" value={generatedRpuid} readOnly className="mt-1 block w-full px-3 py-2 bg-white text-slate-500 border border-blue-200 rounded-md shadow-sm font-mono cursor-not-allowed" />
             <p className="text-xs text-blue-700 mt-1">Unique real property identifier assigned per DoDI 4165.14. Cannot be modified manually (Req 19.1.5).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-700">Asset Name</label><input type="text" placeholder="e.g., New Operations Building" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required /></div>
            <div><label className="block text-sm font-medium text-slate-700">Program</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm"><option>Civil Works</option><option>Military</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700">Asset Type</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm"><option>Building</option><option>Structure</option><option>Land</option><option>Linear Structure</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700">Status</label><select className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" defaultValue="In Progress"><option>In Progress</option><option>Active</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700">Acquisition Date</label><input type="date" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required /></div>
            <div><label className="block text-sm font-medium text-slate-700">Cost</label><input type="number" placeholder="25000000" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required /></div>
            <div><label className="block text-sm font-medium text-slate-700">Area</label><input type="number" placeholder="120000" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" /></div>
          </div>
        </form>
        <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">Create Asset</button>
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
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Excess': return 'bg-amber-100 text-amber-800';
      case 'Disposed': return 'bg-slate-100 text-slate-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getSyncIcon = (status: 'Synced' | 'Pending' | 'Error') => {
    switch(status) {
        case 'Synced': return <CheckCircle size={16} className="text-green-500" title="Synced with CEFMS"/>;
        case 'Pending': return <Clock size={16} className="text-amber-500" title="Pending Sync"/>;
        case 'Error': return <AlertCircle size={16} className="text-red-500" title="Sync Error"/>;
    }
  };

  return (
    <div className="space-y-6">
      <CreateAssetModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Real Property Inventory</h1>
          <p className="text-slate-500 mt-1">Authoritative system of record for all USACE real property assets.</p>
        </div>
        <RegulatoryBadge refs={['1', '2', '15', '19']} />
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Search by RPUID, Name, Location..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white"/>
        </div>
        <div className="flex gap-3">
          <select value={programFilter} onChange={e => setProgramFilter(e.target.value)} className="w-full md:w-auto px-4 py-2 border rounded-lg bg-white text-sm">
            <option value="All">All Programs</option><option value="Civil Works">Civil Works</option><option value="Military">Military</option>
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full md:w-auto px-4 py-2 border rounded-lg bg-white text-sm">
            <option value="All">All Statuses</option><option value="Active">Active</option><option value="In Progress">In Progress</option><option value="Excess">Excess</option><option value="Disposed">Disposed</option>
          </select>
           <button onClick={() => alert('Exporting data... (simulation)')} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm shrink-0">
            <Download size={16} /> Export
          </button>
          <button onClick={() => setIsCreateModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm shrink-0">
            <Plus size={16} /> New
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
              <tr key={asset.id} onClick={() => navigate(`/usace/inventory/${asset.id}`)} className="hover:bg-slate-50/50 cursor-pointer">
                <td className="px-6 py-4 font-mono text-blue-600 font-medium">{asset.rpuid}</td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{asset.name}</div>
                  <div className="text-xs text-slate-500">{asset.location}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">{asset.program}</td>
                <td className="px-6 py-4 text-slate-600">{asset.type}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                    {asset.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                    {getSyncIcon(asset.cefmsSyncStatus)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
