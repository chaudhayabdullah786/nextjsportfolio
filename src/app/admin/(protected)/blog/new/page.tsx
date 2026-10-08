// src/app/admin/(protected)/blog/new/page.tsx
import BlogForm from '@/app/admin/(protected)/blog/BlogForm';
import { createBlogPostAction } from '@/app/admin/(protected)/blog/actions';

export default function NewBlogPostPage() {
  return (
    <section className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-gradient">Create New Blog Post</h1>
      <BlogForm action={createBlogPostAction} submitLabel="Create Post" />
    </section>
  );
}
