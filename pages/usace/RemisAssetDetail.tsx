
import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ASSETS, USACE_OUTGRANTS, USACE_COMPONENTS, EMPLOYEES, USACE_DISPOSALS, USACE_MOBILIZATION_DATA } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { StatusBadge } from '../../components/StatusBadge';
import { ArrowLeft, Edit, Building, MapPin, Calendar, DollarSign, Square, Sigma, HardHat, FileClock, History, Plus, X, Lock, RefreshCw, AlertTriangle, Clock, Paperclip, Activity, Users, Settings, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
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
        return <div className="p-6 font-black italic uppercase text-slate-400 tracking-widest text-[11px]">MISSION_ERROR::ASSET_NOT_FOUND_IN_NODE <Link to="/usace/inventory" className="text-blue-600 underline ml-4 hover:text-blue-800 transition-colors">RETURN_TO_REGISTRY</Link></div>;
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
    <div className="max-w-[1600px] mx-auto space-y-10 italic font-black">
        <EditAssetModal asset={asset} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} />
        
        {/* Command Detail Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 pb-16 border-b-4 border-slate-950 relative italic">
            <div className="absolute -left-8 top-0 bottom-0 w-2 bg-blue-600 animate-pulse" />
            
            <div className="space-y-8 flex-grow">
                <button onClick={() => navigate('/usace/inventory')} className="flex items-center gap-4 text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all uppercase tracking-[0.4em] italic leading-none group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> BACK_TO_STRATEGIC_ASSET_REGISTRY
                </button>
                
                <div className="flex items-center gap-8">
                    <div className="p-5 bg-slate-950 rounded-none shadow-[0_0_50px_rgba(37,99,235,0.2)] text-white transform rotate-3 active:rotate-0 transition-transform cursor-crosshair">
                        <Building size={40} className="text-blue-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-6 mb-4">
                            <h1 className="text-5xl font-black text-slate-950 tracking-tight uppercase leading-none italic select-none">ASSET_VECTOR::{asset.name.replace(' ', '_')}</h1>
                            <div className="w-4 h-4 bg-blue-600 rotate-45 animate-pulse shadow-[0_0_20px_rgba(37,99,235,0.8)]" />
                        </div>
                        <div className="flex items-center gap-8 italic">
                            <span className="text-[12px] font-mono font-black px-6 py-2 bg-slate-950 text-white rounded-none uppercase tracking-[0.3em] italic shadow-2xl border-2 border-white/10 ring-4 ring-slate-950/5">
                                NODE_UID_HEX::[ {asset.rpuid} ]
                            </span>
                            <div className="flex items-center gap-4 border-l-2 border-slate-100 pl-8">
                                <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em] leading-none opacity-40">CAPACITY_VERIFIED_L9</span>
                                <div className="w-2 h-2 bg-slate-100 rotate-45" />
                                <span className="text-[11px] font-mono font-black text-slate-400 uppercase tracking-tighter italic">REC_AUTH_MASTER_883X_DELTA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-10">
                <div className="flex flex-col items-end gap-3 italic">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] italic leading-none opacity-40">CURRENT_ASSET_TELEMETRY</span>
                    <div className="transform scale-125 origin-right">
                        <StatusBadge status={asset.status} />
                    </div>
                </div>
                
                <div className="h-20 w-px bg-slate-100" />

                <div className="flex flex-col gap-3">
                    <button onClick={() => setIsEditModalOpen(true)} className="btn-pro-secondary bg-white text-slate-950 border-2 border-slate-950 flex items-center gap-4 px-10 py-5 h-auto text-[11px] font-black uppercase tracking-[0.4em] italic shadow-2xl transition-all hover:bg-slate-50 active:scale-95">
                        <Edit size={20} className="text-blue-600" /> RECONFIGURE_SCHEMATIC
                    </button>
                    <div className="relative group">
                        <select 
                            onChange={(e) => handleStatusChange(e.target.value as RealPropertyAsset['status'])} 
                            value={asset.status} 
                            className="w-full bg-slate-950 text-white pl-10 pr-16 py-5 text-[11px] h-auto font-black uppercase tracking-[0.5em] italic rounded-none border-2 border-slate-950 hover:bg-blue-600 focus:outline-none appearance-none cursor-pointer shadow-2xl transition-all"
                        >
                            <option disabled className="bg-slate-900">SET_COMMAND_OVERRIDE</option>
                            <option value="Active" className="bg-slate-900">CMD::ACTIVATE_NODE</option>
                            <option value="Excess" className="bg-slate-900">CMD::MARK_EXCESS</option>
                            <option value="Disposed" className="bg-slate-900">CMD::PURGE_DISPOSED</option>
                            <option value="Archive" className="bg-slate-900">CMD::ARCHIVE_VECTOR</option>
                        </select>
                        <ArrowRight size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-white transition-all pointer-events-none" />
                    </div>
                </div>
                <RegulatoryBadge refs={['ERA P8', 'AR 405-10']} />
            </div>
        </div>

        <div className="pro-card flex flex-col bg-white overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.1)] border-2 border-slate-950 group relative">
            {/* Top Navigation Stream */}
            <div className="px-10 border-b-4 border-slate-950 bg-[#0A0A0B] relative overflow-hidden h-24 flex items-center">
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <nav className="flex gap-16" aria-label="Tabs">
                    {[
                        { id: 'overview', label: 'OPERATIONAL_SCHEMATIC', icon: Activity },
                        { id: 'components', label: 'COMPONENT_MATRIX_V4', icon: HardHat },
                        { id: 'outgrants', label: 'STRATEGIC_INSTRUMENTS', icon: FileClock },
                        { id: 'financials', label: 'FISCAL_PIPELINE_TRX', icon: DollarSign },
                        { id: 'insurance', label: 'COMPLIANCE_PROTOCOL', icon: ShieldCheck },
                        { id: 'history', label: 'IMMUTABLE_AUDIT_LOG', icon: History }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)} 
                            className={`shrink-0 border-b-4 px-2 py-8 text-[11px] font-black uppercase tracking-[0.6em] transition-all italic flex items-center gap-4 relative z-10 ${activeTab === tab.id ? 'border-blue-600 text-blue-400 opacity-100 scale-110' : 'border-transparent text-white/30 hover:text-white/80 hover:border-white/20'}`}
                        >
                            <tab.icon size={18} className={activeTab === tab.id ? 'text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-white/20'} />
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="ml-auto flex items-center gap-8">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] italic animate-pulse">L9_SYNC_ACTIVE</span>
                    <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                        <Settings size={16} className="animate-spin-slow" />
                    </div>
                </div>
            </div>

            <div className="p-20 bg-white flex-grow relative overflow-hidden italic">
                <div className="absolute top-0 right-0 p-24 opacity-[0.03] pointer-events-none grayscale transform translate-x-20 -translate-y-20">
                    <Building size={600} className="text-slate-900" />
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 italic animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">
                        <section className="space-y-16">
                            <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-6 uppercase">
                                <Activity size={24} className="text-blue-600" />
                                <h3 className="text-[14px] font-black text-slate-950 tracking-[0.8em] italic">GLOBAL_ATTRIBUTE_MATRIX</h3>
                            </div>
                            <div className="space-y-12 pl-4 border-l-4 border-slate-50 italic">
                                <DetailItem label="Functional Node Type" value={asset.type.toUpperCase().replace(' ', '_')} icon={Building} />
                                <DetailItem label="Strategic Program Flux" value={asset.program.toUpperCase().replace(' ', '_')} icon={Sigma} />
                                <DetailItem label="Category Descriptor HEX" value={asset.assetCategoryCode.toUpperCase()} icon={HardHat} />
                                <DetailItem label="Mobilization Protocol" value={asset.mobilizationUse.toUpperCase().replace(' ', '_')} icon={Activity} />
                            </div>
                            <div className="p-10 bg-slate-950 border-2 border-slate-900 shadow-2xl relative overflow-hidden group/sync italic group cursor-crosshair">
                                <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
                                <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.2] transition-all transform group-hover:scale-150 duration-700">
                                    <RefreshCw size={80} className="text-blue-500 animate-spin-slow" />
                                </div>
                                <h4 className="text-blue-500 font-black text-[12px] uppercase tracking-[0.6em] mb-8 flex items-center gap-4">
                                    <RefreshCw size={20} className="text-blue-600 animate-spin" /> CEFMS_SIGNAL_LOCK
                                </h4>
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">AUTHENTICATION_STATE</span>
                                        <span className="text-emerald-500 font-mono tracking-tighter text-[14px] italic uppercase">SECURE_SYNCED</span>
                                    </div>
                                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">LAST_HANDSHAKE</span>
                                        <span className="text-white/80 font-mono tracking-tighter text-[14px] italic uppercase">2h_44m_AGO</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-16">
                            <div className="flex items-center gap-6 border-b-2 border-slate-300 pb-6 uppercase">
                                <MapPin size={24} className="text-blue-500" />
                                <h3 className="text-[14px] font-black text-slate-500 tracking-[0.8em] italic">SPATIAL_ASSET_TELEMETRY</h3>
                            </div>
                            <div className="space-y-12 pl-4 border-l-4 border-slate-50 italic">
                                <DetailItem label="Geospatial Index Vector" value={asset.location.toUpperCase().replace(',', '::')} icon={MapPin} />
                                <DetailItem label="Operational Footprint" value={`${asset.area.toLocaleString()} ${asset.unit.toUpperCase()}`} icon={Square} />
                                <div className="p-10 bg-white border-2 border-slate-100 shadow-2xl relative overflow-hidden group hover:border-slate-950 transition-all cursor-zoom-in h-64 flex flex-col justify-center items-center text-center">
                                     <div className="absolute inset-0 opacity-[0.05] grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none" style={{backgroundImage: 'url(https://picsum.photos/seed/satellite/1000/1000)', backgroundSize: 'cover'}} />
                                     <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-10 opacity-10" />
                                     <MapPin size={48} className="text-blue-600 mb-6 group-hover:scale-125 transition-transform duration-500 relative z-10" />
                                     <span className="text-[11px] font-black text-slate-950 uppercase tracking-[0.6em] italic mb-4 relative z-10 bg-white px-6 py-2 shadow-2xl">SATELLITE_VISUAL_VECTOR</span>
                                     <button className="text-[10px] font-black text-blue-600 underline underline-offset-8 uppercase tracking-[0.4em] hover:text-blue-800 transition-colors relative z-10 bg-white/80 backdrop-blur-sm px-4 py-2">INIT_GIS_DRONE_STREAM</button>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-16">
                            <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-6 uppercase">
                                <DollarSign size={24} className="text-emerald-500" />
                                <h3 className="text-[14px] font-black text-slate-950 tracking-[0.8em] italic">CAPITAL_OVERSIGHT_V3</h3>
                            </div>
                            <div className="space-y-12 pl-4 border-l-4 border-slate-50 italic">
                                <DetailItem label="Inception Registry Date" value={asset.acquisitionDate.toUpperCase()} icon={Calendar} isProtected={true} />
                                <div className="p-12 bg-slate-950 border-2 border-slate-900 shadow-[0_0_60px_rgba(37,99,235,0.15)] relative overflow-hidden group italic cursor-wait">
                                    <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
                                    <div className="absolute -right-4 -bottom-4 opacity-[0.05] group-hover:opacity-[0.1] transition-all">
                                        <DollarSign size={200} />
                                    </div>
                                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-emerald-500 mb-6 block leading-none">RECORDED_VALUATION_TRX_CORE</span>
                                    <span className="text-6xl font-black font-mono tracking-tight text-white leading-none italic group-hover:text-emerald-400 transition-colors select-all">${asset.cost.toLocaleString()}.00 <span className="text-[20px] text-emerald-500/40">USD</span></span>
                                </div>
                            </div>
                            <div className="p-12 bg-slate-100/30 border-2 border-slate-900 shadow-2xl relative overflow-hidden group mt-10 italic">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity transform translate-x-1/4 translate-y-1/4">
                                    <Lock size={200} className="text-slate-900" />
                                </div>
                                <h4 className="text-slate-950 font-black text-[13px] uppercase tracking-[0.6em] mb-8 flex items-center gap-6">
                                    <ShieldCheck size={24} className="text-emerald-600" /> MISSION_INTEGRITY_SHIELD
                                </h4>
                                <div className="space-y-4 border-l-4 border-slate-950 pl-10">
                                    <p className="text-slate-500 font-black text-[12px] leading-relaxed uppercase tracking-[0.1em] italic">
                                        Strategic financial record persistence is mathematically mandated for 75-year lifecycle trajectory. Any tampering will trigger immediate node isolation protocol :: [REQ_AUTH_9.2]
                                    </p>
                                    <div className="pt-6">
                                        <button className="text-[11px] font-black text-slate-950 uppercase tracking-[0.5em] italic flex items-center gap-4 hover:gap-8 transition-all">
                                            VERIFY_HOLOGRAPHIC_RECORD <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'components' && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 italic relative z-10">
                         <div className="flex justify-between items-center mb-16 italic">
                            <div className="flex items-center gap-6">
                                <HardHat size={32} className="text-blue-600" />
                                <h3 className="font-black text-slate-950 border-l-4 border-blue-600 pl-8 text-[16px] uppercase tracking-[0.8em] italic">Infrastructure Component Matrix V4.0</h3>
                            </div>
                            <button className="bg-slate-950 text-white flex items-center gap-6 px-12 py-5 h-auto text-[11px] font-black uppercase tracking-[0.4em] italic shadow-2xl hover:bg-blue-600 transition-all transform active:scale-95">
                                <Plus size={20} /> REGISTER_SYSTEM_COMPONENT
                            </button>
                        </div>
                        {!componentValidation.allowed && (
                            <div className="mb-16 p-10 bg-rose-950 border-2 border-rose-500 text-rose-100 text-[12px] font-black leading-relaxed flex items-center gap-10 shadow-2xl animate-pulse italic uppercase tracking-widest relative overflow-hidden">
                                <div className="absolute inset-0 bg-white opacity-[0.03] animate-ping" />
                                <div className="p-5 bg-white/10 rounded-none border-2 border-white/10 shadow-inner relative z-10"><AlertTriangle size={32} className="text-rose-400" /></div>
                                <div className="flex flex-col gap-2 relative z-10 flex-grow">
                                    <span className="text-rose-400 text-[16px] tracking-tighter font-black">CRITICAL_FISCAL_ASYMMETRY_CORE_LEAK</span>
                                    <p className="opacity-80 leading-tight">{componentValidation.reason.toUpperCase()}</p>
                                </div>
                                <div className="relative z-10">
                                    <button className="px-8 py-3 border-2 border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-white transition-all text-[10px] font-black">RECALIBRATE_VECTORS</button>
                                </div>
                            </div>
                        )}
                        <div className="pro-card overflow-hidden bg-white border-2 border-slate-950 shadow-2xl">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#0A0A0B] border-b-2 border-slate-900">
                                    <tr>
                                        <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">STRATEGIC_COMPONENT_NOMENCLATURE</th>
                                        <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">FUNCTION_CLASS</th>
                                        <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] text-right">CAPITAL_VALUATION_USD</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-slate-100">
                                    {asset.components?.map((c, idx) => (
                                        <tr key={c.id} className="group/row cursor-crosshair hover:bg-slate-950 transition-all duration-300">
                                            <td className="px-12 py-10 relative border-r-2 border-slate-50 group-hover/row:border-slate-800">
                                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 opacity-0 group-hover/row:opacity-100 transition-all transform -translate-x-full group-hover/row:translate-x-0" />
                                                <div className="font-black text-slate-950 group-hover/row:text-blue-400 transition-colors uppercase tracking-[0.02em] text-[15px] leading-none mb-3 italic">{c.name.replace(' ', '_')}</div>
                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] italic opacity-0 group-hover/row:opacity-100 transition-opacity">COMPONENT_SEQ_L{idx.toString().padStart(2, '0')}</span>
                                            </td>
                                            <td className="px-12 py-10 text-[12px] font-black text-slate-400 group-hover/row:text-white/60 uppercase tracking-[0.3em] border-r-2 border-slate-50 group-hover/row:border-slate-800 italic">{c.type.toUpperCase().replace(' ', '_')}</td>
                                            <td className="px-12 py-10 text-right bg-slate-50/10 group-hover/row:bg-slate-950 transition-all border-l-2 border-transparent group-hover/row:border-white/10">
                                                <div className="flex items-center justify-end gap-5 text-[18px] font-mono font-black text-slate-950 group-hover/row:text-emerald-400 tracking-tighter italic">
                                                    <DollarSign size={20} className="text-slate-300 opacity-40 group-hover/row:opacity-100 group-hover/row:animate-pulse" />
                                                    {c.cost.toLocaleString()}.00
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
                     <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 italic relative z-10">
                         <div className="flex items-center gap-8 mb-16 italic">
                            <div className="p-4 bg-emerald-600 text-white shadow-[0_0_40px_rgba(16,185,129,0.3)] transform -rotate-3">
                                <FileClock size={24} />
                            </div>
                            <h3 className="font-black text-slate-950 border-l-4 border-emerald-600 pl-10 text-[16px] uppercase tracking-[0.8em] italic leading-none">Strategic Instruments & Joint Vector Utilization</h3>
                            <div className="flex-grow h-1 bg-slate-100" />
                            <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-6 py-3 border-2 border-emerald-100 uppercase tracking-[0.4em] italic shadow-inner select-none">DATA_LOCKED::ACTIVE_LIVE_GRANTS</span>
                         </div>
                         <div className="pro-card overflow-hidden bg-white border-2 border-slate-950 shadow-2xl">
                             <table className="w-full text-left border-collapse font-black">
                                 <thead className="bg-[#0A0A0B] border-b-2 border-slate-900">
                                     <tr>
                                        <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">AUTHORIZED_GRANTEE_NODE</th>
                                        <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">INSTRUMENT_PROFILE</th>
                                        <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5 uppercase">TERMINATION_VECTOR</th>
                                        <th className="px-12 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] text-right uppercase">ANNUAL_REVENUE_STREAM_USD</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y-2 divide-slate-100">
                                     {USACE_OUTGRANTS.filter(og => og.assetId === asset.id).map((og, idx) => (
                                         <tr key={og.id} className="group/row cursor-crosshair hover:bg-slate-950 transition-all duration-300">
                                             <td className="px-12 py-10 relative border-r-2 border-slate-50 group-hover/row:border-slate-800">
                                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-600 opacity-0 group-hover/row:opacity-100 transition-all" />
                                                <div className="font-black text-slate-950 group-hover/row:text-blue-400 transition-colors uppercase tracking-[0.02em] text-[15px] leading-none mb-3 italic">{og.grantee.toUpperCase().replace(' ', '_')}</div>
                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] italic opacity-0 group-hover/row:opacity-100 transition-opacity">INSTRUMENT_ID_TRX_{idx.toString().padStart(3, '0')}</span>
                                             </td>
                                             <td className="px-12 py-10 text-[12px] font-black text-slate-400 group-hover/row:text-white/60 uppercase tracking-[0.3em] border-r-2 border-slate-50 group-hover/row:border-slate-800 italic">{og.type.toUpperCase().replace(' ', '_')}</td>
                                             <td className="px-12 py-10 border-r-2 border-slate-50 group-hover/row:border-slate-800">
                                                 <div className="flex items-center gap-4 text-slate-950 font-black font-mono text-[13px] group-hover/row:text-blue-300 transition-colors italic tracking-widest leading-none">
                                                     <Calendar size={18} className="opacity-40 group-hover/row:animate-pulse" />
                                                     {og.endDate.toUpperCase()}
                                                 </div>
                                             </td>
                                             <td className="px-12 py-10 text-right bg-slate-50/10 group-hover/row:bg-slate-950 transition-all border-l-2 border-transparent group-hover/row:border-white/10">
                                                 <div className="flex items-center justify-end gap-5 text-[18px] font-mono font-black text-emerald-600 group-hover/row:text-emerald-400 transition-colors italic tracking-tighter">
                                                     <DollarSign size={20} className="text-slate-300 opacity-40 group-hover/row:opacity-100" />
                                                     {og.revenue.toLocaleString()}.00
                                                 </div>
                                             </td>
                                         </tr>
                                     ))}
                                     {USACE_OUTGRANTS.filter(og => og.assetId === asset.id).length === 0 && (
                                         <tr>
                                             <td colSpan={4} className="px-12 py-40 text-center bg-slate-50/30 italic">
                                                 <div className="flex flex-col items-center gap-8 text-slate-950 opacity-20 transform hover:scale-110 transition-transform cursor-not-allowed">
                                                     <ShieldCheck size={100} className="animate-pulse" />
                                                     <p className="font-black uppercase tracking-[1em] text-[16px] italic leading-none">NO_ACTIVE_STRATEGIC_INSTRUMENTS_DETECTED</p>
                                                     <p className="text-[10px] tracking-[0.4em] opacity-40">SIGNAL_STREAM_NULL_VECTOR_0x00FE</p>
                                                 </div>
                                             </td>
                                         </tr>
                                     )}
                                 </tbody>
                             </table>
                         </div>
                     </div>
                )}

                {activeTab === 'financials' && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 italic relative z-10">
                        <div className="flex items-center gap-8 mb-16 italic">
                            <DollarSign size={32} className="text-emerald-600" />
                            <h3 className="font-black text-slate-950 border-l-4 border-blue-600 pl-10 text-[16px] uppercase tracking-[0.8em] italic leading-none">Command Financial Registry & Appropriated Vector Mapping</h3>
                            <div className="flex-grow h-1 bg-slate-100" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                            <div className="pro-card p-12 bg-white border-2 border-slate-950 shadow-2xl relative overflow-hidden group italic transition-all hover:border-blue-600 cursor-crosshair">
                                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex justify-between items-center mb-12 relative z-10">
                                    <h4 className="text-[14px] font-black text-slate-950 uppercase tracking-[0.6em] italic leading-none border-l-2 border-blue-600 pl-6">Fiscal Appropriation Mapping</h4>
                                    <div className="text-[10px] font-black text-blue-600 font-mono tracking-tighter italic px-4 py-2 bg-blue-50 border-2 border-blue-100 uppercase shadow-lg">TRACE_VECTOR_0x889A_DELTA</div>
                                </div>
                                <div className="space-y-12 relative z-10">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end mb-3">
                                            <span className="text-[13px] font-black text-slate-700 uppercase tracking-tight italic">O&M_CIVIL_WORKS_CORE</span>
                                            <span className="text-[18px] font-black text-slate-950 font-mono tracking-tighter italic leading-none">$125,000.00</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-4 rounded-none overflow-hidden border-2 border-slate-200 p-0.5">
                                            <div className="h-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.6)] animate-pulse" style={{width: '65%'}}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end mb-3">
                                            <span className="text-[13px] font-black text-slate-700 uppercase tracking-tight italic">MR&R_STRATEGIC_RESERVE_ALPHA</span>
                                            <span className="text-[18px] font-black text-slate-950 font-mono tracking-tighter italic leading-none">$85,450.00</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-4 rounded-none overflow-hidden border-2 border-slate-200 p-0.5">
                                            <div className="h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-pulse" style={{width: '42%'}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 text-[9px] font-black text-slate-400 uppercase tracking-[0.6em] flex items-center gap-4 italic opacity-40">
                                    <ShieldCheck size={14} /> PERSISTENCE_VALIDATION_ACTIVE_STREAM
                                </div>
                            </div>
                            <div className="pro-card p-12 bg-slate-950 border-2 border-slate-950 shadow-[0_0_80px_rgba(0,0,0,0.2)] relative overflow-hidden group flex flex-col justify-center cursor-pointer active:scale-95 transition-transform">
                                 <div className="absolute inset-0 opacity-[0.05] pointer-events-none group-hover:opacity-[0.1] transition-opacity transform group-hover:scale-150 duration-700" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
                                 <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-[0.2] transition-all transform group-hover:rotate-12 duration-700">
                                    <DollarSign size={240} className="text-white" />
                                </div>
                                <h4 className="text-blue-500 text-[14px] font-black uppercase tracking-[0.8em] mb-10 relative z-10 italic leading-none border-l-4 border-blue-600 pl-8">AGGREGATE_LIABILITY_POSITION</h4>
                                <div className="text-white text-8xl font-black tracking-tighter font-mono mb-12 relative z-10 italic leading-none group-hover:text-blue-400 transition-colors transform group-hover:scale-110 origin-left duration-500">$2.45<span className="text-blue-600 opacity-60">M</span></div>
                                <button onClick={() => navigate('/usace/finance')} className="text-[12px] font-black text-white/50 uppercase tracking-[0.6em] hover:text-white flex items-center gap-8 transition-all relative z-10 italic group/btn group-hover:gap-12">
                                    OPEN_COMMAND_FISCAL_CONSOLE <ArrowRight size={24} className="group-hover/btn:translate-x-4 transition-transform text-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'insurance' && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 italic relative z-10">
                        <div className="flex items-center gap-8 mb-16 italic">
                            <ShieldCheck size={32} className="text-emerald-600" />
                            <h3 className="font-black text-slate-950 border-l-4 border-amber-600 pl-10 text-[16px] uppercase tracking-[0.8em] italic leading-none">Joint Compliance Verification & Instrument Integrity Protocol</h3>
                            <div className="flex-grow h-1 bg-slate-100" />
                        </div>
                        <div className="pro-card p-16 bg-white border-2 border-slate-950 shadow-[0_0_80px_rgba(0,0,0,0.15)] flex flex-col lg:flex-row items-center gap-16 group hover:border-emerald-600 transition-all cursor-pointer relative overflow-hidden active:scale-[0.98]">
                            <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="p-12 bg-slate-950 rounded-none text-white shadow-[0_0_50px_rgba(16,185,129,0.3)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 relative z-10">
                                <ShieldCheck size={64} className="text-emerald-400 pulse-mission" />
                            </div>
                            <div className="relative z-10 flex-grow">
                                <div className="flex items-center gap-8 mb-6">
                                    <p className="text-[14px] font-black text-emerald-600 uppercase tracking-[0.8em] italic leading-none">COMPLIANCE_STATE::OPTIMAL_L9_SECURE</p>
                                    <div className="flex-grow h-px bg-emerald-200 opacity-40 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                                <h4 className="text-4xl font-black text-slate-950 tracking-tighter uppercase leading-none italic mb-8 select-none">Instrument Coverage Protocol Fully Verified</h4>
                                <div className="space-y-6 mb-12">
                                    <p className="text-slate-500 text-[16px] font-black leading-relaxed max-w-3xl uppercase tracking-tighter border-l-4 border-slate-950 pl-10 italic bg-slate-50/50 py-6 pr-6">
                                        All outgrantee certificates have been synchronized and authenticated against <span className="text-blue-600 font-mono">EM_385_1_1_L6</span> requirements. General Liability coverage exceeds $1.0M aggregate minimum threshold matrix validated by <span className="text-emerald-600">CMD_CORE_ENGINE</span>.
                                    </p>
                                </div>
                                <div className="flex gap-8">
                                     <button onClick={() => navigate('/usace/insurance')} className="bg-slate-950 text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.6em] italic shadow-2xl hover:bg-emerald-600 transition-all transform active:translate-y-1">AUDIT_PROTOCOL_L9_CORE</button>
                                     <button className="border-2 border-slate-950 text-slate-950 px-12 py-5 text-[11px] font-black uppercase tracking-[0.6em] italic shadow-xl hover:bg-slate-50 transition-all transform active:translate-y-1 group/btn">
                                        EXTRACT_PROOF_VECTOR <ArrowUpRight size={18} className="inline ml-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                     </button>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-12 opacity-[0.02] transform rotate-45 translate-x-1/2 translate-y-1/2">
                                <ShieldCheck size={300} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'history' && (
                     <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 italic relative z-10">
                          <div className="flex items-center gap-8 mb-16 italic">
                             <h3 className="font-black text-slate-950 border-l-4 border-blue-600 pl-10 text-[16px] uppercase tracking-[0.8em] italic leading-none">Strategic Asset Lifecycle & Command Audit Trace</h3>
                             <div className="flex-grow h-1 bg-slate-100" />
                             <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-6 py-3 border-2 border-blue-100 uppercase tracking-[0.4em] italic shadow-inner select-none">DATA_PROTOCOL::IMMUTABLE_ENCRYPTED_LOG</span>
                          </div>
                          <div className="space-y-0 relative before:absolute before:inset-0 before:left-[19px] before:w-1 before:bg-slate-100 ml-1">
                             {asset.history?.map((event, i) => (
                                 <div key={i} className="flex gap-20 relative group/event mb-px">
                                     <div className="flex-shrink-0 mt-4 leading-none">
                                         <div className={`w-10 h-10 rounded-none ring-8 ${i === 0 ? 'bg-blue-600 ring-blue-50' : 'bg-white ring-slate-50 border-2 border-slate-200'} z-10 relative shadow-2xl transition-all group-hover/event:scale-125 group-hover/event:rotate-45 flex items-center justify-center cursor-help`}>
                                             {i === 0 ? <Clock size={20} className="text-white" /> : <div className="w-3 h-3 bg-slate-300 rounded-none" />}
                                         </div>
                                     </div>
                                     <div className="flex-1 pb-24 last:pb-0">
                                         <div className="p-12 bg-white border-2 border-slate-100 group-hover/event:border-slate-950 group-hover/event:bg-slate-50 transition-all shadow-xl hover:shadow-2xl relative overflow-hidden italic uppercase tracking-tighter">
                                             <div className="absolute top-0 right-0 px-8 py-3 bg-slate-950 text-white text-[10px] font-black tracking-[0.4em] transform translate-x-2 -translate-y-2 opacity-0 group-hover/event:opacity-100 group-hover/event:translate-x-0 group-hover/event:translate-y-0 transition-all">EVENT_ID_0x{i.toString(16).padStart(4, '0')}</div>
                                             <div className="flex flex-wrap items-center justify-between gap-10 mb-10 border-b-2 border-slate-100 pb-8">
                                                 <div className="flex items-center gap-5 text-[11px] font-black text-slate-950 font-mono tracking-widest bg-white px-6 py-3 rounded-none border-2 border-slate-950 shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
                                                     <Calendar size={16} className="text-blue-600 animate-pulse" />
                                                     {event.timestamp.toUpperCase()}
                                                 </div>
                                                 <span className={`text-[11px] px-6 py-3 rounded-none font-black uppercase tracking-[0.4em] shadow-xl italic border-2 transition-colors ${i === 0 ? 'bg-slate-950 text-blue-400 border-slate-800' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>{event.action.toUpperCase().replace(' ', '_')}</span>
                                             </div>
                                             <div className="mb-10 pl-8 border-l-4 border-blue-600">
                                                <p className="font-black text-slate-950 text-[16px] mb-2 uppercase tracking-tighter italic leading-none">COMMAND_EXECUTION_BY_NODE</p>
                                                <p className="text-blue-600 text-[13px] font-black uppercase tracking-[0.2em] font-mono select-all">Personnel::{event.user.replace(' ', '_').toUpperCase()} <ArrowUpRight size={14} className="inline ml-2 opacity-40" /></p>
                                             </div>
                                             {event.details && (
                                                 <div className="p-10 bg-slate-950 text-white/80 rounded-none border-l-4 border-emerald-500 text-[13px] font-mono font-black tracking-tight leading-relaxed shadow-inner">
                                                     <div className="text-[10px] text-white/30 mb-4 tracking-[0.4em]">DECODED_EVENT_DETAILS::</div>
                                                     "{event.details.toUpperCase()}"
                                                 </div>
                                             )}
                                         </div>
                                     </div>
                                 </div>
                             ))}
                          </div>
                          <div className="mt-20 p-12 bg-slate-950 border-2 border-slate-900 shadow-[0_0_60px_rgba(0,0,0,0.3)] flex items-center justify-between italic group cursor-wait active:scale-[0.99] transition-all">
                             <div className="flex items-center gap-8 text-white/60">
                                 <Settings size={28} className="text-blue-500 animate-spin-slow" />
                                 <div className="flex flex-col gap-1">
                                    <span className="text-[12px] font-black uppercase tracking-[0.6em] text-white">Audit Tracking Stream :: Operational</span>
                                    <span className="text-[10px] font-mono text-white/20 tracking-[0.2em] uppercase">TAMPER_EVIDENT_TRACE_P75_ENCRYPTED</span>
                                 </div>
                             </div>
                             <button className="bg-white text-slate-950 px-10 py-4 text-[11px] font-black uppercase tracking-[0.6em] hover:bg-blue-600 hover:text-white transition-all italic border-2 border-white shadow-xl active:translate-y-1">ACCESS_MASTER_COMMAND_LOG</button>
                          </div>
                     </div>
                )}
            </div>
            
            <div className="px-12 py-10 bg-slate-950 border-t-2 border-white/5 flex justify-between items-center text-[12px] font-black uppercase tracking-[0.8em] italic text-white/30 shadow-inner">
                <div className="flex items-center gap-6">
                    <CheckCircle size={18} className="text-emerald-500 animate-pulse" />
                    <span className="flex items-center gap-4">
                        VALUATION_INTEGRITY_SHIELD_V4.6 <span className="w-2 h-2 bg-emerald-500 rotate-45" /> STATUS::SECURE_ENCRYPTED_L9
                    </span>
                </div>
                <div className="flex items-center gap-6 divide-x divide-white/5">
                    <span className="font-mono text-white/10 tracking-[0.4em] uppercase text-[10px] pr-8">TRACE_NODE::ASSET_CMD_PROF_8820X</span>
                    <span className="font-black text-blue-500 pl-8 select-none">SYST_READY</span>
                </div>
            </div>
        </div>
    </div>
    );
};