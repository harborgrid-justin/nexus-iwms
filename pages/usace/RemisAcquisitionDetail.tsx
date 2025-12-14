import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ACQUISITIONS, USACE_ASSETS, USACE_APPRAISALS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
// FIX: Added 'Target' to the import list to fix 'Cannot find name' error.
import { ArrowLeft, Edit, Building, MapPin, Calendar, DollarSign, Shield, Sigma, BookOpen, FileText, Check, MoreVertical, Paperclip, Activity, Users, Target } from 'lucide-react';
import { AcquisitionRecord, AuditEvent } from '../../types';
import { AcquisitionModal } from './components/AcquisitionModal';

const getStatusColor = (status: string) => {
    switch(status) {
      case 'Closed': case 'Terminated': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'Closing': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
};

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
        setAcquisition(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...prev.history!] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStageChange = (newStage: AcquisitionRecord['stage']) => {
        if (STAGES.indexOf(newStage) <= STAGES.indexOf(acquisition.stage)) {
            alert("Cannot move to a previous or current stage.");
            return;
        }
        const reason = `Stage advanced from ${acquisition.stage} to ${newStage}.`;
         const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Dr. Alistair Vance',
            action: 'Stage Changed',
            details: reason,
        };
        setAcquisition(prev => prev ? { ...prev, stage: newStage, history: [newHistoryEvent, ...prev.history!] } : undefined);
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
                        <p className="text-slate-500 font-mono">{acquisition.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${getStatusColor(acquisition.stage)}`}>{acquisition.stage}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Edit</button>
                        <RegulatoryBadge refs={['4']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('lifecycle')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'lifecycle' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Lifecycle</button>
                        <button onClick={() => setActiveTab('documents')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'documents' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Documents</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>
                 <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-6"><h3 className="font-bold text-slate-800">Key Information</h3>
                                <DetailItem label="Associated Asset" value={asset?.rpuid || 'N/A'} icon={Building} />
                                <DetailItem label="Purpose" value={acquisition.purpose} icon={Target} />
                                <DetailItem label="Responsible Organization" value={acquisition.responsibleOrg} icon={Users} />
                            </div>
                            <div className="space-y-6"><h3 className="font-bold text-slate-800">Legal & Authority</h3>
                                <DetailItem label="Acquisition Method" value={acquisition.acquisitionMethod} icon={BookOpen} />
                                <DetailItem label="Authority" value={acquisition.authority} icon={Shield} />
                                <DetailItem label="Statutory Basis" value={acquisition.statutoryBasis} icon={Shield} />
                            </div>
                            <div className="space-y-6"><h3 className="font-bold text-slate-800">Financials & Dates</h3>
                                <DetailItem label="Funding Source" value={acquisition.fundingSource} icon={Sigma} isProtected />
                                <DetailItem label="Total Cost" value={`$${acquisition.cost.toLocaleString()}`} icon={DollarSign} isProtected />
                                <DetailItem label="Target Close Date" value={acquisition.closeDate} icon={Calendar} />
                            </div>
                        </div>
                    )}
                    {activeTab === 'lifecycle' && (
                         <div>
                             <h3 className="font-bold text-slate-800 mb-6">Acquisition Lifecycle</h3>
                             <div className="flex items-center">
                                {STAGES.map((stage, i) => (
                                    <React.Fragment key={stage}>
                                        <div className="flex flex-col items-center">
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${i <= currentStageIndex ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'}`}>
                                               {i < currentStageIndex ? <Check size={14}/> : <span className="text-xs font-bold">{i+1}</span>}
                                            </div>
                                            <p className={`text-xs mt-2 text-center ${i <= currentStageIndex ? 'font-semibold text-blue-600' : 'text-slate-500'}`}>{stage}</p>
                                        </div>
                                        {i < STAGES.length - 1 && <div className={`flex-1 h-1 ${i < currentStageIndex ? 'bg-blue-600' : 'bg-slate-300'}`}></div>}
                                    </React.Fragment>
                                ))}
                             </div>
                              <div className="mt-8 text-center">
                                {currentStageIndex < STAGES.length - 1 && <button onClick={() => handleStageChange(STAGES[currentStageIndex+1])} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">Advance to: {STAGES[currentStageIndex+1]}</button>}
                             </div>
                         </div>
                    )}
                     {activeTab === 'documents' && (
                         <div>
                             <h3 className="font-bold text-slate-800 mb-4">Supporting Documents</h3>
                             <div className="bg-slate-50 rounded-lg border">
                                 <table className="w-full text-sm">
                                     <thead className="text-left"><tr className="border-b"><th className="p-3">Document Type</th><th>ID / Name</th><th>Status</th></tr></thead>
                                     <tbody>
                                        {acquisition.appraisalIds.map(id => {
                                            const appraisal = USACE_APPRAISALS.find(a => a.id === id);
                                            return (<tr key={id} className="border-b last:border-0"><td className="p-3 font-medium flex items-center gap-2"><Paperclip size={14}/>Appraisal</td><td><Link to={`/usace/appraisals/${id}`} className="text-blue-600 hover:underline">{id}</Link></td><td><span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">{appraisal?.status}</span></td></tr>)
                                        })}
                                     </tbody>
                                 </table>
                             </div>
                         </div>
                     )}
                     {activeTab === 'history' && (
                         <div>
                             <h3 className="font-bold text-slate-800 mb-4">Record History & Audit Log</h3>
                             <div className="space-y-4">
                                {acquisition.history?.map((event, i) => (
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
