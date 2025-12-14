import React from 'react';
import { Lock } from 'lucide-react';

export const DetailItem = ({ label, value, icon: Icon, isProtected = false }: { label: string, value: string | number | boolean, icon: any, isProtected?: boolean }) => (
    <div className="flex items-start gap-3">
        <Icon className="text-slate-400 mt-1 flex-shrink-0" size={16} />
        <div>
            <div className="text-xs text-slate-500 flex items-center gap-1">{label} {isProtected && <Lock size={10} title="This data is protected and access is logged." />}</div>
            <div className="text-sm font-medium text-slate-800 break-words">{String(value)}</div>
        </div>
    </div>
);
