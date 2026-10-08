'use server';

import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { createCertificate, updateCertificate, deleteCertificate, getCertificateById } from '@/lib/services/certificates';
import { saveFile, deleteFile } from '@/lib/storage/index';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const CertificateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  platform: z.string().min(1, 'Platform is required').max(100),
  issueDate: z.string().min(1, 'Issue date is required'),
  credentialUrl: z.string().url().max(200).optional().or(z.literal('')),
  orderIndex: z.coerce.number().int().min(0).default(0),
});

export type CertificateActionState = {
  errors?: Record<string, string[]>;
  message?: string;
};

// 5MB for images, 10MB for PDFs
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_PDF_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_PDF_TYPES = ['application/pdf'];

async function handleFileUpload(file: File, folder: string, max_size: number, allowed_types: string[]): Promise<string | null> {
  if (file.size === 0 || file.name === 'undefined') return null;
  
  if (!allowed_types.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed: ${allowed_types.join(', ')}`);
  }
  
  if (file.size > max_size) {
    throw new Error(`File too large. Max size: ${max_size / 1024 / 1024}MB`);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  // storage returns relative public URL like /uploads/certificates/images/filename.jpg
  // But legacy DB stores them without the leading slash (e.g. uploads/certificates/images/filename.jpg)
  // Our NextJS local.ts storage implementation returns `/uploads/folder/filename`.
  // We'll strip the leading slash to match the legacy format expected by the DB model, 
  // or we can keep it if our DB accepts it. The legacy model says "uploads/certificates/images/...".
  const publicUrl = await saveFile(buffer, file.name, folder);
  return publicUrl.replace(/^\//, ''); // Strip leading slash to match DB format
}

export async function createCertificateAction(
  _prevState: CertificateActionState,
  formData: FormData
): Promise<CertificateActionState> {
  await requireAdmin();

  const parsed = CertificateSchema.safeParse({
    title: formData.get('title'),
    platform: formData.get('platform'),
    issueDate: formData.get('issueDate'),
    credentialUrl: formData.get('credentialUrl'),
    orderIndex: formData.get('orderIndex'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const imageFile = formData.get('image') as File | null;
  const pdfFile = formData.get('pdf') as File | null;

  let imagePath: string | null = null;
  let pdfPath: string | null = null;

  try {
    if (imageFile && imageFile.size > 0) {
      imagePath = await handleFileUpload(imageFile, 'certificates/images', MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES);
    }
    if (pdfFile && pdfFile.size > 0) {
      pdfPath = await handleFileUpload(pdfFile, 'certificates/pdfs', MAX_PDF_SIZE, ALLOWED_PDF_TYPES);
    }

    await createCertificate({
      ...parsed.data,
      credentialUrl: parsed.data.credentialUrl || null,
      issueDate: new Date(parsed.data.issueDate),
      imagePath,
      pdfPath,
    });
  } catch (error: unknown) {
    // If saving to DB fails, we should ideally rollback files, but keeping it simple as error message
    return { message: error instanceof Error ? error.message : 'Failed to create certificate.' };
  }

  revalidatePath('/admin/certificates');
  redirect('/admin/certificates');
}

export async function updateCertificateAction(
  id: number,
  _prevState: CertificateActionState,
  formData: FormData
): Promise<CertificateActionState> {
  await requireAdmin();

  const parsed = CertificateSchema.safeParse({
    title: formData.get('title'),
    platform: formData.get('platform'),
    issueDate: formData.get('issueDate'),
    credentialUrl: formData.get('credentialUrl'),
    orderIndex: formData.get('orderIndex'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const existingCert = await getCertificateById(id);
  if (!existingCert) {
    return { message: 'Certificate not found.' };
  }

  const imageFile = formData.get('image') as File | null;
  const pdfFile = formData.get('pdf') as File | null;
  
  const removeImage = formData.get('remove_image') === 'true';
  const removePdf = formData.get('remove_pdf') === 'true';

  let imagePath = existingCert.imagePath;
  let pdfPath = existingCert.pdfPath;

  try {
    // Handle image update/removal
    if (removeImage) {
      if (imagePath) await deleteFile('/' + imagePath).catch(() => {});
      imagePath = null;
    } else if (imageFile && imageFile.size > 0) {
      if (imagePath) await deleteFile('/' + imagePath).catch(() => {});
      imagePath = await handleFileUpload(imageFile, 'certificates/images', MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES);
    }

    // Handle PDF update/removal
    if (removePdf) {
      if (pdfPath) await deleteFile('/' + pdfPath).catch(() => {});
      pdfPath = null;
    } else if (pdfFile && pdfFile.size > 0) {
      if (pdfPath) await deleteFile('/' + pdfPath).catch(() => {});
      pdfPath = await handleFileUpload(pdfFile, 'certificates/pdfs', MAX_PDF_SIZE, ALLOWED_PDF_TYPES);
    }

    await updateCertificate(id, {
      ...parsed.data,
      credentialUrl: parsed.data.credentialUrl || null,
      issueDate: new Date(parsed.data.issueDate),
      imagePath,
      pdfPath,
    });
  } catch (error: unknown) {
    return { message: error instanceof Error ? error.message : 'Failed to update certificate.' };
  }

  revalidatePath('/admin/certificates');
  redirect('/admin/certificates');
}

export async function deleteCertificateAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = parseInt(formData.get('id') as string, 10);
  if (isNaN(id)) throw new Error('Invalid certificate ID');
  
  const existingCert = await getCertificateById(id);
  if (existingCert) {
    if (existingCert.imagePath) await deleteFile('/' + existingCert.imagePath).catch(() => {});
    if (existingCert.pdfPath) await deleteFile('/' + existingCert.pdfPath).catch(() => {});
    await deleteCertificate(id);
  }
  
  revalidatePath('/admin/certificates');
}
