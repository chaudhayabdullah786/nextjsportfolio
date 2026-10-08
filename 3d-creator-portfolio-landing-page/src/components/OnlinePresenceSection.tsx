import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { FadeIn } from './FadeIn';

export const OnlinePresenceSection: React.FC = () => {
  const presenceCards = [
    {
      title: 'GitHub Repositories',
      handle: '@muhammad-abdullah-ai',
      description:
        'Explore source code, machine learning notebooks, computer vision pipelines, and full-stack web applications.',
      link: 'https://github.com/muhammad-abdullah-ai',
      icon: GithubIcon,
      color: 'text-[#F8FAFC]',
      bg: 'bg-[#101626]',
      border: 'hover:border-[#F8FAFC]/40',
    },
    {
      title: 'LinkedIn Network',
      handle: 'in/muhammad-abdullah-aiml',
      description:
        'Connect for professional engineering inquiries, data science discussions, contract opportunities, and recommendations.',
      link: 'https://linkedin.com/in/muhammad-abdullah-aiml',
      icon: LinkedinIcon,
      color: 'text-[#6366F1]',
      bg: 'bg-[#6366F1]/15',
      border: 'hover:border-[#6366F1]/50',
    },
    {
      title: 'Direct Email',
      handle: 'abdullah.aiml.eng@gmail.com',
      description:
        'Send detailed briefs, dataset requirements, consulting queries, or schedule a technical discovery call.',
      link: 'mailto:abdullah.aiml.eng@gmail.com',
      icon: Mail,
      color: 'text-[#22D3EE]',
      bg: 'bg-[#22D3EE]/15',
      border: 'hover:border-[#22D3EE]/50',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <FadeIn delay={0.05} y={-10}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-xs font-semibold uppercase tracking-wider text-[#6366F1]">
            Online Presence
          </div>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Connect Across Verified Platforms
          </h2>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Always open to data challenges, machine learning collaborations, and production consulting engagements.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {presenceCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <FadeIn key={card.title} delay={0.15 + idx * 0.1} y={20} className="h-full">
              <a
                href={card.link}
                target="_blank"
                rel="noreferrer"
                className={`h-full p-6 sm:p-7 rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 ${card.border} transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#7C879B] group-hover:text-[#22D3EE] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <h3 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
                    {card.title}
                  </h3>
                  <div className="text-xs font-mono text-[#22D3EE] mt-1 mb-3">
                    {card.handle}
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#94A3B8]/10 mt-6 flex items-center justify-between text-xs font-semibold text-[#CBD5E1] group-hover:text-[#F8FAFC]">
                  <span>Visit Profile</span>
                  <span className="text-[11px] text-[#22C55E]">Verified</span>
                </div>
              </a>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

export default OnlinePresenceSection;
