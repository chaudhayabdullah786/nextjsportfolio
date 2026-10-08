import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <div className={`glass-panel rounded-2xl overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}
