'use client';

import React from 'react';
import { useActionState } from 'react';
import type { ProjectActionState } from './actions';
import FileInput from '@/components/admin/FileInput';
import FormField from '@/components/admin/FormField';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { FormActions } from '@/components/admin/FormActions';

interface ProjectFormProps {
  action: (state: ProjectActionState, formData: FormData) => Promise<ProjectActionState>;
  initialData?: {
    title: string;
    description: string;
    shortDescription: string | null;
    category: string;
    techStack: string | null;
    tags: string | null;
    githubLink: string | null;
    liveLink: string | null;
    isFeatured: boolean;
    orderIndex: number;
    imagePath: string | null;
  };
  submitLabel: string;
}

// Shared textarea class
const textareaBase = [
  'w-full min-w-0',
  'border border-[var(--border-color)]',
  'rounded-lg',
  'px-4 py-3',
  'bg-[rgba(255,255,255,0.025)]',
  'text-white text-[0.9375rem] leading-relaxed',
  'focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)]',
  'transition-all duration-200',
  'placeholder:text-[var(--fg-muted)]',
  'resize-y',
].join(' ');

export default function ProjectForm({ action, initialData, submitLabel }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction}>
      {state.message && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {state.message}
        </div>
      )}

      {/* Main 2-column layout: 65% main / 35% sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
        {/* ── LEFT / MAIN column ── */}
        <div className="space-y-6">
          <AdminFormSection
            title="Basic Information"
            description="Core details about the project."
          >
            <FormField label="Title" name="title" required defaultValue={initialData?.title}>
              {state.errors?.title && <p className="text-red-400 text-xs mt-1">{state.errors.title[0]}</p>}
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
              <div className="min-w-0">
                <FormField label="Category" name="category" required defaultValue={initialData?.category}>
                  {state.errors?.category && <p className="text-red-400 text-xs mt-1">{state.errors.category[0]}</p>}
                </FormField>
              </div>
              <div className="min-w-0">
                <FormField label="Order Index" name="orderIndex" type="number" defaultValue={initialData?.orderIndex ?? 0} helpText="Lower numbers appear first.">
                  {state.errors?.orderIndex && <p className="text-red-400 text-xs mt-1">{state.errors.orderIndex[0]}</p>}
                </FormField>
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="shortDescription" className="block text-[13px] font-semibold text-[var(--fg-base)] mb-2 tracking-wide">
                Short Description
              </label>
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={2}
                defaultValue={initialData?.shortDescription ?? ''}
                placeholder="Brief summary shown on project cards (1-2 sentences)"
                className={textareaBase}
              />
            </div>

            {/* Full Description (HTML) field */}
            <div className="mb-1">
              <label htmlFor="description" className="block text-[13px] font-semibold text-[var(--fg-base)] mb-2 tracking-wide">
                Full Description (HTML) <span className="text-red-400">*</span>
              </label>
              <p className="text-[12px] text-[var(--fg-muted)] mb-2 leading-relaxed">
                HTML content is supported and rendered safely on the project detail page.
              </p>
              <textarea
                id="description"
                name="description"
                required
                rows={10}
                defaultValue={initialData?.description ?? ''}
                className={[textareaBase, 'font-mono text-[13px] leading-[1.6]'].join(' ')}
                placeholder="<p>Project description...</p>"
              />
              {state.errors?.description && <p className="text-red-400 text-xs mt-1">{state.errors.description[0]}</p>}
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="Technology"
            description="Tech stack and keywords."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
              <div className="min-w-0">
                <FormField
                  label="Tech Stack (JSON array)"
                  name="techStack"
                  placeholder='e.g. ["React", "Next.js"]'
                  defaultValue={initialData?.techStack ?? ''}
                  helpText='Use JSON array format: ["Tech1", "Tech2"]'
                />
              </div>
              <div className="min-w-0">
                <FormField
                  label="Tags (comma-separated)"
                  name="tags"
                  placeholder="e.g. web, frontend, ai"
                  defaultValue={initialData?.tags ?? ''}
                  helpText="Keywords for filtering. Comma-separated."
                />
              </div>
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="Links"
            description="External URLs for this project."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)' }}>
              <div className="min-w-0">
                <FormField label="GitHub URL" name="githubLink" type="url" placeholder="https://github.com/..." defaultValue={initialData?.githubLink ?? ''}>
                  {state.errors?.githubLink && <p className="text-red-400 text-xs mt-1">{state.errors.githubLink[0]}</p>}
                </FormField>
              </div>
              <div className="min-w-0">
                <FormField label="Live URL" name="liveLink" type="url" placeholder="https://" defaultValue={initialData?.liveLink ?? ''}>
                  {state.errors?.liveLink && <p className="text-red-400 text-xs mt-1">{state.errors.liveLink[0]}</p>}
                </FormField>
              </div>
            </div>
          </AdminFormSection>
        </div>

        {/* ── RIGHT / SIDEBAR column ── */}
        <div className="space-y-6">
          <AdminFormSection
            title="Media"
            description="Project preview image."
          >
            <FileInput
              label="Project Image"
              name="image"
              accept="image/jpeg, image/png, image/webp"
              currentPath={initialData?.imagePath ? `/${initialData.imagePath}` : null}
              helpText="Thumbnail image. Recommended 16:9, max 5MB."
            />
          </AdminFormSection>

          <AdminFormSection
            title="Display Options"
          >
            {/* Compact settings row */}
            <div className="flex items-start gap-4 py-1">
              <input
                id="isFeatured"
                name="isFeatured"
                type="checkbox"
                defaultChecked={initialData?.isFeatured ?? false}
                className="mt-0.5 w-5 h-5 rounded border-[var(--border-color)] text-[var(--accent)] bg-[var(--bg-elevated)] focus:ring-[var(--accent)] focus:ring-offset-0 shrink-0"
              />
              <div>
                <label htmlFor="isFeatured" className="block text-sm font-semibold text-white cursor-pointer select-none leading-tight">
                  Featured Project
                </label>
                <p className="text-[12px] text-[var(--fg-muted)] mt-1 leading-relaxed">
                  Show this project in the featured portfolio sections on the homepage.
                </p>
              </div>
            </div>
          </AdminFormSection>
        </div>
      </div>

      <FormActions
        submitLabel={submitLabel}
        cancelHref="/admin/projects"
        isPending={isPending}
      />
    </form>
  );
}
