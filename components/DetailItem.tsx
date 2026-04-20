import React from 'react';
import { Lock } from 'lucide-react';

interface DetailItemProps {
  label: string;
  value: string | number | boolean | undefined | null;
  icon: React.ElementType;
  isProtected?: boolean;
}

export const DetailItem = ({ label, value, icon: Icon, isProtected = false }: DetailItemProps) => (
    <div className="flex items-start gap-3">
        <Icon className="text-slate-400 mt-1 flex-shrink-0" size={16} />
        <div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              {label} 
              {isProtected && <span title="This data is protected and access is logged."><Lock size={10} /></span>}
            </div>
            <div className="text-sm font-medium text-slate-800 break-words">{String(value)}</div>
        </div>
    </div>
);