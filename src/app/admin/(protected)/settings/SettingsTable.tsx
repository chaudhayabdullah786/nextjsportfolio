"use client";

import React, { useState } from 'react';
import { updateSetting } from './actions';
import { SiteSettings } from '@prisma/client';

// Keys that contain secret/sensitive values and must never be rendered to the browser
const SENSITIVE_KEYS = new Set([
  'DATABASE_URL',
  'database_url',
  'AUTH_SECRET',
  'auth_secret',
  'SESSION_SECRET',
  'session_secret',
  'NEXTAUTH_SECRET',
  'nextauth_secret',
  'ADMIN_PASSWORD',
  'admin_password',
  'password',
  'secret',
  'token',
  'api_key',
  'API_KEY',
  'private_key',
  'PRIVATE_KEY',
]);

const isSensitive = (key: string) => {
  const lower = key.toLowerCase();
  return SENSITIVE_KEYS.has(key) || lower.includes('secret') || lower.includes('password') || lower.includes('private_key') || lower.includes('database_url') || lower.includes('api_key');
};

// Group keys for better organization
const getGroup = (key: string): string => {
  const lower = key.toLowerCase();
  if (lower.includes('social') || lower.includes('github') || lower.includes('linkedin') || lower.includes('twitter') || lower.includes('kaggle')) return 'Social Links';
  if (lower.includes('email') || lower.includes('phone') || lower.includes('whatsapp') || lower.includes('contact')) return 'Contact';
  if (lower.includes('about') || lower.includes('bio') || lower.includes('title') || lower.includes('name') || lower.includes('tagline')) return 'Profile';
  return 'General';
};

const KEY_LABELS: Record<string, string> = {
  about_text: 'About Text',
  contact_email: 'Contact Email',
  github_url: 'GitHub URL',
  linkedin_url: 'LinkedIn URL',
  twitter_url: 'Twitter URL',
  kaggle_url: 'Kaggle URL',
  phone: 'Phone Number',
  whatsapp: 'WhatsApp',
  site_title: 'Site Title',
  tagline: 'Tagline',
};

const formatKey = (key: string) =>
  KEY_LABELS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

export default function SettingsTable({ settings }: { settings: SiteSettings[] }) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newValue, setNewValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successKey, setSuccessKey] = useState<string | null>(null);

  // Filter out sensitive keys entirely
  const safeSettings = settings.filter(s => !isSensitive(s.key));

  // Group settings
  const grouped = safeSettings.reduce<Record<string, SiteSettings[]>>((acc, s) => {
    const group = getGroup(s.key);
    if (!acc[group]) acc[group] = [];
    acc[group].push(s);
    return acc;
  }, {});

  const openEdit = (key: string, currentValue: string | null) => {
    setEditingKey(key);
    setNewValue(currentValue || '');
    setSuccessKey(null);
  };

  const closeEdit = () => setEditingKey(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingKey) return;
    setIsSubmitting(true);
    try {
      await updateSetting(editingKey, newValue);
      setSuccessKey(editingKey);
      closeEdit();
    } catch {
      alert('Failed to update setting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group} className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] overflow-hidden">
            <div className="px-4 py-3 bg-[var(--bg-base)] border-b border-[var(--border-color)]">
              <h3 className="text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-wider">{group}</h3>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {items.map(setting => (
                <div key={setting.key} className="flex items-center gap-4 px-4 py-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <div className="w-44 flex-shrink-0">
                    <span className="text-sm font-medium text-white">{formatKey(setting.key)}</span>
                    <span className="block text-xs font-mono text-[var(--fg-muted)] mt-0.5">{setting.key}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    {successKey === setting.key ? (
                      <span className="text-sm text-green-400">✓ Saved</span>
                    ) : (
                      <span className="text-sm text-[var(--fg-muted)] line-clamp-1">
                        {setting.value || <span className="italic opacity-50">empty</span>}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => openEdit(setting.key, setting.value)}
                    className="flex-shrink-0 text-sm text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        {safeSettings.length === 0 && (
          <div className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] p-8 text-center text-[var(--fg-muted)]">
            No settings found.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingKey && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4"
          onClick={closeEdit}
        >
          <div
            className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-2xl max-w-lg w-full p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-5">
              <h3 className="text-lg font-bold text-white">{formatKey(editingKey)}</h3>
              <span className="text-xs font-mono text-[var(--fg-muted)]">{editingKey}</span>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1.5">Value</label>
                {editingKey.includes('text') || editingKey.includes('bio') || editingKey.includes('about') ? (
                  <textarea
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                    rows={4}
                    className="form-input resize-none"
                    disabled={isSubmitting}
                    autoFocus
                  />
                ) : (
                  <input
                    type="text"
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                    className="form-input"
                    disabled={isSubmitting}
                    autoFocus
                  />
                )}
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={closeEdit} disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-color)] text-sm text-[var(--fg-muted)] hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent-bright)] transition-colors disabled:opacity-50">
                  {isSubmitting ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
