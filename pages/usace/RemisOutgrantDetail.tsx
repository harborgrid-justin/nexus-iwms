
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_OUTGRANTS, USACE_ASSETS, DOCUMENTS, USACE_INSPECTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { DetailItem } from '../../components/DetailItem';
import { ArrowLeft, Edit, Calendar, DollarSign, FileText, CheckCircle, Lock, Building, Scale, ClipboardList, Plus, AlertTriangle } from 'lucide-react';
import { OutGrant, AuditEvent, OutGrantInspection } from '../../types';
import { OutGrantModal } from './components/OutGrantModal';
import { InspectionModal } from './components/InspectionModal';
import { validateGranteeInsurance, validateOutgrantRevenue } from '../../utils/usaceRules';

const LIFECYCLE_STATES: OutGrant['lifecycleState'][] = ['Proposed', 'Active', 'Amended', 'Suspended', 'Expired', 'Terminated', 'Closed', 'Archived'];

export const RemisOutgrantDetail: React.FC = () => {
    const { outgrantId } = useParams<{ outgrantId: string }>();
    const navigate = useNavigate();
    const [outgrant, setOutgrant] = useState<OutGrant | undefined>(USACE_OUTGRANTS.find(og => og.id === outgrantId));
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
    const [selectedInspection, setSelectedInspection] = useState<OutGrantInspection | null>(null);

    // Filter inspections for this specific outgrant
    const inspections = USACE_INSPECTIONS.filter(i => i.outGrantId === outgrantId);

    if (!outgrant) {
        return <div className="p-6">Out-Grant record not found. <Link to="/usace/outgrants" className="text-blue-600">Return to Dashboard</Link></div>;
    }

    const asset = USACE_ASSETS.find(a => a.id === outgrant.assetId);
    const relatedDocs = DOCUMENTS.filter(d => outgrant.documentIds.includes(d.id));

    // Rule 22 check (simulation FMV)
    const estimatedFMV = outgrant.revenue * 1.1; // Assume revenue is 10% below FMV for testing rule
    const revenueValidation = validateOutgrantRevenue(outgrant, estimatedFMV);

    const handleSaveOutGrant = (updatedRecord: Partial<OutGrant>, reason: string) => {
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'Alex Realty', // Simulated User
            action: 'Record Updated',
            details: reason
        };
        setOutgrant(prev => prev ? { ...prev, ...updatedRecord, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
        setIsEditModalOpen(false);
    };

    const handleSaveInspection = (record: Partial<OutGrantInspection>) => {
        // Mock save inspection logic - normally would update the inspections array state
        console.log("Saving inspection", record);
        alert("Inspection record saved.");
        setIsInspectionModalOpen(false);
    }

    const handleStateTransition = (newState: OutGrant['lifecycleState']) => {
        // Rule 19: Insurance check for active leases
        if (newState === 'Active') {
            const insuranceCheck = validateGranteeInsurance(outgrant);
            if (!insuranceCheck.allowed) {
                alert(insuranceCheck.reason);
                // Allow override in simulation
                if(!confirm("Simulation Override: Proceed without insurance proof?")) return;
            }
        }

        const reason = `Lifecycle state advanced from ${outgrant.lifecycleState} to ${newState}.`;
        const newHistoryEvent: AuditEvent = {
            timestamp: new Date().toLocaleString(),
            user: 'District Commander', 
            action: 'State Transition',
            details: reason,
        };
        setOutgrant(prev => prev ? { ...prev, lifecycleState: newState, history: [newHistoryEvent, ...(prev.history || [])] } : undefined);
    };

    const currentStateIndex = LIFECYCLE_STATES.indexOf(outgrant.lifecycleState);

    return (
        <div className="max-w-[1600px] mx-auto space-y-10 italic font-black">
            <OutGrantModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveOutGrant} outgrant={outgrant} />
            <InspectionModal isOpen={isInspectionModalOpen} onClose={() => setIsInspectionModalOpen(false)} onSave={handleSaveInspection} inspection={selectedInspection} outGrantId={outgrant.id} />
            
            {/* Tactical Command Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-12 pb-16 border-b-4 border-slate-950 relative">
                <div className="absolute -left-12 top-0 bottom-0 w-2 bg-blue-600 pulse-mission shadow-[0_0_20px_rgba(37,99,235,0.6)]" />
                <div className="space-y-8 flex-1">
                    <button 
                        onClick={() => navigate('/usace/outgrants')} 
                        className="flex items-center gap-4 text-[11px] font-black text-slate-400 hover:text-blue-600 transition-all uppercase tracking-[0.6em] mb-4 group bg-slate-50 px-6 py-3 border border-slate-200"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> COMMAND_PIPELINE_RETURN
                    </button>
                    <div className="flex items-center gap-8">
                        <div className="p-6 bg-slate-950 rounded-none text-white shadow-[0_0_50px_rgba(0,0,0,0.3)] transform -rotate-3 group hover:rotate-0 transition-all duration-500">
                            <Building size={48} className="text-blue-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                            <div className="flex items-center gap-6 mb-3">
                                <h1 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none italic select-none">INSTRUMENT::ID_{outgrant.id.toUpperCase()}</h1>
                                <div className="bg-blue-600 text-white px-6 py-2 text-[12px] font-black uppercase tracking-[0.4em] italic shadow-2xl">PRIORITY_ALPHA</div>
                            </div>
                            <div className="flex items-center gap-5 italic bg-slate-50 p-4 border-l-4 border-slate-950">
                                <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] opacity-60">PRIMARY_GRANTEE_ENTITY_HASH</span>
                                <div className="w-2 h-2 bg-blue-600 rotate-45" />
                                <span className="text-[16px] font-mono font-black text-slate-950 uppercase tracking-tighter italic select-all cursor-copy hover:text-blue-600 transition-colors">{outgrant.grantee} [IDENT_VECTOR_L9]</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8 bg-slate-50 p-8 border-2 border-slate-950 shadow-inner">
                    <div className="flex flex-col items-end pr-8 border-r-2 border-slate-200">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-3 italic opacity-60">UTILIZATION_STATE_VEC</span>
                        <div className="flex items-center gap-5">
                            <div className="relative group/badge">
                                <div className="absolute inset-0 bg-blue-600 animate-ping opacity-20 group-hover/badge:opacity-40 transition-opacity" />
                                <span className="px-8 py-4 bg-slate-950 text-white text-[14px] font-black uppercase tracking-[0.4em] italic relative z-10 border border-white/10 shadow-2xl block min-w-[200px] text-center">
                                    {outgrant.lifecycleState.toUpperCase()}
                                </span>
                            </div>
                            <RegulatoryBadge refs={['AR 405-10', 'ER 405-1-12']} />
                        </div>
                    </div>
                    <button onClick={() => setIsEditModalOpen(true)} className="bg-slate-950 text-white hover:bg-blue-600 transition-all transform active:scale-95 py-6 px-12 flex items-center gap-5 text-[12px] font-black uppercase tracking-[0.4em] italic shadow-[0_10px_40px_rgba(0,0,0,0.2)] group">
                        <Edit size={24} className="group-hover:rotate-12 transition-transform" /> MODIFY_STRAT_FIELD_MD
                    </button>
                </div>
            </div>

            <div className="flex flex-col bg-white border-2 border-slate-950 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.2)] relative">
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 0), linear-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px'}} />
                
                {/* Elite Tactical Tabs */}
                <div className="flex border-b-2 border-slate-950 bg-slate-50 italic relative z-10 no-scrollbar overflow-x-auto">
                    {[
                        { id: 'overview', label: 'STRATEGIC_OVERVIEW', icon: ClipboardList },
                        { id: 'utilization', label: 'COMPLIANCE_ENFORCEMENT', icon: CheckCircle },
                        { id: 'inspections', label: 'MONITORING_NODES', icon: Activity },
                        { id: 'history', label: 'AUDIT_LOG_IMMUTABLE', icon: Lock }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)} 
                            className={`flex items-center gap-5 px-12 py-10 text-[13px] font-black uppercase tracking-[0.5em] transition-all relative group border-r-2 border-slate-200 min-w-max ${activeTab === tab.id ? 'bg-white text-slate-950' : 'text-slate-400 hover:text-slate-950'}`}
                        >
                            {activeTab === tab.id && <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600 shadow-[0_10px_20px_rgba(37,99,235,0.4)]" />}
                            <tab.icon size={22} className={activeTab === tab.id ? 'text-blue-600 pulse-mission' : 'text-slate-300'} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-20 relative z-10">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                            <div className="space-y-12">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-2 h-10 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
                                    <h3 className="font-black text-2xl text-slate-950 uppercase tracking-tighter italic">AGREEMENT_STRUCT_METADATA</h3>
                                </div>
                                <div className="space-y-10">
                                    <DetailItem label="INSTRUMENT_CLASSIFICATION" value={outgrant.type.toUpperCase().replace(' ', '_')} icon={FileText} />
                                    <div className="w-full h-px bg-slate-100" />
                                    <DetailItem label="STATUTORY_AUTHORITY_PROTOCOL" value={outgrant.authority.toUpperCase()} icon={Scale} />
                                    <div className="pt-8 border-t-2 border-slate-950 group">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-2 h-2 bg-blue-600 rotate-45" />
                                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em] italic leading-none group-hover:text-blue-600 transition-colors">PERMITTED_UTILIZATION_VECTOR</span>
                                        </div>
                                        <p className="text-[16px] font-black text-slate-950 uppercase tracking-tight italic bg-slate-50 p-10 border-l-8 border-blue-600 leading-relaxed shadow-xl transform transition-transform hover:scale-[1.02] duration-300">
                                            {outgrant.permittedUse}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-12">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-2 h-10 bg-slate-950" />
                                    <h3 className="font-black text-2xl text-slate-950 uppercase tracking-tighter italic">LIFECYCLE_POSITIONING_LOGIC</h3>
                                </div>
                                <div className="space-y-4">
                                    {LIFECYCLE_STATES.map((state, i) => (
                                        <div key={state} className={`flex items-center gap-8 p-6 border-2 transition-all duration-300 group/state ${state === outgrant.lifecycleState ? 'bg-slate-950 border-slate-950 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] scale-105 z-20 relative' : 'bg-white border-slate-100 opacity-30 hover:opacity-100 cursor-pointer hover:border-slate-300'}`}>
                                            <div className={`w-10 h-10 flex items-center justify-center text-[13px] font-black italic border-2 transition-colors ${state === outgrant.lifecycleState ? 'border-blue-500 text-blue-500 bg-white/5' : 'border-slate-200 text-slate-300 group-hover/state:border-slate-400'}`}>
                                                {(i + 1).toString().padStart(2, '0')}
                                            </div>
                                            <span className={`text-[12px] font-black uppercase tracking-[0.4em] italic ${state === outgrant.lifecycleState ? 'text-white' : 'text-slate-400'}`}>{state}</span>
                                            {state === outgrant.lifecycleState && <Activity size={20} className="ml-auto text-blue-500 animate-pulse" />}
                                        </div>
                                    ))}
                                </div>
                                {currentStateIndex < LIFECYCLE_STATES.length - 1 && (
                                    <div className="flex flex-col gap-6 pt-10">
                                        <button 
                                            onClick={() => handleStateTransition(LIFECYCLE_STATES[currentStateIndex + 1])} 
                                            className="w-full py-8 bg-blue-600 text-white font-black text-[14px] uppercase tracking-[0.6em] italic shadow-[0_20px_60px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-all border border-white/20 active:translate-y-2 group"
                                        >
                                            ADVANCE_TO_{LIFECYCLE_STATES[currentStateIndex + 1].toUpperCase()} <ArrowLeft size={20} className="inline rotate-180 ml-4 group-hover:translate-x-4 transition-transform" />
                                        </button>
                                        {outgrant.lifecycleState === 'Active' && (
                                            <button 
                                                onClick={() => handleStateTransition('Terminated')} 
                                                className="w-full py-5 bg-white text-red-600 font-black text-[11px] uppercase tracking-[0.6em] italic hover:bg-red-600 hover:text-white transition-all border-2 border-red-600/30 shadow-lg active:scale-95"
                                            >
                                                EXECUTE_TERMINAL_EVOLUTION_PROTOCOL
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-12">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-2 h-10 bg-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                    <h3 className="font-black text-2xl text-slate-950 uppercase tracking-tighter italic">STRAT_FISCAL_REVENUE_WAVES</h3>
                                </div>
                                <div className="space-y-10">
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                        <div className="p-8 bg-slate-50 border-b-4 border-slate-950 flex flex-col gap-3 italic group hover:bg-white transition-colors cursor-help">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic leading-none opacity-60">START_THETA_MARK</span>
                                            <div className="flex items-center gap-4">
                                                <Calendar size={18} className="text-blue-600 opacity-40" />
                                                <span className="text-[18px] font-mono font-black text-slate-950 uppercase tracking-tighter">{outgrant.startDate.toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-slate-50 border-b-4 border-slate-950 flex flex-col gap-3 italic group hover:bg-white transition-colors cursor-help">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] italic leading-none opacity-60">END_GAMMA_MARK</span>
                                            <div className="flex items-center gap-4">
                                                <Calendar size={18} className="text-red-600 opacity-40 animate-pulse" />
                                                <span className="text-[18px] font-mono font-black text-slate-950 uppercase tracking-tighter">{outgrant.endDate.toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-12 bg-slate-950 border-2 border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.3)] relative overflow-hidden group/fiscal italic">
                                        <div className="absolute right-0 top-0 bottom-0 w-3 bg-emerald-500 pulse-mission shadow-[0_0_20px_rgba(16,185,129,0.6)]" />
                                        <div className="absolute -left-20 -top-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none group-hover/fiscal:bg-emerald-500/10 transition-colors" />
                                        <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.6em] mb-8 block italic relative z-10">ANNUALIZED_YIELD_STRAT_VECTOR</span>
                                        <div className="flex items-baseline gap-4 relative z-10">
                                            <span className="text-6xl font-mono font-black text-white tracking-tighter italic group-hover/fiscal:scale-110 origin-left transition-transform duration-500 leading-none">${outgrant.revenue.toLocaleString()}</span>
                                            <span className="text-[16px] font-black text-emerald-500 uppercase italic opacity-60 group-hover/fiscal:opacity-100 transition-opacity">USD_FY24_SETTLED</span>
                                        </div>
                                        {!revenueValidation.allowed && (
                                            <div className="mt-10 p-6 bg-amber-500/10 border-l-8 border-amber-500 flex items-start gap-5 text-amber-500 italic shadow-lg active:scale-95 cursor-pointer select-none">
                                                <AlertTriangle size={28} className="shrink-0 animate-bounce" />
                                                <span className="text-[11px] font-black uppercase tracking-[0.2em] leading-relaxed">
                                                    CRITICAL_DEVIATION_ALERT:: {revenueValidation.reason.toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'utilization' && (
                        <div className="max-w-[1200px] mx-auto italic font-black">
                            <div className="flex items-center gap-6 mb-16 border-b-4 border-slate-950 pb-8">
                                <div className="w-3 h-12 bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]" />
                                <h3 className="text-4xl font-black text-slate-950 uppercase tracking-tighter italic">UTIL_COMPLIANCE_STRAT_SCAN</h3>
                                <div className="ml-auto text-[12px] text-slate-400 font-mono tracking-widest opacity-60">SCAN_ENGINE_v9.2_ACTIVE</div>
                            </div>
                            {outgrant.utilizationSummary ? (
                                <div className="bg-white border-4 border-slate-950 p-16 shadow-[0_40px_120px_rgba(0,0,0,0.15)] relative italic overflow-hidden">
                                     <div className="absolute -right-10 -top-10 opacity-[0.03] pointer-events-none">
                                        <ClipboardList size={400} className="text-slate-950 rotate-12" />
                                    </div>
                                    <div className="absolute right-16 top-16 scale-125">
                                        <div className={`p-10 border-8 ${outgrant.utilizationSummary.isCompliant ? 'border-emerald-500 text-emerald-500' : 'border-rose-600 text-rose-600'} rotate-12 flex flex-col items-center gap-4 shadow-2xl bg-white select-none group hover:scale-110 transition-transform duration-500`}>
                                            {outgrant.utilizationSummary.isCompliant ? <CheckCircle size={56} className="group-hover:animate-bounce" /> : <AlertTriangle size={56} className="animate-pulse" />}
                                            <span className="text-[18px] font-black uppercase tracking-[0.4em] font-black italic">
                                                {outgrant.utilizationSummary.isCompliant ? 'SYSTEM_VERIFIED' : 'THREAT_VECTOR'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-16 relative z-10">
                                        <div className="flex flex-wrap gap-24">
                                            <div className="flex flex-col min-w-[300px]">
                                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em] mb-4 italic leading-none opacity-60">SCAN_TEMPORAL_MARK_NODE</span>
                                                <div className="flex items-center gap-4">
                                                    <Calendar size={24} className="text-blue-600" />
                                                    <span className="text-3xl font-mono font-black text-slate-950 italic tracking-tighter leading-none">{outgrant.utilizationSummary.lastUpdated.toUpperCase()}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col min-w-[300px]">
                                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em] mb-4 italic leading-none opacity-60">STRAT_COMMAND_OFFICIAL</span>
                                                <div className="flex items-center gap-4">
                                                    <Building size={24} className="text-slate-950" />
                                                    <span className="text-3xl font-black text-slate-950 leading-none uppercase tracking-[0.1em]">{outgrant.utilizationSummary.updatedBy.toUpperCase().replace(' ', '_')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-16 border-t-4 border-slate-950">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-3 h-3 bg-blue-600 rotate-45" />
                                                <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.8em] block italic leading-none">PRIMARY_OBSERVED_UTILIZATION_DATA_BLOB</span>
                                            </div>
                                            <p className="text-[24px] font-black text-slate-950 leading-relaxed bg-slate-50 p-16 border-l-[16px] border-slate-950 italic uppercase tracking-tight shadow-inner relative group">
                                                <span className="absolute -left-6 top-6 text-6xl text-slate-200 group-hover:text-blue-600 transition-colors pointer-events-none opacity-40">"</span>
                                                {outgrant.utilizationSummary.observedUse}
                                                <span className="absolute -right-6 bottom-6 text-6xl text-slate-200 group-hover:text-blue-600 transition-colors pointer-events-none opacity-40">"</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-32 border-4 border-dashed border-slate-100 flex flex-col items-center justify-center italic opacity-40 hover:opacity-100 transition-opacity bg-slate-50 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-blue-600/5 translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
                                    <Database size={80} className="text-slate-300 mb-8 animate-pulse relative z-10" />
                                    <p className="text-[14px] font-black text-slate-400 uppercase tracking-[0.8em] relative z-10">NO_UTILIZATION_SIGNALS_ACQUIRED::STANDBY</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'inspections' && (
                        <div className="space-y-16 italic relative">
                            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end border-b-4 border-slate-950 pb-10 gap-8">
                                <div className="flex items-center gap-8">
                                    <div className="w-3 h-14 bg-rose-600 shadow-[0_0_25px_rgba(225,29,72,0.5)]" />
                                    <div>
                                        <h3 className="text-4xl font-black text-slate-950 uppercase tracking-tighter italic leading-none mb-3">MONITORING_NODES_REGISTRY</h3>
                                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.6em] opacity-60">FY24_FIELD_TELEMETRY_LOG</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => { setSelectedInspection(null); setIsInspectionModalOpen(true); }} 
                                    className="bg-slate-950 text-white hover:bg-rose-600 transition-all transform active:scale-95 py-6 px-12 flex items-center gap-6 text-[13px] font-black uppercase tracking-[0.5em] italic shadow-[0_20px_50px_rgba(0,0,0,0.2)] group"
                                >
                                    <Plus size={24} className="group-hover:rotate-180 transition-transform" /> INITIATE_FIELD_MONITOR_TICKET
                                </button>
                            </div>
                            <div className="bg-white border-2 border-slate-950 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] relative z-10">
                                <div className="overflow-x-auto no-scrollbar">
                                    <table className="w-full text-left border-collapse font-black italic">
                                        <thead>
                                            <tr className="bg-slate-950 text-white/30 border-b-2 border-slate-800 italic">
                                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] border-r border-white/5">TIMESTAMP_MARKER</th>
                                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] border-r border-white/5">VEC_NODE_TYPE</th>
                                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] border-r border-white/5">OFFICIAL_UUID</th>
                                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] border-r border-white/5 whitespace-nowrap">TELEMETRY_FINDINGS_STREAM</th>
                                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] border-r border-white/5 text-center">VECTOR_STATUS</th>
                                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] text-right">COMMAND</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y-2 divide-slate-100">
                                            {inspections.map((insp) => (
                                                <tr key={insp.id} className="group/row cursor-crosshair hover:bg-slate-950 transition-all duration-300">
                                                    <td className="px-10 py-10 font-mono text-[14px] font-black text-slate-400 group-hover/row:text-white transition-colors italic tracking-tighter border-r-2 border-slate-50 group-hover/row:border-slate-800">{insp.inspectionDate.toUpperCase()}</td>
                                                    <td className="px-10 py-10 font-black text-slate-950 group-hover/row:text-blue-400 transition-colors uppercase tracking-[0.3em] text-[13px] border-r-2 border-slate-50 group-hover/row:border-slate-800 leading-none">{insp.type.toUpperCase().replace(' ', '_')}</td>
                                                    <td className="px-10 py-10 font-black text-slate-400 group-hover/row:text-white/60 text-[11px] uppercase tracking-[0.4em] transition-colors italic border-r-2 border-slate-50 group-hover/row:border-slate-800 truncate">Agent::{insp.inspector.toUpperCase().split(' ')[0]}</td>
                                                    <td className="px-10 py-10 border-r-2 border-slate-50 group-hover/row:border-slate-800 max-w-md">
                                                        <p className="text-[13px] font-black text-slate-950 group-hover/row:text-white/90 uppercase italic tracking-tight leading-relaxed line-clamp-2">{insp.findings}</p>
                                                    </td>
                                                    <td className="px-10 py-10 border-r-2 border-slate-50 group-hover/row:border-slate-800 text-center">
                                                        <span className={`px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] italic border-2 transition-all ${insp.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-500/20 group-hover/row:bg-emerald-500 group-hover/row:text-white group-hover/row:border-emerald-400 group-hover/row:shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-amber-50 text-amber-600 border-amber-500/20 group-hover/row:bg-amber-500 group-hover/row:text-white group-hover/row:border-amber-400 group-hover/row:shadow-[0_0_15px_rgba(245,158,11,0.4)]'}`}>
                                                            {insp.status.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-10 text-right">
                                                        <button onClick={() => { setSelectedInspection(insp); setIsInspectionModalOpen(true); }} className="text-[11px] font-black text-blue-600 group-hover/row:text-white uppercase tracking-[0.5em] italic group-hover/row:bg-blue-600 group-hover/row:px-6 group-hover/row:py-3 transition-all border border-transparent group-hover/row:border-blue-400 group-hover/row:shadow-[0_0_15px_rgba(37,99,235,0.4)]">PULL_VEC_MODS</button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {inspections.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="p-32 text-center italic bg-slate-50">
                                                        <div className="flex flex-col items-center opacity-20 group hover:opacity-100 transition-opacity">
                                                            <Activity size={64} className="mb-6 text-slate-300 animate-pulse" />
                                                            <span className="text-[13px] font-black uppercase tracking-[1em]">NO_MONITOR_SIGNAL_WAVES::STANDBY_FOR_VEC</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="max-w-[1000px] mx-auto italic relative font-black">
                            <div className="flex items-center justify-between mb-20 border-b-4 border-slate-950 pb-10">
                                <div className="space-y-6">
                                    <h3 className="text-4xl font-black text-slate-950 uppercase tracking-tighter italic leading-none">IMMUTABLE_STRAT_LOG_V8</h3>
                                    <div className="flex items-center gap-6 text-[12px] font-black text-slate-400 uppercase tracking-[0.6em] italic">
                                        <Lock size={20} className="text-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" /> ENCRYPTION_LAYER_ALPHA_SECURE
                                    </div>
                                </div>
                                <Terminal size={64} className="text-slate-100 animate-pulse pointer-events-none" />
                            </div>
                            
                            <div className="space-y-16 relative">
                                <div className="absolute left-[30px] top-6 bottom-6 w-1 bg-slate-100 shadow-[2px_0_10px_rgba(0,0,0,0.05)]" />
                                {(outgrant.history || []).map((event, i) => (
                                    <div key={i} className="flex gap-16 group/audit relative">
                                        <div className="relative z-10 flex flex-col items-center shrink-0">
                                            <div className={`w-16 h-16 border-4 flex items-center justify-center transform transition-all duration-500 group-hover/audit:rotate-[360deg] shadow-lg ${i === 0 ? 'bg-slate-950 border-blue-600 text-blue-500 pulse-mission' : 'bg-white border-slate-200 text-slate-300 group-hover/audit:border-slate-950 group-hover/audit:text-slate-950'}`}>
                                                <Database size={24} />
                                            </div>
                                        </div>
                                        <div className="flex-1 pb-16 border-b-2 border-slate-50 last:border-b-0 space-y-6">
                                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 xl:gap-0">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-[18px] font-black text-slate-950 uppercase tracking-[0.1em] italic leading-none">{event.action.toUpperCase().replace(' ', '_')}</span>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-blue-600 rotate-45" />
                                                        <span className="text-[12px] font-black text-blue-600 uppercase tracking-[0.5em] italic">OP_ID::{event.user.toUpperCase().replace(' ', '_')}</span>
                                                    </div>
                                                </div>
                                                <div className="bg-slate-50 px-6 py-2 border border-slate-200 shadow-sm self-start xl:self-auto">
                                                     <span className="text-[13px] font-mono font-black text-slate-400 uppercase italic tracking-tighter group-hover/audit:text-slate-950 transition-colors">{event.timestamp.toUpperCase()}</span>
                                                </div>
                                            </div>
                                            {event.details && (
                                                <div className="relative transform transition-transform group-hover/audit:translate-x-2 duration-300">
                                                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-slate-950 shadow-[2px_0_5px_rgba(0,0,0,0.2)]" />
                                                    <div className="p-10 bg-slate-50 italic text-[16px] font-black text-slate-950 uppercase leading-relaxed shadow-xl border border-slate-200 relative overflow-hidden group/detail">
                                                        <div className="absolute right-3 top-3 text-4xl opacity-[0.05] group-hover/detail:opacity-10 transition-opacity">SEQ_0{i}</div>
                                                        {event.details.toUpperCase()}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Terminal Status bar */}
            <div className="bg-slate-950 p-10 flex flex-col md:flex-row justify-between items-center text-[12px] font-black uppercase tracking-[1em] italic text-white/30 border-t-8 border-blue-600 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] relative z-50 gap-8 md:gap-0">
                <div className="flex items-center gap-8">
                    <Terminal size={24} className="text-blue-500 animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
                    UTILIZATION_COMMAND_NODE_V9_CORE::READY_FOR_VECTOR_INPUT
                </div>
                <div className="flex flex-wrap justify-center gap-16">
                    <span className="text-blue-500/20 hover:text-white/40 transition-colors select-none cursor-pointer">0xFF_CORE_HASH_UP_v9.21X...</span>
                    <span>HOD::OPERATOR_SYST_CMD</span>
                </div>
            </div>
        </div>
    );
};
