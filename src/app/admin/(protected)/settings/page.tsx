import { PrismaClient } from '@prisma/client';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import SettingsTable from './SettingsTable';

const prisma = new PrismaClient();

export default async function SettingsPage() {
  await requireAdmin();

  const settings = await prisma.siteSettings.findMany({
    orderBy: { key: 'asc' },
  });

  return (
    <div>
      <AdminPageHeader
        title="Site Settings"
        subtitle="Manage public-facing site content and social links."
      />
      <SettingsTable settings={settings} />
    </div>
  );
}
