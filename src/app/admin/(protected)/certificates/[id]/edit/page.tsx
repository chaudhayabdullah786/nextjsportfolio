import { requireAdmin } from '@/lib/auth/requireAdmin';
import { getCertificateById } from '@/lib/services/certificates';
import { notFound } from 'next/navigation';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import CertificateForm from '../../CertificateForm';
import { updateCertificateAction } from '../../actions';

export default async function EditCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const certId = parseInt(id, 10);
  if (isNaN(certId)) notFound();

  const certificate = await getCertificateById(certId);
  if (!certificate) notFound();

  const boundAction = updateCertificateAction.bind(null, certificate.id);

  return (
    <AdminFormLayout title="Edit Certificate" backHref="/admin/certificates">
      <CertificateForm
        action={boundAction}
        initialData={{
          title: certificate.title,
          platform: certificate.platform,
          issueDate: certificate.issueDate.toISOString().split('T')[0],
          credentialUrl: certificate.credentialUrl,
          orderIndex: certificate.orderIndex,
          imagePath: certificate.imagePath,
          pdfPath: certificate.pdfPath,
        }}
        submitLabel="Update Certificate"
      />
    </AdminFormLayout>
  );
}
