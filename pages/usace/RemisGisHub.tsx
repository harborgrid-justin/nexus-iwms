
import React, { useState } from 'react';
import { MapPinned, Search, Maximize, ArrowRightLeft, Trash2, Leaf, AlertTriangle, Layers, Plus, List, Globe, Edit, ShieldCheck, Lock, Activity } from 'lucide-react';
import { USACE_GIS_FEATURES, USACE_GIS_LAYERS, USACE_ASSETS, USACE_ENCROACHMENTS } from '../../services/mockData';
import { RegulatoryBadge } from '../../components/RegulatoryBadge';
import { GeospatialFeature, AuditEvent, GeospatialLayer } from '../../types';
import { GisFeatureModal } from './components/GisFeatureModal';

export const RemisGisHub: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'map' | 'features' | 'layers' | 'audit'>('map');
    const [visibleLayers, setVisibleLayers] = useState<Set<string>>(new Set(USACE_GIS_LAYERS.map(l => l.id)));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<GeospatialFeature | null>(null);
    
    // Feature state to simulate updates locally
    const [features, setFeatures] = useState<GeospatialFeature[]>(USACE_GIS_FEATURES);

    const toggleLayer = (layerId: string) => {
        const newSet = new Set(visibleLayers);
        if (newSet.has(layerId)) newSet.delete(layerId);
        else newSet.add(layerId);
        setVisibleLayers(newSet);
    };

    const handleEditFeature = (feature: GeospatialFeature) => {
        setSelectedFeature(feature);
        setIsModalOpen(true);
    };

    const handleCreateFeature = () => {
        setSelectedFeature(null);
        setIsModalOpen(true);
    };

    const handleSaveFeature = (record: Partial<GeospatialFeature>, reason: string) => {
        if (selectedFeature) {
            // Update
            const updated: GeospatialFeature = {
                ...selectedFeature,
                ...record,
                lifecycleState: 'Updated', // 18.7.1
                history: [{ timestamp: new Date().toLocaleString(), user: 'GIS Specialist', action: 'Update Geometry/Metadata', details: reason }, ...selectedFeature.history]
            };
            setFeatures(features.map(f => f.id === updated.id ? updated : f));
        } else {
            // Create
            const newFeature: GeospatialFeature = {
                ...record as GeospatialFeature,
                id: `FEAT-${Date.now()}`,
                lifecycleState: 'Drafted',
                history: [{ timestamp: new Date().toLocaleString(), user: 'GIS Specialist', action: 'Created Feature', details: reason }]
            };
            setFeatures([...features, newFeature]);
        }
        setIsModalOpen(false);
        alert('Geospatial record saved successfully. Audit trail updated.');
    };

    const handleLifecycleAction = (feature: GeospatialFeature, action: 'Validate' | 'Publish' | 'Retire') => {
        let newState: GeospatialFeature['lifecycleState'] = feature.lifecycleState;
        if (action === 'Validate') newState = 'Validated';
        if (action === 'Publish') newState = 'Published';
        if (action === 'Retire') newState = 'Retired';

        const updated: GeospatialFeature = {
            ...feature,
            lifecycleState: newState,
            history: [{ timestamp: new Date().toLocaleString(), user: 'GIS Manager', action: `${action} Feature`, details: 'Lifecycle transition per governance policy.' }, ...feature.history]
        };
        setFeatures(features.map(f => f.id === updated.id ? updated : f));
    };

    // Filter features for map
    const mapFeatures = features.filter(f => visibleLayers.has(f.layerId) && f.lifecycleState === 'Published');

    return (
        <div className="space-y-6 h-full flex flex-col">
            <GisFeatureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveFeature} feature={selectedFeature} />
            <div className="flex-shrink-0 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-slate-900">REMIS Geospatial Hub</h1>
                        <RegulatoryBadge refs={['18']} />
                    </div>
                    <p className="text-slate-500 mt-1">Centralized management for cartographic data, map services, and geospatial compliance.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleCreateFeature} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm"><Plus size={16}/> New Feature</button>
                </div>
            </div>

            <div className="flex-grow bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                <div className="flex border-b border-slate-200 bg-slate-50">
                    <button onClick={() => setActiveTab('map')} className={`px-6 py-3 text-sm font-medium flex items-center gap-2 ${activeTab === 'map' ? 'bg-white text-blue-600 border-t-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'}`}><Globe size={16}/> Map Viewer</button>
                    <button onClick={() => setActiveTab('features')} className={`px-6 py-3 text-sm font-medium flex items-center gap-2 ${activeTab === 'features' ? 'bg-white text-blue-600 border-t-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'}`}><List size={16}/> Feature Registry</button>
                    <button onClick={() => setActiveTab('layers')} className={`px-6 py-3 text-sm font-medium flex items-center gap-2 ${activeTab === 'layers' ? 'bg-white text-blue-600 border-t-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'}`}><Layers size={16}/> Layer Management</button>
                    <button onClick={() => setActiveTab('audit')} className={`px-6 py-3 text-sm font-medium flex items-center gap-2 ${activeTab === 'audit' ? 'bg-white text-blue-600 border-t-2 border-blue-600' : 'text-slate-600 hover:text-slate-900'}`}><ShieldCheck size={16}/> Audit Log</button>
                </div>

                {activeTab === 'map' && (
                    <div className="flex-grow relative overflow-hidden">
                        {/* Map Background */}
                        <div className="absolute inset-0 bg-slate-200 bg-[url('https://source.unsplash.com/random/1600x900/?satellite,map')] bg-cover bg-center opacity-90"></div>
                        
                        {/* Map Pins (Simulation) */}
                        {mapFeatures.map((f, i) => (
                            <div 
                                key={f.id} 
                                title={`${f.entityType}: ${f.entityId}`}
                                className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 transition-transform ${f.entityType === 'Asset' ? 'bg-blue-500' : 'bg-red-500'}`}
                                style={{ top: `${20 + (i * 15)}%`, left: `${30 + (i * 10)}%` }} // Mock positioning
                                onClick={() => handleEditFeature(f)}
                            ></div>
                        ))}

                        {/* Layer Control Panel */}
                        <div className="absolute top-4 left-4 w-64 bg-white/95 backdrop-blur shadow-xl rounded-lg border border-slate-200 p-4">
                            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Layers size={16}/> Map Layers</h3>
                            <div className="space-y-2">
                                {USACE_GIS_LAYERS.map(layer => (
                                    <label key={layer.id} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                                        <input type="checkbox" checked={visibleLayers.has(layer.id)} onChange={() => toggleLayer(layer.id)} className="rounded text-blue-600"/>
                                        {layer.name}
                                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1 rounded ml-auto">{layer.classification}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Toolbar */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                            <button className="p-2 bg-white rounded shadow hover:bg-slate-50"><Maximize size={20}/></button>
                            <button className="p-2 bg-white rounded shadow hover:bg-slate-50"><Search size={20}/></button>
                        </div>
                    </div>
                )}

                {activeTab === 'features' && (
                    <div className="flex-grow overflow-y-auto p-6">
                        <div className="mb-4 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Geospatial Feature Registry (18.1)</h3>
                            <div className="flex gap-2">
                                <input type="text" placeholder="Search features..." className="border rounded-lg px-3 py-1.5 text-sm"/>
                            </div>
                        </div>
                        <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-slate-50 border-b text-slate-600">
                                <tr>
                                    <th className="p-3 font-semibold">Feature ID</th>
                                    <th className="p-3 font-semibold">Entity</th>
                                    <th className="p-3 font-semibold">Type</th>
                                    <th className="p-3 font-semibold">Layer</th>
                                    <th className="p-3 font-semibold">Accuracy</th>
                                    <th className="p-3 font-semibold">Lifecycle State</th>
                                    <th className="p-3 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {features.map(f => (
                                    <tr key={f.id} className="hover:bg-slate-50">
                                        <td className="p-3 font-mono text-blue-600">{f.id}</td>
                                        <td className="p-3">{f.entityId}</td>
                                        <td className="p-3">{f.geometryType}</td>
                                        <td className="p-3 text-slate-500">{f.layerId}</td>
                                        <td className="p-3">{f.metadata.accuracy}</td>
                                        <td className="p-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${f.lifecycleState === 'Published' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>{f.lifecycleState}</span></td>
                                        <td className="p-3 text-right flex justify-end gap-2">
                                            <button onClick={() => handleEditFeature(f)} className="text-blue-600 hover:bg-blue-50 p-1 rounded" title="Edit Geometry"><Edit size={14}/></button>
                                            {f.lifecycleState === 'Drafted' && <button onClick={() => handleLifecycleAction(f, 'Validate')} className="text-green-600 hover:bg-green-50 p-1 rounded" title="Validate"><CheckCircle size={14}/></button>} {/* Replaced CheckCircle logic */}
                                            {f.lifecycleState === 'Validated' && <button onClick={() => handleLifecycleAction(f, 'Publish')} className="text-purple-600 hover:bg-purple-50 p-1 rounded" title="Publish"><Globe size={14}/></button>}
                                            {f.lifecycleState !== 'Retired' && <button onClick={() => handleLifecycleAction(f, 'Retire')} className="text-red-600 hover:bg-red-50 p-1 rounded" title="Retire"><Trash2 size={14}/></button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'layers' && (
                    <div className="flex-grow overflow-y-auto p-6">
                        <h3 className="font-bold text-slate-800 mb-4">Map Service & Layer Configuration (18.6)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {USACE_GIS_LAYERS.map(l => (
                                <div key={l.id} className="border rounded-xl p-4 flex justify-between items-start hover:shadow-md transition-shadow">
                                    <div>
                                        <h4 className="font-bold text-slate-900">{l.name}</h4>
                                        <p className="text-xs text-slate-500 mt-1">{l.description}</p>
                                        <div className="flex gap-2 mt-3">
                                            <span className="text-xs bg-slate-100 px-2 py-1 rounded border">{l.type}</span>
                                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">{l.ownerOrg}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${l.classification === 'CUI' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>{l.classification}</span>
                                        <p className="text-xs text-slate-400 mt-2">{l.lifecycleState}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'audit' && (
                    <div className="flex-grow overflow-y-auto p-6">
                        <h3 className="font-bold text-slate-800 mb-4">Geospatial Audit Log (18.8)</h3>
                        <div className="space-y-4">
                            {features.flatMap(f => f.history.map(h => ({...h, featureId: f.id}))).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((log, i) => (
                                <div key={i} className="flex gap-4 border-b pb-4 last:border-0">
                                    <div className="p-2 bg-slate-100 rounded-full h-fit"><Activity size={16} className="text-slate-500"/></div>
                                    <div>
                                        <p className="font-semibold text-sm text-slate-900">{log.action} <span className="text-slate-400 font-normal">on {log.featureId}</span></p>
                                        <p className="text-xs text-slate-500">{log.timestamp} by {log.user}</p>
                                        <p className="text-sm text-slate-700 mt-1 bg-slate-50 p-2 rounded">{log.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Fix imports for missing icons
import { CheckCircle } from 'lucide-react';
