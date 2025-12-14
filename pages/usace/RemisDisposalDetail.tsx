import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_DISPOSALS, USACE_ASSETS, USACE_APPRAISALS, USACE_ENVIRONMENTAL, USACE_CLAIMS, DOCUMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Building, FileText, CheckCircle, AlertTriangle, Scale, Leaf, Trash2, History, Paperclip, ShieldCheck, Lock } from 'lucide-react';
import { DisposalRecord, AuditEvent } from '../../types';
import { DisposalModal } from './components/DisposalModal';

const LIFECYCLE_STATES: DisposalRecord['lifecycleState'][] = ['Initiated', 'Excess Determined', 'Pending Authorization', 'Authorized', 'Executed', 'Closed'];

export const RemisDisposalDetail: React.FC = () => {
    const { disposalId } = useParams<{ disposalId: string }>();
    const navigate = useNavigate();
    const [disposal, setDisposal] = useState<DisposalRecord | undefined>(USACE_DISPOSALS.find(d => d.id === disposalId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!disposal) {
        return <div className="p-6">Disposal record not found. <Link to="/usace/disposals" className="text-blue-600">Return to Pipeline</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === disposal.assetId);
    
    // Derived Data for Integration (5.6.2)
    const relatedAppraisals = USACE_APPRAISALS.filter(a => disposal.appraisalIds.includes(a.id));
    const relatedEnvSites = USACE_ENVIRONMENTAL.filter(e => disposal.environmentalSiteIds.includes(e.id));
    const relatedClaims = USACE_CLAIMS.filter(c => disposal.legalClaimIds.includes(c.id));
    const relatedDocs = DOCUMENTS.filter(d => disposal.documentIds.includes(d.id));

    const handleSave = (updatedRecord: Partial<DisposalRecord>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'James West', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setDisposal(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...prev.history!] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleStateTransition = (newState: DisposalRecord['lifecycleState']) => {
        // 5.7.4 - Prevent transition to executed without authorization
        if (newState === 'Executed' && disposal.authorizationStatus !== 'Approved') {
            alert('Compliance Error: Cannot transition to Executed status without approved Authorization.');
            return;
        }

        const reason = `Lifecycle state advanced from ${disposal.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'District Commander', // Simulated Approval Role
            action: 'State Transition',
            details: reason,
        };
        setDisposal(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...prev.history!] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(disposal.lifecycleState);

    return (
        <div className="space-y-6">
            <DisposalModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} disposal={disposal} />
            <div>
                <button onClick={() => navigate('/usace/disposals')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2"><ArrowLeft size={16} /> Back to Pipeline</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Disposal Case: {asset?.name}</h1>
                        <p className="text-slate-500 font-mono">{disposal.id} • Asset: {asset?.rpuid}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full border bg-blue-100 text-blue-800 border-blue-200`}>{disposal.lifecycleState}</span>
                        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><Edit size={16} /> Edit Case</button>
                        <RegulatoryBadge refs={['5']} />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview</button>
                        <button onClick={() => setActiveTab('determinations')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'determinations' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Determinations & Auth</button>
                        <button onClick={() => setActiveTab('artifacts')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'artifacts' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Related Artifacts</button>
                        <button onClick={() => setActiveTab('history')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>History & Audit</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Case Details</h3>
                                <DetailItem label="Initiating Org" value={disposal.initiatingOrg} icon={Building} />
                                <DetailItem label="Proposed Method" value={disposal.proposedMethod} icon={Trash2} />
                                <DetailItem label="Rationale" value={disposal.disposalRationale} icon={FileText} />
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
                                <h3 className="font-bold text-slate-800 border-b pb-2">Key Dates</h3>
                                <DetailItem label="Determination Date" value={disposal.excessDeterminationDate || 'Pending'} icon={History} />
                                <DetailItem label="Authorization Date" value={disposal.authorizationDate || 'Pending'} icon={ShieldCheck} />
                                <DetailItem label="Completion Date" value={disposal.completionDate || 'N/A'} icon={CheckCircle} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'determinations' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><FileText size={18}/> Determination of Excess</h3>
                                <div className="space-y-4">
                                    <DetailItem label="Date" value={disposal.excessDeterminationDate || '-'} icon={History} />
                                    <DetailItem label="Authority" value={disposal.excessDeterminationAuthority || '-'} icon={ShieldCheck} />
                                    <div className="pt-2">
                                        <label className="text-xs text-slate-500 font-semibold uppercase">Justification</label>
                                        <p className="text-sm text-slate-800 mt-1 bg-white p-3 rounded border">{disposal.excessDeterminationJustification || 'No justification recorded.'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><ShieldCheck size={18}/> Authorization</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">Status</span>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${disposal.authorizationStatus === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{disposal.authorizationStatus}</span>
                                    </div>
                                    <DetailItem label="Authorizing Official" value={disposal.authorizingOfficial || 'Pending'} icon={Building} />
                                    <DetailItem label="Date" value={disposal.authorizationDate || '-'} icon={History} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'artifacts' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-slate-900 mb-3">Linked Appraisals (5.1.5)</h3>
                                {relatedAppraisals.length > 0 ? (
                                    <div className="grid gap-3">{relatedAppraisals.map(a => (
                                        <div key={a.id} className="p-3 border rounded bg-slate-50 flex justify-between items-center">
                                            <div><p className="font-semibold text-sm">{a.purpose} Appraisal</p><p className="text-xs text-slate-500">Value: ${a.appraisedValue.toLocaleString()}</p></div>
                                            <Link to={`/usace/appraisals/${a.id}`} className="text-blue-600 text-sm hover:underline">View</Link>
                                        </div>
                                    ))}</div>
                                ) : <p className="text-sm text-slate-500 italic">No linked appraisals.</p>}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-3">Environmental Reviews</h3>
                                {relatedEnvSites.length > 0 ? (
                                    <div className="grid gap-3">{relatedEnvSites.map(e => (
                                        <div key={e.id} className="p-3 border rounded bg-slate-50 flex justify-between items-center">
                                            <div className="flex items-center gap-3"><Leaf size={16} className="text-green-600"/><div><p className="font-semibold text-sm">{e.siteName}</p><p className="text-xs text-slate-500">{e.status}</p></div></div>
                                            <Link to="/usace/environmental" className="text-blue-600 text-sm hover:underline">View</Link>
                                        </div>
                                    ))}</div>
                                ) : <p className="text-sm text-slate-500 italic">No linked environmental sites.</p>}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-3">Legal Claims</h3>
                                {relatedClaims.length > 0 ? (
                                    <div className="grid gap-3">{relatedClaims.map(c => (
                                        <div key={c.id} className="p-3 border rounded bg-slate-50 flex justify-between items-center">
                                            <div className="flex items-center gap-3"><Scale size={16} className="text-red-600"/><div><p className="font-semibold text-sm">{c.claimType} Claim</p><p className="text-xs text-slate-500">{c.claimant}</p></div></div>
                                            <Link to="/usace/legal" className="text-blue-600 text-sm hover:underline">View</Link>
                                        </div>
                                    ))}</div>
                                ) : <p className="text-sm text-slate-500 italic">No linked legal claims.</p>}
                            </div>
                             <div>
                                <h3 className="font-bold text-slate-900 mb-3">Documents & Artifacts</h3>
                                {relatedDocs.length > 0 ? (
                                    <div className="grid gap-3">{relatedDocs.map(d => (
                                        <div key={d.id} className="p-3 border rounded bg-slate-50 flex justify-between items-center">
                                            <div className="flex items-center gap-3"><Paperclip size={16} className="text-slate-600"/><div><p className="font-semibold text-sm">{d.name}</p><p className="text-xs text-slate-500">{d.type}</p></div></div>
                                            <button className="text-blue-600 text-sm hover:underline">Download</button>
                                        </div>
                                    ))}</div>
                                ) : <p className="text-sm text-slate-500 italic">No attached documents.</p>}
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800">Immutable Audit Trail</h3>
                                <div className="flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Securely Logged</div>
                            </div>
                            <div className="space-y-4">
                                {disposal.history?.map((event, i) => (
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
