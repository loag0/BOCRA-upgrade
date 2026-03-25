"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { FileText, Loader2, Inbox } from "lucide-react";

interface Application {
  id: string;
  orgId: string;
  licenceType: string;
  status: string;
  createdAt: string;
  submittedAt: string | null;
}

const STATUS_STYLE: Record<string, { label: string; class: string }> = {
  DRAFT: { label: "Draft", class: "bg-gray-100 text-gray-600" },
  SUBMITTED: { label: "Submitted", class: "bg-blue-50 text-bocra-blue" },
  UNDER_REVIEW: { label: "Under Review", class: "bg-amber-50 text-amber-600" },
  APPROVED: { label: "Approved", class: "bg-green-50 text-bocra-green" },
  REJECTED: { label: "Rejected", class: "bg-red-50 text-bocra-red" },
};

const TYPE_LABELS: Record<string, string> = {
  NFP: "Network Facilities Provider",
  SAP: "Service Access Provider",
  BROADCASTING: "Broadcasting",
  POSTAL: "Postal Service",
  TYPE_APPROVAL: "Type Approval",
  RADIO: "Amateur / Aircraft Radio",
  DOMAIN: ".bw Domain Registry",
};

function formatDate(iso: string | null) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-BW", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<Application[]>("/api/licences")
      .then(setApps)
      .catch(() => setError("Failed to load applications."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-xl font-bold text-bocra-navy">
            Licence Applications
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Review and manage licence applications
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {apps.length} total
        </Badge>
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
      ) : apps.length === 0 ? (
        <div className="text-center py-20">
          <Inbox className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">No applications yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Organisation
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Licence Type
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => {
                const s = STATUS_STYLE[app.status] ?? STATUS_STYLE.DRAFT;
                return (
                  <tr
                    key={app.id}
                    className="border-b border-gray-50 hover:bg-bocra-surface/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-bocra-navy">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-300 shrink-0" />
                        {app.orgId}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {TYPE_LABELS[app.licenceType] ?? app.licenceType}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.class}`}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {formatDate(app.submittedAt)}
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
