import React from 'react';

interface AdminFormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function AdminFormSection({ title, description, children }: AdminFormSectionProps) {
  return (
    <div className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] overflow-hidden mb-6 shadow-sm">
      <div className="px-8 py-5 bg-[var(--bg-base)] border-b border-[var(--border-color)]">
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        {description && <p className="text-sm text-[var(--fg-muted)] mt-1">{description}</p>}
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}
