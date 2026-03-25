/**
 * Lightweight structured logger
 *
 * In production: emits JSON-lines to stdout/stderr (consumed by
 * Vercel / Railway log drains). In development: uses console with
 * coloured prefixes for readability.
 *
 * Usage:
 *   import { logger } from "@/lib/logger";
 *   logger.info("User logged in", { userId: "abc123" });
 *   logger.error("Payment failed", { orderId: "xyz", error: err });
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

const IS_PROD = process.env.NODE_ENV === "production";

function formatEntry(entry: LogEntry): string {
  if (IS_PROD) {
    return JSON.stringify(entry);
  }
  const prefix = {
    debug: "\x1b[90m[DEBUG]\x1b[0m",
    info: "\x1b[36m[INFO]\x1b[0m",
    warn: "\x1b[33m[WARN]\x1b[0m",
    error: "\x1b[31m[ERROR]\x1b[0m",
  }[entry.level];
  const ctx = entry.context ? ` ${JSON.stringify(entry.context)}` : "";
  return `${prefix} ${entry.message}${ctx}`;
}

function log(level: LogLevel, message: string, context?: Record<string, unknown>) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(context && { context }),
  };

  const formatted = formatEntry(entry);

  switch (level) {
    case "error":
      console.error(formatted);
      break;
    case "warn":
      console.warn(formatted);
      break;
    case "debug":
      if (!IS_PROD) console.debug(formatted);
      break;
    default:
      console.log(formatted);
  }
}

export const logger = {
  debug: (msg: string, ctx?: Record<string, unknown>) => log("debug", msg, ctx),
  info: (msg: string, ctx?: Record<string, unknown>) => log("info", msg, ctx),
  warn: (msg: string, ctx?: Record<string, unknown>) => log("warn", msg, ctx),
  error: (msg: string, ctx?: Record<string, unknown>) => log("error", msg, ctx),
};
