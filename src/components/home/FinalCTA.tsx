import React from 'react';
import Link from 'next/link';
import { FadeIn } from '../shared/FadeIn';
import { GradientOrb } from '../visual/GradientOrb';
import { GridPlane } from '../visual/GridPlane';

export function FinalCTA() {
  return (
    <section className="px-4 sm:px-8 pb-32 pt-[100px] bg-[#070A12] relative isolate overflow-hidden">
      <div className="max-w-[1280px] w-full mx-auto relative z-10">
        <FadeIn className="bg-[#0A0D18] border border-white/10 rounded-[40px] px-8 py-[80px] lg:py-[100px] text-center relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <GridPlane className="text-indigo-400 opacity-30" />
          <GradientOrb color="indigo" size="xl" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70 z-0" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
          
          <svg className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] text-white/[0.02] pointer-events-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="45" strokeDasharray="2 4" />
          </svg>

          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-[12px] font-bold text-indigo-300 tracking-widest uppercase mb-8">
              Available for New Projects
            </span>
            <h2 className="text-[40px] lg:text-[56px] font-extrabold text-white leading-[1.05] tracking-tight mb-8 drop-shadow-xl">
              Let&apos;s build something<br/>great together.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
               <Link href="/contact" className="min-w-[160px] min-h-[52px] flex items-center justify-center px-10 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors text-[15px] shadow-[0_10px_30px_rgba(99,102,241,0.4)]">
                 Say Hello
               </Link>
               <Link href="/projects" className="min-w-[160px] min-h-[52px] flex items-center justify-center px-10 rounded-xl font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-[15px] backdrop-blur-md">
                 View Projects
               </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
