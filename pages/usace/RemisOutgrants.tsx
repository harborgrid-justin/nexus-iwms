import React, { useState } from 'react';
import { FileClock, Plus, Search, Eye, Edit } from 'lucide-react';
import { USACE_OUTGRANTS, USACE_INSPECTIONS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { OutGrant } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { OutGrantModal } from './components/OutGrantModal';

export const RemisOutgrants: React.FC = () => {
    const [activeTab, setActiveTab] = useState('outgrants');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOutgrant, setSelectedOutgrant] = useState<OutGrant | null>(null);
    const navigate = useNavigate();
    
    const handleNew = () => {
        setSelectedOutgrant(null);
        setIsModalOpen(true);
    };

    const handleSave = (record: Partial<OutGrant>, reason: string) => {
        console.log("Saving outgrant:", record, "Reason:", reason);
        alert('Out-Grant record saved. Audit log updated.');
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <OutGrantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} outgrant={selectedOutgrant} />
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Out-Grants & Utilization</h1>
                    <p className="text-slate-500 mt-1">Administer out-grant records and associated utilization inspections.</p>
                </div>
                 <div className="flex items-start gap-4">
                    <button onClick={handleNew} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
                        <Plus size={16} /> New Out-Grant
                    </button>
                    <RegulatoryBadge refs={['12', '16']} />
                </div>
            </div>

            <div className="border-b border-slate-200">
                <nav className="-mb-px flex gap-6" aria-label="Tabs">
                <button onClick={() => setActiveTab('outgrants')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'outgrants' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Out-Grant Records</button>
                <button onClick={() => setActiveTab('inspections')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'inspections' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>Utilization Inspections</button>
                </nav>
            </div>

            {activeTab === 'outgrants' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50"><tr>
                            <th className="px-6 py-3 font-semibold text-slate-700">Grantee</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">Asset</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">Type</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">State</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">End Date</th>
                            <th className="px-6 py-3 font-semibold text-slate-700 text-right">Annual Revenue</th>
                            <th className="px-6 py-3 font-semibold text-slate-700 text-right">Actions</th>
                        </tr></thead>
                        <tbody className="divide-y divide-slate-100">{USACE_OUTGRANTS.map(og => (
                            <tr key={og.id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 font-medium text-slate-800">{og.grantee}</td>
                                <td className="px-6 py-4 text-blue-600 font-mono">{og.assetId}</td>
                                <td className="px-6 py-4">{og.type}</td>
                                <td className="px-6 py-4"><span className={`text-xs px-2 py-1 rounded border ${og.lifecycleState === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-slate-100 text-slate-800'}`}>{og.lifecycleState}</span></td>
                                <td className="px-6 py-4">{og.endDate}</td>
                                <td className="px-6 py-4 text-right font-mono">${og.revenue.toLocaleString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`/usace/outgrants/${og.id}`} className="text-blue-600 hover:underline font-medium text-xs">Manage</Link>
                                </td>
                            </tr>
                        ))}</tbody>
                    </table>
                </div>
            )}

            {activeTab === 'inspections' && (
                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50"><tr>
                            <th className="px-6 py-3 font-semibold text-slate-700">Out-Grant</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">Inspection Date</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">Type</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">Inspector</th>
                            <th className="px-6 py-3 font-semibold text-slate-700">Status</th>
                        </tr></thead>
                        <tbody className="divide-y divide-slate-100">{USACE_INSPECTIONS.map(i => (
                            <tr key={i.id}>
                                <td className="px-6 py-4 font-medium text-blue-600 font-mono"><Link to={`/usace/outgrants/${i.outGrantId}`}>{i.outGrantId}</Link></td>
                                <td className="px-6 py-4">{i.inspectionDate}</td>
                                <td className="px-6 py-4">{i.type}</td>
                                <td className="px-6 py-4">{i.inspector}</td>
                                <td className="px-6 py-4"><span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">{i.status}</span></td>
                            </tr>
                        ))}</tbody>
                    </table>
                </div>
            )}
        </div>
    );
};