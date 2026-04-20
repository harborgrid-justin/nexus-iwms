import React, { useState } from 'react';
import { FileClock, Plus, Search, Eye, Edit, Download, Filter, MoreHorizontal, MapPin, DollarSign as DollarIcon, Calendar, Activity, ArrowRightLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { USACE_OUTGRANTS, USACE_ASSETS, LEASES } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { OutGrant, RealPropertyAsset } from '../../types';
import { useNavigate, Link } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisLeaseAdmin: React.FC = () => {
    const [activeTab, setActiveTab] = useState('all');
    const navigate = useNavigate();

    // In USACE, outgrants are leases where USACE is the landlord. 
    // In-grants (Leases) are where USACE is the tenant.
    // For this dashboard, we'll combine then for a strategic overview.

    const inGrants = LEASES.map(l => ({
        ...l,
        type: 'In-Grant (Lease)',
        direction: 'In',
        assetId: l.propertyId
    }));

    const allInstruments = [
        ...USACE_OUTGRANTS.map(og => ({ ...og, direction: 'Out', instrumentType: og.type })),
        ...inGrants.map(ig => ({ ...ig, direction: 'In', instrumentType: 'Lease Agreement' }))
    ];

    const filtered = allInstruments.filter(i => {
        if (activeTab === 'all') return true;
        if (activeTab === 'inbound') return i.direction === 'In';
        if (activeTab === 'outbound') return i.direction === 'Out';
        return true;
    });

    const expiringSoon = allInstruments.filter(i => {
        const d = new Date(i.endDate);
        const now = new Date();
        const diff = (d.getTime() - now.getTime()) / (1000 * 3600 * 24);
        return diff > 0 && diff < 90;
    }).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lease Administration & Strategic Instruments</h1>
                        <RegulatoryBadge refs={['10', '12']} />
                    </div>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Authoritative management of In-Grants, Out-Grants, and critical real estate instruments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm shadow-sm transition-all">
                        <Download size={16} /> Export Portfolio
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <Plus size={18} /> Execute New Instrument
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-blue-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20"><Activity size={20}/></div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">+3 Month</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Instruments</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{allInstruments.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-amber-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/20"><AlertCircle size={20}/></div>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Action Req.</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Critical Dates (90d)</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{expiringSoon}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-emerald-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20"><DollarIcon size={20}/></div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Net Pos.</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Annual Yield (Out-Grants)</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">$452.8k</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl shadow-xl flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><ShieldCheck size={80} className="text-white"/></div>
                    <div className="mt-8">
                        <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1">Compliance Status</p>
                        <p className="text-white text-xl font-bold">98.4% Protected</p>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '98.4%'}}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 border-b border-slate-200 bg-slate-50/30 flex justify-between items-center">
                    <nav className="-mb-px flex gap-8">
                        <button onClick={() => setActiveTab('all')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'all' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Global Ledger</button>
                        <button onClick={() => setActiveTab('inbound')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'inbound' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>In-Grants (Tenant)</button>
                        <button onClick={() => setActiveTab('outbound')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'outbound' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Out-Grants (Landlord)</button>
                    </nav>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input type="text" placeholder="Filter by Grantee, Asset, or RPUID..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all min-w-[280px]" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Strategic Instrument</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Counterparty</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Portfolio Lifecycle</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Commitment Value</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((inst, i) => {
                                const asset = USACE_ASSETS.find(a => a.id === inst.assetId) || USACE_ASSETS.find(a => a.rpuid === inst.assetId);
                                return (
                                    <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${inst.direction === 'In' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'} transition-all group-hover:scale-110`}>
                                                    <ArrowRightLeft size={14} className={inst.direction === 'In' ? 'rotate-180' : ''} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 text-xs uppercase tracking-tight">{inst.instrumentType}</div>
                                                    <Link to={`/usace/inventory/${asset?.id}`} className="text-[10px] font-bold text-blue-600 hover:underline font-mono tracking-tighter uppercase block mt-1">{asset?.rpuid || inst.assetId}</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-600 text-xs">{(inst as any).grantee || (inst as any).tenantName}</td>
                                        <td className="px-6 py-5">
                                            <StatusBadge status={(inst as any).status || (inst as any).lifecycleState} />
                                            <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase mt-1.5 tracking-widest">
                                                <Calendar size={10} />
                                                Term End: {inst.endDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right font-mono font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                            <div className="flex items-center justify-end gap-1">
                                                <DollarIcon size={12} className="text-slate-300" />
                                                ${((inst as any).revenue || (inst as any).monthlyRent * 12).toLocaleString()}
                                            </div>
                                            <div className="text-[9px] text-slate-400 uppercase tracking-widest">Annual Est.</div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 flex items-center gap-1 ml-auto transition-colors">
                                                Command Audit <MoreHorizontal size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Authoritative USACE Real Estate Instrument Ledger (FIPS-199 Compliant)
                </div>
            </div>
        </div>
    );
};
