import { requireAdmin } from '@/lib/auth/requireAdmin';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import ProjectForm from '../ProjectForm';
import { createProjectAction } from '../actions';

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <AdminFormLayout title="New Project" backHref="/admin/projects">
      <ProjectForm action={createProjectAction} submitLabel="Create Project" />
    </AdminFormLayout>
  );
}
