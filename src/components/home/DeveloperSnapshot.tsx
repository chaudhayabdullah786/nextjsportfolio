"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, Code2, Award, FileText, Database, Network } from 'lucide-react';
import { SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiPython, SiPhp, SiBootstrap, SiFlask, SiMysql } from 'react-icons/si';
import { FadeIn } from '../shared/FadeIn';

// ─── Stat Item ────────────────────────────────────────────────────────────────

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  accent: string;
}

function StatItem({ icon, value, label, accent }: StatItemProps) {
  return (
    <div className="flex flex-col items-center group">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${accent} transition-shadow duration-300`}
      >
        {icon}
      </div>
      <span className="text-[52px] lg:text-[60px] font-extrabold text-white leading-none tracking-tight">
        {value}
      </span>
      <span className="mt-3 text-[13px] font-bold tracking-[0.18em] uppercase text-slate-500">
        {label}
      </span>
    </div>
  );
}

// ─── Technology Normalization & Icons ─────────────────────────────────────────

function normalizeTechInfo(rawName: string) {
  const n = rawName.toLowerCase().replace(/[.\s-]/g, '');
  
  if (n.includes('python')) return { name: 'Python', icon: SiPython, color: 'text-[#3776AB]' };
  if (n.includes('typescript') || n === 'ts') return { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' };
  if (n.includes('javascript') || n === 'js') return { name: 'JavaScript', icon: SiJavascript, color: 'text-[#F7DF1E]' };
  if (n.includes('react')) return { name: 'React', icon: SiReact, color: 'text-[#61DAFB]' };
  if (n.includes('next')) return { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' };
  if (n.includes('html')) return { name: 'HTML5', icon: SiHtml5, color: 'text-[#E34F26]' };
  if (n.includes('css') && !n.includes('bootstrap')) return { name: 'CSS3', icon: SiCss, color: 'text-[#1572B6]' };
  if (n.includes('php')) return { name: 'PHP', icon: SiPhp, color: 'text-[#777BB4]' };
  if (n.includes('flask')) return { name: 'Flask', icon: SiFlask, color: 'text-white' };
  if (n.includes('bootstrap')) return { name: 'Bootstrap', icon: SiBootstrap, color: 'text-[#7952B3]' };
  if (n.includes('mysql')) return { name: 'MySQL', icon: SiMysql, color: 'text-[#4479A1]' };
  if (n.includes('sql')) return { name: 'SQL', icon: Database, color: 'text-slate-300' };
  if (n.includes('restapi') || n.includes('api')) return { name: 'REST API', icon: Network, color: 'text-emerald-400' };
  
  return { name: rawName, icon: Code2, color: 'text-slate-400' };
}

// ─── Core Stack Marquee ───────────────────────────────────────────────────────

interface TechItem {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface CoreStackMarqueeProps {
  technologies: TechItem[];
}

function CoreStackMarquee({ technologies }: CoreStackMarqueeProps) {
  return (
    <div className="relative w-full overflow-hidden select-none group" aria-label="Core technology stack">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0A0D18] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0A0D18] to-transparent pointer-events-none" />

      <motion.div
        className="flex gap-[11px] w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
        style={{ willChange: 'transform' }}
      >
        {technologies.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={`tech1-${i}`}
              className="flex items-center gap-[11px] px-[16px] rounded-[14px] bg-[#0D1121] border border-white/5 hover:border-indigo-500/30 hover:shadow-[0_0_16px_rgba(99,102,241,0.15)] transition-all duration-300 cursor-default whitespace-nowrap h-[52px]"
            >
              <div className="w-[32px] h-[32px] rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Icon className={`w-[24px] h-[24px] ${tech.color}`} aria-hidden="true" />
              </div>
              <span className="text-[15px] font-semibold text-slate-200">{tech.name}</span>
            </div>
          );
        })}
        {technologies.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={`tech2-${i}`}
              aria-hidden="true"
              className="flex items-center gap-[11px] px-[16px] rounded-[14px] bg-[#0D1121] border border-white/5 hover:border-indigo-500/30 hover:shadow-[0_0_16px_rgba(99,102,241,0.15)] transition-all duration-300 cursor-default whitespace-nowrap h-[52px]"
            >
              <div className="w-[32px] h-[32px] rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Icon className={`w-[24px] h-[24px] ${tech.color}`} aria-hidden="true" />
              </div>
              <span className="text-[15px] font-semibold text-slate-200">{tech.name}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Main DeveloperSnapshot ───────────────────────────────────────────────────

interface DeveloperSnapshotProps {
  projectCount: number;
  skillCount: number;
  certCount: number;
  blogCount: number;
  skills: Array<{ id: number; name: string }>;
  settings: Record<string, string>;
}

export function DeveloperSnapshot({
  projectCount,
  skillCount,
  certCount,
  blogCount,
  skills,
}: DeveloperSnapshotProps) {
  // Deduplicate + normalize skills for marquee
  const seen = new Set<string>();
  const uniqueTechs: TechItem[] = [];
  for (const s of skills) {
    const tech = normalizeTechInfo(s.name);
    if (!seen.has(tech.name)) {
      seen.add(tech.name);
      uniqueTechs.push(tech);
    }
  }

  const stats = [
    { icon: <FolderKanban className="w-5 h-5 text-indigo-400" />, value: `${projectCount}+`, label: 'Projects', accent: 'bg-indigo-500/10 shadow-[0_0_12px_rgba(99,102,241,0.2)]' },
    { icon: <Code2 className="w-5 h-5 text-cyan-400" />, value: `${skillCount}+`, label: 'Skills', accent: 'bg-cyan-500/10 shadow-[0_0_12px_rgba(6,182,212,0.2)]' },
    { icon: <Award className="w-5 h-5 text-purple-400" />, value: `${certCount}+`, label: 'Certifications', accent: 'bg-purple-500/10 shadow-[0_0_12px_rgba(168,85,247,0.2)]' },
    { icon: <FileText className="w-5 h-5 text-emerald-400" />, value: String(blogCount), label: 'Articles', accent: 'bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.2)]' },
  ];

  return (
    <section className="py-[80px] bg-[#0A0D18] relative isolate overflow-hidden border-y border-white/5">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-indigo-500/[0.06] blur-[80px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[1280px] mx-auto px-8 lg:px-12 relative z-10">
        {/* ── STATS ─────────────────────────────────────────────────── */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/5">
            {stats.map((s) => (
              <StatItem key={s.label} icon={s.icon} value={s.value} label={s.label} accent={s.accent} />
            ))}
          </div>
        </FadeIn>

        {/* ── CORE STACK ────────────────────────────────────────────── */}
        {uniqueTechs.length > 0 && (
          <FadeIn>
            {/* Using <div> instead of <section> to avoid globals.css
                `section { padding-block: var(--section-padding) !important; }`
                which was crushing the marquee layout */}
            <div role="region" aria-labelledby="core-stack-heading" className="mt-8 space-y-3">
              <p className="text-[12px] font-bold tracking-[0.25em] uppercase text-slate-500 text-center" aria-hidden="true">
                Core Stack
              </p>
              <h2 id="core-stack-heading" className="sr-only">Technologies I Work With</h2>
              <CoreStackMarquee technologies={uniqueTechs} />
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
