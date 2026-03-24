import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ShieldCheck,
  Search,
  FileText,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VerifySearch } from "@/components/verify-search";
import { AnimatedSection } from "@/components/animated-section";

export const metadata = {
  title: "Verify Licence - BOCRA",
  description:
    "Verify any BOCRA-licensed operator's licence status, category, and compliance.",
};

const tips = [
  {
    icon: Search,
    title: "Search by name or number",
    description:
      "Enter the full or partial operator name, or the BOCRA licence number (e.g. PTO-001).",
  },
  {
    icon: ShieldCheck,
    title: "Verify compliance status",
    description:
      "Each result shows whether the operator is Compliant, Under Review, or Non-Compliant.",
  },
  {
    icon: FileText,
    title: "View licence details",
    description:
      "See the licence category, issue and expiry dates, licensed services, and operator contact details.",
  },
  {
    icon: AlertCircle,
    title: "Report unlicensed operators",
    description:
      "If an operator is not found, they may be operating without a valid BOCRA licence. File a complaint.",
  },
];

export default function VerifyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero strip */}
        <section className="bg-bocra-navy pt-24 pb-16 relative overflow-hidden">
          <Image
            src="/images/telecom-tower.jpg"
            alt=""
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-bocra-navy/85" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)`,
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <AnimatedSection animation="fade-up" delay={0}>
              <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
                <ol className="flex items-center gap-1.5 text-sm text-white/40">
                  <li>
                    <Link href="/" className="hover:text-white/70 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </li>
                  <li className="text-white/70 font-medium">Verify Licence</li>
                </ol>
              </nav>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                Licence Registry
              </Badge>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                Licence Verifier
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <p className="text-white/70 mb-8 max-w-xl mx-auto leading-relaxed">
                Enter an operator name or licence number to verify their BOCRA
                licence status, compliance, and licensed services.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <VerifySearch />
            </AnimatedSection>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-16 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-10">
                <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                  How It Works
                </Badge>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-bocra-navy">
                  Verify Any Licensed Operator
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tips.map(({ icon: Icon, title, description }, i) => (
                <AnimatedSection key={title} animation="fade-up" delay={i * 100}>
                  <Card className="border-gray-100 h-full">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-bocra-navy/10 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-bocra-navy" />
                      </div>
                      <h3 className="font-semibold text-bocra-navy mb-1.5 text-sm">
                        {title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Image banner + CTA */}
        <section className="bg-bocra-surface py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-up">
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-8">
                <Image
                  src="/images/elder-technology.jpg"
                  alt="Citizen verifying licence information"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bocra-navy/70 via-bocra-navy/40 to-transparent" />
                <div className="absolute inset-0 flex items-center p-8">
                  <div>
                    <p className="text-bocra-gold text-xs font-semibold uppercase tracking-widest mb-2">
                      Consumer Protection
                    </p>
                    <p className="text-white text-lg sm:text-xl font-heading font-bold max-w-md">
                      Only use services from BOCRA-licensed operators
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatedSection animation="fade-left">
                <Card className="border-gray-100 h-full">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-bocra-navy mb-2">
                      Found an unlicensed operator?
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      Operating without a valid BOCRA licence is an offence under
                      the CRA Act 2012. Report suspected unlicensed operators.
                    </p>
                    <Link
                      href="/complaints"
                      className="flex items-center gap-1 text-bocra-gold text-sm font-medium hover:text-bocra-navy transition-colors"
                    >
                      File a complaint <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fade-right">
                <Card className="border-gray-100 h-full">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-bocra-navy mb-2">
                      Need a new licence?
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      Learn about the licensing process, categories, and
                      requirements for operating in Botswana&apos;s communications
                      sector.
                    </p>
                    <Link
                      href="/services/telecoms"
                      className="flex items-center gap-1 text-bocra-gold text-sm font-medium hover:text-bocra-navy transition-colors"
                    >
                      View licensing info <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
