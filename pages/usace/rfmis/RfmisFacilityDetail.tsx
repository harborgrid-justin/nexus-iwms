
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { USACE_RFMIS_FACILITIES, USACE_RFMIS_LEASES, USACE_RFMIS_PROJECTS } from '../../../services/mockData';
import { ArrowLeft, Building, MapPin, Phone, Mail, FileText, Wrench, ShieldCheck, Activity, DollarSign, Layers, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { DetailItem } from '../../../components/DetailItem';

export const RfmisFacilityDetail: React.FC = () => {
    const { facilityId } = useParams<{ facilityId: string }>();
    const navigate = useNavigate();
    const facility = USACE_RFMIS_FACILITIES.find(f => f.id === facilityId);
    const lease = USACE_RFMIS_LEASES.find(l => l.facilityId === facilityId);
    const projects = USACE_RFMIS_PROJECTS.filter(p => p.facilityId === facilityId);
    
    const [activeTab, setActiveTab] = useState('overview');

    if (!facility) {
        return <div className="p-6">Facility not found. <Link to="/rfmis/inventory" className="text-blue-600">Back to Inventory</Link></div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <button onClick={() => navigate('/rfmis/inventory')} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-2">
                    <ArrowLeft size={16} /> Back to Inventory
                </button>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{facility.name}</h1>
                        <p className="text-slate-500 font-mono">RSID: {facility.rsid} • {facility.recruitingBattalion}</p>
                    </div>
                    <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${facility.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>{facility.status}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 border-b border-slate-200">
                    <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
                        <button onClick={() => setActiveTab('overview')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Overview & GIS</button>
                        <button onClick={() => setActiveTab('lease')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'lease' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Lease & Landlord</button>
                        <button onClick={() => setActiveTab('operations')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'operations' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Space & Ops</button>
                        <button onClick={() => setActiveTab('srm')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'srm' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>SRM & Condition</button>
                        <button onClick={() => setActiveTab('compliance')} className={`shrink-0 border-b-2 px-1 py-4 text-sm font-medium ${activeTab === 'compliance' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Compliance</button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-800 border-b pb-2">Facility Profile</h3>
                                    <DetailItem label="Address" value={`${facility.address}, ${facility.city}, ${facility.state} ${facility.zip}`} icon={MapPin} />
                                    <DetailItem label="Type" value={facility.type} icon={Building} />
                                    <DetailItem label="Service Component" value={facility.serviceComponent} icon={Users} />
                                    <DetailItem label="USACE District" value={facility.usaceDistrict} icon={ShieldCheck} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-800 border-b pb-2">Lifecycle Tracking (Req 3)</h3>
                                    <DetailItem label="Current Stage" value={facility.lifecycleStage} icon={Activity} />
                                    <div className="bg-slate-50 p-3 rounded-lg border text-sm">
                                        <p className="font-semibold text-slate-700 mb-2">Transition Management (Req 19)</p>
                                        {facility.status === 'Relocating' ? (
                                            <div className="text-amber-700 flex items-start gap-2"><AlertTriangle size={16} className="shrink-0 mt-0.5"/> Active Relocation Action: Site Selection Phase</div>
                                        ) : (
                                            <div className="text-slate-500">No active transition actions.</div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-800 border-b pb-2">Recruiting Mission</h3>
                                    <DetailItem label="Brigade" value={facility.recruitingBrigade} icon={Users} />
                                    <DetailItem label="Battalion" value={facility.recruitingBattalion} icon={Users} />
                                    <DetailItem label="Catchment Radius" value={`${facility.catchmentAreaRadiusMiles} miles`} icon={MapPin} />
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Geospatial Analysis (Req 10)</h3>
                                <div className="h-64 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                                    <div className="text-center text-slate-500">
                                        <MapPin size={48} className="mx-auto mb-2 opacity-50"/>
                                        <p>Interactive Map Component Placeholder</p>
                                        <p className="text-xs">Lat: {facility.coordinates.lat}, Lng: {facility.coordinates.lng}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'lease' && (
                        <div>
                            {lease ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h3 className="font-bold text-slate-800 border-b pb-2">Lease Terms (Req 2)</h3>
                                        <DetailItem label="Lease Number" value={lease.leaseNumber} icon={FileText} />
                                        <DetailItem label="Status" value={lease.status} icon={Activity} />
                                        <DetailItem label="Start Date" value={lease.startDate} icon={FileText} />
                                        <DetailItem label="Expiration Date" value={lease.expirationDate} icon={FileText} />
                                        <DetailItem label="Annual Rent" value={`$${lease.annualRent.toLocaleString()}`} icon={DollarSign} />
                                        <DetailItem label="Renewal Options" value={lease.renewalOptions} icon={Layers} />
                                        <DetailItem label="Termination Rights" value={lease.terminationRights} icon={AlertTriangle} />
                                    </div>
                                    <div className="space-y-6">
                                        <h3 className="font-bold text-slate-800 border-b pb-2">Landlord Coordination (Req 12)</h3>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <p className="font-bold text-slate-900">{lease.landlordName}</p>
                                            <div className="mt-4 space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-slate-600"><Users size={16}/> {lease.landlordContact.name}</div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600"><Phone size={16}/> {lease.landlordContact.phone}</div>
                                                <div className="flex items-center gap-2 text-sm text-slate-600"><Mail size={16}/> {lease.landlordContact.email}</div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-slate-200">
                                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Landlord Responsibilities</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {lease.servicesIncluded.map(s => (
                                                        <span key={s} className="px-2 py-1 bg-white border rounded text-xs text-slate-700">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-slate-500 italic">No lease record found for this facility.</div>
                            )}
                        </div>
                    )}

                    {activeTab === 'operations' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Space Utilization (Req 4)</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-3 rounded border text-center">
                                        <p className="text-xs text-slate-500 uppercase">Total Area</p>
                                        <p className="text-xl font-bold text-slate-900">{facility.sizeSqFt} sqft</p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded border text-center">
                                        <p className="text-xs text-slate-500 uppercase">Usable Area</p>
                                        <p className="text-xl font-bold text-slate-900">{facility.usableSqFt} sqft</p>
                                    </div>
                                </div>
                                <DetailItem label="Suitability Score" value={`${facility.suitabilityScore}/100`} icon={Activity} />
                                <p className="text-sm text-slate-600">Assessed for layout suitability and accessibility compliance.</p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-bold text-slate-800 border-b pb-2">Utilities & Services (Req 11)</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between p-2 bg-slate-50 rounded"><span>Electric</span> <span className="font-mono">$250/mo (Avg)</span></li>
                                    <li className="flex justify-between p-2 bg-slate-50 rounded"><span>Water/Sewer</span> <span className="font-mono">Landlord</span></li>
                                    <li className="flex justify-between p-2 bg-slate-50 rounded"><span>Janitorial</span> <span className="font-mono">Contracted</span></li>
                                    <li className="flex justify-between p-2 bg-slate-50 rounded"><span>Telecom</span> <span className="font-mono">Govt. Provided</span></li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'srm' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-50 p-4 rounded-xl border text-center">
                                    <p className="text-sm text-slate-500 font-medium">Facility Condition Index (FCI)</p>
                                    <p className={`text-4xl font-bold mt-2 ${facility.fci > 90 ? 'text-green-600' : facility.fci > 70 ? 'text-amber-600' : 'text-red-600'}`}>{facility.fci}</p>
                                    <p className="text-xs text-slate-400 mt-1">Condition Assessment (Req 6)</p>
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">SRM Projects (Req 5)</h3>
                                    {projects.length > 0 ? (
                                        <div className="space-y-3">
                                            {projects.map(p => (
                                                <div key={p.id} className="p-3 border rounded bg-white flex justify-between items-center hover:bg-slate-50">
                                                    <div>
                                                        <p className="font-semibold text-sm text-slate-900">{p.name}</p>
                                                        <p className="text-xs text-slate-500">{p.type} • {p.status}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-mono text-sm font-medium">${p.estimatedCost.toLocaleString()}</p>
                                                        <p className="text-xs text-slate-500">FY{p.fiscalYear}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : <p className="text-sm text-slate-500 italic">No SRM projects recorded.</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'compliance' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Inspections (Req 13)</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 p-3 bg-green-50 text-green-800 rounded border border-green-200">
                                        <CheckCircle size={18} />
                                        <span className="text-sm font-medium">Annual Safety Inspection - Passed (Jan 15, 2023)</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 text-slate-600 rounded border">
                                        <Activity size={18} />
                                        <span className="text-sm font-medium">Fire Marshal Inspection - Pending</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Environmental (Req 9)</h3>
                                <div className="p-4 bg-slate-50 rounded border text-sm text-slate-700">
                                    <p className="mb-2"><strong>NEPA Status:</strong> Categorical Exclusion (CATEX)</p>
                                    <p><strong>Lead/Asbestos:</strong> Negative finding on file (2019).</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
