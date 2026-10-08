'use server';

import { requireAdmin } from '@/lib/auth/requireAdmin';
import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import { generateWerkzeugScrypt } from '@/lib/auth/password';

const prisma = new PrismaClient();

export async function deleteAdmin(id: number) {
  const currentAdminId = await requireAdmin();
  
  if (id === currentAdminId) {
    throw new Error('You cannot delete your own account!');
  }

  await prisma.adminUser.delete({ where: { id } });
  revalidatePath('/admin/admins');
}

export async function createAdmin(formData: FormData) {
  await requireAdmin();
  
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!username || !email || !password) {
    throw new Error('Please fill in all fields.');
  }

  const existingUser = await prisma.adminUser.findFirst({
    where: {
      OR: [
        { username },
        { email }
      ]
    }
  });

  if (existingUser) {
    throw new Error('Username or email already exists!');
  }

  const passwordHash = await generateWerkzeugScrypt(password);

  await prisma.adminUser.create({
    data: {
      username,
      email,
      passwordHash,
    }
  });

  revalidatePath('/admin/admins');
}
