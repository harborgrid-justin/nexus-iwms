
import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ASSETS, USACE_OUTGRANTS, USACE_COMPONENTS, EMPLOYEES, USACE_INSPECTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { ArrowLeft, Edit, ChevronDown, ChevronRight, Building, MapPin, Calendar, DollarSign, Square, Sigma, HardHat, FileClock, History, Plus, X, Lock, RefreshCw, Folder, FolderOpen, Layers, Archive, Trash2, ClipboardList, CheckCircle, AlertTriangle, Key, Landmark, Database, Activity, ShieldCheck } from 'lucide-react';
import { RealPropertyAsset, AuditEvent, AssetComponent, UtilizationInspection } from '../../types';
import { AssetStructureModal } from './components/AssetStructureModal';
import { InspectionModal } from './components/InspectionModal';

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

const getLifecycleColor = (state: string) => {
    switch(state) {
        case 'Active': return 'bg-green-100 text-green-800';
        case 'Planned': return 'bg-blue-100 text-blue-800';
        case 'Retired': return 'bg-red-100 text-red-800';
        case 'Archived': return 'bg-slate-200 text-slate-600';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const DetailCard = ({ label, value, icon: Icon, isProtected = false }: { label: string, value: string | number | boolean, icon: any, isProtected?: boolean }) => (
    <div className="flex items-start gap-3">
        <Icon className="text-slate-400 mt-1" size={16} />
        <div>
            <div className="text-xs text-slate-500 flex items-center gap-1">{label} {isProtected && <Lock size={10} title="This field has restricted access." />}</div>
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
    
    // Hierarchy Management State
    const [expandedImprovements, setExpandedImprovements] = useState<Set<string>>(new Set());
    const [isStructureModalOpen, setIsStructureModalOpen] = useState(false);
    const [structureParentId, setStructureParentId] = useState<string | undefined>(undefined);
    const [editingComponent, setEditingComponent] = useState<AssetComponent | undefined>(undefined);

    // Inspection State
    const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
    const [editingInspection, setEditingInspection] = useState<UtilizationInspection | null>(null);
    const assetInspections = USACE_INSPECTIONS.filter(i => i.assetId === assetId);

    if (!asset) {
        return <div className="p-6">Asset not found. <Link to="/usace/inventory" className="text-blue-600">Return to Inventory</Link></div>;
    }
    
    const handleSave = (updatedAsset: RealPropertyAsset, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance', // Simulated logged-in user
            action: 'Record Updated',
            details: reason
        };
        
        setAsset(prev => prev ? { ...prev, ...updatedAsset, history: [newHistoryEvent, ...prev.history!] } : undefined);
    };

    const handleStatusChange = (newStatus: RealPropertyAsset['status']) => {
        const reason = `Status changed from ${asset.status} to ${newStatus}.`;
         const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance',
            action: 'Status Updated',
            details: reason,
        };
        setAsset(prev => prev ? { ...prev, status: newStatus, history: [newHistoryEvent, ...prev.history!] } : undefined);
        alert(`Asset status changed to ${newStatus}. This action has been logged.`);
    }

    // --- Hierarchy Logic ---
    const toggleImprovement = (id: string) => {
        const newSet = new Set(expandedImprovements);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setExpandedImprovements(newSet);
    };

    const handleAddImprovement = () => {
        setEditingComponent(undefined);
        setStructureParentId(undefined);
        setIsStructureModalOpen(true);
    };

    const handleAddComponent = (improvementId: string) => {
        // 15.1.3: Associate components with their respective parent improvements
        setEditingComponent(undefined);
        setStructureParentId(improvementId);
        setIsStructureModalOpen(true);
    };

    const handleEditStructure = (item: AssetComponent) => {
        if (item.lifecycleState === 'Retired' || item.lifecycleState === 'Archived') {
            alert('Compliance Warning (15.7.4): Retired/Archived records cannot be modified for financial reporting purposes.');
            return;
        }
        setEditingComponent(item);
        setStructureParentId(item.parentImprovementId);
        setIsStructureModalOpen(true);
    }

    const handleSaveStructure = (record: Partial<AssetComponent>, reason: string) => {
        // In a real app, this would update the state/backend
        console.log("Saving Structure:", record, reason);
        alert(`Hierarchy record updated. Audit trail logged.`);
        setIsStructureModalOpen(false);
    };

    const handleRetireStructure = (item: AssetComponent) => {
        // 15.4.2 Logical retirement
        if (confirm(`Are you sure you want to Retire ${item.name}? This will preserve the record for audit purposes (15.4.3).`)) {
             alert(`${item.name} status changed to Retired. Audit trail updated.`);
        }
    }

    // --- Inspection Logic ---
    const handleSaveInspection = (record: Partial<UtilizationInspection>, reason: string) => {
        console.log("Saving Inspection:", record, reason);
        alert('Inspection record updated. Audit trail logged.');
        setIsInspectionModalOpen(false);
    }

    // --- RPUID Governance Logic (Req 19) ---
    const handleRpuidArchive = () => {
        if (asset.cefmsSyncStatus === 'Synced') {
            if(!confirm('Warning: This asset has active CEFMS financial linkages. Archiving the RPUID may impact financial obligations (Req 19.7.4). Continue?')) {
                return;
            }
        }
        alert('RPUID Archived. This identifier cannot be reused.');
    };

    return (
        <div className="space-y-6">
            <EditAssetModal asset={asset} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} />
            <AssetStructureModal 
                isOpen={isStructureModalOpen} 
                onClose={() => setIsStructureModalOpen(false)} 
                onSave={handleSaveStructure}
                parentAssetId={asset.id}
                parentImprovementId={structureParentId}
                existingItem={editingComponent}
            />
            <InspectionModal 
                isOpen={isInspectionModalOpen}
                onClose={() => setIsInspectionModalOpen(false)}
                onSave={handleSaveInspection}
                inspection={editingInspection}
                assetId={asset.id}
            />

            <div>
                <button onClick={() => navigate('/usace/inventory')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2">
                    <ArrowLeft size={16} /> Back to Inventory
                </button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">{asset.name}</h1>
                            {asset.rpuidStatus === 'Archived' && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-bold">RPUID ARCHIVED</span>}
                        </div>
                        <p className="text-slate-500 font-mono flex items-center gap-2">
                            <Key size={14} className="text-slate-400"/>
                            {asset.rpuid}
                        </p>
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
                        <RegulatoryBadge refs={['15', '16', '19']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('components')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'components' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Hierarchy (Req 15)</button>
                        <button onClick={() => setActiveTab('governance')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'governance' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Governance & RPUID (Req 19)</button>
                        <button onClick={() => setActiveTab('inspections')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'inspections' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Inspections</button>
                        <button onClick={() => setActiveTab('outgrants')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'outgrants' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Out-Grants</button>
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

                    {/* Req 19: RPUID Governance Tab */}
                    {activeTab === 'governance' && (
                        <div className="space-y-8">
                            {/* Master Data Section */}
                            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Key className="text-blue-600" size={20}/> RPUID Master Data</h3>
                                        <p className="text-sm text-slate-500">Authoritative identification and lifecycle control (DoDI 4165.14).</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-white border rounded text-xs font-mono text-slate-600">
                                        <Lock size={12}/> Immutable ID
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b pb-1">Identifier Details</h4>
                                        <DetailCard label="Unique ID (RPUID)" value={asset.rpuid} icon={Key} isProtected />
                                        <DetailCard label="Current Status" value={asset.rpuidStatus} icon={Activity} />
                                        <DetailCard label="Generation Authority" value={asset.rpuidMetadata?.authority || 'N/A'} icon={ShieldCheck} />
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b pb-1">Provenance</h4>
                                        <DetailCard label="Generation Method" value={asset.rpuidMetadata?.generationMethod || 'System Generated'} icon={Database} />
                                        <DetailCard label="Creation Date" value={asset.rpuidMetadata?.generationDate || asset.acquisitionDate} icon={Calendar} />
                                    </div>
                                    <div className="bg-white p-4 rounded border border-slate-200">
                                        <h4 className="text-sm font-bold text-slate-800 mb-2">Lifecycle Management</h4>
                                        <p className="text-xs text-slate-500 mb-4">Manage RPUID status independent of asset operations.</p>
                                        <div className="space-y-2">
                                            <button onClick={() => alert('Association update logic (19.3.3) would open here.')} className="w-full text-left text-xs text-blue-600 hover:underline flex items-center gap-2"><Layers size={12}/> Update Sub-Asset Association</button>
                                            <button onClick={handleRpuidArchive} className="w-full text-left text-xs text-red-600 hover:underline flex items-center gap-2"><Archive size={12}/> Archive Identifier</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Integration Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Landmark size={18}/> CEFMS Integration (19.6.2)</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded border">
                                            <span className="text-sm font-medium text-slate-600">Linked CEFMS ID</span>
                                            <span className="font-mono font-bold text-slate-900">{asset.cefmsId || 'Not Linked'}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded border">
                                            <span className="text-sm font-medium text-slate-600">Sync Status</span>
                                            <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${asset.cefmsSyncStatus === 'Synced' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                                {asset.cefmsSyncStatus === 'Synced' ? <CheckCircle size={12}/> : <AlertTriangle size={12}/>}
                                                {asset.cefmsSyncStatus}
                                            </span>
                                        </div>
                                        <button className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"><RefreshCw size={14}/> Force Sync RPUID Linkage</button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><History size={18}/> Identity Audit Log</h3>
                                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                        <div className="text-xs border-b pb-2">
                                            <p className="font-semibold text-slate-700">RPUID Issued</p>
                                            <p className="text-slate-500">{asset.rpuidMetadata?.generationDate || asset.acquisitionDate} • System Automated</p>
                                        </div>
                                        <div className="text-xs border-b pb-2">
                                            <p className="font-semibold text-slate-700">CEFMS Linkage Established</p>
                                            <p className="text-slate-500">2023-01-15 • Financial Officer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'components' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="font-bold text-slate-800">Asset Hierarchy</h3>
                                    <p className="text-sm text-slate-500 mt-1">Manage Improvements, Components, and Betterments.</p>
                                </div>
                                <button onClick={handleAddImprovement} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-xs shadow-sm"><Plus size={14} /> Add Improvement</button>
                            </div>
                            
                            <div className="border rounded-lg overflow-hidden bg-white">
                                {/* Hierarchy Tree Header */}
                                <div className="grid grid-cols-12 bg-slate-50 border-b p-3 text-xs font-semibold text-slate-600 uppercase">
                                    <div className="col-span-5">Structure Item</div>
                                    <div className="col-span-2">Type</div>
                                    <div className="col-span-2">State</div>
                                    <div className="col-span-3 text-right">Valuation / Cost</div>
                                </div>

                                {/* Asset Root (Level 1) */}
                                <div className="grid grid-cols-12 border-b p-3 items-center bg-slate-50/50">
                                    <div className="col-span-5 flex items-center gap-2 font-bold text-slate-900">
                                        <Building size={16} className="text-blue-600" />
                                        {asset.name} (Root)
                                    </div>
                                    <div className="col-span-2 text-xs text-slate-500">Real Property Asset</div>
                                    <div className="col-span-2"><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getStatusColor(asset.status)}`}>{asset.status}</span></div>
                                    <div className="col-span-3 text-right text-sm font-mono">${asset.cost.toLocaleString()}</div>
                                </div>

                                {/* Children */}
                                {asset.components?.filter(c => !c.parentImprovementId).map(imp => {
                                    const isExpanded = expandedImprovements.has(imp.id);
                                    const children = asset.components?.filter(c => c.parentImprovementId === imp.id) || [];
                                    const hasChildren = children.length > 0;

                                    return (
                                        <React.Fragment key={imp.id}>
                                            {/* Level 2: Improvement */}
                                            <div className="grid grid-cols-12 border-b p-3 items-center hover:bg-slate-50 group">
                                                <div className="col-span-5 flex items-center gap-2 pl-4">
                                                    <button onClick={() => toggleImprovement(imp.id)} className={`p-1 rounded hover:bg-slate-200 text-slate-400 ${hasChildren ? '' : 'invisible'}`}>
                                                        {isExpanded ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
                                                    </button>
                                                    <FolderOpen size={16} className="text-amber-500" />
                                                    <div className="text-sm font-medium text-slate-800">{imp.name}</div>
                                                </div>
                                                <div className="col-span-2 text-xs text-slate-600">{imp.type}</div>
                                                <div className="col-span-2"><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getLifecycleColor(imp.lifecycleState)}`}>{imp.lifecycleState}</span></div>
                                                <div className="col-span-3 text-right">
                                                    <div className="text-sm font-mono">${imp.cost.toLocaleString()}</div>
                                                    {imp.appraisalValue !== undefined && <div className="text-[10px] text-green-600 font-medium">Appraisal: ${imp.appraisalValue.toLocaleString()}</div>}
                                                    <div className="flex justify-end gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => handleEditStructure(imp)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit size={12}/></button>
                                                        <button onClick={() => handleAddComponent(imp.id)} className="text-green-600 hover:text-green-800" title="Add Component"><Plus size={12}/></button>
                                                        <button onClick={() => handleRetireStructure(imp)} className="text-red-600 hover:text-red-800" title="Retire/Archive"><Archive size={12}/></button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Level 3: Components */}
                                            {isExpanded && children.map(comp => (
                                                <div key={comp.id} className="grid grid-cols-12 border-b p-3 items-center bg-slate-50/30 hover:bg-slate-100 group">
                                                    <div className="col-span-5 flex items-center gap-2 pl-12 border-l-2 border-slate-200 ml-5">
                                                        <Layers size={14} className="text-slate-400" />
                                                        <div className="text-sm text-slate-700">{comp.name}</div>
                                                    </div>
                                                    <div className="col-span-2 text-xs text-slate-500">{comp.type}</div>
                                                    <div className="col-span-2"><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${getLifecycleColor(comp.lifecycleState)}`}>{comp.lifecycleState}</span></div>
                                                    <div className="col-span-3 text-right">
                                                        <div className="text-sm font-mono text-slate-600">${comp.cost.toLocaleString()}</div>
                                                        <div className="flex justify-end gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => handleEditStructure(comp)} className="text-blue-600 hover:text-blue-800" title="Edit"><Edit size={12}/></button>
                                                            <button onClick={() => handleRetireStructure(comp)} className="text-red-600 hover:text-red-800" title="Retire"><Trash2 size={12}/></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'inspections' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="font-bold text-slate-800">Utilization Inspections</h3>
                                    <p className="text-sm text-slate-500 mt-1">40 U.S.C. §524 Compliance Reviews.</p>
                                </div>
                                <button onClick={() => { setEditingInspection(null); setIsInspectionModalOpen(true); }} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-xs shadow-sm"><Plus size={14} /> Schedule Inspection</button>
                            </div>
                            
                            <div className="bg-slate-50 rounded-lg border overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Date</th>
                                            <th className="p-3 font-semibold">Type</th>
                                            <th className="p-3 font-semibold">Inspector</th>
                                            <th className="p-3 font-semibold">Lifecycle State</th>
                                            <th className="p-3 font-semibold">Status</th>
                                            <th className="p-3 font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {assetInspections.map(insp => (
                                            <tr key={insp.id}>
                                                <td className="p-3">{insp.inspectionDate}</td>
                                                <td className="p-3">{insp.type}</td>
                                                <td className="p-3">{insp.inspector}</td>
                                                <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full border ${getLifecycleColor(insp.lifecycleState)}`}>{insp.lifecycleState}</span></td>
                                                <td className="p-3">
                                                    {insp.findings.length > 0 && insp.findings.some(f => f.severity === 'Critical' && f.status === 'Open') ? (
                                                        <span className="flex items-center gap-1 text-red-600 font-bold text-xs"><AlertTriangle size={12}/> Findings Open</span>
                                                    ) : (
                                                        <span className="flex items-center gap-1 text-green-600 font-bold text-xs"><CheckCircle size={12}/> On Track</span>
                                                    )}
                                                </td>
                                                <td className="p-3"><button onClick={() => { setEditingInspection(insp); setIsInspectionModalOpen(true); }} className="text-blue-600 hover:underline font-medium">Manage</button></td>
                                            </tr>
                                        ))}
                                        {assetInspections.length === 0 && <tr><td colSpan={6} className="p-4 text-center text-slate-500 italic">No inspections recorded for this asset.</td></tr>}
                                    </tbody>
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
                </div>
            </div>
        </div>
    );
};
