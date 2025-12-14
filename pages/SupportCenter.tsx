import React from 'react';
import { HelpCircle, BookOpen, Send } from 'lucide-react';

const FaqItem = ({ q, a }: { q: string, a: string }) => (
  <details className="p-4 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
    <summary className="font-semibold text-slate-800">{q}</summary>
    <p className="mt-2 text-slate-600 text-sm">{a}</p>
  </details>
);

export const SupportCenter: React.FC = () => {
    
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <HelpCircle size={48} className="mx-auto text-blue-600" />
        <h1 className="text-3xl font-bold text-slate-900 mt-4">Nexus Support Center</h1>
        <p className="text-slate-600 mt-2 text-lg">How can we help you today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FAQs */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><BookOpen size={20} /> Frequently Asked Questions</h2>
          <div className="space-y-3">
            <FaqItem q="How do I create a new work order?" a="Navigate to the 'Operations > Work Hub' from the sidebar, and click the 'New Work Order' button. Fill in the required details and click submit." />
            <FaqItem q="Can I export a report to PDF?" a="Yes. On the 'Reporting' page, after running a report, you will see an 'Export' button. You can choose to export as PDF or CSV." />
            <FaqItem q="How do I reset my password?" a="For security reasons, password resets must be initiated by a system administrator. Please contact your administrator via the 'Admin > Users & Roles' page." />
            <FaqItem q="Where can I find lease documents?" a="Lease documents are attached to their respective properties. You can also search for all documents in 'Administration > Document Central'." />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
           <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Send size={20} /> Contact Support</h2>
           <form className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-slate-700">Your Name</label>
                    <input type="text" defaultValue="Dr. Alistair Vance" className="w-full mt-1 p-2 border rounded-lg bg-slate-100 cursor-not-allowed" disabled/>
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">Subject</label>
                    <input type="text" placeholder="e.g., Issue with Capital Project Budget" className="w-full mt-1 p-2 border rounded-lg bg-slate-50"/>
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-700">Describe your issue</label>
                    <textarea placeholder="Please provide as much detail as possible..." className="w-full mt-1 p-2 border rounded-lg bg-slate-50 h-32"></textarea>
                </div>
                <button type="button" className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Send size={16} /> Send Message
                </button>
           </form>
        </div>
      </div>
    </div>
  );
};
