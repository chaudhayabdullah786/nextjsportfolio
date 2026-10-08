import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error';
}

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-[rgba(255,255,255,0.05)] text-[var(--fg-muted)] border-[var(--border-color)]',
    accent: 'bg-[var(--accent-glow)] text-white border-[var(--accent)]',
    success: 'bg-[rgba(34,197,94,0.1)] text-green-400 border-green-500/30',
    warning: 'bg-[rgba(245,158,11,0.1)] text-yellow-400 border-yellow-500/30',
    error: 'bg-[rgba(239,68,68,0.1)] text-red-400 border-red-500/30',
  };

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
