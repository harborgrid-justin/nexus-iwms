import React, { useState } from 'react';
import { FileClock, Plus, Search, Eye, Edit, Download, Filter, MoreHorizontal, MapPin, DollarSign as DollarIcon, Calendar, Activity, Gavel, Briefcase, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import { USACE_SOLICITATIONS, USACE_ACQUISITIONS, CONTRACTS, VENDORS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisContracts: React.FC = () => {
    const [activeTab, setActiveTab] = useState('contracts');
    const navigate = useNavigate();

    // Map standard contracts to USACE feel and link to assets
    const activeContracts = CONTRACTS.map((c, i) => ({
        ...c,
        fiscalYear: 24,
        responsibleOffice: 'RE-Contracts',
        assetId: i === 0 ? 'UA-01' : 'UA-02' // Dummy link for demo
    }));

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-950 rounded shadow-lg shadow-black/10 text-white">
                        <FileText size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">Contracting & Acquisition Registry</h1>
                            <div className="pulse-mission" />
                            <RegulatoryBadge refs={['FAR 18', 'FAR 21', 'USACE PALS']} />
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 italic">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">Service Contracts • IDIQs • Acquisition Mapping</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter">Procurement Command Center</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                        <Gavel size={14} className="group-hover:text-blue-500" /> Procurement Matrix
                    </button>
                    <button className="btn-pro-primary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-[0.2em] italic">
                        <Plus size={14} /> Initialize Solicitation
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="pro-card p-6 flex flex-col group hover:border-blue-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><Briefcase size={18}/></div>
                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-100 uppercase tracking-widest italic">FY24_ACTIVE</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Prime Service Contracts</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{CONTRACTS.length}</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[72%]" />
                    </div>
                </div>
                <div className="pro-card p-6 flex flex-col group hover:border-emerald-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><DollarIcon size={18}/></div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-widest italic">TOTAL_CEILING</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Encumbered Strategic Value</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">$4.23M</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 w-[58%]" />
                    </div>
                </div>
                <div className="pro-card p-6 flex flex-col group hover:border-amber-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><ShieldAlert size={18}/></div>
                        <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-100 uppercase tracking-widest italic">RE-SOLICIT_WINDOW</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Contract Maturity Alerts</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">02_NODES</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[24%]" />
                    </div>
                </div>
            </div>

            <div className="pro-card overflow-hidden flex flex-col bg-white">
                <div className="px-6 border-b border-slate-100 bg-[#0A0A0B] flex justify-between items-center">
                    <nav className="-mb-px flex gap-10">
                        {[
                            { id: 'contracts', label: 'Authorized Acquisition Matrix' },
                            { id: 'solicitations', label: 'Strategic Solicitation Pipeline' }
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
                    <div className="hidden md:flex items-center gap-3">
                         <Search size={14} className="text-white/20" />
                         <input type="text" placeholder="QUERY_INSTRUMENTS..." className="bg-transparent border-none text-[10px] font-bold text-white/40 uppercase tracking-widest outline-none focus:text-white transition-colors w-40" />
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    {activeTab === 'contracts' && (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 pro-col-header">STRATEGIC_INSTRUMENT_ID</th>
                                    <th className="px-6 py-4 pro-col-header">PRIME_VENDOR_ENTITY</th>
                                    <th className="px-6 py-4 pro-col-header">PERFORMANCE_END</th>
                                    <th className="px-6 py-4 pro-col-header text-right">STRATEGIC_VALUE</th>
                                    <th className="px-6 py-4 pro-col-header text-right">LIFECYCLE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {activeContracts.map((ctr, i) => {
                                    const vendor = VENDORS.find(v => v.id === ctr.vendorId);
                                    const asset = USACE_ASSETS.find(a => a.id === (ctr as any).assetId);
                                    return (
                                        <tr key={ctr.id} className="pro-data-row group">
                                            <td className="px-6 py-5">
                                                <div className="font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-tight text-[12px]">{ctr.name}</div>
                                                <div className="flex items-center gap-2 mt-1 italic">
                                                    <span className="text-[9px] font-black text-blue-600/60 font-mono tracking-tighter uppercase">CTR_NODE::{ctr.id}</span>
                                                    <span className="text-slate-300 opacity-30">•</span>
                                                    <Link to={`/usace/inventory/${asset?.id}`} className="text-[9px] font-black text-slate-400 hover:text-blue-600 font-mono tracking-tighter uppercase bg-slate-50 border border-slate-100 px-1.5 rounded-sm">{asset?.rpuid}</Link>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="font-black text-slate-900 text-[11px] uppercase tracking-tight">{vendor?.name}</div>
                                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">{vendor?.trade} Specialist</div>
                                            </td>
                                            <td className="px-6 py-5 text-slate-500 font-black font-mono text-[11px] italic underline underline-offset-4 decoration-slate-200">{ctr.endDate}</td>
                                            <td className="px-6 py-5 text-right font-mono font-black text-slate-900 group-hover:text-emerald-600 text-[13px] tracking-tighter">
                                                <div className="flex items-center justify-end gap-2">
                                                    <DollarIcon size={14} className="text-slate-300" />
                                                    ${ctr.value.toLocaleString()}.00
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right flex justify-end">
                                                <StatusBadge status={ctr.status} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'solicitations' && (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 pro-col-header">SOLICITATION_NODE</th>
                                    <th className="px-6 py-4 pro-col-header">PORTFOLIO_ASSET_NODE</th>
                                    <th className="px-6 py-4 pro-col-header">INSTRUMENT_TYPE</th>
                                    <th className="px-6 py-4 pro-col-header">EPOCH_CLOSE</th>
                                    <th className="px-6 py-4 pro-col-header text-right">COMMAND_LIFECYCLE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {USACE_SOLICITATIONS.map(sol => {
                                    const asset = USACE_ASSETS.find(a => a.id === sol.assetId);
                                    return (
                                        <tr key={sol.id} className="pro-data-row group">
                                            <td className="px-6 py-5">
                                                <div className="font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-tight text-[12px]">{sol.title}</div>
                                                <div className="text-[9px] font-black text-blue-600/60 font-mono tracking-tighter uppercase mt-1 italic">SOL_NODE::{sol.id}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <Link to={`/usace/inventory/${asset?.id}`} className="text-[11px] font-black text-slate-500 hover:text-blue-600 font-mono tracking-tighter uppercase bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-sm inline-block">{asset?.rpuid}</Link>
                                            </td>
                                            <td className="px-6 py-5 font-black text-slate-600 uppercase text-[10px] italic">{sol.type}</td>
                                            <td className="px-6 py-5 text-slate-500 font-black font-mono text-[11px] italic transition-colors group-hover:text-amber-500">{sol.closeDate}</td>
                                            <td className="px-6 py-5 text-right flex justify-end">
                                                <StatusBadge status={sol.lifecycleState} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                
                <div className="px-6 py-5 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] italic">
                    <div className="flex items-center gap-3">
                        <CheckCircle size={14} className="text-emerald-400" />
                        Integrated FAR / DFARS / AR-405-10 Compliance Shield Active
                    </div>
                    <span className="text-white/20 font-mono">PROTO_PROCURE_V9</span>
                </div>
            </div>
        </div>
    );
};
