import React, { useState } from 'react';
import { Shield, Plus, Filter, AlertTriangle, CheckCircle, Scale, Download, Search, MoreHorizontal, DollarSign as DollarIcon, Calendar, Clock, ArrowUpRight, ChevronRight, Gavel, Globe } from 'lucide-react';
import { USACE_CLAIMS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { LegalClaimModal } from './components/LegalClaimModal';
import { LegalClaim } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';

const KpiCard = ({ title, value, icon: Icon, color, trend }: { title: string, value: string | number, icon: any, color: string, trend?: string }) => (
    <div className="pro-card p-6 bg-white flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all border-slate-200">
        <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-[0.03] group-hover:opacity-10 transition-opacity rotate-12">
            <Icon size={96} />
        </div>
        <div className="flex justify-between items-start mb-6 italic">
            <div className={`p-2.5 rounded-sm ${color} text-white shadow-xl shadow-black/10`}>
                <Icon size={18} />
            </div>
            {trend && <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-widest italic">{trend}</span>}
        </div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic leading-none">{title}</p>
        <p className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{value}</p>
        <div className="mt-3 flex items-center gap-2">
            <div className="h-0.5 flex-1 bg-slate-100 overflow-hidden">
                <div className={`h-full ${color} w-3/4 animate-pulse-subtle`} />
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-300 tracking-tighter">DATA_SYNC::OK</span>
        </div>
    </div>
);

export const RemisLegal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<LegalClaim>, reason: string) => {
      console.log("Creating claim:", record, "Reason:", reason);
      alert('Strategic legal claim record instantiated. Adjudication pipeline active.');
      setIsModalOpen(false);
  };

  const activeClaims = USACE_CLAIMS.filter(c => !['Closed', 'Archived', 'Paid'].includes(c.lifecycleState));
  const totalExposure = activeClaims.reduce((acc, c) => acc + c.claimAmount, 0);

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <LegalClaimModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      
      <div className="border-b border-slate-200 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-6">
                <div className="p-3 bg-slate-950 rounded shadow-xl shadow-black/20 text-white">
                    <Scale size={32} className="text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none italic">Legal Services & Claims Ledger</h1>
                    <div className="pulse-mission" />
                    <RegulatoryBadge refs={['ER 405-1-12']} />
                  </div>
                  <div className="flex items-center gap-3 mt-2 italic">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none text-wrap max-w-md">Authoritative Tort Claim Management & Strategic Adjudication Pipeline</span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter italic">Sec_System::LEGAL_CMD</span>
                  </div>
                </div>
            </div>
            <div className="flex items-center gap-3">
                 <button className="btn-pro-secondary flex items-center gap-2 px-4 py-2 h-auto text-[10px] font-black uppercase tracking-widest italic tracking-[0.2em]">
                    <Download size={14} /> Global_Export
                </button>
                <button onClick={() => setIsModalOpen(true)} className="btn-pro-primary flex items-center gap-2 px-6 py-2.5 h-auto text-[10px] font-black uppercase tracking-widest italic shadow-xl shadow-blue-500/20 active:scale-95">
                    <Plus size={16} /> Initiate Strategic Claim
                </button>
            </div>
          </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard title="Active In-Flight Claims" value={activeClaims.length} icon={Scale} color="bg-blue-600" trend="+2_DELTA" />
          <KpiCard title="Strategic Financial Exposure" value={`$${totalExposure.toLocaleString()}`} icon={AlertTriangle} color="bg-amber-500" trend="Risk_Level::HIGH" />
          <KpiCard title="Settled Adjudications" value={USACE_CLAIMS.filter(c => c.lifecycleState === 'Settled' || c.lifecycleState === 'Paid').length} icon={CheckCircle} color="bg-emerald-600" trend="Efficiency::94%" />
      </div>
      
      <div className="pro-card bg-white overflow-hidden shadow-2xl border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 italic font-black">
            <h2 className="text-[10px] text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                <Globe size={14} className="text-blue-500" /> Sovereign Claims Registry
            </h2>
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={12} />
                    <input type="text" placeholder="QUERY_ENTITY_SCHEMA..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-sm text-[10px] font-black focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all min-w-[280px] uppercase italic tracking-widest" />
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200 rounded-sm"><Filter size={14} /></button>
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left italic">
            <thead className="bg-[#1A1B1E] border-b border-white/5">
                <tr>
                    <th className="px-6 py-4 pro-col-header text-white uppercase tracking-[0.2em] italic">COMMAND_CLAIMANT</th>
                    <th className="px-6 py-4 pro-col-header text-white uppercase tracking-[0.2em] italic">STRATEGIC_TYPE</th>
                    <th className="px-6 py-4 pro-col-header text-white uppercase tracking-[0.2em] italic">LIFECYCLE_STATUS</th>
                    <th className="px-6 py-4 pro-col-header text-white uppercase tracking-[0.2em] italic">INCEPTION_DATE</th>
                    <th className="px-6 py-4 pro-col-header text-white uppercase tracking-[0.2em] italic text-right">STRATEGIC_MAGNITUDE</th>
                    <th className="px-6 py-4 pro-col-header text-white uppercase tracking-[0.2em] italic text-right">CONTROL</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {USACE_CLAIMS.map(claim => (
                <tr key={claim.id} onClick={() => navigate(`/usace/legal/${claim.id}`)} className="pro-data-row group cursor-pointer transition-all">
                    <td className="px-6 py-5">
                        <div className="font-black text-slate-900 text-[12px] uppercase tracking-tighter group-hover:text-blue-600 transition-colors leading-none mb-1.5">{claim.claimantInfo?.name || claim.claimant.replace(' ', '_')}</div>
                        <div className="text-[9px] font-mono font-black text-blue-600/40 group-hover:text-blue-600 transition-all tracking-widest uppercase italic">SOL_REF::{claim.id}</div>
                    </td>
                    <td className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">{claim.claimType}</td>
                    <td className="px-6 py-5">
                        <StatusBadge status={claim.lifecycleState} />
                    </td>
                    <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-500 font-black text-[10px] font-mono tracking-tighter">
                            <Calendar size={12} className="text-slate-300" />
                            {claim.filedDate.toUpperCase()}
                        </div>
                    </td>
                    <td className="px-6 py-5 text-right font-mono font-black text-slate-900 group-hover:text-emerald-600 transition-colors text-[14px] tracking-tighter">
                        <div className="flex items-center justify-end gap-1">
                            <span className="text-[10px] opacity-20">$</span>
                            {claim.claimAmount.toLocaleString()}
                        </div>
                    </td>
                    <td className="px-6 py-5 text-right font-black">
                        <button className="text-[9px] uppercase tracking-[0.3em] text-slate-300 group-hover:text-blue-600 flex items-center gap-2 justify-end transition-all italic hover:scale-105 active:scale-95">
                            COMMAND <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
        <div className="px-6 py-4 bg-slate-950 border-t border-white/10 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.4em] italic text-white/40">
            <div className="flex items-center gap-3">
                <Shield size={14} className="text-emerald-400 animate-pulse-subtle" />
                AUTHENTICATED_SECURE_TRACE_ACTIVE::NODE_LEGAL
            </div>
            <div className="flex items-center shadow-inner gap-1 bg-white/5 px-3 py-1 rounded-sm border border-white/5">
                 <button className="px-2 py-1 text-white/30 hover:text-white transition-colors">PREV</button>
                 <div className="w-px h-2 bg-white/10" />
                 <button className="px-2 py-1 text-white/30 hover:text-white transition-colors">NEXT</button>
            </div>
        </div>
      </div>
    </div>
  );
};