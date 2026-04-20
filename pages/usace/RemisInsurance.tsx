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
        <div className="max-w-[1600px] mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-950 rounded shadow-lg shadow-black/10 text-white">
                        <Shield size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">Insurance & Liability Verification Command</h1>
                            <div className="pulse-mission" />
                            <RegulatoryBadge refs={['ER 405-1-12', 'CH 10.3']} />
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 italic">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">Outgrantee Compliance • Proof of Coverage • Risk Offloading</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter">Strategic Liability Protector</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                        <Download size={14} className="group-hover:text-blue-500" /> Export Compliance Matrix
                    </button>
                    <button className="btn-pro-primary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-[0.2em] italic">
                        <Plus size={14} /> Register Certificate
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="pro-card p-6 flex flex-col group hover:border-emerald-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><ShieldCheck size={18}/></div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-widest italic">{Math.round((compliantCount / complianceData.length) * 100)}%_PASS</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Compliance Saturation</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{compliantCount}_OF_{complianceData.length}</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 w-[78%]" />
                    </div>
                </div>
                <div className="pro-card p-6 flex flex-col group hover:border-amber-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><AlertCircle size={18}/></div>
                        <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-100 uppercase tracking-widest italic">CRITICAL_NODE</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Pending State Verifications</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">0{complianceData.length - compliantCount}_NODES</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[22%]" />
                    </div>
                </div>
                <div className="pro-card p-6 bg-slate-950 border-white/5 shadow-2xl relative overflow-hidden flex flex-col group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Shield size={100} className="text-blue-500"/></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 italic">Portfolio Coverage Ceiling</p>
                        <p className="text-white text-3xl font-black tracking-tighter italic leading-none">$125.54M</p>
                        <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                             <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest leading-none">Aggregate Liability Protocol Secured</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pro-card overflow-hidden flex flex-col bg-white">
                <div className="px-6 border-b border-slate-100 bg-[#0A0A0B] flex justify-between items-center">
                    <h2 className="py-5 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 flex items-center gap-2 italic leading-none">
                        <ShieldCheck size={14} className="text-blue-500" /> Strategic Compliance Registry Index
                    </h2>
                    <div className="hidden md:flex items-center gap-3">
                         <div className="relative">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={12} />
                            <input type="text" placeholder="FILTER_INSTRUMENTS..." className="bg-transparent border-none text-[10px] font-bold text-white/40 uppercase tracking-widest outline-none focus:text-white transition-colors w-40 pl-6" />
                        </div>
                        <button className="p-2 text-white/20 hover:text-white transition-colors"><Filter size={16} /></button>
                    </div>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 pro-col-header">GRANTEE_ASSET_NODE</th>
                                <th className="px-6 py-4 pro-col-header">STRATEGIC_POLICY_VECTOR</th>
                                <th className="px-6 py-4 pro-col-header">VALIDATION_EPOCH</th>
                                <th className="px-6 py-4 pro-col-header">COMPLIANCE_STATE</th>
                                <th className="px-6 py-4 pro-col-header text-right">COMMAND_LIFECYCLE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {complianceData.map(c => (
                                <tr key={c.id} className="pro-data-row group">
                                    <td className="px-6 py-5">
                                        <div className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase text-[12px] tracking-tight leading-none mb-1.5">{c.grantee}</div>
                                        <div className="flex items-center gap-2 italic">
                                            <Link to={`/usace/inventory/${c.assetId}`} className="text-[9px] font-black text-slate-500 hover:text-blue-600 font-mono tracking-tighter uppercase leading-none bg-slate-50 border border-slate-100 px-1.5 rounded-sm">{c.rpuid}</Link>
                                            <span className="text-slate-300 opacity-30">•</span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">NODE::{c.assetName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-900 rounded-sm text-white transition-all group-hover:bg-blue-600 shadow-md">
                                                <FileText size={14} />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-[11px] uppercase tracking-tight leading-none mb-1">{c.policyNum}</div>
                                                <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic leading-none">GL Policy Instrument</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-slate-500 font-black font-mono text-[11px] italic underline underline-offset-4 decoration-slate-200">
                                            <Calendar size={12} className="text-slate-300" />
                                            EXP:: {c.expiry}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            {c.hasProof ? <ShieldCheck size={14} className="text-emerald-500" /> : <ShieldAlert size={14} className="text-amber-500" />}
                                            <span className={`text-[10px] font-black uppercase tracking-[0.1em] italic ${c.hasProof ? 'text-emerald-600' : 'text-amber-600 underline underline-offset-4 decoration-amber-100'}`}>{c.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="btn-pro-secondary text-[10px] font-black uppercase tracking-widest italic group-hover:bg-slate-900 group-hover:text-white transition-all h-auto py-1.5 px-4">
                                            VERIFY_CTR
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="px-6 py-4 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] italic">
                    <div className="flex items-center gap-3">
                        <UserCheck size={14} className="text-emerald-400" />
                        Authoritative USACE Defense-Grade Compliance Registry (V9.4) Active
                    </div>
                </div>
            </div>
        </div>
    );
};
