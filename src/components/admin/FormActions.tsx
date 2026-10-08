import React from 'react';
import Link from 'next/link';

interface FormActionsProps {
  submitLabel?: string;
  cancelHref: string;
  isPending?: boolean;
}

export function FormActions({ submitLabel = 'Save', cancelHref, isPending = false }: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-4 mt-8 py-4 border-t border-[var(--border-color)]">
      <Link 
        href={cancelHref} 
        className="px-6 py-2.5 rounded-lg border border-[var(--border-color)] bg-[rgba(255,255,255,0.05)] text-sm font-medium text-[var(--fg-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.08)] transition-colors"
      >
        Cancel
      </Link>
      <button 
        type="submit" 
        disabled={isPending}
        className="px-6 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium shadow-[0_4px_14px_var(--accent-glow)] hover:bg-[var(--accent-bright)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Saving...' : submitLabel}
      </button>
    </div>
  );
}
