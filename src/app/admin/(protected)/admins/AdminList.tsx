"use client";

import React from 'react';
import { deleteAdmin } from './actions';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

// Only safe fields — never include passwordHash or any sensitive data
type SafeAdmin = {
  id: number;
  username: string;
  email: string | null;
  createdAt: Date;
};

export default function AdminList({ admins, currentUserId }: { admins: SafeAdmin[]; currentUserId: number }) {
  const handleDelete = async (id: number, username: string) => {
    if (!confirm(`Delete admin user "${username}"?\n\nThis action cannot be undone.`)) return;
    try {
      await deleteAdmin(id);
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message || 'Failed to delete admin user.');
      } else {
        alert('Failed to delete admin user.');
      }
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Admin Users"
        subtitle={`${admins.length} admin account${admins.length !== 1 ? 's' : ''} with portal access`}
        actionLabel="New Admin"
        actionHref="/admin/admins/new"
      />

      {admins.length === 0 ? (
        <div className="bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-color)] p-12 text-center">
          <svg className="w-10 h-10 text-[var(--fg-muted)] mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h4 className="text-lg font-semibold text-white mb-1">No Admin Users</h4>
          <p className="text-sm text-[var(--fg-muted)]">Create your first admin user to get started.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-base)] border-b border-[var(--border-color)]">
                  <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest">User</th>
                  <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest">Email</th>
                  <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[160px]">Created</th>
                  <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[130px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map(admin => (
                  <tr key={admin.id} className="border-b border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-[var(--accent)] uppercase">{admin.username[0]}</span>
                        </div>
                        <div>
                          <span className="font-medium text-white text-sm">{admin.username}</span>
                          {admin.id === currentUserId && (
                            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">you</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--fg-muted)]">{admin.email || '—'}</td>
                    <td className="px-5 py-4 text-xs text-[var(--fg-muted)] font-mono whitespace-nowrap">
                      {new Date(admin.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      {admin.id === currentUserId ? (
                        <span className="text-xs text-[var(--fg-muted)] italic">Current session</span>
                      ) : (
                        <button
                          onClick={() => handleDelete(admin.id, admin.username)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all duration-200"
                          title="Delete admin user"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-base)]">
              <p className="text-xs text-[var(--fg-muted)]">Showing {admins.length} admin{admins.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden flex flex-col gap-3">
            {admins.map(admin => (
              <div key={admin.id} className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[var(--accent)] uppercase">{admin.username[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white text-sm">{admin.username} {admin.id === currentUserId && <span className="text-xs text-[var(--accent)]">(you)</span>}</h3>
                  <p className="text-xs text-[var(--fg-muted)]">{admin.email || 'No email'}</p>
                </div>
                {admin.id !== currentUserId && (
                  <button
                    onClick={() => handleDelete(admin.id, admin.username)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
