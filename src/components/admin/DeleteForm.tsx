'use client';

import React from 'react';

export default function DeleteForm({ action, id, iconOnly = false }: { action: (formData: FormData) => Promise<void>, id: number, iconOnly?: boolean }) {
  return (
    <form action={action} onSubmit={e => { if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) e.preventDefault(); }}>
      <input type="hidden" name="id" value={id.toString()} />
      <button
        type="submit"
        className={`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 border border-transparent ${
          iconOnly 
            ? 'w-8 h-8 text-[var(--fg-muted)] hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20' 
            : 'gap-1.5 px-3 py-2 text-[var(--fg-muted)] hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20'
        }`}
        title="Delete this item"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        {!iconOnly && "Delete"}
      </button>
    </form>
  );
}
