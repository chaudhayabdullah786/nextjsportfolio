'use client';

import React from 'react';
import { useActionState } from 'react';
import type { SkillActionState } from './actions';
import FormField from '@/components/admin/FormField';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { FormActions } from '@/components/admin/FormActions';

interface SkillFormProps {
  action: (state: SkillActionState, formData: FormData) => Promise<SkillActionState>;
  initialData?: {
    name: string;
    category: string;
    level: number;
    orderIndex: number;
  };
  submitLabel: string;
}

export default function SkillForm({ action, initialData, submitLabel }: SkillFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction}>
      {state.message && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {state.message}
        </div>
      )}

      <div className="max-w-3xl">
        <AdminFormSection 
          title="Skill Details" 
          description="Add a technical skill and its proficiency level."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <FormField label="Name" name="name" required defaultValue={initialData?.name}>
                {state.errors?.name && <p className="text-red-400 text-xs mt-1">{state.errors.name[0]}</p>}
              </FormField>
            </div>
            <div>
              <FormField label="Category" name="category" required defaultValue={initialData?.category} placeholder="e.g. Frontend, Backend, Tools">
                {state.errors?.category && <p className="text-red-400 text-xs mt-1">{state.errors.category[0]}</p>}
              </FormField>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <FormField label="Proficiency Level (1-100)" name="level" type="number" required defaultValue={initialData?.level ?? 50}>
                {state.errors?.level && <p className="text-red-400 text-xs mt-1">{state.errors.level[0]}</p>}
              </FormField>
            </div>
            <div>
              <FormField label="Order Index" name="orderIndex" type="number" defaultValue={initialData?.orderIndex ?? 0} helpText="Lower numbers appear first.">
                {state.errors?.orderIndex && <p className="text-red-400 text-xs mt-1">{state.errors.orderIndex[0]}</p>}
              </FormField>
            </div>
          </div>
        </AdminFormSection>

        <FormActions 
          submitLabel={submitLabel} 
          cancelHref="/admin/skills" 
          isPending={isPending} 
        />
      </div>
    </form>
  );
}
