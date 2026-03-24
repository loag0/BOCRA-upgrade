"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { mockPublications } from "@/lib/mock-data";
import {
  Search,
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  BarChart2,
  Scale,
  MessageSquare,
  FileCheck,
  Megaphone,
  Newspaper,
  Calendar,
} from "lucide-react";

// ── Type metadata ──────────────────────────────────────────────────────────

type PubType =
  | "all"
  | "annual_report"
  | "qos_report"
  | "legislation"
  | "consultation"
  | "tender"
  | "notice"
  | "speech";

// Map URL ?type= values → internal type keys
const URL_TO_TYPE: Record<string, PubType> = {
  "annual-report": "annual_report",
  qos: "qos_report",
  legislation: "legislation",
  consultation: "consultation",
  tender: "tender",
  notice: "notice",
  speech: "speech",
};

const TYPE_META: Record<
  PubType,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  all: {
    label: "All",
    icon: BookOpen,
    color: "text-bocra-navy",
    bg: "bg-bocra-navy/10",
  },
  annual_report: {
    label: "Annual Reports",
    icon: BarChart2,
    color: "text-bocra-blue",
    bg: "bg-bocra-blue/10",
  },
  qos_report: {
    label: "QoS Reports",
    icon: FileCheck,
    color: "text-bocra-green",
    bg: "bg-green-50",
  },
  legislation: {
    label: "Legislation",
    icon: Scale,
    color: "text-purple-700",
    bg: "bg-purple-50",
  },
  consultation: {
    label: "Consultations",
    icon: MessageSquare,
    color: "text-amber-700",
    bg: "bg-amber-50",
  },
  tender: {
    label: "Tenders",
    icon: FileText,
    color: "text-bocra-red",
    bg: "bg-red-50",
  },
  notice: {
    label: "Notices",
    icon: Megaphone,
    color: "text-gray-600",
    bg: "bg-gray-100",
  },
  speech: {
    label: "Speeches",
    icon: Newspaper,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
};

const FILTER_TABS: PubType[] = [
  "all",
  "annual_report",
  "qos_report",
  "legislation",
  "consultation",
  "tender",
];

// ── Publication card ───────────────────────────────────────────────────────

function PubCard({ pub }: { pub: (typeof mockPublications)[number] }) {
  const type = pub.type as PubType;
  const meta = TYPE_META[type] ?? TYPE_META.notice;
  const Icon = meta.icon;

  const formattedDate = new Date(pub.publishedAt).toLocaleDateString("en-BW", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow flex gap-4 group">
      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl ${meta.bg} flex items-center justify-center shrink-0 mt-0.5`}
      >
        <Icon className={`w-5 h-5 ${meta.color}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span
              className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${meta.bg} ${meta.color} mb-2`}
            >
              {meta.label}
            </span>
            <h3 className="text-sm font-semibold text-bocra-navy leading-snug group-hover:text-bocra-blue transition-colors">
              {pub.title}
            </h3>
            {pub.description && (
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                {pub.description}
              </p>
            )}
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </div>
          </div>

          {/* Download */}
          <a
            href={pub.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 h-8 px-3 border border-gray-200 hover:border-bocra-blue hover:bg-bocra-blue hover:text-white text-bocra-navy rounded-lg text-xs font-medium transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            PDF
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function PublicationsPage() {
  const searchParams = useSearchParams();
  const urlType = searchParams.get("type") ?? "all";
  const initialType: PubType = URL_TO_TYPE[urlType] ?? "all";

  const [activeType, setActiveType] = useState<PubType>(initialType);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = mockPublications;
    if (activeType !== "all") list = list.filter((p) => p.type === activeType);
    if (query.trim().length >= 2) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q),
      );
    }
    return list.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, [activeType, query]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero */}
        <div className="bg-bocra-navy pt-24 pb-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
              Publications Library
            </h1>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Annual reports, QoS monitoring data, legislation, consultation
              papers, tenders and official BOCRA notices - all in one place.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search publications…"
                className="w-full pl-10 pr-4 py-3.5 bg-white rounded-xl text-bocra-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bocra-gold/50 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {FILTER_TABS.map((type) => {
              const meta = TYPE_META[type];
              const Icon = meta.icon;
              const isActive = activeType === type;
              return (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-sm font-medium transition-all border ${
                    isActive
                      ? "bg-bocra-navy text-white border-bocra-navy shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-bocra-navy/30 hover:text-bocra-navy"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {meta.label}
                  {isActive && filtered.length > 0 && (
                    <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {filtered.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-bocra-navy font-semibold">
                No publications found
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Try a different search term or category.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveType("all");
                }}
                className="mt-4 text-sm text-bocra-blue hover:text-bocra-navy transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((pub) => (
                <PubCard key={pub.id} pub={pub} />
              ))}
            </div>
          )}

          {/* Footer note */}
          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-400">
            <p>
              {filtered.length} document{filtered.length !== 1 ? "s" : ""} shown
              · For older publications contact{" "}
              <a
                href="mailto:info@bocra.org.bw"
                className="text-bocra-blue hover:text-bocra-navy transition-colors"
              >
                info@bocra.org.bw
              </a>
            </p>
            <a
              href="https://www.bocra.org.bw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-bocra-blue transition-colors"
            >
              bocra.org.bw <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
