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
        <div className="space-y-6">
            <MobilizationModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} profile={profile} />
            <div>
                <button onClick={() => navigate('/usace/mobilization')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Dashboard</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">Mobilization: {asset?.name}</h1>
                            <span className={`text-xs px-2 py-1 rounded-full font-bold border ${profile.missionCriticality === 'Mission Critical' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-slate-100 text-slate-800 border-slate-200'}`}>{profile.missionCriticality}</span>
                        </div>
                        <p className="text-slate-500 font-mono">{profile.id} • Asset: {asset?.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${profile.lifecycleState === 'Activated' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>{profile.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Update Readiness</button>
                        <RegulatoryBadge refs={['10']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Readiness Overview</button>
                        <button onClick={() => setActiveTab('lifecycle')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'lifecycle' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Lifecycle Management</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Audit & Compliance</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Operational Capacity</h3>
                                <DetailItem label="Facility Type" value={profile.facilityType} icon={Building} />
                                <DetailItem label="Functional Cap." value={profile.functionalCapability} icon={Activity} />
                                <DetailItem label="Condition" value={`${profile.condition}/100`} icon={Layers} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Contingency Data</h3>
                                <DetailItem label="Plan ID" value={profile.contingencyPlanId || 'None'} icon={FileText} />
                                <DetailItem label="Designation" value={profile.readinessDesignation} icon={Target} />
                                <DetailItem label="Req. ID" value={profile.operationalRequirement || 'N/A'} icon={Siren} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Administrative</h3>
                                <DetailItem label="Initiating Org" value={profile.initiatingOrg} icon={Building} />
                                <DetailItem label="Initiation Date" value={profile.initiationDate} icon={Calendar} />
                                <DetailItem label="Last Updated" value={profile.lastUpdatedDate} icon={Calendar} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'lifecycle' && (
                        <div>
                            <div className="bg-slate-50 p-5 rounded-xl border mb-8 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Current State: {profile.lifecycleState}</h3>
                                    <p className="text-sm text-slate-600 mt-1">Responsible Official: {profile.responsibleOfficial}</p>
                                </div>
                                <div className="flex gap-2">
                                    {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                        <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                                            Advance to {LIFECYCLE_STATES[currentStateIndex + 1]}
                                        </button>
                                    )}
                                    {profile.lifecycleState === 'Activated' && (
                                        <button onClick={() => handleStateTransition('Deactivated')} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium text-sm shadow-sm">
                                            Deactivate
                                        </button>
                                    )}
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-800 mb-6">State Progression</h3>
                            <div className="flex items-center overflow-x-auto pb-4">
                                {LIFECYCLE_STATES.map((state, i) => (
                                    <React.Fragment key={state}>
                                        <div className="flex flex-col items-center min-w-[80px]">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${i <= currentStateIndex ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>
                                                {i < currentStateIndex ? <CheckCircle size={16}/> : <span className="text-xs font-bold">{i+1}</span>}
                                            </div>
                                            <p className={`text-xs mt-2 text-center font-medium ${i <= currentStateIndex ? 'text-blue-700' : 'text-slate-400'}`}>{state}</p>
                                        </div>
                                        {i < LIFECYCLE_STATES.length - 1 && <div className={`flex-1 h-1 min-w-[40px] ${i < currentStateIndex ? 'bg-blue-600' : 'bg-slate-200'}`}></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800">Immutable Audit Trail</h3>
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Securely Logged (Req 10.8)</div>
                            </div>
                            <div className="space-y-4">
                                {(profile.history || []).map((event, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex flex-col items-center"><div className={`w-4 h-4 rounded-full ring-4 ${i === 0 ? 'bg-blue-500 ring-blue-100 animate-pulse' : 'bg-slate-300 ring-slate-100'} z-10`}></div><div className="w-0.5 flex-1 bg-slate-200"></div></div>
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