"use client";

import React from "react";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[var(--bg-deep)]">
      {/* 1. Deep navy/black base with subtle radial transition */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--bg-elevated)] via-[var(--bg-base)] to-[var(--bg-deep)] opacity-80" />

      {/* 2. Extremely subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 3. Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* 4. Large blurred indigo radial glow near hero */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--accent)] opacity-10 blur-[140px] animate-pulse" 
           style={{ animationDuration: '10s' }} />

      {/* 5. Cyan secondary glow (hero right) */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent-secondary)] opacity-[0.05] blur-[120px] animate-pulse" 
           style={{ animationDuration: '12s', animationDelay: '2s' }} />

      {/* 6. Subtle blue radial transition for middle sections */}
      <div className="absolute top-[40%] left-[20%] w-[60%] h-[50%] rounded-full bg-[#1E3A8A] opacity-[0.04] blur-[160px] animate-pulse" 
           style={{ animationDuration: '14s', animationDelay: '4s' }} />

      {/* 7. Stronger indigo/purple for CTA */}
      <div className="absolute bottom-[-15%] right-[10%] w-[70%] h-[60%] rounded-full bg-[var(--accent-purple)] opacity-[0.06] blur-[150px] animate-pulse" 
           style={{ animationDuration: '16s', animationDelay: '1s' }} />
    </div>
  );
}
