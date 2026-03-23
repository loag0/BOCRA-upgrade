import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { TeamCredit } from "@/components/team-credit";

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

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/BTABW",
    icon: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/bocrabw",
    icon: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bta_3/",
    icon: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@bocra7629",
    icon: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Flickr",
    href: "https://www.flickr.com/photos/bocra_bw/",
    icon: (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M6.5 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm11 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-bocra-navy text-white/70 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Branding */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/bocra-logo.png"
                alt="BOCRA"
                width={200}
                height={67}
                className="h-12 w-auto"
                priority
              />
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

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-bocra-gold hover:text-white transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
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
          <TeamCredit />
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
