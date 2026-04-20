import React, { useState } from 'react';
import { Shield, Plus, Filter, AlertTriangle, CheckCircle, Scale, Download, Search, MoreHorizontal, DollarSign as DollarIcon, Calendar, Clock } from 'lucide-react';
import { USACE_CLAIMS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { LegalClaimModal } from './components/LegalClaimModal';
import { LegalClaim } from '../../types';
import { StatusBadge } from '../../components/StatusBadge';

const KpiCard = ({ title, value, icon: Icon, color, trend }: { title: string, value: string | number, icon: any, color: string, trend?: string }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-xl transition-all hover:border-blue-200">
        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-5 group-hover:opacity-10 transition-opacity`}>
            <Icon size={96} />
        </div>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color} text-white shadow-lg shadow-blue-500/20`}>
                <Icon size={20} />
            </div>
            {trend && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{trend}</span>}
        </div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{value}</p>
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
    <div className="space-y-6">
      <LegalClaimModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Legal Services & Claims Ledger</h1>
            <RegulatoryBadge refs={['9']} />
          </div>
          <p className="text-slate-500 mt-1 text-sm font-medium">Authoritative record management for tort claims, payment tracking, and strategic litigation (ER 405-1-12).</p>
        </div>
        <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm shadow-sm transition-all">
                <Download size={16} /> Export
            </button>
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                <Plus size={18} /> Initiate Strategic Claim
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KpiCard title="Active In-Flight Claims" value={activeClaims.length} icon={Scale} color="bg-blue-600" trend="+2 Current" />
          <KpiCard title="Strategic Exposure" value={`$${totalExposure.toLocaleString()}`} icon={AlertTriangle} color="bg-amber-500" />
          <KpiCard title="Settled Adjudications" value={USACE_CLAIMS.filter(c => c.lifecycleState === 'Settled' || c.lifecycleState === 'Paid').length} icon={CheckCircle} color="bg-emerald-600" />
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Global Claims Registry</h2>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Search claimant, claim ID, or type..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all min-w-[240px]" />
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Filter size={18} /></button>
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Command Claimant</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Strategic Type</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Lifecycle Status</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Inception Date</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Strategic Amount</th>
                <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px] text-right">Control</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {USACE_CLAIMS.map(claim => (
                <tr key={claim.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-5">
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{claim.claimantInfo?.name || claim.claimant}</div>
                        <div className="text-[10px] text-blue-600 font-mono font-bold mt-0.5 tracking-tighter uppercase">{claim.id}</div>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-600 text-xs">{claim.claimType}</td>
                    <td className="px-6 py-5">
                        <StatusBadge status={claim.lifecycleState} />
                    </td>
                    <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                            <Calendar size={12} className="text-slate-300" />
                            {claim.filedDate}
                        </div>
                    </td>
                    <td className="px-6 py-5 text-right font-mono font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                        <div className="flex items-center justify-end gap-1">
                            <DollarIcon size={12} className="text-slate-300" />
                            ${claim.claimAmount.toLocaleString()}
                        </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                        <button 
                            onClick={() => navigate(`/usace/legal/${claim.id}`)}
                            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 flex items-center gap-1 ml-auto transition-colors"
                        >
                            Executive Manage <MoreHorizontal size={14} />
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Clock size={12} />
                Authoritative Audit Tracking Active
            </div>
            <div className="flex gap-2">
                 <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">Prev</button>
                 <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};