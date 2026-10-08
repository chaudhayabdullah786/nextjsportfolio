// src/lib/services/blog.ts
import { prisma } from "@/lib/db/prisma";
import type { BlogPost } from "@prisma/client";

export async function listBlogPosts({ publishedOnly = false }: { publishedOnly?: boolean } = {}): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    where: publishedOnly ? { isPublished: true } : {},
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({ where: { id } });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function createBlogPost(data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
  return prisma.blogPost.create({ data });
}

export async function updateBlogPost(id: number, data: Partial<Omit<BlogPost, "id" | "createdAt" | "updatedAt">>): Promise<BlogPost> {
  return prisma.blogPost.update({ where: { id }, data });
}

export async function deleteBlogPost(id: number): Promise<BlogPost> {
  return prisma.blogPost.delete({ where: { id } });
}
