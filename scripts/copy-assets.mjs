/**
 * Asset Copy Script
 *
 * COPIES (never moves) media assets from the Flask static directory
 * to the Next.js public directory.
 *
 * Source (READ-ONLY):
 *   B:\portfolio\flask-original\Professional_Portfolio\static
 *
 * Target (WRITE):
 *   B:\portfolio\nextjs-portfolio\public\uploads
 *
 * CERTIFICATE PATH REMAPPING:
 *   The recovered certificate files are stored in:
 *     static/uploads/images/     → certificate images
 *     static/uploads/pdfs/       → certificate PDFs
 *
 *   The database records reference paths like:
 *     uploads/certificates/images/<hash>.png
 *     uploads/certificates/pdfs/<hash>.pdf
 *
 *   This script copies them to the correct paths so
 *   Next.js public serving matches the database references.
 *
 * Usage:
 *   node scripts/copy-assets.mjs [--dry-run]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DRY_RUN = process.argv.includes("--dry-run");

const FLASK_STATIC = path.resolve(
  __dirname,
  "../../flask-original/Professional_Portfolio/static"
);
const NEXT_PUBLIC = path.resolve(__dirname, "../public");

// ─── Helper ───────────────────────────────────────────────────────────────────

function copyFile(src, dest) {
  if (DRY_RUN) {
    console.log(`  DRY-RUN copy: ${path.relative(FLASK_STATIC, src)} → ${path.relative(NEXT_PUBLIC, dest)}`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  COPY: ${path.relative(FLASK_STATIC, src)} → ${path.relative(NEXT_PUBLIC, dest)}`);
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`  WARN: source directory not found — ${srcDir}`);
    return;
  }
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log("=".repeat(60));
  console.log("Asset Copy Script");
  console.log(`Mode: ${DRY_RUN ? "DRY-RUN" : "EXECUTE"}`);
  console.log(`Source: ${FLASK_STATIC}`);
  console.log(`Target: ${NEXT_PUBLIC}`);
  console.log("=".repeat(60));

  if (!fs.existsSync(FLASK_STATIC)) {
    console.error(`ERROR: Flask static directory not found at ${FLASK_STATIC}`);
    process.exit(1);
  }

  // ── 1. Projects ──────────────────────────────────────────────────────────────
  console.log("\n[1] Copying project images...");
  copyDir(
    path.join(FLASK_STATIC, "uploads/projects"),
    path.join(NEXT_PUBLIC, "uploads/projects")
  );

  // ── 2. Blog ──────────────────────────────────────────────────────────────────
  console.log("\n[2] Copying blog images...");
  copyDir(
    path.join(FLASK_STATIC, "uploads/blog"),
    path.join(NEXT_PUBLIC, "uploads/blog")
  );

  // ── 3. Client Work thumbnails ────────────────────────────────────────────────
  console.log("\n[3] Copying client work thumbnails...");
  copyDir(
    path.join(FLASK_STATIC, "uploads/client_work/thumbnails"),
    path.join(NEXT_PUBLIC, "uploads/client_work/thumbnails")
  );

  // ── 4. Client Work videos ────────────────────────────────────────────────────
  console.log("\n[4] Copying client work videos...");
  copyDir(
    path.join(FLASK_STATIC, "uploads/client_work/videos"),
    path.join(NEXT_PUBLIC, "uploads/client_work/videos")
  );

  // ── 5. Certificate images (REMAPPED path) ────────────────────────────────────
  // Source: static/uploads/images/*.png|jpg
  // Target: public/uploads/certificates/images/
  console.log("\n[5] Copying certificate images (remapping path)...");
  const certImgSrc = path.join(FLASK_STATIC, "uploads/images");
  const certImgDest = path.join(NEXT_PUBLIC, "uploads/certificates/images");
  if (fs.existsSync(certImgSrc)) {
    for (const file of fs.readdirSync(certImgSrc)) {
      if (/\.(png|jpg|jpeg|webp)$/i.test(file)) {
        copyFile(path.join(certImgSrc, file), path.join(certImgDest, file));
      }
    }
  } else {
    console.warn(`  WARN: Certificate images source not found — ${certImgSrc}`);
  }

  // ── 6. Certificate PDFs (REMAPPED path) ─────────────────────────────────────
  // Source: static/uploads/pdfs/*.pdf
  // Target: public/uploads/certificates/pdfs/
  console.log("\n[6] Copying certificate PDFs (remapping path)...");
  const certPdfSrc = path.join(FLASK_STATIC, "uploads/pdfs");
  const certPdfDest = path.join(NEXT_PUBLIC, "uploads/certificates/pdfs");
  if (fs.existsSync(certPdfSrc)) {
    for (const file of fs.readdirSync(certPdfSrc)) {
      if (/\.pdf$/i.test(file)) {
        copyFile(path.join(certPdfSrc, file), path.join(certPdfDest, file));
      }
    }
  } else {
    console.warn(`  WARN: Certificate PDFs source not found — ${certPdfSrc}`);
  }

  // ── 7. Static files (resume, etc.) ───────────────────────────────────────────
  console.log("\n[7] Copying static files (resume, etc.)...");
  const filesSrc = path.join(FLASK_STATIC, "files");
  if (fs.existsSync(filesSrc)) {
    copyDir(filesSrc, path.join(NEXT_PUBLIC, "uploads/files"));
  } else {
    console.warn(`  WARN: static/files not found — skipping`);
  }

  console.log("\n" + "=".repeat(60));
  if (DRY_RUN) {
    console.log("DRY-RUN complete. No files were copied.");
    console.log("Run without --dry-run to execute the copy.");
  } else {
    console.log("Asset copy complete.");
  }
  console.log("=".repeat(60));

  // ── Certificate remapping documentation ──────────────────────────────────────
  console.log(`
CERTIFICATE PATH REMAPPING REFERENCE
------------------------------------
DB path format:  uploads/certificates/images/<hash>.png
DB path format:  uploads/certificates/pdfs/<hash>.pdf
Source (Flask):  static/uploads/images/<hash>.png
Source (Flask):  static/uploads/pdfs/<hash>.pdf
Target (Next):   public/uploads/certificates/images/<hash>.png
Target (Next):   public/uploads/certificates/pdfs/<hash>.pdf

When rendering certificate images in Next.js, use:
  src="/uploads/certificates/images/<hash>.png"
`);
}

main();
