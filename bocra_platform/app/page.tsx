import Link from "next/link";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import { HeroSearch } from "@/components/hero-search";

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
  { name: "BTC", type: "PTO" },
  { name: "Mascom", type: "PTO" },
  { name: "Orange", type: "PTO" },
  { name: "BoFiNet", type: "Wholesale" },
  { name: "BW Post", type: "Postal" },
  { name: "Yarona FM", type: "Radio" },
  { name: "Duma FM", type: "Radio" },
  { name: "eBotswana", type: "TV" },
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
  { icon: ShieldCheck, label: "Verify a Licence", href: "/verify" },
  { icon: FileWarning, label: "File Complaint", href: "/complaints" },
  { icon: Globe, label: ".bw Domain", href: "/domains" },
  { icon: BookOpen, label: "Publications", href: "/publications" },
];

const footerLinks = {
  Services: [
    "Verify Licence",
    "File a Complaint",
    "Complaint Tracker",
    ".bw Domain Registry",
    "Type Approval",
  ],
  Regulatory: [
    "Licensing Framework",
    "QoS Standards",
    "Spectrum Management",
    "Consumer Protection",
    "Publications",
  ],
  "About BOCRA": [
    "Who We Are",
    "Board & Management",
    "Strategic Plan 2024–2029",
    "Annual Reports",
    "Tenders",
    "Careers",
  ],
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-bocra-navy flex flex-col justify-center overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px),
              repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)`,
          }}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-bocra-navy via-bocra-navy to-bocra-blue/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
              Botswana Communications Regulatory Authority
            </Badge>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Regulate.{" "}
              <span className="text-bocra-gold">Connect.</span>
              <br />
              Protect Botswana.
            </h1>

            <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              The unified digital platform for all BOCRA regulatory services —
              licence verification, complaint management, .bw domain registry,
              and more.
            </p>

            <HeroSearch />

            {/* Quick actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {quickActions.map(({ icon: Icon, label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-center group"
                >
                  <Icon className="w-5 h-5 text-bocra-gold group-hover:scale-110 transition-transform" />
                  <span className="text-white/80 text-xs font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bocra-surface to-transparent" />
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-bocra-surface border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-bocra-navy/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-bocra-navy" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-bocra-navy font-heading">
                    {value}
                  </div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map(({ icon: Icon, title, desc, href, color }) => (
              <Link key={href} href={href}>
                <Card className="h-full hover:shadow-md transition-shadow border-gray-100 group">
                  <CardContent className="p-5">
                    <div
                      className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-bocra-navy mb-1.5">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-bocra-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Licensed Operators ── */}
      <section className="bg-bocra-surface py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-bocra-navy">
                Licensed Operators
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Entities currently holding a valid BOCRA licence
              </p>
            </div>
            <Link
              href="/verify"
              className="hidden sm:flex items-center gap-1 text-sm text-bocra-blue font-medium hover:text-bocra-gold transition-colors"
            >
              Verify any operator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {operators.map(({ name, type }) => (
              <div
                key={name}
                className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:border-bocra-gold/40 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-bocra-navy/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-bocra-navy font-bold text-xs">
                    {name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="font-semibold text-bocra-navy text-xs">{name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{type}</div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] text-green-600 font-medium">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── News & Notices ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="hidden sm:flex items-center gap-1 text-sm text-bocra-blue font-medium hover:text-bocra-gold transition-colors"
            >
              All publications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map(({ category, title, date, excerpt, highlight }) => (
              <Card
                key={title}
                className="border-gray-100 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <CardContent className="p-6">
                  <Badge
                    variant="secondary"
                    className={`mb-3 text-xs ${
                      highlight
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
            ))}
          </div>
        </div>
      </section>

      {/* ── Consultation Banner ── */}
      <section className="bg-bocra-blue py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <Badge className="mb-2 bg-white/20 text-white border-white/20 text-xs tracking-widest uppercase">
              Open Consultation
            </Badge>
            <h3 className="font-heading text-xl font-bold text-white">
              Draft National Spectrum Policy 2026
            </h3>
            <p className="text-white/70 text-sm mt-1">
              Public comment period open until 30 April 2026. Have your say.
            </p>
          </div>
          <Link
            href="/consultations"
            className="flex-shrink-0 px-6 py-3 bg-bocra-gold hover:bg-bocra-gold/90 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            Submit Comment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-bocra-navy text-white/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Branding */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-md bg-bocra-gold flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-base">BOCRA</span>
              </div>
              <p className="text-sm leading-relaxed text-white/50 mb-4">
                Botswana Communications Regulatory Authority
                <br />
                Plot 50671, Independence Avenue
                <br />
                Gaborone, Botswana
              </p>
              <p className="text-xs text-white/40">+267 395 7755</p>
              <p className="text-xs text-white/40 mt-0.5">info@bocra.org.bw</p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
                <ul className="space-y-2.5 text-sm">
                  {links.map((item) => (
                    <li key={item}>
                      <Link href="#" className="hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-white/10 mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>
              © 2026 Botswana Communications Regulatory Authority. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">
                Terms of Use
              </Link>
              <Link
                href="/accessibility"
                className="hover:text-white/60 transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
