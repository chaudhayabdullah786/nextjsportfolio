'use client';

import React from 'react';
import { useActionState } from 'react';
import type { ClientWorkActionState } from './actions';
import FileInput from '@/components/admin/FileInput';
import FormField from '@/components/admin/FormField';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { FormActions } from '@/components/admin/FormActions';

interface ClientWorkFormProps {
  action: (state: ClientWorkActionState, formData: FormData) => Promise<ClientWorkActionState>;
  initialData?: {
    title: string;
    clientName: string | null;
    publicClientLabel: string | null;
    showClientName: boolean;
    category: string | null;
    shortDescription: string | null;
    videoUrl: string | null;
    projectUrl: string | null;
    orderIndex: number;
    isActive: boolean;
    thumbnailPath: string | null;
    videoPath: string | null;
  };
  submitLabel: string;
}

export default function ClientWorkForm({ action, initialData, submitLabel }: ClientWorkFormProps) {
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
            title="Work Details" 
            description="Core information about the client work."
          >
            <FormField label="Project Title" name="title" required defaultValue={initialData?.title}>
              {state.errors?.title && <p className="text-red-400 text-xs mt-1">{state.errors.title[0]}</p>}
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <FormField label="Category" name="category" defaultValue={initialData?.category ?? ''} placeholder="e.g. Web Development" />
              </div>
              <div>
                <FormField label="Order Index" name="orderIndex" type="number" defaultValue={initialData?.orderIndex ?? 0} helpText="Lower numbers appear first.">
                  {state.errors?.orderIndex && <p className="text-red-400 text-xs mt-1">{state.errors.orderIndex[0]}</p>}
                </FormField>
              </div>
            </div>

            <FormField label="Short Description" name="shortDescription" defaultValue={initialData?.shortDescription ?? ''}>
              <textarea rows={3} />
            </FormField>
          </AdminFormSection>

          <AdminFormSection 
            title="Client Information & Privacy" 
            description="Manage how the client name is displayed publicly."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <FormField label="Client Name (Private)" name="clientName" defaultValue={initialData?.clientName ?? ''}>
                  {state.errors?.clientName && <p className="text-red-400 text-xs mt-1">{state.errors.clientName[0]}</p>}
                </FormField>
              </div>
              <div>
                <FormField label="Public Label" name="publicClientLabel" defaultValue={initialData?.publicClientLabel ?? ''} placeholder="e.g. Confidential Startup">
                  {state.errors?.publicClientLabel && <p className="text-red-400 text-xs mt-1">{state.errors.publicClientLabel[0]}</p>}
                </FormField>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] p-4 rounded-lg border border-[var(--border-color)]">
              <input id="showClientName" name="showClientName" type="checkbox" defaultChecked={initialData?.showClientName ?? false} className="w-5 h-5 rounded border-[var(--border-color)] text-[var(--accent)] bg-[var(--bg-elevated)] focus:ring-[var(--accent)] focus:ring-offset-0" />
              <label htmlFor="showClientName" className="text-sm font-medium text-white cursor-pointer select-none">
                Show real client name publicly
              </label>
            </div>
          </AdminFormSection>

          <AdminFormSection 
            title="External Links"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FormField label="External Video URL" name="videoUrl" type="url" placeholder="https://youtube.com/..." defaultValue={initialData?.videoUrl ?? ''}>
                  {state.errors?.videoUrl && <p className="text-red-400 text-xs mt-1">{state.errors.videoUrl[0]}</p>}
                </FormField>
              </div>
              <div>
                <FormField label="Project Link" name="projectUrl" type="url" placeholder="https://" defaultValue={initialData?.projectUrl ?? ''}>
                  {state.errors?.projectUrl && <p className="text-red-400 text-xs mt-1">{state.errors.projectUrl[0]}</p>}
                </FormField>
              </div>
            </div>
          </AdminFormSection>
        </div>

        {/* RIGHT - Media Options */}
        <div className="lg:col-span-1 space-y-6">
          <AdminFormSection title="Status">
            <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] p-4 rounded-lg border border-[var(--border-color)]">
              <input id="isActive" name="isActive" type="checkbox" defaultChecked={initialData?.isActive ?? true} className="w-5 h-5 rounded border-[var(--border-color)] text-[var(--accent)] bg-[var(--bg-elevated)] focus:ring-[var(--accent)] focus:ring-offset-0" />
              <label htmlFor="isActive" className="text-sm font-medium text-white cursor-pointer select-none">
                Active (Visible on site)
              </label>
            </div>
          </AdminFormSection>

          <AdminFormSection title="Media Files">
            <FileInput 
              label="Thumbnail Image" 
              name="thumbnail" 
              accept="image/jpeg, image/png, image/webp" 
              currentPath={initialData?.thumbnailPath ? `/${initialData.thumbnailPath}` : null}
              helpText="Thumbnail image. Max 5MB."
            />
            
            <div className="border-t border-[var(--border-color)] my-5 pt-5">
              <FileInput 
                label="Local Video File" 
                name="videoFile" 
                accept="video/mp4, video/webm" 
                currentPath={initialData?.videoPath ? `/${initialData.videoPath}` : null}
                helpText="MP4 or WebM short clip. Max 30MB."
              />
            </div>
          </AdminFormSection>
        </div>
      </div>

      <FormActions 
        submitLabel={submitLabel} 
        cancelHref="/admin/client-work" 
        isPending={isPending} 
      />
    </form>
  );
}
