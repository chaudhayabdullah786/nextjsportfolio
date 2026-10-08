import { requireAdmin } from '@/lib/auth/requireAdmin';
import AdminForm from './AdminForm';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export default async function NewAdminPage() {
  await requireAdmin();
  
  return (
    <div>
      <AdminPageHeader
        title="New Admin User"
        subtitle="Create a new administrator account."
        backHref="/admin/admins"
      />
      <AdminForm />
    </div>
  );
}
