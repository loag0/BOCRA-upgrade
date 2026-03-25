import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Calendar,
  Award,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/animated-section";

export const metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at BOCRA. Join a team of talented professionals driving Botswana's digital transformation.",
};

const benefits = [
  {
    icon: GraduationCap,
    title: "Professional Development",
    description:
      "Internal training courses, external course sponsorship, professional and academic qualification sponsorships, and professional body memberships.",
  },
  {
    icon: HeartPulse,
    title: "Medical Insurance",
    description:
      "Private medical insurance for employees, with flexible benefits options for family medical coverage.",
  },
  {
    icon: Calendar,
    title: "25 Days Annual Leave",
    description:
      "Generous annual holiday entitlement with additional flexible leave options available.",
  },
  {
    icon: Award,
    title: "Pension Allowance",
    description:
      "Competitive pension scheme to support your long-term financial wellbeing.",
  },
  {
    icon: Users,
    title: "Life Assurance",
    description:
      "Life assurance cover and travel insurance as part of the flexible benefits package.",
  },
  {
    icon: Briefcase,
    title: "Flexible Benefits",
    description:
      "Choose from additional leave days, travel insurance, and extended family medical coverage.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero */}
        <section className="relative bg-bocra-navy pt-24 pb-16 overflow-hidden">
          <Image
            src="/images/office-workspace.jpg"
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bocra-navy/60 to-bocra-navy" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-white/40">
                <li>
                  <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                </li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li>
                  <Link href="/about" className="hover:text-white/70 transition-colors">About</Link>
                </li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li className="text-white/70 font-medium">Careers</li>
              </ol>
            </nav>

            <AnimatedSection animation="fade-up" delay={0}>
              <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                Join Our Team
              </Badge>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
                Careers at BOCRA
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                An organisation in which talented people work together, thrive and
                develop, driving Botswana&apos;s digital transformation.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* No positions banner */}
        <section className="bg-white py-16 border-b border-gray-100">
          <AnimatedSection animation="fade-up">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-bocra-navy/10 flex items-center justify-center mx-auto mb-5">
                <Briefcase className="w-7 h-7 text-bocra-navy" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-bocra-navy mb-3">
                No Open Positions
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                There are currently no vacancies at BOCRA. Please check back
                regularly as new opportunities are posted here when available.
              </p>
              <p className="text-sm text-gray-400">
                For general enquiries, contact us at{" "}
                <a
                  href="mailto:info@bocra.org.bw"
                  className="text-bocra-blue hover:underline"
                >
                  info@bocra.org.bw
                </a>
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* Why work at BOCRA */}
        <section className="bg-bocra-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                Benefits
              </Badge>
              <h2 className="font-heading text-3xl font-bold text-bocra-navy">
                Why Work at BOCRA
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map(({ icon: Icon, title, description }, i) => (
                <AnimatedSection key={title} animation="fade-up" delay={i * 80}>
                  <Card className="border-gray-100 bg-white shadow-sm h-full">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-bocra-navy/10 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-bocra-navy" />
                      </div>
                      <h3 className="font-semibold text-bocra-navy mb-2">{title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
