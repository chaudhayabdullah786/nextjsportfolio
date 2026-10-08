import React from 'react';
import { FadeIn } from '../shared/FadeIn';

interface StatsBandProps {
  projectCount: number;
  skillCount: number;
  certCount: number;
  blogCount: number;
}

export function StatsBand({ projectCount, skillCount, certCount, blogCount }: StatsBandProps) {
  return (
    <section className="py-24 bg-[#0A0D18] border-y border-white/5">
      <div className="max-w-[1280px] mx-auto px-8">
        <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-white mb-2">{projectCount}+</span>
            <span className="text-sm tracking-widest uppercase text-slate-400">Projects</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-white mb-2">{skillCount}+</span>
            <span className="text-sm tracking-widest uppercase text-slate-400">Skills</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-white mb-2">{certCount}+</span>
            <span className="text-sm tracking-widest uppercase text-slate-400">Certifications</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold text-white mb-2">{blogCount}</span>
            <span className="text-sm tracking-widest uppercase text-slate-400">Articles</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
