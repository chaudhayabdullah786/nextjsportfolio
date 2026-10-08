import React from 'react';

interface AdminStatCardProps {
  title: string;
  count: number;
  icon?: React.ReactNode;
  /** Optional actions, e.g., a link element */
  children?: React.ReactNode;
}

export default function AdminStatCard({ title, count, icon, children }: AdminStatCardProps) {
  return (
    <div className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] p-6 shadow-sm flex flex-col justify-between hover:border-[rgba(255,255,255,0.10)] transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-widest mb-1">{title}</p>
          <p className="text-4xl font-bold text-white tracking-tight">{count}</p>
        </div>
        {icon && (
          <div className="w-11 h-11 rounded-xl bg-[rgba(94,106,210,0.1)] flex items-center justify-center flex-shrink-0 text-[var(--accent)] group-hover:bg-[rgba(94,106,210,0.15)] transition-colors">
            {icon}
          </div>
        )}
      </div>
      {children && (
        <div className="pt-3 border-t border-[var(--border-color)]">
          {children}
        </div>
      )}
    </div>
  );
}
