import React, { useState } from 'react';
import { Cpu, Check } from 'lucide-react';
import { Skill } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

interface SkillsSectionProps {
  skills: Skill[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'AI & Machine Learning',
    'Data Science & Analytics',
    'Programming & Frameworks',
    'Databases & Tools',
  ];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <FadeIn delay={0.05} y={-10}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-xs font-semibold uppercase tracking-wider text-[#A855F7]">
            Technical Competencies
          </div>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Verified Stack &amp; Skill Matrix
          </h2>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Consistently applied across 16 production projects, academic certifications, and client deliverables.
          </p>
        </FadeIn>

        {/* Category Pills */}
        <FadeIn delay={0.35} y={20}>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#6366F1] text-[#F8FAFC] shadow-md shadow-[#6366F1]/30'
                    : 'bg-[#101626] text-[#CBD5E1] border border-[#94A3B8]/15 hover:border-[#6366F1]/40'
                }`}
              >
                {cat} {cat === 'All' ? `(${skills.length})` : ''}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill, index) => (
          <FadeIn key={skill.id} delay={0.05 + (index % 6) * 0.05} y={20}>
            <div className="p-4 sm:p-5 rounded-xl bg-[#0B1020] border border-[#94A3B8]/15 hover:border-[#6366F1]/35 transition-all group flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#101626] border border-[#94A3B8]/15 flex items-center justify-center text-[#22D3EE] group-hover:text-[#6366F1] transition-colors">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors leading-tight">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-[#7C879B]">{skill.category}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#CBD5E1]">
                  {skill.level}%
                </span>
              </div>

              {/* Verified Proficiency Bar */}
              <div className="w-full bg-[#101626] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#6366F1] to-[#22D3EE] h-1.5 rounded-full transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 text-xs text-[#7C879B] px-4 py-2 rounded-lg bg-[#0B1020] border border-[#94A3B8]/10">
          <Check className="w-3.5 h-3.5 text-[#22C55E]" />
          <span>All 22 competencies are verified through real database records &amp; completed deliverables</span>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
