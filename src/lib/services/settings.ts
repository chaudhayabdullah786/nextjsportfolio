// src/lib/services/settings.ts
import { prisma } from "@/lib/db/prisma";
import type { SiteSettings } from "@prisma/client";

export async function getSettings(): Promise<Record<string, string>> {
  const settings = await prisma.siteSettings.findMany();
  const result: Record<string, string> = {};
  for (const s of settings) {
    if (s.value !== null) {
      result[s.key] = s.value;
    }
  }
  return result;
}

export async function listSettings(): Promise<SiteSettings[]> {
  return prisma.siteSettings.findMany({ orderBy: { key: "asc" } });
}

export async function updateSetting(key: string, value: string): Promise<SiteSettings> {
  return prisma.siteSettings.update({
    where: { key },
    data: { value }
  });
}
