import { requireAdmin } from '@/lib/auth/requireAdmin';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import ClientWorkForm from '../ClientWorkForm';
import { createClientWorkAction } from '../actions';

export default async function NewClientWorkPage() {
  await requireAdmin();

  return (
    <AdminFormLayout title="New Client Work" backHref="/admin/client-work">
      <ClientWorkForm action={createClientWorkAction} submitLabel="Create Client Work" />
    </AdminFormLayout>
  );
}
