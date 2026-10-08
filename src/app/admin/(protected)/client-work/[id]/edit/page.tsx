import { requireAdmin } from '@/lib/auth/requireAdmin';
import { getClientWorkById } from '@/lib/services/clientWork';
import { notFound } from 'next/navigation';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import ClientWorkForm from '../../ClientWorkForm';
import { updateClientWorkAction } from '../../actions';

export default async function EditClientWorkPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const workId = parseInt(id, 10);
  if (isNaN(workId)) notFound();

  const work = await getClientWorkById(workId);
  if (!work) notFound();

  const boundAction = updateClientWorkAction.bind(null, work.id);

  return (
    <AdminFormLayout title="Edit Client Work" backHref="/admin/client-work">
      <ClientWorkForm
        action={boundAction}
        initialData={{
          title: work.title,
          clientName: work.clientName,
          publicClientLabel: work.publicClientLabel,
          showClientName: work.showClientName,
          category: work.category,
          shortDescription: work.shortDescription,
          videoUrl: work.videoUrl,
          projectUrl: work.projectUrl,
          orderIndex: work.orderIndex,
          isActive: work.isActive,
          thumbnailPath: work.thumbnailPath,
          videoPath: work.videoPath,
        }}
        submitLabel="Update Client Work"
      />
    </AdminFormLayout>
  );
}
