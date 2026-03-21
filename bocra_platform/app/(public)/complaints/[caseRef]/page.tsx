import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Track Complaint — BOCRA",
};

export default async function ComplaintTrackerPage({
  params,
}: {
  params: Promise<{ caseRef: string }>;
}) {
  const { caseRef } = await params;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-heading text-3xl font-bold text-bocra-navy mb-2">
            Complaint Tracker
          </h1>
          <p className="text-gray-500">
            Case reference: <span className="font-mono text-bocra-navy">{caseRef}</span>
          </p>
          {/* TODO: Fetch and display complaint status timeline */}
        </div>
      </main>
    </>
  );
}
