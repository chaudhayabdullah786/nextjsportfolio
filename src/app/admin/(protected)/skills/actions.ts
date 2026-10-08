'use server';

import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { createSkill, updateSkill, deleteSkill } from '@/lib/services/skills';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const SkillSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  category: z.string().min(1, 'Category is required').max(50),
  level: z.coerce.number().int().min(1, 'Level must be 1-100').max(100, 'Level must be 1-100'),
  orderIndex: z.coerce.number().int().min(0).default(0),
});

export type SkillActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createSkillAction(
  _prevState: SkillActionState,
  formData: FormData
): Promise<SkillActionState> {
  await requireAdmin();

  const parsed = SkillSchema.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    level: formData.get('level'),
    orderIndex: formData.get('orderIndex'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await createSkill(parsed.data);
  } catch {
    return { message: 'Failed to create skill. Please try again.' };
  }

  revalidatePath('/admin/skills');
  redirect('/admin/skills');
}

export async function updateSkillAction(
  id: number,
  _prevState: SkillActionState,
  formData: FormData
): Promise<SkillActionState> {
  await requireAdmin();

  const parsed = SkillSchema.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    level: formData.get('level'),
    orderIndex: formData.get('orderIndex'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await updateSkill(id, parsed.data);
  } catch {
    return { message: 'Failed to update skill. Please try again.' };
  }

  revalidatePath('/admin/skills');
  redirect('/admin/skills');
}

export async function deleteSkillAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = parseInt(formData.get('id') as string, 10);
  if (isNaN(id)) throw new Error('Invalid skill ID');
  await deleteSkill(id);
  revalidatePath('/admin/skills');
}
