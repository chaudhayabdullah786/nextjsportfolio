'use server';

import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { createExperience, updateExperience, deleteExperience } from '@/lib/services/experiences';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ExperienceSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required').max(100),
  company: z.string().min(1, 'Company is required').max(100),
  location: z.string().max(100).optional().default(''),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().default(''),
  description: z.string().optional().default(''),
  isCurrent: z.boolean().default(false),
  orderIndex: z.coerce.number().int().min(0).default(0),
});

export type ExperienceActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createExperienceAction(
  _prevState: ExperienceActionState,
  formData: FormData
): Promise<ExperienceActionState> {
  await requireAdmin();

  const isCurrent = formData.get('isCurrent') === 'on';

  const parsed = ExperienceSchema.safeParse({
    jobTitle: formData.get('jobTitle'),
    company: formData.get('company'),
    location: formData.get('location') || '',
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate') || '',
    description: formData.get('description') || '',
    isCurrent,
    orderIndex: formData.get('orderIndex'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { startDate, endDate, ...rest } = parsed.data;

  const startDateObj = new Date(startDate);
  const endDateObj = endDate ? new Date(endDate) : null;

  if (endDateObj && endDateObj < startDateObj) {
    return { errors: { endDate: ['End date must be after start date'] } };
  }

  try {
    await createExperience({
      ...rest,
      location: rest.location || null,
      description: rest.description || null,
      startDate: startDateObj,
      endDate: isCurrent ? null : endDateObj,
    });
  } catch {
    return { message: 'Failed to create experience. Please try again.' };
  }

  revalidatePath('/admin/experience');
  redirect('/admin/experience');
}

export async function updateExperienceAction(
  id: number,
  _prevState: ExperienceActionState,
  formData: FormData
): Promise<ExperienceActionState> {
  await requireAdmin();

  const isCurrent = formData.get('isCurrent') === 'on';

  const parsed = ExperienceSchema.safeParse({
    jobTitle: formData.get('jobTitle'),
    company: formData.get('company'),
    location: formData.get('location') || '',
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate') || '',
    description: formData.get('description') || '',
    isCurrent,
    orderIndex: formData.get('orderIndex'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { startDate, endDate, ...rest } = parsed.data;

  const startDateObj = new Date(startDate);
  const endDateObj = endDate ? new Date(endDate) : null;

  if (endDateObj && endDateObj < startDateObj) {
    return { errors: { endDate: ['End date must be after start date'] } };
  }

  try {
    await updateExperience(id, {
      ...rest,
      location: rest.location || null,
      description: rest.description || null,
      startDate: startDateObj,
      endDate: isCurrent ? null : endDateObj,
    });
  } catch {
    return { message: 'Failed to update experience. Please try again.' };
  }

  revalidatePath('/admin/experience');
  redirect('/admin/experience');
}

export async function deleteExperienceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = parseInt(formData.get('id') as string, 10);
  if (isNaN(id)) throw new Error('Invalid experience ID');
  await deleteExperience(id);
  revalidatePath('/admin/experience');
}
