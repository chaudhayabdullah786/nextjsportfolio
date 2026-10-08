import React from 'react';
import { FadeIn } from '../shared/FadeIn';

export function AboutEditorial() {
  return (
    <section className="py-[120px] lg:py-[160px] border-b border-white/5 bg-[#070A12] relative isolate overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[180px] lg:text-[240px] font-black text-white/[0.008] leading-[0.8] tracking-tighter pointer-events-none z-0 whitespace-nowrap select-none" aria-hidden="true">
        DATA<br/>BUILD<br/>INTELLIGENCE
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 relative z-10">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <FadeIn>
            <span className="text-[13px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4 block" aria-hidden="true">01 — About</span>
            <h2 className="text-[40px] lg:text-[48px] font-extrabold leading-[1.05] tracking-tight text-white mb-8">
              Turning data into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-lg">
                intelligent experiences.
              </span>
            </h2>
            
            <div className="text-[17px] leading-[1.75] text-slate-300 space-y-6 max-w-[600px]">
              <p>
                As a Data Analyst and AI/ML Engineer, I specialize in bridging the gap between raw data and strategic business value. I design and implement predictive models, deploy scalable AI architectures, and craft interactive analytics dashboards that drive decision-making.
              </p>
              <div className="pt-6">
                <a href="/about" className="inline-flex items-center gap-2 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                  More About Me <span>→</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 relative">
          {/* Subtle connecting line */}
          <div className="absolute top-8 bottom-8 left-[23px] w-px bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent z-0" />
          
          <div className="flex flex-col gap-12 relative z-10">
            <FadeIn delay={0.1}>
              <div className="flex items-start gap-8 group">
                <div className="w-12 h-12 rounded-full bg-[#0A0D18] border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-shadow">
                  <span className="text-[14px] font-bold text-indigo-400 font-mono">01</span>
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-white mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">Data-Driven Focus</h3>
                  <p className="text-[15px] text-slate-400 leading-relaxed">
                    Transforming complex datasets into clear, actionable insights through advanced statistical analysis and visualization.
                  </p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="flex items-start gap-8 group">
                <div className="w-12 h-12 rounded-full bg-[#0A0D18] border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-shadow">
                  <span className="text-[14px] font-bold text-cyan-400 font-mono">02</span>
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">Full-Stack Capability</h3>
                  <p className="text-[15px] text-slate-400 leading-relaxed">
                    Architecting end-to-end solutions, from secure backend APIs to responsive, data-rich frontend applications.
                  </p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="flex items-start gap-8 group">
                <div className="w-12 h-12 rounded-full bg-[#0A0D18] border border-purple-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-shadow">
                  <span className="text-[14px] font-bold text-purple-400 font-mono">03</span>
                </div>
                <div>
                  <h3 className="text-[24px] font-bold text-white mb-3 tracking-tight group-hover:text-purple-400 transition-colors">Intelligent Solutions</h3>
                  <p className="text-[15px] text-slate-400 leading-relaxed">
                    Deploying state-of-the-art machine learning models that automate workflows and predict trends.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

      </div>
    </section>
  );
}
