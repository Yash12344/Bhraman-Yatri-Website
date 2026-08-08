"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { TreksMegaMenu } from "@/components/navbar/TreksMegaMenu";
import { MobileTreksAccordion } from "@/components/navbar/MobileTreksAccordion";
import { NAV_LINKS } from "@/lib/data";
import type { RegionWithTreks } from "@/lib/treks";
import { cn } from "@/lib/utils";

interface NavbarProps {
  /** Regions and their treks, grouped from the JSON in the server layout. */
  regions: RegionWithTreks[];
}

const TREKS_HREF = "/treks";

export function Navbar({ regions }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isTreksExpanded, setIsTreksExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever navigation completes.
  useEffect(() => {
    setIsMobileOpen(false);
    setIsTreksExpanded(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const hasMegaMenu = regions.length > 0;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-shadow duration-300",
        isScrolled ? "shadow-md" : "shadow-sm"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[98px] lg:px-8 xl:px-4"
      >
        <Logo />

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const showMega = link.href === TREKS_HREF && hasMegaMenu;
            return (
              <li key={link.href} className={cn(showMega && "group relative")}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  aria-haspopup={showMega ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-1 text-base font-medium transition-colors hover:text-saffron-500",
                    isActive(link.href) ? "text-saffron-600" : "text-gray-800"
                  )}
                >
                  {link.label}
                  {showMega && (
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:rotate-180"
                    />
                  )}
                </Link>

                {showMega && (
                  <TreksMegaMenu regions={regions} treksHref={TREKS_HREF} />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden lg:block">
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

      {/* Mobile menu — nested accordion, never a hover target. */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-y-auto border-t border-neutral-100 bg-white transition-all duration-300 lg:hidden",
          isMobileOpen ? "max-h-[75vh]" : "max-h-0 border-t-0"
        )}
      >
        <ul className="space-y-1 px-4 py-4">
          {NAV_LINKS.map((link) => {
            const showAccordion = link.href === TREKS_HREF && hasMegaMenu;

            if (!showAccordion) {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-forest-50 hover:text-forest-700",
                      isActive(link.href) ? "text-saffron-600" : "text-gray-800"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <button
                  type="button"
                  aria-expanded={isTreksExpanded}
                  aria-controls="mobile-treks-panel"
                  onClick={() => setIsTreksExpanded((open) => !open)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-forest-50 hover:text-forest-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500",
                    isActive(link.href) ? "text-saffron-600" : "text-gray-800"
                  )}
                >
                  {link.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-4 transition-transform duration-300",
                      isTreksExpanded && "rotate-180"
                    )}
                  />
                </button>
                <div id="mobile-treks-panel" hidden={!isTreksExpanded}>
                  <MobileTreksAccordion regions={regions} treksHref={TREKS_HREF} />
                </div>
              </li>
            );
          })}

          <li className="pt-2">
            <Link href="/contact">
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
