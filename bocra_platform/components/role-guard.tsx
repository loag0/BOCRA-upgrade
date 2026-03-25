"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

/**
 * Protects routes that require staff or admin access.
 * - Unauthenticated users → /login
 * - Authenticated but no staff role → /unauthorized
 *
 * Role is set by Spring Boot after token verification.
 * Until that's wired up, `role` is always null and /admin is inaccessible
 * to everyone - which is the correct pre-launch behaviour.
 */
export function RoleGuard({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthorized =
    !loading && user !== null && (role === "staff" || role === "admin");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    // null = Spring Boot hasn't confirmed a role, treat as unauthorized
    if (role !== "staff" && role !== "admin") {
      router.replace("/unauthorized");
    }
  }, [loading, user, role, router, pathname]);

  if (loading || !isAuthorized) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="loading-dots">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
