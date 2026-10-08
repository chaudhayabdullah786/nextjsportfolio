import { getProjectById } from '@/lib/services/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/shared/ui/Badge';
import { Button } from '@/components/shared/ui/Button';
import { normalizeTechStack } from '@/lib/utils/normalizeTechStack';

export const revalidate = 3600;

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projectId = parseInt(id, 10);
  if (isNaN(projectId)) notFound();

  const project = await getProjectById(projectId);
  if (!project) notFound();

  const techStack = normalizeTechStack(project.techStack);
  const tags = project.tags ? project.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Back nav */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--fg-muted)] hover:text-white transition-colors mb-12 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {project.category && <Badge variant="accent">{project.category}</Badge>}
            {project.isFeatured && <Badge variant="warning">Featured</Badge>}
          </div>
          <h1 className="heading-1 text-white mb-5">{project.title}</h1>
          {project.shortDescription && (
            <p className="text-xl text-[var(--fg-muted)] leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>
          )}
        </div>

        {/* Primary media */}
        {project.imagePath ? (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-14 border border-[var(--border-color)] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- imagePath is a dynamic DB value (legacy /uploads/* or external URL); next/image requires statically-known domains */}
            <img
              src={project.imagePath}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-[21/9] rounded-2xl glass-panel flex items-center justify-center mb-14 border border-[var(--border-color)]">
            <svg className="w-16 h-16 text-[var(--fg-muted)] opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-6">About this project</h2>
            <div className="text-[var(--fg-muted)] leading-relaxed whitespace-pre-wrap text-base">
              {project.description}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">

            {/* Tech stack */}
            {techStack.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-white transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="text-sm text-[var(--accent)]">#{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            {(project.liveLink || project.githubLink) && (
              <div className="pt-6 border-t border-[var(--border-color)] space-y-3">
                {project.liveLink && (
                  <Button asChild variant="primary" className="w-full justify-center">
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      Visit Live Site
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </Button>
                )}
                {project.githubLink && (
                  <Button asChild variant="secondary" className="w-full justify-center">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      View Source Code
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
