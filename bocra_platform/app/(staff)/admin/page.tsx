import {
  FileText,
  MessageSquare,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  RefreshCw,
  Search,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Admin Dashboard - BOCRA Staff Portal" };

// Mock data

const stats = [
  {
    label: "Pending Applications",
    value: "14",
    delta: "+3 this week",
    trend: "up",
    icon: FileText,
    color: "text-bocra-blue",
    bg: "bg-bocra-blue/10",
    href: "/admin/applications",
  },
  {
    label: "Open Complaints",
    value: "37",
    delta: "-5 from last week",
    trend: "down",
    icon: MessageSquare,
    color: "text-amber-600",
    bg: "bg-amber-50",
    href: "/admin/complaints",
  },
  {
    label: "Licensed Operators",
    value: "89",
    delta: "2 pending renewal",
    trend: "neutral",
    icon: Users,
    color: "text-bocra-green",
    bg: "bg-green-50",
    href: "/admin/operators",
  },
  {
    label: "Expiring in 30 Days",
    value: "6",
    delta: "Action required",
    trend: "warn",
    icon: AlertTriangle,
    color: "text-bocra-red",
    bg: "bg-red-50",
    href: "/admin/operators",
  },
];

type AppStatus =
  | "submitted"
  | "under_review"
  | "pending_docs"
  | "approved"
  | "rejected";

const pendingApplications: {
  id: string;
  ref: string;
  org: string;
  type: string;
  submitted: string;
  status: AppStatus;
  assignedTo: string;
}[] = [
  {
    id: "1",
    ref: "APP-2026-001847",
    org: "Kalahari Connect (Pty) Ltd",
    type: "SAP - Internet Services",
    submitted: "2026-03-18",
    status: "under_review",
    assignedTo: "K. Setshogo",
  },
  {
    id: "2",
    ref: "APP-2026-001831",
    org: "SkyLink Botswana",
    type: "NFP-I - Fixed Wireless",
    submitted: "2026-03-15",
    status: "pending_docs",
    assignedTo: "T. Mokoena",
  },
  {
    id: "3",
    ref: "APP-2026-001820",
    org: "Delta Radio (Pty) Ltd",
    type: "Broadcasting - Commercial Radio",
    submitted: "2026-03-14",
    status: "submitted",
    assignedTo: "Unassigned",
  },
  {
    id: "4",
    ref: "APP-2026-001798",
    org: "NetPulse ISP",
    type: "SAP - VANS Provider",
    submitted: "2026-03-10",
    status: "under_review",
    assignedTo: "P. Ditshebo",
  },
  {
    id: "5",
    ref: "APP-2026-001775",
    org: "Gaborone Broadband (Pty) Ltd",
    type: "SAP - Internet Services",
    submitted: "2026-03-08",
    status: "pending_docs",
    assignedTo: "L. Gaobuse",
  },
];

type ComplaintStatus =
  | "received"
  | "acknowledged"
  | "investigating"
  | "awaiting_operator";

const openComplaints: {
  caseRef: string;
  complainant: string;
  operator: string;
  category: string;
  status: ComplaintStatus;
  daysOpen: number;
}[] = [
  {
    caseRef: "CMP-2026-104221",
    complainant: "K. Modise",
    operator: "Orange Botswana",
    category: "Billing dispute",
    status: "investigating",
    daysOpen: 12,
  },
  {
    caseRef: "CMP-2026-104185",
    complainant: "T. Garekwe",
    operator: "Mascom",
    category: "Poor network quality",
    status: "awaiting_operator",
    daysOpen: 9,
  },
  {
    caseRef: "CMP-2026-104177",
    complainant: "S. Baloyi",
    operator: "BTC",
    category: "Unauthorized deductions",
    status: "acknowledged",
    daysOpen: 3,
  },
  {
    caseRef: "CMP-2026-104155",
    complainant: "L. Tshekiso",
    operator: "Botswana Post",
    category: "Postal service delay",
    status: "investigating",
    daysOpen: 18,
  },
  {
    caseRef: "CMP-2026-104140",
    complainant: "P. Nkwe",
    operator: "Orange Botswana",
    category: "Unsolicited messages",
    status: "received",
    daysOpen: 1,
  },
  {
    caseRef: "CMP-2026-104088",
    complainant: "R. Seretse",
    operator: "Mascom",
    category: "Internet speed issues",
    status: "awaiting_operator",
    daysOpen: 22,
  },
];

const expiringLicences: {
  operator: string;
  licenceNo: string;
  category: string;
  expiresAt: string;
  daysLeft: number;
}[] = [
  {
    operator: "BTC",
    licenceNo: "BOC-2013-NFP-001",
    category: "NFP-N (National)",
    expiresAt: "2026-03-31",
    daysLeft: 10,
  },
  {
    operator: "Mascom",
    licenceNo: "BOC-2013-NFP-002",
    category: "NFP-N (National)",
    expiresAt: "2026-03-31",
    daysLeft: 10,
  },
  {
    operator: "Orange Botswana",
    licenceNo: "BOC-2013-NFP-003",
    category: "NFP-N (National)",
    expiresAt: "2026-03-31",
    daysLeft: 10,
  },
  {
    operator: "Botswana Post",
    licenceNo: "BOC-2013-POST-001",
    category: "Postal Service",
    expiresAt: "2026-03-31",
    daysLeft: 10,
  },
  {
    operator: "BoFiNet",
    licenceNo: "BOC-2013-NFP-004",
    category: "NFP-N (Wholesale)",
    expiresAt: "2026-08-31",
    daysLeft: 163,
  },
  {
    operator: "Delta Connect ISP",
    licenceNo: "BOC-2024-SAP-018",
    category: "SAP - Internet",
    expiresAt: "2026-04-15",
    daysLeft: 25,
  },
];

// Status badges

const APP_STATUS: Record<AppStatus, { label: string; className: string }> = {
  submitted: { label: "Submitted", className: "bg-blue-50 text-bocra-blue" },
  under_review: {
    label: "Under Review",
    className: "bg-amber-50 text-amber-700",
  },
  pending_docs: {
    label: "Pending Docs",
    className: "bg-purple-50 text-purple-700",
  },
  approved: { label: "Approved", className: "bg-green-50 text-bocra-green" },
  rejected: { label: "Rejected", className: "bg-red-50 text-bocra-red" },
};

const COMPLAINT_STATUS: Record<
  ComplaintStatus,
  { label: string; className: string }
> = {
  received: { label: "Received", className: "bg-gray-100 text-gray-600" },
  acknowledged: {
    label: "Acknowledged",
    className: "bg-blue-50 text-bocra-blue",
  },
  investigating: {
    label: "Investigating",
    className: "bg-amber-50 text-amber-700",
  },
  awaiting_operator: {
    label: "Awaiting Operator",
    className: "bg-purple-50 text-purple-700",
  },
};

function StatusBadge({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}

// Helpers

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-BW", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function DaysOpenBadge({ days }: { days: number }) {
  const cls =
    days >= 20
      ? "text-bocra-red font-semibold"
      : days >= 10
        ? "text-amber-600 font-medium"
        : "text-gray-400";
  return <span className={`text-xs ${cls}`}>{days}d</span>;
}

function DaysLeftBadge({ days }: { days: number }) {
  const cls =
    days <= 14
      ? "bg-red-50 text-bocra-red font-semibold"
      : days <= 30
        ? "bg-amber-50 text-amber-700 font-medium"
        : "bg-gray-100 text-gray-500";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${cls}`}
    >
      {days}d left
    </span>
  );
}

// Page

export default function AdminPage() {
  const today = new Date().toLocaleDateString("en-BW", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-bocra-navy">
            Staff Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">{today}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/complaints"
            className="inline-flex items-center gap-1.5 h-9 px-4 bg-bocra-navy hover:bg-bocra-blue text-white text-sm font-medium rounded-lg transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Review Complaints
          </Link>
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-1.5 h-9 px-4 border border-gray-200 bg-white hover:bg-gray-50 text-bocra-navy text-sm font-medium rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            Applications
          </Link>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}
              >
                <s.icon className={`w-4.5 h-4.5 ${s.color}`} />
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-bocra-navy transition-colors" />
            </div>
            <p className="text-2xl font-bold text-bocra-navy">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            <p
              className={`text-xs mt-1 flex items-center gap-1 ${
                s.trend === "up"
                  ? "text-amber-600"
                  : s.trend === "down"
                    ? "text-bocra-green"
                    : s.trend === "warn"
                      ? "text-bocra-red"
                      : "text-gray-400"
              }`}
            >
              {s.trend === "up" && <TrendingUp className="w-3 h-3" />}
              {s.trend === "down" && <TrendingDown className="w-3 h-3" />}
              {s.trend === "warn" && <AlertTriangle className="w-3 h-3" />}
              {s.delta}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Pending applications - takes 2 cols */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-bocra-blue" />
              <h2 className="text-sm font-semibold text-bocra-navy">
                Licence Applications
              </h2>
              <span className="text-xs bg-bocra-blue/10 text-bocra-blue font-medium px-2 py-0.5 rounded-full">
                {
                  pendingApplications.filter(
                    (a) => a.status !== "approved" && a.status !== "rejected",
                  ).length
                }{" "}
                active
              </span>
            </div>
            <Link
              href="/admin/applications"
              className="text-xs text-bocra-blue hover:text-bocra-navy transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {pendingApplications.map((app) => {
              const s = APP_STATUS[app.status];
              return (
                <div
                  key={app.id}
                  className="px-5 py-3.5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs text-gray-400">
                          {app.ref}
                        </span>
                        <StatusBadge label={s.label} className={s.className} />
                      </div>
                      <p className="text-sm font-medium text-bocra-navy mt-0.5 truncate">
                        {app.org}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{app.type}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-gray-400">
                        {formatDate(app.submitted)}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {app.assignedTo}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-5 py-3 border-t border-gray-50">
            <Link
              href="/admin/applications"
              className="text-xs text-gray-400 hover:text-bocra-blue transition-colors"
            >
              Show all 14 pending applications →
            </Link>
          </div>
        </div>

        {/* Expiring licences - 1 col */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-bocra-red" />
              <h2 className="text-sm font-semibold text-bocra-navy">
                Expiring Licences
              </h2>
            </div>
            <Link
              href="/admin/operators"
              className="text-xs text-bocra-blue hover:text-bocra-navy transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {expiringLicences.slice(0, 5).map((lic) => (
              <div
                key={lic.licenceNo}
                className="px-5 py-3 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-bocra-navy truncate">
                      {lic.operator}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {lic.category}
                    </p>
                  </div>
                  <DaysLeftBadge days={lic.daysLeft} />
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-gray-50">
            <p className="text-xs text-gray-400">
              Showing {Math.min(5, expiringLicences.length)} of{" "}
              {expiringLicences.length} expiring within 180 days
            </p>
          </div>
        </div>
      </div>

      {/* Open complaints */}
      <div className="bg-white rounded-xl border border-gray-100 mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-semibold text-bocra-navy">
              Open Complaints
            </h2>
            <span className="text-xs bg-amber-50 text-amber-700 font-medium px-2 py-0.5 rounded-full">
              37 total
            </span>
          </div>
          <Link
            href="/admin/complaints"
            className="text-xs text-bocra-blue hover:text-bocra-navy transition-colors flex items-center gap-1"
          >
            Manage all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                  Case Ref
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                  Complainant
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                  Operator
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">
                  Age
                </th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {openComplaints.map((c) => {
                const cs = COMPLAINT_STATUS[c.status];
                return (
                  <tr
                    key={c.caseRef}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-mono text-xs text-gray-500">
                      {c.caseRef}
                    </td>
                    <td className="px-5 py-3.5 text-bocra-navy font-medium">
                      {c.complainant}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{c.operator}</td>
                    <td className="px-5 py-3.5 text-gray-500">{c.category}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge label={cs.label} className={cs.className} />
                    </td>
                    <td className="px-5 py-3.5">
                      <DaysOpenBadge days={c.daysOpen} />
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/complaints/${c.caseRef}`}
                        className="text-xs text-bocra-blue hover:text-bocra-navy transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked list */}
        <div className="md:hidden divide-y divide-gray-50">
          {openComplaints.map((c) => {
            const cs = COMPLAINT_STATUS[c.status];
            return (
              <div key={c.caseRef} className="px-5 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-gray-400">
                      {c.caseRef}
                    </p>
                    <p className="text-sm font-medium text-bocra-navy mt-0.5">
                      {c.complainant} - {c.operator}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{c.category}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <StatusBadge label={cs.label} className={cs.className} />
                    <DaysOpenBadge days={c.daysOpen} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-5 py-3 border-t border-gray-50">
          <Link
            href="/admin/complaints"
            className="text-xs text-gray-400 hover:text-bocra-blue transition-colors"
          >
            Show all 37 open complaints →
          </Link>
        </div>
      </div>

      {/* Quick links strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            href: "/admin/operators",
            icon: Search,
            label: "Operator Registry",
            desc: "89 licensed operators",
          },
          {
            href: "/admin/analytics",
            icon: TrendingUp,
            label: "QoS Analytics",
            desc: "Network quality metrics",
          },
          {
            href: "/admin/publications",
            icon: BookOpen,
            label: "Publications",
            desc: "Upload new documents",
          },
          {
            href: "/admin/settings",
            icon: RefreshCw,
            label: "System",
            desc: "Users & configuration",
          },
        ].map(({ href, icon: Icon, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-xl border border-gray-100 px-4 py-4 hover:shadow-md transition-shadow group flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-bocra-navy/5 group-hover:bg-bocra-navy/10 flex items-center justify-center shrink-0 transition-colors">
              <Icon className="w-4 h-4 text-bocra-navy" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-bocra-navy truncate">
                {label}
              </p>
              <p className="text-xs text-gray-400 truncate">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function BookOpen({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
