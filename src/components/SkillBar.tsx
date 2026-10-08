import React from 'react';
import type { Skill } from '@prisma/client';

interface SkillBarProps {
  skill: Skill;
}

export function SkillBar({ skill }: SkillBarProps) {
  // We'll map the 1-100 proficiency to a nice gradient progress bar
  const proficiency = skill.level || 50;

  return (
    <div className="mb-6 group">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[var(--fg-base)] font-medium group-hover:text-white transition-colors tracking-wide">
          {skill.name}
        </span>
        <span className="text-[var(--fg-muted)] text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
          {proficiency}%
        </span>
      </div>
      
      <div className="h-1.5 w-full bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden relative border border-[rgba(255,255,255,0.02)]">
        {/* Glow effect that follows the bar */}
        <div 
          className="absolute top-0 bottom-0 left-0 bg-[var(--accent-glow)] opacity-50 blur-[4px] transition-all duration-1000 ease-out"
          style={{ width: `${proficiency}%` }}
        />
        
        {/* Actual progress bar */}
        <div 
          className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-bright)] transition-all duration-1000 ease-out relative z-10 rounded-full"
          style={{ width: `${proficiency}%` }}
        >
          {/* Highlight pip at the end of the progress bar */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[1px] rounded-full" />
        </div>
      </div>
    </div>
  );
}
