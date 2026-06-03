"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LotusMark } from "@/components/motifs/Motifs";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/60 bg-background/85 py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                isTransparent ? "bg-white/15 text-accent" : "bg-primary/10 text-primary",
              )}
            >
              <LotusMark className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span
                className={cn(
                  "block font-serif text-2xl font-bold tracking-tight",
                  isTransparent ? "text-white" : "text-foreground",
                )}
              >
                {site.name}
              </span>
              <span
                className={cn(
                  "block text-[10px] font-medium uppercase tracking-[0.2em]",
                  isTransparent ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {site.city} · {site.state}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {site.nav.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    active
                      ? isTransparent
                        ? "text-white"
                        : "text-primary"
                      : isTransparent
                        ? "text-white/80 hover:text-white"
                        : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
            <Button asChild size="sm" className="rounded-full px-5 shadow-md shadow-primary/20">
              <a href={whatsappLink(`Hi ${site.name}, I'd like a property consultation.`)} target="_blank" rel="noopener noreferrer">
                <Phone className="mr-1.5 h-4 w-4" />
                Get Advisory
              </a>
            </Button>
          </nav>

          {/* Mobile toggle */}
          <button
            aria-label="Open menu"
            className={cn("md:hidden", isTransparent ? "text-white" : "text-foreground")}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="absolute left-0 top-0 z-50 w-full border-b bg-background shadow-lg md:hidden"
          >
            <div className="flex items-center justify-between border-b p-4">
              <span className="flex items-center gap-2 font-serif text-xl font-bold text-foreground">
                <LotusMark className="h-5 w-5 text-primary" />
                {site.name}
              </span>
              <button aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {site.nav.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="mt-3 w-full rounded-full">
                <a href={whatsappLink(`Hi ${site.name}, I'd like a property consultation.`)} target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-1.5 h-4 w-4" /> Get Advisory
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
