import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bocra-navy flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-md bg-bocra-gold flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-white font-bold text-base tracking-wide">BOCRA</span>
          <span className="text-white/50 text-[9px] tracking-widest uppercase">
            Digital Platform
          </span>
        </div>
      </Link>
      {children}
    </div>
  );
}
