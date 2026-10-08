import { requireAdmin } from '@/lib/auth/requireAdmin';
import { getSkillById } from '@/lib/services/skills';
import { notFound } from 'next/navigation';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import SkillForm from '../../SkillForm';
import { updateSkillAction } from '../../actions';

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const skillId = parseInt(id, 10);
  if (isNaN(skillId)) notFound();

  const skill = await getSkillById(skillId);
  if (!skill) notFound();

  const boundAction = updateSkillAction.bind(null, skill.id);

  return (
    <AdminFormLayout title="Edit Skill" backHref="/admin/skills">
      <SkillForm
        action={boundAction}
        initialData={{
          name: skill.name,
          category: skill.category,
          level: skill.level,
          orderIndex: skill.orderIndex,
        }}
        submitLabel="Update Skill"
      />
    </AdminFormLayout>
  );
}
