// src/lib/validation/admin.ts
import { z } from "zod";

/**
 * Schema for admin login request.
 * - username: non‑empty string, max 64 chars
 * - password: non‑empty string, max 128 chars (no length restriction on actual password)
 */
export const adminLoginSchema = z.object({
  username: z.string().min(1).max(64),
  password: z.string().min(1).max(128),
});
