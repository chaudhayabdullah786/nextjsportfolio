// src/app/admin/(protected)/blog/[id]/edit/page.tsx
import BlogForm from '@/app/admin/(protected)/blog/BlogForm';
import { getBlogPostById, updateBlogPostAction } from '@/app/admin/(protected)/blog/actions';
import { requireAdmin } from '@/lib/auth/requireAdmin';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  await requireAdmin();
  const blogId = parseInt(params.id, 10);
  const blog = await getBlogPostById(blogId);
  if (!blog) {
    return (
      <div className="py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gradient">Blog Post Not Found</h1>
        <p className="mt-4 text-[var(--color-text-muted)]">The requested blog post could not be found.</p>
      </div>
    );
  }

  const initialData = {
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    excerpt: blog.excerpt ?? '',
    isPublished: blog.isPublished,
    imagePath: blog.imagePath ?? undefined,
  };

  return (
    <section className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-gradient">Edit Blog Post</h1>
      <BlogForm
        action={(prevState, formData) => updateBlogPostAction(blog.id, prevState, formData)}
        initialData={initialData}
        submitLabel="Update Post"
      />
    </section>
  );
}
