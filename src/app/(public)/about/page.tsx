import { getSettings } from '@/lib/services/settings';
import { listExperiences } from '@/lib/services/experiences';
import { listSkills } from '@/lib/services/skills';
import Image from 'next/image';
import { Section } from '@/components/shared/ui/Section';
import { Container } from '@/components/shared/ui/Container';

export const revalidate = 3600;

export const metadata = {
  title: 'About — Muhammad Abdullah',
  description: 'Data Analyst and AI/ML Engineer building scalable data pipelines, intelligent machine learning models, and modern web applications.',
};

export default async function AboutPage() {
  const [settings, experiences, skills] = await Promise.all([
    getSettings(),
    listExperiences(),
    listSkills(),
  ]);

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const currentRole = experiences.find(e => e.isCurrent);

  return (
    <div className="pt-24 pb-16 min-h-screen">

      {/* Page Hero — editorial two-column */}
      <div className="relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-glow)] rounded-full blur-[120px] opacity-15" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[rgba(94,106,210,0.08)] rounded-full blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex-1 lg:max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-medium text-[var(--accent)] tracking-wide uppercase">About Me</span>
              </div>
              <h1 className="heading-1 text-white mb-6">Muhammad Abdullah</h1>
              <h2 className="heading-3 text-accent-gradient font-medium mb-6">
                Data Analyst &amp; AI/ML Engineer
              </h2>
              {settings.about_text ? (
                <p className="text-lg text-[var(--fg-muted)] leading-relaxed whitespace-pre-wrap">
                  {settings.about_text}
                </p>
              ) : (
                <p className="text-lg text-[var(--fg-muted)] leading-relaxed">
                  Building scalable data pipelines, intelligent machine learning models, and modern web applications that solve complex, real-world problems.
                </p>
              )}
            </div>
            {/* Portrait */}
            <div className="flex-shrink-0 w-48 sm:w-56 lg:w-64">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--accent)] rounded-2xl blur-2xl opacity-15 scale-90" />
                <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-[0_24px_48px_rgba(0,0,0,0.5)] aspect-[3/4] bg-[var(--bg-elevated)]">
                  <Image
                    src="/images/profile/portfolio-profile.jpg"
                    alt="Muhammad Abdullah"
                    fill
                    sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020203]/30 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Role highlight */}
      {currentRole && (
        <Section className="!pt-12 !pb-0">
          <Container>
            <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start border border-[rgba(94,106,210,0.2)] max-w-3xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[rgba(94,106,210,0.15)] flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-1">Currently</div>
                <div className="text-lg font-bold text-white">{currentRole.jobTitle}</div>
                <div className="text-[var(--accent-bright)] font-medium">{currentRole.company}</div>
                {currentRole.location && (
                  <div className="text-sm text-[var(--fg-muted)] mt-1 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {currentRole.location}
                  </div>
                )}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Skills by category */}
      {Object.keys(skillsByCategory).length > 0 && (
        <Section>
          <Container>
            <h2 className="heading-2 text-white mb-10">Technical Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {Object.entries(skillsByCategory).map(([category, catSkills]) => (
                <div key={category} className="glass-panel rounded-2xl p-6 border border-[var(--border-color)]">
                  <h3 className="text-sm font-semibold text-[var(--accent)] uppercase tracking-wider mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map(skill => (
                      <span
                        key={skill.id}
                        className="px-3 py-1.5 bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--fg-base)] hover:border-[var(--accent)] hover:text-white transition-colors duration-200"
                        title={`Proficiency: ${skill.level}%`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Experience timeline preview */}
      {experiences.length > 0 && (
        <Section className="border-t border-[var(--border-color)]">
          <Container>
            <h2 className="heading-2 text-white mb-10">Experience</h2>
            <div className="max-w-4xl space-y-0">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-8 md:pl-0 group">
                  {/* Timeline connector */}
                  <div className="md:hidden absolute left-[11px] top-2 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border-color)] to-transparent" />

                  <div className="md:grid md:grid-cols-5 md:gap-8 xl:gap-12 relative">
                    {/* Desktop rail */}
                    <div className="hidden md:block absolute left-[19.5%] top-2 bottom-0 w-px bg-gradient-to-b from-[var(--border-color)] via-[var(--border-color)] to-transparent group-hover:from-[var(--accent)] transition-colors duration-500" />
                    <div className="hidden md:block absolute left-[19.5%] top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--accent)] z-10 group-hover:shadow-[0_0_10px_var(--accent)] transition-all duration-300" />

                    {/* Mobile marker */}
                    <div className="md:hidden absolute left-[11px] top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--accent)] z-10" />

                    {/* Date */}
                    <div className="hidden md:block col-span-1 text-right pt-1">
                      <div className="text-sm font-semibold text-[var(--fg-muted)] uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {' — '}
                        {exp.isCurrent || !exp.endDate ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-4 pb-12">
                      <div className="md:hidden text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {' — '}
                        {exp.isCurrent || !exp.endDate ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.jobTitle}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                        <span className="text-[var(--accent-bright)] font-medium">{exp.company}</span>
                        {exp.location && (
                          <span className="flex items-center text-sm text-[var(--fg-muted)] gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {exp.location}
                          </span>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-[var(--fg-muted)] leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

    </div>
  );
}
