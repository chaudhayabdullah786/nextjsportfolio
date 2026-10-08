import React from 'react';
import { prisma } from '@/lib/db/prisma';

export async function MetricsStrip() {
  const [projectCount, skillCount, certCount, blogCount] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.certificate.count(),
    prisma.blogPost.count({ where: { isPublished: true } })
  ]);

  const metrics = [
    { label: 'Projects Completed', value: projectCount, accent: 'var(--accent)' },
    { label: 'Technical Skills', value: skillCount, accent: 'var(--accent-secondary)' },
    { label: 'Certifications', value: certCount, accent: 'var(--success)' },
    { label: 'Published Articles', value: blogCount, accent: 'var(--accent-purple)' }
  ];

  return (
    <div className="w-full mt-4 mb-24 lg:mt-8 lg:mb-32 px-6 md:px-12 relative z-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl flex flex-col items-start relative overflow-hidden group border border-[var(--border-color)] hover:border-[var(--border-strong)] transition-all duration-300"
            >
              {/* Subtle top accent bar */}
              <div 
                className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity duration-300" 
                style={{ backgroundColor: metric.accent }} 
              />
              
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: metric.accent }} />
                <span className="text-sm font-semibold text-[var(--fg-muted)] tracking-wide uppercase">
                  {metric.label}
                </span>
              </div>
              
              <div className="text-[3rem] lg:text-[3.5rem] font-bold tracking-tight text-white leading-none mt-2">
                {metric.value}
                <span className="text-[2rem] text-[var(--fg-muted)] font-normal ml-1">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
