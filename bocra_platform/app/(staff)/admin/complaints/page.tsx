"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { MessageSquare, Inbox } from "lucide-react";

interface Complaint {
  id: string;
  caseRef: string;
  complainantName: string;
  complainantEmail: string;
  operator: string;
  category: string;
  status: string;
  description: string;
  createdAt: string;
}

const STATUS_STYLE: Record<string, { label: string; class: string }> = {
  RECEIVED: { label: "Received", class: "bg-gray-100 text-gray-600" },
  INVESTIGATING: { label: "Investigating", class: "bg-amber-50 text-amber-600" },
  RESOLVED: { label: "Resolved", class: "bg-green-50 text-bocra-green" },
  CLOSED: { label: "Closed", class: "bg-gray-100 text-gray-400" },
};

const CATEGORY_LABELS: Record<string, string> = {
  POOR_NETWORK_QUALITY: "Poor Network Quality",
  BILLING_DISPUTE: "Billing Dispute",
  UNSOLICITED_MESSAGES: "Unsolicited Messages",
  UNLICENSED_OPERATOR: "Unlicensed Operator",
  UNFAIR_TERMS: "Unfair Terms",
  TYPE_APPROVAL_VIOLATION: "Type Approval Violation",
  OTHER: "Other",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-BW", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    api
      .get<Complaint[]>("/api/complaints")
      .then(setComplaints)
      .catch(() => setError("Failed to load complaints."))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "ALL"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-bocra-navy">
            Complaints
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Track and manage consumer complaints
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {complaints.length} total
        </Badge>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 mb-4 bg-gray-50 rounded-lg p-1 w-fit">
        {["ALL", "RECEIVED", "INVESTIGATING", "RESOLVED", "CLOSED"].map(
          (s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filter === s
                  ? "bg-white text-bocra-navy shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {s === "ALL" ? "All" : (STATUS_STYLE[s]?.label ?? s)}
            </button>
          ),
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="loading-dots">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-sm text-bocra-red">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Inbox className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">
            {filter === "ALL"
              ? "No complaints filed yet."
              : "No complaints with this status."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Case Ref
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Complainant
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Operator
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Filed
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const s = STATUS_STYLE[c.status] ?? STATUS_STYLE.RECEIVED;
                return (
                  <tr
                    key={c.id}
                    className="border-b border-gray-50 hover:bg-bocra-surface/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-300 shrink-0" />
                        <span className="font-mono text-xs text-bocra-navy font-medium">
                          {c.caseRef}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-bocra-navy">
                          {c.complainantName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {c.complainantEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.operator}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {CATEGORY_LABELS[c.category] ?? c.category}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.class}`}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(c.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
