import { PrismaClient } from '@prisma/client';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import AdminList from './AdminList';

const prisma = new PrismaClient();

export default async function AdminsPage() {
  const currentUserId = await requireAdmin();

  const admins = await prisma.adminUser.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    }
  });

  return (
    <div>
      <AdminList admins={admins} currentUserId={currentUserId} />
    </div>
  );
}
