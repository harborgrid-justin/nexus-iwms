import React, { useState } from 'react';
import { Shield, Plus, Search, Eye, Edit, Download, Filter, MoreHorizontal, ShieldCheck, ShieldAlert, FileText, Calendar, Building2, UserCheck, AlertCircle } from 'lucide-react';
import { INSURANCE_POLICIES, USACE_OUTGRANTS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { StatusBadge } from '../../components/StatusBadge';

export const RemisInsurance: React.FC = () => {
    const [activeTab, setActiveTab] = useState('compliance');
    const navigate = useNavigate();

    // In USACE context, we strictly monitor Outgrantee Insurance Compliance
    const complianceData = USACE_OUTGRANTS.map(og => {
        const asset = USACE_ASSETS.find(a => a.id === og.assetId);
        return {
            id: og.id,
            grantee: og.grantee,
            assetName: asset?.name,
            rpuid: asset?.rpuid,
            assetId: asset?.id,
            hasProof: og.insuranceProof,
            status: og.insuranceProof ? 'Compliant' : 'Non-Compliant',
            expiry: '2024-12-31', // Mock
            policyNum: 'POL-' + og.id.split('-')[1] + '99'
        };
    });

    const compliantCount = complianceData.filter(c => c.hasProof).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Insurance & Risk Verification</h1>
                        <RegulatoryBadge refs={['ER 405-1-12', '10.3']} />
                    </div>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Strategic verification of outgrantee insurance coverage and liability protection protocols.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm shadow-sm transition-all">
                        <Download size={16} /> Compliance Report
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <Plus size={18} /> Update Certificate
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-emerald-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20"><ShieldCheck size={20}/></div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{Math.round((compliantCount / complianceData.length) * 100)}% Verified</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Insurance Compliance Rate</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{compliantCount} / {complianceData.length} Instruments</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col group hover:border-amber-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/20"><AlertCircle size={20}/></div>
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">High Priority</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Pending Verifications</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{complianceData.length - compliantCount}</p>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl shadow-xl flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Shield size={80} className="text-white"/></div>
                    <div className="mt-4">
                        <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-1">Portfolio Risk Capacity</p>
                        <p className="text-white text-2xl font-bold tracking-tight">$125.5M Secured</p>
                        <p className="text-slate-400 text-[10px] mt-2 font-medium">Aggregate liability coverage across all out-grant instruments.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 border-b border-slate-200 bg-slate-50/30 flex justify-between items-center">
                    <h2 className="py-4 text-xs font-bold uppercase tracking-widest text-slate-900">Strategic Compliance Registry</h2>
                    <div className="flex items-center gap-3">
                         <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input type="text" placeholder="Filter by Grantee, Policy, or Asset..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all min-w-[280px]" />
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Grantee & Associated Asset</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Strategic Policy</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Verification Date</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Compliance State</th>
                                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Command Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {complianceData.map(c => (
                                <tr key={c.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{c.grantee}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Link to={`/usace/inventory/${c.assetId}`} className="text-[11px] font-bold text-slate-500 hover:text-blue-600 font-mono tracking-tighter uppercase">{c.rpuid}</Link>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-[10px] text-slate-400 font-medium">{c.assetName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-400 transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
                                                <FileText size={14} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-600 text-xs">{c.policyNum}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">GL Policy</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-slate-500 font-medium font-mono text-[11px]">
                                            <Calendar size={12} className="text-slate-300" />
                                            Valid thru: {c.expiry}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            {c.hasProof ? <ShieldCheck size={14} className="text-emerald-500" /> : <ShieldAlert size={14} className="text-amber-500" />}
                                            <span className={`text-[11px] font-bold uppercase tracking-widest ${c.hasProof ? 'text-emerald-600' : 'text-amber-600'}`}>{c.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 flex items-center gap-1 ml-auto transition-colors">
                                            Verify Certificate <MoreHorizontal size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authoritative USACE Defense-Grade Compliance Registry</p>
                </div>
            </div>
        </div>
    );
};
