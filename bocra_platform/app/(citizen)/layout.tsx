import { Navbar } from "@/components/navbar";
import { AuthGuard } from "@/components/auth-guard";

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-bocra-surface pt-16">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <AuthGuard>{children}</AuthGuard>
        </main>
      </div>
    </>
  );
}
