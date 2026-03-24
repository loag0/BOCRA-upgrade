import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnimatedSection } from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import {
  Keyboard,
  Eye,
  Monitor,
  Smartphone,
  MessageSquare,
  Accessibility,
} from "lucide-react";

export const metadata = {
  title: "Accessibility - BOCRA",
  description:
    "BOCRA's commitment to digital accessibility, ensuring the platform is usable by all Batswana, including persons with disabilities.",
};

const features = [
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    description:
      "All interactive elements are accessible via keyboard. Use Tab to navigate, Enter or Space to activate, and Escape to close dialogs. Skip-to-content links are provided on every page.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Eye,
    title: "Screen Reader Support",
    description:
      "The platform uses semantic HTML, ARIA labels, and live regions to ensure compatibility with screen readers such as JAWS, NVDA, and VoiceOver.",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Monitor,
    title: "Visual Design",
    description:
      "Text and interactive elements meet WCAG AA contrast ratios. The interface uses clear typography, consistent layouts, and avoids relying solely on colour to convey information.",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "The platform is fully responsive and works across desktops, tablets, and mobile phones. Touch targets meet minimum size requirements for comfortable interaction.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: Accessibility,
    title: "Standards Compliance",
    description:
      "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. We regularly audit the platform and address accessibility issues as they are identified.",
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    icon: MessageSquare,
    title: "Feedback & Assistance",
    description:
      "If you encounter any accessibility barriers, please contact us. We welcome feedback and are committed to continuous improvement. Alternative formats of documents are available on request.",
    color: "bg-rose-500/10 text-rose-600",
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero */}
        <section className="bg-bocra-navy pt-24 pb-14 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)`,
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-white/40">
                <li>
                  <Link href="/" className="hover:text-white/70 transition-colors">
                    Home
                  </Link>
                </li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li className="text-white/70 font-medium">Accessibility</li>
              </ol>
            </nav>
            <AnimatedSection animation="fade-up">
              <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                Inclusion
              </Badge>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
                Accessibility Statement
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-white/70 max-w-2xl leading-relaxed">
                BOCRA is committed to ensuring this platform is accessible to
                all Batswana, including persons with disabilities.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Features grid */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <AnimatedSection animation="fade-up">
            <h2 className="font-heading text-2xl font-bold text-bocra-navy mb-8">
              Accessibility Features
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={feature.title} animation="fade-up" delay={i * 80}>
                  <div className="bg-white rounded-xl border border-gray-100 p-6 h-full">
                    <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-bocra-navy mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Contact */}
          <AnimatedSection animation="fade-up">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-heading text-lg font-bold text-bocra-navy mb-3">
                Report an Accessibility Issue
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                If you experience difficulty accessing any part of this platform,
                or would like to request content in an alternative format, please
                contact us:
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@bocra.org.bw"
                    className="text-bocra-blue hover:text-bocra-navy transition-colors"
                  >
                    info@bocra.org.bw
                  </a>
                </p>
                <p>Telephone: +267 395 7755</p>
                <p>
                  Address: Plot 50671, Independence Avenue, P/Bag 00495,
                  Gaborone, Botswana
                </p>
              </div>
            </div>
          </AnimatedSection>
        </section>
      </main>
      <Footer />
    </>
  );
}
