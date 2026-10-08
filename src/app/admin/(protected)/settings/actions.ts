'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth/requireAdmin';

const prisma = new PrismaClient();

export async function updateSetting(key: string, value: string) {
  await requireAdmin();
  
  if (!key) {
    throw new Error('Key is required');
  }

  // Check existence
  const existing = await prisma.siteSettings.findUnique({ where: { key } });
  if (!existing) {
    throw new Error('Setting not found');
  }

  await prisma.siteSettings.update({
    where: { key },
    data: { value },
  });

  revalidatePath('/admin/settings');
}
