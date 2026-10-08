import { z } from "zod";

export const clientWorkSchema = z.object({
  title: z.string().min(1).max(120),
  clientName: z.string().max(100).optional().nullable(),
  publicClientLabel: z.string().max(100).optional().nullable(),
  showClientName: z.boolean().default(false),
  category: z.string().max(80).optional().nullable(),
  shortDescription: z.string().max(300).optional().nullable(),
  thumbnailPath: z.string().max(200).optional().nullable(),
  videoUrl: z.string().max(500).optional().nullable(),
  videoPath: z.string().max(200).optional().nullable(),
  projectUrl: z.string().max(500).optional().nullable(),
  orderIndex: z.number().int().default(0),
  isActive: z.boolean().default(true),
});
