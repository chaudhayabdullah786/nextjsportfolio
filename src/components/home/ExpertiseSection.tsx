import React from 'react';
import { FadeIn } from '../shared/FadeIn';
import { Skill } from '@prisma/client';

export function ExpertiseSection({ skills }: { skills: Skill[] }) {
  return (
    <section className="py-[140px] bg-[#0A0D18] relative isolate overflow-hidden">
      {/* Background technical grid shared across all three modules */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay z-0 [mask-image:linear-gradient(to_bottom,white,transparent,white)]">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="expertise-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="60" cy="60" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#expertise-grid)" className="text-indigo-400" />
        </svg>
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-8 lg:px-12 relative z-10">
        <FadeIn>
          <div className="max-w-3xl mb-16">
            <span className="text-[13px] font-bold tracking-[0.2em] text-indigo-400 uppercase mb-4 block" aria-hidden="true">
              02 — Capabilities
            </span>
            <h2 className="text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1] mb-6">
              Technical Architecture
            </h2>
            <p className="text-[17px] text-slate-300 leading-relaxed">
              Delivering specialized engineering across the full data lifecycle, from ingestion and modeling to intelligent deployment.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* AI Module */}
          <FadeIn delay={0.1}>
            <div className="bg-[#070A12]/80 backdrop-blur-sm border border-white/5 p-8 lg:p-10 rounded-[24px] h-full shadow-xl relative overflow-hidden group hover:border-purple-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                   <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <span className="text-[14px] font-bold font-mono text-purple-500/50">01</span>
              </div>
              <h3 className="text-[24px] lg:text-[28px] font-bold text-white mb-4 leading-tight">AI & Machine Learning</h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                Developing predictive models, NLP systems, and deep learning architectures for complex business challenges.
              </p>
            </div>
          </FadeIn>
          
          {/* Data Module */}
          <FadeIn delay={0.2}>
            <div className="bg-[#070A12]/80 backdrop-blur-sm border border-white/5 p-8 lg:p-10 rounded-[24px] h-full shadow-xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                   <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <span className="text-[14px] font-bold font-mono text-cyan-500/50">02</span>
              </div>
              <h3 className="text-[24px] lg:text-[28px] font-bold text-white mb-4 leading-tight">Data Science & Analytics</h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                Extracting insights through advanced statistical analysis, ETL pipelines, and interactive BI dashboards.
              </p>
            </div>
          </FadeIn>

          {/* Full Stack Module */}
          <FadeIn delay={0.3}>
            <div className="bg-[#070A12]/80 backdrop-blur-sm border border-white/5 p-8 lg:p-10 rounded-[24px] h-full shadow-xl relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                   <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <span className="text-[14px] font-bold font-mono text-indigo-500/50">03</span>
              </div>
              <h3 className="text-[24px] lg:text-[28px] font-bold text-white mb-4 leading-tight">Full-Stack Engineering</h3>
              <p className="text-[15px] text-slate-300 leading-relaxed">
                Building scalable web applications and RESTful APIs to serve data models securely to end users.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="border-t border-white/10 pt-12">
            <h4 className="text-[16px] font-bold text-white mb-6">Core Stack</h4>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <div key={skill.id} className="px-4 py-2 rounded-lg bg-[#0A0D18] border border-white/5 text-[14px] font-medium text-slate-200 hover:border-indigo-500/40 hover:text-white transition-colors cursor-default shadow-sm">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
