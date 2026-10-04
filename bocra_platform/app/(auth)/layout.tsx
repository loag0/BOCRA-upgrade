import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bocra-navy flex flex-col items-center justify-center px-0">
      <div
        role="note"
        aria-label="Hackathon prototype notice"
        className="fixed z-100 top-0 overflow-hidden border-b border-bocra-red/25 bg-bocra-red/10 text-bocra-red"
      >
        <div className="prototype-marquee flex w-max py-2 text-[11px] font-bold uppercase tracking-wider">
          <span className="px-8">
            HACKATHON PROTOTYPE - NOT AN OFFICIAL BOCRA WEBSITE OR SERVICE - ALL
            DATA SHOWN FOR DEMONSTRATION PURPOSES ONLY
          </span>
          <span aria-hidden="true" className="px-8">
            HACKATHON PROTOTYPE - NOT AN OFFICIAL BOCRA WEBSITE OR SERVICE - ALL
            DATA SHOWN FOR DEMONSTRATION PURPOSES ONLY
          </span>
        </div>
      </div>
      <Link href="/" className="mb-8 py-10">
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
