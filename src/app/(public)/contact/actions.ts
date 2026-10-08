'use server';
import { contactSchema } from '@/lib/validation/contact';
import { createMessage } from '@/lib/services/messages';

// Simple in-memory rate limiter for development (per IP/session simulation)
// In production, use Redis or DB.
const rateLimitMap = new Map<string, { count: number; lastTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function submitContact(formData: FormData) {
  // In a real app we'd use headers().get('x-forwarded-for') but this is a simplified simulation
  const ip = "default-ip"; 
  const now = Date.now();
  const limitData = rateLimitMap.get(ip) || { count: 0, lastTime: now };
  if (now - limitData.lastTime > RATE_LIMIT_WINDOW) {
    limitData.count = 1;
    limitData.lastTime = now;
  } else {
    limitData.count++;
  }
  rateLimitMap.set(ip, limitData);
  
  if (limitData.count > MAX_REQUESTS) {
    return { ok: false, error: "Too many requests. Please try again later." };
  }

  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };
  
  const parsed = contactSchema.safeParse(rawData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }
  
  try {
    await createMessage({
      ...parsed.data,
      subject: parsed.data.subject ?? null
    });
    return { ok: true };
  } catch (error) {
    console.error("Failed to save message:", error);
    return { ok: false, error: "Internal server error" };
  }
}
