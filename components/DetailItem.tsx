import React from 'react';
import { Lock } from 'lucide-react';

interface DetailItemProps {
  label: string;
  value: string | number | boolean | undefined | null;
  icon: React.ElementType;
  isProtected?: boolean;
}

export const DetailItem = ({ label, value, icon: Icon, isProtected = false }: DetailItemProps) => {
  const displayValue = React.useMemo(() => {
    if (value === undefined || value === null || value === '') return '—';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  }, [value]);

  return (
    <div className="flex items-start gap-4">
        <Icon className="text-slate-400 mt-1 flex-shrink-0" size={16} />
        <div className="min-w-0 flex-1">
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-1 uppercase tracking-wider">
              {label} 
              {isProtected && <span title="Protected Data: Access is logged and restricted."><Lock size={10} className="text-amber-500" /></span>}
            </div>
            <div className="text-sm font-semibold text-slate-900 break-words leading-snug">{displayValue}</div>
        </div>
    </div>
  );
};