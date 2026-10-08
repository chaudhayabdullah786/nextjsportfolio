import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { Experience } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

interface ExperienceSectionProps {
  experienceList: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experienceList,
}) => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col items-center text-center gap-3 mb-16">
        <FadeIn delay={0.05} y={-10}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-xs font-semibold uppercase tracking-wider text-[#22C55E]">
            Professional History
          </div>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Work Experience
          </h2>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Verified professional track record building custom web applications, automated data scrapers,
            and predictive models for international clients.
          </p>
        </FadeIn>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {experienceList.map((exp, index) => (
          <FadeIn key={exp.id} delay={0.2 + index * 0.1} y={25}>
            <div className="rounded-3xl bg-[#0B1020] border border-[#94A3B8]/20 p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Glowing accent border */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#6366F1] via-[#22D3EE] to-[#8B5CF6]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#94A3B8]/15">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-[#6366F1]/15 text-[#6366F1] text-xs font-bold uppercase tracking-wider mb-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Active Engagement</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="text-base font-semibold text-[#22D3EE] mt-0.5">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-xs text-[#94A3B8]">
                  <div className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#CBD5E1]" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#CBD5E1]" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="py-6">
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                  {exp.description}
                </p>
              </div>

              {exp.highlights && exp.highlights.length > 0 && (
                <div className="pt-4 border-t border-[#94A3B8]/15 flex flex-col gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#7C879B]">
                    Key Deliverables &amp; Achievements:
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {exp.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                        <CheckCircle className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
