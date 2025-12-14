import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_ENVIRONMENTAL, USACE_ASSETS, DOCUMENTS, FUND_TRANSACTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Building, Calendar, Leaf, AlertTriangle, ShieldCheck, CheckCircle, Lock, FileText, Activity } from 'lucide-react';
import { EnvironmentalSite, AuditEvent } from '../../types';
import { EnvironmentalModal } from './components/EnvironmentalModal';

const LIFECYCLE_STATES: EnvironmentalSite['lifecycleState'][] = ['Identified', 'Assessed', 'Under Remediation', 'Compliant', 'Closed'];

export const RemisEnvironmentalDetail: React.FC = () => {
    const { siteId } = useParams<{ siteId: string }>();
    const navigate = useNavigate();
    const [site, setSite] = useState<EnvironmentalSite | undefined>(USACE_ENVIRONMENTAL.find(s => s.id === siteId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!site) {
        return <div className="p-6">Environmental site record not found. <Link to="/usace/environmental" className="text-blue-600">Return to Program</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === site.assetId);
    const relatedDocs = DOCUMENTS.filter(d => site.documentIds.includes(d.id));
    const relatedFunds = FUND_TRANSACTIONS.filter(ft => ft.environmentalSiteId === site.id);

    const handleSave = (updatedRecord: Partial<EnvironmentalSite>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Sarah Green', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setSite(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: EnvironmentalSite['lifecycleState']) => {
        // 7.7.4 Prevent closure with unresolved obligations (simulation)
        if (newState === 'Closed' && site.status !== 'Compliant') {
            alert('Compliance Error: Cannot close site record until status is Compliant.');
            return;
        }

        const reason = `Lifecycle state advanced from ${site.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Sarah Green', 
            action: 'State Transition',
            details: reason,
        };
        setSite(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(site.lifecycleState);

    return (
        <div className="space-y-6">
            <EnvironmentalModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} site={site} />
            <div>
                <button onClick={() => navigate('/usace/environmental')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Program</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">{site.siteName}</h1>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${site.riskClassification === 'High' ? 'bg-red-100 text-red-800' : site.riskClassification === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>{site.riskClassification} Risk</span>
                        </div>
                        <p className="text-slate-500 font-mono">{site.id} • Asset: {asset?.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200`}>{site.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Edit Record</button>
                        <RegulatoryBadge refs={['7']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('remediation')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'remediation' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Assessment & Remediation</button>
                        <button onClick={() => setActiveTab('documents')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'documents' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Documents</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Site Identification</h3>
                                <DetailItem label="Asset" value={asset?.name} icon={Building} />
                                <DetailItem label="Initiating Org" value={site.initiatingOrg} icon={Building} />
                                <DetailItem label="Initiation Date" value={site.initiationDate} icon={Calendar} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Lifecycle Status</h3>
                                <div className="space-y-4">
                                    {LIFECYCLE_STATES.map((state, i) => (
                                        <div key={state} className={`flex items-center gap-3 ${i > currentStateIndex ? 'opacity-40' : ''}`}>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < currentStateIndex ? 'bg-green-500 text-white' : i === currentStateIndex ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                {i < currentStateIndex ? <CheckCircle size={14} /> : i + 1}
                                            </div>
                                            <span className={`text-sm ${i === currentStateIndex ? 'font-bold text-blue-700' : 'text-slate-700'}`}>{state}</span>
                                        </div>
                                    ))}
                                </div>
                                {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                    <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm mt-4">
                                        Advance to {LIFECYCLE_STATES[currentStateIndex + 1]}
                                    </button>
                                )}
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Condition & Compliance</h3>
                                <DetailItem label="Authority" value={site.authority} icon={ShieldCheck} />
                                <DetailItem label="Contaminants" value={site.contaminants.join(', ') || 'None Listed'} icon={AlertTriangle} />
                                <div className="pt-2">
                                    <label className="text-xs text-slate-500 font-semibold uppercase">Indicators</label>
                                    <p className="text-sm text-slate-800 mt-1 bg-slate-50 p-2 rounded border">{site.contaminationIndicators || 'No indicators recorded.'}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'remediation' && (
                        <div>
                            <h3 className="font-bold text-slate-800 mb-4">Remediation Actions Log (7.3.3)</h3>
                            <div className="bg-slate-50 rounded-lg border overflow-hidden mb-8">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Action Description</th>
                                            <th className="p-3 font-semibold">Date</th>
                                            <th className="p-3 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {site.remediationActions.map((action, idx) => (
                                            <tr key={idx}>
                                                <td className="p-3">{action.description}</td>
                                                <td className="p-3">{action.date}</td>
                                                <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full font-bold ${action.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{action.status}</span></td>
                                            </tr>
                                        ))}
                                        {site.remediationActions.length === 0 && <tr><td colSpan={3} className="p-4 text-center text-slate-500 italic">No remediation actions recorded yet.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                            
                            <h3 className="font-bold text-slate-800 mb-4">Financial Obligations</h3>
                             <div className="bg-slate-50 rounded-lg border overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Date</th>
                                            <th className="p-3 font-semibold">Transaction Type</th>
                                            <th className="p-3 font-semibold">Description</th>
                                            <th className="p-3 font-semibold text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {relatedFunds.map(ft => (
                                            <tr key={ft.id}>
                                                <td className="p-3">{ft.date}</td>
                                                <td className="p-3">{ft.type}</td>
                                                <td className="p-3">{ft.description}</td>
                                                <td className="p-3 text-right font-mono">${ft.amount.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                         {relatedFunds.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-slate-500 italic">No financial transactions recorded.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-slate-800">Environmental Documents</h3>
                            {relatedDocs.length > 0 ? (
                                <div className="grid gap-3">{relatedDocs.map(d => (
                                    <div key={d.id} className="p-3 border rounded bg-slate-50 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <FileText size={16} className="text-slate-600"/>
                                            <div><p className="font-semibold text-sm">{d.name}</p><p className="text-xs text-slate-500">{d.type} • {d.uploadedDate}</p></div>
                                        </div>
                                        <button className="text-blue-600 text-sm hover:underline">View</button>
                                    </div>
                                ))}</div>
                            ) : <p className="text-sm text-slate-500 italic">No documents attached.</p>}
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800">Immutable Audit Trail</h3>
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Securely Logged</div>
                            </div>
                            <div className="space-y-4">
                                {(site.history || []).map((event, i) => (
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
