import React from 'react';
import { Award, ExternalLink, FileCheck, CheckCircle } from 'lucide-react';
import { Certificate } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
}) => {
  return (
    <section id="certificates" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <FadeIn delay={0.05} y={-10}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20 text-xs font-semibold uppercase tracking-wider text-[#A855F7]">
            Academic &amp; Industry Verification
          </div>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            9 Professional Certifications
          </h2>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Rigorous programs completed across Deep Learning, Machine Learning Specializations,
            Google Analytics, and Microsoft Power BI.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, idx) => (
          <FadeIn key={cert.id} delay={0.1 + (idx % 3) * 0.1} y={20} className="h-full">
            <div className="h-full rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 hover:border-[#A855F7]/40 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group">
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#101626] mb-4 border border-[#94A3B8]/15">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    {cert.hasPdf && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#6366F1]/90 text-white backdrop-blur-md">
                        PDF
                      </span>
                    )}
                    {cert.hasImage && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#22C55E]/90 text-white backdrop-blur-md">
                        VERIFIED
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 rounded bg-[#A855F7]/15 text-[#A855F7]">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[#22D3EE]">
                    {cert.platform}
                  </span>
                  <span className="text-xs text-[#7C879B] font-mono ml-auto">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#F8FAFC] group-hover:text-[#A855F7] transition-colors leading-snug">
                  {cert.title}
                </h3>

                {cert.credentialId && (
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-[#7C879B]">
                    <FileCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>ID: {cert.credentialId}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#94A3B8]/10 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-[#22C55E]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Credential</span>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#CBD5E1] hover:text-[#22D3EE] transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default CertificatesSection;
