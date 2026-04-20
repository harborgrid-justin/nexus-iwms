import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_PERMITS, USACE_ASSETS, DOCUMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, FileText, Calendar, ShieldCheck, CheckCircle, Lock, Building, Users, MapPin, Scale } from 'lucide-react';
import { Permit, AuditEvent } from '../../types';
import { PermitModal } from './components/PermitModal';

const LIFECYCLE_STATES: Permit['lifecycleState'][] = ['Drafted', 'Submitted', 'Under Review', 'Issued', 'Active', 'Expired', 'Closed', 'Archived'];

export const RemisPermitDetail: React.FC = () => {
    const { permitId } = useParams<{ permitId: string }>();
    const navigate = useNavigate();
    const [permit, setPermit] = useState<Permit | undefined>(USACE_PERMITS.find(p => p.id === permitId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!permit) {
        return <div className="p-6">Permit record not found. <Link to="/usace/permits" className="text-blue-600">Return to Dashboard</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === permit.assetId);
    const relatedDocs = DOCUMENTS.filter(d => permit.documentIds.includes(d.id));

    const handleSave = (updatedRecord: Partial<Permit>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Reggie Permit', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setPermit(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: Permit['lifecycleState']) => {
        // 13.7.4 Prevent activation without issuance dates
        if (newState === 'Active' && (!permit.issueDate || !permit.effectiveDate)) {
            alert('Compliance Error (13.7.4): Cannot Activate permit without Issue Date and Effective Date.');
            return;
        }

        const reason = `Lifecycle state advanced from ${permit.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'District Commander', 
            action: 'State Transition',
            details: reason,
        };
        setPermit(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(permit.lifecycleState);

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            <PermitModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} permit={permit} />
            <div className="border-b border-slate-200 pb-6">
                <button onClick={() => navigate('/usace/permits')} className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-blue-600 mb-4 transition-colors uppercase tracking-[0.2em] italic"><ArrowLeft size={14} /> Back to Permit Command Hub</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-3 bg-slate-950 rounded shadow-xl shadow-black/20 text-white">
                            <Scale size={32} className="text-blue-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">Permit Protocol: {permit.uniqueIdentifier}</h1>
                                <div className="pulse-mission" />
                                <span className="text-[10px] font-black px-2.5 py-1 bg-slate-900 text-white rounded-sm uppercase tracking-widest italic shadow-sm">
                                    {permit.type.replace(' ', '_')}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 mt-2 italic">
                                <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-tighter">PERMIT_ID::{permit.id}</span>
                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-tighter">ASSET_NODE::{asset?.rpuid}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end mr-4 group cursor-help">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Lifecycle State</span>
                            <span className="text-xs font-black px-3 py-1 uppercase tracking-widest leading-none border shadow-sm bg-slate-900 border-slate-800 text-white">
                                {permit.lifecycleState}
                            </span>
                        </div>
                        <button onClick={() => setIsEditModalOpen(true)} className="btn-pro-secondary flex items-center gap-2 px-4 py-2 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                            <Edit size={14} className="group-hover:text-blue-500" /> Modify Regulatory Schema
                        </button>
                        <RegulatoryBadge refs={['ER 405-1-12', 'Sec 13']} />
                    </div>
                </div>
            </div>

            <div className="pro-card flex flex-col bg-white overflow-hidden shadow-2xl border-slate-200">
                <div className="px-6 border-b border-white/5 bg-[#0A0A0B]">
                    <nav className="-mb-px flex gap-10" aria-label="Tabs">
                        {[
                            { id: 'overview', label: 'Statutory Overview' },
                            { id: 'parties', label: 'Entity Control Matrix' },
                            { id: 'lifecycle', label: 'Procedural Lifecycle' },
                            { id: 'history', label: 'Immutable Audit Ledger' }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)} 
                                className={`shrink-0 border-b-2 px-1 py-5 text-[10px] font-black uppercase tracking-[0.3em] transition-all italic ${activeTab === tab.id ? 'border-blue-600 text-blue-400 opacity-100' : 'border-transparent text-white/30 hover:text-white/60 hover:border-white/10'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-8">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 italic">Authority & Asset Alignment</h3>
                                <div className="space-y-4">
                                    <DetailItem label="Strategic Asset" value={asset?.name} icon={Building} />
                                    <DetailItem label="Legal Authority" value={permit.authority} icon={Scale} />
                                    <DetailItem label="Permit Schematic" value={permit.type} icon={FileText} />
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 italic">Temporal Compliance Benchmarks</h3>
                                <div className="space-y-4">
                                    <DetailItem label="Issuance Epoch" value={permit.issueDate || 'PENDING'} icon={Calendar} />
                                    <DetailItem label="Effective Protocol" value={permit.effectiveDate || 'PENDING'} icon={CheckCircle} />
                                    <DetailItem label="Expiration Deadline" value={permit.expirationDate || 'N/A'} icon={Calendar} />
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 italic">Regulatory Disclosure</h3>
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm italic shadow-inner">
                                    <p className="text-[11px] font-black text-slate-700 uppercase tracking-tight leading-relaxed">{permit.description}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'parties' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 italic">
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Users size={16} className="text-blue-500" /> Authorized Permit Stakeholders
                                </h3>
                            </div>
                            <div className="pro-card border-slate-200 overflow-hidden shadow-md">
                                <table className="w-full text-left">
                                    <thead className="bg-[#1A1B1E] border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic">ENTITY_ROLE</th>
                                            <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic">LEGAL_IDENTITY</th>
                                            <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic">COMMS_CHANNEL</th>
                                            <th className="px-6 py-4 pro-col-header text-white uppercase tracking-widest italic text-right">VECTOR_ID</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {permit.parties.map((p, idx) => (
                                            <tr key={idx} className="pro-data-row group">
                                                <td className="px-6 py-5">
                                                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-100 uppercase tracking-widest italic">
                                                        {p.role.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 font-black text-slate-900 text-[12px] uppercase tracking-tight italic group-hover:text-blue-600 transition-colors">{p.name}</td>
                                                <td className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-tighter italic">{p.email || 'NULL'}</td>
                                                <td className="px-6 py-5 text-right font-mono text-[11px] font-black text-slate-400 group-hover:text-slate-900 transition-colors uppercase italic">{p.phone || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mt-12 italic">
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <MapPin size={16} className="text-blue-500" /> Jurisdictional Address Matrix
                                </h3>
                            </div>
                            <div className="pro-card border-slate-200 overflow-hidden shadow-md">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">LOC_TYPE</th>
                                            <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">PHYSICAL_STREET_VECTOR</th>
                                            <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">GEOGRAPHIC_NODE</th>
                                            <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic text-right">ZONAL_CODE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {permit.addresses.map((a, idx) => (
                                            <tr key={idx} className="pro-data-row group">
                                                <td className="px-6 py-5 font-black text-slate-600 text-[11px] uppercase tracking-widest italic">{a.type.toUpperCase()}</td>
                                                <td className="px-6 py-5 font-black text-slate-900 text-[12px] uppercase tracking-tight italic">{a.addressLine1}</td>
                                                <td className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-tighter italic">{a.city}, {a.state}</td>
                                                <td className="px-6 py-5 text-right font-mono text-[11px] font-black text-blue-600 group-hover:text-blue-900 transition-colors uppercase italic tracking-tighter">{a.zip}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lifecycle' && (
                        <div className="space-y-8">
                            <div className="pro-card p-6 bg-slate-50 border-slate-200 flex justify-between items-center shadow-md italic">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-slate-950 rounded shadow-md text-white">
                                        <Activity size={24} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">ACTIVE_PROTOCOL_STATE</h3>
                                        <p className="text-xl font-black text-slate-900 uppercase tracking-tighter">{permit.lifecycleState}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 leading-none">STRATEGIC_STATUS::{permit.status.toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                        <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="btn-pro-primary py-2 px-6 h-auto text-[10px] font-black uppercase tracking-widest italic group transition-all active:scale-[0.98]">
                                            ELEVATE_TO:: {LIFECYCLE_STATES[currentStateIndex + 1]}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] italic mb-6 border-b border-slate-100 pb-3 mt-12">Regulatory Progression Matrix</h3>
                            <div className="flex items-center justify-between px-10 pt-4 overflow-x-auto">
                                {LIFECYCLE_STATES.map((state, i) => (
                                    <React.Fragment key={state}>
                                        <div className="flex flex-col items-center group cursor-help relative min-w-[120px]">
                                            <div className={`w-10 h-10 rounded-sm flex items-center justify-center border-2 transition-all shadow-sm ${i <= currentStateIndex ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white border-slate-200 text-slate-300'}`}>
                                                {i < currentStateIndex ? <CheckCircle size={18}/> : <span className="text-[13px] font-black font-mono tracking-tighter">{i+1}</span>}
                                            </div>
                                            <p className={`text-[9px] mt-4 text-center font-black uppercase tracking-widest italic transition-colors ${i <= currentStateIndex ? 'text-blue-700' : 'text-slate-400'}`}>{state}</p>
                                            {i === currentStateIndex && <div className="absolute -top-1 w-full flex justify-center"><div className="w-1 h-1 bg-blue-600 rounded-full pulse-mission" /></div>}
                                        </div>
                                        {i < LIFECYCLE_STATES.length - 1 && (
                                            <div className="flex-1 px-4 min-w-[60px]">
                                                <div className={`h-[1px] ${i < currentStateIndex ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]' : 'bg-slate-200'}`} />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 italic">
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <FileText size={14} className="text-blue-500" /> Strategic Audit Journal
                                </h3>
                                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 tracking-widest uppercase italic">
                                    <Lock size={12} className="text-slate-300" /> Immutable Integrity Check Status::LOGGED_13.8
                                </div>
                            </div>
                            <div className="space-y-6 pt-2 pl-4 border-l-2 border-slate-100">
                                {(permit.history || []).map((event, i) => (
                                    <div key={i} className="flex gap-8 relative group">
                                         <div className="absolute -left-[11px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 transition-all group-hover:border-blue-400">
                                            <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                                        </div>
                                        <div className="pro-card p-4 bg-slate-50 border-slate-200 group-hover:border-blue-200 flex-1 transition-all shadow-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-[9px] font-black text-slate-400 font-mono tracking-tighter uppercase italic">{event.timestamp}</p>
                                                <span className="text-[8px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-sm uppercase tracking-widest italic">{event.action}</span>
                                            </div>
                                            <p className="font-black text-slate-900 text-[11px] uppercase tracking-tight leading-none mb-2 text-blue-900">CMD_OFFICER::{event.user}</p>
                                            {event.details && <p className="text-[10px] text-slate-500 italic mt-2 border-t border-slate-200 pt-2 leading-relaxed">{event.details}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="px-6 py-5 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] italic">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={14} className="text-emerald-400" />
                        Regulatory Compliance Protocol (STAT_R13) Verified & Authenticated
                    </div>
                    <div className="text-white/20 font-mono tracking-tighter">SEC_VALID_NODE_SIG::CMD_DISTRICT</div>
                </div>
            </div>
        </div>
            </div>
        </div>
    );
};