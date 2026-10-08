import { listClientWork } from '@/lib/services/clientWork';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import DeleteForm from '@/components/admin/DeleteForm';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { deleteClientWorkAction } from './actions';

export default async function AdminClientWorks() {
  await requireAdmin();
  const items = await listClientWork();

  return (
    <div>
      <AdminPageHeader
        title="Client Work"
        subtitle={`${items.length} item${items.length !== 1 ? 's' : ''} · ${items.filter(i => i.isActive).length} active`}
        actionLabel="Add Client Work"
        actionHref="/admin/client-work/new"
      />

      {/* Desktop Table */}
      <div className="hidden md:block bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-base)] border-b border-[var(--border-color)]">
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest">Client Work</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[150px]">Category</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[110px]">Visibility</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-20">Order</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[140px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group" style={{ height: '68px' }}>
                {/* Combined thumbnail + title cell */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] flex-shrink-0">
                      {item.thumbnailPath ? (
                        // eslint-disable-next-line @next/next/no-img-element -- client-work images use legacy /uploads/* paths
                        <img src={`/${item.thumbnailPath}`} alt="" className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[var(--fg-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-white text-sm leading-tight truncate max-w-[200px]">{item.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  {item.category ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[rgba(255,255,255,0.04)] text-[var(--fg-muted)] border border-[var(--border-color)] capitalize">
                      {item.category}
                    </span>
                  ) : (
                    <span className="text-xs text-[var(--fg-muted)]/40">—</span>
                  )}
                </td>
                <td className="px-5 py-3.5">
                  {item.isActive ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[rgba(255,255,255,0.04)] text-[var(--fg-muted)] border border-[var(--border-color)]">
                      Hidden
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-sm text-[var(--fg-muted)] font-mono">{item.orderIndex}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/client-work/${item.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] hover:text-white hover:bg-[rgba(255,255,255,0.07)] hover:border-[var(--border-hover)] transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <DeleteForm action={deleteClientWorkAction} id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-[var(--fg-muted)]">
                    <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">No client work found.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {items.length > 0 && (
          <div className="px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-base)]">
            <p className="text-xs text-[var(--fg-muted)]">Showing {items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
        )}
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] p-4 flex gap-3">
            {item.thumbnailPath ? (
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element -- client-work images use legacy /uploads/* paths */}
                <img src={`/${item.thumbnailPath}`} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[var(--fg-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-medium text-white text-sm line-clamp-1">{item.title}</h3>
                {item.isActive
                  ? <span className="text-xs text-green-400 flex-shrink-0">Active</span>
                  : <span className="text-xs text-[var(--fg-muted)] flex-shrink-0">Hidden</span>
                }
              </div>
              <p className="text-xs text-[var(--fg-muted)] mb-2 capitalize">{item.category || '—'} · Order: {item.orderIndex}</p>
              <div className="flex gap-2">
                <Link href={`/admin/client-work/${item.id}/edit`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] hover:text-white transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Link>
                <DeleteForm action={deleteClientWorkAction} id={item.id} />
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="p-8 text-center text-sm text-[var(--fg-muted)]">No client work found.</div>}
      </div>
    </div>
  );
}
