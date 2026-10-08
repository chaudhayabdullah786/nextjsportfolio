"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className={`pointer-events-auto w-full max-w-[1240px] h-[64px] rounded-[20px] transition-all duration-300 flex items-center justify-between px-6 lg:px-8 border border-white/10 ${
        scrolled ? 'bg-[#0A0D18]/80 backdrop-blur-lg shadow-2xl' : 'bg-[#0A0D18]/40 backdrop-blur-md shadow-lg'
      }`}>
        <Link href="/" className="text-[20px] font-bold text-white tracking-tight hover:text-indigo-400 transition-colors">
          Abdullah.
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors relative group">
            Home
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/about" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors relative group">
            About
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/skills" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors relative group">
            Expertise
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/projects" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors relative group">
            Work
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/experience" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors relative group">
            Experience
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/#education" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors relative group">
            Education
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/blog" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors relative group">
            Writing
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/contact" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors relative group">
            Contact
            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>

        <a 
          href="/uploads/files/Muhammad_Abdullah_CV.pdf" 
          target="_blank" 
          className="h-[44px] px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-[14px] flex items-center justify-center transition-colors"
        >
          Resume
        </a>
      </nav>
    </div>
  );
}
