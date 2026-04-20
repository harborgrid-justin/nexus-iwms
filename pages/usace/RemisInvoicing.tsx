import React, { useState } from 'react';
import { Landmark, DollarSign as DollarIcon, Plus, Download, Filter, Search, Activity, FileText, CheckCircle, Clock, AlertTriangle, ArrowRight, ShieldCheck, CreditCard, Receipt, Database, Calendar } from 'lucide-react';
import { INVOICES, VENDORS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisInvoicing: React.FC = () => {
    const [activeTab, setActiveTab] = useState('payables');

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Invoicing, Payables & Strategic Disbursements</h1>
                        <RegulatoryBadge refs={['ER 37-1-30', 'PPA']} />
                    </div>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Authoritative synchronization of vendor invoices, Prompt Payment Act compliance, and strategic CEFMS reconciliation.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm shadow-sm transition-all">
                        <Database size={16} /> CEFMS Sync
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <Plus size={18} /> New Request for Payment
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-blue-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20"><Receipt size={20}/></div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">FY24 Current</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Invoices</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{INVOICES.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-emerald-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20"><CreditCard size={20}/></div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">PPA Compliant</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Aggregate Payables</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">$45.8k</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-amber-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/20"><Clock size={20}/></div>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">90%+ Aging</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Pending Approvals</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">3 Actionable</p>
                </div>
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-red-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-red-600 rounded-xl text-white shadow-lg shadow-red-500/20"><AlertTriangle size={20}/></div>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">System Exceptions</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">0</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 border-b border-slate-200 bg-slate-50/30 flex justify-between items-center">
                    <nav className="-mb-px flex gap-8">
                        <button onClick={() => setActiveTab('payables')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'payables' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Command Accounts Payable</button>
                        <button onClick={() => setActiveTab('aging')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'aging' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Aging Strategic Audit</button>
                    </nav>
                     <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input type="text" placeholder="Search Invoices, Vendors, POs..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all min-w-[280px]" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Command Invoice / Strategic Vendor</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Reference RPUID / Strategic Asset</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Aging Status</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Strategic Amount</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {INVOICES.map((inv, i) => {
                                const vendor = VENDORS.find(v => v.id === inv.vendorId);
                                const asset = USACE_ASSETS[i % USACE_ASSETS.length];
                                return (
                                    <tr key={inv.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{inv.invoiceNumber}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{vendor?.name}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <Link to={`/usace/inventory/${asset.id}`} className="font-bold font-mono text-[11px] text-blue-600 hover:underline uppercase tracking-tighter">{asset.rpuid}</Link>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-tight">{asset.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-slate-500 font-medium">
                                                <Calendar size={12} className="text-slate-300" />
                                                <span className="text-[11px] font-mono">Due: {inv.dueDate}</span>
                                            </div>
                                            <div className={`text-[9px] font-bold mt-1.5 uppercase tracking-[0.1em] ${inv.status === 'Overdue' ? 'text-red-500' : 'text-slate-400'}`}>
                                                {inv.status === 'Approved' ? 'Awaiting Disbursement' : 'PPA Verification Active'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right font-mono font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                            <div className="flex items-center justify-end gap-1">
                                                <DollarIcon size={12} className="text-slate-300" />
                                                ${inv.amount.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <StatusBadge status={inv.status} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={14} className="text-blue-400" />
                        Authoritative Prompt Payment Act Compliance Sync Active
                    </div>
                    <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                        Executive Reconciliation Dashboard <ArrowRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};
