import { requireAdmin } from '@/lib/auth/requireAdmin';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import ExperienceForm from '../ExperienceForm';
import { createExperienceAction } from '../actions';

export default async function NewExperiencePage() {
  await requireAdmin();

  return (
    <AdminFormLayout title="New Experience" backHref="/admin/experience">
      <ExperienceForm action={createExperienceAction} submitLabel="Create Experience" />
    </AdminFormLayout>
  );
}
