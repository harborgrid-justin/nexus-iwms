import React, { useState } from 'react';
import { Scroll, Plus, Filter, ShieldCheck, Activity, Calendar } from 'lucide-react';
import { USACE_PERMITS, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { Permit } from '../../types';
import { PermitModal } from './components/PermitModal';

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

export const RemisPermits: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<Permit>, reason: string) => {
      console.log("Creating permit:", record, "Reason:", reason);
      alert('Permit record created. Audit log updated.');
      setIsModalOpen(false);
  };

  const getStatusColor = (state: string) => {
    switch(state) {
        case 'Active': return 'bg-green-100 text-green-800 border-green-200';
        case 'Issued': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Under Review': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'Expired': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const activePermits = USACE_PERMITS.filter(p => p.lifecycleState === 'Active').length;
  const underReview = USACE_PERMITS.filter(p => p.lifecycleState === 'Under Review' || p.lifecycleState === 'Submitted').length;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <PermitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
            <div className="p-2.5 bg-slate-950 rounded shadow-lg shadow-black/10 text-white">
                <Scroll size={24} className="text-blue-400" />
            </div>
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none italic">Regulatory Permit Registry & Compliance Terminal</h1>
                    <div className="pulse-mission" />
                    <RegulatoryBadge refs={['Section 10', '404', '408']} />
                </div>
                <div className="flex items-center gap-3 mt-1.5 italic">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none">Environmental Compliance • Jurisdictional Authority</span>
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter italic">Enterprise Statutory Governance</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                <Filter size={14} className="group-hover:text-blue-500" /> Tactical Filters
            </button>
            <button onClick={() => setIsModalOpen(true)} className="btn-pro-primary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-[0.25em] italic">
                <Plus size={14} /> New Permit Application
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="pro-card p-6 flex flex-col group hover:border-emerald-400 transition-all cursor-pointer bg-white">
              <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><ShieldCheck size={18}/></div>
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-widest italic">COMPLIANCE_PASS</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none">Active Statutory Permits</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{activePermits}_NODES</p>
          </div>
          <div className="pro-card p-6 flex flex-col group hover:border-blue-400 transition-all cursor-pointer bg-white">
              <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><Activity size={18}/></div>
                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-100 uppercase tracking-widest italic">IN_REVIEW</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none">Applications Pending Review</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{underReview}_FILES</p>
          </div>
          <div className="pro-card p-6 flex flex-col group hover:border-slate-400 transition-all cursor-pointer bg-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12"><Scroll size={120} className="text-slate-500" /></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><Scroll size={18}/></div>
                  <span className="text-[9px] font-black text-slate-600 bg-slate-50 px-2.5 py-1 rounded-sm border border-slate-100 uppercase tracking-widest italic">TOTAL_ARCHIVE</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none relative z-10">Historical Permit Vault</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono relative z-10">{USACE_PERMITS.length}_RECORDS</p>
          </div>
      </div>
      
      <div className="pro-card overflow-hidden flex flex-col bg-white">
        <div className="px-6 border-b border-white/5 bg-[#0A0A0B] py-5 flex justify-between items-center italic">
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Permit Compliance Ledger & Tactical Registry</h2>
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-mission" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">System Status: Legal Integrity Validated</span>
            </div>
        </div>
        
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">PERMIT_IDENTIFIER</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">STRATEGIC_ASSET</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">STATUTORY_TYPE</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">PERMITTEE_NODE</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic text-center">LIFECYCLE_STATE</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic text-right">EXPIRATION_DATE</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {USACE_PERMITS.map(permit => {
                  const asset = USACE_ASSETS.find(a => a.id === permit.assetId);
                  const permittee = permit.parties.find(p => p.role === 'Permittee' || p.role === 'Applicant')?.name || 'N/A';
                  return (
                  <tr key={permit.id} className="pro-data-row group">
                      <td className="px-6 py-5">
                          <div className="font-black text-slate-900 text-[12px] uppercase tracking-tight leading-none mb-1 group-hover:text-blue-600 transition-colors italic">{permit.uniqueIdentifier}</div>
                          <div className="text-[10px] font-black text-blue-600 font-mono tracking-tighter uppercase leading-none bg-blue-50 px-2 py-0.5 border border-blue-100 rounded-sm w-fit">{permit.id}</div>
                      </td>
                      <td className="px-6 py-5 font-black text-slate-700 text-[11px] uppercase tracking-tighter italic">{asset?.name}</td>
                      <td className="px-6 py-5">
                          <span className="text-[10px] font-black px-2 py-0.5 bg-slate-950 text-white rounded-sm uppercase tracking-widest italic">{permit.type.replace(' ', '_')}</span>
                      </td>
                      <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-sm bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">P</div>
                              <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight italic">{permittee}</span>
                          </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-widest italic shadow-sm transition-all ${getStatusColor(permit.lifecycleState)}`}>
                              {permit.lifecycleState}
                          </span>
                      </td>
                      <td className="px-6 py-5 text-right font-mono font-black text-slate-900 text-[12px] tracking-tighter uppercase italic">{permit.expirationDate}</td>
                      <td className="px-6 py-5 text-right">
                          <Link to={`/usace/permits/${permit.id}`} className="btn-pro-secondary h-auto py-1.5 px-4 text-[10px] font-black uppercase tracking-widest italic group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                              COMPLIANCE_OPS
                          </Link>
                      </td>
                  </tr>
              )})}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-5 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] italic">
            <span className="text-white/40">STATUTORY_COMPLIANCE_MONITOR_ACTIVE (SIG::REG_DATA_LEAD)</span>
            <span className="text-white/20 font-mono tracking-tighter">DATAFLOW_ENCRYPTION_AES256_ACTIVE</span>
        </div>
      </div>
    </div>
  );
};