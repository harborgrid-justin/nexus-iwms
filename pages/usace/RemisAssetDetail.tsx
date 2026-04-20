
import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ASSETS, USACE_OUTGRANTS, USACE_COMPONENTS, EMPLOYEES, USACE_DISPOSALS, USACE_MOBILIZATION_DATA } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { ArrowLeft, Edit, ChevronDown, Building, MapPin, Calendar, DollarSign, Square, Sigma, HardHat, FileClock, History, Plus, X, Lock, RefreshCw, AlertTriangle } from 'lucide-react';
import { RealPropertyAsset, AuditEvent } from '../../types';
import { checkAssetDisposalStatus, validateMobilizationCriticality, validateComponentCosts } from '../../utils/usaceRules';

const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Excess': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Disposed':
      case 'Archive':
         return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
};

const DetailCard = ({ label, value, icon: Icon, isProtected = false }: { label: string, value: string | number | boolean, icon: any, isProtected?: boolean }) => (
    <div className="flex items-start gap-3">
        <Icon className="text-slate-400 mt-1" size={16} />
        <div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              {label} 
              {isProtected && <span title="This field has restricted access."><Lock size={10} /></span>}
            </div>
            <div className="text-sm font-medium text-slate-800">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</div>
        </div>
    </div>
);

const EditAssetModal = ({ asset, isOpen, onClose, onSave }: { asset: RealPropertyAsset, isOpen: boolean, onClose: () => void, onSave: (updatedAsset: RealPropertyAsset, reason: string) => void }) => {
    if (!isOpen) return null;
    const [reason, setReason] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!reason) {
            alert('A "Reason for Change" is required to save modifications.');
            return;
        }
        // In a real app, you'd gather form data here to create the updatedAsset object
        onSave(asset, reason); 
        onClose();
    }
    
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">Edit Asset Record: {asset.rpuid}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-slate-700">Asset Name</label><input type="text" defaultValue={asset.name} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required /></div>
                        <div><label className="block text-sm font-medium text-slate-700">Location</label><input type="text" defaultValue={asset.location} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required /></div>
                    </div>
                     <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                        <label className="block text-sm font-bold text-amber-800">Reason for Change</label>
                        <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g., 'Updated location based on new survey data.'" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                        <p className="text-xs text-amber-700 mt-1">An audit entry will be created for this update.</p>
                    </div>
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">Save Changes</button>
                </div>
            </div>
        </div>
    );
};


export const RemisAssetDetail: React.FC = () => {
    const { assetId } = useParams<{ assetId: string }>();
    const navigate = useNavigate();
    const [asset, setAsset] = useState<RealPropertyAsset | undefined>(USACE_ASSETS.find(a => a.id === assetId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!asset) {
        return <div className="p-6">Asset not found. <Link to="/usace/inventory" className="text-blue-600">Return to Inventory</Link></div>;
    }
    
    // Validate Rule 25 on load
    const componentValidation = validateComponentCosts(asset);

    const handleSave = (updatedAsset: RealPropertyAsset, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance', // Simulated logged-in user
            action: 'Record Updated',
            details: reason
        };
        
        setAsset(prev => prev ? { ...prev, ...updatedAsset, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        // In real app, this would be an API call.
    };

    const handleStatusChange = (newStatus: RealPropertyAsset['status']) => {
        // Rule 1: Check if disposal allows transition to 'Disposed'
        if (newStatus === 'Disposed') {
            const ruleCheck = checkAssetDisposalStatus(asset, USACE_DISPOSALS);
            if (!ruleCheck.allowed) {
                alert(ruleCheck.reason);
                return;
            }
        }

        // Rule 10: Check if mobilization profile allows transition to 'Excess'
        if (newStatus === 'Excess') {
            const ruleCheck = validateMobilizationCriticality(asset, USACE_MOBILIZATION_DATA);
            if (!ruleCheck.allowed) {
                alert(ruleCheck.reason);
                return;
            }
        }

        const reason = `Status changed from ${asset.status} to ${newStatus}.`;
         const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance',
            action: 'Status Updated',
            details: reason,
        };
        setAsset(prev => prev ? { ...prev, status: newStatus, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        alert(`Asset status changed to ${newStatus}. This action has been logged.`);
    }

    return (
        <div className="space-y-6">
            <EditAssetModal asset={asset} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} />
            <div>
                <button onClick={() => navigate('/usace/inventory')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2">
                    <ArrowLeft size={16} /> Back to Inventory
                </button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{asset.name}</h1>
                        <p className="text-slate-500 font-mono">{asset.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${getStatusColor(asset.status)}`}>{asset.status}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Edit</button>
                        <select onChange={(e) => handleStatusChange(e.target.value as RealPropertyAsset['status'])} value={asset.status} className="px-3 py-2 text-sm font-medium bg-slate-800 text-white rounded-lg hover:bg-slate-700 focus:outline-none appearance-none">
                            <option disabled>Change Status</option>
                            <option value="Active">Active</option>
                            <option value="Excess">Excess</option>
                            <option value="Disposed">Disposed</option>
                            <option value="Archive">Archive</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('components')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'components' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Components</button>
                        <button onClick={() => setActiveTab('outgrants')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'outgrants' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Out-Grants</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800">General Information</h3>
                                <DetailCard label="Asset Type" value={asset.type} icon={Building} />
                                <DetailCard label="Program" value={asset.program} icon={Sigma} />
                                <DetailCard label="Category Code" value={asset.assetCategoryCode} icon={HardHat} />
                                <DetailCard label="Mobilization Use" value={asset.mobilizationUse} icon={HardHat} />
                                <div className="flex items-center gap-2 text-xs text-slate-500"><RefreshCw size={12}/> Last Synced with CEFMS: 3 hours ago <button className="font-medium text-blue-600 hover:underline">(Sync Now)</button></div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800">Location & Size</h3>
                                <DetailCard label="Location" value={asset.location} icon={MapPin} />
                                <DetailCard label="Area" value={`${asset.area.toLocaleString()} ${asset.unit}`} icon={Square} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800">Financials</h3>
                                <DetailCard label="Acquisition Date" value={asset.acquisitionDate} icon={Calendar} isProtected={true} />
                                <DetailCard label="Acquisition Cost" value={`$${asset.cost.toLocaleString()}`} icon={DollarSign} isProtected={true} />
                                <p className="text-xs text-slate-400">Note: Financial data retention is 75 years per NARA guidelines.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'components' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800">Asset Components</h3>
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-xs shadow-sm"><Plus size={14} /> Add Component</button>
                            </div>
                            {!componentValidation.allowed && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-center gap-2"><AlertTriangle size={16}/> {componentValidation.reason}</div>}
                            <div className="bg-slate-50 rounded-lg border">
                                <table className="w-full text-sm">
                                    <thead className="text-left"><tr className="border-b"><th className="p-3">Name</th><th>Type</th><th className="text-right p-3">Cost</th></tr></thead>
                                    <tbody>{asset.components?.map(c => <tr key={c.id} className="border-b last:border-0"><td className="p-3 font-medium">{c.name}</td><td>{c.type}</td><td className="text-right p-3 font-mono">${c.cost.toLocaleString()}</td></tr>)}</tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'outgrants' && (
                         <div>
                             <h3 className="font-bold text-slate-800 mb-4">Associated Out-Grants</h3>
                             <div className="bg-slate-50 rounded-lg border">
                                 <table className="w-full text-sm">
                                     <thead className="text-left"><tr className="border-b"><th className="p-3">Grantee</th><th>Type</th><th>End Date</th><th className="text-right p-3">Revenue</th></tr></thead>
                                     <tbody>{USACE_OUTGRANTS.filter(og => og.assetId === asset.id).map(og => <tr key={og.id} className="border-b last:border-0"><td className="p-3 font-medium">{og.grantee}</td><td>{og.type}</td><td>{og.endDate}</td><td className="text-right p-3 font-mono">${og.revenue.toLocaleString()}</td></tr>)}</tbody>
                                 </table>
                             </div>
                         </div>
                    )}

                    {activeTab === 'history' && (
                         <div>
                             <h3 className="font-bold text-slate-800 mb-4">Asset Lifecycle History</h3>
                             <div className="space-y-4">
                                {asset.history?.map((event, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`w-4 h-4 rounded-full ring-4 ${i === 0 ? 'bg-blue-500 ring-blue-100 animate-pulse' : 'bg-slate-300 ring-slate-100'} z-10`}></div>
                                            <div className="w-0.5 flex-1 bg-slate-200"></div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">{event.timestamp}</p>
                                            <p className="font-medium text-slate-800">{event.action} by {event.user}</p>
                                            {event.details && <p className="text-sm text-slate-600 mt-1 p-2 bg-slate-50 rounded-md border">{event.details}</p>}
                                        </div>
                                    </div>
                                ))}
                             </div>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};