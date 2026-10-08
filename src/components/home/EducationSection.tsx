import React from 'react';
import { FadeIn } from '../shared/FadeIn';
import { GraduationCap, BookOpen, School } from 'lucide-react';

export function EducationSection() {
  return (
    <section id="education" className="py-[120px] lg:py-[150px] bg-[#0A0D18] border-t border-white/5 relative isolate overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[400px] h-[600px] bg-cyan-500/10 blur-[120px] pointer-events-none z-0" aria-hidden="true" />
      
      <div className="max-w-[1280px] w-full mx-auto px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <FadeIn>
              <span className="text-[13px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4 block" aria-hidden="true">05 — Education</span>
              <h2 className="text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1] mb-6">Academic<br/>Journey</h2>
              <p className="text-[17px] text-slate-300 leading-relaxed max-w-[400px]">
                A foundation in science, analytical thinking, and data-driven problem solving.
              </p>
            </FadeIn>
          </div>
          
          <div className="lg:col-span-7 relative">
            {/* Timeline axis */}
            <div className="absolute top-4 bottom-4 left-4 lg:left-8 w-[2px] bg-gradient-to-b from-cyan-500/50 via-indigo-500/50 to-transparent" aria-hidden="true" />
            
            <div className="space-y-12">
              <FadeIn delay={0.1}>
                <div className="relative pl-12 lg:pl-20 group">
                  {/* Node */}
                  <div className="absolute top-[10px] left-[11px] lg:left-[27px] w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10" aria-hidden="true">
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                  </div>
                  
                  <div className="mb-3 flex flex-wrap items-center gap-4">
                    <span className="text-[24px] font-black text-white/30 group-hover:text-white/60 transition-colors tracking-tighter">2023 — 2027</span>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-bold tracking-widest uppercase">IN PROGRESS</span>
                  </div>
                  <h3 className="text-[22px] lg:text-[26px] font-bold text-white mb-2 flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-cyan-400 shrink-0" aria-hidden="true" />
                    Bachelor of Science in Data Science
                  </h3>
                  <p className="text-[17px] font-semibold text-indigo-300">GIFT University</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="relative pl-12 lg:pl-20 group">
                  {/* Node */}
                  <div className="absolute top-[10px] left-[11px] lg:left-[27px] w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10" aria-hidden="true" />
                  
                  <div className="mb-3">
                    <span className="text-[24px] font-black text-white/30 group-hover:text-white/60 transition-colors tracking-tighter">2019 — 2021</span>
                  </div>
                  <h3 className="text-[22px] lg:text-[26px] font-bold text-white mb-2 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-indigo-400 shrink-0" aria-hidden="true" />
                    F.Sc. (Pre-Medical)
                  </h3>
                  <p className="text-[17px] font-semibold text-indigo-300">Punjab College</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="relative pl-12 lg:pl-20 group">
                  {/* Node */}
                  <div className="absolute top-[10px] left-[11px] lg:left-[27px] w-3 h-3 rounded-full bg-slate-500 shadow-[0_0_15px_rgba(100,116,139,0.5)] z-10" aria-hidden="true" />
                  
                  <div className="mb-3">
                    <span className="text-[24px] font-black text-white/30 group-hover:text-white/60 transition-colors tracking-tighter">2017 — 2019</span>
                  </div>
                  <h3 className="text-[22px] lg:text-[26px] font-bold text-white mb-2 flex items-center gap-3">
                    <School className="w-6 h-6 text-slate-400 shrink-0" aria-hidden="true" />
                    Matriculation
                  </h3>
                  <p className="text-[17px] font-semibold text-indigo-300">Jadeed Dastagir Ideal High School</p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
