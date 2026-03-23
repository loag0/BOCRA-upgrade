import { Navbar } from "@/components/navbar";
import { VerifySearch } from "@/components/verify-search";

export const metadata = {
  title: "Verify Licence — BOCRA",
  description: "Verify any BOCRA-licensed operator's licence status, category, and compliance.",
};

export default function VerifyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero strip */}
        <div className="bg-bocra-navy pt-24 pb-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
              Licence Verifier
            </h1>
            <p className="text-white/70 mb-8">
              Enter an operator name or licence number to verify their BOCRA
              licence status.
            </p>
            <VerifySearch />
          </div>
        </div>

        {/* Results / instructions */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center text-gray-400 py-16">
            <p className="text-sm">
              Search for an operator above to see their licence details.
            </p>
            <p className="text-xs mt-2">
              Try: BTC, Mascom, Orange, BoFiNet, Yarona FM…
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
