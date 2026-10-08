import React from 'react';
import { Building2, Calendar, CheckSquare, PackageCheck } from 'lucide-react';
import { ClientWork } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

interface ClientWorkSectionProps {
  clientWork: ClientWork[];
}

export const ClientWorkSection: React.FC<ClientWorkSectionProps> = ({
  clientWork,
}) => {
  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <FadeIn delay={0.05} y={-10}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
            Client Deployments
          </div>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Client Solutions &amp; Deliverables
          </h2>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Direct freelance contracts completed for enterprise analytics and retail forecasting.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {clientWork.map((work, idx) => (
          <FadeIn key={work.id} delay={0.2 + idx * 0.1} y={25}>
            <div className="rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 hover:border-[#22D3EE]/40 p-6 sm:p-8 flex flex-col justify-between h-full transition-all">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#22D3EE]">
                    <Building2 className="w-4 h-4" />
                    <span>{work.client}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#7C879B] font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{work.completedDate}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#F8FAFC] leading-snug">
                  {work.projectTitle}
                </h3>

                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                    <CheckSquare className="w-4 h-4 text-[#6366F1] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#F8FAFC]">Scope: </strong>
                      {work.scope}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                    <PackageCheck className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#F8FAFC]">Deliverables: </strong>
                      {work.deliverables}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#94A3B8]/10 flex items-center justify-between text-[11px] text-[#7C879B]">
                <span>Status: Completed &amp; Verified</span>
                <span className="text-[#22C55E] font-medium">100% On-Time Delivery</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ClientWorkSection;
