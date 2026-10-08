import React from 'react';

export function GridPlane({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent)] ${className}`} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-[0.15] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-plane" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-plane)" />
      </svg>
    </div>
  );
}
