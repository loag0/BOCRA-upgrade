"use client";

import { useAuth } from "@/lib/auth-context";
import { changePassword, updateDisplayName } from "@/lib/firebase";
import { sanitizeText } from "@/lib/sanitize";
import { logger } from "@/lib/logger";
import Link from "next/link";
import {
  UserCircle,
  Mail,
  Shield,
  FileText,
  MessageSquare,
  Globe,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Trash2,
  Bell,
  ChevronRight,
  Copy,
  ExternalLink,
  Key,
  Pencil,
  Loader2,
  Eye,
  EyeOff,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Replace with real Supabase queries once backend is wired.
// See docs/MOCK_DATA.md for replacement instructions.

const MOCK_COMPLAINTS = [
  {
    caseRef: "CMP-2026-104221",
    operator: "Orange Botswana",
    category: "Billing dispute",
    status: "investigating",
    date: "2026-03-09",
  },
  {
    caseRef: "CMP-2026-098834",
    operator: "Mascom",
    category: "Poor network quality",
    status: "resolved",
    date: "2026-01-14",
  },
  {
    caseRef: "CMP-2025-087102",
    operator: "BTC",
    category: "Unauthorized deductions",
    status: "closed",
    date: "2025-11-22",
  },
];

const MOCK_DOMAINS = [
  {
    domain: "mycompany.co.bw",
    registered: "2024-06-01",
    expires: "2027-05-31",
    status: "active",
  },
];

const MOCK_LICENCES = [
  {
    ref: "BOC-2024-SAP-019",
    type: "SAP - Internet Services",
    issued: "2024-03-01",
    expires: "2027-02-28",
    status: "Active",
  },
];

// Status config

const COMPLAINT_STATUS: Record<
  string,
  { label: string; icon: React.ElementType; color: string; bg: string }
> = {
  received: {
    label: "Received",
    icon: Clock,
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
  acknowledged: {
    label: "Acknowledged",
    icon: CheckCircle2,
    color: "text-bocra-blue",
    bg: "bg-blue-50",
  },
  investigating: {
    label: "Investigating",
    icon: Shield,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  awaiting_operator: {
    label: "Awaiting Operator",
    icon: Clock,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  resolved: {
    label: "Resolved",
    icon: CheckCircle2,
    color: "text-bocra-green",
    bg: "bg-green-50",
  },
  closed: {
    label: "Closed",
    icon: CheckCircle2,
    color: "text-gray-400",
    bg: "bg-gray-100",
  },
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

// Sub-components

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-sm font-semibold text-bocra-navy uppercase tracking-wider">
        {title}
      </h2>
      {action}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  message,
}: {
  icon: React.ElementType;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <Icon className="w-8 h-8 text-gray-200 mb-2" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}

// Component

export function ProfileClient() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Account settings state
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [savingName, setSavingName] = useState(false);

  const [changingPassword, setChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const isGoogleUser = user?.providerData?.[0]?.providerId === "google.com";

  const displayName = user?.displayName ?? user?.email?.split("@")[0] ?? "User";
  const email = user?.email ?? "";
  const initial = displayName.charAt(0).toUpperCase();
  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-BW", {
        month: "long",
        year: "numeric",
      })
    : "March 2026";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard.");
    }
  };

  const handleUpdateName = async () => {
    const clean = sanitizeText(newName);
    if (clean.length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }
    setSavingName(true);
    try {
      await updateDisplayName(clean);
      logger.info("Display name updated", { newName: clean });
      toast.success("Display name updated.");
      setEditingName(false);
      setNewName("");
    } catch (err) {
      logger.error("Failed to update display name", { error: String(err) });
      toast.error("Failed to update name. Please try again.");
    } finally {
      setSavingName(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setSavingPassword(true);
    try {
      await changePassword(currentPassword, newPassword);
      logger.info("Password changed successfully");
      toast.success("Password changed successfully.");
      setChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      logger.error("Password change failed", { error: code });
      if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
        toast.error("Current password is incorrect.");
      } else if (code === "auth/weak-password") {
        toast.error("New password is too weak. Use at least 8 characters.");
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    } finally {
      setSavingPassword(false);
    }
  };

  const activeComplaints = MOCK_COMPLAINTS.filter(
    (c) => c.status !== "resolved" && c.status !== "closed",
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ── Account card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Red accent strip */}
        <div className="h-1.5 bg-linear-to-r from-bocra-red via-bocra-blue to-bocra-green" />

        <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-bocra-navy flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {initial}
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-xl font-bold text-bocra-navy truncate">
              {displayName}
            </h1>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-bocra-blue transition-colors mt-0.5 group"
            >
              <Mail className="w-3.5 h-3.5" />
              {email}
              <Copy
                className={`w-3 h-3 transition-colors ${copied ? "text-bocra-green" : "text-gray-300 group-hover:text-bocra-blue"}`}
              />
            </button>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-bocra-green px-2 py-0.5 rounded-full font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Citizen
              </span>
              <span className="text-xs text-gray-400">
                Member since {joinDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Account Settings ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionHeader
          title="Account Settings"
          action={
            <Settings className="w-4 h-4 text-gray-400" />
          }
        />

        <div className="space-y-4">
          {/* Display name */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-400 mb-0.5">Display Name</p>
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder={displayName}
                    className="flex-1 h-8 px-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-bocra-blue focus:border-transparent outline-none"
                    autoFocus
                    aria-label="New display name"
                  />
                  <button
                    onClick={handleUpdateName}
                    disabled={savingName}
                    className="h-8 px-3 bg-bocra-navy text-white text-xs font-medium rounded-lg hover:bg-bocra-blue transition-colors disabled:opacity-50"
                  >
                    {savingName ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
                  </button>
                  <button
                    onClick={() => { setEditingName(false); setNewName(""); }}
                    className="h-8 px-3 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-bocra-navy">{displayName}</p>
                  <button
                    onClick={() => { setEditingName(true); setNewName(displayName); }}
                    className="p-1 text-gray-400 hover:text-bocra-blue transition-colors rounded"
                    aria-label="Edit display name"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Email (read-only) */}
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Email Address</p>
            <p className="text-sm text-gray-600">{email}</p>
            {isGoogleUser && (
              <p className="text-xs text-gray-400 mt-0.5">Managed by Google</p>
            )}
          </div>

          {/* Change password */}
          {!isGoogleUser && (
            <div>
              <p className="text-xs text-gray-400 mb-1.5">Password</p>
              {changingPassword ? (
                <div className="space-y-3 max-w-sm">
                  <div>
                    <label htmlFor="current-password" className="text-xs text-gray-500 mb-0.5 block">Current password</label>
                    <div className="relative">
                      <input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full h-8 px-3 pr-9 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-bocra-blue focus:border-transparent outline-none"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((v) => !v)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded focus-visible:ring-2 focus-visible:ring-bocra-blue outline-none"
                        aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                      >
                        {showCurrentPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="new-password" className="text-xs text-gray-500 mb-0.5 block">New password</label>
                    <div className="relative">
                      <input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="w-full h-8 px-3 pr-9 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-bocra-blue focus:border-transparent outline-none"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((v) => !v)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded focus-visible:ring-2 focus-visible:ring-bocra-blue outline-none"
                        aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                      >
                        {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="confirm-new-password" className="text-xs text-gray-500 mb-0.5 block">Confirm new password</label>
                    <input
                      id="confirm-new-password"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full h-8 px-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-bocra-blue focus:border-transparent outline-none"
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleChangePassword}
                      disabled={savingPassword}
                      className="h-8 px-4 bg-bocra-navy text-white text-xs font-medium rounded-lg hover:bg-bocra-blue transition-colors disabled:opacity-50"
                    >
                      {savingPassword ? <Loader2 className="w-3 h-3 animate-spin" /> : "Update password"}
                    </button>
                    <button
                      onClick={() => {
                        setChangingPassword(false);
                        setCurrentPassword("");
                        setNewPassword("");
                        setConfirmNewPassword("");
                      }}
                      className="h-8 px-3 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setChangingPassword(true)}
                  className="inline-flex items-center gap-1.5 h-8 px-3 text-xs text-gray-600 border border-gray-200 rounded-lg hover:border-bocra-blue hover:text-bocra-blue transition-colors"
                >
                  <Key className="w-3.5 h-3.5" />
                  Change password
                </button>
              )}
            </div>
          )}

          {/* Auth provider info */}
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Sign-in method: {isGoogleUser ? "Google" : "Email & password"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Active complaint alert ── */}
      {activeComplaints.length > 0 && (
        <div className="bg-bocra-red/5 border border-bocra-red/15 rounded-xl px-5 py-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-bocra-red shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-bocra-red mb-0.5">
              {activeComplaints.length} active complaint
              {activeComplaints.length > 1 ? "s" : ""} in progress
            </p>
            <p className="text-xs text-gray-500">
              {activeComplaints[0].caseRef} - {activeComplaints[0].category}{" "}
              against {activeComplaints[0].operator}
            </p>
          </div>
          <Link
            href={`/complaints/${activeComplaints[0].caseRef}`}
            className="shrink-0 text-xs text-bocra-red font-medium hover:underline flex items-center gap-0.5"
          >
            Track <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {/* ── Complaints ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader
            title="My Complaints"
            action={
              <Link
                href="/complaints"
                className="text-xs text-bocra-blue hover:text-bocra-navy transition-colors"
              >
                New complaint
              </Link>
            }
          />
          {MOCK_COMPLAINTS.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              message="No complaints filed yet."
            />
          ) : (
            <div className="space-y-3">
              {MOCK_COMPLAINTS.map((c) => {
                const s = COMPLAINT_STATUS[c.status] ?? COMPLAINT_STATUS.closed;
                const Icon = s.icon;
                return (
                  <Link
                    key={c.caseRef}
                    href={`/complaints/${c.caseRef}`}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-bocra-surface transition-colors group"
                  >
                    <div
                      className={`w-7 h-7 rounded-full ${s.bg} flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs text-gray-400">
                        {c.caseRef}
                      </p>
                      <p className="text-sm font-medium text-bocra-navy truncate mt-0.5">
                        {c.category}
                      </p>
                      <p className="text-xs text-gray-400">
                        {c.operator} · {formatDate(c.date)}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${s.bg} ${s.color}`}
                    >
                      {s.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Licences ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader
            title="My Licences"
            action={
              <Link
                href="/portal/apply"
                className="text-xs text-bocra-blue hover:text-bocra-navy transition-colors"
              >
                Apply
              </Link>
            }
          />
          {MOCK_LICENCES.length === 0 ? (
            <EmptyState
              icon={FileText}
              message="No licences on your account."
            />
          ) : (
            <div className="space-y-3">
              {MOCK_LICENCES.map((lic) => {
                const days = daysUntil(lic.expires);
                const isExpiringSoon = days <= 90;
                return (
                  <div
                    key={lic.ref}
                    className="p-3 rounded-xl border border-gray-100 hover:border-bocra-blue/20 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-mono text-xs text-gray-400">
                          {lic.ref}
                        </p>
                        <p className="text-sm font-medium text-bocra-navy mt-0.5">
                          {lic.type}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Issued {formatDate(lic.issued)} · Expires{" "}
                          {formatDate(lic.expires)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-xs bg-green-50 text-bocra-green font-medium px-2 py-0.5 rounded-full">
                          {lic.status}
                        </span>
                        {isExpiringSoon && (
                          <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                            {days}d left
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Link
            href="/portal/licences"
            className="flex items-center justify-center gap-1 mt-4 text-xs text-gray-400 hover:text-bocra-blue transition-colors"
          >
            Licensee portal <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* ── .bw Domains ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader
            title=".bw Domains"
            action={
              <Link
                href="/domains"
                className="text-xs text-bocra-blue hover:text-bocra-navy transition-colors"
              >
                Register domain
              </Link>
            }
          />
          {MOCK_DOMAINS.length === 0 ? (
            <EmptyState icon={Globe} message="No .bw domains registered." />
          ) : (
            <div className="space-y-3">
              {MOCK_DOMAINS.map((d) => {
                const days = daysUntil(d.expires);
                return (
                  <div
                    key={d.domain}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-100"
                  >
                    <div>
                      <p className="font-mono font-semibold text-bocra-navy text-sm">
                        {d.domain}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Expires {formatDate(d.expires)} · {days} days
                      </p>
                    </div>
                    <span className="text-xs bg-green-50 text-bocra-green font-medium px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Notification preferences (stub) ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <SectionHeader title="Notifications" />
          <div className="space-y-3">
            {[
              { label: "Complaint status updates", enabled: true },
              { label: "Licence renewal reminders", enabled: true },
              { label: "Domain expiry alerts", enabled: true },
              { label: "BOCRA public consultations", enabled: false },
            ].map(({ label, enabled }) => (
              <div
                key={label}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
                <button
                  onClick={() =>
                    toast.info("Notification preferences coming soon.")
                  }
                  className={`relative w-9 h-5 rounded-full transition-colors ${
                    enabled ? "bg-bocra-blue" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      enabled ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BDPA data rights ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <SectionHeader title="Data Rights - Botswana Data Protection Act 2024" />
        <p className="text-xs text-gray-500 leading-relaxed mb-5">
          Under the BDPA 2024, you have the right to access, correct, and
          request deletion of your personal data held by BOCRA. These rights
          apply to all data collected through this platform.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          <button
            onClick={() =>
              toast.info(
                "Your data export is being prepared. You will receive an email within 24 hours.",
              )
            }
            className="flex items-center gap-2 h-9 px-4 border border-gray-200 hover:border-bocra-blue hover:text-bocra-blue text-gray-600 text-sm rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download my data
          </button>
          <button
            onClick={() =>
              toast.info(
                "A data correction request has been logged. BOCRA will contact you within 5 working days.",
              )
            }
            className="flex items-center gap-2 h-9 px-4 border border-gray-200 hover:border-bocra-blue hover:text-bocra-blue text-gray-600 text-sm rounded-lg transition-colors"
          >
            <UserCircle className="w-3.5 h-3.5" />
            Correct my data
          </button>
          <button
            onClick={() => setDeleteOpen(true)}
            className="flex items-center gap-2 h-9 px-4 border border-bocra-red/20 hover:border-bocra-red hover:bg-bocra-red/5 text-bocra-red text-sm rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete my account
          </button>
        </div>
      </div>

      {/* Account deletion confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your account, personal data, and all
              associated records will be permanently deleted in accordance with
              the Botswana Data Protection Act 2024. A confirmation email will be
              sent to verify this request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setDeleteOpen(false);
                toast.error(
                  "Account deletion requires verification. A confirmation email has been sent.",
                );
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              Delete account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
