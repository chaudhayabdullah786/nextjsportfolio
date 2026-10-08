import { z } from "zod";
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().max(200).optional().nullable(),
  imagePath: z.string().max(200).optional().nullable(),
  category: z.string().min(1, "Category is required").max(50),
  techStack: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  githubLink: z.string().max(200).optional().nullable(),
  liveLink: z.string().max(200).optional().nullable(),
  isFeatured: z.boolean().default(false),
  orderIndex: z.number().int().default(0),
});
