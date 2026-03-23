import { Navbar } from "@/components/navbar";

export default function SpeechesLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero skeleton */}
        <div className="bg-bocra-navy pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-4 w-32 bg-white/10 rounded mb-6 animate-pulse" />
            <div className="h-6 w-24 bg-white/10 rounded-full mb-4 animate-pulse" />
            <div className="h-12 w-3/4 bg-white/10 rounded mb-4 animate-pulse" />
            <div className="h-5 w-1/2 bg-white/10 rounded animate-pulse" />
          </div>
        </div>

        {/* Cards skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-4 w-32 bg-gray-200 rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <div className="h-4 w-28 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-20 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="h-5 w-full bg-gray-200 rounded mb-2" />
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-4" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
                <div className="flex gap-4 pt-4 border-t border-gray-50">
                  <div className="h-3 w-32 bg-gray-100 rounded" />
                  <div className="h-3 w-24 bg-gray-100 rounded" />
                  <div className="h-3 w-28 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
