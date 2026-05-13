import { type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Show, RedirectToSignIn, UserButton, useUser } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch, type PortalUser } from "@/lib/api";

export function usePortalUser() {
  return useQuery({
    queryKey: ["portal", "me"],
    queryFn: () => apiFetch<PortalUser>("/portal/me"),
  });
}

export default function PortalLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { user } = useUser();
  const me = usePortalUser();

  return (
    <>
      <Show when="signed-out">
        <RedirectToSignIn />
      </Show>
      <Show when="signed-in">
        <div className="min-h-screen bg-background text-white">
          <header className="border-b border-white/5 bg-background/80 backdrop-blur sticky top-0 z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Link href="/portal" className="font-display font-bold text-lg tracking-tight">
                  AVA <span className="text-primary">Portal</span>
                </Link>
                <nav className="hidden sm:flex items-center gap-5 text-sm">
                  <Link
                    href="/portal"
                    className={
                      location === "/portal"
                        ? "text-primary"
                        : "text-white/70 hover:text-white"
                    }
                  >
                    Projects
                  </Link>
                  {me.data?.role === "admin" && (
                    <Link
                      href="/admin"
                      className={
                        location.startsWith("/admin")
                          ? "text-primary"
                          : "text-white/70 hover:text-white"
                      }
                    >
                      Admin
                    </Link>
                  )}
                  <Link href="/" className="text-white/50 hover:text-white">
                    Back to site
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-xs text-white/50">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
                <UserButton />
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-10">{children}</main>
        </div>
      </Show>
    </>
  );
}
