import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  BarChart2,
  BookOpen,
  Settings,
} from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/complaints", label: "Complaints", icon: MessageSquare },
  { href: "/admin/operators", label: "Operators", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/admin/publications", label: "Publications", icon: BookOpen },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-bocra-surface pt-16 flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-60 bg-bocra-navy border-r border-white/10 pt-8 px-4 gap-1 fixed top-16 bottom-0">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2 px-2">
            Staff Portal
          </p>
          {adminLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </aside>
        <main className="flex-1 lg:ml-60 p-6">{children}</main>
      </div>
    </>
  );
}
