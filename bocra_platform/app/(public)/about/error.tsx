"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
            We could not load this page. Please try again.
          </p>
          <Button onClick={reset} className="bg-bocra-navy hover:bg-bocra-navy/90">
            Try again
          </Button>
        </div>
      </main>
    </>
  );
}
