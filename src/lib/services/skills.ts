// src/lib/services/skills.ts
import { prisma } from "@/lib/db/prisma";
import type { Skill } from "@prisma/client";

export async function listSkills(): Promise<Skill[]> {
  return prisma.skill.findMany({ orderBy: { orderIndex: "asc" } });
}

export async function getSkillById(id: number): Promise<Skill | null> {
  return prisma.skill.findUnique({ where: { id } });
}

export async function createSkill(data: Omit<Skill, "id" | "createdAt">): Promise<Skill> {
  return prisma.skill.create({ data });
}

export async function updateSkill(id: number, data: Partial<Omit<Skill, "id" | "createdAt">>): Promise<Skill> {
  return prisma.skill.update({ where: { id }, data });
}

export async function deleteSkill(id: number): Promise<Skill> {
  return prisma.skill.delete({ where: { id } });
}
