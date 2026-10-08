import { AdminShell } from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If the user reaches this layout, the proxy has already checked their session.
  // But we still call requireAdmin() to get the ID and double-check.
  await requireAdmin();
  
  return <AdminShell>{children}</AdminShell>;
}
