"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  ChevronRight,
  Upload,
  Phone,
  Mail,
  Globe,
  AlertCircle,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockOperators } from "@/lib/mock-data";

// ─── Operator contact data ────────────────────────────────────────────────────

const operatorContacts: Record<
  string,
  { phone: string; email: string; hours: string }
> = {
  BTC: {
    phone: "+267 395 3000",
    email: "customercare@btc.bw",
    hours: "Mon–Fri 08:00–17:00",
  },
  Mascom: {
    phone: "+267 397 5555",
    email: "customercare@mascom.bw",
    hours: "Mon–Fri 08:00–17:00",
  },
  Orange: {
    phone: "+267 395 0111",
    email: "customerservice@orange.co.bw",
    hours: "Mon–Fri 08:00–17:00",
  },
  BoFiNet: {
    phone: "+267 318 2000",
    email: "info@bofinet.co.bw",
    hours: "Mon–Fri 08:00–17:00",
  },
  "Botswana Post": {
    phone: "+267 368 5000",
    email: "info@botspost.co.bw",
    hours: "Mon–Fri 08:00–17:00",
  },
  "Yarona FM": {
    phone: "+267 390 9000",
    email: "info@yaronafm.co.bw",
    hours: "Mon–Fri 08:00–17:00",
  },
  "Duma FM": {
    phone: "+267 318 1777",
    email: "info@dumafm.co.bw",
    hours: "Mon–Fri 08:00–17:00",
  },
  eBotswana: {
    phone: "+267 318 2500",
    email: "info@ebotswana.co.bw",
    hours: "Mon–Fri 08:00–17:00",
  },
};

const categories = [
  { value: "poor_network", label: "Poor network quality" },
  { value: "billing", label: "Billing dispute" },
  { value: "spam", label: "Unsolicited messages (spam)" },
  { value: "unlicensed", label: "Unlicensed operator" },
  { value: "unfair_terms", label: "Unfair terms & conditions" },
  { value: "type_approval", label: "Type approval violation" },
  { value: "other", label: "Other" },
];

const outcomes = [
  { value: "refund", label: "Refund" },
  { value: "service_restoration", label: "Service restoration" },
  { value: "regulatory_action", label: "Regulatory action against operator" },
  { value: "information", label: "Information only" },
];

// ─── Zod schema ───────────────────────────────────────────────────────────────

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  operator: z.string().min(1, "Select an operator"),
  category: z.string().min(1, "Select a complaint category"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  dateOccurred: z.string().min(1, "Date is required"),
  preferredOutcome: z.string().optional(),
  consent: z.boolean().refine((v) => v, "Consent is required to proceed"),
});

type FormData = z.infer<typeof schema>;

// ─── Step indicator ──────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Operator contact" },
    { n: 2, label: "Complaint details" },
    { n: 3, label: "Confirmation" },
  ];
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                current > s.n
                  ? "bg-bocra-green text-white"
                  : current === s.n
                    ? "bg-bocra-navy text-white"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {current > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block ${
                current === s.n ? "text-bocra-navy" : "text-gray-400"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 sm:w-16 h-px mx-2 ${current > s.n ? "bg-bocra-green" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Step 1: Operator contact gate ───────────────────────────────────────────

function Step1({ onContinue }: { onContinue: (operatorName: string) => void }) {
  const [selectedShortName, setSelectedShortName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const operator = mockOperators.find((o) => o.shortName === selectedShortName);
  const contact = selectedShortName
    ? operatorContacts[selectedShortName]
    : null;

  return (
    <div className="space-y-6">
      {/* Explainer */}
      <div className="bg-bocra-blue/5 border border-bocra-blue/15 rounded-xl p-5">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-bocra-blue shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-bocra-navy mb-1">
              You must contact your operator first
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Under the CRA Act 2012, BOCRA can only investigate a complaint
              after the consumer has first raised the issue directly with their
              operator and not received a satisfactory resolution. BOCRA will
              not process complaints that bypass this step.
            </p>
          </div>
        </div>
      </div>

      {/* Operator selector */}
      <div className="space-y-1.5">
        <Label className="text-gray-700 text-sm font-medium">
          Which operator are you complaining about?
        </Label>
        <select
          value={selectedShortName}
          onChange={(e) => {
            setSelectedShortName(e.target.value);
            setConfirmed(false);
          }}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue transition-colors"
        >
          <option value="">Select an operator…</option>
          {mockOperators.map((op) => (
            <option key={op.id} value={op.shortName}>
              {op.operatorName}
            </option>
          ))}
        </select>
      </div>

      {/* Operator contact card */}
      {operator && contact && (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-bocra-navy px-5 py-3">
            <p className="text-white font-semibold text-sm">
              {operator.operatorName}
            </p>
            <p className="text-white/50 text-xs mt-0.5">
              {operator.categoryFull}
            </p>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-bocra-blue mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                <p className="text-sm font-medium text-bocra-navy">
                  {contact.phone}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{contact.hours}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-bocra-blue mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm font-medium text-bocra-blue hover:text-bocra-navy transition-colors break-all"
                >
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-bocra-blue mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Website</p>
                <a
                  href={`https://${operator.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-bocra-blue hover:text-bocra-navy transition-colors"
                >
                  {operator.website}
                </a>
              </div>
            </div>
          </div>
          <div className="px-5 py-4 bg-bocra-surface border-t border-gray-100">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-bocra-navy shrink-0"
              />
              <span className="text-sm text-gray-600 leading-relaxed">
                I have already contacted{" "}
                <span className="font-semibold text-bocra-navy">
                  {operator.shortName}
                </span>{" "}
                and I am not satisfied with their response or they have not
                responded within a reasonable time.
              </span>
            </label>
          </div>
        </div>
      )}

      <Button
        onClick={() => onContinue(operator?.operatorName ?? selectedShortName)}
        disabled={!selectedShortName || !confirmed}
        className="w-full h-10 bg-bocra-navy hover:bg-bocra-blue text-white font-semibold rounded-lg transition-colors gap-2 disabled:opacity-40"
      >
        Continue to file complaint
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

// ─── Step 2: Complaint form ───────────────────────────────────────────────────

function Step2({
  prefilledOperator,
  onSubmit,
}: {
  prefilledOperator: string;
  onSubmit: (ref: string) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileSizeError, setFileSizeError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { operator: prefilledOperator },
  });

  const description = watch("description") ?? "";

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    const oversized = selected.filter((f) => f.size > 10 * 1024 * 1024);
    if (oversized.length) {
      setFileSizeError(`${oversized[0].name} exceeds the 10 MB limit.`);
      return;
    }
    setFileSizeError("");
    setFiles((prev) => [...prev, ...selected]);
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  async function processForm(_data: FormData) {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    const ref = `CMP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    onSubmit(ref);
  }

  return (
    <form onSubmit={handleSubmit(processForm)} className="space-y-5">
      {/* Personal details */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Your details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <Label className="text-gray-700 text-sm font-medium">
              Full name <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Kagiso Modise"
              {...register("fullName")}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-700 text-sm font-medium">
              Email address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-gray-700 text-sm font-medium">
              Phone number{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </Label>
            <Input
              type="tel"
              placeholder="+267 7X XXX XXX"
              {...register("phone")}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Complaint details */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Complaint details
        </p>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-gray-700 text-sm font-medium">
                Operator <span className="text-red-500">*</span>
              </Label>
              <select
                {...register("operator")}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue transition-colors"
              >
                <option value="">Select…</option>
                {mockOperators.map((op) => (
                  <option key={op.id} value={op.operatorName}>
                    {op.operatorName}
                  </option>
                ))}
              </select>
              {errors.operator && (
                <p className="text-xs text-red-500">
                  {errors.operator.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-700 text-sm font-medium">
                Complaint category <span className="text-red-500">*</span>
              </Label>
              <select
                {...register("category")}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue transition-colors"
              >
                <option value="">Select…</option>
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-gray-700 text-sm font-medium">
                Description <span className="text-red-500">*</span>
              </Label>
              <span
                className={`text-xs ${
                  description.length < 50 ? "text-gray-400" : "text-bocra-green"
                }`}
              >
                {description.length} / 50 min
              </span>
            </div>
            <Textarea
              placeholder="Describe the issue in detail. Include dates, reference numbers from your operator, and any relevant context…"
              rows={5}
              {...register("description")}
              aria-invalid={!!errors.description}
              className="resize-none"
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-gray-700 text-sm font-medium">
                Date issue occurred <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                {...register("dateOccurred")}
                aria-invalid={!!errors.dateOccurred}
              />
              {errors.dateOccurred && (
                <p className="text-xs text-red-500">
                  {errors.dateOccurred.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-gray-700 text-sm font-medium">
                Preferred outcome{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </Label>
              <select
                {...register("preferredOutcome")}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue transition-colors"
              >
                <option value="">No preference</option>
                {outcomes.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Evidence upload */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Evidence of prior operator contact
        </p>
        <label className="block border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-bocra-blue/30 hover:bg-bocra-blue/[0.02] transition-colors">
          <input
            type="file"
            className="sr-only"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            onChange={handleFileChange}
          />
          <Upload className="w-7 h-7 text-gray-300 mx-auto mb-2" />
          <p className="text-sm text-gray-600 font-medium">
            Click to upload or drag files here
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, JPG, PNG · max 10 MB per file · correspondence, bills,
            screenshots
          </p>
        </label>
        {fileSizeError && (
          <p className="text-xs text-red-500 mt-1.5">{fileSizeError}</p>
        )}
        {files.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {files.map((f) => (
              <li
                key={f.name}
                className="flex items-center justify-between bg-bocra-surface border border-gray-100 rounded-lg px-3 py-2 text-sm"
              >
                <span className="text-bocra-navy truncate max-w-[300px]">
                  {f.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(f.name)}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-3 text-xs shrink-0"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="h-px bg-gray-100" />

      {/* Consent */}
      <div className="space-y-1">
        <div className="flex items-start gap-3">
          <input
            id="consent"
            type="checkbox"
            {...register("consent")}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-bocra-navy shrink-0 cursor-pointer"
          />
          <label
            htmlFor="consent"
            className="text-sm text-gray-600 leading-relaxed cursor-pointer"
          >
            I consent to BOCRA sharing my contact details with the service
            provider for the purpose of resolving this complaint, in accordance
            with the Communications Regulatory Authority Act 2012 and the
            Botswana Data Protection Act 2024.
          </label>
        </div>
        {errors.consent && (
          <p className="text-xs text-red-500 pl-7">
            {String(errors.consent.message)}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 bg-bocra-navy hover:bg-bocra-blue text-white font-semibold rounded-lg transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Submitting complaint…
          </>
        ) : (
          "Submit complaint"
        )}
      </Button>
    </form>
  );
}

// ─── Step 3: Confirmation ─────────────────────────────────────────────────────

function Step3({ caseRef }: { caseRef: string }) {
  const [copied, setCopied] = useState(false);

  function copyRef() {
    navigator.clipboard.writeText(caseRef).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-bocra-green/10 flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 className="w-8 h-8 text-bocra-green" />
      </div>

      <h2 className="font-heading text-2xl font-bold text-bocra-navy mb-2">
        Complaint received
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto">
        Your complaint has been logged and will be reviewed by BOCRA. You will
        receive an acknowledgement by email within 48 hours.
      </p>

      {/* Case reference */}
      <div className="inline-flex flex-col items-center gap-3 bg-bocra-surface border border-gray-200 rounded-2xl px-8 py-6 mb-8">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
          Case reference number
        </p>
        <p className="font-heading text-3xl font-bold text-bocra-navy tracking-wider">
          {caseRef}
        </p>
        <button
          onClick={copyRef}
          className="flex items-center gap-1.5 text-xs text-bocra-blue hover:text-bocra-navy transition-colors font-medium"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-bocra-green" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy reference
            </>
          )}
        </button>
      </div>

      <div className="bg-bocra-blue/5 border border-bocra-blue/15 rounded-xl p-4 text-left mb-8 max-w-md mx-auto">
        <p className="text-sm font-semibold text-bocra-navy mb-1">
          What happens next?
        </p>
        <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside leading-relaxed">
          <li>BOCRA reviews your complaint within 48 hours</li>
          <li>If sufficient evidence exists, an investigation is opened</li>
          <li>The operator is notified and given an opportunity to respond</li>
          <li>BOCRA issues a determination and notifies you of the outcome</li>
        </ol>
      </div>

      <a
        href={`/complaints/${caseRef}`}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-bocra-navy hover:bg-bocra-blue text-white font-semibold rounded-lg transition-colors text-sm"
      >
        Track complaint status
        <ChevronRight className="w-4 h-4" />
      </a>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComplaintsPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [operatorName, setOperatorName] = useState("");
  const [caseRef, setCaseRef] = useState("");

  function handleStep1(name: string) {
    setOperatorName(name);
    setStep(2);
  }

  function handleStep2(ref: string) {
    setCaseRef(ref);
    setStep(3);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero strip */}
        <div className="bg-bocra-navy pt-24 pb-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
              Consumer Protection
            </Badge>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
              File a Complaint
            </h1>
            <p className="text-white/70 text-sm leading-relaxed">
              BOCRA investigates complaints against licensed operators under the
              Communications Regulatory Authority Act 2012.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            {step < 3 && <StepIndicator current={step} />}
            {step === 1 && <Step1 onContinue={handleStep1} />}
            {step === 2 && (
              <Step2 prefilledOperator={operatorName} onSubmit={handleStep2} />
            )}
            {step === 3 && <Step3 caseRef={caseRef} />}
          </div>

          {/* Legal note */}
          {step < 3 && (
            <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
              BOCRA will only investigate complaints where sufficient evidence
              of a breach of the CRA Act 2012 or licence conditions exists.{" "}
              <a
                href="/about/complaints-process"
                className="underline hover:text-gray-600"
              >
                Learn about the complaints process.
              </a>
            </p>
          )}
        </div>
      </main>
    </>
  );
}
