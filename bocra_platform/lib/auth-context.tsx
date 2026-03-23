"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { auth, signOut } from "@/lib/firebase";
import type { UserRole } from "@/types";

export type { UserRole };

/** Idle timeout in milliseconds (30 minutes) */
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;

interface AuthContextValue {
  user: User | null;
  /** Set by Spring Boot after token verification. Null until that's wired up. */
  role: UserRole | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  role: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIdleLogout = useCallback(async () => {
    if (auth.currentUser) {
      await signOut();
      // Redirect handled by auth guards -- user will be sent to login
    }
  }, []);

  const resetIdleTimer = useCallback(() => {
    if (!auth.currentUser) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleIdleLogout, IDLE_TIMEOUT_MS);
  }, [handleIdleLogout]);

  // Listen for user activity to reset the idle timer
  useEffect(() => {
    if (!user) return;

    const events = ["mousedown", "keydown", "scroll", "touchstart"] as const;
    const handler = () => resetIdleTimer();

    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    resetIdleTimer(); // Start the timer on login

    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [user, resetIdleTimer]);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      // Role comes from Spring Boot -- placeholder null until integrated.
      // When ready: call Spring Boot /auth/me or similar, get role, setRole(role).
      setRole(null);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
