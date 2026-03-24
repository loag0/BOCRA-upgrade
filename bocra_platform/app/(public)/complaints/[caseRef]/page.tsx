"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Search,
  AlertCircle,
  FileText,
  Mail,
  Phone,
  RefreshCw,
  Circle,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

type StatusKey =
  | "received"
  | "acknowledged"
  | "investigating"
  | "awaiting_operator"
  | "resolved"
  | "closed";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: StatusKey;
}

interface ComplaintRecord {
  caseRef: string;
  operator: string;
  category: string;
  submittedDate: string;
  currentStatus: StatusKey;
  timeline: TimelineEvent[];
  assignedOfficer: string;
  nextAction: string;
  targetResolutionDate: string;
}

// ── Mock-data seeded from case ref ─────────────────────────────────────────

const STATUS_ORDER: StatusKey[] = [
  "received",
  "acknowledged",
  "investigating",
  "awaiting_operator",
  "resolved",
];

const OPERATORS = [
  "BTC",
  "Mascom",
  "Orange Botswana",
  "BoFiNet",
  "Botswana Post",
];
const CATEGORIES = [
  "Poor network coverage / signal quality",
  "Billing and overcharging dispute",
  "Unsatisfactory customer service",
  "Internet speed and data issues",
  "Unauthorized charges / deductions",
  "Postal service delays",
];

const OFFICERS = [
  "Ms. T. Mokoena",
  "Mr. K. Setshogo",
  "Ms. P. Ditshebo",
  "Mr. L. Gaobuse",
];

function seedFromRef(caseRef: string): number {
  let hash = 0;
  for (let i = 0; i < caseRef.length; i++) {
    hash = (hash * 31 + caseRef.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildMockRecord(caseRef: string): ComplaintRecord | null {
  // Validate format: CMP-YYYY-XXXXXX
  if (!/^CMP-\d{4}-\d{6}$/.test(caseRef)) return null;

  const seed = seedFromRef(caseRef);
  const stageIndex = seed % STATUS_ORDER.length;
  const currentStatus = STATUS_ORDER[stageIndex];

  const year = caseRef.slice(4, 8);
  const num = parseInt(caseRef.slice(9));
  const baseMonth = (num % 9) + 1;
  const baseDay = (num % 20) + 1;

  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (m: number, d: number) => `${year}-${pad(m)}-${pad(d)}`;

  const submittedDate = fmt(baseMonth, baseDay);

  const operator = OPERATORS[seed % OPERATORS.length];
  const category = CATEGORIES[(seed >> 3) % CATEGORIES.length];
  const officer = OFFICERS[(seed >> 5) % OFFICERS.length];

  const dayAfter = (date: string, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  };

  const allEvents: TimelineEvent[] = [
    {
      date: submittedDate,
      title: "Complaint Received",
      description:
        "Your complaint has been received and logged in the BOCRA case management system.",
      status: "received",
    },
    {
      date: dayAfter(submittedDate, 2),
      title: "Complaint Acknowledged",
      description: `Your case has been assigned to ${officer}, Consumer Affairs Officer. An acknowledgement notice has been sent to your email.`,
      status: "acknowledged",
    },
    {
      date: dayAfter(submittedDate, 5),
      title: "Investigation Commenced",
      description: `BOCRA has initiated a formal investigation. ${operator} has been formally notified and required to provide a written response within 7 working days.`,
      status: "investigating",
    },
    {
      date: dayAfter(submittedDate, 12),
      title: "Awaiting Operator Response",
      description: `BOCRA is reviewing the response provided by ${operator}. A determination will be made based on the evidence submitted by both parties.`,
      status: "awaiting_operator",
    },
    {
      date: dayAfter(submittedDate, 21),
      title: "Complaint Resolved",
      description: `BOCRA has issued its determination. ${operator} has been directed to remediate the issue and provide compensation where applicable. A formal decision letter has been sent to your email.`,
      status: "resolved",
    },
  ];

  // Only include events up to and including current stage
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);
  const timeline = allEvents.slice(0, currentIndex + 1);

  const nextActions: Record<StatusKey, string> = {
    received:
      "Your complaint is being reviewed. An officer will be assigned within 2 working days.",
    acknowledged:
      "The assigned officer is reviewing your complaint before formally notifying the operator.",
    investigating: `BOCRA is waiting for ${operator}'s formal response. This typically takes 7–10 working days.`,
    awaiting_operator:
      "BOCRA is reviewing the operator's response and preparing a determination.",
    resolved:
      "This complaint has been resolved. Check your email for the formal decision letter.",
    closed:
      "This case has been closed. Contact BOCRA if you require further assistance.",
  };

  return {
    caseRef,
    operator,
    category,
    submittedDate,
    currentStatus,
    timeline,
    assignedOfficer: officer,
    nextAction: nextActions[currentStatus],
    targetResolutionDate: dayAfter(submittedDate, 30),
  };
}

// ── Status styling ─────────────────────────────────────────────────────────

const STATUS_META: Record<
  StatusKey,
  { label: string; color: string; bgColor: string; icon: React.ReactNode }
> = {
  received: {
    label: "Received",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    icon: <FileText className="w-4 h-4" />,
  },
  acknowledged: {
    label: "Acknowledged",
    color: "text-bocra-blue",
    bgColor: "bg-blue-50",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  investigating: {
    label: "Under Investigation",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    icon: <Search className="w-4 h-4" />,
  },
  awaiting_operator: {
    label: "Awaiting Operator Response",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    icon: <Clock className="w-4 h-4" />,
  },
  resolved: {
    label: "Resolved",
    color: "text-bocra-green",
    bgColor: "bg-green-50",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  closed: {
    label: "Closed",
    color: "text-gray-500",
    bgColor: "bg-gray-100",
    icon: <AlertCircle className="w-4 h-4" />,
  },
};

// ── Timeline dot ───────────────────────────────────────────────────────────

function TimelineDot({
  status,
  isCurrent,
  isPast,
}: {
  status: StatusKey;
  isCurrent: boolean;
  isPast: boolean;
}) {
  if (status === "resolved" && isPast) {
    return (
      <div className="w-8 h-8 rounded-full bg-bocra-green flex items-center justify-center ring-4 ring-white shadow">
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>
    );
  }
  if (isCurrent) {
    return (
      <div className="w-8 h-8 rounded-full bg-bocra-blue flex items-center justify-center ring-4 ring-white shadow">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>
    );
  }
  if (isPast) {
    return (
      <div className="w-8 h-8 rounded-full bg-bocra-green flex items-center justify-center ring-4 ring-white shadow">
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ring-4 ring-white">
      <Circle className="w-3 h-3 text-gray-400" />
    </div>
  );
}

// ── Search form (redirect to same page) ───────────────────────────────────

function LookupOtherCase() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const ref = (
          e.currentTarget.elements.namedItem("ref") as HTMLInputElement
        ).value
          .trim()
          .toUpperCase();
        if (ref) window.location.href = `/complaints/${ref}`;
      }}
      className="flex gap-2"
    >
      <input
        name="ref"
        placeholder="e.g. CMP-2026-123456"
        className="flex-1 h-9 rounded-lg border border-gray-200 px-3 text-sm font-mono placeholder:font-sans placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-bocra-blue/30 focus:border-bocra-blue transition"
      />
      <button
        type="submit"
        className="h-9 px-4 bg-bocra-navy hover:bg-bocra-blue text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
      >
        <Search className="w-3.5 h-3.5" />
        Look up
      </button>
    </form>
  );
}

// ── Not found state ────────────────────────────────────────────────────────

function NotFound({ caseRef }: { caseRef: string }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          <Link
            href="/complaints"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-bocra-navy transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Submit a complaint
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-bocra-red" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-bocra-navy mb-2">
              Case not found
            </h1>
            <p className="text-gray-500 text-sm mb-1">
              We could not find a complaint with the reference:
            </p>
            <p className="font-mono text-bocra-navy font-semibold mb-6">
              {caseRef}
            </p>
            <p className="text-gray-500 text-sm mb-8">
              Please check the reference number and try again. Case references
              are in the format{" "}
              <span className="font-mono">CMP-YYYY-XXXXXX</span>.
            </p>
            <div className="max-w-sm mx-auto">
              <LookupOtherCase />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function ComplaintTrackerPage() {
  const params = useParams();
  const caseRef =
    typeof params.caseRef === "string" ? params.caseRef.toUpperCase() : "";

  const record = buildMockRecord(caseRef);

  if (!record) return <NotFound caseRef={caseRef} />;

  const meta = STATUS_META[record.currentStatus];
  const currentStageIndex = STATUS_ORDER.indexOf(record.currentStatus);
  const isResolved =
    record.currentStatus === "resolved" || record.currentStatus === "closed";

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-BW", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {/* Back link */}
          <Link
            href="/complaints"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-bocra-navy transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Submit a new complaint
          </Link>

          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-3xl font-bold text-bocra-navy leading-tight">
                Complaint Tracker
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Case reference:{" "}
                <span className="font-mono font-semibold text-bocra-navy">
                  {record.caseRef}
                </span>
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${meta.bgColor} ${meta.color} self-start`}
            >
              {meta.icon}
              {meta.label}
            </span>
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Case Summary
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Operator</p>
                <p className="text-sm font-semibold text-bocra-navy">
                  {record.operator}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Submitted</p>
                <p className="text-sm font-semibold text-bocra-navy">
                  {formatDate(record.submittedDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Assigned to</p>
                <p className="text-sm font-semibold text-bocra-navy">
                  {record.assignedOfficer}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">
                  Target resolution
                </p>
                <p className="text-sm font-semibold text-bocra-navy">
                  {formatDate(record.targetResolutionDate)}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-4">
                <p className="text-xs text-gray-400 mb-0.5">Category</p>
                <p className="text-sm font-semibold text-bocra-navy">
                  {record.category}
                </p>
              </div>
            </div>
          </div>

          {/* Next action banner */}
          <div
            className={`rounded-xl px-5 py-4 mb-6 flex items-start gap-3 ${
              isResolved
                ? "bg-green-50 border border-green-100"
                : "bg-bocra-blue/5 border border-bocra-blue/10"
            }`}
          >
            {isResolved ? (
              <CheckCircle2 className="w-5 h-5 text-bocra-green mt-0.5 shrink-0" />
            ) : (
              <RefreshCw className="w-5 h-5 text-bocra-blue mt-0.5 shrink-0" />
            )}
            <div>
              <p
                className={`text-sm font-semibold mb-0.5 ${
                  isResolved ? "text-bocra-green" : "text-bocra-blue"
                }`}
              >
                {isResolved ? "Case closed" : "Next step"}
              </p>
              <p className="text-sm text-gray-600">{record.nextAction}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">
              Case Timeline
            </h2>

            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-4 top-4 bottom-4 w-px bg-gray-100" />

              <div className="space-y-0">
                {record.timeline.map((event, i) => {
                  const isCurrent = i === record.timeline.length - 1;
                  const isPast = i < record.timeline.length - 1;

                  return (
                    <div key={i} className="relative flex gap-5 pb-8 last:pb-0">
                      <div className="relative z-10 shrink-0">
                        <TimelineDot
                          status={event.status}
                          isCurrent={isCurrent}
                          isPast={isPast}
                        />
                      </div>
                      <div className="pt-1 pb-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2 mb-1">
                          <p
                            className={`text-sm font-semibold ${
                              isCurrent ? "text-bocra-navy" : "text-gray-700"
                            }`}
                          >
                            {event.title}
                          </p>
                          {isCurrent && (
                            <span className="text-xs bg-bocra-blue/10 text-bocra-blue font-medium px-2 py-0.5 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mb-1.5">
                          {formatDate(event.date)}
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Future stages (greyed out) */}
                {STATUS_ORDER.slice(currentStageIndex + 1).map(
                  (futureStatus) => {
                    const futureMeta = STATUS_META[futureStatus];
                    return (
                      <div
                        key={futureStatus}
                        className="relative flex gap-5 pb-8 last:pb-0 opacity-35"
                      >
                        <div className="relative z-10 shrink-0">
                          <TimelineDot
                            status={futureStatus}
                            isCurrent={false}
                            isPast={false}
                          />
                        </div>
                        <div className="pt-1 pb-1">
                          <p className="text-sm font-semibold text-gray-400">
                            {futureMeta.label}
                          </p>
                          <p className="text-xs text-gray-300 mt-0.5">
                            Pending
                          </p>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* Contact / help */}
          <div className="bg-bocra-navy rounded-2xl p-6 text-white mb-6">
            <h2 className="font-semibold mb-1">Need to follow up?</h2>
            <p className="text-white/70 text-sm mb-5">
              Contact BOCRA quoting your case reference{" "}
              <span className="font-mono text-bocra-gold">
                {record.caseRef}
              </span>
              .
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="tel:+2673957755"
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-bocra-blue/20 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-bocra-gold" />
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-0.5">
                    Consumer Affairs
                  </p>
                  <p className="text-sm font-medium group-hover:text-bocra-gold transition-colors">
                    +267 395 7755
                  </p>
                </div>
              </a>
              <a
                href="mailto:complaints@bocra.org.bw"
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-bocra-blue/20 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-bocra-gold" />
                </div>
                <div>
                  <p className="text-xs text-white/50 mb-0.5">Email</p>
                  <p className="text-sm font-medium group-hover:text-bocra-gold transition-colors">
                    complaints@bocra.org.bw
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Look up another case */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-bocra-navy mb-3">
              Track a different complaint
            </h2>
            <LookupOtherCase />
          </div>
        </div>
      </main>
    </>
  );
}
