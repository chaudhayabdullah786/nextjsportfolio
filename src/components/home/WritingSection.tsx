import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@prisma/client';
import { FadeIn } from '../shared/FadeIn';

export function WritingSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length < 2) return null;
  const displayPosts = posts.slice(0, 2);

  return (
    <section className="py-[120px] lg:py-[150px] bg-[#070A12]">
      <div className="max-w-[1280px] w-full mx-auto px-8 lg:px-12">
        <FadeIn className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[13px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4 block" aria-hidden="true">06 — Writing</span>
            <h2 className="text-[48px] font-extrabold text-white leading-[1.1]">Latest Articles</h2>
          </div>
          <Link href="/blog" className="hidden md:block text-[15px] font-semibold text-slate-400 hover:text-white transition-colors">
            View All Writing →
          </Link>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {displayPosts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block h-full flex flex-col">
                <div className="aspect-[16/9] rounded-[24px] bg-slate-900 overflow-hidden mb-8 border border-white/5 relative">
                   {post.imagePath ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <img src={post.imagePath} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   ) : (
                     <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                        <svg className="w-12 h-12 text-slate-700" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                     </div>
                   )}
                </div>
                <div className="p-2 flex flex-col flex-grow">
                  <div className="text-[13px] text-cyan-400 font-bold tracking-widest uppercase mb-4 block">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <h3 className="text-[24px] lg:text-[28px] font-bold text-white mb-4 leading-snug group-hover:text-cyan-400 transition-colors">{post.title}</h3>
                  <p className="text-[15px] lg:text-[16px] text-slate-400 leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                  <span className="text-[15px] font-bold text-white mt-auto group-hover:text-cyan-400">Read Article →</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
