// src/lib/services/experiences.ts
import { prisma } from "@/lib/db/prisma";
import type { Experience } from "@prisma/client";

export async function listExperiences(): Promise<Experience[]> {
  return prisma.experience.findMany({ orderBy: [{ isCurrent: 'desc' }, { startDate: 'desc' }] });
}

export async function getExperienceById(id: number): Promise<Experience | null> {
  return prisma.experience.findUnique({ where: { id } });
}

export async function createExperience(data: Omit<Experience, "id" | "createdAt">): Promise<Experience> {
  return prisma.experience.create({ data });
}

export async function updateExperience(id: number, data: Partial<Omit<Experience, "id" | "createdAt">>): Promise<Experience> {
  return prisma.experience.update({ where: { id }, data });
}

export async function deleteExperience(id: number): Promise<Experience> {
  return prisma.experience.delete({ where: { id } });
}
