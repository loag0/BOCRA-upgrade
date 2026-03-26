"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Inbox,
  Megaphone,
  Bell,
  FileText,
  MessageSquare,
  CalendarDays,
  Newspaper,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import type { NewsArticle, NewsCategory } from "@/types";

const CATEGORY_META: Record<
  NewsCategory,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  public_notice: {
    label: "Public Notice",
    icon: Megaphone,
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  announcement: {
    label: "Announcement",
    icon: Bell,
    color: "text-bocra-blue",
    bg: "bg-blue-50 border-blue-200",
  },
  tender: {
    label: "Tender",
    icon: FileText,
    color: "text-bocra-red",
    bg: "bg-red-50 border-red-200",
  },
  consultation: {
    label: "Consultation",
    icon: MessageSquare,
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
  },
  event: {
    label: "Event",
    icon: CalendarDays,
    color: "text-bocra-green",
    bg: "bg-green-50 border-green-200",
  },
  press_release: {
    label: "Press Release",
    icon: Newspaper,
    color: "text-gray-700",
    bg: "bg-gray-50 border-gray-200",
  },
};

const FILTER_TABS: { value: NewsCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "public_notice", label: "Public Notices" },
  { value: "announcement", label: "Announcements" },
  { value: "press_release", label: "Press Releases" },
  { value: "consultation", label: "Consultations" },
  { value: "tender", label: "Tenders" },
  { value: "event", label: "Events" },
];

function NewsCard({ article }: { article: NewsArticle }) {
const meta = CATEGORY_META[article.category?.toLowerCase() as NewsCategory] ?? CATEGORY_META["announcement"];
  const Icon = meta.icon;

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-BW",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <article className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 overflow-hidden flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${meta.bg} ${meta.color}`}
          >
            <Icon className="w-3 h-3 shrink-0" />
            {meta.label}
          </span>
        </div>

        <h3 className="font-heading text-lg font-bold text-bocra-navy mb-3 leading-snug group-hover:text-bocra-blue transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-bocra-blue opacity-0 group-hover:opacity-100 transition-opacity">
            Read more
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </article>
  );
}

interface NewsFiltersProps {
  articles: NewsArticle[];
}

export function NewsFilters({ articles }: NewsFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<NewsCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = articles;
    if (activeFilter !== "all") {
      result = result.filter((a) => a.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      );
    }
    return result;
  }, [articles, activeFilter, searchQuery]);

  return (
    <>
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search news and events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-gray-200 h-10"
            aria-label="Search news articles"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div
        className="flex flex-wrap gap-2 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300"
        role="tablist"
        aria-label="Filter by category"
      >
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeFilter === tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeFilter === tab.value
                ? "bg-bocra-navy text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-bocra-navy"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-400 mb-6" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        {activeFilter !== "all" &&
          ` in ${FILTER_TABS.find((t) => t.value === activeFilter)?.label}`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-7 h-7 text-gray-400" />
          </div>
          <h3 className="font-heading text-lg font-bold text-bocra-navy mb-2">
            No articles found
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Try adjusting your search or filter to find what you are looking for.
          </p>
          <button
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="text-sm font-medium text-bocra-blue hover:text-bocra-navy transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
