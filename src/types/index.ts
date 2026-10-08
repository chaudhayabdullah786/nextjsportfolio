/**
 * TypeScript types derived from the Prisma schema / legacy Flask models.
 * These are used throughout the application for type safety.
 */

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription: string | null;
  imagePath: string | null;
  category: string;
  techStack: string | null;   // JSON string — parse with JSON.parse()
  tags: string | null;        // comma-separated
  githubLink: string | null;
  liveLink: string | null;
  isFeatured: boolean;
  orderIndex: number;
  createdAt: Date;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;             // 1–100
  orderIndex: number;
  createdAt: Date;
}

export interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;      // null = current
  description: string | null;
  isCurrent: boolean;
  orderIndex: number;
  createdAt: Date;
}

export interface Certificate {
  id: number;
  title: string;
  platform: string;
  imagePath: string | null;
  pdfPath: string | null;
  issueDate: Date;
  credentialUrl: string | null;
  orderIndex: number;
  createdAt: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  imagePath: string | null;
  tags: string | null;      // comma-separated
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  message: string;
  rating: number;           // 1–5
  imagePath: string | null;
  isFeatured: boolean;
  orderIndex: number;
  createdAt: Date;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface SiteSettings {
  id: number;
  key: string;
  value: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientWork {
  id: number;
  title: string;
  clientName: string | null;        // PRIVATE
  publicClientLabel: string | null; // Safe for public display
  showClientName: boolean;
  category: string | null;
  shortDescription: string | null;
  thumbnailPath: string | null;
  videoUrl: string | null;
  videoPath: string | null;
  projectUrl: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ------------- AI Assistant types (mirroring services/ Python types) ----------

export interface AIConfig {
  enabled: boolean;
  provider: string;
  model: string;
  timeoutSeconds: number;
  maxInputChars: number;
  maxOutputTokens: number;
  maxHistoryMessages: number;
  maxHistoryChars: number;
  maxContextChars: number;
  maxRetrievedItems: number;
  maxPromptChars: number;
  rateLimitPerMinute: number;
  rateLimitPerDay: number;
  maxRequestBytes: number;
  configured: boolean;
  ready: boolean;
}

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface AssistantResult {
  answer: string;
  sources: ContextSource[];
  provider: string;
  model: string;
  retrievedItemsCount: number;
}

export interface ContextSource {
  type: string;
  title: string;
  url: string;
}

export interface ChatRequest {
  message: string;
  history: ChatHistoryItem[];
}

export interface ChatResponse {
  ok: boolean;
  answer?: string;
  sources?: ContextSource[];
  error?: {
    code: string;
    message: string;
  };
}
