import React, { useState } from 'react';
import { Landmark, DollarSign as DollarIcon, Plus, Download, Filter, Search, Activity, FileText, CheckCircle, Clock, AlertTriangle, ArrowRight, ShieldCheck, CreditCard, Receipt, Database, Calendar } from 'lucide-react';
import { INVOICES, VENDORS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisInvoicing: React.FC = () => {
    const [activeTab, setActiveTab] = useState('payables');

    return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <div className="p-1.5 bg-slate-950 rounded-sm text-white shadow-sm">
                        <DollarIcon size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                           <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Strategic Disbursements</h1>
                           <RegulatoryBadge refs={['ER 37-1-30', 'PPA']} />
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="data-label text-blue-600 mb-0">Finance & Invoicing Command Terminal</span>
                           <div className="w-1 h-1 bg-slate-300 rounded-full" />
                           <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter italic">PPA COMPLIANCE: 100% // CEFMS_RECON: ACTIVE</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-pro-secondary flex items-center gap-2">
                        <Database size={14} /> CEFMS Recon
                    </button>
                    <button className="btn-pro-primary flex items-center gap-2">
                        <Plus size={14} /> New Disbursement
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {[
                    { label: 'Active Invoices', value: INVOICES.length, status: 'FY25_TRACKING', icon: Receipt, color: 'text-blue-500' },
                    { label: 'Aggregate Payables', value: '$45.8k', status: 'PPA_COMPLIANT', icon: CreditCard, color: 'text-emerald-500' },
                    { label: 'Pending Approvals', value: '03 Case(s)', status: 'ACTION_REQ', icon: Clock, color: 'text-amber-500' },
                    { label: 'System Exceptions', value: '00', status: 'STABLE', icon: AlertTriangle, color: 'text-red-500' }
                 ].map((stat, i) => (
                    <div key={i} className="pro-card p-5 group cursor-pointer hover:border-blue-300 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 bg-slate-50 border border-slate-100 rounded ${stat.color} group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                                <stat.icon size={16} />
                            </div>
                            <span className="text-[8px] font-mono font-black text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 uppercase tracking-tighter italic">
                                {stat.status}
                            </span>
                        </div>
                        <p className="data-label uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-black font-mono tracking-tighter text-slate-900 leading-none">{stat.value}</p>
                    </div>
                 ))}
            </div>

            <div className="pro-card overflow-hidden flex flex-col">
                <div className="px-6 border-b border-slate-200 bg-slate-50/10 flex justify-between items-center h-12">
                    <nav className="flex h-full">
                        <button onClick={() => setActiveTab('payables')} className={`shrink-0 h-full px-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'payables' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Accounts Payable Matrix</button>
                        <button onClick={() => setActiveTab('aging')} className={`shrink-0 h-full px-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'aging' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Aging Audit</button>
                    </nav>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={14} />
                            <input type="text" placeholder="Scan Disbursements..." className="pl-9 pr-4 py-1 bg-white border border-slate-200 rounded-sm text-[10px] font-mono italic focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all min-w-[240px]" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#0A0A0B] border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 pro-col-header text-slate-400">INVOICE NODE / VENDOR</th>
                                <th className="px-6 py-4 pro-col-header text-slate-400">REFERENCE ASSET</th>
                                <th className="px-6 py-4 pro-col-header text-slate-400">AGING TELEMETRY</th>
                                <th className="px-6 py-4 pro-col-header text-slate-400 text-right">STRATEGIC AMOUNT</th>
                                <th className="px-6 py-4 pro-col-header text-slate-400 text-right">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {INVOICES.map((inv, i) => {
                                const vendor = VENDORS.find(v => v.id === inv.vendorId);
                                const asset = USACE_ASSETS[i % USACE_ASSETS.length];
                                return (
                                    <tr key={inv.id} className="pro-data-row group">
                                        <td className="px-6 py-4">
                                            <div className="font-mono text-[11px] font-black text-blue-600 group-hover:text-amber-400 uppercase tracking-tighter">{inv.invoiceNumber}</div>
                                            <div className="text-[9px] text-slate-400 group-hover:text-white/40 font-bold uppercase tracking-[0.15em] mt-0.5">{vendor?.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <Link to={`/usace/inventory/${asset.id}`} className="font-bold font-mono text-[10px] text-slate-600 group-hover:text-blue-300 hover:underline uppercase tracking-tighter">{asset.rpuid}</Link>
                                                <span className="text-[9px] font-bold text-slate-400 group-hover:text-white/20 uppercase mt-0.5 tracking-tight italic">{asset.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-500 group-hover:text-white font-medium">
                                                <Calendar size={12} className="opacity-40" />
                                                <span className="text-[10px] font-mono">DUE_LNK: {inv.dueDate}</span>
                                            </div>
                                            <div className={`text-[8px] font-bold mt-1 uppercase tracking-[0.2em] ${inv.status === 'Overdue' ? 'text-rose-500' : 'text-slate-400 group-hover:text-white/30'}`}>
                                                {inv.status === 'Approved' ? 'AWAITING_DISBURSE' : 'PPA_VERIFY_SYNC'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-slate-900 group-hover:text-emerald-400 transition-colors">
                                            <div className="flex items-center justify-end gap-1 text-[13px] tracking-tighter">
                                                <DollarIcon size={12} className="opacity-30" />
                                                {inv.amount.toLocaleString()}.00
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <StatusBadge status={inv.status} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="px-6 py-2 bg-slate-950 text-white flex justify-between items-center text-[9px] font-mono italic uppercase tracking-widest">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        PPA_COMPLIANCE_PROTOCOL_SYNC_100pct
                    </div>
                    <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                        REC_DASHBOARD <ArrowRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};
