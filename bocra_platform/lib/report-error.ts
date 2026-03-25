/**
 * Reports client-side errors to the /api/errors endpoint.
 * Used by error boundaries to track runtime errors for admin visibility.
 */
export function reportError(error: Error & { digest?: string }, route: string): void {
  fetch("/api/errors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: error.message,
      route,
      digest: error.digest,
      severity: "error",
    }),
  }).catch(() => {
    // Silently fail - error reporting doesnt block the user
  });
}
