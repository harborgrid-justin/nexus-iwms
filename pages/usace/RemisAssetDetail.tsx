
import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ASSETS, USACE_OUTGRANTS, USACE_COMPONENTS, EMPLOYEES, USACE_DISPOSALS, USACE_MOBILIZATION_DATA } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { StatusBadge } from '../../components/StatusBadge';
import { ArrowLeft, Edit, Building, MapPin, Calendar, DollarSign, Square, Sigma, HardHat, FileClock, History, Plus, X, Lock, RefreshCw, AlertTriangle, Clock, Paperclip, Activity, Users, Settings, ArrowRight, ShieldCheck } from 'lucide-react';
import { RealPropertyAsset, AuditEvent } from '../../types';
import { checkAssetDisposalStatus, validateMobilizationCriticality, validateComponentCosts } from '../../utils/usaceRules';
import { EditAssetModal } from './components/EditAssetModal';

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
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{asset.name}</h1>
                        <p className="text-slate-500 font-mono text-xs font-bold uppercase tracking-widest mt-1">RPUID: {asset.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusBadge status={asset.status} />
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-bold text-sm shadow-sm transition-all active:scale-95"><Edit size={16} /> Edit Record</button>
                        <select onChange={(e) => handleStatusChange(e.target.value as RealPropertyAsset['status'])} value={asset.status} className="px-3 py-2 text-sm font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 focus:outline-none appearance-none cursor-pointer shadow-lg shadow-slate-900/10">
                            <option disabled>Asset Control</option>
                            <option value="Active">Operational: Active</option>
                            <option value="Excess">Operational: Excess</option>
                            <option value="Disposed">Operational: Disposed</option>
                            <option value="Archive">Operational: Archive</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="px-6 border-b border-slate-200 bg-slate-50/30">
                    <nav className="-mb-px flex gap-8" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Operational Overview</button>
                        <button onClick={() => setActiveTab('components')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'components' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Component Matrix</button>
                        <button onClick={() => setActiveTab('outgrants')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'outgrants' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Strategic Instruments</button>
                        <button onClick={() => setActiveTab('financials')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'financials' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Financial Detail</button>
                        <button onClick={() => setActiveTab('insurance')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'insurance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Insurance & Compliance</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-8">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-10">
                                <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-3 text-sm uppercase tracking-widest">Global Attributes</h3>
                                <div className="space-y-6">
                                    <DetailItem label="Functional Type" value={asset.type} icon={Building} />
                                    <DetailItem label="Strategic Program" value={asset.program} icon={Sigma} />
                                    <DetailItem label="Category Descriptor" value={asset.assetCategoryCode} icon={HardHat} />
                                    <DetailItem label="Mobilization Protocol" value={asset.mobilizationUse} icon={Activity} />
                                </div>
                                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
                                    <RefreshCw size={16} className="text-blue-600 animate-spin-slow" />
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                        CEFMS Synchronized: <span className="text-blue-600">3h 12m ago</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-10">
                                <h3 className="font-bold text-slate-900 border-l-4 border-slate-300 pl-3 text-sm uppercase tracking-widest">Spatial Metrics</h3>
                                <div className="space-y-6">
                                    <DetailItem label="Geospatial Location" value={asset.location} icon={MapPin} />
                                    <DetailItem label="Operational Footprint" value={`${asset.area.toLocaleString()} ${asset.unit}`} icon={Square} />
                                </div>
                            </div>
                            <div className="space-y-10">
                                <h3 className="font-bold text-slate-900 border-l-4 border-amber-500 pl-3 text-sm uppercase tracking-widest">Financial Oversight</h3>
                                <div className="space-y-6">
                                    <DetailItem label="Acquisition Inception" value={asset.acquisitionDate} icon={Calendar} isProtected={true} />
                                    <DetailItem label="Capital Investment" value={`$${asset.cost.toLocaleString()}`} icon={DollarSign} isProtected={true} />
                                </div>
                                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Lock size={60} className="text-white" />
                                    </div>
                                    <h4 className="text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-1.5 flex items-center gap-2 font-mono">
                                        <Sigma size={12} /> Compliance Notice
                                    </h4>
                                    <p className="text-slate-400 font-medium text-[10px] leading-relaxed italic">
                                        Financial data retention enforced at 75 years per NARA standards.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'components' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                             <div className="flex justify-between items-center mb-10">
                                <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-3 text-sm uppercase tracking-widest">Infrastructure Component Matrix</h3>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-xs shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                                    <Plus size={16} /> Register Component
                                </button>
                            </div>
                            {!componentValidation.allowed && (
                                <div className="mb-10 p-6 bg-red-50 border border-red-100 rounded-3xl text-red-600 text-xs font-bold leading-relaxed flex items-center gap-4 animate-pulse">
                                    <div className="p-2 bg-red-100 rounded-lg"><AlertTriangle size={20} /></div>
                                    {componentValidation.reason}
                                </div>
                            )}
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50/50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Strategic Name</th>
                                            <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Function Type</th>
                                            <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Capital Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {asset.components?.map(c => (
                                            <tr key={c.id} className="hover:bg-blue-50/30 transition-colors group">
                                                <td className="px-6 py-5 font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{c.name}</td>
                                                <td className="px-6 py-5 font-bold text-slate-500 text-xs">{c.type}</td>
                                                <td className="px-6 py-5 text-right font-mono font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <DollarSign size={12} className="text-slate-300" />
                                                        ${c.cost.toLocaleString()}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'outgrants' && (
                         <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                             <h3 className="font-bold text-slate-900 border-l-4 border-emerald-500 pl-3 mb-10 text-sm uppercase tracking-widest shrink-0">Strategic Instruments & Utilization</h3>
                             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                 <table className="w-full text-left text-sm">
                                     <thead className="bg-slate-50/50 border-b border-slate-100">
                                         <tr>
                                            <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Authorized Grantee</th>
                                            <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Instrument Profile</th>
                                            <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Termination Date</th>
                                            <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Annual Revenue</th>
                                         </tr>
                                     </thead>
                                     <tbody className="divide-y divide-slate-50">
                                         {USACE_OUTGRANTS.filter(og => og.assetId === asset.id).map(og => (
                                             <tr key={og.id} className="hover:bg-blue-50/30 transition-colors group">
                                                 <td className="px-6 py-5 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{og.grantee}</td>
                                                 <td className="px-6 py-5 font-bold text-slate-500 text-xs">{og.type}</td>
                                                 <td className="px-6 py-5">
                                                     <div className="flex items-center gap-2 text-slate-400 font-bold font-mono text-[11px]">
                                                         <Calendar size={12} />
                                                         {og.endDate}
                                                     </div>
                                                 </td>
                                                 <td className="px-6 py-5 text-right font-mono font-bold text-emerald-600">
                                                     <div className="flex items-center justify-end gap-1">
                                                         <DollarSign size={12} className="text-slate-300" />
                                                         ${og.revenue.toLocaleString()}
                                                     </div>
                                                 </td>
                                             </tr>
                                         ))}
                                         {USACE_OUTGRANTS.filter(og => og.assetId === asset.id).length === 0 && (
                                             <tr>
                                                 <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] italic">No active strategic instruments</td>
                                             </tr>
                                         )}
                                     </tbody>
                                 </table>
                             </div>
                         </div>
                    )}

                    {activeTab === 'financials' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-3 mb-10 text-sm uppercase tracking-widest shrink-0">Command Financial Registry</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Appropriation Mapping</h4>
                                        <div className="text-[10px] font-bold text-blue-600 font-mono italic">Strategic Trace</div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-700">O&M Civil Works</span>
                                            <span className="text-xs font-bold text-slate-900 font-mono">$125,000.00</span>
                                        </div>
                                        <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-600 rounded-full" style={{width: '65%'}}></div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-700">MR&R Reserve</span>
                                            <span className="text-xs font-bold text-slate-900 font-mono">$85,450.00</span>
                                        </div>
                                        <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{width: '42%'}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-900 rounded-3xl shadow-xl flex flex-col justify-center relative overflow-hidden group">
                                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <DollarSign size={80} className="text-white" />
                                    </div>
                                    <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2 relative z-10">Aggregate Liability Position</p>
                                    <p className="text-white text-3xl font-bold tracking-tight mb-4 relative z-10">$ 2.45M</p>
                                    <Link to="/usace/finance" className="text-[10px] font-bold text-white/50 uppercase tracking-widest hover:text-white flex items-center gap-2 transition-colors relative z-10">
                                        Open Financial Command Overview <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'insurance' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h3 className="font-bold text-slate-900 border-l-4 border-amber-500 pl-3 mb-10 text-sm uppercase tracking-widest shrink-0">Command Compliance & Verification</h3>
                            <div className="bg-white rounded-2xl border border-slate-200 p-8 flex items-center gap-8 group hover:border-blue-300 transition-all cursor-pointer">
                                <div className="p-5 bg-emerald-600 rounded-2xl text-white shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                    <ShieldCheck size={32} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Insurance State: Verified</p>
                                    <h4 className="text-lg font-bold text-slate-900 tracking-tight">Instrument Coverage Fully Compliant</h4>
                                    <p className="text-slate-500 text-xs mt-2 font-medium max-w-md">All outgrantee certificates have been verified against EM 385-1-1 requirements. General Liability coverage exceeds $1.0M aggregate minimum.</p>
                                    <div className="mt-4 flex gap-4">
                                         <Link to="/usace/insurance" className="px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all">Audit Compliance</Link>
                                         <button className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">View Proof</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                         <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                             <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-3 mb-10 text-sm uppercase tracking-widest">Asset Lifecycle & Audit Trail</h3>
                             <div className="space-y-0 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-100 ml-1">
                                {asset.history?.map((event, i) => (
                                    <div key={i} className="flex gap-10 relative group/event">
                                        <div className="flex-shrink-0 mt-2">
                                            <div className={`w-6 h-6 rounded-full ring-4 ${i === 0 ? 'bg-blue-600 ring-blue-50 shadow-lg shadow-blue-500/20' : 'bg-white ring-slate-50 border-2 border-slate-200'} z-10 relative shadow-sm transition-transform group-hover/event:scale-110 flex items-center justify-center`}>
                                                {i === 0 && <Clock size={12} className="text-white" />}
                                            </div>
                                        </div>
                                        <div className="flex-1 pb-12 last:pb-0">
                                            <div className="bg-white rounded-3xl border border-transparent group-hover/event:border-slate-100 group-hover/event:shadow-xl transition-all p-4 -m-4">
                                                <div className="flex flex-wrap items-center gap-4 mb-3">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 font-mono tracking-widest bg-slate-50 px-3 py-1 rounded-full uppercase">
                                                        <Calendar size={10} />
                                                        {event.timestamp}
                                                    </div>
                                                    <span className={`text-[10px] px-3 py-1 rounded-lg font-bold uppercase tracking-widest shadow-sm ${i === 0 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200'}`}>{event.action}</span>
                                                </div>
                                                <p className="font-bold text-slate-900 text-sm mb-4">Authoritative modification by <span className="text-blue-600 font-bold underline underline-offset-4 cursor-pointer">{event.user}</span></p>
                                                {event.details && (
                                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600 font-medium leading-relaxed italic border-l-4 border-blue-400 group-hover/event:bg-white group-hover/event:border-blue-200 transition-colors">
                                                        "{event.details}"
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                             <div className="mt-10 p-4 border border-dashed border-slate-200 rounded-2xl flex items-center justify-between">
                                 <div className="flex items-center gap-3 text-slate-400">
                                     <Settings size={18} />
                                     <span className="text-[10px] font-bold uppercase tracking-widest">Audit tracking active and tamper-evident</span>
                                 </div>
                                 <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">View Full Log</button>
                             </div>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};