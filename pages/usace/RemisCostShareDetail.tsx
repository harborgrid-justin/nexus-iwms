import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_COSTSHARE, USACE_ASSETS, DOCUMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, DollarSign, Calendar, ShieldCheck, CheckCircle, Lock, Building, Scale, FileText, PieChart, Landmark } from 'lucide-react';
import { CostShareAgreement, AuditEvent, CostShareContribution } from '../../types';
import { CostShareModal } from './components/CostShareModal';

const LIFECYCLE_STATES: CostShareAgreement['lifecycleState'][] = ['Initiated', 'Agreed', 'Active', 'Adjusted', 'Completed', 'Closed', 'Archived'];

export const RemisCostShareDetail: React.FC = () => {
    const { agreementId } = useParams<{ agreementId: string }>();
    const navigate = useNavigate();
    const [agreement, setAgreement] = useState<CostShareAgreement | undefined>(USACE_COSTSHARE.find(c => c.id === agreementId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!agreement) {
        return <div className="p-6">Cost-Share Agreement not found. <Link to="/usace/cost-share" className="text-blue-600">Return to Dashboard</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === agreement.assetId);
    const relatedDocs = DOCUMENTS.filter(d => agreement.documentIds.includes(d.id));
    const totalCredited = agreement.contributions?.filter(c => c.status === 'Credited').reduce((acc, c) => acc + c.amount, 0) || 0;
    const remainingObligation = agreement.partnerContribution - totalCredited;

    const handleSave = (updatedRecord: Partial<CostShareAgreement>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Finance Chief', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setAgreement(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: CostShareAgreement['lifecycleState']) => {
        // 11.7.4 - Prevent closure with unresolved obligations
        if (newState === 'Closed' && remainingObligation > 0) {
            alert(`Compliance Error (11.7.4): Cannot Close agreement with outstanding financial obligation of $${remainingObligation.toLocaleString()}.`);
            return;
        }

        const reason = `Lifecycle state advanced from ${agreement.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'District Commander', 
            action: 'State Transition',
            details: reason,
        };
        setAgreement(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(agreement.lifecycleState);

    return (
        <div className="space-y-6">
            <CostShareModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} agreement={agreement} />
            <div>
                <button onClick={() => navigate('/usace/cost-share')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Dashboard</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900">Agreement: {agreement.projectId}</h1>
                            <span className="text-xs bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded-full font-bold">{agreement.costShareRatio} Split</span>
                        </div>
                        <p className="text-slate-500 font-mono">{agreement.id} • Asset: {asset?.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-slate-100 text-slate-800 border-slate-200`}>{agreement.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Update Agreement</button>
                        <RegulatoryBadge refs={['11']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Financial Overview</button>
                        <button onClick={() => setActiveTab('contributions')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'contributions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Contributions & Credits</button>
                        <button onClick={() => setActiveTab('lifecycle')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'lifecycle' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Lifecycle Management</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Audit Trail</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Authority & Sponsor</h3>
                                <DetailItem label="Sponsor" value={agreement.sponsor} icon={Landmark} />
                                <DetailItem label="Authority" value={agreement.authority} icon={Scale} />
                                <DetailItem label="Statutory Basis" value={agreement.statutoryBasis} icon={ShieldCheck} />
                                <DetailItem label="Responsible Org" value={agreement.responsibleOrg} icon={Building} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Financial Terms</h3>
                                <DetailItem label="Project Total" value={`$${agreement.totalProjectCost.toLocaleString()}`} icon={DollarSign} />
                                <DetailItem label="Federal Share" value={`${agreement.federalSharePercentage}%`} icon={PieChart} />
                                <DetailItem label="Sponsor Target" value={`$${agreement.partnerContribution.toLocaleString()}`} icon={DollarSign} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Status</h3>
                                <div className="bg-slate-50 p-4 rounded-lg border">
                                    <p className="text-sm text-slate-500">Credited Contributions</p>
                                    <p className="text-2xl font-bold text-green-600">${totalCredited.toLocaleString()}</p>
                                    <div className="w-full bg-slate-200 h-2 rounded-full mt-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min((totalCredited / agreement.partnerContribution) * 100, 100)}%` }}></div>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">{((totalCredited / agreement.partnerContribution) * 100).toFixed(1)}% of obligation met</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contributions' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800">Sponsor Contributions Log</h3>
                                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">Record Contribution</button>
                            </div>
                            <div className="bg-slate-50 rounded-lg border overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-100 border-b">
                                        <tr>
                                            <th className="p-3 font-semibold">Date</th>
                                            <th className="p-3 font-semibold">Type</th>
                                            <th className="p-3 font-semibold">Description</th>
                                            <th className="p-3 font-semibold">Valuation Method</th>
                                            <th className="p-3 font-semibold text-right">Value</th>
                                            <th className="p-3 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {(agreement.contributions || []).map((c, idx) => (
                                            <tr key={idx}>
                                                <td className="p-3">{c.dateRecorded}</td>
                                                <td className="p-3"><span className="bg-white border px-2 py-0.5 rounded text-xs font-medium">{c.type}</span></td>
                                                <td className="p-3">{c.description}</td>
                                                <td className="p-3 text-slate-600">{c.valuationMethod}</td>
                                                <td className="p-3 text-right font-mono">${c.amount.toLocaleString()}</td>
                                                <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full font-bold ${c.status === 'Credited' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{c.status}</span></td>
                                            </tr>
                                        ))}
                                        {(!agreement.contributions || agreement.contributions.length === 0) && <tr><td colSpan={6} className="p-4 text-center text-slate-500 italic">No contributions recorded.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lifecycle' && (
                        <div>
                            <div className="bg-slate-50 p-5 rounded-xl border mb-8 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg">Current State: {agreement.lifecycleState}</h3>
                                    <p className="text-sm text-slate-600 mt-1">Agreement Date: {agreement.agreementDate}</p>
                                </div>
                                <div className="flex gap-2">
                                    {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                        <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                                            Advance to {LIFECYCLE_STATES[currentStateIndex + 1]}
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
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Securely Logged (Req 11.8)</div>
                            </div>
                            <div className="space-y-4">
                                {(agreement.history || []).map((event, i) => (
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