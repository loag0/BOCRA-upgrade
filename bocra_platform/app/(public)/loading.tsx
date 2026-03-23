import { Navbar } from "@/components/navbar";

export default function PublicLoading() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        <div className="bg-bocra-navy pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-6 w-24 bg-white/10 rounded-full mb-4 animate-pulse" />
            <div className="h-12 w-3/4 bg-white/10 rounded mb-4 animate-pulse" />
            <div className="h-5 w-1/2 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-5 bg-gray-200 rounded w-full mb-3" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
