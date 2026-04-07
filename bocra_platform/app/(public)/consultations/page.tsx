"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  MessageSquare,
  Calendar,
  FileText,
  Clock,
  CheckCircle2,
  Download,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { sanitizeFormData } from "@/lib/sanitize";

// ─── Mock consultations data ──────────────────────────────────────────────────

const consultations = [
  {
    id: "NSP-2026",
    status: "open" as const,
    title: "Draft National Spectrum Policy 2026",
    reference: "BOCRA/NSP/2026/01",
    description:
      "BOCRA invites public comment on the revised National Frequency Allocation Plan. The draft policy proposes refarming of the 700 MHz and 800 MHz bands for 5G deployment, new provisions for dynamic spectrum sharing, and updated amateur radio allocations.",
    openDate: "2026-03-01",
    closeDate: "2026-04-30",
    sector: "Radio Spectrum",
    documentsCount: 3,
    submissionsCount: 47,
  },
  {
    id: "CRA-CONSUMER-2025",
    status: "closed" as const,
    title: "Consumer Protection Regulations Review",
    reference: "BOCRA/CPR/2025/03",
    description:
      "Review of minimum quality-of-service standards and consumer redress procedures under the CRA Act 2012. Submissions closed.",
    openDate: "2025-11-01",
    closeDate: "2025-12-31",
    sector: "Consumer Protection",
    documentsCount: 2,
    submissionsCount: 112,
  },
];

// ─── Zod schema ───────────────────────────────────────────────────────────────

const schema = z.object({
  consultationId: z.string().min(1, "Select a consultation"),
  submitterType: z.enum(["individual", "organisation"]),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  organisation: z.string().optional(),
  comment: z
    .string()
    .min(100, "Submission must be at least 100 characters")
    .max(10000, "Submission cannot exceed 10,000 characters"),
  publishConsent: z
    .boolean()
    .refine((v) => v, "You must agree to continue"),
});

type FormData = z.infer<typeof schema>;

// ─── Consultation card ────────────────────────────────────────────────────────

function ConsultationCard({
  c,
  onSelect,
}: {
  c: (typeof consultations)[number];
  onSelect?: () => void;
}) {
  const daysLeft =
    c.status === "open"
      ? Math.ceil(
          (new Date(c.closeDate).getTime() - Date.now()) / 86_400_000
        )
      : 0;

  const closeFormatted = new Date(c.closeDate).toLocaleDateString("en-BW", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card
      className={`border ${c.status === "open" ? "border-bocra-blue/20" : "border-gray-100"} hover:shadow-md transition-shadow`}
    >
      <CardContent className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <Badge
              className={
                c.status === "open"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-gray-100 text-gray-500 border-gray-200"
              }
            >
              {c.status === "open" ? "Open" : "Closed"}
            </Badge>
            <Badge className="bg-bocra-gold/10 text-bocra-gold border-bocra-gold/20 text-xs">
              {c.sector}
            </Badge>
          </div>
          <span className="text-xs text-gray-400 font-mono shrink-0">
            {c.reference}
          </span>
        </div>

        <h3 className="font-heading text-lg font-bold text-bocra-navy mb-2 leading-snug">
          {c.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          {c.description}
        </p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400 mb-5">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            Closes {closeFormatted}
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 shrink-0" />
            {c.documentsCount} document{c.documentsCount !== 1 ? "s" : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 shrink-0" />
            {c.submissionsCount} submission{c.submissionsCount !== 1 ? "s" : ""}
          </span>
          {c.status === "open" && daysLeft > 0 && (
            <span className="flex items-center gap-1.5 text-green-600 font-medium">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm text-bocra-blue hover:text-bocra-navy font-medium transition-colors">
            <Download className="w-3.5 h-3.5 shrink-0" />
            Download documents
          </button>
          {c.status === "open" && onSelect && (
            <Button
              onClick={onSelect}
              size="sm"
              className="bg-bocra-navy hover:bg-bocra-blue text-white font-semibold transition-colors gap-1.5 ml-auto"
            >
              Submit comment <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Comment form ─────────────────────────────────────────────────────────────

function CommentForm({ defaultConsultationId }: { defaultConsultationId?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      consultationId: defaultConsultationId ?? "NSP-2026",
      submitterType: "individual",
    },
  });

  const comment = watch("comment") ?? "";
  const submitterType = watch("submitterType");

  async function processForm(data: FormData) {
    try {
      const sanitized = sanitizeFormData(data);
      // TODO: wire to backend when consultations endpoint is ready
      // await api.post("/api/consultations/submissions", sanitized);
      await new Promise((r) => setTimeout(r, 800)); // mock delay
      const ref = `BOCRA-CON-${Date.now().toString(36).toUpperCase()}`;
      setRefNumber(ref);
      setSubmitted(true);
    } catch {
      toast.error("Failed to submit your comment. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-16 h-16 rounded-full bg-bocra-green/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-bocra-green" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-bocra-navy mb-2">
          Submission received
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md mx-auto">
          Thank you for participating in the public consultation. BOCRA will
          consider all submissions before finalising the policy.
        </p>
        <div className="inline-flex flex-col items-center gap-3 bg-bocra-surface border border-gray-200 rounded-2xl px-8 py-5 mb-6">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
            Reference number
          </p>
          <p className="font-heading text-2xl font-bold text-bocra-navy tracking-wider">
            {refNumber}
          </p>
        </div>
        <p className="text-xs text-gray-400">
          Keep this reference for your records. You will receive a confirmation
          by email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(processForm)} className="space-y-5">
      {/* Consultation selector */}
      <div className="space-y-1.5">
        <Label className="text-gray-700 text-sm font-medium">
          Consultation <span className="text-red-500">*</span>
        </Label>
        <select
          {...register("consultationId")}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-bocra-blue/20 focus:border-bocra-blue transition-colors"
        >
          {consultations
            .filter((c) => c.status === "open")
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
        </select>
        {errors.consultationId && (
          <p className="text-xs text-red-500">{errors.consultationId.message}</p>
        )}
      </div>

      {/* Submitter type */}
      <div className="space-y-2">
        <Label className="text-gray-700 text-sm font-medium">
          I am submitting as
        </Label>
        <div className="flex gap-3">
          {(["individual", "organisation"] as const).map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                value={type}
                {...register("submitterType")}
                className="accent-bocra-navy"
              />
              <span className="text-sm text-gray-700 capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

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
              {submitterType === "organisation" ? "Organisation name" : "Organisation"}{" "}
              {submitterType === "individual" && (
                <span className="text-gray-400 font-normal">(optional)</span>
              )}
              {submitterType === "organisation" && (
                <span className="text-red-500">*</span>
              )}
            </Label>
            <Input
              placeholder={
                submitterType === "organisation"
                  ? "Mascom Wireless"
                  : "Your employer or organisation"
              }
              {...register("organisation")}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Comment */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-gray-700 text-sm font-medium">
            Your submission <span className="text-red-500">*</span>
          </Label>
          <span
            className={`text-xs ${comment.length < 100 ? "text-gray-400" : "text-bocra-green"}`}
          >
            {comment.length.toLocaleString()} / 100 min
          </span>
        </div>
        <Textarea
          placeholder="Provide your comments, questions, or proposed amendments to the draft policy. Reference specific sections where applicable…"
          rows={8}
          {...register("comment")}
          aria-invalid={!!errors.comment}
          className="resize-none"
        />
        {errors.comment && (
          <p className="text-xs text-red-500">{errors.comment.message}</p>
        )}
      </div>

      <div className="h-px bg-gray-100" />

      {/* Consent */}
      <div className="space-y-1">
        <div className="flex items-start gap-3">
          <input
            id="publishConsent"
            type="checkbox"
            {...register("publishConsent")}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-bocra-navy shrink-0 cursor-pointer"
          />
          <label
            htmlFor="publishConsent"
            className="text-sm text-gray-600 leading-relaxed cursor-pointer"
          >
            I consent to BOCRA publishing my submission (with personal details
            redacted) as part of the public consultation record, in accordance
            with BOCRA&apos;s consultation procedures and the Botswana Data
            Protection Act 2024.
          </label>
        </div>
        {errors.publishConsent && (
          <p className="text-xs text-red-500 pl-7">
            {String(errors.publishConsent.message)}
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
            Submitting…
          </>
        ) : (
          "Submit public comment"
        )}
      </Button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConsultationsPage() {
  const [activeConsultationId, setActiveConsultationId] = useState<
    string | undefined
  >(undefined);

  function scrollToForm(id: string) {
    setActiveConsultationId(id);
    setTimeout(() => {
      document
        .getElementById("comment-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bocra-surface">
        {/* Hero strip */}
        <section className="bg-bocra-navy pt-24 pb-16 relative overflow-hidden">
          <Image
            src="/images/community-meeting.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-bocra-navy/85" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px),
                repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)`,
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-white/40">
                <li>
                  <Link href="/" className="hover:text-white/70 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5" />
                </li>
                <li className="text-white/70 font-medium">
                  Public Consultations
                </li>
              </ol>
            </nav>

            <AnimatedSection animation="fade-up">
              <Badge className="mb-4 bg-bocra-gold/20 text-bocra-gold border-bocra-gold/30 text-xs tracking-widest uppercase">
                Inclusive Policymaking
              </Badge>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">
                Public Consultations
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                BOCRA believes in transparent, participatory regulation. We
                invite industry, civil society, and the public to comment on
                draft policies and proposed regulatory instruments.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Open consultations */}
          <section>
            <AnimatedSection animation="fade-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <h2 className="font-heading text-xl font-bold text-bocra-navy">
                  Open for Comment
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {consultations
                .filter((c) => c.status === "open")
                .map((c, i) => (
                  <AnimatedSection key={c.id} animation="fade-up" delay={i * 100}>
                    <ConsultationCard
                      c={c}
                      onSelect={() => scrollToForm(c.id)}
                    />
                  </AnimatedSection>
                ))}
            </div>
          </section>

          {/* Comment submission form */}
          <section id="comment-form">
            <AnimatedSection animation="fade-up">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-5 h-5 text-bocra-blue" />
                <h2 className="font-heading text-xl font-bold text-bocra-navy">
                  Submit a Comment
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sidebar */}
              <AnimatedSection animation="fade-right" className="lg:col-span-1">
                <div className="bg-bocra-navy/5 border border-bocra-navy/10 rounded-2xl p-6 space-y-5 lg:sticky lg:top-24">
                  <h3 className="font-heading font-bold text-bocra-navy text-sm">
                    Before you submit
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    {[
                      "Download and read the full draft document before commenting.",
                      "Reference specific sections or clauses where applicable.",
                      "Submissions may be published as part of the public record with personal details redacted.",
                      "Only submissions received before the closing date will be considered.",
                      "BOCRA does not respond individually to every submission.",
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-bocra-gold/20 text-bocra-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-400">
                      Questions?{" "}
                      <a
                        href="mailto:info@bocra.org.bw"
                        className="text-bocra-blue hover:text-bocra-navy transition-colors"
                      >
                        info@bocra.org.bw
                      </a>
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              {/* Form */}
              <AnimatedSection animation="fade-left" className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                  <CommentForm defaultConsultationId={activeConsultationId} />
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Closed consultations */}
          <section>
            <AnimatedSection animation="fade-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <h2 className="font-heading text-xl font-bold text-bocra-navy">
                  Closed Consultations
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {consultations
                .filter((c) => c.status === "closed")
                .map((c, i) => (
                  <AnimatedSection key={c.id} animation="fade-up" delay={i * 100}>
                    <ConsultationCard c={c} />
                  </AnimatedSection>
                ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
