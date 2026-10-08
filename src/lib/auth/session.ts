// src/lib/auth/session.ts
import { SessionOptions, getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

export const sessionOptions: SessionOptions = {
  cookieName: "admin_session",
  password: process.env.AUTH_SECRET ?? "dev-secret-please-change-to-something-at-least-32-chars-long",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};

export interface SessionData {
  adminId?: number;
}

/**
 * Retrieve the current session (or create an empty one) from the request cookies.
 * The returned object is mutable – call `await session.save()` to persist.
 */
export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
