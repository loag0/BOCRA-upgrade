"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { UserRole } from "@/types";

export type { UserRole };

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

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      // Role comes from Spring Boot — placeholder null until integrated.
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
