"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/firebase";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      await resetPassword(data.email);
      setSentEmail(data.email);
      setSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      // Don't reveal whether email exists - silently succeed for user-not-found
      if (code === "auth/user-not-found") {
        setSentEmail(data.email);
        setSent(true);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }

  if (sent) {
    return (
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-bocra-gold/10 flex items-center justify-center mx-auto mb-4">
            <MailCheck className="w-6 h-6 text-bocra-gold" />
          </div>
          <h1 className="font-heading text-xl font-bold text-bocra-navy mb-2">
            Check your inbox
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            If an account exists for{" "}
            <span className="font-medium text-bocra-navy">{sentEmail}</span>,
            you&apos;ll receive a reset link shortly. Check your spam folder if
            it doesn&apos;t arrive.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-1.5 text-sm text-bocra-blue font-medium hover:text-bocra-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="font-heading text-2xl font-bold text-bocra-navy mb-1">
          Reset your password
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-gray-700 text-sm font-medium"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 bg-bocra-navy hover:bg-bocra-blue text-white font-semibold rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Send reset link"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-sm text-bocra-blue font-medium hover:text-bocra-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
