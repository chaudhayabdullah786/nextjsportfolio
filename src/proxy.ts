// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth/session";

/**
 * Next.js 16 edge proxy used for request‑level protection.
 * It intercepts all incoming requests, checks if the pathname starts with
 * "/admin" (excluding "/admin/login") and verifies an authenticated session.
 * If the user is not authenticated it redirects to the login page.
 *
 * This file is placed at the project root (src/proxy.ts) as required by
 * Next.js 16. The runtime is automatically inferred as "edge".
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and the admin login page
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Retrieve session from cookies (edge‑compatible)
  const session = await getSession();
  // Admin sessions store adminId when logged in
  if (session.adminId) {
    return NextResponse.next();
  }

  // Not authenticated – redirect to login preserving the original path
  const loginUrl = new URL("/admin/login", req.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Apply to all routes – the file name determines the scope in Next.js 16
  matcher: "/admin/:path*",
};
