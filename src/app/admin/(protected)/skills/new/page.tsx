import { requireAdmin } from '@/lib/auth/requireAdmin';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import SkillForm from '../SkillForm';
import { createSkillAction } from '../actions';

export default async function NewSkillPage() {
  await requireAdmin();

  return (
    <AdminFormLayout title="New Skill" backHref="/admin/skills">
      <SkillForm action={createSkillAction} submitLabel="Create Skill" />
    </AdminFormLayout>
  );
}
