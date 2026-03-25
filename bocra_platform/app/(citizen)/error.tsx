"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { logger } from "@/lib/logger";
import { reportError } from "@/lib/report-error";

export default function CitizenError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Error in citizen route", { message: error.message, digest: error.digest });
    reportError(error, "(citizen)");
  }, [error]);
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-red-500" />
          </div>
          <h2 className="font-heading text-xl font-bold text-bocra-navy mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            We could not load your profile. Please try again.
          </p>
          <Button onClick={reset} className="bg-bocra-navy hover:bg-bocra-navy/90">
            Try again
          </Button>
        </div>
      </main>
    </>
  );
}
