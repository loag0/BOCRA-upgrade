"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateProfile } from "firebase/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase";
import { GuestGuard } from "@/components/guest-guard";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    consent: z.boolean().refine((v) => v, "You must agree to proceed"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function getAuthError(code: string): string {
  const map: Record<string, string> = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password must be at least 8 characters.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] ?? "Something went wrong. Please try again.";
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      const { user } = await signUpWithEmail(data.email, data.password);
      await updateProfile(user, { displayName: data.name });
      toast.success("Account created! Welcome to BOCRA.");
      router.push("/");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      toast.error(getAuthError(code));
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google. Welcome to BOCRA.");
      router.push("/");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      toast.error(getAuthError(code));
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <GuestGuard>
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="font-heading text-2xl font-bold text-bocra-navy mb-1">
          Create an account
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Register to access BOCRA services
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-gray-700 text-sm font-medium">
              Full name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Kagiso Modise"
              autoComplete="name"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-gray-700 text-sm font-medium">
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

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-gray-700 text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                {...register("password")}
                aria-invalid={!!errors.password}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-gray-700 text-sm font-medium">
              Confirm password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                autoComplete="new-password"
                {...register("confirmPassword")}
                aria-invalid={!!errors.confirmPassword}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* BDPA consent */}
          <div className="space-y-1">
            <div className="flex items-start gap-2.5">
              <input
                id="consent"
                type="checkbox"
                {...register("consent")}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-bocra-navy cursor-pointer flex-shrink-0"
              />
              <label
                htmlFor="consent"
                className="text-xs text-gray-500 leading-relaxed cursor-pointer"
              >
                I consent to BOCRA processing my personal data in accordance with the{" "}
                <Link
                  href="/privacy"
                  className="text-bocra-blue hover:text-bocra-gold underline transition-colors"
                >
                  Privacy Policy
                </Link>{" "}
                and the Botswana Data Protection Act 2024.
              </label>
            </div>
            {errors.consent && (
              <p className="text-xs text-red-500 pl-6">{String(errors.consent.message)}</p>
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
              "Create account"
            )}
          </Button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogle}
          disabled={googleLoading}
          className="w-full h-10 border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-medium text-gray-700 rounded-lg transition-colors"
        >
          {googleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <GoogleIcon />
              Continue with Google
            </>
          )}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-bocra-blue font-medium hover:text-bocra-gold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </GuestGuard>
  );
}

function GoogleIcon() {
  return (
    <svg
      className="w-4 h-4 mr-2 flex-shrink-0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
