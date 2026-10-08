import { listProjects } from '@/lib/services/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { Section } from '@/components/shared/ui/Section';
import { Container } from '@/components/shared/ui/Container';

export const revalidate = 3600;

export const metadata = {
  title: 'Projects — Muhammad Abdullah',
  description: 'Explore the complete portfolio: machine learning models, data pipelines, analytics dashboards, and full-stack web applications.',
};

export default async function ProjectsPage() {
  const projects = await listProjects();

  // Categories filter logic could be added here later if needed

  return (
    <div className="pt-24 pb-16 min-h-screen">

      {/* Page Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="text-xs font-medium text-[var(--accent)] tracking-wide uppercase">Portfolio</span>
          </div>
          <h1 className="heading-1 text-white mb-6">All Projects</h1>
          <p className="text-lg text-[var(--fg-muted)] leading-relaxed max-w-2xl">
            A complete collection of machine learning models, data analytics dashboards, and full-stack applications built to solve real-world problems.
          </p>
          <p className="mt-3 text-sm text-[var(--fg-muted)]">
            <span className="text-white font-semibold">{projects.length}</span> projects total
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border-color)]" />

      {/* Projects Grid */}
      <Section className="!pt-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, idx) => {
              // Every 7th item (0-indexed) spans 2 columns as a featured item for visual rhythm
              const isWide = idx % 7 === 0 && idx !== 0;
              const spanClass = isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1';
              return (
                <div key={project.id} className={spanClass}>
                  <ProjectCard project={project} featured={isWide} />
                </div>
              );
            })}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-24">
              <svg className="w-16 h-16 text-[var(--fg-muted)] opacity-30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-[var(--fg-muted)]">No projects found.</p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
