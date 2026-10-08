'use server';

import { requireAdmin } from '@/lib/auth/requireAdmin';
import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function markMessageRead(id: number) {
  await requireAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
  revalidatePath('/admin/messages');
}

export async function deleteMessage(id: number) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath('/admin/messages');
}
