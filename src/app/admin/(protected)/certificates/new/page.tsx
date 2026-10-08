import { requireAdmin } from '@/lib/auth/requireAdmin';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import CertificateForm from '../CertificateForm';
import { createCertificateAction } from '../actions';

export default async function NewCertificatePage() {
  await requireAdmin();

  return (
    <AdminFormLayout title="New Certificate" backHref="/admin/certificates">
      <CertificateForm action={createCertificateAction} submitLabel="Create Certificate" />
    </AdminFormLayout>
  );
}
