import Link from "next/link";
import Image from "next/image";
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
import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { getSpeeches } from "@/lib/data";
import type { Speech } from "@/types";

export const metadata = {
  title: "Speeches & Presentations",
  description:
    "Speeches and presentations by BOCRA leadership including the Chief Executive, at national and international events on telecommunications regulation, spectrum management, and digital transformation.",
};

function SpeechCard({
  speech,
}: {
  speech: Speech;
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

export default async function SpeechesPage() {
  const speeches = await getSpeeches();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero strip */}
        <section className="relative bg-bocra-navy pt-24 pb-16 overflow-hidden">
          <Image
            src="/images/conference-room.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-bocra-navy/60 to-bocra-navy" />
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

            <AnimatedSection animation="fade-up">
              <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                Media
              </Badge>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
                Speeches & Presentations
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                Speeches and presentations by BOCRA leadership at national and
                international forums on telecommunications regulation, spectrum
                management, and digital transformation.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Speech cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Results count */}
          <AnimatedSection animation="fade-up" delay={300}>
            <p
              className="text-sm text-gray-400 mb-6"
              aria-live="polite"
            >
              Showing {speeches.length}{" "}
              {speeches.length === 1 ? "speech" : "speeches"}
            </p>
          </AnimatedSection>

          {speeches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {speeches.map((speech, i) => (
                <AnimatedSection key={speech.id} animation="fade-up" delay={350 + i * 100}>
                  <SpeechCard speech={speech} />
                </AnimatedSection>
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
