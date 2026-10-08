/**
 * SQLite → PostgreSQL Migration Script
 *
 * Reads the PROTECTED, READ-ONLY legacy SQLite database:
 *   B:\portfolio\portfolio_before_nextjs_migration.db
 *
 * Dry-run by default. Pass --execute to actually insert into PostgreSQL.
 *
 * Usage:
 *   node scripts/migrate-data.mjs [--execute]
 *
 * Prerequisites:
 *   - DATABASE_URL set in .env.local (pointing to a dev PostgreSQL instance)
 *   - `prisma db push` already run against that database
 *   - Source SQLite DB is READ-ONLY (never written to by this script)
 */

import Database from "better-sqlite3";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Config ──────────────────────────────────────────────────────────────────

const SQLITE_PATH = path.resolve(
  __dirname,
  "../../portfolio_before_nextjs_migration.db"
);

const DRY_RUN = !process.argv.includes("--execute");

// ─── Validation log ───────────────────────────────────────────────────────────

const report = {
  tables: /** @type {Record<string, {source: number; migrated: number; failed: number; errors: string[]}>} */ ({}),
};

function initTable(name) {
  report.tables[name] = { source: 0, migrated: 0, failed: 0, errors: [] };
}

function recordSuccess(table) {
  report.tables[table].migrated++;
}

function recordFailure(table, id, err) {
  report.tables[table].failed++;
  report.tables[table].errors.push(`id=${id}: ${err.message}`);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Parse a SQLite date string (YYYY-MM-DD or ISO) into a JS Date.
 * Returns null if blank.
 */
function parseDate(val) {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=".repeat(60));
  console.log("Portfolio Data Migration");
  console.log(`Mode: ${DRY_RUN ? "DRY-RUN (pass --execute to apply)" : "EXECUTE"}`);
  console.log(`Source: ${SQLITE_PATH}`);
  console.log("=".repeat(60));

  // Open SQLite READ-ONLY
  const sqlite = new Database(SQLITE_PATH, { readonly: true, fileMustExist: true });
  console.log("✓ SQLite opened (read-only)");

  const prisma = DRY_RUN ? null : new PrismaClient();
  if (!DRY_RUN) console.log("✓ Prisma client connected");

  // ── 1. AdminUser ────────────────────────────────────────────────────────────
  {
    const TABLE = "admin_user";
    initTable(TABLE);
    const rows = sqlite.prepare("SELECT * FROM admin_user").all();
    report.tables[TABLE].source = rows.length;
    console.log(`\n[${TABLE}] ${rows.length} rows`);

    for (const row of rows) {
      if (DRY_RUN) {
        console.log(`  DRY-RUN: would insert AdminUser id=${row.id} username=${row.username}`);
        recordSuccess(TABLE);
        continue;
      }
      try {
        await prisma.adminUser.upsert({
          where: { id: row.id },
          update: {},
          create: {
            id: row.id,
            username: row.username,
            email: row.email,
            passwordHash: row.password_hash,
            createdAt: parseDate(row.created_at) ?? new Date(),
          },
        });
        recordSuccess(TABLE);
      } catch (err) {
        recordFailure(TABLE, row.id, err);
        console.error(`  ERROR AdminUser id=${row.id}:`, err.message);
      }
    }
  }

  // ── 2. Project ──────────────────────────────────────────────────────────────
  {
    const TABLE = "project";
    initTable(TABLE);
    const rows = sqlite.prepare("SELECT * FROM project").all();
    report.tables[TABLE].source = rows.length;
    console.log(`\n[${TABLE}] ${rows.length} rows`);

    for (const row of rows) {
      if (DRY_RUN) {
        console.log(`  DRY-RUN: would insert Project id=${row.id} title="${row.title}"`);
        recordSuccess(TABLE);
        continue;
      }
      try {
        await prisma.project.upsert({
          where: { id: row.id },
          update: {},
          create: {
            id: row.id,
            title: row.title,
            description: row.description,
            shortDescription: row.short_description ?? null,
            imagePath: row.image_path ?? null,
            category: row.category,
            techStack: row.tech_stack ?? null,
            tags: row.tags ?? null,
            githubLink: row.github_link ?? null,
            liveLink: row.live_link ?? null,
            isFeatured: Boolean(row.is_featured),
            orderIndex: row.order_index ?? 0,
            createdAt: parseDate(row.created_at) ?? new Date(),
          },
        });
        recordSuccess(TABLE);
      } catch (err) {
        recordFailure(TABLE, row.id, err);
        console.error(`  ERROR Project id=${row.id}:`, err.message);
      }
    }
  }

  // ── 3. Skill ────────────────────────────────────────────────────────────────
  {
    const TABLE = "skill";
    initTable(TABLE);
    const rows = sqlite.prepare("SELECT * FROM skill").all();
    report.tables[TABLE].source = rows.length;
    console.log(`\n[${TABLE}] ${rows.length} rows`);

    for (const row of rows) {
      if (DRY_RUN) {
        console.log(`  DRY-RUN: would insert Skill id=${row.id} name="${row.name}"`);
        recordSuccess(TABLE);
        continue;
      }
      try {
        await prisma.skill.upsert({
          where: { id: row.id },
          update: {},
          create: {
            id: row.id,
            name: row.name,
            category: row.category,
            level: row.level,
            orderIndex: row.order_index ?? 0,
            createdAt: parseDate(row.created_at) ?? new Date(),
          },
        });
        recordSuccess(TABLE);
      } catch (err) {
        recordFailure(TABLE, row.id, err);
        console.error(`  ERROR Skill id=${row.id}:`, err.message);
      }
    }
  }

  // ── 4. Experience ────────────────────────────────────────────────────────────
  {
    const TABLE = "experience";
    initTable(TABLE);
    const rows = sqlite.prepare("SELECT * FROM experience").all();
    report.tables[TABLE].source = rows.length;
    console.log(`\n[${TABLE}] ${rows.length} rows`);

    for (const row of rows) {
      if (DRY_RUN) {
        console.log(`  DRY-RUN: would insert Experience id=${row.id} title="${row.job_title}"`);
        recordSuccess(TABLE);
        continue;
      }
      try {
        await prisma.experience.upsert({
          where: { id: row.id },
          update: {},
          create: {
            id: row.id,
            jobTitle: row.job_title,
            company: row.company,
            location: row.location ?? null,
            startDate: parseDate(row.start_date) ?? new Date(),
            endDate: parseDate(row.end_date) ?? null,
            description: row.description ?? null,
            isCurrent: Boolean(row.is_current),
            orderIndex: row.order_index ?? 0,
            createdAt: parseDate(row.created_at) ?? new Date(),
          },
        });
        recordSuccess(TABLE);
      } catch (err) {
        recordFailure(TABLE, row.id, err);
        console.error(`  ERROR Experience id=${row.id}:`, err.message);
      }
    }
  }

  // ── 5. Certificate ──────────────────────────────────────────────────────────
  {
    const TABLE = "certificate";
    initTable(TABLE);
    const rows = sqlite.prepare("SELECT * FROM certificate").all();
    report.tables[TABLE].source = rows.length;
    console.log(`\n[${TABLE}] ${rows.length} rows`);

    for (const row of rows) {
      if (DRY_RUN) {
        console.log(`  DRY-RUN: would insert Certificate id=${row.id} title="${row.title}"`);
        recordSuccess(TABLE);
        continue;
      }
      try {
        await prisma.certificate.upsert({
          where: { id: row.id },
          update: {},
          create: {
            id: row.id,
            title: row.title,
            platform: row.platform,
            imagePath: row.image_path ?? null,
            pdfPath: row.pdf_path ?? null,
            issueDate: parseDate(row.issue_date) ?? new Date(),
            credentialUrl: row.credential_url ?? null,
            orderIndex: row.order_index ?? 0,
            createdAt: parseDate(row.created_at) ?? new Date(),
          },
        });
        recordSuccess(TABLE);
      } catch (err) {
        recordFailure(TABLE, row.id, err);
        console.error(`  ERROR Certificate id=${row.id}:`, err.message);
      }
    }
  }

  // ── 6. BlogPost ─────────────────────────────────────────────────────────────
  {
    const TABLE = "blog_post";
    initTable(TABLE);
    const rows = sqlite.prepare("SELECT * FROM blog_post").all();
    report.tables[TABLE].source = rows.length;
    console.log(`\n[${TABLE}] ${rows.length} rows`);

    for (const row of rows) {
      if (DRY_RUN) {
        console.log(`  DRY-RUN: would insert BlogPost id=${row.id} slug="${row.slug}"`);
        recordSuccess(TABLE);
        continue;
      }
      try {
        await prisma.blogPost.upsert({
          where: { id: row.id },
          update: {},
          create: {
            id: row.id,
            title: row.title,
            slug: row.slug,
            content: row.content,
            excerpt: row.excerpt ?? null,
            imagePath: row.image_path ?? null,
            tags: row.tags ?? null,
            isPublished: Boolean(row.is_published),
            createdAt: parseDate(row.created_at) ?? new Date(),
            updatedAt: parseDate(row.updated_at) ?? new Date(),
          },
        });
        recordSuccess(TABLE);
      } catch (err) {
        recordFailure(TABLE, row.id, err);
        console.error(`  ERROR BlogPost id=${row.id}:`, err.message);
      }
    }
  }

  // ── 7. Testimonial ──────────────────────────────────────────────────────────
  {
    const TABLE = "testimonial";
    initTable(TABLE);
    let rows = [];
    try {
      rows = sqlite.prepare("SELECT * FROM testimonial").all();
    } catch {
      console.log(`  [${TABLE}] Table not found in source — skipping.`);
    }
    report.tables[TABLE].source = rows.length;
    console.log(`\n[${TABLE}] ${rows.length} rows`);

    for (const row of rows) {
      if (DRY_RUN) {
        console.log(`  DRY-RUN: would insert Testimonial id=${row.id}`);
        recordSuccess(TABLE);
        continue;
      }
      try {
        await prisma.testimonial.upsert({
          where: { id: row.id },
          update: {},
          create: {
            id: row.id,
            name: row.name,
            role: row.role ?? null,
            company: row.company ?? null,
            message: row.message,
            rating: row.rating ?? 5,
            imagePath: row.image_path ?? null,
            isFeatured: Boolean(row.is_featured),
            orderIndex: row.order_index ?? 0,
            createdAt: parseDate(row.created_at) ?? new Date(),
          },
        });
        recordSuccess(TABLE);
      } catch (err) {
        recordFailure(TABLE, row.id, err);
        console.error(`  ERROR Testimonial id=${row.id}:`, err.message);
      }
    }
  }

  // ── 8. ContactMessage ───────────────────────────────────────────────────────
  {
    const TABLE = "contact_message";
    initTable(TABLE);
    const rows = sqlite.prepare("SELECT * FROM contact_message").all();
    report.tables[TABLE].source = rows.length;
    console.log(`\n[${TABLE}] ${rows.length} rows`);

    for (const row of rows) {
      if (DRY_RUN) {
        console.log(`  DRY-RUN: would insert ContactMessage id=${row.id}`);
        recordSuccess(TABLE);
        continue;
      }
      try {
        await prisma.contactMessage.upsert({
          where: { id: row.id },
          update: {},
          create: {
            id: row.id,
            name: row.name,
            email: row.email,
            subject: row.subject ?? null,
            message: row.message,
            isRead: Boolean(row.is_read),
            createdAt: parseDate(row.created_at) ?? new Date(),
          },
        });
        recordSuccess(TABLE);
      } catch (err) {
        recordFailure(TABLE, row.id, err);
        console.error(`  ERROR ContactMessage id=${row.id}:`, err.message);
      }
    }
  }

  // ── 9. SiteSettings ─────────────────────────────────────────────────────────
  {
    const TABLE = "site_settings";
    initTable(TABLE);
    const rows = sqlite.prepare("SELECT * FROM site_settings").all();
    report.tables[TABLE].source = rows.length;
    console.log(`\n[${TABLE}] ${rows.length} rows`);

    for (const row of rows) {
      if (DRY_RUN) {
        console.log(`  DRY-RUN: would insert SiteSettings key="${row.key}" value="${row.value}"`);
        recordSuccess(TABLE);
        continue;
      }
      try {
        await prisma.siteSettings.upsert({
          where: { key: row.key },
          update: { value: row.value ?? null },
          create: {
            id: row.id,
            key: row.key,
            value: row.value ?? null,
            description: row.description ?? null,
            createdAt: parseDate(row.created_at) ?? new Date(),
            updatedAt: parseDate(row.updated_at) ?? new Date(),
          },
        });
        recordSuccess(TABLE);
      } catch (err) {
        recordFailure(TABLE, row.id, err);
        console.error(`  ERROR SiteSettings id=${row.id}:`, err.message);
      }
    }
  }

  // ── 10. ClientWork ──────────────────────────────────────────────────────────
  {
    const TABLE = "client_work";
    initTable(TABLE);
    const rows = sqlite.prepare("SELECT * FROM client_work").all();
    report.tables[TABLE].source = rows.length;
    console.log(`\n[${TABLE}] ${rows.length} rows`);

    for (const row of rows) {
      if (DRY_RUN) {
        console.log(`  DRY-RUN: would insert ClientWork id=${row.id} title="${row.title}"`);
        recordSuccess(TABLE);
        continue;
      }
      try {
        await prisma.clientWork.upsert({
          where: { id: row.id },
          update: {},
          create: {
            id: row.id,
            title: row.title,
            clientName: row.client_name ?? null,
            publicClientLabel: row.public_client_label ?? null,
            showClientName: Boolean(row.show_client_name),
            category: row.category ?? null,
            shortDescription: row.short_description ?? null,
            thumbnailPath: row.thumbnail_path ?? null,
            videoUrl: row.video_url ?? null,
            videoPath: row.video_path ?? null,
            projectUrl: row.project_url ?? null,
            orderIndex: row.order_index ?? 0,
            isActive: Boolean(row.is_active),
            createdAt: parseDate(row.created_at) ?? new Date(),
            updatedAt: parseDate(row.updated_at) ?? new Date(),
          },
        });
        recordSuccess(TABLE);
      } catch (err) {
        recordFailure(TABLE, row.id, err);
        console.error(`  ERROR ClientWork id=${row.id}:`, err.message);
      }
    }
  }

  // ── Final report ─────────────────────────────────────────────────────────────
  sqlite.close();
  if (!DRY_RUN && prisma) await prisma.$disconnect();

  console.log("\n" + "=".repeat(60));
  console.log("MIGRATION REPORT");
  console.log("=".repeat(60));

  let totalSource = 0, totalMigrated = 0, totalFailed = 0;
  for (const [table, stats] of Object.entries(report.tables)) {
    const status = stats.failed === 0 ? "✓" : "✗";
    console.log(
      `${status} ${table.padEnd(20)} source=${stats.source}  migrated=${stats.migrated}  failed=${stats.failed}`
    );
    if (stats.errors.length > 0) {
      stats.errors.forEach((e) => console.error(`    ↳ ${e}`));
    }
    totalSource += stats.source;
    totalMigrated += stats.migrated;
    totalFailed += stats.failed;
  }

  console.log("-".repeat(60));
  console.log(
    `TOTAL: source=${totalSource}  migrated=${totalMigrated}  failed=${totalFailed}`
  );

  if (DRY_RUN) {
    console.log("\n[DRY-RUN] No data was written. Run with --execute to apply.");
  } else if (totalFailed === 0) {
    console.log("\n✓ Migration completed successfully. All records imported.");
  } else {
    console.log(
      `\n⚠ Migration completed with ${totalFailed} failure(s). Review errors above.`
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal migration error:", err);
  process.exit(1);
});
