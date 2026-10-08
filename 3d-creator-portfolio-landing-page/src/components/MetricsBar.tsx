import React from 'react';
import { Database, Cpu, Award, BookOpen } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface MetricsBarProps {
  projectCount: number;
  skillCount: number;
  certificateCount: number;
  blogCount: number;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({
  projectCount,
  skillCount,
  certificateCount,
  blogCount,
}) => {
  const metrics = [
    {
      label: 'Verified Projects',
      value: projectCount,
      detail: 'Machine learning, CV, NLP & BI systems',
      icon: Database,
      color: 'text-[#6366F1]',
      bg: 'bg-[#6366F1]/15',
      border: 'border-[#6366F1]/25',
    },
    {
      label: 'Technical Skills',
      value: skillCount,
      detail: 'Core tools, libraries & frameworks',
      icon: Cpu,
      color: 'text-[#22D3EE]',
      bg: 'bg-[#22D3EE]/15',
      border: 'border-[#22D3EE]/25',
    },
    {
      label: 'Industry Certifications',
      value: certificateCount,
      detail: 'DeepLearning.AI, IBM, Google & Meta',
      icon: Award,
      color: 'text-[#A855F7]',
      bg: 'bg-[#A855F7]/15',
      border: 'border-[#A855F7]/25',
    },
    {
      label: 'Published Articles',
      value: blogCount,
      detail: 'In-depth engineering & SQL breakdowns',
      icon: BookOpen,
      color: 'text-[#F59E0B]',
      bg: 'bg-[#F59E0B]/15',
      border: 'border-[#F59E0B]/25',
    },
  ];

  return (
    <section className="relative z-20 -mt-6 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      <FadeIn delay={0.2} y={20}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-[#0B1020]/90 border border-[#94A3B8]/15 shadow-2xl backdrop-blur-xl">
          {metrics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex flex-col gap-2 p-4 rounded-xl bg-[#101626]/70 border ${item.border} transition-all hover:bg-[#101626]`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
                    {item.value}
                  </span>
                  <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-semibold text-[#CBD5E1]">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-[#7C879B] mt-0.5 line-clamp-1">
                    {item.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
};

export default MetricsBar;
