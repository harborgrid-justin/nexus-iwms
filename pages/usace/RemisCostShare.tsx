import React, { useState } from 'react';
import { Landmark, Plus, Filter, PieChart, DollarSign, FileText } from 'lucide-react';
import { USACE_COSTSHARE, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { CostShareAgreement } from '../../types';
import { CostShareModal } from './components/CostShareModal';

const KpiCard = ({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: any, color: string }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color} text-white`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    </div>
);

export const RemisCostShare: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<CostShareAgreement>, reason: string) => {
      console.log("Creating cost share agreement:", record, "Reason:", reason);
      alert('Cost Share Agreement established. Audit log updated.');
      setIsModalOpen(false);
  };

  const getStatusColor = (state: string) => {
    switch(state) {
        case 'Active': return 'bg-green-100 text-green-800 border-green-200';
        case 'Completed': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Adjusted': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'Closed': return 'bg-slate-100 text-slate-800 border-slate-200';
        default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const activeAgreements = USACE_COSTSHARE.filter(c => c.lifecycleState === 'Active').length;
  const totalPartnerContrib = USACE_COSTSHARE.reduce((acc, c) => acc + c.partnerContribution, 0);

  return (
        <div className="max-w-[1600px] mx-auto space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-950 rounded shadow-lg shadow-black/10 text-white">
                        <PieChart size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">Cost-Share Strategy & LERRD Control</h1>
                            <div className="pulse-mission" />
                            <RegulatoryBadge refs={['33 U.S.C. 2211', 'EP 1165-2-1']} />
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 italic">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">Sponsor Agreements • Credit Tracking • Financial Partitioning</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter">Budget Partition Command</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                        <Filter size={14} className="group-hover:text-blue-500" /> Filter Ledger
                    </button>
                    <button onClick={() => setIsModalOpen(true)} className="btn-pro-primary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-[0.2em] italic">
                        <Plus size={14} /> Established Agreement
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="pro-card p-6 flex flex-col group hover:border-blue-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><FileText size={18}/></div>
                        <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-100 uppercase tracking-widest italic">ACTIVE_PARTITION</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Authenticated Agreements</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{activeAgreements}</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[88%]" />
                    </div>
                </div>
                <div className="pro-card p-6 flex flex-col group hover:border-emerald-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><DollarSign size={18}/></div>
                        <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-widest italic">SPONSOR_OBLIG</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Total Partner Contribution</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">${(totalPartnerContrib/1000000).toFixed(1)}M</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 w-[62%]" />
                    </div>
                </div>
                <div className="pro-card p-6 flex flex-col group hover:border-slate-400 transition-all cursor-pointer bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><Landmark size={18}/></div>
                        <span className="text-[9px] font-black text-slate-600 bg-slate-100 px-2.5 py-1 rounded-sm border border-slate-200 uppercase tracking-widest italic">PROJECT_STACK</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic leading-none mb-2">Cost-Share Portfolio</p>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{USACE_COSTSHARE.length}_NODES</p>
                    <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-900 w-[100%]" />
                    </div>
                </div>
            </div>
      
            <div className="pro-card overflow-hidden flex flex-col bg-white">
                <div className="px-6 py-4 border-b border-slate-100 bg-[#0A0A0B] flex justify-between items-center">
                    <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] flex items-center gap-2 italic">
                        <FileText size={14} className="text-blue-500" /> Authorized Cost-Share Ledger
                    </h2>
                    <span className="text-[9px] font-bold text-white/20 font-mono italic">CRC::OBLIG_MATRIX::V4</span>
                </div>
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 pro-col-header">STRATEGIC_PROJECT_ID</th>
                            <th className="px-6 py-4 pro-col-header">SPONSORING_ENTITY</th>
                            <th className="px-6 py-4 pro-col-header">PARTITION_RATIO (F/N)</th>
                            <th className="px-6 py-4 pro-col-header">LIFECYCLE</th>
                            <th className="px-6 py-4 pro-col-header text-right">TOTAL_PROJECT_VALUE</th>
                            <th className="px-6 py-4 pro-col-header text-right">COMMAND</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {USACE_COSTSHARE.map(agreement => {
                            const asset = USACE_ASSETS.find(a => a.id === agreement.assetId);
                            return (
                            <tr key={agreement.id} className="pro-data-row group">
                                <td className="px-6 py-5">
                                    <div className="font-black text-slate-900 group-hover:text-blue-600 uppercase tracking-tight text-[12px]">{agreement.projectId}</div>
                                    <div className="text-[9px] font-black text-blue-600/60 font-mono tracking-tighter uppercase mt-1 italic">{asset?.name}</div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="font-black text-slate-900 text-[11px] uppercase tracking-tight">{agreement.sponsor}</div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="font-black text-slate-600 font-mono text-[11px] bg-slate-50 border border-slate-100 px-2 py-1 rounded-sm inline-block group-hover:bg-white transition-colors italic">{agreement.costShareRatio}</div>
                                </td>
                                <td className="px-6 py-5">
                                    <StatusBadge status={agreement.lifecycleState} />
                                </td>
                                <td className="px-6 py-5 text-right font-mono font-black text-slate-900 group-hover:text-emerald-600 text-[13px] tracking-tighter">
                                    ${agreement.totalProjectCost.toLocaleString()}.00
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button 
                                        onClick={() => navigate(`/usace/cost-share/${agreement.id}`)} 
                                        className="btn-pro-secondary text-[10px] font-black uppercase tracking-widest italic group-hover:bg-slate-900 group-hover:text-white transition-all h-auto py-1.5"
                                    >
                                        MANAGE_ENTRY
                                    </button>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
  );
};