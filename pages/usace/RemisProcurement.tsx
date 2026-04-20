import React, { useState } from 'react';
import { Landmark, DollarSign as DollarIcon, Plus, Download, Filter, Search, Activity, Briefcase, FileText, CheckCircle, Clock, AlertTriangle, ArrowRight, ShieldCheck, ShoppingCart, Truck, Gavel } from 'lucide-react';
import { PURCHASE_ORDERS, VENDORS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisProcurement: React.FC = () => {
    const [view, setView] = useState('pos');

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Strategic Procurement & PO Lifecycle</h1>
                        <RegulatoryBadge refs={['ER 37-1-30', 'FAR Part 13']} />
                    </div>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Authoritative management of Purchase Orders, multi-domain requisitions, and vendor supply chain logistics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm shadow-sm transition-all">
                        <Download size={16} /> Requisition Export
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <ShoppingCart size={18} /> New PO Requisition
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-blue-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform"><Briefcase size={20}/></div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">FY24 Global</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Active Purchase Orders</p>
                    <p className="text-2xl font-bold text-slate-900 tracking-tight">{PURCHASE_ORDERS.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-emerald-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform"><DollarIcon size={20}/></div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Liquid Funds</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Total Enforced Value</p>
                    <p className="text-2xl font-bold text-slate-900 tracking-tight">$ 824.5k</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-amber-300 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform"><Truck size={20}/></div>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Strategic Lead</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Items In-Transit</p>
                    <p className="text-2xl font-bold text-slate-900 tracking-tight">12 Categories</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 border-b border-slate-200 bg-slate-50/30 flex justify-between items-center">
                    <nav className="-mb-px flex gap-8">
                        <button onClick={() => setView('pos')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${view === 'pos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Active Strategic Orders</button>
                        <button onClick={() => setView('requisitions')} className={`shrink-0 border-b-2 px-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${view === 'requisitions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>Internal Requisitions</button>
                    </nav>
                     <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input type="text" placeholder="Search POs, Requisitions, Vendors..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all min-w-[280px]" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Command Purchase Order</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Strategic Vendor</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Strategic Asset (RPUID)</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Strategic Amount</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Order Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {PURCHASE_ORDERS.map((po, i) => {
                                const vendor = VENDORS.find(v => v.id === po.vendorId);
                                const asset = USACE_ASSETS[i % USACE_ASSETS.length];
                                return (
                                    <tr key={po.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{po.id}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Order Date:</div>
                                                <div className="text-[10px] font-bold text-slate-600 font-mono tracking-tighter uppercase">{po.orderDate}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-slate-700 text-xs">{vendor?.name}</div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{vendor?.trade} Specialists</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col">
                                                <Link to={`/usace/inventory/${asset.id}`} className="font-bold text-blue-600 hover:underline font-mono text-[11px] uppercase tracking-tighter">{asset.rpuid}</Link>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-tight">{asset.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right font-mono font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                             <div className="flex items-center justify-end gap-1">
                                                <DollarIcon size={12} className="text-slate-300" />
                                                ${po.totalAmount.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <StatusBadge status={po.status} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                 <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
                    <div className="flex items-center gap-3 relative z-10">
                        <Gavel size={14} className="text-blue-400" />
                        Authoritative Defense Procurement Compliance Sync Active (FAR Part 13)
                    </div>
                    <button className="flex items-center gap-1.5 hover:text-blue-400 transition-colors relative z-10">
                        Strategic Supply Chain Dashboard <ArrowRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};
