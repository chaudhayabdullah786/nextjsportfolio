// src/lib/storage/index.ts
import type { UploadResult } from "./local";
import { saveFile as saveFileLocal, deleteFile as deleteFileLocal, getPublicUrl as getPublicUrlLocal } from "./local";

/**
 * Save a file buffer to the uploads folder.
 * Returns a public URL (relative to the site root) that can be stored in the DB.
 */
export async function saveFile(buffer: Buffer, filename: string, folder: string): Promise<string> {
  // Currently only local storage is implemented.
  return saveFileLocal(buffer, filename, folder);
}

/** Delete a previously saved file by its public path. */
export async function deleteFile(publicPath: string): Promise<void> {
  return deleteFileLocal(publicPath);
}

/** Convert a storage path to a publicly accessible URL. */
export function getPublicUrl(publicPath: string): string {
  return getPublicUrlLocal(publicPath);
}

export type { UploadResult };
