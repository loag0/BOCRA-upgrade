"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { logger } from "@/lib/logger";
import { reportError } from "@/lib/report-error";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Error in auth route", { message: error.message, digest: error.digest });
    reportError(error, "(auth)");
  }, [error]);
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7 text-red-500" />
        </div>
        <h2 className="font-heading text-xl font-bold text-bocra-navy mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          We could not load this page. Please try again.
        </p>
        <Button
          onClick={reset}
          className="w-full bg-bocra-navy hover:bg-bocra-blue text-white"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
