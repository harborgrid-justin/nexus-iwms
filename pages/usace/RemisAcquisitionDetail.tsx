import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ACQUISITIONS, USACE_ASSETS, USACE_APPRAISALS, USACE_ENVIRONMENTAL, FUND_TRANSACTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { StatusBadge } from '../../components/StatusBadge';
import { ArrowLeft, Edit, Building, MapPin, Calendar, DollarSign, Shield, Sigma, BookOpen, FileText, Check, MoreVertical, Paperclip, Activity, Users, Target, Clock } from 'lucide-react';
import { AcquisitionRecord, AuditEvent } from '../../types';
import { AcquisitionModal } from './components/AcquisitionModal';
import { validateNEPAForAcquisition, validateAcquisitionFunding, validateAppraisalRecency } from '../../utils/usaceRules';

const STAGES: AcquisitionRecord['stage'][] = ['Planning', 'Site Selection', 'NEPA Review', 'Appraisal', 'Negotiation', 'Condemnation', 'Closing', 'Closed'];

export const RemisAcquisitionDetail: React.FC = () => {
    const { acquisitionId } = useParams<{ acquisitionId: string }>();
    const navigate = useNavigate();
    const [acquisition, setAcquisition] = useState<AcquisitionRecord | undefined>(USACE_ACQUISITIONS.find(a => a.id === acquisitionId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!acquisition) {
        return <div className="p-6">Acquisition record not found. <Link to="/usace/acquisitions" className="text-blue-600">Return to Pipeline</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === acquisition.assetId);
    
    const handleSave = (updatedRecord: Partial<AcquisitionRecord>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance',
            action: 'Record Updated',
            details: reason
        };
        setAcquisition(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStageChange = (newStage: AcquisitionRecord['stage']) => {
        if (STAGES.indexOf(newStage) <= STAGES.indexOf(acquisition.stage)) {
            alert("Cannot move to a previous or current stage.");
            return;
        }

        // Rule 20: NEPA check before Closing
        if (newStage === 'Closing') {
            const ruleCheck = validateNEPAForAcquisition(acquisition, USACE_ENVIRONMENTAL);
            if (!ruleCheck.allowed) {
                alert(ruleCheck.reason);
                if (!confirm("Simulation Override: Proceed despite NEPA warning?")) return;
            }
        }

        // Rule 26: Funding Obligation check before Closing
        if (newStage === 'Closing') {
            const fundCheck = validateAcquisitionFunding(acquisition, FUND_TRANSACTIONS);
            if (!fundCheck.allowed) {
                alert(fundCheck.reason);
                if (!confirm("Simulation Override: Proceed without obligated funds?")) return;
            }
        }

        // Rule 28 check (implicitly during flow, but checked here for demonstration on appraisal stage)
        if (newStage === 'Negotiation') {
             const linkedAppraisals = USACE_APPRAISALS.filter(a => acquisition.appraisalIds.includes(a.id));
             for (const app of linkedAppraisals) {
                 const recencyCheck = validateAppraisalRecency(app);
                 if (!recencyCheck.allowed) {
                     alert(`Warning for Appraisal ${app.id}: ${recencyCheck.reason}`);
                 }
             }
        }

        const reason = `Stage advanced from ${acquisition.stage} to ${newStage}.`;
         const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance',
            action: 'Stage Changed',
            details: reason,
        };
        setAcquisition(prev => prev ? { ...prev, stage: newStage, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        alert(`Acquisition stage advanced to ${newStage}. This action has been logged.`);
    }
    
    const currentStageIndex = STAGES.indexOf(acquisition.stage);

    return (
        <div className="space-y-6">
            <AcquisitionModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} acquisition={acquisition} />
            <div>
                <button onClick={() => navigate('/usace/acquisitions')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Pipeline</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Acquisition: {asset?.name}</h1>
                        <p className="text-slate-500 font-mono text-xs">{acquisition.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusBadge status={acquisition.stage} />
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors shadow-sm"><Edit size={16} /> Edit</button>
                        <RegulatoryBadge refs={['4']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-8" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('lifecycle')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'lifecycle' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Lifecycle</button>
                        <button onClick={() => setActiveTab('documents')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'documents' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Documents</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>
                 <div className="p-8">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="space-y-8"><h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-3">Key Information</h3>
                                <DetailItem label="Associated Asset" value={asset?.rpuid || '—'} icon={Building} />
                                <DetailItem label="Purpose" value={acquisition.purpose} icon={Target} />
                                <DetailItem label="Responsible Organization" value={acquisition.responsibleOrg} icon={Users} />
                            </div>
                            <div className="space-y-8"><h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-3">Legal & Authority</h3>
                                <DetailItem label="Acquisition Method" value={acquisition.acquisitionMethod} icon={BookOpen} />
                                <DetailItem label="Authority" value={acquisition.authority} icon={Shield} />
                                <DetailItem label="Statutory Basis" value={acquisition.statutoryBasis} icon={Shield} />
                            </div>
                            <div className="space-y-8"><h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-3">Financials & Dates</h3>
                                <DetailItem label="Funding Source" value={acquisition.fundingSource} icon={Sigma} isProtected />
                                <DetailItem label="Total Cost" value={`$${acquisition.cost.toLocaleString()}`} icon={DollarSign} isProtected />
                                <DetailItem label="Target Close Date" value={acquisition.closeDate} icon={Calendar} />
                            </div>
                        </div>
                    )}
                    {activeTab === 'lifecycle' && (
                         <div>
                             <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-3 mb-8">Acquisition Pipeline</h3>
                             <div className="flex items-center">
                                {STAGES.map((stage, i) => (
                                    <React.Fragment key={stage}>
                                        <div className="flex flex-col items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${i <= currentStageIndex ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20' : 'bg-white border-slate-200 text-slate-400'}`}>
                                               {i < currentStageIndex ? <Check size={18}/> : <span className="text-xs font-bold">{i+1}</span>}
                                            </div>
                                            <p className={`text-[10px] mt-2 text-center uppercase tracking-wider font-bold transition-colors ${i <= currentStageIndex ? 'text-blue-600' : 'text-slate-400'}`}>{stage}</p>
                                        </div>
                                        {i < STAGES.length - 1 && <div className={`flex-1 h-1 mx-2 rounded-full transition-colors ${i < currentStageIndex ? 'bg-blue-600' : 'bg-slate-100'}`}></div>}
                                    </React.Fragment>
                                ))}
                             </div>
                              <div className="mt-12 text-center">
                                {currentStageIndex < STAGES.length - 1 && (
                                    <button onClick={() => handleStageChange(STAGES[currentStageIndex+1])} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                                        Advance to: {STAGES[currentStageIndex+1]}
                                    </button>
                                )}
                             </div>
                         </div>
                    )}
                    {activeTab === 'documents' && (
                         <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                             <h3 className="font-bold text-slate-900 border-l-4 border-blue-600 pl-3 mb-6 text-base tracking-tight uppercase">Supporting Documentation</h3>
                             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                 <table className="w-full text-sm">
                                     <thead className="bg-slate-50/50 border-b border-slate-100">
                                         <tr>
                                             <th className="px-6 py-4 text-left font-bold text-slate-500 uppercase tracking-widest text-[10px]">Document Category</th>
                                             <th className="px-6 py-4 text-left font-bold text-slate-500 uppercase tracking-widest text-[10px]">Reference ID</th>
                                             <th className="px-6 py-4 text-left font-bold text-slate-500 uppercase tracking-widest text-[10px]">Status</th>
                                         </tr>
                                     </thead>
                                     <tbody className="divide-y divide-slate-50">
                                        {acquisition.appraisalIds.map(id => {
                                            const appraisal = USACE_APPRAISALS.find(a => a.id === id);
                                            return (
                                               <tr key={id} className="hover:bg-blue-50/30 transition-colors group/row">
                                                   <td className="px-6 py-5 font-bold text-slate-900 flex items-center gap-3">
                                                       <div className="p-2 bg-slate-100 rounded-lg text-slate-400 group-hover/row:bg-blue-100 group-hover/row:text-blue-600 transition-colors">
                                                           <Paperclip size={14} />
                                                       </div>
                                                       Real Property Appraisal
                                                   </td>
                                                   <td className="px-6 py-5">
                                                       <Link to={`/usace/appraisals/${id}`} className="text-blue-600 hover:underline font-bold font-mono tracking-tighter uppercase">{id}</Link>
                                                   </td>
                                                   <td className="px-6 py-5">
                                                       <StatusBadge status={appraisal?.status || 'Unknown'} />
                                                   </td>
                                               </tr>
                                            )
                                        })}
                                     </tbody>
                                 </table>
                             </div>
                         </div>
                    )}
                    {activeTab === 'history' && (
                         <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                             <h3 className="font-bold text-slate-900 border-l-4 border-emerald-500 pl-3 mb-10 text-base uppercase tracking-tight">Audit Log & Lifecycle</h3>
                             <div className="space-y-0 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-100 ml-1">
                               {acquisition.history?.map((event, i) => (
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
                                               <p className="font-bold text-slate-900 text-sm mb-4">Record modification by <span className="text-blue-600 font-bold underline underline-offset-4 cursor-pointer">{event.user}</span></p>
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