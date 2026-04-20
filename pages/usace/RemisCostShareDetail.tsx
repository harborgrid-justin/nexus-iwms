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
        <div className="max-w-[1600px] mx-auto space-y-6">
            <CostShareModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSave} agreement={agreement} />
            <div className="border-b border-slate-200 pb-6">
                <button onClick={() => navigate('/usace/cost-share')} className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-blue-600 mb-4 transition-colors uppercase tracking-[0.2em] italic"><ArrowLeft size={14} /> Back to Strategic Dashboard</button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="p-3 bg-slate-950 rounded shadow-xl shadow-black/20 text-white">
                            <PieChart size={32} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">{agreement.projectId}</h1>
                                <div className="pulse-mission" />
                                <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded-sm font-black uppercase tracking-widest leading-none">{agreement.costShareRatio} Partioned Split</span>
                            </div>
                            <div className="flex items-center gap-3 mt-2 italic">
                                <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-tighter">AGR_NODE::{agreement.id}</span>
                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-tighter">ASSET::{asset?.rpuid}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end mr-4 group cursor-help">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Lifecycle State</span>
                            <span className="text-xs font-black px-3 py-1 bg-slate-900 text-white uppercase tracking-widest">{agreement.lifecycleState}</span>
                        </div>
                        <button onClick={() => setIsEditModalOpen(true)} className="btn-pro-secondary flex items-center gap-2 px-4 py-2 h-auto text-[10px] font-black uppercase tracking-widest italic"><Edit size={14} /> Adjust Agreement</button>
                        <RegulatoryBadge refs={['AR 405-10', 'EP 1165-2-1']} />
                    </div>
                </div>
            </div>

            <div className="pro-card flex flex-col bg-white">
                <div className="px-6 border-b border-slate-100 bg-[#0A0A0B]">
                    <nav className="-mb-px flex gap-10" aria-label="Tabs">
                        {[
                            { id: 'overview', label: 'Strategic Financial Core' },
                            { id: 'contributions', label: 'Contribution Matrix' },
                            { id: 'lifecycle', label: 'Lifecycle Operations' },
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
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 italic">Authority & Sponsor Node</h3>
                                <div className="space-y-4">
                                    <DetailItem label="Primary Sponsor" value={agreement.sponsor} icon={Landmark} />
                                    <DetailItem label="Legal Authority" value={agreement.authority} icon={Scale} />
                                    <DetailItem label="Statutory Basis" value={agreement.statutoryBasis} icon={ShieldCheck} />
                                    <DetailItem label="Responsible Org" value={agreement.responsibleOrg} icon={Building} />
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 italic">Financial Parameter Block</h3>
                                <div className="space-y-4">
                                    <DetailItem label="Gross Project Value" value={`$${agreement.totalProjectCost.toLocaleString()}.00`} icon={DollarSign} />
                                    <DetailItem label="Federal Interest" value={`${agreement.federalSharePercentage}%`} icon={PieChart} />
                                    <DetailItem label="Sponsor Threshold" value={`$${agreement.partnerContribution.toLocaleString()}.00`} icon={DollarSign} />
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 italic">Real-Time Obligation Status</h3>
                                <div className="pro-card p-6 bg-slate-50 border-slate-200 hover:border-blue-300 transition-all">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic mb-2">Total Contributions Credited</p>
                                    <p className="text-3xl font-black text-emerald-600 tracking-tighter font-mono">${totalCredited.toLocaleString()}.00</p>
                                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-6 overflow-hidden">
                                        <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${Math.min((totalCredited / agreement.partnerContribution) * 100, 100)}%` }}></div>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{((totalCredited / agreement.partnerContribution) * 100).toFixed(1)}% Obligation Met</p>
                                        <span className="text-[10px] font-mono font-bold text-slate-500 bg-white border border-slate-100 px-2 py-0.5 rounded-sm">REMAINING::${remainingObligation.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contributions' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 rounded-sm italic">
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Sponsor Contribution Node Mapping</h3>
                                <button className="btn-pro-primary text-[9px] font-black uppercase tracking-widest h-auto py-1.5 px-4 italic">Register New Context</button>
                            </div>
                            <div className="pro-card border-slate-200 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-[#0A0A0B] border-b border-slate-800">
                                        <tr>
                                            <th className="p-4 pro-col-header text-white/50">TIMESTAMP_LOG</th>
                                            <th className="p-4 pro-col-header text-white/50">INSTRUMENT_TYPE</th>
                                            <th className="p-4 pro-col-header text-white/50">DESCRIPTION_VECTOR</th>
                                            <th className="p-4 pro-col-header text-white/50">VALUATION_METHOD</th>
                                            <th className="p-4 pro-col-header text-white/50 text-right">VALUE_OBLIG</th>
                                            <th className="p-4 pro-col-header text-white/50">LIFECYCLE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {(agreement.contributions || []).map((c, idx) => (
                                            <tr key={idx} className="pro-data-row group">
                                                <td className="p-4 font-mono text-[11px] font-black text-slate-500 italic">{c.dateRecorded}</td>
                                                <td className="p-4">
                                                    <span className="text-[9px] font-black border border-slate-200 bg-white px-2 py-1 rounded-sm text-slate-600 uppercase tracking-widest transition-all group-hover:border-blue-200 group-hover:text-blue-600 italic leading-none">{c.type}</span>
                                                </td>
                                                <td className="p-4 font-black text-slate-700 text-[11px] uppercase tracking-tight">{c.description}</td>
                                                <td className="p-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{c.valuationMethod}</td>
                                                <td className="p-4 text-right font-mono font-black text-slate-900 group-hover:text-emerald-600 tracking-tighter text-[13px]">${c.amount.toLocaleString()}.00</td>
                                                <td className="p-4">
                                                    <div className={`text-[9px] px-2.5 py-1 rounded-sm font-black uppercase tracking-widest italic border ${c.status === 'Credited' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                                        {c.status}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lifecycle' && (
                        <div className="space-y-12">
                            <div className="pro-card p-8 bg-slate-950 border-white/5 flex justify-between items-center shadow-2xl">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] italic">Current State Context</span>
                                        <div className="pulse-mission" />
                                    </div>
                                    <h3 className="font-black text-white text-3xl tracking-tighter uppercase mt-2 italic">{agreement.lifecycleState}</h3>
                                    <p className="text-[10px] text-white/40 font-mono mt-2 uppercase tracking-widest">Authorized Activation Date: {agreement.agreementDate}</p>
                                </div>
                                <div className="flex gap-4">
                                    {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                        <button onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} className="btn-pro-primary flex items-center gap-2 group px-6 py-4 h-auto text-[11px] font-black uppercase tracking-[0.25em] italic">
                                            Advance Workflow to {LIFECYCLE_STATES[currentStateIndex + 1]}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] italic flex items-center gap-3">
                                    <div className="w-8 h-[1px] bg-slate-200" />
                                    Authorized Workflow Progression Matrix
                                    <div className="flex-1 h-[1px] bg-slate-200/50" />
                                </h3>
                                <div className="flex items-center w-full px-4">
                                    {LIFECYCLE_STATES.map((state, i) => (
                                        <React.Fragment key={state}>
                                            <div className="flex flex-col items-center relative group min-w-[120px]">
                                                <div className={`w-10 h-10 rounded shadow-md flex items-center justify-center border transition-all duration-500 z-10 ${i <= currentStateIndex ? 'bg-slate-950 border-blue-500/50 text-blue-400' : 'bg-white border-slate-200 text-slate-300'}`}>
                                                    {i < currentStateIndex ? <CheckCircle size={20} className="text-emerald-400" /> : <span className="text-[11px] font-black font-mono tracking-tighter">{i+1}</span>}
                                                </div>
                                                <p className={`text-[9px] mt-4 text-center font-black uppercase tracking-[0.1em] italic leading-tight transition-colors duration-500 ${i <= currentStateIndex ? 'text-slate-900' : 'text-slate-300'}`}>{state}</p>
                                                {i === currentStateIndex && (
                                                    <div className="absolute -top-1 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                                                )}
                                            </div>
                                            {i < LIFECYCLE_STATES.length - 1 && (
                                                <div className="flex-1 h-0.5 relative mx-2">
                                                    <div className="absolute inset-0 bg-slate-100" />
                                                    <div className={`absolute inset-0 bg-blue-500 transition-all duration-1000 ${i < currentStateIndex ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                                                </div>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 italic">
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <FileText size={14} className="text-blue-500" /> Immutable Command Log
                                </h3>
                                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 tracking-widest uppercase italic">
                                    <Lock size={12} className="text-slate-300" /> Automated Compliance Logging Enabled
                                </div>
                            </div>
                            <div className="space-y-6 pl-4 border-l-2 border-slate-100">
                                {(agreement.history || []).map((event, i) => (
                                    <div key={i} className="flex gap-8 relative group">
                                        <div className="absolute -left-[11px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 transition-all group-hover:border-blue-400">
                                            <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`} />
                                        </div>
                                        <div className="pro-card p-4 bg-slate-50 border-slate-200 group-hover:border-blue-200 flex-1 transition-all">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-[9px] font-bold text-slate-400 font-mono tracking-tighter uppercase italic">{event.timestamp}</p>
                                                <span className="text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm uppercase tracking-widest italic">{event.action}</span>
                                            </div>
                                            <p className="font-black text-slate-900 text-[11px] uppercase tracking-tight leading-none mb-2">Authenticated User:: {event.user}</p>
                                            {event.details && <p className="text-[10px] text-slate-500 italic mt-2 border-t border-slate-200 pt-2 leading-relaxed">{event.details}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="px-6 py-4 bg-slate-950 border-t border-white/5 flex justify-between items-center">
                   <div className="flex items-center gap-3">
                       <CheckCircle size={14} className="text-emerald-500" />
                       <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] italic leading-none">Agreement Financial Protocol Active (FPR_V2)</span>
                   </div>
                   <div className="text-[10px] font-mono text-white/20 italic tracking-tighter">SIG::COMMAND_FIN_ALPHA</div>
                </div>
            </div>
        </div>
    );
};