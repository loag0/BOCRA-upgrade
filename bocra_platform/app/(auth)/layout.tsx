import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bocra-navy flex flex-col items-center justify-center px-0">
      <Link href="/" className="mb-8">
        <Image
          src="/bocra-logo.png"
          alt="BOCRA"
          width={160}
          height={67}
          className="h-18 w-auto"
          priority
        />
      </Link>
      {children}
    </div>
  );
}
