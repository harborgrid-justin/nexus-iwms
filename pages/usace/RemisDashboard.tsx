import React from 'react';
import { Landmark, Building2, ArrowRightLeft, FileClock, Shield, BarChart, Activity } from 'lucide-react';
import { USACE_ASSETS, USACE_ACQUISITIONS, USACE_OUTGRANTS } from '../../services/mockData';
import { useNavigate } from 'react-router-dom';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';

const KpiCard = ({ title, value, icon: Icon, color, link }: { title: string, value: string | number, icon: any, color: string, link: string }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(link)} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      <div className="text-slate-500 text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold text-slate-900 mt-1">{value}</div>
    </div>
  );
};

export const RemisDashboard: React.FC = () => {
    const civilWorksAssets = USACE_ASSETS.filter(a => a.program === 'Civil Works').length;
    const militaryAssets = USACE_ASSETS.filter(a => a.program === 'Military').length;
    const activeAcquisitions = USACE_ACQUISITIONS.filter(a => a.stage !== 'Closing').length;
    const expiringOutgrants = USACE_OUTGRANTS.filter(o => {
        const C = new Date(o.endDate);
        const T = new Date();
        const D = (C.getTime() - T.getTime()) / (1000 * 3600 * 24);
        return D > 0 && D <= 365;
    }).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3"><Landmark /> USACE REMIS Dashboard</h1>
          <p className="text-slate-500 mt-1">Authoritative overview of the USACE real property portfolio.</p>
        </div>
        <RegulatoryBadge refs={['1', '2']} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Civil Works Assets" value={civilWorksAssets} icon={Building2} color="bg-blue-500" link="/usace/inventory" />
        <KpiCard title="Military Program Assets" value={militaryAssets} icon={Shield} color="bg-green-500" link="/usace/inventory" />
        <KpiCard title="Active Acquisitions" value={activeAcquisitions} icon={ArrowRightLeft} color="bg-amber-500" link="/usace/acquisitions" />
        <KpiCard title="Out-Grants Expiring (1yr)" value={expiringOutgrants} icon={FileClock} color="bg-red-500" link="/usace/outgrants" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button onClick={() => {}} className="p-4 bg-slate-50 border rounded-lg text-center hover:bg-slate-100 hover:border-slate-300">
                    <BarChart className="mx-auto text-blue-600 mb-2"/>
                    <span className="font-semibold text-sm">Generate G2 Report</span>
                </button>
                 <button onClick={() => {}} className="p-4 bg-slate-50 border rounded-lg text-center hover:bg-slate-100 hover:border-slate-300">
                    <ArrowRightLeft className="mx-auto text-blue-600 mb-2"/>
                    <span className="font-semibold text-sm">Start New Acquisition</span>
                </button>
                 <button onClick={() => {}} className="p-4 bg-slate-50 border rounded-lg text-center hover:bg-slate-100 hover:border-slate-300">
                    <FileClock className="mx-auto text-blue-600 mb-2"/>
                    <span className="font-semibold text-sm">Create Out-Grant</span>
                </button>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Activity/> Recent Activity</h3>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div><div>Asset <span className="font-semibold">UA-02</span> status updated to Synced with CEFMS.</div></li>
                <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div><div>Disposal <span className="font-semibold">DIS-01</span> moved to GSA Screening.</div></li>
                <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div><div>New Appraisal <span className="font-semibold">AP-01</span> finalized for asset UA-04.</div></li>
            </ul>
        </div>
      </div>
    </div>
  );
};
