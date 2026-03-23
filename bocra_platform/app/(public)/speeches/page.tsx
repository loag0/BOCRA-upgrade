import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  MapPin,
  User,
  Mic2,
  ArrowRight,
  Inbox,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { mockSpeeches } from "@/lib/mock-data";

export const metadata = {
  title: "Speeches & Presentations - BOCRA",
  description:
    "Speeches and presentations by BOCRA leadership including the Chief Executive, at national and international events on telecommunications regulation, spectrum management, and digital transformation.",
};

function SpeechCard({
  speech,
}: {
  speech: (typeof mockSpeeches)[number];
}) {
  const formattedDate = new Date(speech.date).toLocaleDateString("en-BW", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden">
      <div className="p-6">
        {/* Speaker */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-bocra-navy/10 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-bocra-navy" />
          </div>
          <div>
            <p className="text-sm font-semibold text-bocra-navy">
              {speech.speaker}
            </p>
            <p className="text-xs text-gray-400">{speech.speakerRole}</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-bocra-navy mb-3 leading-snug group-hover:text-bocra-blue transition-colors line-clamp-2">
          {speech.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
          {speech.excerpt}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 border-t border-gray-50 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <Mic2 className="w-3.5 h-3.5 shrink-0" />
            {speech.event}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {speech.venue}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {formattedDate}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function SpeechesPage() {
  const speeches = mockSpeeches;

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
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-white/40">
                <li>
                  <Link
                    href="/"
                    className="hover:text-white/70 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5" />
                </li>
                <li className="text-white/70 font-medium">
                  Speeches & Presentations
                </li>
              </ol>
            </nav>

            <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
              Media
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              Speeches & Presentations
            </h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              Speeches and presentations by BOCRA leadership at national and
              international forums on telecommunications regulation, spectrum
              management, and digital transformation.
            </p>
          </div>
        </section>

        {/* Speech cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Results count */}
          <p
            className="text-sm text-gray-400 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200"
            aria-live="polite"
          >
            Showing {speeches.length}{" "}
            {speeches.length === 1 ? "speech" : "speeches"}
          </p>

          {speeches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              {speeches.map((speech) => (
                <SpeechCard key={speech.id} speech={speech} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Inbox className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-bocra-navy mb-2">
                No speeches available
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Check back later for new speeches and presentations from BOCRA
                leadership.
              </p>
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-bocra-blue hover:text-bocra-navy transition-colors"
              >
                View news & events
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
