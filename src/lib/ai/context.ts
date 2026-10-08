/**
 * AI Context Builder — TypeScript port of services/ai_context.py
 *
 * Builds a read-only, privacy-safe snapshot of public portfolio records
 * for injection into the AI prompt. Runs server-side only.
 */

import { prisma } from "@/lib/db/prisma";
import { AIConfigValues } from "./config";

// ─── HTML stripper ──────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  // Remove script/style blocks first, then all remaining tags
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

export function normalizeText(
  text: string | null | undefined,
  maxLength = 500
): string | null {
  if (text == null) return null;
  let s = String(text).replace(/\x00/g, "");
  s = stripHtml(s);
  s = s.replace(/\s+/g, " ").trim();
  if (!s) return null;
  if (s.length > maxLength) return s.slice(0, maxLength).trimEnd() + "...";
  return s;
}

// ─── URL safety check (mirrors _is_safe_url) ────────────────────────────────

export function isSafeUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  const s = String(url).trim();

  // Reject control characters, backslashes, HTML chars
  if (/[\x00\\<>"']/.test(s)) return false;
  if ([...s].some((c) => c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127))
    return false;

  // Relative URL
  if (s.startsWith("/")) {
    if (s.startsWith("//")) return false;
    if (s.includes("/../") || s.endsWith("/..") || s.includes(".."))
      return false;
    const parts = s.split("/").filter(Boolean);
    if (parts[0] === "admin") return false;
    return true;
  }

  // Absolute URL
  try {
    const parsed = new URL(s);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    if (!parsed.hostname) return false;
    if (parsed.username || parsed.password) return false;
    const host = parsed.hostname.toLowerCase();
    if (["localhost", "127.0.0.1", "0.0.0.0"].includes(host) || host.endsWith(".local"))
      return false;
    if (!/^[a-z0-9.-]+$/.test(host)) return false;
    return true;
  } catch {
    return false;
  }
}

// ─── Context builder ─────────────────────────────────────────────────────────

export interface PortfolioContext {
  identity: {
    name: string;
    title: string;
    resumeUrl: string | null;
    contactUrl: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
  };
  projects: object[];
  skills: object[];
  certificates: object[];
  experiences: object[];
  blog_posts: object[];
  client_work: object[];
  contact: object;
  _metadata: {
    truncated: boolean;
    includedItems: number;
    approximateCharacters: number;
  };
}

async function getSetting(key: string): Promise<string | null> {
  const row = await prisma.siteSettings.findUnique({ where: { key } });
  return row?.value ?? null;
}

export async function buildPublicContext(
  config: AIConfigValues
): Promise<PortfolioContext> {
  const [githubUrl, linkedinUrl, resumeLink] = await Promise.all([
    getSetting("github_url"),
    getSetting("linkedin_url"),
    getSetting("resume_link"),
  ]);

  // 1. Identity
  const identity = {
    name: "Muhammad Abdullah",
    title: "Data Analyst & AI/ML Engineer",
    resumeUrl: resumeLink ? "/uploads/files/resume.pdf" : null,
    contactUrl: "/contact",
    githubUrl,
    linkedinUrl,
  };

  // 2. Projects
  const rawProjects = await prisma.project.findMany({
    orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
    take: config.maxRetrievedItems,
  });
  const projects = rawProjects.map((p) => ({
    type: "project",
    title: p.title,
    category: p.category,
    shortDescription: normalizeText(p.shortDescription, 200),
    description: normalizeText(p.description, 1000),
    techStack: p.techStack,
    tags: p.tags,
    liveUrl: isSafeUrl(p.liveLink) ? p.liveLink : null,
    githubUrl: isSafeUrl(p.githubLink) ? p.githubLink : null,
    sourceUrl: `/project/${p.id}`,
  }));

  // 3. Skills
  const rawSkills = await prisma.skill.findMany({
    orderBy: { orderIndex: "asc" },
    take: config.maxRetrievedItems * 2,
  });
  const skills = rawSkills.map((s) => ({
    type: "skill",
    name: s.name,
    category: s.category,
    level: s.level,
    sourceUrl: "/skills",
  }));

  // 4. Certificates
  const rawCerts = await prisma.certificate.findMany({
    orderBy: { issueDate: "desc" },
    take: config.maxRetrievedItems,
  });
  const certificates = rawCerts.map((c) => ({
    type: "certificate",
    title: c.title,
    platform: c.platform,
    issueDate: c.issueDate?.toISOString().split("T")[0] ?? null,
    credentialUrl: isSafeUrl(c.credentialUrl) ? c.credentialUrl : null,
    sourceUrl: "/about",
  }));

  // 5. Experience
  const rawExp = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
    take: config.maxRetrievedItems,
  });
  const experiences = rawExp.map((e) => ({
    type: "experience",
    jobTitle: e.jobTitle,
    company: e.company,
    location: e.location,
    startDate: e.startDate?.toISOString().split("T")[0] ?? null,
    endDate: e.endDate?.toISOString().split("T")[0] ?? "Present",
    description: normalizeText(e.description, 500),
    sourceUrl: "/about",
  }));

  // 6. Blog posts (published only)
  const rawBlogs = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: config.maxRetrievedItems,
  });
  const blog_posts = rawBlogs.map((b) => ({
    type: "blog_post",
    title: b.title,
    excerpt: normalizeText(b.excerpt, 300) ?? normalizeText(b.content, 300),
    tags: b.tags,
    sourceUrl: b.slug ? `/blog/${b.slug}` : "/blog",
  }));

  // 7. Client work (active only — privacy contract enforced)
  const rawCw = await prisma.clientWork.findMany({
    where: { isActive: true },
    orderBy: { orderIndex: "asc" },
    take: config.maxRetrievedItems,
  });
  const client_work = rawCw.map((cw) => {
    let clientLabel = "Confidential Client Project";
    if (cw.showClientName && cw.clientName?.trim()) {
      clientLabel = cw.clientName.trim();
    } else if (cw.publicClientLabel?.trim()) {
      clientLabel = cw.publicClientLabel.trim();
    }
    return {
      type: "client_work",
      title: cw.title,
      clientLabel,
      category: cw.category,
      shortDescription: normalizeText(cw.shortDescription, 300),
      projectUrl: isSafeUrl(cw.projectUrl) ? cw.projectUrl : null,
      videoUrl: isSafeUrl(cw.videoUrl) ? cw.videoUrl : null,
      sourceUrl: "/",
    };
  });

  // 8. Contact
  const contact = {
    contactUrl: "/contact",
    githubUrl,
    linkedinUrl,
  };

  // ── Context size enforcement ─────────────────────────────────────────────
  const ctx: Record<string, object[] | object> = {
    identity,
    projects,
    skills,
    certificates,
    experiences,
    blog_posts,
    client_work,
    contact,
  };

  const priorityOrder = [
    "client_work",
    "blog_posts",
    "certificates",
    "experiences",
    "skills",
    "projects",
  ];

  let truncated = false;
  while (JSON.stringify(ctx).length > config.maxContextChars) {
    let reduced = false;
    for (const cat of priorityOrder) {
      const arr = ctx[cat] as object[];
      if (arr && arr.length > 0) {
        arr.pop();
        truncated = true;
        reduced = true;
        break;
      }
    }
    if (!reduced) break;
  }

  const includedItems =
    (ctx.projects as object[]).length +
    (ctx.skills as object[]).length +
    (ctx.certificates as object[]).length +
    (ctx.experiences as object[]).length +
    (ctx.blog_posts as object[]).length +
    (ctx.client_work as object[]).length;

  return {
    ...(ctx as Omit<PortfolioContext, "_metadata">),
    _metadata: {
      truncated,
      includedItems,
      approximateCharacters: JSON.stringify(ctx).length,
    },
  } as PortfolioContext;
}
