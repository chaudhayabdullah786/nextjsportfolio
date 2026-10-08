import React from 'react';

type BadgeStatus = 'success' | 'warning' | 'error' | 'neutral' | 'accent';

interface StatusBadgeProps {
  status: BadgeStatus;
  children: React.ReactNode;
  pulse?: boolean;
}

const styles: Record<BadgeStatus, { bg: string, text: string, border: string, dot: string }> = {
  success: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20', dot: 'bg-green-400' },
  warning: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20', dot: 'bg-yellow-400' },
  error: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', dot: 'bg-red-400' },
  neutral: { bg: 'bg-[rgba(255,255,255,0.04)]', text: 'text-[var(--fg-muted)]', border: 'border-[var(--border-color)]', dot: 'bg-[var(--fg-muted)]' },
  accent: { bg: 'bg-[var(--accent)]/10', text: 'text-[var(--accent)]', border: 'border-[var(--accent)]/20', dot: 'bg-[var(--accent)]' },
};

export function StatusBadge({ status, children, pulse = false }: StatusBadgeProps) {
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}>
      {pulse && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${s.dot}`}></span>
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${s.dot}`}></span>
        </span>
      )}
      {!pulse && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />}
      {children}
    </span>
  );
}
