// src/lib/services/projects.ts
import { prisma } from "@/lib/db/prisma";
import type { Project } from "@prisma/client";

/** List all projects, optionally filtered or ordered */
export async function listProjects({ featuredOnly = false }: { featuredOnly?: boolean } = {}): Promise<Project[]> {
  return prisma.project.findMany({
    where: featuredOnly ? { isFeatured: true } : {},
    orderBy: { orderIndex: "asc" },
  });
}

/** Get a single project by its numeric ID */
export async function getProjectById(id: number): Promise<Project | null> {
  return prisma.project.findUnique({ where: { id } });
}

/** Create a new project. Caller must provide validated data. */
export async function createProject(data: Omit<Project, "id" | "createdAt">): Promise<Project> {
  return prisma.project.create({ data });
}

/** Update an existing project by ID */
export async function updateProject(id: number, data: Partial<Omit<Project, "id" | "createdAt">>): Promise<Project> {
  return prisma.project.update({ where: { id }, data });
}

/** Delete a project by ID */
export async function deleteProject(id: number): Promise<Project> {
  return prisma.project.delete({ where: { id } });
}
