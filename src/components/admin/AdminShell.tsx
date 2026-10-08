import { AdminSidebar } from './AdminSidebar';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[var(--bg-deep)] overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Desktop Top Header */}
        <header className="hidden md:flex h-20 px-8 items-center justify-between border-b border-[rgba(255,255,255,0.05)] bg-[var(--bg-deep)]">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white tracking-tight">Workspace Overview</h1>
            <div className="h-4 w-px bg-[rgba(255,255,255,0.1)]" />
            <span className="text-sm font-medium text-[var(--fg-muted)]">Content Management System</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-white cursor-pointer hover:border-[var(--accent)] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[var(--border-strong)] cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/profile/portfolio-profile.jpg" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-grow overflow-y-auto pt-16 md:pt-6 pb-6 px-4 md:px-6 bg-[var(--bg-deep)]">
          <div className="bg-[var(--bg-elevated)] border border-[rgba(255,255,255,0.05)] rounded-[24px] shadow-2xl overflow-hidden min-h-full">
            <div className="p-6 md:p-10 max-w-[1200px] mx-auto w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
