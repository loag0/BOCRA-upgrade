import { auth } from "@/lib/firebase";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Shared API helper for Spring Boot backend calls.
 * Auto-attaches Firebase JWT when a user is signed in.
 */
async function request<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Attach auth token if user is signed in
  if (auth.currentUser) {
    const token = await auth.currentUser.getIdToken();
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    // Rate limited - include retry info in the error
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After") ?? "60";
      throw new Error(`Too many requests. Please try again in ${retryAfter} seconds.`);
    }

    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
      if (body.message) message = body.message;
    } catch {
      // response wasn't JSON, use default message
    }
    throw new Error(message);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

export const api = {
  get: <T = unknown>(path: string) => request<T>(path),

  post: <T = unknown>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),

  patch: <T = unknown>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),

  put: <T = unknown>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),

  delete: <T = unknown>(path: string) =>
    request<T>(path, { method: "DELETE" }),
};
