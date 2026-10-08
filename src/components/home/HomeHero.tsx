"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '../shared/FadeIn';
import { GradientOrb } from '../visual/GradientOrb';
import { GridPlane } from '../visual/GridPlane';
import { BriefcaseBusiness, Download } from 'lucide-react';

interface HomeHeroProps {
  projectCount: number;
  certCount: number;
}

export function HomeHero({ projectCount, certCount }: HomeHeroProps) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[95vh] pt-32 pb-20 flex items-center bg-[#070A12] overflow-hidden">
      <GridPlane className="text-indigo-400 opacity-20" />
      <GradientOrb color="indigo" size="xl" className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" />
      <GradientOrb color="cyan" size="lg" className="bottom-0 right-0 translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-[1280px] w-full mx-auto px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col items-start gap-8">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 text-sm font-medium text-green-400 backdrop-blur-md bg-[#0A0D18]/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              Available for Select Contracts & Full-Time Roles
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="relative">
            <h1 className="font-extrabold tracking-tight text-white leading-[1.05] relative z-10" style={{ fontSize: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
              Muhammad <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-lg">
                Abdullah
              </span>
            </h1>
            <div className="absolute -top-10 -left-4 text-[120px] font-black text-white/[0.02] tracking-tighter pointer-events-none select-none z-0" aria-hidden="true">
              DATA<br/>ENGINEER
            </div>
            <p className="text-2xl font-semibold text-slate-300 mt-6 tracking-tight flex items-center gap-4">
              <span className="text-indigo-500 text-lg" aria-hidden="true">01 —</span> Data Analyst & AI/ML Engineer
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-[17px] leading-relaxed text-slate-400 max-w-xl">
              Specializing in extracting actionable business intelligence, building scalable
              machine learning predictive systems, architecting end-to-end data pipelines,
              and delivering interactive analytics dashboards.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap items-center gap-3 pt-4 w-full">
              <Link 
                href="/projects" 
                className="h-[48px] flex items-center justify-center gap-2 px-5 rounded-[14px] text-[14px] font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 border border-white/20 shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.4)] transition-all hover:-translate-y-px flex-1 sm:flex-none whitespace-nowrap"
              >
                <BriefcaseBusiness className="w-4 h-4 shrink-0" />
                Explore My Work
              </Link>
              <a 
                href="/uploads/files/Muhammad_Abdullah_CV.pdf" 
                target="_blank" 
                className="h-[48px] flex items-center justify-center gap-2 px-5 rounded-[14px] text-[14px] font-semibold text-slate-200 border border-slate-600 bg-[#070A12]/80 hover:bg-white/10 hover:border-slate-400 transition-all flex-1 sm:flex-none whitespace-nowrap"
              >
                <Download className="w-4 h-4 shrink-0" />
                Download CV
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 relative group perspective-1000">
          <FadeIn delay={0.4} className="relative w-full max-w-[460px] mx-auto transition-transform duration-700 group-hover:rotate-y-2 group-hover:rotate-x-2">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 blur-xl rounded-[3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[3/4] bg-slate-900 border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] z-10 group-hover:border-indigo-500/30 transition-colors duration-700">
              <Image
                src="/images/profile/portfolio-profile.jpg"
                alt="Muhammad Abdullah"
                fill
                className="object-[center_top] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/80 via-transparent to-white/10 mix-blend-overlay" />
            </div>
            {/* Floating Tech Labels */}
            <div className="absolute top-1/4 -left-8 px-4 py-2 bg-[#0A0D18]/80 backdrop-blur-md border border-white/10 rounded-xl text-cyan-400 text-sm font-bold shadow-xl translate-y-0 animate-[bounce_4s_infinite] z-20">Python</div>
            <div className="absolute bottom-1/3 -right-6 px-4 py-2 bg-[#0A0D18]/80 backdrop-blur-md border border-white/10 rounded-xl text-indigo-400 text-sm font-bold shadow-xl translate-y-0 animate-[bounce_5s_infinite_0.5s] z-20">AI / ML</div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
