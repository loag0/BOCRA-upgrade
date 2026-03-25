/**
 * Sanitise user-supplied text before rendering or sending to the API.
 *
 * - Strips HTML/script tags to prevent stored XSS.
 * - Trims leading/trailing whitespace.
 * - Collapses excessive whitespace runs.
 *
 * For rich text that intentionally contains markup, use a dedicated
 * sanitisation library (e.g. DOMPurify) instead of this function.
 */
export function sanitizeText(raw: string): string {
  return raw
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/<[^>]*>/g, "") // second pass after entity decode
    .replace(/javascript:/gi, "") // strip JS protocol
    .replace(/on\w+\s*=/gi, "") // strip inline event handlers
    .replace(/\s{2,}/g, " ") // collapse whitespace
    .trim();
}

/**
 * Sanitise all string values in a flat object (e.g. form data).
 */
export function sanitizeFormData<T extends Record<string, unknown>>(
  data: T,
): T {
  const cleaned = { ...data };
  for (const key in cleaned) {
    if (typeof cleaned[key] === "string") {
      (cleaned as Record<string, unknown>)[key] = sanitizeText(
        cleaned[key] as string,
      );
    }
  }
  return cleaned;
}
