"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { Users, Plus, Inbox } from "lucide-react";

interface Operator {
  id: string;
  operatorName: string;
  shortName: string;
  licenceNumber: string;
  category: string;
  status: string;
  complianceStatus: string;
  issuedAt: string;
  expiresAt: string;
}

const STATUS_STYLE: Record<string, { label: string; class: string }> = {
  ACTIVE: { label: "Active", class: "bg-green-50 text-bocra-green" },
  SUSPENDED: { label: "Suspended", class: "bg-red-50 text-bocra-red" },
  EXPIRED: { label: "Expired", class: "bg-gray-100 text-gray-500" },
  PENDING: { label: "Pending", class: "bg-amber-50 text-amber-600" },
};

const COMPLIANCE_STYLE: Record<string, { label: string; class: string }> = {
  COMPLIANT: { label: "Compliant", class: "bg-green-50 text-bocra-green" },
  UNDER_REVIEW: { label: "Under Review", class: "bg-amber-50 text-amber-600" },
  NON_COMPLIANT: { label: "Non-Compliant", class: "bg-red-50 text-bocra-red" },
};

const CATEGORY_LABELS: Record<string, string> = {
  NFP: "Network Facilities",
  SAP: "Service Access",
  BROADCASTING: "Broadcasting",
  POSTAL: "Postal",
  TYPE_APPROVAL: "Type Approval",
  RADIO: "Radio",
  DOMAIN: "Domain",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-BW", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function OperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Operator[]>("/api/operators")
      .then(setOperators)
      .catch(() => setError("Failed to load operators."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-bocra-navy">
            Licensed Operators
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage telecommunications operators and licences
          </p>
        </div>
        <Link
          href="/admin/operators/add"
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-bocra-navy text-white text-sm font-medium rounded-lg hover:bg-bocra-blue transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Operator
        </Link>
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
      ) : operators.length === 0 ? (
        <div className="text-center py-20">
          <Inbox className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400 mb-3">No operators registered yet.</p>
          <Link
            href="/admin/operators/add"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-bocra-navy text-white text-xs font-medium rounded-lg hover:bg-bocra-blue transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add first operator
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Operator
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Licence No.
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Compliance
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Expires
                </th>
              </tr>
            </thead>
            <tbody>
              {operators.map((op) => {
                const s = STATUS_STYLE[op.status] ?? STATUS_STYLE.PENDING;
                const c =
                  COMPLIANCE_STYLE[op.complianceStatus] ??
                  COMPLIANCE_STYLE.UNDER_REVIEW;
                return (
                  <tr
                    key={op.id}
                    className="border-b border-gray-50 hover:bg-bocra-surface/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-300 shrink-0" />
                        <div>
                          <p className="font-medium text-bocra-navy">
                            {op.operatorName}
                          </p>
                          <p className="text-xs text-gray-400">{op.shortName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">
                      {op.licenceNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {CATEGORY_LABELS[op.category] ?? op.category}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.class}`}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.class}`}
                      >
                        {c.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(op.expiresAt)}
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
