import React from 'react';
import { FadeIn } from '../shared/FadeIn';
import { SiGithub, SiKaggle, SiWhatsapp } from 'react-icons/si';
import { Mail } from 'lucide-react';

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function HuggingFaceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" className={className}>
      <path d="M37.6 75.7c-1.5.8-1.5 3.4 0 4.2 5.5 3 12.2 4.7 19.4 4.7s13.9-1.7 19.4-4.7c1.5-.8 1.5-3.4 0-4.2-5.5-3-12.2-4.7-19.4-4.7s-13.9 1.7-19.4 4.7z" />
      <path d="M60 0C26.9 0 0 26.9 0 60s26.9 60 60 60 60-26.9 60-60S93.1 0 60 0zm0 110c-27.6 0-50-22.4-50-50S32.4 10 60 10s50 22.4 50 50-22.4 50-50 50z" />
      <circle cx="42" cy="52" r="8" />
      <circle cx="78" cy="52" r="8" />
    </svg>
  );
}

/** Extract a short handle/domain from a URL */
function extractHandle(url: string): string {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`);
    const segments = u.pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] || u.hostname;
  } catch {
    return url;
  }
}

interface ProfileDef {
  key: string;
  label: string;
  ariaLabel: string;
  url: string;
  sub: string;
  icon: React.ReactNode;
}

export function ConnectSection({ settings }: { settings: Record<string, string> }) {
  // Build profiles in exact required order: GitHub, LinkedIn, Kaggle, HF, WhatsApp, Email
  const profiles: ProfileDef[] = [];

  if (settings['github_url']) {
    profiles.push({
      key: 'github',
      label: 'GitHub',
      ariaLabel: 'Visit Muhammad Abdullah on GitHub',
      url: settings['github_url'],
      sub: extractHandle(settings['github_url']),
      icon: <SiGithub className="w-7 h-7 text-white" aria-hidden="true" />,
    });
  }
  if (settings['linkedin_url']) {
    profiles.push({
      key: 'linkedin',
      label: 'LinkedIn',
      ariaLabel: 'Visit Muhammad Abdullah on LinkedIn',
      url: settings['linkedin_url'].startsWith('http') ? settings['linkedin_url'] : `https://${settings['linkedin_url']}`,
      sub: extractHandle(settings['linkedin_url']),
      icon: <LinkedInIcon className="w-7 h-7 text-[#0A66C2]" />,
    });
  }
  if (settings['kaggle_url']) {
    profiles.push({
      key: 'kaggle',
      label: 'Kaggle',
      ariaLabel: 'Visit Muhammad Abdullah on Kaggle',
      url: settings['kaggle_url'],
      sub: extractHandle(settings['kaggle_url']),
      icon: <SiKaggle className="w-7 h-7 text-[#20BEFF]" aria-hidden="true" />,
    });
  }

  const hfUrl = settings['huggingface_url'] || settings['hugging_face_url'] || settings['hf_url'];
  if (hfUrl) {
    profiles.push({
      key: 'huggingface',
      label: 'Hugging Face',
      ariaLabel: 'Visit Muhammad Abdullah on Hugging Face',
      url: hfUrl,
      sub: extractHandle(hfUrl),
      icon: <HuggingFaceIcon className="w-7 h-7 text-[#FFD21E]" />,
    });
  }

  if (settings['whatsapp']) {
    const waNum = settings['whatsapp'].replace(/\D/g, '');
    profiles.push({
      key: 'whatsapp',
      label: 'WhatsApp',
      ariaLabel: 'Contact Muhammad Abdullah on WhatsApp',
      url: `https://wa.me/${waNum}`,
      sub: settings['whatsapp'],
      icon: <SiWhatsapp className="w-7 h-7 text-[#25D366]" aria-hidden="true" />,
    });
  }

  const email = settings['contact_email'] || settings['email'];
  if (email) {
    profiles.push({
      key: 'email',
      label: 'Email',
      ariaLabel: 'Email Muhammad Abdullah',
      url: `mailto:${email}`,
      sub: email,
      icon: <Mail className="w-7 h-7 text-white" aria-hidden="true" />,
    });
  }

  return (
    <section className="py-[120px] lg:py-[150px] bg-[#070A12] border-t border-white/5 relative isolate overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent blur-[1px] pointer-events-none z-0" />

      <div className="max-w-[1280px] w-full mx-auto px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        <div className="lg:col-span-5">
          <FadeIn>
            <span className="text-[13px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-4 block" aria-hidden="true">07 — Connect</span>
            <h2 className="text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.1] mb-6">Let&apos;s connect.</h2>
            <p className="text-[17px] text-slate-400 leading-relaxed max-w-[450px]">
              Whether you&apos;re looking to solve complex data challenges, build an intelligent predictive model, or engineer a resilient full-stack platform, I&apos;m ready to help you succeed.
            </p>
          </FadeIn>
        </div>

        {/* Desktop: 2 columns × 3 rows. Mobile: 1 column */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profiles.map((p, i) => (
            <FadeIn key={p.key} delay={0.1 + i * 0.05}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.ariaLabel}
                className="flex items-center justify-between p-5 lg:p-6 h-[76px] rounded-[20px] bg-[#0A0D18] border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 group shadow-lg"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="shrink-0 w-[40px] h-[40px] rounded-xl bg-white/5 flex items-center justify-center">
                    {p.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[16px] font-bold text-white leading-tight truncate">{p.label}</span>
                    <span className="text-[13px] text-slate-500 mt-0.5 truncate max-w-[180px]">{p.sub}</span>
                  </div>
                </div>
                <span className="text-slate-600 group-hover:text-white transition-all translate-x-0 group-hover:translate-x-2 text-xl shrink-0 ml-2" aria-hidden="true">→</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
