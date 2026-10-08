// src/lib/auth/requireAdmin.ts
import { getSession } from "@/lib/auth/session";
import { NextResponse } from "next/server";

/**
 * Ensure the request has an authenticated admin session.
 * Returns the adminId if present, otherwise throws a redirect to login.
 */
export async function requireAdmin(): Promise<number> {
  const session = await getSession();
  const adminId = session.adminId;
  if (!adminId) {
    // Redirect to login preserving intended destination
    const loginUrl = new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
    // In server component we cannot access request path; fallback to /admin/login
    throw NextResponse.redirect(loginUrl);
  }
  return adminId;
}
