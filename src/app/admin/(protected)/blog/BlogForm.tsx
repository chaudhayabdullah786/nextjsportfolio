'use client';

import React from 'react';
import { useActionState } from 'react';
import type { BlogActionState } from './actions';
import FileInput from '@/components/admin/FileInput';
import FormField from '@/components/admin/FormField';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { FormActions } from '@/components/admin/FormActions';

interface BlogFormProps {
  action: (state: BlogActionState, formData: FormData) => Promise<BlogActionState>;
  initialData?: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string | null;
    isPublished?: boolean;
    imagePath?: string | null;
  };
  submitLabel: string;
}

export default function BlogForm({ action, initialData, submitLabel }: BlogFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction}>
      {state.message && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* LEFT / MAIN - Information */}
        <div className="lg:col-span-2 space-y-6">
          <AdminFormSection 
            title="Basic Information" 
            description="Core details about the article."
          >
            <FormField label="Title" name="title" required defaultValue={initialData?.title}>
              {state.errors?.title && <p className="text-red-400 text-xs mt-1">{state.errors.title[0]}</p>}
            </FormField>

            <FormField label="Slug" name="slug" required defaultValue={initialData?.slug} helpText="URL-friendly identifier. Cannot be changed later.">
              {state.errors?.slug && <p className="text-red-400 text-xs mt-1">{state.errors.slug[0]}</p>}
            </FormField>

            <FormField label="Excerpt" name="excerpt" defaultValue={initialData?.excerpt ?? ''} helpText="Brief summary for list views and SEO.">
              <textarea rows={2} />
            </FormField>
          </AdminFormSection>

          <AdminFormSection 
            title="Content" 
            description="Write your article using rich text HTML."
          >
            <FormField label="Article Content (HTML/Rich Text)" name="content" required defaultValue={initialData?.content ?? ''}>
              <textarea rows={12} className="font-mono text-sm" />
            </FormField>
            {state.errors?.content && <p className="text-red-400 text-xs mt-1">{state.errors.content[0]}</p>}
          </AdminFormSection>
        </div>

        {/* RIGHT - Media & Publish */}
        <div className="lg:col-span-1 space-y-6">
          <AdminFormSection 
            title="Publication"
          >
            <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] p-4 rounded-lg border border-[var(--border-color)]">
              <input id="isPublished" name="isPublished" type="checkbox" defaultChecked={initialData?.isPublished ?? false} className="w-5 h-5 rounded border-[var(--border-color)] text-green-500 bg-[var(--bg-elevated)] focus:ring-green-500 focus:ring-offset-0" />
              <label htmlFor="isPublished" className="text-sm font-medium text-white cursor-pointer select-none">
                Publish immediately
              </label>
            </div>
          </AdminFormSection>

          <AdminFormSection 
            title="Media"
          >
            <FileInput
              label="Featured Image"
              name="image"
              accept="image/jpeg, image/png, image/webp"
              currentPath={initialData?.imagePath ? `/${initialData.imagePath}` : null}
              helpText="Thumbnail image for the article. Max 5MB."
            />
          </AdminFormSection>
        </div>
      </div>

      <FormActions 
        submitLabel={submitLabel} 
        cancelHref="/admin/blog" 
        isPending={isPending} 
      />
    </form>
  );
}
