"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

/**
 * Protects routes that require staff or admin access.
 * - Still loading auth/role → loading dots
 * - Unauthenticated users → /login
 * - Authenticated but no staff/admin role → /unauthorized
 */
export function RoleGuard({ children }: { children: React.ReactNode }) {
  const { user, role, loading, roleLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isReady = !loading && !roleLoading;
  const isAuthorized =
    isReady && user !== null && (role === "staff" || role === "admin");

  useEffect(() => {
    if (!isReady) return;
    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    if (role !== "staff" && role !== "admin") {
      router.replace("/unauthorized");
    }
  }, [isReady, user, role, router, pathname]);

  if (!isAuthorized) {
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
