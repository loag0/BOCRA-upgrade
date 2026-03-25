"use client";

import { useState } from "react";
import {
  Radio,
  Tv,
  Globe,
  Network,
  Mail,
  BadgeCheck,
  Wifi,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Upload,
  X,
  Info,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

/** Maps frontend licence type ids to backend LicenceType enum */
const LICENCE_TYPE_TO_ENUM: Record<string, string> = {
  nfp: "NFP",
  sap: "SAP",
  broadcasting: "BROADCASTING",
  postal: "POSTAL",
  type_approval: "TYPE_APPROVAL",
  radio: "RADIO",
  domain: "DOMAIN",
};

// Licence categories

const LICENCE_TYPES = [
  {
    id: "nfp",
    icon: Network,
    label: "Network Facilities Provider (NFP)",
    desc: "For companies that build and own physical network infrastructure - towers, cables, transmission equipment.",
    examples: "BTC, BoFiNet, Orange Botswana",
    fee: "P 12,000",
    duration: "5 years",
  },
  {
    id: "sap",
    icon: Wifi,
    label: "Service Access Provider (SAP)",
    desc: "For companies that deliver services over a network - internet, VoIP, mobile services - without owning the underlying infrastructure.",
    examples: "ISPs, VoIP providers, VANS operators",
    fee: "P 5,000",
    duration: "3 years",
  },
  {
    id: "broadcasting",
    icon: Tv,
    label: "Broadcasting (System & Service)",
    desc: "For commercial radio and television broadcasters. Covers both the transmission infrastructure (System licence) and the programming service (Service licence).",
    examples: "Yarona FM, Duma FM, eBotswana TV",
    fee: "P 8,000",
    duration: "5 years",
  },
  {
    id: "postal",
    icon: Mail,
    label: "Postal Service",
    desc: "For postal service operators. Required for any company providing letter or parcel delivery services under the Postal Services Act.",
    examples: "Botswana Post, DHL, FedEx",
    fee: "P 3,500",
    duration: "3 years",
  },
  {
    id: "type_approval",
    icon: BadgeCheck,
    label: "Type Approval",
    desc: "Required before any telecommunications equipment can be imported, sold, or used in Botswana. Certifies that the device meets BOCRA's technical standards.",
    examples: "Mobile phones, modems, routers, radio equipment",
    fee: "P 1,200 per model",
    duration: "Until superseded",
  },
  {
    id: "radio",
    icon: Radio,
    label: "Amateur / Aircraft Radio",
    desc: "For individual amateur radio operators and aviation communication operators. Requires passing a BOCRA-administered technical examination.",
    examples: "Ham radio operators, aviation comms",
    fee: "P 350",
    duration: "2 years",
  },
  {
    id: "domain",
    icon: Globe,
    label: ".bw Domain Registry",
    desc: "For organisations registering or managing .bw country code top-level domain names under BOCRA's domain registry.",
    examples: "company.co.bw, org.bw, edu.bw",
    fee: "P 200 / year",
    duration: "1 year (renewable)",
  },
] as const;

type LicenceTypeId = (typeof LICENCE_TYPES)[number]["id"];

// Docs required per category

const REQUIRED_DOCS: Record<LicenceTypeId, string[]> = {
  nfp: [
    "Certificate of Incorporation",
    "PPRA Registration",
    "Tax Clearance Certificate",
    "Network infrastructure plan",
    "Proof of funding (audited accounts or bank guarantee)",
  ],
  sap: [
    "Certificate of Incorporation",
    "PPRA Registration",
    "Tax Clearance Certificate",
    "Service rollout plan",
  ],
  broadcasting: [
    "Certificate of Incorporation",
    "PPRA Registration",
    "Tax Clearance Certificate",
    "Content schedule sample",
    "Technical transmission plan",
    "Local content compliance plan",
  ],
  postal: [
    "Certificate of Incorporation",
    "PPRA Registration",
    "Tax Clearance Certificate",
    "Route coverage map",
  ],
  type_approval: [
    "Device technical specifications (datasheet)",
    "Test report from accredited laboratory",
    "Device photographs (min. 4 angles)",
    "Declaration of conformity",
  ],
  radio: [
    "National ID / passport copy",
    "Medical fitness certificate",
    "Examination pass certificate (for amateurs)",
  ],
  domain: [
    "Certificate of Incorporation",
    "Proof of right to use the domain name",
  ],
};

// Step components

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
              i + 1 < step
                ? "bg-bocra-green text-white"
                : i + 1 === step
                  ? "bg-bocra-navy text-white"
                  : "bg-gray-100 text-gray-400"
            }`}
          >
            {i + 1 < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`h-0.5 w-8 rounded-full ${i + 1 < step ? "bg-bocra-green" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
      <span className="ml-2 text-xs text-gray-400">
        Step {step} of {total}
      </span>
    </div>
  );
}

interface UploadedFile {
  name: string;
  size: number;
  docType: string;
}

// Main page

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<LicenceTypeId | null>(null);
  const [orgName, setOrgName] = useState("");
  const [ppra, setPpra] = useState("");
  const [taxClearance, setTaxClearance] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [caseRef, setCaseRef] = useState("");

  const licenceType = LICENCE_TYPES.find((l) => l.id === selectedType);
  const requiredDocs = selectedType ? REQUIRED_DOCS[selectedType] : [];

  function handleFileAdd(docType: string) {
    // Simulate file pick - replace with real <input type="file"> when wiring uploads
    const fakeName = `${docType.toLowerCase().replace(/[^a-z0-9]/g, "_")}.pdf`;
    if (files.find((f) => f.docType === docType)) {
      toast.info(`${docType} already uploaded.`);
      return;
    }
    setFiles((prev) => [
      ...prev,
      { name: fakeName, size: Math.floor(Math.random() * 2000 + 200), docType },
    ]);
    toast.success(`${docType} attached.`);
  }

  function handleFileRemove(docType: string) {
    setFiles((prev) => prev.filter((f) => f.docType !== docType));
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const result = await api.post<{ id: string }>("/api/licences", {
        orgId: orgName,
        licenceType: LICENCE_TYPE_TO_ENUM[selectedType ?? ""] ?? "SAP",
        documents: files.map((f) => f.name),
      });
      setCaseRef(result.id);
      setSubmitted(true);
    } catch {
      toast.error("Failed to submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Success screen

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-bocra-green" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-bocra-navy mb-2">
          Application Submitted
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Your {licenceType?.label} application has been received. BOCRA will
          review your documents and contact you within 10 working days.
        </p>
        <div className="bg-bocra-surface rounded-xl px-5 py-4 mb-6">
          <p className="text-xs text-gray-400 mb-1">Application Reference</p>
          <div className="flex items-center justify-center gap-2">
            <p className="font-mono text-xl font-bold text-bocra-navy">
              {caseRef}
            </p>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(caseRef);
                  toast.success("Copied!");
                } catch {
                  toast.error("Failed to copy to clipboard.");
                }
              }}
              className="text-gray-400 hover:text-bocra-blue transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Save this reference to track your application
          </p>
        </div>
        <div className="text-xs text-gray-400 bg-blue-50 rounded-xl px-4 py-3 text-left mb-6 flex gap-2">
          <Info className="w-4 h-4 text-bocra-blue shrink-0 mt-0.5" />
          <span>
            A confirmation email has been sent to{" "}
            <strong>{contactEmail}</strong>. You can track this application
            under <strong>My Licences → Applications</strong>.
          </span>
        </div>
        <a
          href="/portal/licences"
          className="inline-flex items-center gap-2 h-10 px-5 bg-bocra-navy text-white text-sm font-medium rounded-lg hover:bg-bocra-blue transition-colors"
        >
          View My Licences <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-bocra-navy">
          Apply for a Licence
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Complete the form below to submit a new licence application to BOCRA.
        </p>
      </div>

      <StepIndicator step={step} total={3} />

      {/* ── Step 1: Select licence type ── */}
      {step === 1 && (
        <div>
          <h2 className="text-sm font-semibold text-bocra-navy mb-4">
            Select Licence Category
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {LICENCE_TYPES.map((lic) => {
              const Icon = lic.icon;
              const isSelected = selectedType === lic.id;
              return (
                <button
                  key={lic.id}
                  onClick={() => setSelectedType(lic.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-bocra-blue bg-blue-50"
                      : "border-gray-100 bg-white hover:border-bocra-blue/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-bocra-blue/10" : "bg-bocra-surface"}`}
                    >
                      <Icon
                        className={`w-4.5 h-4.5 ${isSelected ? "text-bocra-blue" : "text-bocra-navy"}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold leading-tight ${isSelected ? "text-bocra-blue" : "text-bocra-navy"}`}
                      >
                        {lic.label}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        {lic.desc}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">
                          Fee:{" "}
                          <strong className="text-gray-600">{lic.fee}</strong>
                        </span>
                        <span className="text-xs text-gray-400">
                          Duration:{" "}
                          <strong className="text-gray-600">
                            {lic.duration}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              disabled={!selectedType}
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 h-10 px-5 bg-bocra-navy disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg hover:bg-bocra-blue transition-colors"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Organisation details + documents ── */}
      {step === 2 && licenceType && (
        <div>
          <div className="flex items-center gap-3 mb-6 p-3 bg-bocra-surface rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-bocra-navy/10 flex items-center justify-center">
              <licenceType.icon className="w-4 h-4 text-bocra-navy" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Selected category</p>
              <p className="text-sm font-semibold text-bocra-navy">
                {licenceType.label}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Organisation details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-bocra-navy mb-4">
                Organisation Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Legal company name *
                  </label>
                  <input
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="As registered with CIPA/PPRA"
                    className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    PPRA Registration No. *
                  </label>
                  <input
                    value={ppra}
                    onChange={(e) => setPpra(e.target.value)}
                    placeholder="e.g. PPRA-2024-00123"
                    className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Tax Clearance No. *
                  </label>
                  <input
                    value={taxClearance}
                    onChange={(e) => setTaxClearance(e.target.value)}
                    placeholder="e.g. TCC-2024-XXXXX"
                    className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Contact person *
                  </label>
                  <input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Full name"
                    className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Contact email *
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="you@company.co.bw"
                    className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Contact phone
                  </label>
                  <input
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+267 7X XXX XXX"
                    className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue"
                  />
                </div>
              </div>
            </div>

            {/* Document uploads */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-bocra-navy mb-1">
                Required Documents
              </h2>
              <p className="text-xs text-gray-400 mb-4">
                Upload PDF or image files. Max 10 MB per document.
              </p>
              <div className="space-y-2.5">
                {requiredDocs.map((doc) => {
                  const uploaded = files.find((f) => f.docType === doc);
                  return (
                    <div
                      key={doc}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-bocra-surface"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${uploaded ? "bg-bocra-green" : "bg-gray-300"}`}
                        />
                        <span className="text-sm text-gray-700 truncate">
                          {doc}
                        </span>
                      </div>
                      {uploaded ? (
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-bocra-green font-medium">
                            {uploaded.name}
                          </span>
                          <button
                            onClick={() => handleFileRemove(doc)}
                            className="text-gray-400 hover:text-bocra-red transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleFileAdd(doc)}
                          className="shrink-0 flex items-center gap-1.5 h-7 px-3 border border-dashed border-gray-300 hover:border-bocra-blue hover:text-bocra-blue text-gray-500 text-xs rounded-lg transition-colors"
                        >
                          <Upload className="w-3 h-3" />
                          Upload
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 h-10 px-4 border border-gray-200 text-gray-600 hover:border-bocra-navy hover:text-bocra-navy text-sm rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              disabled={!orgName || !ppra || !contactEmail}
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 h-10 px-5 bg-bocra-navy disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg hover:bg-bocra-blue transition-colors"
            >
              Review Application <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Review & submit ── */}
      {step === 3 && licenceType && (
        <div>
          <h2 className="text-sm font-semibold text-bocra-navy mb-4">
            Review & Submit
          </h2>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Licence Category
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-bocra-surface flex items-center justify-center">
                  <licenceType.icon className="w-4.5 h-4.5 text-bocra-navy" />
                </div>
                <div>
                  <p className="font-semibold text-bocra-navy">
                    {licenceType.label}
                  </p>
                  <p className="text-xs text-gray-400">
                    Fee: {licenceType.fee} · Duration: {licenceType.duration}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Organisation
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-400">Company: </span>
                  <span className="text-bocra-navy font-medium">{orgName}</span>
                </div>
                <div>
                  <span className="text-gray-400">PPRA: </span>
                  <span className="text-bocra-navy font-medium">{ppra}</span>
                </div>
                <div>
                  <span className="text-gray-400">Tax Clearance: </span>
                  <span className="text-bocra-navy font-medium">
                    {taxClearance || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Contact: </span>
                  <span className="text-bocra-navy font-medium">
                    {contactName} · {contactEmail}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Documents ({files.length} / {requiredDocs.length} uploaded)
              </p>
              <div className="space-y-1.5">
                {requiredDocs.map((doc) => {
                  const uploaded = files.find((f) => f.docType === doc);
                  return (
                    <div key={doc} className="flex items-center gap-2 text-sm">
                      {uploaded ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-bocra-green shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 shrink-0" />
                      )}
                      <span
                        className={uploaded ? "text-gray-700" : "text-gray-400"}
                      >
                        {doc}
                      </span>
                      {!uploaded && (
                        <span className="text-xs text-amber-500">
                          (missing)
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-bocra-surface rounded-xl px-4 py-3 flex gap-2 text-xs text-gray-500">
              <Info className="w-4 h-4 text-bocra-blue shrink-0 mt-0.5" />
              <span>
                By submitting this application you confirm that all information
                provided is accurate and that your organisation meets the
                eligibility requirements under the Communications Regulatory
                Authority Act 2012. BOCRA may request additional documents or an
                interview before making a determination.
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 h-10 px-4 border border-gray-200 text-gray-600 hover:border-bocra-navy hover:text-bocra-navy text-sm rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 h-10 px-5 bg-bocra-navy disabled:opacity-60 text-white text-sm font-medium rounded-lg hover:bg-bocra-blue transition-colors"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
