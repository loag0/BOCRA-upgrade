"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Hash,
  Tag,
  MapPin,
  Globe,
  Calendar,
  ShieldCheck,
  Plus,
  X,
  ChevronLeft,
  Save,
  Loader2,
} from "lucide-react";

const CATEGORIES = [
  { value: "NFP", label: "NFP — Network Facilities Provider" },
  { value: "SAP", label: "SAP — Service Application Provider" },
  { value: "Broadcasting", label: "Broadcasting Licence" },
  { value: "Postal", label: "Postal Service Licence" },
];

const SUB_CATEGORIES: Record<string, string[]> = {
  NFP: ["NFP-N (National)", "NFP-I (International)", "NFP-N (National) — Wholesale"],
  SAP: ["SAP — Internet Services", "SAP — VANS Provider", "SAP — Mobile Virtual"],
  Broadcasting: [
    "Commercial Radio — National",
    "Commercial Radio — Regional",
    "Commercial Television — National",
    "Community Radio",
  ],
  Postal: ["National Postal Operator", "Courier Services"],
};

const STATUS_OPTIONS = ["Active", "Suspended", "Revoked", "Pending"];
const COMPLIANCE_OPTIONS = ["Compliant", "Under Review", "Non-Compliant"];

export default function AddOperatorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serviceInput, setServiceInput] = useState("");

  const [form, setForm] = useState({
    operatorName: "",
    shortName: "",
    licenceNumber: "",
    category: "",
    subCategory: "",
    status: "Active",
    issuedAt: "",
    expiresAt: "",
    complianceStatus: "Compliant",
    services: [] as string[],
    address: "",
    website: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "category" ? { subCategory: "" } : {}),
    }));
  }

  function addService() {
    const trimmed = serviceInput.trim();
    if (!trimmed || form.services.includes(trimmed)) return;
    setForm((prev) => ({ ...prev, services: [...prev.services, trimmed] }));
    setServiceInput("");
  }

  function removeService(s: string) {
    setForm((prev) => ({ ...prev, services: prev.services.filter((x) => x !== s) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.operatorName || !form.licenceNumber || !form.category) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/operators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save operator.");
      }

      router.push("/admin/operators");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const subCategories = SUB_CATEGORIES[form.category] ?? [];

  return (
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-bocra-navy" />
        </button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-bocra-navy">Add Operator</h1>
          <p className="text-sm text-gray-400 mt-0.5">Register a new licensed operator in the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Section: Identity */}
        <Section title="Operator Identity" icon={<Building2 className="w-4 h-4" />}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Operator Name" required>
              <input
                type="text"
                value={form.operatorName}
                onChange={(e) => set("operatorName", e.target.value)}
                placeholder="e.g. Mascom Wireless Botswana (Pty) Ltd"
                className={inputCls}
              />
            </Field>
            <Field label="Short Name / Trading Name">
              <input
                type="text"
                value={form.shortName}
                onChange={(e) => set("shortName", e.target.value)}
                placeholder="e.g. Mascom"
                className={inputCls}
              />
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Address">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="Plot number, area, city"
                  className={`${inputCls} pl-9`}
                />
              </div>
            </Field>
            <Field label="Website">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  placeholder="www.example.co.bw"
                  className={`${inputCls} pl-9`}
                />
              </div>
            </Field>
          </div>
        </Section>

        {/* Section: Licence */}
        <Section title="Licence Details" icon={<Hash className="w-4 h-4" />}>
          <Field label="Licence Number" required>
            <input
              type="text"
              value={form.licenceNumber}
              onChange={(e) => set("licenceNumber", e.target.value)}
              placeholder="e.g. BOC-2013-NFP-001"
              className={inputCls}
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Category" required>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={selectCls}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Sub-Category">
              <select
                value={form.subCategory}
                onChange={(e) => set("subCategory", e.target.value)}
                disabled={!form.category}
                className={`${selectCls} disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <option value="">Select sub-category</option>
                {subCategories.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Date Issued">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={form.issuedAt}
                  onChange={(e) => set("issuedAt", e.target.value)}
                  className={`${inputCls} pl-9`}
                />
              </div>
            </Field>
            <Field label="Expiry Date">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={form.expiresAt}
                  onChange={(e) => set("expiresAt", e.target.value)}
                  className={`${inputCls} pl-9`}
                />
              </div>
            </Field>
          </div>
        </Section>

        {/* Section: Status */}
        <Section title="Status & Compliance" icon={<ShieldCheck className="w-4 h-4" />}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Licence Status">
              <div className="flex gap-2 flex-wrap">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set("status", s)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      form.status === s
                        ? "bg-bocra-navy text-white border-bocra-navy"
                        : "bg-white text-gray-600 border-gray-200 hover:border-bocra-navy"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Compliance Status">
              <div className="flex gap-2 flex-wrap">
                {COMPLIANCE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set("complianceStatus", s)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      form.complianceStatus === s
                        ? s === "Compliant"
                          ? "bg-bocra-green text-white border-bocra-green"
                          : s === "Non-Compliant"
                          ? "bg-bocra-red text-white border-bocra-red"
                          : "bg-amber-500 text-white border-amber-500"
                        : "bg-white text-gray-600 border-gray-200 hover:border-bocra-navy"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </Section>

        {/* Section: Services */}
        <Section title="Services Offered" icon={<Tag className="w-4 h-4" />}>
          <Field label="Add Services">
            <div className="flex gap-2">
              <input
                type="text"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
                placeholder="e.g. Mobile Voice, 4G LTE"
                className={`${inputCls} flex-1`}
              />
              <button
                type="button"
                onClick={addService}
                className="w-10 h-10 rounded-lg bg-bocra-navy hover:bg-bocra-blue text-white flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Press Enter or click + to add each service</p>
          </Field>

          {form.services.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {form.services.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-bocra-blue/10 text-bocra-blue text-sm rounded-full"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeService(s)}
                    className="hover:text-bocra-red transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Section>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-bocra-red text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 pb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="h-10 px-5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-bocra-navy text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="h-10 px-6 rounded-lg bg-bocra-navy hover:bg-bocra-blue text-white text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? "Saving..." : "Save Operator"}
          </button>
        </div>

      </form>
    </div>
  );
}

// ── Reusable sub-components ──────────────────────────────────────────────

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        <span className="text-bocra-blue">{icon}</span>
        <h2 className="text-sm font-semibold text-bocra-navy">{title}</h2>
      </div>
      <div className="px-5 py-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {label}
        {required && <span className="text-bocra-red ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-bocra-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-bocra-blue/30 focus:border-bocra-blue transition-colors";

const selectCls =
  "w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-bocra-navy focus:outline-none focus:ring-2 focus:ring-bocra-blue/30 focus:border-bocra-blue transition-colors appearance-none";