'use client';

import React from 'react';
import { useActionState } from 'react';
import type { CertificateActionState } from './actions';
import FileInput from '@/components/admin/FileInput';
import FormField from '@/components/admin/FormField';
import { AdminFormSection } from '@/components/admin/AdminFormSection';
import { FormActions } from '@/components/admin/FormActions';

interface CertificateFormProps {
  action: (state: CertificateActionState, formData: FormData) => Promise<CertificateActionState>;
  initialData?: {
    title: string;
    platform: string;
    issueDate: string;
    credentialUrl: string | null;
    orderIndex: number;
    imagePath: string | null;
    pdfPath: string | null;
  };
  submitLabel: string;
}

export default function CertificateForm({ action, initialData, submitLabel }: CertificateFormProps) {
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
            title="Certificate Information" 
            description="Basic details about the certification and issuer."
          >
            <FormField label="Title" name="title" required defaultValue={initialData?.title}>
              {state.errors?.title && <p className="text-red-400 text-xs mt-1">{state.errors.title[0]}</p>}
            </FormField>

            <FormField label="Issuer / Platform" name="platform" required defaultValue={initialData?.platform}>
              {state.errors?.platform && <p className="text-red-400 text-xs mt-1">{state.errors.platform[0]}</p>}
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <FormField label="Issue Date" name="issueDate" type="date" required defaultValue={initialData?.issueDate}>
                  {state.errors?.issueDate && <p className="text-red-400 text-xs mt-1">{state.errors.issueDate[0]}</p>}
                </FormField>
              </div>
              <div>
                <FormField label="Order Index" name="orderIndex" type="number" defaultValue={initialData?.orderIndex ?? 0} helpText="Lower numbers appear first.">
                  {state.errors?.orderIndex && <p className="text-red-400 text-xs mt-1">{state.errors.orderIndex[0]}</p>}
                </FormField>
              </div>
            </div>

            <FormField label="Credential URL" name="credentialUrl" type="url" placeholder="https://" defaultValue={initialData?.credentialUrl ?? ''}>
              {state.errors?.credentialUrl && <p className="text-red-400 text-xs mt-1">{state.errors.credentialUrl[0]}</p>}
            </FormField>
          </AdminFormSection>
        </div>

        {/* RIGHT - Media */}
        <div className="lg:col-span-1 space-y-6">
          <AdminFormSection 
            title="Media & Files" 
            description="Upload verification files."
          >
            <FileInput 
              label="Certificate Image" 
              name="image" 
              accept="image/jpeg, image/png, image/webp" 
              currentPath={initialData?.imagePath ? `/${initialData.imagePath}` : null}
              helpText="Thumbnail image for the certificate. Max 5MB."
            />
            
            <div className="border-t border-[var(--border-color)] my-5 pt-5">
              <FileInput 
                label="Certificate PDF" 
                name="pdf" 
                accept="application/pdf" 
                currentPath={initialData?.pdfPath ? `/${initialData.pdfPath}` : null}
                helpText="Full PDF document. Max 10MB."
              />
            </div>
          </AdminFormSection>
        </div>
      </div>

      <FormActions 
        submitLabel={submitLabel} 
        cancelHref="/admin/certificates" 
        isPending={isPending} 
      />
    </form>
  );
}
