import React from 'react';
import { FileText, Plus, BarChart, PieChart, Calendar, Clock, Mail, Landmark } from 'lucide-react';

const ReportCard = ({ title, description, icon: Icon, category }: any) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all flex flex-col">
        <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Icon size={24}/>
            </div>
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded-full">{category}</span>
        </div>
        <div className="mt-4 flex-grow">
            <h3 className="font-bold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 w-full py-2 text-sm text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              Run Now
          </button>
          <button className="py-2 px-3 text-sm text-slate-600 font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              <Clock size={16} />
          </button>
        </div>
    </div>
);


export const Reporting: React.FC = () => {
    
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reporting Engine</h1>
          <p className="text-slate-500 mt-1">Generate standard and custom reports from across the platform.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-sm">
            <Plus size={16} /> New Custom Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 border-2 border-blue-200 border-dashed p-8 rounded-xl text-center flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold text-blue-900">Custom Report Builder</h2>
          <p className="text-blue-700 mt-2">Select data sources, choose columns, apply filters, and visualize your data.</p>
          <button className="mt-4 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700">Launch Builder</button>
        </div>
         <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Clock size={20} /> Report Scheduler</h2>
           <form className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-slate-700">Report</label>
                    <select className="w-full mt-1 p-2 border rounded-lg bg-slate-50">
                        <option>G2 Real Property Inventory Report</option>
                        <option>Work Order Costs by Category</option>
                        <option>Lease Expiration Report</option>
                        <option>Capital Project Budget vs. Actual</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">Frequency</label>
                    <select className="w-full mt-1 p-2 border rounded-lg bg-slate-50">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">Email To</label>
                    <input type="email" placeholder="e.g., stakeholders@nexus.corp" className="w-full mt-1 p-2 border rounded-lg bg-slate-50"/>
                </div>
                <button type="button" className="w-full py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 flex items-center justify-center gap-2">
                    <Plus size={16} /> Schedule Report
                </button>
           </form>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900">Report Library</h2>
        <p className="text-slate-500 mt-1">Choose from a selection of pre-built standard reports.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ReportCard title="G2 Real Property Inventory" description="Standard DoD report detailing all real property assets, their value, and status." icon={Landmark} category="USACE REMIS" />
          <ReportCard title="Work Order Costs by Category" description="A summary of maintenance costs grouped by categories like HVAC, Plumbing, etc." icon={BarChart} category="Operations" />
          <ReportCard title="Lease Expiration Report" description="Lists all leases expiring in the next 90, 180, or 365 days with critical dates." icon={Calendar} category="Portfolio" />
          <ReportCard title="Space Utilization by Department" description="Visualizes space usage and vacancies allocated to each department." icon={PieChart} category="Workplace" />
          <ReportCard title="Capital Project Budget vs. Actual" description="Detailed financial overview of all active capital projects." icon={BarChart} category="Strategy" />
          <ReportCard title="Asset Condition Summary" description="Provides a list of all assets with their current condition score and maintenance history." icon={FileText} category="Operations" />
          <ReportCard title="Vendor Performance Scorecard" description="Compares vendors based on cost, quality, and on-time completion rates." icon={FileText} category="Operations" />
          <ReportCard title="Energy Consumption Trend" description="Tracks energy usage and costs across the portfolio over the last 12 months." icon={BarChart} category="Sustainability" />
      </div>
    </div>
  );
};