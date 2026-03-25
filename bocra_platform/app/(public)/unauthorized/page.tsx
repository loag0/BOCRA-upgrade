import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Access Denied",
};

export default function UnauthorizedPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface pt-16 flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <ShieldOff className="w-7 h-7 text-red-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-bold text-bocra-navy">
              Access Denied
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              You don&apos;t have permission to view this page.
            </p>
          </div>

          <Button className="bg-bocra-navy hover:bg-bocra-blue text-white font-semibold rounded-lg px-8">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
