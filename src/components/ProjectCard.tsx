// ProjectCard: imagePath is a dynamic DB value (legacy /uploads/* or external URL);
// next/image requires statically-known domains — using <img> here is intentional.
import React from 'react';
import Link from 'next/link';
import type { Project } from '@prisma/client';
import { Badge } from './shared/ui/Badge';
import { normalizeTechStack } from '@/lib/utils/normalizeTechStack';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const techStack = normalizeTechStack(project.techStack);

  return (
    <div className="group flex flex-col relative rounded-2xl border border-[var(--border-color)] hover:border-[var(--border-hover)] bg-[var(--bg-elevated)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)]">

      {/* Media Container — fixed 16:9 aspect ratio, content-sized card */}
      <div className="relative overflow-hidden flex-shrink-0 aspect-video">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent z-10 opacity-40 group-hover:opacity-20 transition-opacity duration-300" />

        {project.imagePath ? (
          // eslint-disable-next-line @next/next/no-img-element -- imagePath is a dynamic DB value
          <img
            src={project.imagePath}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-[var(--bg-base)] flex items-center justify-center">
            <svg className="w-10 h-10 text-[var(--fg-muted)] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Category badge */}
        {project.category && (
          <div className="absolute top-3 left-3 z-20">
            <Badge variant="default" className="backdrop-blur-md bg-black/50 border-white/10 text-white text-[11px]">
              {project.category}
            </Badge>
          </div>
        )}

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 right-3 z-20">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-grow ${featured ? 'p-6 md:p-8' : 'p-5 md:p-6'}`}>
        {/* Small metadata row */}
        {project.category && (
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-3 opacity-70">
            {project.category}
          </div>
        )}

        <h3 className={`font-bold text-white mb-3 leading-snug group-hover:text-[var(--accent-bright)] transition-colors line-clamp-2 ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
          {project.title}
        </h3>

        <p className={`text-[var(--fg-muted)] leading-relaxed mb-6 line-clamp-3 flex-grow ${featured ? 'text-[1.05rem]' : 'text-sm'}`}>
          {project.shortDescription || (project.description ? project.description.substring(0, 160) + '…' : '')}
        </p>

        <div className="mt-auto">
          {/* Tech stack */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {techStack.slice(0, featured ? 5 : 4).map(tech => (
                <span
                  key={tech}
                  className="text-[12px] font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] px-3 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {techStack.length > (featured ? 5 : 4) && (
                <span className="text-[12px] font-medium text-[var(--fg-muted)] px-2 py-1">
                  +{techStack.length - (featured ? 5 : 4)}
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <Link
              href={`/projects/${project.id}`}
              className="text-sm font-semibold text-[var(--accent)] hover:text-white transition-colors flex items-center gap-1.5 group/link"
            >
              View Project
              <svg className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <div className="flex items-center gap-3 ml-auto">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--fg-muted)] hover:text-white transition-colors"
                  aria-label="GitHub Repository"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              )}

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                  aria-label="Live Project"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
