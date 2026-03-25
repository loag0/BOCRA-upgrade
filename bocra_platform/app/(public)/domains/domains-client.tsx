"use client";

import { useState } from "react";
import Image from "next/image";
import { sanitizeText } from "@/lib/sanitize";
import {
  Search,
  CheckCircle2,
  XCircle,
  Globe,
  Shield,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  ArrowRight,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

// Domain zones

const ZONES = [
  { zone: ".co.bw", desc: "Commercial entities", open: true },
  { zone: ".org.bw", desc: "Non-profit organisations", open: true },
  { zone: ".net.bw", desc: "Network infrastructure providers", open: true },
  { zone: ".me.bw", desc: "Individuals / personal sites", open: true },
  { zone: ".shop.bw", desc: "E-commerce & retail", open: true },
  { zone: ".agric.bw", desc: "Agricultural sector", open: true },
  { zone: ".ac.bw", desc: "Academic institutions", open: false },
  { zone: ".gov.bw", desc: "Government bodies only", open: false },
];

// Mock availability

const TAKEN_DOMAINS = new Set([
  "btc.co.bw",
  "mascom.co.bw",
  "orange.co.bw",
  "bofinet.co.bw",
  "bocra.org.bw",
  "gov.co.bw",
  "abc.co.bw",
  "test.co.bw",
  "botswana.co.bw",
  "gaborone.co.bw",
]);

type AvailabilityResult = {
  domain: string;
  available: boolean;
  suggestions?: string[];
};

function checkAvailability(input: string): AvailabilityResult {
  const domain = input
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "");
  const available = !TAKEN_DOMAINS.has(domain);

  if (!available) {
    const base = domain.split(".")[0];
    const suggestions = ZONES.filter((z) => z.open)
      .map((z) => `${base}${z.zone}`)
      .filter((d) => !TAKEN_DOMAINS.has(d))
      .slice(0, 4);
    return { domain, available: false, suggestions };
  }

  return { domain, available: true };
}

// WHOIS mock

const WHOIS_DATA: Record<
  string,
  {
    registrant: string;
    org: string;
    email: string;
    registered: string;
    expires: string;
    nameservers: string[];
  }
> = {
  "btc.co.bw": {
    registrant: "Botswana Telecommunications Corporation Limited",
    org: "BTC",
    email: "domains@btc.bw",
    registered: "1999-04-01",
    expires: "2027-03-31",
    nameservers: ["ns1.btc.bw", "ns2.btc.bw"],
  },
  "mascom.co.bw": {
    registrant: "Mascom Wireless Botswana (Pty) Ltd",
    org: "Mascom",
    email: "it@mascom.bw",
    registered: "2000-06-15",
    expires: "2027-06-14",
    nameservers: ["ns1.mascom.co.bw", "ns2.mascom.co.bw"],
  },
  "bocra.org.bw": {
    registrant: "Botswana Communications Regulatory Authority",
    org: "BOCRA",
    email: "info@bocra.org.bw",
    registered: "2013-04-01",
    expires: "2028-03-31",
    nameservers: ["ns1.bocra.org.bw", "ns2.bocra.org.bw"],
  },
};

// FAQ

const FAQS = [
  {
    q: "Who can register a .bw domain?",
    a: "Any individual or organisation with a connection to Botswana can register .co.bw, .org.bw, .net.bw, .me.bw, .shop.bw, and .agric.bw domains. .ac.bw is restricted to accredited academic institutions. .gov.bw is reserved for Botswana government bodies.",
  },
  {
    q: "How long does registration take?",
    a: "Most .bw domain registrations are processed within 24–48 hours once your application and supporting documents are verified by an accredited registrar.",
  },
  {
    q: "What documents do I need?",
    a: "For .co.bw: company registration certificate (CIPA). For .org.bw: organisation registration documents. For .me.bw: national identity document. For .ac.bw: letter from the registrar of the institution.",
  },
  {
    q: "Can I transfer my domain to another registrar?",
    a: "Yes. Domain transfers between BOCRA-accredited registrars are permitted after a 60-day lock period following initial registration. Contact your current registrar to initiate the transfer.",
  },
  {
    q: "What happens if my domain expires?",
    a: "You have a 30-day grace period after expiry to renew without penalty. After 30 days, the domain enters a redemption period (60 days) with a redemption fee. After 90 days total, the domain is released for re-registration.",
  },
];

// Availability checker

function AvailabilityChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = sanitizeText(input);
    if (!cleanInput) return;
    setLoading(true);
    setTimeout(() => {
      setResult(checkAvailability(cleanInput));
      setLoading(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. mycompany.co.bw"
          className="flex-1 px-4 py-3.5 bg-white rounded-l-xl text-bocra-navy placeholder:text-gray-400 focus:outline-none text-sm border border-white font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3.5 bg-bocra-gold hover:bg-bocra-gold/90 disabled:opacity-60 text-bocra-navy font-semibold rounded-r-xl transition-colors flex items-center gap-2 shrink-0"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-bocra-navy/30 border-t-bocra-navy rounded-full animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          Check
        </button>
      </form>

      {result && (
        <div className="mt-4">
          {result.available ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-5 h-5 text-bocra-green shrink-0" />
                <span className="font-semibold text-bocra-green">
                  Available!
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-mono font-semibold text-bocra-navy">
                  {result.domain}
                </span>{" "}
                is available for registration.
              </p>
              <a
                href="https://nic.net.bw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-8 px-4 bg-bocra-green hover:bg-bocra-green/90 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Register via nic.net.bw <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <XCircle className="w-5 h-5 text-bocra-red shrink-0" />
                <span className="font-semibold text-bocra-navy">
                  Already registered
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-3">
                <span className="font-mono font-semibold text-bocra-navy">
                  {result.domain}
                </span>{" "}
                is taken. Try one of these alternatives:
              </p>
              {result.suggestions && result.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {result.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setInput(s);
                        setResult(checkAvailability(s));
                      }}
                      className="font-mono text-xs border border-gray-200 hover:border-bocra-blue hover:text-bocra-blue px-3 py-1.5 rounded-lg text-bocra-navy transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// WHOIS lookup

function WhoisLookup() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<
    (typeof WHOIS_DATA)[string] | null | "not_found"
  >(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const domain = input.toLowerCase().trim();
    setLoading(true);
    setTimeout(() => {
      setResult(WHOIS_DATA[domain] ?? "not_found");
      setLoading(false);
    }, 400);
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-BW", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="btc.co.bw"
          className="flex-1 h-10 px-3 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-bocra-blue/30 focus:border-bocra-blue placeholder:font-sans placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-10 px-4 bg-bocra-navy hover:bg-bocra-blue disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Search className="w-3.5 h-3.5" />
              Lookup
            </>
          )}
        </button>
      </form>

      {result && result !== "not_found" && (
        <div className="mt-4 bg-bocra-navy/5 border border-bocra-navy/10 rounded-xl p-4 font-mono text-xs space-y-1.5 max-w-md">
          <p>
            <span className="text-gray-400 w-28 inline-block">Domain:</span>{" "}
            <span className="text-bocra-navy font-semibold">
              {input.toLowerCase().trim()}
            </span>
          </p>
          <p>
            <span className="text-gray-400 w-28 inline-block">Registrant:</span>{" "}
            <span className="text-bocra-navy">{result.registrant}</span>
          </p>
          <p>
            <span className="text-gray-400 w-28 inline-block">
              Organisation:
            </span>{" "}
            <span className="text-bocra-navy">{result.org}</span>
          </p>
          <p>
            <span className="text-gray-400 w-28 inline-block">Email:</span>{" "}
            <span className="text-bocra-navy">{result.email}</span>
          </p>
          <p>
            <span className="text-gray-400 w-28 inline-block">Registered:</span>{" "}
            <span className="text-bocra-navy">{fmt(result.registered)}</span>
          </p>
          <p>
            <span className="text-gray-400 w-28 inline-block">Expires:</span>{" "}
            <span className="text-bocra-navy">{fmt(result.expires)}</span>
          </p>
          <div className="pt-1">
            <span className="text-gray-400 inline-block mb-1">
              Name servers:
            </span>
            {result.nameservers.map((ns) => (
              <p key={ns} className="pl-28 text-bocra-navy">
                {ns}
              </p>
            ))}
          </div>
        </div>
      )}

      {result === "not_found" && (
        <p className="mt-3 text-sm text-gray-500">
          No WHOIS record found for{" "}
          <span className="font-mono">{input.toLowerCase().trim()}</span>.
        </p>
      )}
    </div>
  );
}

// FAQ accordion

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="text-sm font-medium text-bocra-navy group-hover:text-bocra-blue transition-colors">
          {q}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <p className="text-sm text-gray-500 leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
}

// Main client component

export function DomainsClient() {
  return (
    <main className="min-h-screen bg-bocra-surface">
      {/* Hero */}
      <div className="bg-bocra-navy pt-24 pb-14 relative overflow-hidden">
        <Image
          src="/images/hero-cityscape.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-20"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection animation="fade-up" delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Globe className="w-3.5 h-3.5" />
              Managed by BOCRA under Section 38(1), CRA Act 2012
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={150}>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
              .bw Domain Registry
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={300}>
            <p className="text-white/70 mb-2 max-w-xl mx-auto">
              Botswana&apos;s country code top-level domain - administered by
              BOCRA on behalf of the nation. Over 8,800 domains registered.
            </p>
            <p className="text-white/40 text-xs mb-10">
              Registration is handled by BOCRA-accredited registrars.{" "}
              <a
                href="https://nic.net.bw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bocra-gold hover:underline inline-flex items-center gap-0.5"
              >
                nic.net.bw <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={450}>
            <AvailabilityChecker />
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Globe, value: "8,800+", label: "Registered domains" },
            { icon: Shield, value: "8", label: "Available zones" },
            { icon: Users, value: "47+", label: "Accredited registrars" },
            { icon: Clock, value: "24–48h", label: "Registration turnaround" },
          ]
            .slice(0, 3)
            .map(({ icon: Icon, value, label }, i) => (
              <AnimatedSection key={label} animation="fade-up" delay={i * 100}>
                <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                  <Icon className="w-5 h-5 text-bocra-blue mx-auto mb-2" />
                  <p className="text-2xl font-bold text-bocra-navy">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              </AnimatedSection>
            ))}
        </div>

        {/* Available zones */}
        <div>
          <AnimatedSection animation="fade-up">
            <h2 className="font-heading text-xl font-bold text-bocra-navy mb-1">
              Available Zones
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Eight .bw domain zones, each serving a different sector.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-3">
            {ZONES.map(({ zone, desc, open }, i) => (
              <AnimatedSection key={zone} animation="fade-up" delay={i * 75}>
                <div
                  className={`flex items-center gap-4 bg-white rounded-xl border px-5 py-4 border-gray-100 ${!open ? "opacity-60" : ""}`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${open ? "bg-bocra-blue/10" : "bg-gray-100"}`}
                  >
                    <Globe
                      className={`w-4 h-4 ${open ? "text-bocra-blue" : "text-gray-400"}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono font-semibold text-bocra-navy text-sm">
                      {zone}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <span
                    className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${open ? "bg-green-50 text-bocra-green" : "bg-gray-100 text-gray-400"}`}
                  >
                    {open ? "Open" : "Restricted"}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Registration steps */}
        <div>
          <AnimatedSection animation="fade-up">
            <h2 className="font-heading text-xl font-bold text-bocra-navy mb-1">
              How to Register
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              .bw domains are registered through BOCRA-accredited registrars - not
              directly through this portal.
            </p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              {
                step: "1",
                title: "Check availability",
                desc: "Use the search above to confirm your chosen domain is available.",
              },
              {
                step: "2",
                title: "Choose a registrar",
                desc: "Contact any BOCRA-accredited registrar. Full list at nic.net.bw.",
              },
              {
                step: "3",
                title: "Submit documents",
                desc: "Provide proof of identity and any sector-specific eligibility documents.",
              },
              {
                step: "4",
                title: "Domain activated",
                desc: "Your registrar submits to the registry. Domain active within 24–48 hours.",
              },
            ].map(({ step, title, desc }, i) => (
              <AnimatedSection key={step} animation="fade-up" delay={i * 120}>
                <div className="bg-white rounded-xl border border-gray-100 p-5 h-full">
                  <div className="w-7 h-7 rounded-full bg-bocra-navy text-white text-xs font-bold flex items-center justify-center mb-3">
                    {step}
                  </div>
                  <p className="text-sm font-semibold text-bocra-navy mb-1">
                    {title}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href="https://nic.net.bw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-10 px-5 bg-bocra-navy hover:bg-bocra-blue text-white text-sm font-medium rounded-lg transition-colors"
            >
              Register at nic.net.bw <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://nic.net.bw/registrars"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-10 px-5 border border-gray-200 bg-white hover:bg-gray-50 text-bocra-navy text-sm font-medium rounded-lg transition-colors"
            >
              Find a registrar <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* WHOIS */}
        <AnimatedSection animation="fade-up">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-1">
            <Info className="w-4 h-4 text-bocra-blue" />
            <h2 className="font-heading text-xl font-bold text-bocra-navy">
              WHOIS Lookup
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Look up the registered owner of any .bw domain. Try{" "}
            <span className="font-mono text-bocra-blue text-xs">btc.co.bw</span>{" "}
            or{" "}
            <span className="font-mono text-xs text-gray-500">
              bocra.org.bw
            </span>
            .
          </p>
          <WhoisLookup />
        </div>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection animation="fade-up">
        <div>
          <h2 className="font-heading text-xl font-bold text-bocra-navy mb-5">
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 px-6">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
        </AnimatedSection>

        {/* Governance footer */}
        <AnimatedSection animation="fade-up">
        <div className="bg-bocra-navy rounded-2xl p-6 text-white">
          <h3 className="font-semibold mb-1">Governance &amp; Policy</h3>
          <p className="text-white/70 text-sm mb-4">
            BOCRA administers the .bw ccTLD under Section 38(1) of the
            Communications Regulatory Authority Act, 2012, as mandated by the
            Ministry of Transport and Communications. Policy is guided by the
            .bw Technical Advisory Committee (TAC).
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Dispute Resolution Policy",
              "Acceptable Use Policy",
              "WHOIS Policy",
              "Registrar Accreditation",
            ].map((doc) => (
              <a
                key={doc}
                href="https://nic.net.bw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/70 hover:text-bocra-gold transition-colors underline underline-offset-2"
              >
                {doc}
              </a>
            ))}
          </div>
        </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
