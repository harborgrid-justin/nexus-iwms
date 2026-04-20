import React, { useState } from 'react';
import { FileClock, Plus, Search, Eye, Edit, Download, Filter, MoreHorizontal, MapPin, DollarSign as DollarIcon, Calendar, Activity, Terminal, Database, ArrowUpRight } from 'lucide-react';
import { USACE_OUTGRANTS, USACE_INSPECTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { OutGrant } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { OutGrantModal } from './components/OutGrantModal';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisOutgrants: React.FC = () => {
    const [activeTab, setActiveTab] = useState('outgrants');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOutgrant, setSelectedOutgrant] = useState<OutGrant | null>(null);
    const navigate = useNavigate();
    
    const handleNew = () => {
        setSelectedOutgrant(null);
        setIsModalOpen(true);
    };

    const handleSave = (record: Partial<OutGrant>, reason: string) => {
        console.log("Saving outgrant:", record, "Reason:", reason);
        alert('Out-Grant record authorized. Strategic utilization tracking initialized.');
        setIsModalOpen(false);
    };

    return (
    <div className="max-w-[1600px] mx-auto space-y-8 italic font-black">
        <OutGrantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} outgrant={selectedOutgrant} />
        
        {/* Out-Grants Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 pb-16 border-b-4 border-slate-950 relative">
            <div className="absolute -left-12 top-0 bottom-0 w-2 bg-blue-600 pulse-mission shadow-[0_0_20px_rgba(37,99,235,0.6)]" />
            <div className="space-y-6">
                <div className="flex items-center gap-8 mb-4">
                    <div className="p-5 bg-slate-950 rounded-none text-white shadow-[0_0_40px_rgba(0,0,0,0.3)] transform -rotate-3 group hover:rotate-0 transition-transform">
                        <FileClock size={40} className="text-blue-500 group-hover:animate-pulse" />
                    </div>
                    <div>
                        <div className="flex items-center gap-6 mb-2">
                             <h1 className="text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none italic select-none">Utilization & Instrument Command</h1>
                             <div className="bg-slate-950 text-white px-6 py-2 text-[11px] font-black uppercase tracking-[0.4em] italic shadow-2xl">REGISTRY_V4.0</div>
                        </div>
                        <div className="flex items-center gap-5">
                            <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.6em] italic leading-none opacity-60">REGISTRY_NODE_OG_CORE_921X</span>
                            <div className="w-2 h-2 bg-slate-300 rotate-45" />
                            <span className="text-[12px] font-mono font-black text-blue-600 uppercase tracking-widest italic leading-none">ENTERPRISE_INSTRUMENT_L9_SECURE</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-10 italic border-l-4 border-slate-950 pl-10 bg-slate-50 py-4 pr-8 shadow-inner">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 italic opacity-40">PRIMARY_PROTOCOL</span>
                        <span className="text-[14px] font-black text-slate-950 uppercase tracking-[0.1em] italic leading-none">AR 405-10_CORE_STRATEGY</span>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 italic opacity-40">MISSION_CRITICALITY</span>
                        <span className="text-[14px] font-black text-blue-700 uppercase tracking-[0.1em] italic leading-none">MAX_UTILIZATION_VECTOR_SYNC</span>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <RegulatoryBadge refs={['ER 405-1-12', '12', '16']} />
                </div>
            </div>
            
            <div className="flex items-center gap-6 shrink-0">
                <button className="bg-white border-2 border-slate-950 text-slate-950 flex items-center gap-4 px-8 py-5 h-auto text-[11px] font-black uppercase tracking-[0.4em] italic shadow-xl hover:bg-slate-50 transition-all active:translate-y-1">
                    <Download size={20} className="text-blue-600" /> FISCAL_AUDIT_EXPORT
                </button>
                <button onClick={handleNew} className="bg-slate-950 text-white flex items-center gap-6 px-12 py-6 h-auto text-[11px] font-black uppercase tracking-[0.4em] italic shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:bg-blue-600 transition-all transform active:scale-95 group">
                    <Plus size={24} className="group-hover:rotate-180 transition-transform" /> INITIATE_NEW_INSTRUMENT
                </button>
            </div>
        </div>

        <div className="flex flex-col bg-white border-2 border-slate-950 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.15)] relative">
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{backgroundImage: 'linear-gradient(90deg, #000 1px, transparent 0), linear-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px'}} />
            <div className="px-10 py-0 border-b-2 border-slate-950 bg-slate-50 flex flex-col xl:flex-row justify-between items-center italic gap-10 xl:gap-0 relative z-10">
                <nav className="-mb-[2px] flex gap-12" aria-label="Tabs">
                    {[
                        { id: 'outgrants', label: 'ACTIVE_INSTRUMENTS_MATRIX', icon: Database },
                        { id: 'inspections', label: 'UTILIZATION_OVERSIGHT_WAVES', icon: Activity }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)} 
                            className={`flex items-center gap-4 px-4 py-8 text-[12px] font-black uppercase tracking-[0.5em] transition-all relative border-b-4 ${activeTab === tab.id ? 'border-blue-600 text-slate-950 bg-white shadow-[0_-10px_30px_-5px_rgba(37,99,235,0.1)]' : 'border-transparent text-slate-400 hover:text-slate-950'}`}
                        >
                            <tab.icon size={18} className={activeTab === tab.id ? 'text-blue-600 pulse-mission' : 'text-slate-300'} />
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="flex items-center gap-10 pb-8 xl:pb-0">
                    <div className="relative group min-w-[400px]">
                        <div className="absolute -left-2 top-0 bottom-0 w-1.5 bg-blue-600 group-focus-within:h-full transition-all duration-300" />
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                        <input type="text" placeholder="SCAN_INSTRUMENT_VECTORS..." className="w-full pl-16 pr-8 py-5 border-none bg-white/50 focus:bg-white text-[13px] outline-none italic font-black uppercase tracking-widest transition-all shadow-inner" />
                    </div>
                    <button className="flex items-center gap-4 text-[11px] font-black text-slate-400 hover:text-slate-950 transition-all uppercase tracking-[0.6em] italic group bg-white px-6 py-3 border border-slate-200">
                        <Filter size={18} className="group-hover:rotate-180 transition-transform text-blue-600" /> VECTOR_LOCK
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto bg-white relative z-10 no-scrollbar">
                {activeTab === 'outgrants' && (
                    <table className="w-full text-left border-collapse font-black italic">
                        <thead>
                            <tr className="bg-slate-950 border-b-2 border-slate-800 tracking-tighter">
                                <th className="px-10 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">GRANTEE_ENTITY_HASH</th>
                                <th className="px-10 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">ASSET_NODE_UUID</th>
                                <th className="px-10 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">INSTR_CLASSIFICATION</th>
                                <th className="px-10 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5 text-center">LIFECYCLE_POS</th>
                                <th className="px-10 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] border-r border-white/5">EXPIRY_WINDOW</th>
                                <th className="px-10 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] text-right bg-white/5 border-l border-white/5">STRAT_REVENUE_USD</th>
                                <th className="px-10 py-8 text-[11px] font-black text-white/30 uppercase tracking-[0.5em] text-right">COMMAND</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-slate-100">
                            {USACE_OUTGRANTS.map(og => (
                                <tr key={og.id} onClick={() => navigate(`/usace/outgrants/${og.id}`)} className="group/row cursor-crosshair hover:bg-slate-950 transition-all duration-300">
                                    <td className="px-10 py-10 relative border-r-2 border-slate-50 group-hover/row:border-slate-800">
                                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-600 opacity-0 group-hover/row:opacity-100 transition-all transform -translate-x-full group-hover/row:translate-x-0 shadow-[0_0_20px_rgba(37,99,235,0.6)]" />
                                        <div className="font-black text-slate-950 group-hover/row:text-blue-400 transition-colors uppercase tracking-[0.02em] text-[16px] leading-none mb-3 italic">{og.grantee.toUpperCase().replace(' ', '_')}</div>
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] italic opacity-40 group-hover/row:opacity-100 transition-opacity">GRANTEE_IDENT_NODE_0x{og.id.slice(-4).toUpperCase()}</span>
                                    </td>
                                    <td className="px-10 py-10 border-r-2 border-slate-50 group-hover/row:border-slate-800">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-6 bg-slate-100 group-hover/row:bg-blue-600 transition-colors" />
                                            <span className="font-mono text-[13px] font-black text-slate-400 group-hover/row:text-white uppercase tracking-tighter transition-colors">NODE::{og.assetId}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10 text-[13px] font-black uppercase tracking-[0.3em] italic text-slate-400 group-hover/row:text-white/60 border-r-2 border-slate-50 group-hover/row:border-slate-800">{og.type.toUpperCase().replace(' ', '_')}</td>
                                    <td className="px-10 py-10 border-r-2 border-slate-50 group-hover/row:border-slate-800 text-center">
                                        <div className="group-hover/row:scale-110 transition-transform">
                                            <StatusBadge status={og.lifecycleState} />
                                        </div>
                                    </td>
                                    <td className="px-10 py-10 border-r-2 border-slate-50 group-hover/row:border-slate-800">
                                        <div className="flex items-center gap-4 text-slate-400 font-black text-[13px] italic">
                                            <Calendar size={18} className="text-blue-500 opacity-40 group-hover/row:opacity-100 group-hover/row:animate-pulse transition-opacity" />
                                            <span className="group-hover/row:text-white transition-colors uppercase tracking-widest leading-none">{og.endDate.toUpperCase()}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10 text-right bg-slate-50 group-hover/row:bg-slate-950 border-l-2 border-transparent group-hover/row:border-white/10 transition-all font-mono font-black italic">
                                        <div className="flex items-center justify-end gap-3 text-emerald-600 group-hover/row:text-emerald-400 text-[18px] tracking-tighter group-hover/row:scale-110 origin-right transition-transform">
                                            <span className="text-[12px] opacity-40 group-hover/row:opacity-100 group-hover/row:animate-pulse">$</span>
                                            {og.revenue.toLocaleString()}.00
                                        </div>
                                    </td>
                                    <td className="px-10 py-10 text-right">
                                        <button className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-300 group-hover/row:text-white group-hover/row:bg-blue-600 group-hover/row:px-6 group-hover/row:py-3 transition-all italic border-transparent border group-hover/row:border-blue-400 flex items-center gap-4 justify-end ml-auto group-hover/row:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                                            CMD_ACCESS <ArrowUpRight size={20} className="group-hover/row:translate-x-1 group-hover/row:-translate-y-1 transition-transform" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {activeTab === 'inspections' && (
                    <table className="w-full text-left font-black italic border-collapse">
                        <thead>
                            <tr className="bg-slate-950 border-b-2 border-slate-800 tracking-tighter text-white/30 italic">
                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] border-r border-white/5">INSTRUMENT_REF_UUID</th>
                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] border-r border-white/5">MONITOR_TIMESTAMP</th>
                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] border-r border-white/5">SYSTEM_CLASS</th>
                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] border-r border-white/5">INSPECTOR_ID</th>
                                <th className="px-10 py-8 text-[11px] uppercase tracking-[0.5em] text-center">VECTOR_STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-slate-100">
                            {USACE_INSPECTIONS.map(i => (
                                <tr key={i.id} className="group/row cursor-crosshair hover:bg-slate-950 transition-all duration-300">
                                    <td className="px-10 py-10 relative border-r-2 border-slate-50 group-hover/row:border-slate-800">
                                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-rose-600 opacity-0 group-hover/row:opacity-100 transition-all transform -translate-x-full group-hover/row:translate-x-0 shadow-[0_0_20px_rgba(225,29,72,0.6)]" />
                                        <Link to={`/usace/outgrants/${i.outGrantId}`} className="font-mono text-[14px] font-black text-blue-600 hover:text-blue-400 uppercase tracking-tighter transition-colors group-hover/row:scale-105 origin-left duration-300 block">TRK_OG::{i.outGrantId.toUpperCase()}</Link>
                                    </td>
                                    <td className="px-10 py-10 border-r-2 border-slate-50 group-hover/row:border-slate-800">
                                        <div className="flex items-center gap-4 text-slate-500 font-black text-[13px] group-hover/row:text-white transition-colors">
                                            <Activity size={18} className="text-rose-600 animate-pulse" />
                                            <span className="uppercase tracking-widest leading-none">{i.inspectionDate.toUpperCase()}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-10 font-black text-slate-950 group-hover/row:text-blue-400 transition-colors uppercase tracking-[0.3em] text-[13px] border-r-2 border-slate-50 group-hover/row:border-slate-800">{i.type.toUpperCase().replace(' ', '_')}</td>
                                    <td className="px-10 py-10 font-black text-slate-400 text-[11px] uppercase tracking-[0.4em] group-hover/row:text-white/60 transition-colors italic border-r-2 border-slate-50 group-hover/row:border-slate-800">Inspector::{i.inspector.toUpperCase().replace(' ', '_')}</td>
                                    <td className="px-10 py-10 text-center">
                                         <div className="group-hover/row:scale-110 transition-transform">
                                            <StatusBadge status={i.status} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            
            <div className="px-10 py-8 bg-slate-950 border-t-2 border-white/5 flex flex-col md:flex-row justify-between items-center text-[12px] font-black uppercase tracking-[1em] italic text-white/30 shadow-inner gap-8 md:gap-0">
                <div className="flex items-center gap-8">
                    <Terminal size={24} className="text-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    UTILIZATION_CORE_SIGNAL_STABLE_V6::NODE_ACTIVE
                </div>
                <div className="flex flex-wrap justify-center gap-16 transition-all duration-700">
                    <span className="text-white/10 select-none hover:text-white/30 cursor-not-allowed">AGGREGATE_METRICS::VALIDATED_FY24_EPOCH</span>
                    <span className="font-mono text-emerald-500/40 select-all cursor-help hover:text-emerald-400">SIGNAL_STREAM_LOCK::0x921F0_ALPHA_CORE</span>
                </div>
            </div>
        </div>
    </div>
    );
};
