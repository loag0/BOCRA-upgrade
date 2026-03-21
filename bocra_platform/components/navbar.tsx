"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ShieldCheck } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Verify Licence", href: "/verify" },
  { label: "File Complaint", href: "/complaints" },
  { label: ".bw Domains", href: "/domains" },
  { label: "Publications", href: "/publications" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bocra-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-bocra-gold flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-base tracking-wide">BOCRA</span>
            <span className="text-white/50 text-[9px] tracking-widest uppercase">
              Digital Platform
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-3">
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
              "bg-bocra-gold hover:bg-bocra-gold/90 text-white font-semibold"
            )}
          >
            Register
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
              />
            }
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent className="bg-bocra-navy border-l border-white/10 text-white p-6">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white text-lg font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
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
                    "bg-bocra-gold hover:bg-bocra-gold/90 text-white w-full justify-center"
                  )}
                >
                  Register
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
