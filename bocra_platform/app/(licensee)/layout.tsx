import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { FileText, FolderOpen, Globe, User } from "lucide-react";

const portalLinks = [
  { href: "/portal/licences", label: "My Licences", icon: FileText },
  { href: "/portal/apply", label: "Apply for Licence", icon: FolderOpen },
  { href: "/domains", label: ".bw Domains", icon: Globe },
  { href: "/profile", label: "Profile", icon: User },
];

export default function LicenseeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-bocra-surface pt-16 flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-200 pt-8 px-4 gap-1 fixed top-16 bottom-0">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 px-2">
            Licensee Portal
          </p>
          {portalLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-bocra-navy/5 hover:text-bocra-navy transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </aside>
        <main className="flex-1 lg:ml-56 p-6">{children}</main>
      </div>
    </>
  );
}
