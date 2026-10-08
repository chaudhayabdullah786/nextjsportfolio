// src/lib/storage/local.ts
import { promises as fs } from "node:fs";
import { join, normalize } from "node:path";

// Base directory for public assets (Next.js serves files from the `public` folder)
const PUBLIC_ROOT = join(process.cwd(), "public");
const UPLOADS_ROOT = join(PUBLIC_ROOT, "uploads");

/** Ensure a directory exists, creating it recursively if needed. */
async function ensureDir(path: string) {
  await fs.mkdir(path, { recursive: true });
}

/**
 * Save a file buffer to a specific folder under `public/uploads`.
 * Returns the public URL path (e.g., "/uploads/certificates/abc.pdf").
 */
export async function saveFile(buffer: Buffer, filename: string, folder: string): Promise<string> {
  const safeFolder = folder.replace(/\.{2,}/g, ""); // basic sanitisation
  const targetDir = join(UPLOADS_ROOT, safeFolder);
  await ensureDir(targetDir);
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = join(targetDir, safeName);
  await fs.writeFile(filePath, buffer);
  // Public URL is relative to the site root
  return `/uploads/${safeFolder}/${safeName}`;
}

/** Delete a file previously saved via `saveFile`. The `publicPath` should be the URL returned by `saveFile`. */
export async function deleteFile(publicPath: string): Promise<void> {
  // Normalise to a file system path under `public`
  const normalized = normalize(publicPath);
  if (!normalized.startsWith("/uploads/")) {
    throw new Error("Invalid publicPath for deletion");
  }
  const filePath = join(PUBLIC_ROOT, normalized);
  await fs.unlink(filePath).catch(() => {
    // Swallow errors – file may already be missing
  });
}

/** Return the public URL for a stored asset – essentially identity in this implementation. */
export function getPublicUrl(publicPath: string): string {
  // Ensure it starts with a slash
  return publicPath.startsWith("/") ? publicPath : `/${publicPath}`;
}

export type UploadResult = {
  url: string;
  filename: string;
  size: number;
};
