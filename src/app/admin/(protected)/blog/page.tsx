import { listBlogPosts, deleteBlogPost } from '@/lib/services/blog';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import DeleteForm from '@/components/admin/DeleteForm';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export default async function AdminBlogPosts() {
  await requireAdmin();
  const items = await listBlogPosts();

  async function handleDelete(formData: FormData) {
    'use server';
    await requireAdmin();
    const id = parseInt(formData.get('id') as string, 10);
    await deleteBlogPost(id);
    revalidatePath('/admin/blog');
  }

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        subtitle="Manage your articles, drafts, and published content."
        actionLabel="New Post"
        actionHref="/admin/blog/new"
      />

      {/* Desktop Table */}
      <div className="hidden md:block bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-base)] border-b border-[var(--border-color)]">
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest">Post</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[120px]">Status</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[130px]">Date</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[140px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-[var(--border-color)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                {/* Post cell */}
                <td className="px-5 py-4">
                  <div className="font-medium text-white text-sm leading-tight line-clamp-1 max-w-[320px]">{item.title}</div>
                  <div className="text-xs font-mono text-[var(--fg-muted)] mt-0.5 truncate max-w-[280px] opacity-60">{item.slug}</div>
                </td>
                {/* Status */}
                <td className="px-5 py-4">
                  {item.isPublished ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[rgba(255,255,255,0.04)] text-[var(--fg-muted)] border border-[var(--border-color)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--fg-muted)] opacity-50" />
                      Draft
                    </span>
                  )}
                </td>
                {/* Date */}
                <td className="px-5 py-4 text-sm text-[var(--fg-muted)] whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/blog/${item.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] hover:text-white hover:bg-[rgba(255,255,255,0.07)] hover:border-[var(--border-hover)] transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <DeleteForm action={handleDelete} id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-[var(--fg-muted)]">
                    <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm">No blog posts yet. Create your first article.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {items.length > 0 && (
          <div className="px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-base)]">
            <p className="text-xs text-[var(--fg-muted)]">
              Showing {items.length} post{items.length !== 1 ? 's' : ''} · {items.filter(i => i.isPublished).length} published
            </p>
          </div>
        )}
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-medium text-white text-sm line-clamp-1">{item.title}</h3>
              {item.isPublished ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 flex-shrink-0">Published</span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[rgba(255,255,255,0.04)] text-[var(--fg-muted)] border border-[var(--border-color)] flex-shrink-0">Draft</span>
              )}
            </div>
            <p className="text-xs font-mono text-[var(--fg-muted)] mb-3 line-clamp-1 opacity-60">{item.slug}</p>
            <div className="flex gap-2">
              <Link href={`/admin/blog/${item.id}/edit`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] hover:text-white transition-all">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
              <DeleteForm action={handleDelete} id={item.id} />
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="p-8 text-center text-sm text-[var(--fg-muted)]">No blog posts found.</div>}
      </div>
    </div>
  );
}
