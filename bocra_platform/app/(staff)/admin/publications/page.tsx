"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileText,
  Scale,
  Megaphone,
  Inbox,
  ExternalLink,
} from "lucide-react";

// Mock publications data for admin management view

const MOCK_PUBLICATIONS = [
  {
    id: "1",
    title: "BOCRA Annual Report 2025",
    type: "ANNUAL_REPORT",
    publishedAt: "2025-09-15",
    fileUrl: "#",
    description: "Comprehensive review of BOCRA activities and achievements for the 2024/25 financial year.",
  },
  {
    id: "2",
    title: "Quality of Service Report Q4 2025",
    type: "QOS_REPORT",
    publishedAt: "2026-01-20",
    fileUrl: "#",
    description: "Quarterly assessment of telecommunications service quality metrics across all operators.",
  },
  {
    id: "3",
    title: "Communications Regulatory Authority Act 2012",
    type: "LEGISLATION",
    publishedAt: "2012-08-01",
    fileUrl: "#",
    description: "The founding legislation establishing BOCRA and its regulatory mandate.",
  },
  {
    id: "4",
    title: "Botswana Data Protection Act 2024",
    type: "LEGISLATION",
    publishedAt: "2024-03-15",
    fileUrl: "#",
    description: "Data protection and privacy legislation governing personal data processing in Botswana.",
  },
  {
    id: "5",
    title: "Public Consultation: 5G Spectrum Allocation",
    type: "CONSULTATION",
    publishedAt: "2026-02-01",
    fileUrl: "#",
    description: "Invitation for public comments on proposed 5G spectrum allocation framework.",
  },
  {
    id: "6",
    title: "Tender: Network Quality Monitoring Equipment",
    type: "TENDER",
    publishedAt: "2026-03-01",
    fileUrl: "#",
    description: "Procurement of automated network quality monitoring systems.",
  },
];

const TYPE_CONFIG: Record<
  string,
  { label: string; icon: React.ElementType; class: string }
> = {
  ANNUAL_REPORT: { label: "Annual Report", icon: BookOpen, class: "bg-blue-50 text-bocra-blue" },
  QOS_REPORT: { label: "QoS Report", icon: FileText, class: "bg-green-50 text-bocra-green" },
  LEGISLATION: { label: "Legislation", icon: Scale, class: "bg-purple-50 text-purple-600" },
  CONSULTATION: { label: "Consultation", icon: Megaphone, class: "bg-amber-50 text-amber-600" },
  TENDER: { label: "Tender", icon: FileText, class: "bg-red-50 text-bocra-red" },
  NOTICE: { label: "Notice", icon: Megaphone, class: "bg-gray-100 text-gray-600" },
  SPEECH: { label: "Speech", icon: BookOpen, class: "bg-blue-50 text-bocra-blue" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-BW", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PublicationsPage() {
  const [filter, setFilter] = useState("ALL");

  const types = ["ALL", ...Object.keys(TYPE_CONFIG)];
  const filtered =
    filter === "ALL"
      ? MOCK_PUBLICATIONS
      : MOCK_PUBLICATIONS.filter((p) => p.type === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-bocra-navy">
            Publications
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage reports, legislation, consultations, and tenders
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {MOCK_PUBLICATIONS.length} documents
        </Badge>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center gap-1 mb-4 bg-gray-50 rounded-lg p-1 w-fit">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filter === t
                ? "bg-white text-bocra-navy shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t === "ALL" ? "All" : (TYPE_CONFIG[t]?.label ?? t)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Inbox className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No publications match this filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((pub) => {
            const t = TYPE_CONFIG[pub.type] ?? TYPE_CONFIG.NOTICE;
            const Icon = t.icon;
            return (
              <div
                key={pub.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-start gap-4 hover:border-bocra-blue/20 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${t.class}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-medium text-bocra-navy">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                        {pub.description}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${t.class}`}
                    >
                      {t.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-400">
                      Published {formatDate(pub.publishedAt)}
                    </span>
                    <a
                      href={pub.fileUrl}
                      className="inline-flex items-center gap-1 text-xs text-bocra-blue hover:text-bocra-navy transition-colors"
                      rel="noopener noreferrer"
                    >
                      View document <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
