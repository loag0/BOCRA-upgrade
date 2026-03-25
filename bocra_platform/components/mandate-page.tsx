"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Phone,
  Radio,
  Mail,
  Wifi,
  Activity,
  Globe,
  CheckSquare,
  Shield,
  Users,
  FileText,
  BarChart3,
  Signal,
  Landmark,
  MapPin,
  Scale,
  Truck,
  Music,
  Tv,
  Radar,
  Server,
  Search,
  AlertTriangle,
  Eye,
  Lock,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/animated-section";

// Icon registry - maps string names to Lucide components
// This avoids passing functions across the server/client boundary
const ICON_MAP: Record<string, LucideIcon> = {
  Phone,
  Radio,
  Mail,
  Wifi,
  Activity,
  Globe,
  CheckSquare,
  Shield,
  Users,
  FileText,
  BarChart3,
  Signal,
  Landmark,
  MapPin,
  Scale,
  Truck,
  Music,
  Tv,
  Radar,
  Server,
  Search,
  AlertTriangle,
  Eye,
  Lock,
  Cpu,
};

function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? FileText;
}

interface KeyFact {
  label: string;
  value: string;
}

interface InfoCard {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

interface MandatePageProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconColor: string;
  heroImage?: string;
  overview: string[];
  keyFacts: KeyFact[];
  responsibilities: InfoCard[];
  legislation?: string;
  legislationDetail?: string;
  children?: React.ReactNode;
}

export function MandatePage({
  title,
  subtitle,
  description,
  icon,
  iconColor,
  heroImage,
  overview,
  keyFacts,
  responsibilities,
  legislation,
  legislationDetail,
  children,
}: MandatePageProps) {
  const Icon = useMemo(() => resolveIcon(icon), [icon]);
  const resolvedResponsibilities = useMemo(
    () =>
      responsibilities.map((r) => ({
        ...r,
        ResolvedIcon: resolveIcon(r.icon),
      })),
    [responsibilities],
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero */}
        <section className="bg-bocra-navy pt-24 pb-16 relative overflow-hidden">
          {heroImage && (
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          )}
          {heroImage && <div className="absolute inset-0 bg-bocra-navy/85" />}
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
                  <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
                </li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li>
                  <Link href="/about" className="hover:text-white/70 transition-colors">Mandate</Link>
                </li>
                <li><ChevronRight className="w-3.5 h-3.5" /></li>
                <li className="text-white/70 font-medium">{title}</li>
              </ol>
            </nav>

            <AnimatedSection animation="fade-up" delay={0}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${iconColor} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <Badge className="bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                  {subtitle}
                </Badge>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
                {title}
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300}>
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                {description}
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Overview + Key Facts */}
        <section className="bg-white py-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <AnimatedSection animation="fade-left" className="lg:col-span-3 space-y-4">
                <h2 className="font-heading text-2xl font-bold text-bocra-navy mb-4">
                  Overview
                </h2>
                {overview.map((paragraph, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </AnimatedSection>
              <AnimatedSection animation="fade-right" delay={200} className="lg:col-span-2">
                <Card className="border-gray-100 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-bold text-bocra-navy mb-4">
                      Key Facts
                    </h3>
                    <dl className="space-y-3">
                      {keyFacts.map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-start gap-4">
                          <dt className="text-sm text-gray-500 shrink-0">{label}</dt>
                          <dd className="text-sm font-semibold text-bocra-navy text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    {legislation && (
                      <div className="border-t border-gray-100 mt-4 pt-4">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Legal Basis</p>
                        <p className="text-sm font-semibold text-bocra-navy">{legislation}</p>
                        {legislationDetail && (
                          <p className="text-xs text-gray-500 mt-1">{legislationDetail}</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Responsibilities */}
        <section className="bg-bocra-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fade-up">
              <div className="mb-10">
                <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                  Responsibilities
                </Badge>
                <h2 className="font-heading text-3xl font-bold text-bocra-navy">
                  What BOCRA Does
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {resolvedResponsibilities.map(({ ResolvedIcon, title: rTitle, description: rDesc, color }, i) => (
                  <AnimatedSection key={rTitle} animation="fade-up" delay={i * 100}>
                    <Card className="border-gray-100 bg-white shadow-sm h-full">
                      <CardContent className="p-6">
                        <div className={`w-10 h-10 rounded-lg ${color ?? "bg-bocra-navy/10 text-bocra-navy"} flex items-center justify-center mb-4`}>
                          <ResolvedIcon className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-bocra-navy mb-2">{rTitle}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{rDesc}</p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Extra content slot */}
        {children}
      </main>
      <Footer />
    </>
  );
}
