"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, ChevronDown, LogOut, UserCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { signOut } from "@/lib/firebase";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const navItems: NavItem[] = [
  {
    label: "About",
    children: [
      { label: "Who We Are", href: "/about" },
      { label: "Board & Management", href: "/about/board" },
      { label: "Careers", href: "/about/careers" },
    ],
  },
  {
    label: "Mandate",
    children: [
      { label: "Telecommunications", href: "/services/telecoms" },
      { label: "Broadcasting", href: "/services/broadcasting" },
      { label: "Postal Services", href: "/services/postal" },
      { label: "Internet & ICT", href: "/services/ict" },
      { label: "Radio Spectrum", href: "/services/spectrum" },
      { label: ".bw ccTLD", href: "/domains" },
      { label: "Legislation", href: "/publications?type=legislation" },
    ],
  },
  { label: "Verify Licence", href: "/verify" },
  { label: "Complaints", href: "/complaints" },
  {
    label: "Documents",
    children: [
      { label: "All Publications", href: "/publications" },
      { label: "Annual Reports", href: "/publications?type=annual-report" },
      { label: "QoS Reports", href: "/publications?type=qos" },
      { label: "Tenders", href: "/tenders" },
      { label: "Consultations", href: "/consultations" },
    ],
  },
  {
    label: "Media",
    children: [
      { label: "News & Events", href: "/news" },
      { label: "Speeches", href: "/speeches" },
    ],
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Only use the transparent-on-top treatment on the homepage hero.
  // All other pages get a solid dark navbar immediately.
  const isHome = pathname === "/";

  const toggleDropdown = useCallback((label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return;
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenDropdown(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openDropdown]);

  // Close dropdown on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenDropdown(null);
  }, [pathname]);

  async function handleSignOut() {
    await signOut();
    router.replace("/");
  }

  const initial =
    user?.displayName?.charAt(0).toUpperCase() ??
    user?.email?.charAt(0).toUpperCase() ??
    "?";
  const displayName =
    user?.displayName ?? user?.email?.split("@")[0] ?? "Account";

  const navBg = isHome
    ? scrolled
      ? "bg-bocra-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg"
      : "bg-transparent"
    : "bg-bocra-navy border-b border-white/10 shadow-sm";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <div className="rounded-lg px-2 py-1 shadow-sm">
            <Image
              src="/bocra-logo.png"
              alt="BOCRA"
              width={200}
              height={67}
              className="h-32 w-auto"
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <div ref={navRef} className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/10 whitespace-nowrap ${
                      openDropdown === item.label ? "bg-white/10 text-white" : ""
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 min-w-[200px] z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-bocra-surface hover:text-bocra-navy font-medium transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href!}
                  className="block text-white/80 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-white/10 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {loading ? (
            /* Skeleton placeholder to prevent layout shift */
            <div className="flex items-center gap-2 animate-pulse">
              <div className="h-8 w-14 bg-white/10 rounded-lg" />
              <div className="h-8 w-20 bg-white/10 rounded-lg" />
            </div>
          ) : user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <div className="w-7 h-7 rounded-full bg-bocra-gold flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {initial}
                  </div>
                  <span className="text-white/80 group-hover:text-white text-sm font-medium max-w-[110px] truncate transition-colors">
                    {displayName}
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "text-white/60 hover:text-white hover:bg-white/10 gap-1.5"
                  )}
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "bg-bocra-gold hover:bg-bocra-gold/90 text-bocra-navy font-semibold"
                  )}
                >
                  Register
                </Link>
              </>
            )
          }
        </div>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/10"
              />
            }
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>

          <SheetContent className="bg-bocra-navy border-l border-white/10 text-white p-0 overflow-y-auto w-72">
            <div className="p-6">
              {/* Mobile logo */}
              <div className="bg-white rounded-lg px-2 py-1 shadow-sm inline-flex mb-8">
                <Image
                  src="/bocra-logo.png"
                  alt="BOCRA"
                  width={80}
                  height={50}
                  className="h-8 w-auto"
                />
              </div>

              {/* Nav items */}
              <div className="flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === item.label ? null : item.label
                            )
                          }
                          className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileExpanded === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {mobileExpanded === item.label && (
                          <div className="ml-3 mb-1 border-l border-white/10 pl-4 flex flex-col gap-0.5">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileExpanded(null)}
                                className="block py-2 text-sm text-white/60 hover:text-white transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        className="block px-3 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile auth */}
              {loading ? (
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-2 animate-pulse">
                  <div className="h-10 bg-white/10 rounded-lg" />
                  <div className="h-10 bg-white/10 rounded-lg" />
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-2">
                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "border-white/20 text-white hover:bg-white/10 w-full justify-start gap-2"
                        )}
                      >
                        <UserCircle className="w-4 h-4" />
                        {displayName}
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "text-white/60 hover:text-white hover:bg-white/10 w-full justify-start gap-2"
                        )}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "border-white/20 text-white hover:bg-white/10 w-full justify-center"
                        )}
                      >
                        Log in
                      </Link>
                      <Link
                        href="/register"
                        className={cn(
                          buttonVariants(),
                          "bg-bocra-gold hover:bg-bocra-gold/90 text-bocra-navy font-semibold w-full justify-center"
                        )}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
