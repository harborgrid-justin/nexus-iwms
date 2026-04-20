import React from 'react';
import { Package, PackageCheck, PackageX, ShoppingCart, Filter, Plus } from 'lucide-react';
import { INVENTORY } from '../services/mockData';

const KpiCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className={`mb-4 inline-block p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="text-slate-500 text-sm font-medium">{title}</div>
      <div className="text-3xl font-bold text-slate-900 mt-1">{value}</div>
    </div>
);

export const Inventory: React.FC = () => {

    const totalValue = INVENTORY.reduce((acc, item) => acc + (item.stock * item.costPerUnit), 0);
    const itemsToReorder = INVENTORY.filter(item => item.stock <= item.reorderLevel).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-500 mt-1">Track MRO parts, supplies, and stock levels across locations.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm flex-1 md:flex-none justify-center">
            <Filter size={16} /> <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm flex-1 md:flex-none justify-center">
            <Plus size={16} /> <span className="hidden sm:inline">Add Item</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard title="Total Inventory Value" value={`$${(totalValue/1000).toFixed(1)}k`} icon={Package} color="bg-blue-500" />
        <KpiCard title="Items to Reorder" value={itemsToReorder} icon={ShoppingCart} color="bg-amber-500" />
        <KpiCard title="Total SKUs" value={INVENTORY.length} icon={PackageCheck} color="bg-green-500" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50"><h2 className="text-lg font-bold text-slate-900">Stock Levels</h2></div>
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Item Name</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Location</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-center">Stock Level</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Cost/Unit</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Total Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INVENTORY.map(item => {
                const stockStatus = item.stock <= item.reorderLevel ? 'low' : item.stock < item.reorderLevel * 1.2 ? 'ok' : 'good';
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500 font-mono">SKU: {item.sku}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`w-12 text-center font-mono text-lg ${stockStatus === 'low' ? 'text-red-600' : 'text-slate-800'}`}>{item.stock}</span>
                        <div className="w-24">
                          <div className="text-xs text-slate-400 text-center">min {item.reorderLevel}</div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1">
                            <div className={`h-1.5 rounded-full ${stockStatus === 'low' ? 'bg-red-500' : stockStatus === 'ok' ? 'bg-amber-500' : 'bg-green-500'}`} style={{width: `${Math.min((item.stock / (item.reorderLevel * 2)) * 100, 100)}%`}}></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-right font-mono">${item.costPerUnit.toFixed(2)}</td>
                    <td className="px-6 py-4 text-slate-600 text-right font-mono">${(item.stock * item.costPerUnit).toFixed(2)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-slate-100">
          {INVENTORY.map(item => {
            const stockStatus = item.stock <= item.reorderLevel ? 'low' : item.stock < item.reorderLevel * 1.2 ? 'ok' : 'good';
            return (
              <div key={item.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-500 font-mono">SKU: {item.sku}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-slate-900 font-semibold">${(item.stock * item.costPerUnit).toFixed(2)}</div>
                    <div className="text-xs text-slate-500">${item.costPerUnit.toFixed(2)}/unit</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="text-slate-600">{item.location}</div>
                  <div className={`font-mono font-medium ${stockStatus === 'low' ? 'text-red-600' : 'text-slate-700'}`}>
                    Stock: {item.stock} <span className="text-slate-400 text-xs">/ min {item.reorderLevel}</span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full">
                   <div className={`h-2 rounded-full ${stockStatus === 'low' ? 'bg-red-500' : stockStatus === 'ok' ? 'bg-amber-500' : 'bg-green-500'}`} style={{width: `${Math.min((item.stock / (item.reorderLevel * 2)) * 100, 100)}%`}}></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};