import { requireAdmin } from '@/lib/auth/requireAdmin';
import { listProjects } from '@/lib/services/projects';
import { listBlogPosts } from '@/lib/services/blog';
import { listMessages } from '@/lib/services/messages';
import { listCertificates } from '@/lib/services/certificates';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import AdminStatCard from '@/components/admin/AdminStatCard';
import Link from 'next/link';

export default async function AdminDashboard() {
  await requireAdmin();
  const [projects, blogPosts, messages, certificates] = await Promise.all([
    listProjects(),
    listBlogPosts(),
    listMessages(),
    listCertificates(),
  ]);

  const unreadMessages = messages.filter(m => !m.isRead).length;
  const featuredProjects = projects.filter(p => p.isFeatured).length;
  const publishedPosts = blogPosts.filter(p => p.isPublished).length;

  const stats = [
    {
      title: 'Projects',
      count: projects.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      children: (
        <Link href="/admin/projects" className="text-sm text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors flex items-center gap-1">
          Manage <span aria-hidden>→</span>
        </Link>
      ),
    },
    {
      title: 'Blog Posts',
      count: blogPosts.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      children: (
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--fg-muted)]">{publishedPosts} published</span>
          <Link href="/admin/blog" className="text-sm text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors">
            Manage →
          </Link>
        </div>
      ),
    },
    {
      title: 'Messages',
      count: messages.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      children: (
        <div className="flex items-center justify-between">
          {unreadMessages > 0 && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
              {unreadMessages} unread
            </span>
          )}
          <Link href="/admin/messages" className="text-sm text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors ml-auto">
            View →
          </Link>
        </div>
      ),
    },
    {
      title: 'Certificates',
      count: certificates.length,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      children: (
        <Link href="/admin/certificates" className="text-sm text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors">
          Manage →
        </Link>
      ),
    },
    {
      title: 'Featured',
      count: featuredProjects,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      children: (
        <span className="text-xs text-[var(--fg-muted)]">Featured projects</span>
      ),
    },
  ];

  const quickActions = [
    {
      href: '/admin/projects/new',
      title: 'New Project',
      description: 'Add a project to portfolio',
      icon: 'M12 4v16m8-8H4',
    },
    {
      href: '/admin/blog/new',
      title: 'New Blog Post',
      description: 'Write and publish an article',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    },
    {
      href: '/admin/certificates/new',
      title: 'New Certificate',
      description: 'Log a new certification',
      icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    },
    {
      href: '/admin/messages',
      title: 'View Messages',
      description: unreadMessages > 0 ? `${unreadMessages} unread messages` : 'Check contact messages',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Portfolio overview and content management."
      >
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] text-white text-sm font-medium hover:bg-[rgba(255,255,255,0.08)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Site
        </Link>
      </AdminPageHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-12">
        {stats.map((stat) => (
          <AdminStatCard key={stat.title} title={stat.title} count={stat.count} icon={stat.icon}>
            {stat.children}
          </AdminStatCard>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-base font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-[var(--bg-elevated)] border border-[var(--border-color)] p-5 rounded-xl hover:border-[var(--accent)] transition-all duration-200 flex items-center gap-4 group hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(94,106,210,0.1)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(94,106,210,0.2)] transition-colors">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-white">{action.title}</div>
                <div className="text-xs text-[var(--fg-muted)] truncate">{action.description}</div>
              </div>
              <svg className="w-4 h-4 text-[var(--fg-muted)] ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
