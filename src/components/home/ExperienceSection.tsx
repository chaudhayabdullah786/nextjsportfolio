import React from 'react';
import { Experience } from '@prisma/client';
import { FadeIn } from '../shared/FadeIn';

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  if (experience.length === 0) return null;

  return (
    <section className="py-[120px] lg:py-[150px] bg-[#070A12] border-t border-white/5 relative isolate overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[600px] bg-indigo-500/10 blur-[120px] pointer-events-none z-0" />
      
      <div className="max-w-[1280px] w-full mx-auto px-8 lg:px-12 relative z-10">
        <FadeIn className="mb-20 text-center max-w-2xl mx-auto">
          <span className="text-[13px] font-bold tracking-[0.2em] text-indigo-400 uppercase mb-4 block" aria-hidden="true">04 — Background</span>
          <h2 className="text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1]">Professional<br/>Experience</h2>
        </FadeIn>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Main timeline axis */}
          <div className="absolute top-0 bottom-0 left-0 lg:left-[120px] w-[2px] bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0" />

          <div className="space-y-16">
            {experience.map((exp, i) => (
              <FadeIn key={exp.id} delay={i * 0.1}>
                <div className="relative pl-8 lg:pl-[180px] group">
                  {/* Glowing Node */}
                  <div className="absolute top-2 left-[-5px] lg:left-[115px] w-[12px] h-[12px] rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] z-10">
                     <div className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-75" />
                  </div>
                  
                  {/* Timeline connector line (desktop) */}
                  <div className="hidden lg:block absolute top-3 left-[127px] w-[33px] h-[1px] bg-gradient-to-r from-indigo-500/50 to-transparent" />

                  {/* Year marker */}
                  <div className="hidden lg:block absolute top-0 left-0 w-[90px] text-right">
                    <span className="text-[28px] font-black text-white/30 group-hover:text-white/60 transition-colors tracking-tighter">
                      {new Date(exp.startDate).getFullYear()}
                    </span>
                  </div>

                  <div className="bg-[#0A0D18]/80 backdrop-blur-md border border-white/5 rounded-[24px] p-8 lg:p-10 shadow-lg group-hover:border-indigo-500/30 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    
                    <div className="lg:hidden text-[20px] font-black text-indigo-400/70 mb-2">
                      {new Date(exp.startDate).getFullYear()}
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-[24px] font-bold text-white mb-2">{exp.jobTitle}</h3>
                        <p className="text-[16px] font-semibold text-indigo-300">{exp.company}</p>
                      </div>
                      <span className="text-[14px] font-medium text-slate-500 bg-[#070A12] px-4 py-2 rounded-full border border-white/5 whitespace-nowrap">
                        {new Date(exp.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} - 
                        {exp.isCurrent ? ' Present' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}` : ''}
                      </span>
                    </div>
                    
                    {exp.description && (
                      <div className="text-[15px] text-slate-300 leading-[1.8] space-y-4 max-w-2xl">
                        {exp.description.split('\n').map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
