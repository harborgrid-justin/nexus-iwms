import React from 'react';

type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant, className = '' }) => {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'neutral':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        // Automatic mapping if variant not provided
        const s = status.toLowerCase();
        if (['active', 'approved', 'closed', 'synced', 'yes'].includes(s)) return 'bg-green-100 text-green-800 border-green-200';
        if (['excess', 'in progress', 'under review', 'pending', 'closing'].includes(s)) return 'bg-amber-100 text-amber-800 border-amber-200';
        if (['disposed', 'archived', 'archive', 'no'].includes(s)) return 'bg-slate-100 text-slate-800 border-slate-200';
        if (['error', 'failed', 'terminated'].includes(s)) return 'bg-red-100 text-red-800 border-red-200';
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getColors()} ${className}`}>
      {status}
    </span>
  );
};
