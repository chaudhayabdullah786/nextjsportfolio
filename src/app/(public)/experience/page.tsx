import { listExperiences } from '@/lib/services/experiences';
import { Section } from '@/components/shared/ui/Section';
import { Container } from '@/components/shared/ui/Container';

export const revalidate = 3600;

export const metadata = {
  title: 'Experience — Muhammad Abdullah',
  description: 'Professional experience and employment history.',
};

export default async function ExperiencePage() {
  const experiences = await listExperiences();

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Section className="!pt-0">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--accent)] tracking-wide uppercase">Journey</span>
            </div>
            <h1 className="heading-1 text-white mb-6">Experience</h1>
            <p className="text-lg text-[var(--fg-muted)] leading-relaxed mb-16 max-w-2xl">
              My professional background building impactful software solutions, from data analysis to full-stack engineering.
            </p>

            <div className="space-y-0 relative">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-8 md:pl-0 group">
                  {/* Timeline connector (mobile) */}
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
                    <div className="md:col-span-4 pb-16">
                      <div className="md:hidden text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {' — '}
                        {exp.isCurrent || !exp.endDate ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                      
                      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[var(--border-color)] group-hover:border-[var(--border-hover)] transition-colors duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">{exp.jobTitle}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                          <span className="text-[var(--accent-bright)] font-medium text-lg">{exp.company}</span>
                          {exp.location && (
                            <span className="flex items-center text-sm text-[var(--fg-muted)] gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {exp.location}
                            </span>
                          )}
                        </div>
                        {exp.description && (
                          <div className="text-[var(--fg-muted)] leading-relaxed text-sm md:text-base whitespace-pre-wrap group-hover:text-[var(--fg-base)] transition-colors duration-300">
                            {exp.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {experiences.length === 0 && (
              <p className="text-[var(--fg-muted)] text-center py-12">No experience records found.</p>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
