import React from 'react';
import Link from 'next/link';

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  /** Primary action, e.g. "Add New" button */
  actionLabel?: string;
  actionHref?: string;
  /** Optional back link */
  backHref?: string;
  children?: React.ReactNode;
}

export function AdminPageHeader({ title, subtitle, actionLabel, actionHref, backHref, children }: AdminPageHeaderProps) {
  return (
    <div className="mb-8 pb-6 border-b border-[var(--border-color)]">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--fg-muted)] hover:text-white transition-colors mb-5 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>
      )}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-[1.75rem] md:text-3xl font-bold text-white tracking-tight leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-[var(--fg-muted)] mt-1.5 max-w-xl">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {actionLabel && actionHref && (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-bright)] transition-colors shadow-[0_4px_14px_var(--accent-glow)] whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {actionLabel}
            </Link>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
