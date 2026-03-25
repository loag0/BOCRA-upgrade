import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Radio,
  Mail,
  Wifi,
  Activity,
  Globe,
  CheckSquare,
  ShieldCheck,
  FileWarning,
  BookOpen,
  ArrowRight,
  Building2,
  FileText,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSearch } from "@/components/hero-search";
import { AnimatedSection } from "@/components/animated-section";
import { AnimatedCounter } from "@/components/animated-counter";

const stats = [
  { label: "Licensed Operators", value: "47+", icon: Building2 },
  { label: "Active Licences", value: "234", icon: FileText },
  { label: "Complaints Resolved", value: "1,200+", icon: ShieldCheck },
  { label: ".bw Domains Registered", value: "8,500+", icon: Globe },
];

const services = [
  {
    icon: Phone,
    title: "Telecommunications",
    desc: "Licensing and oversight of PTOs, SAPs, and VANS providers under the CRA Act 2012.",
    href: "/services/telecoms",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Radio,
    title: "Broadcasting",
    desc: "Commercial broadcasting regulation and local content compliance monitoring.",
    href: "/services/broadcasting",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Mail,
    title: "Postal Services",
    desc: "Licensing and regulation of all postal service providers nationally.",
    href: "/services/postal",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Wifi,
    title: "Internet & ICT",
    desc: "ISP licensing under the SAP framework and full ICT sector oversight.",
    href: "/services/ict",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Activity,
    title: "Radio Spectrum",
    desc: "National frequency plan administration and spectrum monitoring via ASMS.",
    href: "/services/spectrum",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: Globe,
    title: ".bw ccTLD",
    desc: "Botswana country code top-level domain registry, WHOIS, and DNS management.",
    href: "/domains",
    color: "bg-teal-500/10 text-teal-500",
  },
  {
    icon: CheckSquare,
    title: "Type Approval",
    desc: "Equipment type approval for all devices sold or operated in Botswana.",
    href: "/services/type-approval",
    color: "bg-rose-500/10 text-rose-500",
  },
];

const operators = [
  {
    name: "BTC",
    type: "PTO",
    fullName: "Botswana Telecommunications Corporation",
    description:
      "The national fixed-line and broadband operator, providing voice, data, and fibre services across Botswana.",
    licenceNo: "BOCRA/PTO/001/2013",
    since: "2013",
    services: ["Fixed Voice", "ADSL/Fibre", "Leased Lines"],
    website: "https://www.btc.bw",
    logo: "/images/operators/btc-logo.png",        // ← update path
    banner: "/images/operators/btc-banner.png",    // ← update path
  },
  {
    name: "Mascom",
    type: "PTO",
    fullName: "Mascom Wireless Botswana",
    description:
      "Botswana's largest mobile network operator, offering 4G LTE, mobile money (MyZaka), and enterprise solutions.",
    licenceNo: "BOCRA/PTO/002/2013",
    since: "1998",
    services: ["Mobile Voice", "4G LTE", "MyZaka MFS"],
    website: "https://www.mascom.bw",
    logo: "/images/operators/mascom-logo.png",
    banner: "/images/operators/mascom-banner.png",
  },
  {
    name: "Orange",
    type: "PTO",
    fullName: "Orange Botswana",
    description:
      "Part of the global Orange Group, providing mobile telecommunications and digital services nationwide.",
    licenceNo: "BOCRA/PTO/003/2013",
    since: "1998",
    services: ["Mobile Voice", "4G Data", "Orange Money"],
    website: "https://www.orange.co.bw",
    logo: "/images/operators/orange-logo.png",
    banner: "/images/operators/orange-banner.png",
  },
  {
    name: "BoFiNet",
    type: "Wholesale",
    fullName: "Botswana Fibre Networks",
    description:
      "The national wholesale open-access broadband infrastructure provider, operating the national fibre backbone.",
    licenceNo: "BOCRA/WHL/001/2012",
    since: "2012",
    services: ["Wholesale Fibre", "National Backbone", "International Links"],
    website: "https://www.bofinet.co.bw",
    logo: "/images/operators/bofinet-logo.png",
    banner: "/images/operators/bofinet-banner.png",
  },
  {
    name: "BW Post",
    type: "Postal",
    fullName: "Botswana Post",
    description:
      "The designated universal postal service provider, operating a nationwide network of post offices and courier services.",
    licenceNo: "BOCRA/PST/001/2013",
    since: "1989",
    services: ["Mail Delivery", "Courier", "Financial Services"],
    website: "https://www.botswanapost.co.bw",
    logo: "/images/operators/bwpost-logo.png",
    banner: "/images/operators/bwpost-banner.png",
  },
  {
    name: "Yarona FM",
    type: "Radio",
    fullName: "Yarona FM",
    description:
      "A leading commercial FM radio broadcaster reaching audiences across Botswana with news, music, and entertainment.",
    licenceNo: "BOCRA/BCR/010/2015",
    since: "2000",
    services: ["FM Broadcasting", "Digital Streaming", "Advertising"],
    website: "https://www.yaronafm.co.bw",
    logo: "/images/operators/yaronafm-logo.png",
    banner: "/images/operators/yaronafm-banner.png",
  },
  {
    name: "Duma FM",
    type: "Radio",
    fullName: "Duma FM",
    description:
      "Commercial FM station broadcasting popular music, local content, and community-focused programming.",
    licenceNo: "BOCRA/BCR/011/2015",
    since: "2007",
    services: ["FM Broadcasting", "Local Content", "Community Radio"],
    website: "https://www.dumafm.co.bw",
    logo: "/images/operators/dumafm-logo.png",
    banner: "/images/operators/dumafm-banner.png",
  },
  {
    name: "eBotswana",
    type: "TV",
    fullName: "eBotswana Television",
    description:
      "Commercial free-to-air television broadcaster delivering local news, sports, and entertainment programming.",
    licenceNo: "BOCRA/BCT/005/2016",
    since: "2016",
    services: ["Free-to-Air TV", "Local News", "Sports Coverage"],
    website: "https://www.ebotswana.co.bw",
    logo: "/images/operators/ebotswana-logo.png",
    banner: "/images/operators/ebotswana-banner.png",
  },
];

const news = [
  {
    category: "Public Notice",
    title: "BOCRA Publishes Draft Spectrum Policy 2026 for Public Comment",
    date: "15 March 2026",
    excerpt:
      "BOCRA invites public comment on the revised National Frequency Allocation Plan ahead of the IMT 2030 spectrum review.",
    highlight: true,
  },
  {
    category: "Announcement",
    title: "Updated QoS Guidelines for Mobile Broadband Now in Effect",
    date: "10 March 2026",
    excerpt:
      "Updated Quality of Service guidelines for mobile broadband services are now in effect. Operators must comply by 1 June 2026.",
    highlight: false,
  },
  {
    category: "Tender",
    title: "BOCRA Issues Tender for Website Redevelopment",
    date: "5 March 2026",
    excerpt:
      "BOCRA has issued a tender for the design, development, deployment and maintenance of the official BOCRA website.",
    highlight: false,
  },
];

const quickActions = [
  { icon: ShieldCheck, label: "Verify a Licence", href: "/verify", accent: "text-bocra-gold" },
  { icon: FileWarning, label: "File a Complaint", href: "/complaints", accent: "text-bocra-red" },
  { icon: Globe, label: ".bw Domain", href: "/domains", accent: "text-bocra-gold" },
  { icon: BookOpen, label: "Publications", href: "/publications", accent: "text-bocra-gold" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* -- Hero -- */}
      <section className="relative min-h-screen bg-bocra-navy flex flex-col justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/images/hero-cityscape.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-bocra-navy/80" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px),
              repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)`,
          }}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-bocra-navy/60 via-transparent to-bocra-blue/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up" delay={0}>
              <Badge className="mb-6 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                Botswana Communications Regulatory Authority
              </Badge>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={150}>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                Regulate. <span className="text-bocra-gold">Connect.</span>
                <br />
                Protect Botswana.
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
                The unified digital platform for all BOCRA regulatory services
                - licence verification, complaint management, .bw domain
                registry, and more.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={450}>
              <HeroSearch />
            </AnimatedSection>

            {/* Quick actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {quickActions.map(({ icon: Icon, label, href, accent }, i) => (
                <AnimatedSection
                  key={href}
                  animation="fade-up"
                  delay={550 + i * 100}
                >
                  <Link
                    href={href}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-center group"
                  >
                    <Icon
                      className={`w-5 h-5 ${accent} group-hover:scale-110 transition-transform`}
                    />
                    <span className="text-white/80 text-xs font-medium">
                      {label}
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-bocra-surface to-transparent" />
      </section>

      {/* -- Stats Bar -- */}
      <section className="bg-bocra-surface border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }, i) => (
              <AnimatedSection key={label} animation="fade-up" delay={i * 100}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-bocra-navy/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-bocra-navy" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-bocra-navy font-heading">
                      <AnimatedCounter value={value} />
                    </div>
                    <div className="text-sm text-gray-500">{label}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12 items-center">
            <AnimatedSection animation="fade-left">
              <div>
                <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                  Regulatory Sectors
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-bocra-navy">
                  Our Full Mandate
                </h2>
                <p className="mt-3 text-gray-500 max-w-lg">
                  BOCRA regulates six communications sectors under the
                  Communications Regulatory Authority Act 2012, plus .bw ccTLD
                  administration.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-right">
              <div className="relative h-64 lg:h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/elder-technology.jpg"
                  alt="Citizen accessing digital services on a laptop"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-bocra-navy/30 to-transparent" />
              </div>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map(({ icon: Icon, title, desc, href, color }, i) => (
              <AnimatedSection key={href} animation="fade-up" delay={i * 75}>
                <Link href={href}>
                  <Card className="h-full hover:shadow-md transition-shadow border-gray-100 group">
                    <CardContent className="p-5">
                      <div
                        className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-4`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-bocra-navy mb-1.5">
                        {title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {desc}
                      </p>
                      <div className="flex items-center gap-1 mt-4 text-bocra-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* -- Licensed Operators -- */}
      <section className="bg-bocra-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-bocra-navy">
                  Licensed Operators
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Hover over an operator to view details &mdash; all currently
                  hold a valid BOCRA licence
                </p>
              </div>
              <Link
                href="/verify"
                className="hidden sm:flex items-center gap-1 text-sm text-bocra-blue font-medium hover:text-bocra-navy transition-colors"
              >
                Verify any operator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
 
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {operators.map(
              (
                {
                  name,
                  type,
                  fullName,
                  description,
                  licenceNo,
                  since,
                  services,
                  website,
                  logo,
                  banner,
                },
                i
              ) => (
                <AnimatedSection key={name} animation="fade-up" delay={i * 60}>
                  {/* Outer wrapper: relative + group for hover targeting */}
                  <div className="relative group">
 
                    {/* ---- Collapsed card (always visible) ---- */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:border-bocra-gold/40 hover:shadow-sm transition-all cursor-pointer">
                      {/* Small logo — collapsed card */}
                      <div className="w-10 h-10 rounded-full bg-bocra-navy/10 flex items-center justify-center mx-auto mb-2 overflow-hidden">
                        <Image
                          src={logo}
                          alt={`${name} logo`}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <div className="font-semibold text-bocra-navy text-xs">
                        {name}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {type}
                      </div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] text-green-600 font-medium">
                          Active
                        </span>
                      </div>
                    </div>
 
                    {/* ---- Expanded card (appears on hover) ---- */}
                    {/*
                      Positioned absolutely, centered above/below the collapsed card.
                      z-50 ensures it floats above adjacent cards.
                      pointer-events-none on group lets hover work; 
                      the expanded card itself gets pointer-events-auto.
                    */}
                    <div
                      className="
                        absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                        w-64 z-50
                        opacity-0 scale-95 pointer-events-none
                        group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                        transition-all duration-200 ease-out
                      "
                    >
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
 
                        {/* Banner / large logo — expanded card */}
                        <div className="bg-bocra-navy/5 border-b border-gray-100 h-20 flex items-center justify-center relative overflow-hidden">
                          <Image
                            src={banner}
                            alt={`${name} banner`}
                            fill
                            className="object-contain p-4"
                          />
                          {/* Active badge */}
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-[10px] text-green-600 font-semibold">
                              Active
                            </span>
                          </div>
                        </div>
 
                        <div className="p-4">
                          {/* Name + type */}
                          <div className="mb-3">
                            <h4 className="font-bold text-bocra-navy text-sm leading-tight">
                              {fullName}
                            </h4>
                            <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wide text-bocra-gold bg-bocra-gold/10 px-2 py-0.5 rounded-full">
                              {type}
                            </span>
                          </div>
 
                          {/* Description */}
                          <p className="text-gray-500 text-xs leading-relaxed mb-3">
                            {description}
                          </p>
 
                          {/* Services tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {services.map((s) => (
                              <span
                                key={s}
                                className="text-[10px] bg-bocra-navy/5 text-bocra-navy px-2 py-0.5 rounded-full"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
 
                          {/* Licence details */}
                          <div className="border-t border-gray-100 pt-3 space-y-1.5 text-[11px] text-gray-500">
                            <div className="flex justify-between">
                              <span className="font-medium text-bocra-navy">
                                Licence No.
                              </span>
                              <span className="font-mono">{licenceNo}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium text-bocra-navy">
                                Licensed Since
                              </span>
                              <span>{since}</span>
                            </div>
                          </div>
 
                          {/* Website link */}
                          <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 flex items-center justify-center gap-1.5 w-full text-xs font-medium text-bocra-blue hover:text-bocra-navy transition-colors"
                          >
                            Visit Website{" "}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
 
                      {/* Little arrow pointing down to the collapsed card */}
                      <div className="flex justify-center">
                        <div className="w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45 -mt-1.5 shadow-sm" />
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            )}
          </div>
        </div>
      </section>

      {/* -- News & Notices -- */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="flex items-center justify-between mb-10">
              <div>
                <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                  Latest Updates
                </Badge>
                <h2 className="font-heading text-3xl font-bold text-bocra-navy">
                  News & Public Notices
                </h2>
              </div>
              <Link
                href="/publications"
                className="hidden sm:flex items-center gap-1 text-sm text-bocra-blue font-medium hover:text-bocra-navy transition-colors"
              >
                All publications <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          {/* Featured image banner */}
          <AnimatedSection animation="fade-up" className="mb-8">
            <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden">
              <Image
                src="/images/telecom-tower.jpg"
                alt="Telecommunications infrastructure in Botswana"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-bocra-navy/70 via-bocra-navy/40 to-transparent" />
              <div className="absolute inset-0 flex items-center p-8">
                <div>
                  <p className="text-bocra-gold text-xs font-semibold uppercase tracking-widest mb-2">
                    Connecting Botswana
                  </p>
                  <p className="text-white text-lg sm:text-xl font-heading font-bold max-w-md">
                    Building the infrastructure for a digitally inclusive nation
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map(({ category, title, date, excerpt, highlight }, i) => (
              <AnimatedSection key={title} animation="fade-up" delay={i * 120}>
                <Card className="border-gray-100 hover:shadow-md transition-shadow group cursor-pointer h-full">
                  <CardContent className="p-6">
                    <Badge
                      variant="secondary"
                      className={`mb-3 text-xs ${
                        category === "Public Notice"
                          ? "bg-bocra-red/10 text-bocra-red border-bocra-red/20"
                          : highlight
                            ? "bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20"
                            : category === "Tender"
                              ? "bg-blue-50 text-blue-600 border-blue-100"
                              : "bg-gray-100 text-gray-600 border-transparent"
                      }`}
                    >
                      {category}
                    </Badge>
                    <h3 className="font-semibold text-bocra-navy mb-2 leading-snug group-hover:text-bocra-blue transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {date}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* -- Consultation Banner -- */}
      <AnimatedSection animation="fade-in">
        <section className="relative py-16 overflow-hidden">
          <Image
            src="/images/community-meeting.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-bocra-blue/85" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <Badge className="mb-2 bg-white/20 text-white border-white/20 text-xs tracking-widest uppercase">
                Open Consultation
              </Badge>
              <h3 className="font-heading text-2xl font-bold text-white">
                Draft National Spectrum Policy 2026
              </h3>
              <p className="text-white/80 text-sm mt-2 max-w-lg">
                We believe in inclusive policymaking. Have your say on the
                revised National Frequency Allocation Plan. Public comment
                period open until 30 April 2026.
              </p>
            </div>
            <Link
              href="/consultations"
              className="shrink-0 px-6 py-3 bg-bocra-gold hover:bg-bocra-gold/90 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              Submit Comment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </AnimatedSection>

      {/* -- Office Locator -- */}
      <section className="bg-bocra-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade-up">
            <div className="mb-10">
              <Badge className="mb-3 bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs tracking-widest uppercase">
                Visit Us
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-bocra-navy">
                Our Office
              </h2>
              <p className="mt-3 text-gray-500 max-w-lg">
                BOCRA headquarters is located in Gaborone, Botswana. We welcome
                walk-in enquiries during office hours.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <AnimatedSection animation="fade-left" className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm h-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.3326960246245!2d25.91678387536435!3d-24.654996378063966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebb5ba1128f935d%3A0xa164d400c9b368f5!2sBOCRA%20-%20Botswana%20Communication%20Regulatory%20Authority!5e1!3m2!1sen!2sbw!4v1774310861088!5m2!1sen!2sbw"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </AnimatedSection>

            {/* Contact details */}
            <AnimatedSection animation="fade-right">
              <Card className="h-full border-gray-100">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-bocra-navy/10 flex items-center justify-center mb-5">
                      <MapPin className="w-6 h-6 text-bocra-navy" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-bocra-navy mb-4">
                      BOCRA Headquarters
                    </h3>

                    <div className="space-y-4 text-sm text-gray-600">
                      <div>
                        <div className="font-semibold text-bocra-navy text-xs uppercase tracking-wide mb-1">
                          Address
                        </div>
                        <p>
                          Plot 50671, Independence Avenue
                          <br />
                          P/Bag 00495, Gaborone
                          <br />
                          Botswana
                        </p>
                      </div>

                      <div>
                        <div className="font-semibold text-bocra-navy text-xs uppercase tracking-wide mb-1">
                          Telephone
                        </div>
                        <p>+267 395 7755</p>
                      </div>

                      <div>
                        <div className="font-semibold text-bocra-navy text-xs uppercase tracking-wide mb-1">
                          Fax
                        </div>
                        <p>+267 395 7976</p>
                      </div>

                      <div>
                        <div className="font-semibold text-bocra-navy text-xs uppercase tracking-wide mb-1">
                          Email
                        </div>
                        <a
                          href="mailto:info@bocra.org.bw"
                          className="text-bocra-blue hover:text-bocra-navy transition-colors"
                        >
                          info@bocra.org.bw
                        </a>
                      </div>

                      <div>
                        <div className="font-semibold text-bocra-navy text-xs uppercase tracking-wide mb-1">
                          Office Hours
                        </div>
                        <p>Monday - Friday: 07:30 - 16:30</p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          Closed on public holidays
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/BOCRA+Gaborone+Botswana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-bocra-blue hover:text-bocra-navy transition-colors"
                  >
                    Get Directions <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
