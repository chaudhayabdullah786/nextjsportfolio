import { listExperiences } from '@/lib/services/experiences';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import DeleteForm from '@/components/admin/DeleteForm';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { deleteExperienceAction } from './actions';

export default async function AdminExperiences() {
  await requireAdmin();
  const items = await listExperiences();

  return (
    <div>
      <AdminPageHeader
        title="Experience"
        subtitle={`${items.length} position${items.length !== 1 ? 's' : ''} · ${items.filter(i => i.isCurrent).length} current`}
        actionLabel="Add Experience"
        actionHref="/admin/experience/new"
      />

      {/* Desktop Table */}
      <div className="hidden md:block bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-base)] border-b border-[var(--border-color)]">
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest">Role</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[180px]">Company</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[180px]">Period</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[110px]">Status</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[140px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                <td className="px-5 py-4">
                  <div className="font-medium text-white text-sm leading-tight">{item.jobTitle}</div>
                  {item.description && (
                    <div className="text-xs text-[var(--fg-muted)] mt-0.5 line-clamp-1 max-w-[280px] opacity-70">{item.description}</div>
                  )}
                </td>
                <td className="px-5 py-4 text-sm text-[var(--fg-muted)]">{item.company}</td>
                <td className="px-5 py-4 text-xs text-[var(--fg-muted)] font-mono whitespace-nowrap">
                  {new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {' — '}
                  {item.isCurrent ? 'Present' : item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'}
                </td>
                <td className="px-5 py-4">
                  {item.isCurrent ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Current
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[rgba(255,255,255,0.04)] text-[var(--fg-muted)] border border-[var(--border-color)]">
                      Past
                    </span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/experience/${item.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] hover:text-white hover:bg-[rgba(255,255,255,0.07)] hover:border-[var(--border-hover)] transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <DeleteForm action={deleteExperienceAction} id={item.id} />
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
                    <p className="text-sm">No experience records found.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {items.length > 0 && (
          <div className="px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-base)]">
            <p className="text-xs text-[var(--fg-muted)]">Showing {items.length} position{items.length !== 1 ? 's' : ''}</p>
          </div>
        )}
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-medium text-white text-sm">{item.jobTitle}</h3>
              {item.isCurrent && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />Current
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--fg-muted)] mb-1">{item.company}</p>
            <p className="text-xs font-mono text-[var(--fg-muted)] mb-3 opacity-70">
              {new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} — {item.isCurrent ? 'Present' : item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'}
            </p>
            <div className="flex gap-2">
              <Link href={`/admin/experience/${item.id}/edit`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] hover:text-white transition-all">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
              <DeleteForm action={deleteExperienceAction} id={item.id} />
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="p-8 text-center text-sm text-[var(--fg-muted)]">No experience records found.</div>}
      </div>
    </div>
  );
}
