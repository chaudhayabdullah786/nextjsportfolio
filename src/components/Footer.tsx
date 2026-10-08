import React from 'react';
import Link from 'next/link';

export function Footer({ settings = {} }: { settings?: Record<string, string> }) {
  const github = settings['github_url'];
  const linkedin = settings['linkedin_url'];

  return (
    <footer className="bg-[#04060A] pt-[80px] pb-12 relative isolate overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      {/* Ambient footer glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-[100%]" />

      <div className="max-w-[1280px] mx-auto px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <div className="md:col-span-5">
            <Link href="/" className="text-[24px] font-bold text-white tracking-tight hover:text-indigo-400 transition-colors">
              Abdullah.
            </Link>
            <p className="mt-6 text-[15px] text-slate-400 max-w-[300px] leading-relaxed">
              Transforming complex data into intelligent, scalable, and beautifully engineered experiences.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/projects" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Selected Work</Link></li>
              <li><Link href="/blog" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Writing</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-6">Professional</h4>
            <ul className="space-y-4">
              <li><Link href="/experience" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Experience</Link></li>
              <li><Link href="/skills" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Expertise</Link></li>
              <li><Link href="/certificates" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Certifications</Link></li>
              <li><a href="/uploads/files/Muhammad_Abdullah_CV.pdf" target="_blank" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Resume (PDF)</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">Contact</Link></li>
              {github && (
                <li><a href={github} target="_blank" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">GitHub</a></li>
              )}
              {linkedin && (
                <li><a href={linkedin} target="_blank" className="text-[14px] font-medium text-slate-300 hover:text-white transition-colors">LinkedIn</a></li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5">
          <p className="text-[13px] text-slate-500">
            &copy; {new Date().getFullYear()} Muhammad Abdullah. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/admin/login" className="text-[12px] font-bold tracking-widest uppercase text-slate-600 hover:text-slate-400 transition-colors">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
