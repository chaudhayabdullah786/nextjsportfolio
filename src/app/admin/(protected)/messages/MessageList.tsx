"use client";

import React, { useState } from 'react';
import { markMessageRead, deleteMessage } from './actions';
import { ContactMessage } from '@prisma/client';
import Link from 'next/link';

type MessageShape = Pick<ContactMessage, 'id' | 'name' | 'email' | 'subject' | 'message' | 'createdAt' | 'isRead'>;

export default function MessageList({ 
  messages, 
  pageParam, 
  totalPages 
}: { 
  messages: MessageShape[];
  pageParam: number;
  totalPages: number;
}) {
  const [selectedMessage, setSelectedMessage] = useState<MessageShape | null>(null);
  const [localRead, setLocalRead] = useState<Set<number>>(new Set());
  const [deleting, setDeleting] = useState<number | null>(null);

  const handleMarkRead = async (id: number) => {
    try {
      await markMessageRead(id);
      setLocalRead(prev => new Set([...prev, id]));
    } catch {
      alert('Failed to mark as read. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(`Delete this message? This action cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteMessage(id);
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch {
      alert('Failed to delete message. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const isRead = (msg: MessageShape) => msg.isRead || localRead.has(msg.id);

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] overflow-hidden mb-6">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[var(--bg-base)] border-b border-[var(--border-color)]">
            <tr>
              <th className="p-4 font-semibold text-xs text-[var(--fg-muted)] uppercase tracking-wider">Sender</th>
              <th className="p-4 font-semibold text-xs text-[var(--fg-muted)] uppercase tracking-wider">Email</th>
              <th className="p-4 font-semibold text-xs text-[var(--fg-muted)] uppercase tracking-wider">Subject</th>
              <th className="p-4 font-semibold text-xs text-[var(--fg-muted)] uppercase tracking-wider">Received</th>
              <th className="p-4 font-semibold text-xs text-[var(--fg-muted)] uppercase tracking-wider">Status</th>
              <th className="p-4 font-semibold text-xs text-[var(--fg-muted)] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => {
              const read = isRead(msg);
              return (
                <tr
                  key={msg.id}
                  className={`border-b border-[var(--border-color)] transition-colors ${
                    !read ? 'bg-[rgba(94,106,210,0.04)]' : 'hover:bg-[rgba(255,255,255,0.02)]'
                  }`}
                >
                  <td className="p-4 font-medium text-white text-sm">{msg.name}</td>
                  <td className="p-4 text-sm text-[var(--fg-muted)]">{msg.email}</td>
                  <td className="p-4 text-sm text-[var(--fg-muted)] max-w-[200px]">
                    <span className="line-clamp-1">{msg.subject || '(no subject)'}</span>
                  </td>
                  <td className="p-4 text-xs text-[var(--fg-muted)] font-mono whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-4">
                    {read ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[rgba(255,255,255,0.04)] text-[var(--fg-muted)] border border-[var(--border-color)]">Read</span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        Unread
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 items-center flex-wrap">
                      <button
                        onClick={() => setSelectedMessage(msg)}
                        className="text-sm text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors"
                      >
                        View
                      </button>
                      {!read && (
                        <button
                          onClick={() => handleMarkRead(msg.id)}
                          className="text-sm text-green-400 hover:text-green-300 transition-colors"
                        >
                          Mark read
                        </button>
                      )}
                      <Link
                        href={`mailto:${msg.email}?subject=${encodeURIComponent('Re: ' + (msg.subject || 'Your Message'))}`}
                        className="text-sm text-[var(--fg-muted)] hover:text-white transition-colors"
                      >
                        Reply
                      </Link>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        disabled={deleting === msg.id}
                        className="text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                      >
                        {deleting === msg.id ? '...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-3 mb-6">
        {messages.map(msg => {
          const read = isRead(msg);
          return (
            <div
              key={msg.id}
              className={`rounded-xl border p-4 ${
                !read ? 'bg-[rgba(94,106,210,0.06)] border-[rgba(94,106,210,0.2)]' : 'bg-[var(--bg-elevated)] border-[var(--border-color)]'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-white text-sm">{msg.name}</span>
                {!read
                  ? <span className="text-xs text-[var(--accent)] font-medium">Unread</span>
                  : <span className="text-xs text-[var(--fg-muted)]">Read</span>
                }
              </div>
              <p className="text-xs text-[var(--fg-muted)] mb-0.5">{msg.email}</p>
              <p className="text-xs text-[var(--fg-muted)] line-clamp-1 mb-3">{msg.subject || '(no subject)'}</p>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => setSelectedMessage(msg)} className="text-sm text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors">View</button>
                {!read && <button onClick={() => handleMarkRead(msg.id)} className="text-sm text-green-400">Mark read</button>}
                <Link href={`mailto:${msg.email}?subject=${encodeURIComponent('Re: ' + (msg.subject || 'Your Message'))}`} className="text-sm text-[var(--fg-muted)] hover:text-white transition-colors">Reply</Link>
                <button onClick={() => handleDelete(msg.id)} disabled={deleting === msg.id} className="text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50">{deleting === msg.id ? '...' : 'Delete'}</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Messages pagination" className="flex justify-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <a
              key={p}
              href={`/admin/messages?page=${p}`}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
                p === pageParam
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-elevated)] text-[var(--fg-muted)] hover:bg-[rgba(255,255,255,0.06)] border border-[var(--border-color)]'
              }`}
            >
              {p}
            </a>
          ))}
        </nav>
      )}

      {/* View Message Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl max-w-lg w-full p-6 relative shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 text-[var(--fg-muted)] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Message from {selectedMessage.name}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex gap-2 text-sm"><span className="text-[var(--fg-muted)] w-16">Email</span><span className="text-white">{selectedMessage.email}</span></div>
              <div className="flex gap-2 text-sm"><span className="text-[var(--fg-muted)] w-16">Subject</span><span className="text-white">{selectedMessage.subject || '(no subject)'}</span></div>
              <div className="flex gap-2 text-sm"><span className="text-[var(--fg-muted)] w-16">Date</span><span className="text-white">{new Date(selectedMessage.createdAt).toLocaleString()}</span></div>
            </div>
            <div className="bg-[var(--bg-base)] border border-[var(--border-color)] rounded-xl p-4 text-sm text-[var(--fg-muted)] whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
              {selectedMessage.message}
            </div>
            <div className="flex gap-3 mt-5">
              <Link
                href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent('Re: ' + (selectedMessage.subject || 'Your Message'))}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-bright)] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                Reply via Email
              </Link>
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-color)] text-sm text-[var(--fg-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.08)] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
