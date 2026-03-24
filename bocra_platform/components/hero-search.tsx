"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const categories = [
  { value: "all", label: "All Services" },
  { value: "licence", label: "Verify Licence" },
  { value: "complaint", label: "File Complaint" },
  { value: "domain", label: ".bw Domain" },
  { value: "publication", label: "Publication" },
];

const routeMap: Record<string, string> = {
  all: "/search",
  licence: "/verify",
  complaint: "/complaints",
  domain: "/domains",
  publication: "/publications",
};

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const base = routeMap[category] ?? "/search";
    router.push(
      query.trim() ? `${base}?q=${encodeURIComponent(query.trim())}` : base,
    );
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-2xl">
      <div className="flex flex-1 bg-white rounded-l-xl overflow-hidden">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-3.5 bg-transparent text-bocra-navy text-sm font-medium border-r border-gray-200 focus:outline-none cursor-pointer min-w-[140px]"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search operators, licences, publications..."
          className="flex-1 px-4 py-3.5 text-bocra-navy placeholder:text-gray-400 focus:outline-none text-sm"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3.5 bg-bocra-gold hover:bg-bocra-gold/90 text-white font-semibold rounded-r-xl transition-colors flex items-center gap-2 shrink-0"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
