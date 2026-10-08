import { z } from "zod";
export const experienceSchema = z.object({
  jobTitle: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  location: z.string().max(100).optional().nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  description: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  orderIndex: z.number().int().default(0),
});
