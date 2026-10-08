import { requireAdmin } from '@/lib/auth/requireAdmin';
import { revalidatePath } from 'next/cache';
import { createBlogPost, deleteBlogPost, updateBlogPost, listBlogPosts, getBlogPostById } from '@/lib/services/blog';
import { z } from 'zod';
import { saveFile, deleteFile } from '@/lib/storage';
import sanitizeHtml from 'sanitize-html';

export type BlogActionState = {
  message?: string;
  errors?: Record<string, string[]>;
};

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  isPublished: z.string().optional(), // checkbox returns "on" when checked
});

export async function createBlogPostAction(prevState: BlogActionState, formData: FormData): Promise<BlogActionState> {
  'use server';
  await requireAdmin();
  const result = blogSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  const data = result.data;

  // duplicate slug check
  const existing = await listBlogPosts({}).then(posts => posts.find(p => p.slug === data.slug));
  if (existing) {
    return { errors: { slug: ['Slug must be unique'] } };
  }

  // handle image upload if provided
  let imagePath: string | null = null;
  const imageFile = formData.get('image') as File | null;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}_${imageFile.name}`;
    const savedPath = await saveFile(buffer, filename, 'uploads/blog');
    imagePath = savedPath;
  }

  // sanitize HTML content
  const safeContent = sanitizeHtml(data.content);

  try {
    await createBlogPost({
      title: data.title,
      slug: data.slug,
      content: safeContent,
      excerpt: data.excerpt?.toString() ?? null,
      isPublished: data.isPublished === 'on',
      imagePath,
      tags: null,
    });
    revalidatePath('/admin/blog');
    return { message: 'Blog post created successfully.' };
  } catch {
    return { message: 'Failed to create blog post.' };
  }
}

export async function updateBlogPostAction(id: number, prevState: BlogActionState, formData: FormData): Promise<BlogActionState> {
  'use server';
  await requireAdmin();
  const result = blogSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  const data = result.data;

  // duplicate slug check (exclude current)
  const existing = await listBlogPosts({}).then(posts => posts.find(p => p.slug === data.slug && p.id !== id));
  if (existing) {
    return { errors: { slug: ['Slug must be unique'] } };
  }

  // fetch current post to preserve image if not replaced
  const current = await getBlogPostById(id);
  if (!current) return { message: 'Blog post not found.' };

  // handle image upload
  let imagePath = current.imagePath;
  const imageFile = formData.get('image') as File | null;
  if (imageFile && imageFile.size > 0) {
    // delete old image
    if (current.imagePath) await deleteFile(current.imagePath);
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${Date.now()}_${imageFile.name}`;
    const savedPath = await saveFile(buffer, filename, 'uploads/blog');
    imagePath = savedPath;
  }

  const safeContent = sanitizeHtml(data.content);

  try {
    await updateBlogPost(id, {
      title: data.title,
      slug: data.slug,
      content: safeContent,
      excerpt: data.excerpt?.toString() ?? null,
      isPublished: data.isPublished === 'on',
      imagePath,
    });
    revalidatePath('/admin/blog');
    return { message: 'Blog post updated successfully.' };
  } catch {
    return { message: 'Failed to update blog post.' };
  }
}

export async function deleteBlogPostAction(formData: FormData): Promise<void> {
  'use server';
  await requireAdmin();
  const id = parseInt(formData.get('id') as string, 10);
  if (!isNaN(id)) {
    // delete image if exists
    const post = await getBlogPostById(id);
    if (post?.imagePath) await deleteFile(post.imagePath);
    await deleteBlogPost(id);
    revalidatePath('/admin/blog');
  }
}
export { getBlogPostById };
