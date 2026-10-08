import React from 'react';
import type { Experience } from '@prisma/client';

interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative pl-8 md:pl-0">
      {/* Timeline rail (desktop and mobile) */}
      <div className="md:hidden absolute left-[11px] top-2 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border-color)] to-transparent" />
      
      <div className="md:grid md:grid-cols-5 md:gap-8 xl:gap-12 relative group">
        
        {/* Desktop timeline rail & marker */}
        <div className="hidden md:block absolute left-[19.5%] top-2 bottom-0 w-px bg-gradient-to-b from-[var(--border-color)] via-[var(--border-color)] to-transparent group-hover:from-[var(--accent)] transition-colors duration-500" />
        
        <div className="hidden md:block absolute left-[19.5%] top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--accent)] z-10 group-hover:shadow-[0_0_10px_var(--accent)] transition-all duration-300" />
        
        {/* Mobile marker */}
        <div className="md:hidden absolute left-[11px] top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--accent)] z-10" />

        {/* Date column (Desktop) */}
        <div className="hidden md:block col-span-1 text-right pt-1">
          <div className="text-sm font-semibold text-[var(--fg-muted)] uppercase tracking-wider group-hover:text-white transition-colors duration-300">
            {formatDate(experience.startDate)}
            {' - '}
            {experience.isCurrent || !experience.endDate ? 'Present' : formatDate(experience.endDate)}
          </div>
        </div>

        {/* Content column */}
        <div className="md:col-span-4 pb-12">
          {/* Mobile Date */}
          <div className="md:hidden text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
            {formatDate(experience.startDate)}
            {' - '}
            {experience.isCurrent || !experience.endDate ? 'Present' : formatDate(experience.endDate)}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-1">{experience.jobTitle}</h3>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
            <span className="text-[var(--accent-bright)] font-medium">{experience.company}</span>
            {experience.location && (
              <span className="flex items-center text-sm text-[var(--fg-muted)]">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {experience.location}
              </span>
            )}
          </div>
          
          {experience.description && (
            <div className="prose prose-invert prose-sm md:prose-base max-w-none text-[var(--fg-muted)] whitespace-pre-wrap leading-relaxed group-hover:text-[var(--fg-base)] transition-colors duration-300">
              {experience.description}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
