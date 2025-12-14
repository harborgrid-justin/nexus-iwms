
import React from 'react';
import { Target, Building, Users, AlertTriangle, FileClock, Activity, MapPin } from 'lucide-react';
import { USACE_RFMIS_FACILITIES, USACE_RFMIS_LEASES, USACE_RFMIS_PROJECTS } from '../../../services/mockData';
import { useNavigate } from 'react-router-dom';

const KpiCard = ({ title, value, icon: Icon, color, link, subtext }: { title: string, value: string | number, icon: any, color: string, link: string, subtext?: string }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(link)} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {subtext && <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{subtext}</span>}
      </div>
      <div className="text-slate-500 text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold text-slate-900 mt-1">{value}</div>
    </div>
  );
};

export const RfmisDashboard: React.FC = () => {
    const totalFacilities = USACE_RFMIS_FACILITIES.length;
    const leasesExpiringSoon = USACE_RFMIS_LEASES.filter(l => {
        const diff = new Date(l.expirationDate).getTime() - new Date().getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24));
        return days > 0 && days <= 90;
    }).length;
    const activeProjects = USACE_RFMIS_PROJECTS.filter(p => p.status === 'In Progress').length;
    const avgFci = Math.round(USACE_RFMIS_FACILITIES.reduce((acc, f) => acc + f.fci, 0) / totalFacilities);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3"><Target className="text-red-700" /> USACE RFMIS (Recruiting Facilities)</h1>
          <p className="text-slate-500 mt-1">Recruiting Readiness & Facility Management System.</p>
        </div>
        <div className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 text-sm font-medium">
            <Activity size={16} className="text-green-400" /> USAREC Data Sync: Connected
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Recruiting Stations" value={totalFacilities} icon={Building} color="bg-blue-600" link="/rfmis/inventory" />
        <KpiCard title="Leases Expiring (90d)" value={leasesExpiringSoon} icon={FileClock} color="bg-amber-500" link="/rfmis/leases" subtext="Critical" />
        <KpiCard title="Active SRM Projects" value={activeProjects} icon={Wrench} color="bg-purple-600" link="/rfmis/projects" />
        <KpiCard title="Avg. Facility Condition" value={avgFci} icon={Activity} color={avgFci > 80 ? "bg-green-600" : "bg-red-500"} link="/rfmis/inventory" subtext="FCI Score" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Recruiting Readiness Map</h3>
                <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"><MapPin size={14}/> View Full GIS</button>
            </div>
            <div className="bg-slate-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-slate-300">
                <div className="text-center">
                    <MapPin size={48} className="mx-auto text-slate-400 mb-2"/>
                    <p className="text-slate-500 font-medium">Geospatial Catchment Analysis</p>
                    <p className="text-xs text-slate-400 mt-1">Visualizing recruiting station coverage and demographic data.</p>
                </div>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle size={20} className="text-amber-500"/> Priority Actions</h3>
            <ul className="space-y-4 text-sm">
                <li className="flex gap-3 pb-3 border-b last:border-0">
                    <div className="bg-red-100 text-red-700 p-2 rounded-lg h-fit"><FileClock size={16}/></div>
                    <div>
                        <p className="font-semibold text-slate-800">Lease Renewal: Austin North</p>
                        <p className="text-xs text-slate-500 mt-1">Expires in 45 days. Landlord negotiation required.</p>
                    </div>
                </li>
                <li className="flex gap-3 pb-3 border-b last:border-0">
                    <div className="bg-blue-100 text-blue-700 p-2 rounded-lg h-fit"><Users size={16}/></div>
                    <div>
                        <p className="font-semibold text-slate-800">Relocation Plan: Seattle Metro</p>
                        <p className="text-xs text-slate-500 mt-1">Site selection phase initiated. USAREC approval pending.</p>
                    </div>
                </li>
                <li className="flex gap-3">
                    <div className="bg-green-100 text-green-700 p-2 rounded-lg h-fit"><Building size={16}/></div>
                    <div>
                        <p className="font-semibold text-slate-800">SRM Completion: Times Square</p>
                        <p className="text-xs text-slate-500 mt-1">Security upgrade project signed off by Corps.</p>
                    </div>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

// Quick fix for missing icon import in this file scope
import { Wrench } from 'lucide-react';
