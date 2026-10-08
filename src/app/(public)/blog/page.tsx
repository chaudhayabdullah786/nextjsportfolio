import { listBlogPosts } from '@/lib/services/blog';
import { BlogCard } from '@/components/BlogCard';
import { Section } from '@/components/shared/ui/Section';
import { Container } from '@/components/shared/ui/Container';
import Link from 'next/link';

export const revalidate = 3600;

export const metadata = {
  title: 'Blog — Muhammad Abdullah',
  description: 'Articles, tutorials, and insights on machine learning, data engineering, and software development.',
};

export default async function BlogPage() {
  const posts = await listBlogPosts({ publishedOnly: true });

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const regularPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Section className="!pt-0">
        <Container>
          <div className="max-w-4xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--accent)] tracking-wide uppercase">Articles</span>
            </div>
            <h1 className="heading-1 text-white mb-6">Blog &amp; Insights</h1>
            <p className="text-lg text-[var(--fg-muted)] leading-relaxed max-w-2xl">
              Thoughts, tutorials, and technical deep dives on machine learning, data engineering, and software development.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <article className="group relative overflow-hidden rounded-3xl border border-[var(--border-color)] glass-panel lg:grid lg:grid-cols-2 lg:gap-0 min-h-[400px]">
                {/* Image side */}
                {featuredPost.imagePath ? (
                  <div className="relative h-64 lg:h-full lg:w-full overflow-hidden bg-[var(--bg-base)]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- imagePath is a dynamic DB value */}
                    <img
                      src={featuredPost.imagePath}
                      alt={featuredPost.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--bg-elevated)] opacity-60" />
                  </div>
                ) : (
                  <div className="h-64 lg:h-full w-full bg-[var(--bg-base)] flex items-center justify-center">
                    <svg className="w-16 h-16 text-[var(--fg-muted)] opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                    </svg>
                  </div>
                )}

                {/* Content side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center relative z-10 lg:bg-gradient-to-l lg:from-[rgba(10,10,12,0.95)] lg:to-[rgba(10,10,12,0.7)]">
                  <div className="inline-block px-3 py-1 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-6 w-max">
                    Featured
                  </div>
                  <time className="text-sm font-semibold text-[var(--fg-muted)] uppercase tracking-wider mb-3 block">
                    {new Date(featuredPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-[var(--accent)] transition-colors duration-300">
                    <Link href={`/blog/${featuredPost.slug}`} className="stretched-link">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  {featuredPost.excerpt && (
                    <p className="text-[var(--fg-muted)] leading-relaxed mb-8 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-[var(--accent)] font-semibold mt-auto">
                    Read Article
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Grid for remaining posts */}
          {regularPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {regularPosts.map(p => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <div className="text-center py-24">
              <svg className="w-16 h-16 text-[var(--fg-muted)] opacity-30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
              </svg>
              <p className="text-[var(--fg-muted)]">No blog posts available.</p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
