import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { mockNews } from "@/lib/mock-data";
import { NewsFilters } from "./news-filters";

export const metadata = {
  title: "News & Events - BOCRA",
  description:
    "Latest news, public notices, announcements, tenders, and events from the Botswana Communications Regulatory Authority.",
};

export default function NewsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero strip */}
        <section className="bg-bocra-navy pt-24 pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)`,
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-white/40">
                <li>
                  <Link href="/" className="hover:text-white/70 transition-colors">
                    Home
                  </Link>
                </li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li className="text-white/70 font-medium">News & Events</li>
              </ol>
            </nav>

            <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
              Media
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
              News & Events
            </h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              Stay up to date with the latest public notices, announcements,
              consultations, and events from BOCRA.
            </p>
          </div>
        </section>

        {/* Filters + Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <NewsFilters articles={mockNews} />
        </section>
      </main>
      <Footer />
    </>
  );
}
