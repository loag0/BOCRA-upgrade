import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Publications — BOCRA",
  description: "Download BOCRA annual reports, QoS reports, legislation, consultation papers, and tenders.",
};

export default function PublicationsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface pt-16">
        {/* TODO: Searchable publications library */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-heading text-3xl font-bold text-bocra-navy mb-2">
            Publications Library
          </h1>
          <p className="text-gray-500">Coming soon.</p>
        </div>
      </main>
    </>
  );
}
