import type { BlogPost } from '@prisma/client';
import Link from 'next/link';

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <article className={`group glass-panel rounded-2xl overflow-hidden flex flex-col border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:-translate-y-1 h-full`}>
      {/* Image */}
      <div className={`relative w-full overflow-hidden ${featured ? 'h-56' : 'h-48'} flex-shrink-0`}>
        {post.imagePath ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- imagePath is a dynamic DB value (legacy /uploads/* or external); next/image requires statically-known domains */}
            <img
              src={post.imagePath}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent opacity-70" />
          </>
        ) : (
          <div className="w-full h-full bg-[var(--bg-base)] flex items-center justify-center">
            <svg className="w-10 h-10 text-[var(--fg-muted)] opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        <time className="text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider mb-3 block">
          {date}
        </time>

        {/* Title */}
        <h3 className={`font-bold text-white mb-3 leading-snug group-hover:text-[var(--accent-bright)] transition-colors duration-200 line-clamp-2 ${featured ? 'text-xl' : 'text-lg'}`}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed line-clamp-3 mb-5 flex-grow">
            {post.excerpt}
          </p>
        )}

        {/* Read CTA */}
        <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] group-hover:text-white transition-colors">
          <Link href={`/blog/${post.slug}`}>Read article</Link>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </article>
  );
}
