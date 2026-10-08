import { requireAdmin } from '@/lib/auth/requireAdmin';
import { getExperienceById } from '@/lib/services/experiences';
import { notFound } from 'next/navigation';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import ExperienceForm from '../../ExperienceForm';
import { updateExperienceAction } from '../../actions';

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const experienceId = parseInt(id, 10);
  if (isNaN(experienceId)) notFound();

  const experience = await getExperienceById(experienceId);
  if (!experience) notFound();

  const boundAction = updateExperienceAction.bind(null, experience.id);

  return (
    <AdminFormLayout title="Edit Experience" backHref="/admin/experience">
      <ExperienceForm
        action={boundAction}
        initialData={{
          jobTitle: experience.jobTitle,
          company: experience.company,
          location: experience.location,
          startDate: experience.startDate.toISOString().split('T')[0],
          endDate: experience.endDate ? experience.endDate.toISOString().split('T')[0] : null,
          description: experience.description,
          isCurrent: experience.isCurrent,
          orderIndex: experience.orderIndex,
        }}
        submitLabel="Update Experience"
      />
    </AdminFormLayout>
  );
}
