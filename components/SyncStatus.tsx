import React from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface SyncStatusProps {
  status: 'Synced' | 'Pending' | 'Error';
  showLabel?: boolean;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ status, showLabel = true }) => {
  switch (status) {
    case 'Synced':
      return (
        <div className="flex items-center gap-1.5 text-green-700 text-xs font-bold uppercase tracking-wider">
          <CheckCircle size={14} className="text-green-500" />
          {showLabel && <span>Synced</span>}
        </div>
      );
    case 'Pending':
      return (
        <div className="flex items-center gap-1.5 text-amber-700 text-xs font-bold uppercase tracking-wider">
          <Clock size={14} className="text-amber-500" />
          {showLabel && <span>Pending</span>}
        </div>
      );
    case 'Error':
      return (
        <div className="flex items-center gap-1.5 text-red-700 text-xs font-bold uppercase tracking-wider">
          <AlertCircle size={14} className="text-red-500" />
          {showLabel && <span>Error</span>}
        </div>
      );
    default:
      return null;
  }
};
