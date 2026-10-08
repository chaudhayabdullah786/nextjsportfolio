import { z } from "zod";

export const settingsSchema = z.object({
  key: z.string().min(1).max(50),
  value: z.string().optional().nullable(),
  description: z.string().max(200).optional().nullable(),
});
