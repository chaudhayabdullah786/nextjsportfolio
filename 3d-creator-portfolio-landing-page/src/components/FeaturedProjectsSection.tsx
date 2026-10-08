import React, { useState } from 'react';
import {
  ExternalLink,
  Code2,
  Maximize2,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Project } from '../data/portfolioData';
import { normalizeTechStack } from '../utils/normalizeTechStack';
import { GithubIcon } from './Icons';
import { FadeIn } from './FadeIn';

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  projects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'AI & Machine Learning',
    'Data Analytics & BI',
    'Computer Vision & NLP',
    'Full-Stack Development',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Separate the featured primary project from secondary projects
  const primaryProject =
    filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const secondaryProjects = filteredProjects.filter(
    (p) => p.id !== primaryProject?.id
  );

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      <div className="flex flex-col items-center text-center gap-3 mb-12">
        <FadeIn delay={0.05} y={-10}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-xs font-semibold uppercase tracking-wider text-[#6366F1]">
            Featured Engineering Portfolio
          </div>
        </FadeIn>
        <FadeIn delay={0.15} y={20}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            16 Real-World Projects
          </h2>
        </FadeIn>
        <FadeIn delay={0.25} y={20}>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Machine learning systems, computer vision diagnostics, automated ETL pipelines,
            and business intelligence applications.
          </p>
        </FadeIn>

        {/* Category Filter */}
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
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Primary Featured Showcase Project */}
      {primaryProject && (
        <FadeIn delay={0.2} y={30} className="mb-10">
          <div className="rounded-3xl bg-[#0B1020] border border-[#6366F1]/30 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image side */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-video bg-[#101626] border border-[#94A3B8]/15">
                <img
                  src={primaryProject.image}
                  alt={primaryProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070A12]/80 backdrop-blur-md border border-[#22D3EE]/40 text-xs font-semibold text-[#22D3EE]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Primary Featured</span>
                </div>
              </div>

              {/* Info side */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full gap-5">
                <div>
                  <div className="inline-block text-xs font-semibold uppercase tracking-wider text-[#A855F7] mb-2">
                    {primaryProject.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight leading-snug group-hover:text-[#22D3EE] transition-colors">
                    {primaryProject.title}
                  </h3>
                  <p className="text-sm text-[#CBD5E1] mt-3 leading-relaxed">
                    {primaryProject.description}
                  </p>
                </div>

                {/* Normalized Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {normalizeTechStack(primaryProject.techStack).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#101626] border border-[#94A3B8]/20 text-[#CBD5E1]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#94A3B8]/15">
                  <button
                    type="button"
                    onClick={() => setActiveProject(primaryProject)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#F8FAFC] bg-[#6366F1] hover:bg-[#4F46E5] transition-all cursor-pointer shadow-md shadow-[#6366F1]/20"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Case Details</span>
                  </button>

                  {primaryProject.liveUrl && (
                    <a
                      href={primaryProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-[#22D3EE] bg-[#101626] border border-[#94A3B8]/20 hover:border-[#22D3EE]/40 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  {primaryProject.githubUrl && (
                    <a
                      href={primaryProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-[#F8FAFC] bg-[#101626] border border-[#94A3B8]/20 hover:border-[#CBD5E1]/40 transition-all"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {/* Balanced Secondary Grid (remaining projects) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {secondaryProjects.map((project, idx) => {
          const techList = normalizeTechStack(project.techStack);
          return (
            <FadeIn key={project.id} delay={0.1 + (idx % 3) * 0.1} y={25}>
              <div className="rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 hover:border-[#6366F1]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full">
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#101626]">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#070A12]/80 backdrop-blur-md text-[10px] font-semibold text-[#22D3EE] border border-[#94A3B8]/20">
                      {project.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 flex flex-col gap-3">
                    <h4 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors leading-snug">
                      {project.title}
                    </h4>
                    <p className="text-xs text-[#94A3B8] line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Normalized Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {techList.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#101626] border border-[#94A3B8]/15 text-[#CBD5E1]"
                        >
                          {tech}
                        </span>
                      ))}
                      {techList.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] text-[#7C879B]">
                          +{techList.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-[#94A3B8]/10 mt-4">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="text-xs font-semibold text-[#6366F1] hover:text-[#22D3EE] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Overview</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-[#101626] text-[#CBD5E1] hover:text-[#22D3EE] transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-[#101626] text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B1020] border border-[#94A3B8]/20 p-6 sm:p-8 shadow-2xl flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A855F7]">
                  {activeProject.category}
                </span>
                <h3 className="text-2xl font-extrabold text-[#F8FAFC] mt-1">
                  {activeProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-xl bg-[#101626] text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-[#101626] border border-[#94A3B8]/15">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#22D3EE] flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Architecture &amp; Implementation Details</span>
              </h4>
              <p className="text-sm text-[#CBD5E1] leading-relaxed whitespace-pre-line">
                {activeProject.fullDescription || activeProject.description}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>Normalized Technology Stack</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {normalizeTechStack(activeProject.techStack).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-[#101626] border border-[#6366F1]/30 text-[#CBD5E1]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#94A3B8]/15">
              <div className="flex items-center gap-3">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-[#F8FAFC] bg-[#6366F1] hover:bg-[#4F46E5] transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Demo</span>
                  </a>
                )}
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#CBD5E1] hover:text-[#F8FAFC] bg-[#101626] border border-[#94A3B8]/20"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View GitHub</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#7C879B] hover:text-[#F8FAFC]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProjectsSection;
