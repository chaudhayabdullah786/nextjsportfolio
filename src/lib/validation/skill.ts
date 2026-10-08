import { z } from "zod";
export const skillSchema = z.object({
  name: z.string().min(1).max(100),
  category: z.string().min(1).max(50),
  level: z.number().int().min(1).max(100),
  orderIndex: z.number().int().default(0),
});
