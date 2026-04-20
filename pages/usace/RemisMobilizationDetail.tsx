import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_MOBILIZATION_DATA, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Siren, Calendar, ShieldCheck, CheckCircle, Lock, Building, FileText, Activity, Layers, Target } from 'lucide-react';
import { MobilizationProfile, AuditEvent } from '../../types';
import { MobilizationModal } from './components/MobilizationModal';

const LIFECYCLE_STATES: MobilizationProfile['lifecycleState'][] = ['Identified', 'Validated', 'Ready', 'Activated', 'Deactivated', 'Archived'];

export const RemisMobilizationDetail: React.FC = () => {
    const { profileId } = useParams<{ profileId: string }>();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<MobilizationProfile | undefined>(USACE_MOBILIZATION_DATA.find(p => p.id === profileId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!profile) {
        return <div className="p-6">Mobilization profile not found. <Link to="/usace/mobilization" className="text-blue-600">Return to Dashboard</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === profile.assetId);

    const handleSave = (updatedRecord: Partial<MobilizationProfile>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Major Mobilize', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setProfile(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: MobilizationProfile['lifecycleState']) => {
        // 10.7.4 - Prevent activation without readiness
        if (newState === 'Activated' && profile.lifecycleState !== 'Ready') {
            alert('Compliance Error (10.7.4): Cannot Activate without prior Readiness state.');
            return;
        }
        // 10.7.2 - Enforce valid transitions
        if (newState === 'Ready' && profile.lifecycleState !== 'Validated' && profile.lifecycleState !== 'Deactivated') {
             alert('Error: Asset must be Validated before becoming Ready.');
             return;
        }

        const reason = `Lifecycle state advanced from ${profile.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'District Commander', 
            action: 'State Transition',
            details: reason,
        };
        setProfile(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(profile.lifecycleState);

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            <MobilizationModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} profile={profile} />
            <div className="border-b border-slate-200 pb-6">
                <button onClick={() => navigate('/usace/mobilization')} className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-blue-600 mb-4 transition-colors uppercase tracking-[0.2em] italic"><ArrowLeft size={14} /> Back to Mobilization Command</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-3 bg-slate-950 rounded shadow-xl shadow-black/20 text-white">
                            <Siren size={32} className="animate-pulse text-red-500" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">Asset Readiness: {asset?.name}</h1>
                                <div className="pulse-mission" />
                                <span className={`text-[9px] font-black px-2.5 py-1 rounded-sm border uppercase tracking-widest italic leading-none shadow-sm ${profile.missionCriticality === 'Mission Critical' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                    PRIORITY::{profile.missionCriticality.replace(' ', '_').toUpperCase()}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 mt-2 italic">
                                <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-tighter">PROFILE_ID::{profile.id}</span>
                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-tighter">NODE_ID::{asset?.rpuid}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end mr-4 group cursor-help">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Lifecycle State</span>
                            <span className={`text-xs font-black px-3 py-1 uppercase tracking-widest leading-none border shadow-sm ${profile.lifecycleState === 'Activated' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-900 border-slate-800 text-white'}`}>
                                {profile.lifecycleState}
                            </span>
                        </div>
                        <button onClick={() => setIsEditModalOpen(true)} className="btn-pro-secondary flex items-center gap-2 px-4 py-2 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                            <Edit size={14} className="group-hover:text-blue-500" /> Modify Readiness Matrix
                        </button>
                        <RegulatoryBadge refs={['ER 405-1-12', 'V2.4']} />
                    </div>
                </div>
            </div>

            <div className="pro-card flex flex-col bg-white overflow-hidden shadow-2xl border-slate-200">
                <div className="px-6 border-b border-white/5 bg-[#0A0A0B]">
                    <nav className="-mb-px flex gap-10" aria-label="Tabs">
                        {[
                            { id: 'overview', label: 'Tactical Readiness Overview' },
                            { id: 'lifecycle', label: 'Command Lifecycle Management' },
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
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 italic">Operational Capacity Matrix</h3>
                                <div className="space-y-4">
                                    <DetailItem label="Tactical Facility Type" value={profile.facilityType} icon={Building} />
                                    <DetailItem label="Functional Cap. Level" value={profile.functionalCapability} icon={Activity} />
                                    <DetailItem label="Condition Index (CI)" value={`${profile.condition}/100 PRC`} icon={Layers} />
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 italic">Contingency Support Data</h3>
                                <div className="space-y-4">
                                    <DetailItem label="Strategic Plan ID" value={profile.contingencyPlanId || 'UNSET'} icon={FileText} />
                                    <DetailItem label="Global Designation" value={profile.readinessDesignation} icon={Target} />
                                    <DetailItem label="Operational Req. ID" value={profile.operationalRequirement || 'N/A'} icon={Siren} />
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 italic">Command Administrative</h3>
                                <div className="space-y-4">
                                    <DetailItem label="Initiating Command" value={profile.initiatingOrg} icon={Building} />
                                    <DetailItem label="Protocol Initiation" value={profile.initiationDate} icon={Calendar} />
                                    <DetailItem label="Last Calibration" value={profile.lastUpdatedDate} icon={Calendar} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lifecycle' && (
                        <div className="space-y-8">
                            <div className="pro-card p-6 bg-slate-50 border-slate-200 flex justify-between items-center shadow-md">
                                <div className="flex items-center gap-6">
                                    <div className="p-4 bg-slate-950 rounded shadow-md text-white">
                                        <Target size={24} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic">ACTIVE_PROTOCOL_STATE</h3>
                                        <p className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">{profile.lifecycleState}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Authenticated Official: {profile.responsibleOfficial}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                        <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="btn-pro-primary py-2 px-6 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                                            Advance to {LIFECYCLE_STATES[currentStateIndex + 1]}
                                        </button>
                                    )}
                                    {profile.lifecycleState === 'Activated' && (
                                        <button onClick={() => handleStateTransition('Deactivated')} className="bg-red-600 text-white py-2 px-6 h-auto text-[10px] font-black uppercase tracking-widest italic hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 rounded-sm">
                                            Emergency Deactivation
                                        </button>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] italic mb-6 border-b border-slate-100 pb-3 mt-12">Readiness Progression Matrix</h3>
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
                            <div className="mt-12 p-4 bg-blue-50 border-l-4 border-blue-600 rounded-sm flex items-center gap-4 italic shadow-sm">
                                <ShieldCheck size={18} className="text-blue-600" />
                                <p className="text-[10px] font-black text-blue-800 uppercase tracking-tight">Compliance Statement: State transitions are synchronized with the Integrated Readiness Hub and the Strategic Command Authority.</p>
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
                                    <Lock size={12} className="text-slate-300" /> Immutable Integrity Check Status::LOGGED_10.8
                                </div>
                            </div>
                            <div className="space-y-6 pt-2 pl-4 border-l-2 border-slate-100">
                                {(profile.history || []).map((event, i) => (
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
                        <CheckCircle size={14} className="text-emerald-400" />
                        Mobilization Integrity Protocol (PRC_G2.2) Verified & Command Authenticated
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
    );
};