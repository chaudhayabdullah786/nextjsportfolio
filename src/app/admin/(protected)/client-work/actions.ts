'use server';

import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { createClientWork, updateClientWork, deleteClientWork, getClientWorkById } from '@/lib/services/clientWork';
import { saveFile, deleteFile } from '@/lib/storage/index';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ClientWorkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120),
  clientName: z.string().max(100).optional().or(z.literal('')),
  publicClientLabel: z.string().max(100).optional().or(z.literal('')),
  showClientName: z.boolean().default(false),
  category: z.string().max(80).optional().or(z.literal('')),
  shortDescription: z.string().max(300).optional().or(z.literal('')),
  videoUrl: z.string().max(500).optional().or(z.literal('')),
  projectUrl: z.string().url().max(500).optional().or(z.literal('')),
  orderIndex: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type ClientWorkActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 30 * 1024 * 1024;
const ALLOWED_THUMBNAIL_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];

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

function validateExternalVideo(url: string | undefined): string | undefined {
  if (!url) return url;
  if (!url.match(/^https?:\/\//i)) {
    throw new Error('Video URL must start with http:// or https://');
  }
  if (!url.match(/(youtube\.com|youtu\.be|vimeo\.com)/i)) {
    throw new Error('Only YouTube or Vimeo external URLs are supported');
  }
  return url;
}

export async function createClientWorkAction(
  _prevState: ClientWorkActionState,
  formData: FormData
): Promise<ClientWorkActionState> {
  await requireAdmin();

  const showClientName = formData.get('showClientName') === 'on';
  const isActive = formData.get('isActive') === 'on';

  const parsed = ClientWorkSchema.safeParse({
    title: formData.get('title'),
    clientName: formData.get('clientName'),
    publicClientLabel: formData.get('publicClientLabel'),
    showClientName,
    category: formData.get('category'),
    shortDescription: formData.get('shortDescription'),
    videoUrl: formData.get('videoUrl'),
    projectUrl: formData.get('projectUrl'),
    orderIndex: formData.get('orderIndex'),
    isActive,
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    if (parsed.data.videoUrl) validateExternalVideo(parsed.data.videoUrl);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { videoUrl: [error.message] } };
    }
    return { message: 'Failed to create client work.' };
  }

  const thumbnailFile = formData.get('thumbnail') as File | null;
  const videoFile = formData.get('videoFile') as File | null;

  let thumbnailPath: string | null = null;
  let videoPath: string | null = null;

  try {
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnailPath = await handleFileUpload(thumbnailFile, 'client_work/thumbnails', MAX_THUMBNAIL_SIZE, ALLOWED_THUMBNAIL_TYPES);
    }
    if (videoFile && videoFile.size > 0) {
      videoPath = await handleFileUpload(videoFile, 'client_work/videos', MAX_VIDEO_SIZE, ALLOWED_VIDEO_TYPES);
    }

    await createClientWork({
      ...parsed.data,
      clientName: parsed.data.clientName || null,
      publicClientLabel: parsed.data.publicClientLabel || null,
      category: parsed.data.category || null,
      shortDescription: parsed.data.shortDescription || null,
      videoUrl: parsed.data.videoUrl || null,
      projectUrl: parsed.data.projectUrl || null,
      thumbnailPath,
      videoPath,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: 'Failed to create client work.' };
  }

  revalidatePath('/admin/client-work');
  redirect('/admin/client-work');
}

export async function updateClientWorkAction(
  id: number,
  _prevState: ClientWorkActionState,
  formData: FormData
): Promise<ClientWorkActionState> {
  await requireAdmin();

  const showClientName = formData.get('showClientName') === 'on';
  const isActive = formData.get('isActive') === 'on';

  const parsed = ClientWorkSchema.safeParse({
    title: formData.get('title'),
    clientName: formData.get('clientName'),
    publicClientLabel: formData.get('publicClientLabel'),
    showClientName,
    category: formData.get('category'),
    shortDescription: formData.get('shortDescription'),
    videoUrl: formData.get('videoUrl'),
    projectUrl: formData.get('projectUrl'),
    orderIndex: formData.get('orderIndex'),
    isActive,
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    if (parsed.data.videoUrl) validateExternalVideo(parsed.data.videoUrl);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { videoUrl: [error.message] } };
    }
    return { message: 'Failed to create client work.' };
  }

  const existingWork = await getClientWorkById(id);
  if (!existingWork) {
    return { message: 'Client work not found.' };
  }

  const thumbnailFile = formData.get('thumbnail') as File | null;
  const videoFile = formData.get('videoFile') as File | null;
  
  const removeThumbnail = formData.get('remove_thumbnail') === 'true';
  const removeVideo = formData.get('remove_videoFile') === 'true';

  let thumbnailPath = existingWork.thumbnailPath;
  let videoPath = existingWork.videoPath;

  try {
    if (removeThumbnail) {
      if (thumbnailPath) await deleteFile('/' + thumbnailPath).catch(() => {});
      thumbnailPath = null;
    } else if (thumbnailFile && thumbnailFile.size > 0) {
      if (thumbnailPath) await deleteFile('/' + thumbnailPath).catch(() => {});
      thumbnailPath = await handleFileUpload(thumbnailFile, 'client_work/thumbnails', MAX_THUMBNAIL_SIZE, ALLOWED_THUMBNAIL_TYPES);
    }

    if (removeVideo) {
      if (videoPath) await deleteFile('/' + videoPath).catch(() => {});
      videoPath = null;
    } else if (videoFile && videoFile.size > 0) {
      if (videoPath) await deleteFile('/' + videoPath).catch(() => {});
      videoPath = await handleFileUpload(videoFile, 'client_work/videos', MAX_VIDEO_SIZE, ALLOWED_VIDEO_TYPES);
    }

    await updateClientWork(id, {
      ...parsed.data,
      clientName: parsed.data.clientName || null,
      publicClientLabel: parsed.data.publicClientLabel || null,
      category: parsed.data.category || null,
      shortDescription: parsed.data.shortDescription || null,
      videoUrl: parsed.data.videoUrl || null,
      projectUrl: parsed.data.projectUrl || null,
      thumbnailPath,
      videoPath,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: 'Failed to update client work.' };
  }

  revalidatePath('/admin/client-work');
  redirect('/admin/client-work');
}

export async function deleteClientWorkAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = parseInt(formData.get('id') as string, 10);
  if (isNaN(id)) throw new Error('Invalid ID');
  
  const existing = await getClientWorkById(id);
  if (existing) {
    if (existing.thumbnailPath) await deleteFile('/' + existing.thumbnailPath).catch(() => {});
    if (existing.videoPath) await deleteFile('/' + existing.videoPath).catch(() => {});
    await deleteClientWork(id);
  }
  revalidatePath('/admin/client-work');
}
