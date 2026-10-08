import React from 'react';

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  eyebrow?: string;
}

export function SectionHeading({ title, subtitle, eyebrow, alignment = 'center', className = '', ...props }: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${alignment === 'center' ? 'text-center flex flex-col items-center' : 'text-left'} ${className}`}
      {...props}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="heading-2 mb-4 text-white">{title}</h2>
      {subtitle && (
        <p className="text-[var(--fg-muted)] text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`h-[2px] w-16 bg-gradient-to-r from-[var(--accent)] to-transparent mt-6 rounded-full ${alignment === 'center' ? 'mx-auto' : ''}`}
      />
    </div>
  );
}
