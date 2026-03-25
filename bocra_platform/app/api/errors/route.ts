import { NextResponse } from "next/server";
import { addError, getErrors, clearErrors } from "@/lib/error-store";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, route, digest, severity } = body;

    if (!message || !route) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const record = addError({
      message: String(message).slice(0, 500),
      route: String(route).slice(0, 200),
      digest: digest ? String(digest) : undefined,
      severity: severity === "warning" ? "warning" : "error",
      userAgent: request.headers.get("user-agent") ?? undefined,
    });

    logger.error("Client error reported", {
      id: record.id,
      message: record.message,
      route: record.route,
      digest: record.digest,
    });

    return NextResponse.json({ id: record.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  const errors = getErrors();
  return NextResponse.json({ errors, count: errors.length });
}

export async function DELETE() {
  clearErrors();
  logger.info("Error log cleared by admin");
  return NextResponse.json({ cleared: true });
}
