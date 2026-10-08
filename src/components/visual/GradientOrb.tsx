import React from 'react';

interface GradientOrbProps {
  color?: 'indigo' | 'cyan' | 'purple';
  size?: 'md' | 'lg' | 'xl';
  className?: string;
}

export function GradientOrb({ color = 'indigo', size = 'lg', className = '' }: GradientOrbProps) {
  const colorMap = {
    indigo: 'bg-indigo-500/20',
    cyan: 'bg-cyan-500/20',
    purple: 'bg-purple-500/20',
  };

  const sizeMap = {
    md: 'w-[300px] h-[300px] blur-[80px]',
    lg: 'w-[600px] h-[600px] blur-[120px]',
    xl: 'w-[800px] h-[800px] blur-[160px]',
  };

  return (
    <div 
      className={`absolute rounded-full pointer-events-none mix-blend-screen ${colorMap[color]} ${sizeMap[size]} ${className}`}
      aria-hidden="true"
    />
  );
}
