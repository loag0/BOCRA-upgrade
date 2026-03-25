"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, getPostLoginRoute } from "@/lib/auth-context";

// Wraps auth pages (login, register, forgot-password).
// If the user is already signed in, replace-navigates them away
// so the back button can't return them to the auth form.
// Routes by role: admin/staff -> /admin, licensee -> /portal/licences, else -> /profile
export function GuestGuard({
  children,
  redirectTo,
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const { user, role, loading, roleLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !roleLoading) {
      const dest = redirectTo ?? getPostLoginRoute(role);
      router.replace(dest);
    }
  }, [user, role, loading, roleLoading, router, redirectTo]);

  // Don't render the form while checking auth or when about to redirect
  if (loading || user) return null;

  return <>{children}</>;
}
