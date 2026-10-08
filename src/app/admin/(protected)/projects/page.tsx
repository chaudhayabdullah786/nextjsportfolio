import { listProjects } from '@/lib/services/projects';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import DeleteForm from '@/components/admin/DeleteForm';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { deleteProjectAction } from './actions';

export default async function AdminProjects() {
  await requireAdmin();
  const items = await listProjects();

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        subtitle="Manage your portfolio projects, media, and publishing status."
        actionLabel="Add Project"
        actionHref="/admin/projects/new"
      />

      {/* Desktop Table */}
      <div className="hidden md:block bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-base)] border-b border-[var(--border-color)]">
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest">Project</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[140px]">Category</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[110px]">Featured</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[100px]">Media</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-20">Order</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[140px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group" style={{ height: '68px' }}>
                {/* Project cell with 16:9 thumbnail */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {/* 16:9 thumbnail — 80×45px */}
                    <div className="w-[80px] h-[45px] rounded-lg overflow-hidden bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] flex-shrink-0">
                      {item.imagePath ? (
                        // eslint-disable-next-line @next/next/no-img-element -- imagePath is a dynamic DB value
                        <img
                          src={item.imagePath}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-[var(--fg-muted)] opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-white text-sm leading-tight truncate max-w-[200px]">{item.title}</div>
                      {item.shortDescription && (
                        <div className="text-xs text-[var(--fg-muted)] truncate max-w-[200px] mt-0.5 opacity-70">{item.shortDescription}</div>
                      )}
                    </div>
                  </div>
                </td>
                {/* Category */}
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[rgba(255,255,255,0.04)] text-[var(--fg-muted)] border border-[var(--border-color)] capitalize">
                    {item.category}
                  </span>
                </td>
                {/* Featured */}
                <td className="px-5 py-3.5">
                  {item.isFeatured ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Featured
                    </span>
                  ) : (
                    <span className="text-xs text-[var(--fg-muted)]/40">—</span>
                  )}
                </td>
                {/* Media */}
                <td className="px-5 py-3.5">
                  {item.imagePath ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Image
                    </span>
                  ) : (
                    <span className="text-xs text-[var(--fg-muted)]/40">—</span>
                  )}
                </td>
                {/* Order */}
                <td className="px-5 py-3.5 text-sm text-[var(--fg-muted)] font-mono">{item.orderIndex}</td>
                {/* Actions */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/projects/${item.id}/edit`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[var(--fg-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.07)] hover:border-[var(--border-hover)] transition-all"
                      title="Edit Project"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <DeleteForm action={deleteProjectAction} id={item.id} iconOnly={true} />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-[var(--fg-muted)]">
                    <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-sm">No projects yet. Add your first project to get started.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {items.length > 0 && (
          <div className="px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-base)]">
            <p className="text-xs text-[var(--fg-muted)]">Showing {items.length} project{items.length !== 1 ? 's' : ''} · {items.filter(i => i.isFeatured).length} featured</p>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] p-4 flex gap-3">
            <div className="w-[72px] h-[40px] rounded-lg overflow-hidden bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] flex-shrink-0 mt-0.5">
              {item.imagePath ? (
                // eslint-disable-next-line @next/next/no-img-element -- imagePath is a dynamic DB value
                <img src={item.imagePath} alt="" className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--fg-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-medium text-white text-sm leading-tight line-clamp-1">{item.title}</h3>
                {item.isFeatured && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--fg-muted)] capitalize mb-3">{item.category} · Order {item.orderIndex}</p>
              <div className="flex gap-1 mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)] justify-end">
                <Link
                  href={`/admin/projects/${item.id}/edit`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[var(--fg-muted)] hover:text-white bg-[rgba(255,255,255,0.04)] border border-transparent hover:border-[var(--border-hover)] transition-all"
                  title="Edit Project"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
                <DeleteForm action={deleteProjectAction} id={item.id} iconOnly={true} />
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="p-10 text-center text-sm text-[var(--fg-muted)]">No projects found.</div>
        )}
      </div>
    </div>
  );
}
