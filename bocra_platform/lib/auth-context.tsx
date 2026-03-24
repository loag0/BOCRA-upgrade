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
        try {
          const token = await u.getIdToken();
          const res = await fetch("http://localhost:8080/api/auth/me", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setRole(data.role ?? null);
        } catch {
          setRole(null);
        }
      } else {
        setRole(null);
      }
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