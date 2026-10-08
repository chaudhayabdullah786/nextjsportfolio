import { z } from "zod";
import { slugSchema } from "./slug";

export const blogSchema = z.object({
  title: z.string().min(1).max(150),
  slug: slugSchema,
  content: z.string().min(1),
  excerpt: z.string().max(300).optional().nullable(),
  imagePath: z.string().max(200).optional().nullable(),
  tags: z.string().optional().nullable(),
  isPublished: z.boolean().default(false),
});
