import type { MetadataRoute } from 'next';
import { listProjects } from '@/lib/services/projects';
import { listBlogPosts } from '@/lib/services/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const projects = await listProjects();
  const blogPosts = await listBlogPosts({ publishedOnly: true });

  const projectUrls = projects.map(p => ({
    url: `${baseUrl}/projects/${p.id}`,
    lastModified: p.createdAt,
  }));

  const blogUrls = blogPosts.map(p => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p.updatedAt,
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/skills`, lastModified: new Date() },
    { url: `${baseUrl}/experience`, lastModified: new Date() },
    { url: `${baseUrl}/certificates`, lastModified: new Date() },
    { url: `${baseUrl}/client-work`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...projectUrls,
    ...blogUrls,
  ];
}
