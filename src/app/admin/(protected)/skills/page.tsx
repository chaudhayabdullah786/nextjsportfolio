import { listSkills } from '@/lib/services/skills';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import DeleteForm from '@/components/admin/DeleteForm';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { deleteSkillAction } from './actions';

export default async function AdminSkills() {
  await requireAdmin();
  const items = await listSkills();
  const categories = [...new Set(items.map(i => i.category).filter(Boolean))];

  return (
    <div>
      <AdminPageHeader
        title="Skills"
        subtitle={`${items.length} skills across ${categories.length} ${categories.length === 1 ? 'category' : 'categories'}`}
        actionLabel="Add Skill"
        actionHref="/admin/skills/new"
      />

      {/* Desktop Table */}
      <div className="hidden md:block bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-base)] border-b border-[var(--border-color)]">
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest">Skill</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[160px]">Category</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[200px]">Proficiency</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-20">Order</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[140px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                <td className="px-5 py-4 font-medium text-white text-sm">{item.name}</td>
                <td className="px-5 py-4">
                  {item.category ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[rgba(255,255,255,0.04)] text-[var(--fg-muted)] border border-[var(--border-color)] capitalize">
                      {item.category}
                    </span>
                  ) : (
                    <span className="text-xs text-[var(--fg-muted)]/40">—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-[var(--border-color)] rounded-full overflow-hidden max-w-[120px]">
                      <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${item.level}%` }} />
                    </div>
                    <span className="text-xs text-[var(--fg-muted)] font-mono tabular-nums w-9 text-right">{item.level}%</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-[var(--fg-muted)] font-mono">{item.orderIndex}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/skills/${item.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] hover:text-white hover:bg-[rgba(255,255,255,0.07)] hover:border-[var(--border-hover)] transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <DeleteForm action={deleteSkillAction} id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-[var(--fg-muted)]">
                    <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="text-sm">No skills found. Add your first skill.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {items.length > 0 && (
          <div className="px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-base)]">
            <p className="text-xs text-[var(--fg-muted)]">Showing {items.length} skill{items.length !== 1 ? 's' : ''}</p>
          </div>
        )}
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white text-sm">{item.name}</h3>
              <span className="text-xs text-[var(--fg-muted)] capitalize">{item.category || '—'}</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-1.5 bg-[var(--border-color)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--accent)] rounded-full" style={{ width: `${item.level}%` }} />
              </div>
              <span className="text-xs text-[var(--fg-muted)] font-mono">{item.level}%</span>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/skills/${item.id}/edit`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] hover:text-white transition-all">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
              <DeleteForm action={deleteSkillAction} id={item.id} />
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="p-8 text-center text-sm text-[var(--fg-muted)]">No skills found.</div>}
      </div>
    </div>
  );
}
