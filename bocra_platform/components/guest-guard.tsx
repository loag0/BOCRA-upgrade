"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

// Wraps auth pages (login, register, forgot-password).
// If the user is already signed in, replace-navigates them away
// so the back button can't return them to the auth form.
export function GuestGuard({
  children,
  redirectTo = "/",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  // Don't render the form while checking auth or when about to redirect
  if (loading || user) return null;

  return <>{children}</>;
}
