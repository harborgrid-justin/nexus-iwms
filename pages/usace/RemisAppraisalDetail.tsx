
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_APPRAISALS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { StatusBadge } from '../../components/StatusBadge';
import { ArrowLeft, Edit, Building, Target, Calendar, User, FileText, List, Activity, Paperclip, DollarSign, Clock } from 'lucide-react';
import { Appraisal, AuditEvent } from '../../types';

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
        setAppraisal(prev => prev ? { ...prev, status: newStatus, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
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
                        <p className="text-slate-500 font-mono text-xs">Record ID: {appraisal.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusBadge status={appraisal.status} />
                        <button disabled={isFinalized} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed" title={isFinalized ? "Finalized appraisals cannot be edited." : "Edit Record"}><Edit size={16} /> Edit</button>
                        <select onChange={(e) => handleStatusChange(e.target.value as Appraisal['status'])} value={appraisal.status} disabled={isFinalized} className="px-3 py-2 text-sm font-medium bg-slate-800 text-white rounded-lg hover:bg-slate-700 focus:outline-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
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
                    <nav className="-mb-px flex gap-8" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-8">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-12">
                                <section className="animate-in fade-in slide-in-from-left-4 duration-500">
                                    <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-3 mb-8 text-lg flex items-center justify-between">
                                        Valuation Foundations
                                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase tracking-widest border border-blue-100">Certified Record</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                        <DetailItem label="Appraised Value" value={`$${appraisal.appraisedValue.toLocaleString()}`} icon={DollarSign} isProtected />
                                        <DetailItem label="Valuation Date" value={appraisal.appraisalDate} icon={Calendar} />
                                        <DetailItem label="Appraisal Type" value={appraisal.type} icon={FileText} />
                                    </div>
                                </section>

                                <section className="animate-in fade-in slide-in-from-left-4 duration-500 delay-150">
                                    <h3 className="font-bold text-slate-900 border-l-4 border-slate-300 pl-3 mb-8 text-lg">Engagement Profile</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                        <DetailItem label="Purpose" value={appraisal.purpose} icon={Target} />
                                        <DetailItem label="Related Action" value={appraisal.relatedActionId} icon={Paperclip} />
                                        <DetailItem label="Lead Appraiser" value={appraisal.appraiser} icon={User} />
                                    </div>
                                </section>

                                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                    <div className="space-y-4 bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Activity size={80} />
                                        </div>
                                        <h3 className="font-bold text-white flex items-center gap-2 text-base uppercase tracking-widest"><FileText size={18} className="text-blue-400"/> Technical Scope</h3>
                                        <p className="text-slate-300 leading-relaxed font-medium text-sm border-l-2 border-blue-500/30 pl-4 py-1 italic">
                                            "{appraisal.scope}"
                                        </p>
                                    </div>

                                    <div className="space-y-4 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Building size={80} />
                                        </div>
                                        <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base uppercase tracking-widest"><Target size={18} className="text-blue-600"/> Controlling Assumptions</h3>
                                        <p className="text-slate-600 leading-relaxed font-medium text-sm border-l-2 border-slate-200 pl-4 py-1">
                                            {appraisal.assumptions}
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}
                    {activeTab === 'history' && (
                         <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                             <h3 className="font-bold text-slate-900 border-l-4 border-emerald-500 pl-3 mb-10 text-base uppercase tracking-tight">Appraisal Lifecycle & Audit Trail</h3>
                             <div className="space-y-0 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-100 ml-1">
                               {appraisal.history?.map((event, i) => (
                                   <div key={i} className="flex gap-10 relative group/event">
                                       <div className="flex-shrink-0 mt-2">
                                           <div className={`w-6 h-6 rounded-full ring-4 ${i === 0 ? 'bg-emerald-600 ring-emerald-50' : 'bg-white ring-slate-50 border-2 border-slate-200'} z-10 relative shadow-sm transition-transform group-hover/event:scale-110 flex items-center justify-center`}>
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
                                                   <span className={`text-[10px] px-3 py-1 rounded-lg font-bold uppercase tracking-widest shadow-sm ${i === 0 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-200'}`}>{event.action}</span>
                                               </div>
                                               <p className="font-bold text-slate-900 text-sm mb-4">Verification action by <span className="text-blue-600 font-bold underline underline-offset-4 cursor-pointer">{event.user}</span></p>
                                               {event.details && (
                                                   <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600 font-medium leading-relaxed italic border-l-4 border-emerald-400 group-hover/event:bg-white group-hover/event:border-emerald-200 transition-colors">
                                                       "{event.details}"
                                                   </div>
                                               )}
                                           </div>
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