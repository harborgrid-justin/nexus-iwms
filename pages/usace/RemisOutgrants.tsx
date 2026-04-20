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
        <div className="max-w-[1600px] mx-auto space-y-6">
            <OutGrantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} outgrant={selectedOutgrant} />
            
            {/* Out-Grants Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-slate-950 rounded text-white shadow-sm">
                            <FileClock size={16} />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase px-1">Utilization & Out-Grant Terminal</h1>
                        <RegulatoryBadge refs={['12', '16']} />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="data-label text-blue-600">Enterprise Instrument Command Center</span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Protocol: AR 405-10</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 flex items-center gap-1.5 transition-colors px-3 py-2">
                        <Download size={14} /> Fiscal Export
                    </button>
                    <button onClick={handleNew} className="btn-pro-primary flex items-center gap-2">
                        <Plus size={16} /> New Instrument
                    </button>
                </div>
            </div>

            <div className="pro-card overflow-hidden flex flex-col">
                <div className="px-6 border-b border-slate-200 bg-white flex justify-between items-center">
                    <nav className="-mb-px flex gap-8" aria-label="Tabs">
                        <button 
                            onClick={() => setActiveTab('outgrants')} 
                            className={`shrink-0 border-b-2 px-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'outgrants' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            Active Instruments
                        </button>
                        <button 
                            onClick={() => setActiveTab('inspections')} 
                            className={`shrink-0 border-b-2 px-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'inspections' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            Utilization Monitoring
                        </button>
                    </nav>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input type="text" placeholder="Scan portfolio..." className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-mono outline-none focus:ring-1 focus:ring-blue-500 transition-all italic" />
                        </div>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors border border-slate-200 rounded bg-slate-50"><Filter size={14} /></button>
                    </div>
                </div>

                <div className="overflow-x-auto italic font-mono">
                    {activeTab === 'outgrants' && (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#0A0A0B] text-white border-b border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black">GRANTEE ENTITY</th>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black">ASSET NODE</th>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black">TYPE</th>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black">LIFECYCLE</th>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black">EXPIRY</th>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black text-right">REVENUE</th>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black text-right">COMMAND</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {USACE_OUTGRANTS.map(og => (
                                    <tr key={og.id} className="hover:bg-slate-50 group cursor-pointer transition-all">
                                        <td className="px-6 py-4 not-italic">
                                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{og.grantee}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-blue-600 uppercase tracking-tighter">{og.assetId}</span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-bold text-xs uppercase tracking-widest">{og.type}</td>
                                        <td className="px-6 py-4 not-italic">
                                            <StatusBadge status={og.lifecycleState} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px]">
                                                <Calendar size={12} className="text-blue-500" />
                                                {og.endDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right not-italic bg-slate-50/30 group-hover:bg-transparent transition-colors">
                                            <div className="font-black text-emerald-600 text-sm tracking-tighter">
                                                ${og.revenue.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right not-italic">
                                            <button 
                                                onClick={() => navigate(`/usace/outgrants/${og.id}`)}
                                                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-blue-600 flex items-center gap-1 justify-end transition-colors"
                                            >
                                                MANAGE <ArrowUpRight size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'inspections' && (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#0A0A0B] text-white border-b border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black">INSTRUMENT REF</th>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black">MONITORING DATE</th>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black">CLASS</th>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black">INSPECTOR</th>
                                    <th className="px-6 py-4 data-label text-slate-400 font-black">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {USACE_INSPECTIONS.map(i => (
                                    <tr key={i.id} className="hover:bg-slate-50 transition-all group cursor-pointer">
                                        <td className="px-6 py-4">
                                            <Link to={`/usace/outgrants/${i.outGrantId}`} className="font-bold text-blue-600 hover:underline uppercase tracking-tighter">{i.outGrantId}</Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px]">
                                                <Activity size={12} className="text-blue-500" />
                                                {i.inspectionDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 not-italic font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{i.type}</td>
                                        <td className="px-6 py-4 not-italic font-bold text-slate-600 text-xs uppercase tracking-widest">{i.inspector}</td>
                                        <td className="px-6 py-4 not-italic">
                                            <StatusBadge status={i.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                
                <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-100 italic text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aggregate utilization metrics validated for current fiscal cycles</span>
                </div>
            </div>
        </div>
    );
};
