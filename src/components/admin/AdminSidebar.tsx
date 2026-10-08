"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_GROUPS = [
  {
    label: 'Overview',
    links: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    ],
  },
  {
    label: 'Content',
    links: [
      { name: 'Projects', href: '/admin/projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
      { name: 'Blog', href: '/admin/blog', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
      { name: 'Skills', href: '/admin/skills', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
      { name: 'Experience', href: '/admin/experience', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
      { name: 'Certificates', href: '/admin/certificates', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
      { name: 'Client Work', href: '/admin/client-work', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    ],
  },
  {
    label: 'Communication',
    links: [
      { name: 'Messages', href: '/admin/messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    ],
  },
  {
    label: 'System',
    links: [
      { name: 'Settings', href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
      { name: 'Admins', href: '/admin/admins', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    ],
  },
];

// ─── SidebarContent declared at MODULE SCOPE to satisfy react-hooks/static-components ──
interface SidebarContentProps {
  pathname: string;
  onLinkClick: () => void;
}

function SidebarContent({ pathname, onLinkClick }: SidebarContentProps) {
  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + '/');

  return (
    <>
      {/* Brand */}
      <div className="px-6 py-6 border-b border-[rgba(255,255,255,0.05)] flex-shrink-0">
        <Link
          href="/admin/dashboard"
          onClick={onLinkClick}
          className="flex items-center gap-3.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white text-[15px] font-bold shadow-[0_4px_16px_var(--accent-glow)] flex-shrink-0 group-hover:scale-105 transition-transform">
            A
          </div>
          <div>
            <div className="font-bold text-white text-[15px] leading-tight tracking-tight">Admin Shell</div>
            <div className="text-[11px] text-[var(--fg-muted)] leading-tight mt-0.5 font-medium">Portfolio Workspace</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 py-6 flex flex-col gap-1 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="px-3 pb-3 pt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--fg-muted)] select-none">
              {group.label}
            </div>
            {group.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onLinkClick}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200 mb-1 ${
                  isActive(link.href)
                    ? 'bg-[var(--bg-elevated)] text-white border border-[var(--border-strong)] shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
                    : 'text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)]/50 hover:text-white border border-transparent'
                }`}
              >
                <svg
                  className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${isActive(link.href) ? 'text-[var(--accent)]' : 'text-[var(--fg-muted)]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                </svg>
                {link.name}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[rgba(255,255,255,0.05)] flex-shrink-0 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-[var(--fg-muted)] hover:bg-[var(--bg-elevated)] hover:text-white transition-colors"
        >
          <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Return to Site
        </Link>
        <a
          href="/api/admin/logout"
          className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 transition-colors w-full"
        >
          <svg className="w-[18px] h-[18px] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Secure Logout
        </a>
      </div>
    </>
  );
}
// ─── End SidebarContent ───────────────────────────────────────────────────────

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll when mobile menu is open — external system sync, not cascading setState
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Escape key closes menu
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close mobile menu when pathname changes — using a ref to avoid setState-in-effect
  const pathnameRef = React.useRef(pathname);
  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      setMobileOpen(false);
    }
  }, [pathname]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[260px] bg-[var(--bg-deep)] border-r border-[rgba(255,255,255,0.05)] h-full flex-col flex-shrink-0">
        <SidebarContent pathname={pathname} onLinkClick={closeMobile} />
      </aside>

      {/* Mobile Topbar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-50 h-16 bg-[var(--bg-deep)]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between px-5">
        <Link href="/admin/dashboard" className="font-bold text-base tracking-tight text-white flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold">A</div>
          Admin
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle admin menu"
          className="p-2 text-[var(--fg-muted)] hover:text-white rounded-md transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 w-[260px] h-full bg-[var(--bg-deep)] border-r border-[rgba(255,255,255,0.05)] flex flex-col transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent pathname={pathname} onLinkClick={closeMobile} />
      </aside>
    </>
  );
}
