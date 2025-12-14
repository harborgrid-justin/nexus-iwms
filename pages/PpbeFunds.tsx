import React from 'react';
import { Banknote, Plus, Filter, GanttChartSquare, ClipboardList, PackagePlus } from 'lucide-react';
import { PPBE_FUNDS, FUND_TRANSACTIONS, UNFUNDED_REQUIREMENTS } from '../services/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// FIX: Refactored component to use React.FC and explicit props typing to fix 'key' prop error.
const FundCard: React.FC<{ fund: typeof PPBE_FUNDS[0] }> = ({ fund }) => {
  const utilized = fund.obligated + fund.expended;
  const progress = (utilized / fund.totalAmount) * 100;
  
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg text-slate-900">{fund.name}</h3>
          <p className="text-sm text-slate-500">{fund.appropriationType} - {fund.programElement}</p>
        </div>
        <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded-full">FY{fund.fiscalYear}</span>
      </div>
      <div className="mt-4">
        <div className="w-full bg-slate-200 h-2.5 rounded-full">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="font-semibold text-slate-800">${(fund.obligated / 1000000).toFixed(1)}M Obligated</span>
          <span className="text-slate-500">${(fund.totalAmount / 1000000).toFixed(1)}M Total</span>
        </div>
      </div>
    </div>
  );
};

export const PpbeFunds: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">PPBE Fund Management</h1>
          <p className="text-slate-500 mt-1">Track funds through the Planning, Programming, Budgeting & Execution cycle.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> Add Fund Source
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PPBE_FUNDS.map(fund => <FundCard key={fund.id} fund={fund} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><GanttChartSquare/> PPBE Cycle Timeline (FY24)</h3>
          <div className="space-y-3">
            <div className="flex items-center"><div className="w-28 text-sm font-medium text-slate-600">Planning</div><div className="flex-1 h-6 bg-slate-200 rounded-l-md border-y-2 border-l-2 border-slate-400"></div></div>
            <div className="flex items-center"><div className="w-28 text-sm font-medium text-slate-600">Programming</div><div className="ml-20 flex-1 h-6 bg-slate-200 border-y-2 border-l-2 border-slate-400"></div></div>
            <div className="flex items-center"><div className="w-28 text-sm font-medium text-slate-600">Budgeting</div><div className="ml-40 flex-1 h-6 bg-slate-200 border-y-2 border-l-2 border-slate-400"></div></div>
            <div className="flex items-center"><div className="w-28 text-sm font-medium text-slate-600">Execution</div><div className="ml-60 flex-1 h-6 bg-blue-200 rounded-r-md border-y-2 border-r-2 border-l-2 border-blue-400"></div></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><PackagePlus/> Unfunded Requirements (UFRs)</h3>
            <div className="divide-y divide-slate-100">
                {UNFUNDED_REQUIREMENTS.map(ufr => (
                    <div key={ufr.id} className="py-2">
                        <div className="flex justify-between">
                            <p className="font-semibold text-slate-800">{ufr.title}</p>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ufr.priority === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>{ufr.priority}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                            <p className="text-slate-500">Est. Cost: <span className="font-medium text-slate-700">${ufr.estimatedCost.toLocaleString()}</span></p>
                            <p className="text-blue-600 font-medium">{ufr.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><ClipboardList/> Commitment & Obligation Ledger</h2></div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Date</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Fund Source</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Type</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Related To</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {FUND_TRANSACTIONS.map(ft => (
              <tr key={ft.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 text-slate-600">{ft.date}</td>
                <td className="px-6 py-4 text-slate-600 font-medium">{ft.fundId}</td>
                <td className="px-6 py-4"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${ft.type === 'Commitment' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>{ft.type}</span></td>
                <td className="px-6 py-4 text-slate-600">{ft.projectId || ft.workOrderId}</td>
                <td className="px-6 py-4 text-slate-600 text-right font-mono">${ft.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};