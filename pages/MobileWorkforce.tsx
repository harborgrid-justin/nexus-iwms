import React from 'react';
import { Wrench, CheckCircle, MapPin, Camera, MessageSquare } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="inline-block p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
      <Icon size={32} />
    </div>
    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    <p className="text-slate-500 mt-2 text-sm">{description}</p>
  </div>
);

export const MobileWorkforce: React.FC = () => {
  return (
    <div className="space-y-8 text-center max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Nexus GO: Mobile Workforce</h1>
        <p className="text-slate-600 mt-2 text-lg">Empower your field technicians with the tools they need to succeed, right in their pocket.</p>
      </div>

      <div className="bg-white p-8 rounded-xl border shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-left">
                <h2 className="text-2xl font-bold text-slate-800">Boost Productivity in the Field</h2>
                <p className="mt-4 text-slate-600">
                    Nexus GO is the powerful mobile companion to the Nexus Core IWMS platform. It provides your maintenance and operations teams with real-time access to work orders, asset information, and communication tools, reducing downtime and improving first-time fix rates.
                </p>
                <div className="mt-6 flex gap-4">
                    <a href="#" className="bg-slate-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-700">Download for iOS</a>
                    <a href="#" className="bg-slate-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-700">Download for Android</a>
                </div>
            </div>
            <div>
                {/* Placeholder for a phone mockup */}
                <div className="bg-slate-800 w-64 h-[32rem] mx-auto rounded-3xl p-4 border-4 border-slate-600 shadow-2xl">
                    <div className="bg-slate-700 h-full rounded-2xl flex flex-col p-2 text-white text-left">
                        <div className="font-bold">Work Orders</div>
                        <div className="mt-2 p-2 bg-slate-600 rounded">
                            <div className="text-xs font-bold text-red-400">EMERGENCY</div>
                            <div className="text-sm">HVAC Failure</div>
                        </div>
                         <div className="mt-2 p-2 bg-slate-600 rounded">
                            <div className="text-xs font-bold text-amber-400">HIGH</div>
                            <div className="text-sm">Leaking Pipe</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mt-12">Key Features</h2>
        <p className="text-slate-500 mt-1">Everything your team needs, on the go.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <FeatureCard icon={Wrench} title="Manage Work Orders" description="Receive, update, and close work orders in real-time. Add notes, log hours, and attach photos." />
        <FeatureCard icon={CheckCircle} title="Complete Checklists" description="Follow standardized procedures and safety checklists for any task to ensure compliance and quality." />
        <FeatureCard icon={MapPin} title="Asset Information" description="Scan asset barcodes to instantly view maintenance history, documentation, and specifications." />
        <FeatureCard icon={Camera} title="Photo & Video Attachments" description="Capture and attach visual evidence of issues and completed work directly to work orders." />
        <FeatureCard icon={MessageSquare} title="Real-time Communication" description="Communicate with managers and other team members directly within the app for quick resolutions." />
        <FeatureCard icon={Wrench} title="Offline Capability" description="Continue working in areas with no connectivity. Data syncs automatically when back online." />
      </div>

    </div>
  );
};
