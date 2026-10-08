import React from 'react';
import Link from 'next/link';
import { Project } from '@prisma/client';
import { FadeIn } from '../shared/FadeIn';
import { normalizeTechStack } from '@/lib/utils/normalizeTechStack';
import { GradientOrb } from '../visual/GradientOrb';

export function SelectedWork({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const featuredOne = projects[0];
  const featuredTwo = projects[1];
  const secondary = projects.slice(2, 6);

  return (
    <section className="py-[140px] bg-[#070A12] relative isolate overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12 relative z-10">
        <FadeIn>
          <div className="mb-16">
            <span className="text-[13px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4 block" aria-hidden="true">
              03 — Portfolio
            </span>
            <h2 className="text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1]">
              Selected Work
            </h2>
          </div>
        </FadeIn>

        {/* Featured Project 1 */}
        {featuredOne && (
          <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-[64px] relative">
            <GradientOrb color="cyan" size="lg" className="absolute top-1/2 left-1/4 -translate-y-1/2 z-0" />
            
            <div className="lg:col-span-7 relative z-10">
              <div className="relative rounded-[20px] overflow-hidden bg-[#0A0D18] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] group perspective-1000">
                {/* Browser Chrome */}
                <div className="h-10 bg-slate-900 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  {featuredOne.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={featuredOne.imagePath} alt={featuredOne.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col items-start relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[13px] font-bold text-slate-500 tracking-widest uppercase">FEATURED / 01</span>
                {featuredOne.category && (
                  <span className="px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[12px] font-bold">
                    {featuredOne.category}
                  </span>
                )}
              </div>
              <h3 className="text-[32px] font-bold text-white mb-4 leading-tight">{featuredOne.title}</h3>
              <p className="text-[16px] leading-[1.7] text-slate-400 mb-6 line-clamp-3">
                {featuredOne.description || featuredOne.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {normalizeTechStack(featuredOne.techStack).slice(0,5).map(tech => (
                  <span key={tech} className="text-[13px] px-3 py-1 bg-white/[0.05] rounded-md text-slate-300">{tech}</span>
                ))}
              </div>
              <div className="flex items-center gap-6">
                <Link href={`/projects/${featuredOne.id}`} className="px-6 py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 transition-all text-[14px]">
                  View Project
                </Link>
                {featuredOne.githubLink && (
                  <a href={featuredOne.githubLink} target="_blank" className="text-[14px] font-semibold text-slate-400 hover:text-white transition-colors">
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Featured Project 2 */}
        {featuredTwo && (
          <FadeIn className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-[72px] relative">
            <GradientOrb color="purple" size="lg" className="absolute top-1/2 right-1/4 -translate-y-1/2 z-0" />

            <div className="lg:col-span-5 flex flex-col items-start lg:order-1 order-2 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[13px] font-bold text-slate-500 tracking-widest uppercase">FEATURED / 02</span>
                {featuredTwo.category && (
                  <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[12px] font-bold">
                    {featuredTwo.category}
                  </span>
                )}
              </div>
              <h3 className="text-[32px] font-bold text-white mb-4 leading-tight">{featuredTwo.title}</h3>
              <p className="text-[16px] leading-[1.7] text-slate-400 mb-6 line-clamp-3">
                {featuredTwo.description || featuredTwo.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {normalizeTechStack(featuredTwo.techStack).slice(0,5).map(tech => (
                  <span key={tech} className="text-[13px] px-3 py-1 bg-white/[0.05] rounded-md text-slate-300">{tech}</span>
                ))}
              </div>
              <div className="flex items-center gap-6">
                <Link href={`/projects/${featuredTwo.id}`} className="px-6 py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 transition-all text-[14px]">
                  View Project
                </Link>
                {featuredTwo.githubLink && (
                  <a href={featuredTwo.githubLink} target="_blank" className="text-[14px] font-semibold text-slate-400 hover:text-white transition-colors">
                    GitHub →
                  </a>
                )}
              </div>
            </div>

            <div className="lg:col-span-7 lg:order-2 order-1 relative z-10">
              <div className="relative rounded-[20px] overflow-hidden bg-[#0A0D18] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] group perspective-1000">
                {/* Browser Chrome */}
                <div className="h-10 bg-slate-900 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  {featuredTwo.imagePath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={featuredTwo.imagePath} alt={featuredTwo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Secondary Grid */}
        {secondary.length > 0 && (
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative z-10">
              {secondary.map(p => (
                <Link href={`/projects/${p.id}`} key={p.id} className="group block bg-[#0A0D18] border border-white/5 rounded-[20px] overflow-hidden hover:border-indigo-500/30 transition-colors shadow-lg hover:-translate-y-1 duration-300">
                   <div className="aspect-[16/9] relative bg-slate-900 overflow-hidden">
                     {p.imagePath && (
                       // eslint-disable-next-line @next/next/no-img-element
                       <img src={p.imagePath} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                     )}
                   </div>
                   <div className="p-6 md:p-8">
                     <h4 className="text-[22px] font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                       {p.title}
                       <span className="text-slate-600 group-hover:text-indigo-400 transition-colors translate-x-0 group-hover:translate-x-1 duration-300">→</span>
                     </h4>
                     <p className="text-[15px] text-slate-400 line-clamp-3 leading-relaxed">{p.shortDescription}</p>
                   </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        )}
        
        <FadeIn className="flex justify-center mt-12 relative z-10">
           <Link href="/projects" className="px-8 py-4 rounded-xl font-semibold text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 transition-all text-[15px]">
             View All Projects →
           </Link>
        </FadeIn>

      </div>
    </section>
  );
}
