/** Static Cloudflare Pages deploy has no Replit API unless proxied separately. */
export const isPortalApiExpected =
  import.meta.env.VITE_PORTAL_API_ENABLED === "true";

/** After Clerk sign-in: portal when API is live, home when static Pages only. */
export function getPostAuthRedirectUrl(): string {
  return isPortalApiExpected ? "/portal" : "/";
}

export async function apiFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`/api${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = (await res.json()) as { error?: string };
      if (data.error) msg = data.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return (await res.json()) as T;
}

export interface PortalUser {
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "client";
}

export interface PortalProject {
  id: string;
  clientUserId: string;
  title: string;
  description: string | null;
  status: "draft" | "in_review" | "approved" | "delivered";
  coverImagePath: string | null;
  createdAt: string;
}

export interface PortalVideo {
  id: string;
  projectId: string;
  title: string;
  objectPath: string;
  thumbnailPath: string | null;
  contentType: string | null;
  durationSec: number | null;
  position: number;
  createdAt: string;
}

export interface PortalComment {
  id: string;
  body: string;
  isApproval: boolean;
  createdAt: string;
  userId: string;
  userName: string | null;
  userEmail: string;
  userRole: "admin" | "client";
}

export interface PortalUpload {
  id: string;
  objectPath: string;
  name: string;
  contentType: string | null;
  size: number | null;
  note: string | null;
  createdAt: string;
  userId: string;
  userName: string | null;
  userEmail: string;
}

export interface PortalClient {
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "client";
  createdAt: string;
}
