import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "File a Complaint — BOCRA",
  description: "File a complaint against a BOCRA-licensed operator.",
};

export default function ComplaintsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface pt-16">
        {/* TODO: Multi-step complaint form */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-heading text-3xl font-bold text-bocra-navy mb-2">
            File a Complaint
          </h1>
          <p className="text-gray-500">Coming soon.</p>
        </div>
      </main>
    </>
  );
}
