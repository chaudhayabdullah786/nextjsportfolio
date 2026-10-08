import React from 'react';
import Link from 'next/link';
import { Certificate } from '@prisma/client';
import { FadeIn } from '../shared/FadeIn';

export function CredentialsSection({ certs }: { certs: Certificate[] }) {
  if (certs.length === 0) return null;
  const displayCerts = certs.slice(0, 3);

  return (
    <section className="py-[120px] lg:py-[150px] bg-[#0A0D18] relative isolate overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full z-0 pointer-events-none" />
      
      <div className="max-w-[1280px] w-full mx-auto px-8 lg:px-12 relative z-10">
        <FadeIn className="text-center mb-16">
          <span className="text-[13px] font-bold tracking-[0.2em] text-indigo-400 uppercase mb-4 block" aria-hidden="true">07 — Credentials</span>
          <h2 className="text-[48px] font-extrabold text-white leading-[1.1]">Verified Achievements</h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {displayCerts.map((cert, i) => (
             <FadeIn key={cert.id} delay={i * 0.1} className="h-full">
               <div className="bg-[#070A12] border border-white/10 rounded-[24px] overflow-hidden min-h-[380px] flex flex-col group hover:border-indigo-500/40 transition-colors shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                 <div className="aspect-[4/3] bg-slate-900 w-full relative overflow-hidden border-b border-white/5 p-4 flex items-center justify-center bg-gradient-to-br from-slate-800 to-[#0A0D18]">
                   {cert.imagePath ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cert.imagePath} alt={cert.platform} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700 shadow-xl" />
                   ) : (
                      <div className="w-24 h-24 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                         <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                      </div>
                   )}
                 </div>
                 <div className="p-8 flex flex-col flex-grow">
                   <h3 className="text-[20px] font-bold text-white mb-2 leading-snug group-hover:text-indigo-400 transition-colors">{cert.title}</h3>
                   <p className="text-[15px] font-semibold text-slate-300 mb-2">{cert.platform}</p>
                   <p className="text-[13px] text-slate-500 mb-6 font-mono">{new Date(cert.issueDate).toLocaleDateString()}</p>
                   {cert.credentialUrl && (
                     <a href={cert.credentialUrl} target="_blank" className="mt-auto inline-flex items-center gap-2 text-[14px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
                       View Credential <span>→</span>
                     </a>
                   )}
                 </div>
               </div>
             </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center">
           <Link href="/certificates" className="text-[15px] font-semibold text-slate-400 hover:text-white transition-colors">
             View All {certs.length} Certificates →
           </Link>
        </FadeIn>
      </div>
    </section>
  );
}
