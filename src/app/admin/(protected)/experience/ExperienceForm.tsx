'use client';

import React from 'react';
import { useActionState } from 'react';
import type { ExperienceActionState } from './actions';
import FormField from '@/components/admin/FormField';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { FormActions } from '@/components/admin/FormActions';

interface ExperienceFormProps {
  action: (state: ExperienceActionState, formData: FormData) => Promise<ExperienceActionState>;
  initialData?: {
    jobTitle: string;
    company: string;
    location: string | null;
    startDate: string;
    endDate: string | null;
    description: string | null;
    isCurrent: boolean;
    orderIndex: number;
  };
  submitLabel: string;
}

export default function ExperienceForm({ action, initialData, submitLabel }: ExperienceFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction}>
      {state.message && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {state.message}
        </div>
      )}

      <div className="max-w-4xl">
        <AdminFormSection 
          title="Role Information" 
          description="Details about your position and company."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <FormField label="Job Title" name="jobTitle" required defaultValue={initialData?.jobTitle}>
                {state.errors?.jobTitle && <p className="text-red-400 text-xs mt-1">{state.errors.jobTitle[0]}</p>}
              </FormField>
            </div>
            <div>
              <FormField label="Company" name="company" required defaultValue={initialData?.company}>
                {state.errors?.company && <p className="text-red-400 text-xs mt-1">{state.errors.company[0]}</p>}
              </FormField>
            </div>
          </div>

          <FormField label="Location" name="location" defaultValue={initialData?.location ?? ''} />
        </AdminFormSection>

        <AdminFormSection 
          title="Timeline" 
          description="When did you work here?"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <FormField label="Start Date" name="startDate" type="date" required defaultValue={initialData?.startDate}>
                {state.errors?.startDate && <p className="text-red-400 text-xs mt-1">{state.errors.startDate[0]}</p>}
              </FormField>
            </div>
            <div>
              <FormField label="End Date" name="endDate" type="date" defaultValue={initialData?.endDate ?? ''}>
                {state.errors?.endDate && <p className="text-red-400 text-xs mt-1">{state.errors.endDate[0]}</p>}
              </FormField>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] p-4 rounded-lg border border-[var(--border-color)]">
            <input id="isCurrent" name="isCurrent" type="checkbox" defaultChecked={initialData?.isCurrent ?? false} className="w-5 h-5 rounded border-[var(--border-color)] text-[var(--accent)] bg-[var(--bg-elevated)] focus:ring-[var(--accent)] focus:ring-offset-0" />
            <label htmlFor="isCurrent" className="text-sm font-medium text-white cursor-pointer select-none">
              I currently work here
            </label>
          </div>
        </AdminFormSection>

        <AdminFormSection 
          title="Details"
        >
          <FormField label="Description" name="description" defaultValue={initialData?.description ?? ''} helpText="Describe your achievements and responsibilities. HTML is supported.">
            <textarea rows={5} />
          </FormField>
          
          <div className="mt-5 max-w-xs">
            <FormField label="Order Index" name="orderIndex" type="number" defaultValue={initialData?.orderIndex ?? 0} helpText="Lower numbers appear first." />
          </div>
        </AdminFormSection>

        <FormActions 
          submitLabel={submitLabel} 
          cancelHref="/admin/experience" 
          isPending={isPending} 
        />
      </div>
    </form>
  );
}
