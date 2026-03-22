import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Services: [
    { label: "Verify Licence", href: "/verify" },
    { label: "File a Complaint", href: "/complaints" },
    { label: ".bw Domain Registry", href: "/domains" },
    { label: "Publications", href: "/publications" },
    { label: "Type Approval", href: "/services/type-approval" },
  ],
  Regulatory: [
    { label: "Licensing Framework", href: "/publications?type=legislation" },
    { label: "QoS Standards", href: "/publications?type=qos" },
    { label: "Spectrum Management", href: "/services/spectrum" },
    { label: "Consumer Protection", href: "/complaints" },
    { label: "Consultations", href: "/consultations" },
  ],
  "About BOCRA": [
    { label: "Who We Are", href: "/about" },
    { label: "Board & Management", href: "/about/board" },
    { label: "Strategic Plan 2024-2029", href: "/publications?type=strategy" },
    { label: "Annual Reports", href: "/publications?type=annual-report" },
    { label: "Careers", href: "/about/careers" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-bocra-navy text-white/60 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Branding */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-md bg-bocra-gold flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-base">BOCRA</span>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-4">
              Botswana Communications Regulatory Authority
              <br />
              Plot 50671, Independence Avenue
              <br />
              P/Bag 00495, Gaborone, Botswana
            </p>
            <p className="text-xs text-white/40">+267 395 7755</p>
            <p className="text-xs text-white/40 mt-0.5">
              <a
                href="mailto:info@bocra.org.bw"
                className="hover:text-white/60 transition-colors"
              >
                info@bocra.org.bw
              </a>
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5 text-sm">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>
            &copy; 2026 Botswana Communications Regulatory Authority. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">
              Terms of Use
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-white/60 transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
