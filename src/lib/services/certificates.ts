// src/lib/services/certificates.ts
import { prisma } from "@/lib/db/prisma";
import type { Certificate } from "@prisma/client";

export async function listCertificates(): Promise<Certificate[]> {
  return prisma.certificate.findMany({ orderBy: { orderIndex: "asc" } });
}

export async function getCertificateById(id: number): Promise<Certificate | null> {
  return prisma.certificate.findUnique({ where: { id } });
}

export async function createCertificate(data: Omit<Certificate, "id" | "createdAt">): Promise<Certificate> {
  return prisma.certificate.create({ data });
}

export async function updateCertificate(id: number, data: Partial<Omit<Certificate, "id" | "createdAt">>): Promise<Certificate> {
  return prisma.certificate.update({ where: { id }, data });
}

export async function deleteCertificate(id: number): Promise<Certificate> {
  return prisma.certificate.delete({ where: { id } });
}
