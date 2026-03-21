"use client";

import { useState } from "react";
import { Search, CheckCircle2, XCircle, AlertCircle, ExternalLink } from "lucide-react";
import { searchOperators } from "@/lib/mock-data";
import type { Operator } from "@/types";
import { Badge } from "@/components/ui/badge";

const statusConfig = {
  Active: {
    color: "bg-green-50 text-green-700 border-green-200",
    icon: CheckCircle2,
    iconColor: "text-green-500",
  },
  Suspended: {
    color: "bg-red-50 text-red-700 border-red-200",
    icon: XCircle,
    iconColor: "text-red-500",
  },
  Expired: {
    color: "bg-gray-100 text-gray-600 border-gray-200",
    icon: XCircle,
    iconColor: "text-gray-400",
  },
  Pending: {
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    icon: AlertCircle,
    iconColor: "text-yellow-500",
  },
};

const complianceConfig = {
  Compliant: "bg-green-50 text-green-700 border-green-200",
  "Under Review": "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Non-Compliant": "bg-red-50 text-red-700 border-red-200",
};

function OperatorCard({ operator }: { operator: Operator }) {
  const status = statusConfig[operator.status];
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-bocra-navy px-6 py-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-white/50 text-xs font-mono mb-1">{operator.licenceNumber}</p>
          <h2 className="font-heading text-lg font-bold text-white leading-snug">
            {operator.operatorName}
          </h2>
          <p className="text-white/60 text-sm mt-0.5">{operator.categoryFull}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5 flex-shrink-0">
          <StatusIcon className={`w-4 h-4 ${status.iconColor}`} />
          <span className="text-white text-sm font-medium">{operator.status}</span>
        </div>
      </div>

      {/* Details */}
      <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Category</p>
          <p className="text-bocra-navy font-medium text-sm">{operator.subCategory}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Compliance</p>
          <Badge className={`text-xs ${complianceConfig[operator.complianceStatus]}`}>
            {operator.complianceStatus}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Licence Issued</p>
          <p className="text-bocra-navy font-medium text-sm">
            {new Date(operator.issuedAt).toLocaleDateString("en-BW", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Valid Until</p>
          <p className="text-bocra-navy font-medium text-sm">
            {new Date(operator.expiresAt).toLocaleDateString("en-BW", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Licensed Services
          </p>
          <div className="flex flex-wrap gap-1.5">
            {operator.services.map((service) => (
              <span
                key={service}
                className="text-xs bg-bocra-surface text-bocra-navy px-2 py-0.5 rounded-md border border-gray-200"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Address</p>
          <p className="text-bocra-navy text-sm">{operator.address}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Website</p>
          <a
            href={`https://${operator.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bocra-blue text-sm hover:text-bocra-gold transition-colors flex items-center gap-1"
          >
            {operator.website}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="px-6 py-3 bg-bocra-surface border-t border-gray-100 text-xs text-gray-400">
        Verified against BOCRA licence registry · {new Date().toLocaleDateString("en-BW")}
      </div>
    </div>
  );
}

export function VerifySearch() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");

  const results = searchOperators(submitted);
  const hasSearched = submitted.length >= 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(query.trim());
  };

  return (
    <div className="w-full">
      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex w-full max-w-xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Operator name or licence number…"
          className="flex-1 px-4 py-3.5 bg-white rounded-l-xl text-bocra-navy placeholder:text-gray-400 focus:outline-none text-sm border border-white"
        />
        <button
          type="submit"
          className="px-6 py-3.5 bg-bocra-gold hover:bg-bocra-gold/90 text-white font-semibold rounded-r-xl transition-colors flex items-center gap-2 flex-shrink-0"
        >
          <Search className="w-4 h-4" />
          Verify
        </button>
      </form>

      {/* Results */}
      {hasSearched && (
        <div className="mt-8 max-w-xl mx-auto">
          {results.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <XCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-bocra-navy font-semibold mb-1">No licence found</p>
              <p className="text-gray-500 text-sm">
                No BOCRA-licensed operator matches &quot;{submitted}&quot;. Check the
                spelling or try the full operator name.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {results.map((op) => (
                <OperatorCard key={op.id} operator={op} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
