
import React, { useState, FormEvent } from 'react';
import { X, Lock } from 'lucide-react';
import { GeospatialFeature, GeospatialLayer } from '../../../types';
import { USACE_ASSETS, USACE_ENCROACHMENTS, USACE_GIS_LAYERS } from '../../../services/mockData';

interface GisFeatureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: Partial<GeospatialFeature>, reason: string) => void;
    feature?: GeospatialFeature | null;
}

export const GisFeatureModal: React.FC<GisFeatureModalProps> = ({ isOpen, onClose, onSave, feature }) => {
    const [reason, setReason] = useState('');
    const isEditMode = !!feature;
    const [entityType, setEntityType] = useState<string>(feature?.entityType || 'Asset');

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (isEditMode && !reason) {
            alert('A "Reason for Change" is required to save modifications for audit purposes.');
            return;
        }

        // Construct complex objects
        const processedData = {
            ...data,
            coordinates: data.coordinatesStr ? JSON.parse(data.coordinatesStr as string) : undefined,
            metadata: {
                dataSource: data.dataSource,
                collectionMethod: data.collectionMethod,
                accuracy: data.accuracy,
                captureDate: data.captureDate,
                coordinateSystem: data.coordinateSystem
            }
        };

        onSave(processedData as any, reason);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-bold text-slate-900">{isEditMode ? 'Edit Geospatial Feature' : 'Create Geospatial Feature'}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                    
                    {/* 18.1.1 & 18.1.2 Association */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Feature Association</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium">Entity Type</label>
                                <select name="entityType" value={entityType} onChange={e => setEntityType(e.target.value)} className="w-full mt-1 p-2 border rounded-md" disabled={isEditMode}>
                                    <option value="Asset">Real Property Asset</option>
                                    <option value="Encroachment">Encroachment Case</option>
                                    <option value="Inspection">Inspection</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Entity ID</label>
                                <select name="entityId" defaultValue={feature?.entityId} className="w-full mt-1 p-2 border rounded-md" required disabled={isEditMode}>
                                    {entityType === 'Asset' && USACE_ASSETS.map(a => <option key={a.id} value={a.id}>{a.rpuid} - {a.name}</option>)}
                                    {entityType === 'Encroachment' && USACE_ENCROACHMENTS.map(e => <option key={e.id} value={e.id}>{e.id} ({e.type})</option>)}
                                </select>
                            </div>
                            <div><label className="text-sm font-medium">Map Layer</label><select name="layerId" defaultValue={feature?.layerId} className="w-full mt-1 p-2 border rounded-md" required>{USACE_GIS_LAYERS.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}</select></div>
                            <div><label className="text-sm font-medium">Geometry Type</label><select name="geometryType" defaultValue={feature?.geometryType} className="w-full mt-1 p-2 border rounded-md"><option>Point</option><option>Line</option><option>Polygon</option></select></div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium">Coordinates (JSON format)</label>
                                <textarea name="coordinatesStr" defaultValue={feature ? JSON.stringify(feature.coordinates) : ''} placeholder='e.g. {"lat": 34.5, "lng": -118.2} or [{"lat":...}, ...]' className="w-full mt-1 p-2 border rounded-md h-20 font-mono text-xs" required />
                            </div>
                        </div>
                    </div>

                    {/* 18.1.5 Metadata */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Geospatial Metadata</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div><label className="text-sm font-medium">Data Source</label><input name="dataSource" type="text" defaultValue={feature?.metadata.dataSource} placeholder="e.g. Survey, GPS" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Collection Method</label><input name="collectionMethod" type="text" defaultValue={feature?.metadata.collectionMethod} className="w-full mt-1 p-2 border rounded-md" /></div>
                            <div><label className="text-sm font-medium">Accuracy</label><input name="accuracy" type="text" defaultValue={feature?.metadata.accuracy} placeholder="e.g. +/- 1m" className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Capture Date</label><input name="captureDate" type="date" defaultValue={feature?.metadata.captureDate} className="w-full mt-1 p-2 border rounded-md" required /></div>
                            <div><label className="text-sm font-medium">Coordinate System</label><select name="coordinateSystem" defaultValue={feature?.metadata.coordinateSystem || 'WGS84'} className="w-full mt-1 p-2 border rounded-md"><option>WGS84</option><option>NAD83</option><option>UTM</option></select></div>
                            <div><label className="text-sm font-medium">Responsible Official</label><input name="responsibleOfficial" type="text" defaultValue={feature?.responsibleOfficial} className="w-full mt-1 p-2 border rounded-md" required /></div>
                        </div>
                    </div>

                     {isEditMode && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                            <label className="block text-sm font-bold text-amber-800">Reason for Change (Mandatory)</label>
                            <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Justification for update (Req 18.3.3)..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" required />
                            <p className="text-xs text-amber-700 mt-1">Updates are versioned and logged in the immutable audit trail (Req 18.8.1).</p>
                        </div>
                    )}
                </form>
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border rounded-md hover:bg-slate-50">Cancel</button>
                    <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border rounded-md hover:bg-blue-700">{isEditMode ? 'Update Feature' : 'Create Feature'}</button>
                </div>
            </div>
        </div>
    );
};
