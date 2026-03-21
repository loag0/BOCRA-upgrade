import { Navbar } from "@/components/navbar";

export const metadata = {
  title: ".bw Domain Registry — BOCRA",
  description: "Search, register and manage .bw country code top-level domains.",
};

export default function DomainsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface pt-16">
        {/* TODO: Domain search, availability checker, registration form */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-heading text-3xl font-bold text-bocra-navy mb-2">
            .bw Domain Registry
          </h1>
          <p className="text-gray-500">Coming soon.</p>
        </div>
      </main>
    </>
  );
}
