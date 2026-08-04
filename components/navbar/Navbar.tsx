"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-shadow duration-300",
        isScrolled ? "shadow-md" : "shadow-sm"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 lg:h-[98px] xl:px-4"
      >
        <Logo />

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label} className={cn(link.children && "group relative")}>
              <Link
                href={link.href}
                className="flex items-center gap-1 text-base font-medium text-gray-800 transition-colors hover:text-saffron-500"
              >
                {link.label}
                {link.children && (
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 group-hover:rotate-180"
                  />
                )}
              </Link>
              {link.children && (
                <ul className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 translate-y-2 rounded-xl border border-neutral-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {link.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className="block rounded-lg px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-forest-50 hover:text-forest-700"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="#enquiry" className="hidden lg:block">
            <Button variant="primary" size="md" tabIndex={-1}>
              Book Now
            </Button>
          </Link>
          <button
            type="button"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMobileOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-lg text-forest-800 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 lg:hidden"
          >
            {isMobileOpen ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-neutral-100 bg-white transition-all duration-300 lg:hidden",
          isMobileOpen ? "max-h-[480px]" : "max-h-0 border-t-0"
        )}
      >
        <ul className="space-y-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-gray-800 transition-colors hover:bg-forest-50 hover:text-forest-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link href="#enquiry" onClick={() => setIsMobileOpen(false)}>
              <Button variant="primary" size="md" className="w-full" tabIndex={-1}>
                Book Now
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
