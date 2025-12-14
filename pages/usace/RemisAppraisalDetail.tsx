import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_APPRAISALS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
// FIX: Import 'DollarSign' icon from lucide-react.
import { ArrowLeft, Edit, ChevronDown, Building, Target, Calendar, User, FileText, Lock, List, Activity, Paperclip, X, DollarSign } from 'lucide-react';
import { Appraisal, AuditEvent } from '../../types';

const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Review': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Archived': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
};

const DetailCard = ({ label, value, icon: Icon, isProtected = false }: { label: string, value: string | number | boolean, icon: any, isProtected?: boolean }) => (
    <div className="flex items-start gap-3">
        <Icon className="text-slate-400 mt-1 flex-shrink-0" size={16} />
        <div>
            <div className="text-xs text-slate-500 flex items-center gap-1">{label} {isProtected && <Lock size={10} title="This data is protected and access is logged." />}</div>
            <div className="text-sm font-medium text-slate-800">{String(value)}</div>
        </div>
    </div>
);

export const RemisAppraisalDetail: React.FC = () => {
    const { appraisalId } = useParams<{ appraisalId: string }>();
    const navigate = useNavigate();
    const [appraisal, setAppraisal] = useState<Appraisal | undefined>(USACE_APPRAISALS.find(a => a.id === appraisalId));
    const [activeTab, setActiveTab] = useState('overview');

    if (!appraisal) {
        return <div className="p-6">Appraisal not found. <Link to="/usace/appraisals" className="text-blue-600">Return to Appraisal Log</Link></div>;
    }
    
    const asset = USACE_ASSETS.find(a => a.id === appraisal.assetId);

    const handleStatusChange = (newStatus: Appraisal['status']) => {
        const reason = `Status changed from ${appraisal.status} to ${newStatus}.`;
         const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance', // Simulated logged-in user
            action: 'Status Updated',
            details: reason,
        };
        setAppraisal(prev => prev ? { ...prev, status: newStatus, history: [newHistoryEvent, ...prev.history!] } : undefined);
        alert(`Appraisal status changed to ${newStatus}. This action has been logged.`);
    }
    
    const isFinalized = appraisal.status === 'Approved' || appraisal.status === 'Archived';

    return (
        <div className="space-y-6">
            <div>
                <button onClick={() => navigate('/usace/appraisals')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2">
                    <ArrowLeft size={16} /> Back to Appraisal Log
                </button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Appraisal for {asset?.name}</h1>
                        <p className="text-slate-500 font-mono">Record ID: {appraisal.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${getStatusColor(appraisal.status)}`}>{appraisal.status}</span>
                        <button disabled={isFinalized} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed" title={isFinalized ? "Finalized appraisals cannot be edited." : "Edit Record"}><Edit size={16} /> Edit</button>
                        <select onChange={(e) => handleStatusChange(e.target.value as Appraisal['status'])} value={appraisal.status} disabled={isFinalized} className="px-3 py-2 text-sm font-medium bg-slate-800 text-white rounded-lg hover:bg-slate-700 focus:outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed">
                            <option disabled>Change Status</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Approved">Approved</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           <div className="space-y-6">
                                <h3 className="font-bold text-slate-800">Valuation Details</h3>
                                <DetailCard label="Appraised Value" value={`$${appraisal.appraisedValue.toLocaleString()}`} icon={DollarSign} isProtected />
                                <DetailCard label="Valuation Date" value={appraisal.appraisalDate} icon={Calendar} />
                                <DetailCard label="Appraisal Type" value={appraisal.type} icon={FileText} />
                           </div>
                           <div className="space-y-6">
                                <h3 className="font-bold text-slate-800">Assignment Information</h3>
                                <DetailCard label="Purpose" value={appraisal.purpose} icon={Target} />
                                <DetailCard label="Related Action" value={appraisal.relatedActionId} icon={Paperclip} />
                                <DetailCard label="Appraiser" value={appraisal.appraiser} icon={User} />
                                <DetailCard label="Qualifications" value={appraisal.appraiserQualifications} icon={List} />
                           </div>
                            <div className="space-y-6 bg-slate-50 p-4 rounded-lg border">
                                <h3 className="font-bold text-slate-800">Scope & Assumptions</h3>
                                <p className="text-xs text-slate-600"><strong>Scope:</strong> {appraisal.scope}</p>
                                <p className="text-xs text-slate-600"><strong>Assumptions:</strong> {appraisal.assumptions}</p>
                           </div>
                        </div>
                    )}
                    {activeTab === 'history' && (
                         <div>
                             <h3 className="font-bold text-slate-800 mb-4">Appraisal Lifecycle History</h3>
                             <div className="space-y-4">
                                {appraisal.history?.map((event, i) => (
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