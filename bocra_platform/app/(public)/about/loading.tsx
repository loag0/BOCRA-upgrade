import { Navbar } from "@/components/navbar";

export default function AboutLoading() {
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
        <div className="bg-white py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-8 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl mb-5" />
                  <div className="h-5 w-24 bg-gray-200 rounded mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                    <div className="h-3 bg-gray-200 rounded w-4/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
