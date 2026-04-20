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
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Contract Management & Acquisition Strategies</h1>
                        <RegulatoryBadge refs={['18', '21']} />
                    </div>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Strategic oversight of service contracts, IDIQs, and real estate acquisition instruments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm shadow-sm transition-all">
                        <Gavel size={16} /> Procurement Portal
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <Plus size={18} /> Initiate Solicitation
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-blue-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20"><Briefcase size={20}/></div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">FY24 Global</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Prime Contracts</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{CONTRACTS.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-emerald-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20"><DollarIcon size={20}/></div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Encumbered</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Contract Ceiling</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">$4.2M</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-amber-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/20"><ShieldAlert size={20}/></div>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Expiring Soon</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Upcoming Re-Solicitations</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">2</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 border-b border-slate-200 bg-slate-50/30 flex justify-between items-center">
                    <nav className="-mb-px flex gap-8">
                        <button onClick={() => setActiveTab('contracts')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'contracts' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Active Contracts</button>
                        <button onClick={() => setActiveTab('solicitations')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'solicitations' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Pending Solicitations</button>
                    </nav>
                     <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input type="text" placeholder="Search contracts, vendors..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all min-w-[280px]" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {activeTab === 'contracts' && (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Strategic Contract Instrument</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Prime Vendor</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Performance End</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Strategic Value</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {activeContracts.map((ctr, i) => {
                                    const vendor = VENDORS.find(v => v.id === ctr.vendorId);
                                    const asset = USACE_ASSETS.find(a => a.id === (ctr as any).assetId);
                                    return (
                                        <tr key={ctr.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{ctr.name}</div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-bold text-blue-600 font-mono tracking-tighter uppercase">{ctr.id}</span>
                                                    <span className="text-slate-300">•</span>
                                                    <Link to={`/usace/inventory/${asset?.id}`} className="text-[10px] font-bold text-slate-400 hover:text-blue-600 font-mono tracking-tighter uppercase">{asset?.rpuid}</Link>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-600 text-xs">{vendor?.name}</div>
                                                <div className="text-[10px] text-slate-400">{vendor?.trade} Specialist</div>
                                            </td>
                                            <td className="px-6 py-5 text-slate-500 font-medium font-mono text-[11px]">{ctr.endDate}</td>
                                            <td className="px-6 py-5 text-right font-mono font-bold text-slate-900">
                                                <div className="flex items-center justify-end gap-1">
                                                    <DollarIcon size={12} className="text-slate-300" />
                                                    ${ctr.value.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <StatusBadge status={ctr.status} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    {activeTab === 'solicitations' && (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Solicitation Title</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Portfolio Asset</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Type</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Close Date</th>
                                    <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Command Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {USACE_SOLICITATIONS.map(sol => {
                                    const asset = USACE_ASSETS.find(a => a.id === sol.assetId);
                                    return (
                                        <tr key={sol.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{sol.title}</div>
                                                <div className="text-[10px] font-bold text-blue-600 font-mono tracking-tighter uppercase mt-1">{sol.id}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <Link to={`/usace/inventory/${asset?.id}`} className="text-[11px] font-bold text-slate-600 hover:text-blue-600 font-mono tracking-tighter uppercase">{asset?.rpuid}</Link>
                                            </td>
                                            <td className="px-6 py-5 font-medium text-slate-600">{sol.type}</td>
                                            <td className="px-6 py-5 text-slate-500 font-medium font-mono text-[11px] underline underline-offset-4 decoration-slate-200">{sol.closeDate}</td>
                                            <td className="px-6 py-5 text-right">
                                                <StatusBadge status={sol.lifecycleState} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
                
                <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-3">
                        <CheckCircle size={14} className="text-emerald-400" />
                        Authoritative FAR/DFARS Compliance Active
                    </div>
                </div>
            </div>
        </div>
    );
};
