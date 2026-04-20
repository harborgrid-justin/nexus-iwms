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
        <div className="max-w-[1600px] mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-950 rounded shadow-lg shadow-black/10 text-white">
                        <FileClock size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none italic">Lease Admin & Strategic Instruments Command</h1>
                            <div className="pulse-mission" />
                            <RegulatoryBadge refs={['ER 405-1-12', 'V12.1']} />
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 italic">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none">In-Grants (Tenant) • Out-Grants (Landlord) • Executive Instruments</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter italic">Strategic Asset Deployment Matrix</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                        <Download size={14} className="group-hover:text-blue-500" /> Export Ledger
                    </button>
                    <button className="btn-pro-primary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-[0.25em] italic">
                        <Plus size={14} /> Commit New Instrument
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="pro-card p-6 flex flex-col group hover:border-blue-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><Activity size={18}/></div>
                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-100 uppercase tracking-widest italic">ACTIVE_NODES</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none">Total Strategic Instruments</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{allInstruments.length}_ENTRIES</p>
                </div>
                <div className="pro-card p-6 flex flex-col group hover:border-amber-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><AlertCircle size={18}/></div>
                        <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-100 uppercase tracking-widest italic">T-MINUS_90D</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none">Critical Expiration Events</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">0{expiringSoon}_ALERTS</p>
                </div>
                <div className="pro-card p-6 flex flex-col group hover:border-emerald-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><DollarIcon size={18}/></div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-widest italic">POSITIVE_YIELD</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none">Annual Est. Out-Grant Yield</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">$452.8K</p>
                </div>
                <div className="pro-card p-6 bg-slate-950 border-white/5 shadow-2xl relative overflow-hidden flex flex-col group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><ShieldCheck size={100} className="text-blue-500"/></div>
                    <div className="relative z-10 mt-auto">
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 italic leading-none">Portfolio Compliance Density</p>
                        <p className="text-white text-2xl font-black tracking-tighter italic">98.4%_HEALTH</p>
                        <div className="w-full bg-white/5 h-1 rounded-full mt-4 overflow-hidden border border-white/5">
                            <div className="bg-blue-500 h-full animate-pulse shadow-glow" style={{width: '98.4%'}}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pro-card overflow-hidden flex flex-col bg-white">
                <div className="px-6 border-b border-white/5 bg-[#0A0A0B] flex justify-between items-center">
                    <nav className="-mb-px flex gap-10">
                        {[
                            { id: 'all', label: 'Global Strategic Ledger' },
                            { id: 'inbound', label: 'In-Grant Portfolio' },
                            { id: 'outbound', label: 'Out-Grant Portfolio' }
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
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={12} />
                            <input type="text" placeholder="FILTER_LEDGER..." className="bg-transparent border-none text-[10px] font-bold text-white/40 uppercase tracking-widest outline-none focus:text-white transition-colors w-48 pl-6" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[500px]">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 pro-col-header">TACTICAL_INSTRUMENT_NODE</th>
                                <th className="px-6 py-4 pro-col-header">COUNTERPARTY_ID</th>
                                <th className="px-6 py-4 pro-col-header">PORTFOLIO_LIFECYCLE</th>
                                <th className="px-6 py-4 pro-col-header text-right">EST_COMMITMENT_VAL</th>
                                <th className="px-6 py-4 pro-col-header text-right">COMMAND_LIFECYCLE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map((inst, i) => {
                                const asset = USACE_ASSETS.find(a => a.id === inst.assetId) || USACE_ASSETS.find(a => a.rpuid === inst.assetId);
                                return (
                                    <tr key={i} className="pro-data-row group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-sm shadow-md transition-all group-hover:scale-110 ${inst.direction === 'In' ? 'bg-amber-600 text-white shadow-amber-500/20' : 'bg-emerald-600 text-white shadow-emerald-500/20'}`}>
                                                    <ArrowRightLeft size={16} className={inst.direction === 'In' ? 'rotate-180' : ''} />
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-900 text-[11px] uppercase tracking-tight leading-none mb-1.5 transition-colors group-hover:text-blue-600">INSRT::{inst.instrumentType}</div>
                                                    <Link to={`/usace/inventory/${asset?.id}`} className="text-[10px] font-black text-blue-600 hover:underline font-mono tracking-tighter uppercase block leading-none bg-blue-50 px-2 py-0.5 border border-blue-100 rounded-sm italic w-fit">{asset?.rpuid || inst.assetId}</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 font-black text-slate-700 text-[11px] uppercase tracking-tighter">{(inst as any).grantee || (inst as any).tenantName}</td>
                                        <td className="px-6 py-5">
                                            <StatusBadge status={(inst as any).status || (inst as any).lifecycleState} />
                                            <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase mt-2 tracking-widest italic leading-none underline underline-offset-4 decoration-slate-100">
                                                <Calendar size={10} className="text-slate-300" />
                                                TERM_CEIL:: {inst.endDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right font-mono font-black text-slate-900 group-hover:text-emerald-600 transition-colors text-[13px] tracking-tighter italic">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <DollarIcon size={12} className="text-slate-200" />
                                                ${((inst as any).revenue || (inst as any).monthlyRent * 12).toLocaleString()}.00
                                            </div>
                                            <div className="text-[9px] text-slate-400 uppercase tracking-widest mt-1 leading-none italic font-sans opacity-50">ANNUALIZED_YIELD</div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="btn-pro-secondary text-[10px] font-black uppercase tracking-widest italic group-hover:bg-slate-900 group-hover:text-white transition-all h-auto py-1.5 px-4">
                                                INSTRUMENT_AUDIT
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="px-6 py-5 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] italic">
                    <span className="text-white/40">GLOBAL_LEASE_LEDGER_ACTIVE (SIG::ADMIN_LEAD_LEDGER)</span>
                    <span className="text-white/20 font-mono tracking-tighter">FIPS-199_SECURITY_COMPLIANT</span>
                </div>
            </div>
        </div>
    );
};
