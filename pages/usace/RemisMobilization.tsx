import React, { useState } from 'react';
import { Siren, Plus, Filter, Target, Activity, ShieldAlert } from 'lucide-react';
import { USACE_MOBILIZATION_DATA, USACE_ASSETS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { Link, useNavigate } from 'react-router-dom';
import { MobilizationProfile } from '../../types';
import { MobilizationModal } from './components/MobilizationModal';

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

export const RemisMobilization: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSave = (record: Partial<MobilizationProfile>, reason: string) => {
      console.log("Creating mobilization profile:", record, "Reason:", reason);
      alert('Mobilization profile created. Audit log updated.');
      setIsModalOpen(false);
  };

  const getStatusColor = (state: string) => {
    switch(state) {
        case 'Activated': return 'bg-green-100 text-green-800 border-green-200';
        case 'Ready': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Validated': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'Deactivated': return 'bg-slate-100 text-slate-800 border-slate-200';
        default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const activatedAssets = USACE_MOBILIZATION_DATA.filter(p => p.lifecycleState === 'Activated').length;
  const criticalAssets = USACE_MOBILIZATION_DATA.filter(p => p.missionCriticality === 'Mission Critical').length;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <MobilizationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
            <div className="p-2.5 bg-slate-950 rounded shadow-lg shadow-black/10 text-white">
                <Siren size={24} className="animate-pulse text-red-500" />
            </div>
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none italic">Mobilization Protocol & Tactical Readiness Command</h1>
                    <div className="pulse-mission" />
                    <RegulatoryBadge refs={['ER 405-1-12', 'V2.4']} />
                </div>
                <div className="flex items-center gap-3 mt-1.5 italic">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none">Emergency Mobilization • Disaster Response • Readiness Validation</span>
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter italic">Mission-Critical Deployment Control</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="btn-pro-secondary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-widest italic group">
                <Filter size={14} className="group-hover:text-blue-500" /> Tactical Filters
            </button>
            <button onClick={() => setIsModalOpen(true)} className="btn-pro-primary flex items-center gap-2 px-3 py-1.5 h-auto text-[10px] font-black uppercase tracking-[0.25em] italic">
                <Plus size={14} /> New Profile Manifest
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="pro-card p-6 flex flex-col group hover:border-emerald-400 transition-all cursor-pointer bg-white">
              <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><Activity size={18}/></div>
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100 uppercase tracking-widest italic">ACTIVE_PROTOCOL</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none">Currently Activated Assets</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{activatedAssets}_NODES</p>
          </div>
          <div className="pro-card p-6 flex flex-col group hover:border-red-400 transition-all cursor-pointer bg-white">
              <div className="flex justify-between items-start mb-6">
                  <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><ShieldAlert size={18}/></div>
                  <span className="text-[9px] font-black text-red-600 bg-red-50 px-2.5 py-1 rounded-sm border border-red-100 uppercase tracking-widest italic">CRITICAL_VULN</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none">Mission Critical Inventory</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono">{criticalAssets}_STRATEGIC</p>
          </div>
          <div className="pro-card p-6 flex flex-col group hover:border-blue-400 transition-all cursor-pointer bg-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12"><Target size={120} className="text-blue-500" /></div>
              <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="p-2 bg-slate-900 rounded-sm text-white shadow-md group-hover:scale-110 transition-transform"><Target size={18}/></div>
                  <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-100 uppercase tracking-widest italic">GLOBAL_INDEX</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] italic mb-2 leading-none relative z-10">Total Readiness Profiles</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter font-mono relative z-10">{USACE_MOBILIZATION_DATA.length}_ENTRIES</p>
          </div>
      </div>
      
      <div className="pro-card overflow-hidden flex flex-col bg-white">
        <div className="px-6 border-b border-white/5 bg-[#0A0A0B] py-5 flex justify-between items-center italic">
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Mobilization Readiness Command Ledger</h2>
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-mission" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">System Status: Integrity Validated</span>
            </div>
        </div>
        
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">STRATEGIC_ASSET_NODE</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">CRITICALITY</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic">READINESS_TAG</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic text-center">LIFECYCLE_STATE</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic text-right">CONDITION_INDEX</th>
                <th className="px-6 py-4 pro-col-header uppercase tracking-widest italic text-right">PROTOCOL_OPS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {USACE_MOBILIZATION_DATA.map(profile => {
                  const asset = USACE_ASSETS.find(a => a.id === profile.assetId);
                  return (
                  <tr key={profile.id} className="pro-data-row group">
                      <td className="px-6 py-5">
                          <div className="font-black text-slate-900 text-[12px] uppercase tracking-tight leading-none mb-1 group-hover:text-blue-600 transition-colors italic">{asset?.name}</div>
                          <div className="text-[10px] font-black text-blue-600 font-mono tracking-tighter uppercase leading-none bg-blue-50 px-2 py-0.5 border border-blue-100 rounded-sm w-fit">{asset?.rpuid}</div>
                      </td>
                      <td className="px-6 py-5">
                          <span className={`text-[9px] font-black px-2.5 py-1 rounded-sm border uppercase tracking-widest italic leading-none transition-all ${profile.missionCriticality === 'Mission Critical' ? 'text-red-700 bg-red-50 border-red-100 shadow-sm' : 'text-slate-500 bg-slate-50 border-slate-100'}`}>
                              {profile.missionCriticality.replace(' ', '_').toUpperCase()}
                          </span>
                      </td>
                      <td className="px-6 py-5 font-black text-slate-700 text-[11px] uppercase tracking-tighter italic">READINESS::{profile.readinessDesignation.toUpperCase()}</td>
                      <td className="px-6 py-5 text-center">
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-widest italic shadow-sm transition-all ${getStatusColor(profile.lifecycleState)}`}>
                              {profile.lifecycleState}
                          </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                          <div className="font-mono font-black text-slate-900 text-[13px] tracking-tighter group-hover:text-blue-600 transition-colors uppercase italic">{profile.condition}_PRC</div>
                          <div className="w-24 h-1 bg-slate-100 rounded-full mt-2 ml-auto overflow-hidden">
                              <div className={`h-full ${profile.condition > 80 ? 'bg-emerald-500' : profile.condition > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${profile.condition}%`}} />
                          </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                          <Link to={`/usace/mobilization/${profile.id}`} className="btn-pro-secondary h-auto py-1.5 px-4 text-[10px] font-black uppercase tracking-widest italic group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                              MGMT_NODE
                          </Link>
                      </td>
                  </tr>
              )})}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-5 bg-slate-950 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] italic">
            <span className="text-white/40">MASTER_MOBILIZATION_LOG_ACTIVE (SIG::ADMIN_OPS_LEAD)</span>
            <span className="text-white/20 font-mono tracking-tighter">SIGINT_VALIDATED_DATAFLOW_7.1</span>
        </div>
      </div>
    </div>
  );
};