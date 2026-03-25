import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FileQuestion } from "lucide-react";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 rounded-full bg-bocra-gold/10 flex items-center justify-center mx-auto mb-5">
            <FileQuestion className="w-8 h-8 text-bocra-gold" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-bocra-navy mb-2">
            404
          </h1>
          <h2 className="font-heading text-lg font-semibold text-bocra-navy mb-3">
            Page not found
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            The page you are looking for does not exist or has been moved.
            Please check the URL or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-bocra-navy hover:bg-bocra-blue text-white text-sm font-medium transition-colors"
            >
              Return to Home
            </Link>
            <Link
              href="/complaints"
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-bocra-navy text-sm font-medium transition-colors"
            >
              Report an Issue
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
