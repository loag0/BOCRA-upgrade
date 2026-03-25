"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ChevronRight,
  Download,
  RefreshCw,
  Plus,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import {
  getUserLicences,
  getUserApplications,
  type UserLicence,
  type UserApplication,
} from "@/lib/data";

// Status config

const LICENCE_STATUS: Record<
  string,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  active: {
    label: "Active",
    icon: CheckCircle2,
    color: "text-bocra-green",
    bg: "bg-green-50",
  },
  expiring_soon: {
    label: "Expiring Soon",
    icon: AlertCircle,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  expired: {
    label: "Expired",
    icon: XCircle,
    color: "text-bocra-red",
    bg: "bg-red-50",
  },
  suspended: {
    label: "Suspended",
    icon: XCircle,
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
};

const APP_STATUS: Record<string, { label: string; color: string; bg: string }> =
  {
    draft: { label: "Draft", color: "text-gray-500", bg: "bg-gray-100" },
    submitted: {
      label: "Submitted",
      color: "text-bocra-blue",
      bg: "bg-blue-50",
    },
    under_review: {
      label: "Under Review",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    approved: {
      label: "Approved",
      color: "text-bocra-green",
      bg: "bg-green-50",
    },
    rejected: { label: "Rejected", color: "text-bocra-red", bg: "bg-red-50" },
  };

// Helpers

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-BW", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function daysUntil(iso: string) {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
}

function getLicenceStatus(lic: UserLicence) {
  if (lic.status === "Expired" || lic.status === "Suspended") return lic.status.toLowerCase();
  const days = daysUntil(lic.expiresAt);
  if (days <= 90) return "expiring_soon";
  return "active";
}

// Page

export default function LicencesPage() {
  const [licences, setLicences] = useState<UserLicence[]>([]);
  const [applications, setApplications] = useState<UserApplication[]>([]);

  useEffect(() => {
    getUserLicences().then(setLicences);
    getUserApplications().then(setApplications);
  }, []);

  const activeLicences = licences.filter((l) => l.status !== "Expired");
  const expiredLicences = licences.filter((l) => l.status === "Expired");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-bocra-navy">
            My Licences
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            All BOCRA licences held by your organisation
          </p>
        </div>
        <Link
          href="/portal/apply"
          className="inline-flex items-center gap-2 h-9 px-4 bg-bocra-navy text-white text-sm font-medium rounded-lg hover:bg-bocra-blue transition-colors"
        >
          <Plus className="w-4 h-4" />
          Apply for Licence
        </Link>
      </div>

      {/* Active licences */}
      <section>
        <h2 className="text-xs font-semibold text-bocra-navy uppercase tracking-wider mb-3">
          Active Licences ({activeLicences.length})
        </h2>

        {activeLicences.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">
              No active licences on your account.
            </p>
            <Link
              href="/portal/apply"
              className="mt-3 inline-block text-sm text-bocra-blue hover:underline"
            >
              Apply for your first licence →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {activeLicences.map((lic) => {
              const statusKey = getLicenceStatus(lic);
              const s = LICENCE_STATUS[statusKey] ?? LICENCE_STATUS.active;
              const Icon = s.icon;
              const days = daysUntil(lic.expiresAt);

              return (
                <div
                  key={lic.ref}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  {/* Top strip - amber if expiring soon */}
                  {statusKey === "expiring_soon" && (
                    <div className="h-1 bg-amber-400" />
                  )}

                  <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}
                      >
                        <Icon className={`w-5 h-5 ${s.color}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="font-mono text-xs text-gray-400">
                            {lic.ref}
                          </p>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.color}`}
                          >
                            {s.label}
                          </span>
                          {statusKey === "expiring_soon" && (
                            <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">
                              {days}d left
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-bocra-navy">
                          {lic.category}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {lic.org} · Issued {formatDate(lic.issuedAt)} · Expires{" "}
                          {formatDate(lic.expiresAt)}
                        </p>

                        {lic.conditions.length > 0 && (
                          <div className="mt-3 space-y-1">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Licence conditions
                            </p>
                            {lic.conditions.map((cond, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-1.5 text-xs text-gray-500"
                              >
                                <span className="text-bocra-blue mt-0.5">
                                  ·
                                </span>
                                {cond}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() =>
                            toast.info(
                              "Your licence certificate is being prepared for download.",
                            )
                          }
                          className="flex items-center gap-1.5 h-8 px-3 border border-gray-200 hover:border-bocra-blue hover:text-bocra-blue text-gray-600 text-xs rounded-lg transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Certificate
                        </button>
                        {statusKey === "expiring_soon" && (
                          <button
                            onClick={() =>
                              toast.success(
                                "A renewal application has been started. You'll be redirected shortly.",
                              )
                            }
                            className="flex items-center gap-1.5 h-8 px-3 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-700 text-xs rounded-lg transition-colors font-medium"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Renew
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Applications in progress */}
      <section>
        <h2 className="text-xs font-semibold text-bocra-navy uppercase tracking-wider mb-3">
          Applications ({applications.length})
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {applications.map((app) => {
            const s = APP_STATUS[app.status] ?? APP_STATUS.submitted;
            return (
              <div
                key={app.ref}
                className="p-4 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-mono text-xs text-gray-400">{app.ref}</p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.color}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-bocra-navy">
                    {app.type}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Submitted {formatDate(app.submitted)} · Officer:{" "}
                    {app.assignedTo}
                  </p>
                  {app.notes && (
                    <p className="text-xs text-gray-500 mt-1.5 bg-gray-50 rounded-lg px-3 py-1.5">
                      {app.notes}
                    </p>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-1" />
              </div>
            );
          })}
        </div>
      </section>

      {/* Expired / historical */}
      {expiredLicences.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Expired ({expiredLicences.length})
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 opacity-60">
            {expiredLicences.map((lic) => (
              <div key={lic.ref} className="p-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <XCircle className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-gray-400">{lic.ref}</p>
                  <p className="text-sm text-gray-500">{lic.category}</p>
                  <p className="text-xs text-gray-400">
                    Expired {formatDate(lic.expiresAt)}
                  </p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                  Expired
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Help strip */}
      <div className="bg-bocra-navy/5 rounded-xl px-5 py-4 flex items-center gap-4">
        <Building2 className="w-5 h-5 text-bocra-navy shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-bocra-navy">
            Need help with your licences?
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Contact the Licensing Division at{" "}
            <a
              href="mailto:licensing@bocra.org.bw"
              className="text-bocra-blue hover:underline"
            >
              licensing@bocra.org.bw
            </a>{" "}
            or call +267 395 7755.
          </p>
        </div>
      </div>
    </div>
  );
}
