import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { createClerkClient } from "@clerk/express";
import { eq } from "drizzle-orm";
import { db, usersTable, type User } from "@workspace/db";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const adminEmails = (process.env.AVA_ADMIN_EMAILS ?? "")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

/**
 * requireAuth: ensures Clerk session is present, then upserts the local user
 * record (JIT provisioning) and attaches it to req.user.
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const auth = getAuth(req);
    const clerkUserId = auth?.userId;
    if (!clerkUserId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkUserId, clerkUserId))
      .limit(1);

    if (existing.length > 0) {
      req.user = existing[0];
      next();
      return;
    }

    // First sign-in: provision local user from Clerk profile.
    const clerkUser = await clerkClient.users.getUser(clerkUserId);
    const email =
      clerkUser.primaryEmailAddress?.emailAddress ??
      clerkUser.emailAddresses[0]?.emailAddress ??
      "";
    const name =
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
      null;
    const role = adminEmails.includes(email.toLowerCase())
      ? "admin"
      : "client";

    const inserted = await db
      .insert(usersTable)
      .values({ clerkUserId, email, name, role })
      .onConflictDoNothing({ target: usersTable.clerkUserId })
      .returning();

    let user = inserted[0];
    if (!user) {
      const found = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.clerkUserId, clerkUserId))
        .limit(1);
      user = found[0];
    }
    if (!user) {
      res.status(500).json({ error: "Failed to provision user" });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    req.log?.error({ err }, "auth middleware failed");
    res.status(500).json({ error: "Auth check failed" });
  }
}

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ error: "Admin only" });
    return;
  }
  next();
}
