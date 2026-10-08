'use server';

import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { createProject, updateProject, deleteProject, getProjectById } from '@/lib/services/projects';
import { saveFile, deleteFile } from '@/lib/storage/index';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().max(200).optional().or(z.literal('')),
  category: z.string().min(1, 'Category is required').max(50),
  techStack: z.string().optional().or(z.literal('')),
  tags: z.string().optional().or(z.literal('')),
  githubLink: z.string().url().max(200).optional().or(z.literal('')),
  liveLink: z.string().url().max(200).optional().or(z.literal('')),
  isFeatured: z.boolean().default(false),
  orderIndex: z.coerce.number().int().min(0).default(0),
});

export type ProjectActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

async function handleFileUpload(file: File, folder: string, max_size: number, allowed_types: string[]): Promise<string | null> {
  if (file.size === 0 || file.name === 'undefined') return null;
  if (!allowed_types.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed: ${allowed_types.join(', ')}`);
  }
  if (file.size > max_size) {
    throw new Error(`File too large. Max size: ${max_size / 1024 / 1024}MB`);
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const publicUrl = await saveFile(buffer, file.name, folder);
  return publicUrl.replace(/^\//, '');
}

export async function createProjectAction(
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin();

  const isFeatured = formData.get('isFeatured') === 'on';

  const parsed = ProjectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    shortDescription: formData.get('shortDescription'),
    category: formData.get('category'),
    techStack: formData.get('techStack'),
    tags: formData.get('tags'),
    githubLink: formData.get('githubLink'),
    liveLink: formData.get('liveLink'),
    isFeatured,
    orderIndex: formData.get('orderIndex'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const imageFile = formData.get('image') as File | null;
  let imagePath: string | null = null;

  try {
    if (imageFile && imageFile.size > 0) {
      imagePath = await handleFileUpload(imageFile, 'projects', MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES);
    }

    await createProject({
      ...parsed.data,
      shortDescription: parsed.data.shortDescription || null,
      techStack: parsed.data.techStack || null,
      tags: parsed.data.tags || null,
      githubLink: parsed.data.githubLink || null,
      liveLink: parsed.data.liveLink || null,
      imagePath,
    });
  } catch (error: unknown) {
    return { message: error instanceof Error ? error.message : 'Failed to create project.' };
  }

  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function updateProjectAction(
  id: number,
  _prevState: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin();

  const isFeatured = formData.get('isFeatured') === 'on';

  const parsed = ProjectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    shortDescription: formData.get('shortDescription'),
    category: formData.get('category'),
    techStack: formData.get('techStack'),
    tags: formData.get('tags'),
    githubLink: formData.get('githubLink'),
    liveLink: formData.get('liveLink'),
    isFeatured,
    orderIndex: formData.get('orderIndex'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const existing = await getProjectById(id);
  if (!existing) {
    return { message: 'Project not found.' };
  }

  const imageFile = formData.get('image') as File | null;
  const removeImage = formData.get('remove_image') === 'true';

  let imagePath = existing.imagePath;

  try {
    if (removeImage) {
      if (imagePath) await deleteFile('/' + imagePath).catch(() => {});
      imagePath = null;
    } else if (imageFile && imageFile.size > 0) {
      if (imagePath) await deleteFile('/' + imagePath).catch(() => {});
      imagePath = await handleFileUpload(imageFile, 'projects', MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES);
    }

    await updateProject(id, {
      ...parsed.data,
      shortDescription: parsed.data.shortDescription || null,
      techStack: parsed.data.techStack || null,
      tags: parsed.data.tags || null,
      githubLink: parsed.data.githubLink || null,
      liveLink: parsed.data.liveLink || null,
      imagePath,
    });
  } catch (error: unknown) {
    return { message: error instanceof Error ? error.message : 'Failed to update project.' };
  }

  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = parseInt(formData.get('id') as string, 10);
  if (isNaN(id)) throw new Error('Invalid project ID');
  
  const existing = await getProjectById(id);
  if (existing && existing.imagePath) {
    await deleteFile('/' + existing.imagePath).catch(() => {});
  }
  await deleteProject(id);
  
  revalidatePath('/admin/projects');
}
