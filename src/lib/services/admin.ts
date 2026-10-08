// src/lib/services/admin.ts
import { prisma } from "@/lib/db/prisma";
import type { AdminUser } from "@prisma/client";

/**
 * Fetch an admin user by username.
 * Returns null if not found.
 */
export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  return prisma.adminUser.findUnique({
    where: { username }
  });
}
