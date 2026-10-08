import React from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SpotlightCard({ children, className = '', ...props }: SpotlightCardProps) {
  return (
    <div className={`card-base relative group ${className}`} {...props}>
      {/* Spotlight effect placeholder - simplified for performance */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-[-100%] bg-[radial-gradient(circle_at_center,_var(--color-accent-glow)_0%,_transparent_50%)] animate-pulse" style={{ animationDuration: '4s' }} />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
