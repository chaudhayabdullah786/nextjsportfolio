import { getBlogPostBySlug } from '@/lib/services/blog';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';

export const revalidate = 3600;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  // Sanitize content from the database before rendering
  const cleanHtml = DOMPurify.sanitize(post.content);
  
  const date = new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <article className="pt-24 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Back nav */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--fg-muted)] hover:text-white transition-colors mb-12 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] text-xs font-semibold text-[var(--accent)] tracking-wide uppercase">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-[var(--fg-muted)] font-medium">
            <time className="uppercase tracking-wider text-sm">{date}</time>
            {/* Could calculate read time here based on post.content length if desired */}
          </div>
        </header>

        {/* Featured Image */}
        {post.imagePath && (
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16 border border-[var(--border-color)] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- imagePath is a dynamic DB value */}
            <img
              src={post.imagePath}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[var(--accent)] hover:prose-a:text-[var(--accent-bright)] prose-img:rounded-xl prose-img:border prose-img:border-[var(--border-color)]"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[var(--border-color)]">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white bg-[var(--bg-elevated)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:bg-[rgba(255,255,255,0.02)] transition-all duration-200"
          >
            Read More Articles
          </Link>
        </footer>

      </div>
    </article>
  );
}
