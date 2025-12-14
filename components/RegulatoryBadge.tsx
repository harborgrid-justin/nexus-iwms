import React from 'react';
import { ShieldCheck } from 'lucide-react';

const references: { [key: string]: string } = {
  '1': '40 U.S.C. §101 et seq.; DoDI 4165.14; ER 405-1-12 (Accountability & Lifecycle Management)',
  '2': 'DoDI 4165.14; OMB Circular A-123; ER 405-1-12 (Standardized Data & Reporting)',
  '3': '49 CFR Part 24; Uniform Appraisal Standards for Federal Land Acquisitions (Yellow Book); ER 405-1-12 (Appraisal Activities)',
  '4': '40 U.S.C. §3111–3118; 49 CFR Part 24; ER 405-1-12 (Acquisition Processes)',
  '5': '40 U.S.C. §521–559; 10 U.S.C. §2662; DoDI 4165.14 (Disposal Processes)',
  '6': '42 U.S.C. §4601–4655 (Uniform Relocation Assistance Act); 49 CFR Part 24 (Relocation Processes)',
  '7': 'National Environmental Policy Act (42 U.S.C. §4321); CERCLA (42 U.S.C. §9601); ER 200-1-2 (Environmental Programs)',
  '8': 'Federal Acquisition Regulation (FAR); 40 U.S.C. §541–559 (Solicitation Processes)',
  '9': '28 U.S.C. §§2671–2680 (Federal Tort Claims Act); ER 27-1-1 (Legal & Claims Management)',
  '10': '10 U.S.C. §2801–2805; DoDI 4165.14 (Mobilization Activities)',
  '11': '33 U.S.C. §2211; ER 405-1-12 (Cost-Share Programs)',
  '12': '33 U.S.C. §558; ER 405-1-80 (Real Estate Outgrants) (Out-Grant Administration)',
  '13': 'Rivers and Harbors Act (33 U.S.C. §403); Clean Water Act §404 (33 U.S.C. §1344) (Permit Tracking)',
  '14': 'FAR; 40 U.S.C. §3111; DoDI 4165.14 (Document Linkage)',
  '15': 'DoDI 4165.14; OMB Circular A-11; ER 405-1-12 (Hierarchical Asset Management)',
  '16': '40 U.S.C. §524; DoDI 4165.14 (Utilization Inspections)',
  '17': '33 U.S.C. §558; ER 405-1-80 (Encroachment Management)',
  '18': 'Geospatial Data Act of 2018 (43 U.S.C. §2801); OMB Circular A-16 (GIS Functionality)',
  '19': 'DoDI 4165.14; OMB Circular A-11; ER 405-1-12 (Unique Real Property Identifier)',
  '20': 'Federal Information Security Modernization Act (44 U.S.C. §3551); DoDI 8510.01 (RMF); NIST SP 800-53 (Operational Support)',
};

interface RegulatoryBadgeProps {
  refs: string[];
}

export const RegulatoryBadge: React.FC<RegulatoryBadgeProps> = ({ refs }) => {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {refs.map(ref => (
        <div key={ref} className="group relative">
          <div className="flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-semibold cursor-help border border-slate-200 hover:bg-slate-200">
            <ShieldCheck size={12} />
            <span>Ref. {ref}</span>
          </div>
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-80 p-2 bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            <p className="font-bold mb-1">Regulation Reference {ref}:</p>
            {references[ref]}
          </div>
        </div>
      ))}
    </div>
  );
};
