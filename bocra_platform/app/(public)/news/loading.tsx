import { Navbar } from "@/components/navbar";

export default function NewsLoading() {
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

        {/* Filter bar skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex gap-4 mb-8">
            <div className="h-10 flex-1 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
              >
                <div className="h-5 w-24 bg-gray-200 rounded-full mb-4" />
                <div className="h-5 w-full bg-gray-200 rounded mb-2" />
                <div className="h-5 w-4/5 bg-gray-200 rounded mb-4" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
                <div className="h-3 w-28 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
