import { requireAdmin } from '@/lib/auth/requireAdmin';
import { getProjectById } from '@/lib/services/projects';
import { notFound } from 'next/navigation';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import ProjectForm from '../../ProjectForm';
import { updateProjectAction } from '../../actions';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const projectId = parseInt(id, 10);
  if (isNaN(projectId)) notFound();

  const project = await getProjectById(projectId);
  if (!project) notFound();

  const boundAction = updateProjectAction.bind(null, project.id);

  return (
    <AdminFormLayout title="Edit Project" backHref="/admin/projects">
      <ProjectForm
        action={boundAction}
        initialData={{
          title: project.title,
          description: project.description,
          shortDescription: project.shortDescription,
          category: project.category,
          techStack: project.techStack,
          tags: project.tags,
          githubLink: project.githubLink,
          liveLink: project.liveLink,
          isFeatured: project.isFeatured,
          orderIndex: project.orderIndex,
          imagePath: project.imagePath,
        }}
        submitLabel="Update Project"
      />
    </AdminFormLayout>
  );
}
