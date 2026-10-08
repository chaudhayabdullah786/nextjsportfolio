// src/lib/services/clientWork.ts
import { prisma } from "@/lib/db/prisma";
import type { ClientWork } from "@prisma/client";

export async function listClientWork({ activeOnly = false }: { activeOnly?: boolean } = {}): Promise<ClientWork[]> {
  return prisma.clientWork.findMany({
    where: activeOnly ? { isActive: true } : {},
    orderBy: { orderIndex: "asc" },
  });
}

export async function getClientWorkById(id: number): Promise<ClientWork | null> {
  return prisma.clientWork.findUnique({ where: { id } });
}

export async function createClientWork(data: Omit<ClientWork, "id" | "createdAt" | "updatedAt">): Promise<ClientWork> {
  return prisma.clientWork.create({ data });
}

export async function updateClientWork(id: number, data: Partial<Omit<ClientWork, "id" | "createdAt" | "updatedAt">>): Promise<ClientWork> {
  return prisma.clientWork.update({ where: { id }, data });
}

export async function deleteClientWork(id: number): Promise<ClientWork> {
  return prisma.clientWork.delete({ where: { id } });
}
