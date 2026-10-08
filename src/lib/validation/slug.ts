import { z } from "zod";
export const slugSchema = z.string().min(1).max(150).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format");
