import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, X, Tag } from 'lucide-react';
import { BlogPost } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <FadeIn delay={0.05} y={-10}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
            Articles &amp; Engineering Notes
          </div>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Latest Technical Writing
          </h2>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            In-depth engineering walk-throughs covering machine learning production pipelines and SQL query optimization.
          </p>
        </FadeIn>
      </div>

      {/* 2-Column Grid designed specifically for 2 posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {posts.map((post, idx) => (
          <FadeIn key={post.id} delay={0.2 + idx * 0.15} y={25} className="h-full">
            <div className="h-full rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 hover:border-[#F59E0B]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-[#101626]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#070A12]/80 backdrop-blur-md text-[10px] font-semibold text-[#F59E0B] border border-[#94A3B8]/20">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-4 text-xs text-[#7C879B]">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-[#F59E0B] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#94A3B8] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#101626] border border-[#94A3B8]/15 text-[#CBD5E1]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#94A3B8]/10 mt-4">
                <button
                  type="button"
                  onClick={() => setActivePost(post)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#F59E0B] hover:text-[#F8FAFC] transition-colors cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B1020] border border-[#94A3B8]/20 p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">
                  {activePost.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] leading-tight">
                  {activePost.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-[#7C879B] mt-1 font-mono">
                  <span>{activePost.date}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="p-2 rounded-xl bg-[#101626] text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#101626]">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none text-sm sm:text-base text-[#CBD5E1] leading-relaxed whitespace-pre-line border-t border-[#94A3B8]/15 pt-6">
              {activePost.content}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#94A3B8]/15">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#F59E0B]" />
                {activePost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#101626] text-[#CBD5E1]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActivePost(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#6366F1] text-white hover:bg-[#4F46E5] transition-colors"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
