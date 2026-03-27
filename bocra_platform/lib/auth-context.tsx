"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { auth, signOut } from "@/lib/firebase";
import { logger } from "@/lib/logger";
import type { UserRole } from "@/types";

/**
 * Admin accounts loaded from NEXT_PUBLIC_ADMIN_EMAILS env var.
 * These emails get the "admin" role regardless of backend response.
 * Once Spring Boot role management is fully live, this can be removed.
 */
const ADMIN_EMAILS: string[] = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export type { UserRole };

/** Idle timeout in milliseconds (30 minutes) */
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;

interface AuthContextValue {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  /** True while the role is still being resolved (user is signed in but role fetch is in-flight). */
  roleLoading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  role: null,
  loading: true,
  roleLoading: false,
});

/**
 * Returns the post-login destination for a given role.
 * staff/admin -> /admin, licensee -> /portal/licences, user/null -> /profile
 */
export function getPostLoginRoute(role: UserRole | null): string {
  if (role === "admin" || role === "staff") return "/admin";
  if (role === "licensee") return "/portal/licences";
  return "/profile";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIdleLogout = useCallback(async () => {
    if (auth.currentUser) {
      try {
        logger.info("Idle timeout reached, signing out user", {
          uid: auth.currentUser.uid,
        });
        await signOut();
      } catch (err) {
        logger.error("Idle logout failed", {
          error: String(err),
          uid: auth.currentUser?.uid,
        });
      }
    }
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (!auth.currentUser) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleIdleLogout, IDLE_TIMEOUT_MS);
  }, [handleIdleLogout]);

  useEffect(() => {
    if (!user) return;

    const events = ["mousedown", "keydown", "scroll", "touchstart"] as const;
    const handler = () => resetIdleTimer();

    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    resetIdleTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [user, resetIdleTimer]);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        logger.info("Auth state changed: user signed in", { uid: u.uid });
        setRoleLoading(true);

        // Check hardcoded admin list first (fallback until Spring Boot is fully live)
        const isHardcodedAdmin =
          u.email != null && ADMIN_EMAILS.includes(u.email.toLowerCase());

        try {
          const token = await u.getIdToken();
          const baseUrl = process.env.NEXT_PUBLIC_API_URL;
          const res = await fetch(`${baseUrl}/api/auth/me`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error(`Backend returned ${res.status}`);
          const data = await res.json();
          // Hardcoded admin list overrides backend role (admin accounts are
          // managed here until a proper admin UI exists)
          const resolvedRole: UserRole =
            isHardcodedAdmin ? "admin" : (data.role ?? "user");
          setRole(resolvedRole);
          logger.info("Role resolved", { uid: u.uid, role: resolvedRole });
        } catch (err) {
          // Backend unreachable - use hardcoded admin list as fallback
          const fallbackRole: UserRole = isHardcodedAdmin ? "admin" : "user";
          setRole(fallbackRole);
          logger.warn("Role resolution failed, using fallback", {
            uid: u.uid,
            fallbackRole,
            error: String(err),
          });
        } finally {
          setRoleLoading(false);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, roleLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}