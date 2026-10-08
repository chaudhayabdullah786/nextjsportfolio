// src/lib/services/messages.ts
import { prisma } from "@/lib/db/prisma";
import type { ContactMessage } from "@prisma/client";

export async function listMessages(): Promise<ContactMessage[]> {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createMessage(data: Omit<ContactMessage, "id" | "createdAt" | "isRead">): Promise<ContactMessage> {
  return prisma.contactMessage.create({ data });
}

export async function markMessageRead(id: number): Promise<ContactMessage> {
  return prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
}

export async function deleteMessage(id: number): Promise<ContactMessage> {
  return prisma.contactMessage.delete({ where: { id } });
}
