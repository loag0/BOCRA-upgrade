// In-memory error store for hackathon demo.
// In production, replace with a persistent store (database, log drain, or external service like Sentry).

export interface ErrorRecord {
  id: string;
  message: string;
  route: string;
  digest?: string;
  timestamp: string;
  userAgent?: string;
  severity: "error" | "warning";
}

const MAX_ERRORS = 100;
const errors: ErrorRecord[] = [];

export function addError(record: Omit<ErrorRecord, "id" | "timestamp">): ErrorRecord {
  const entry: ErrorRecord = {
    ...record,
    id: `ERR-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
  };
  errors.unshift(entry);
  if (errors.length > MAX_ERRORS) errors.pop();
  return entry;
}

export function getErrors(): ErrorRecord[] {
  return [...errors];
}

export function clearErrors(): void {
  errors.length = 0;
}

export function getErrorCount(): number {
  return errors.length;
}
