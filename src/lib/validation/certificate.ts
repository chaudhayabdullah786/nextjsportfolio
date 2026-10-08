import { z } from "zod";
export const certificateSchema = z.object({
  title: z.string().min(1).max(100),
  platform: z.string().min(1).max(100),
  imagePath: z.string().max(200).optional().nullable(),
  pdfPath: z.string().max(200).optional().nullable(),
  issueDate: z.coerce.date(),
  credentialUrl: z.string().max(200).optional().nullable(),
  orderIndex: z.number().int().default(0),
});
