"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, MountainSnow, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export interface RegionLink {
  label: string;
  href: string;
  count: number;
}

interface NavbarProps {
  /** Regions derived from the trek JSON, passed in from the server layout. */
  regions: RegionLink[];
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
            const hasDropdown = link.href === TREKS_HREF && regions.length > 0;
            return (
              <li key={link.href} className={cn(hasDropdown && "group relative")}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1 text-base font-medium transition-colors hover:text-saffron-500",
                    isActive(link.href) ? "text-saffron-600" : "text-gray-800"
                  )}
                >
                  {link.label}
                  {hasDropdown && (
                    <ChevronDown
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:rotate-180"
                    />
                  )}
                </Link>

                {hasDropdown && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="translate-y-1 rounded-2xl border border-neutral-100 bg-white p-2 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:translate-y-0 group-focus-within:translate-y-0">
                      {regions.map((region) => (
                        <li key={region.href}>
                          <Link
                            href={region.href}
                            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-forest-50 hover:text-forest-800"
                          >
                            <span className="flex items-center gap-2.5">
                              <MountainSnow
                                aria-hidden="true"
                                className="size-4 text-saffron-500"
                              />
                              {region.label}
                            </span>
                            <span className="text-xs text-gray-400">
                              {region.count}
                            </span>
                          </Link>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-neutral-100 pt-1">
                        <Link
                          href={TREKS_HREF}
                          className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-saffron-600 transition-colors hover:bg-saffron-50"
                        >
                          View All Treks
                          <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                      </li>
                    </ul>
                  </div>
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

      {/* Mobile menu — the treks entry is an accordion, never a hover target. */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-neutral-100 bg-white transition-all duration-300 lg:hidden",
          isMobileOpen ? "max-h-[640px]" : "max-h-0 border-t-0"
        )}
      >
        <ul className="space-y-1 px-4 py-4">
          {NAV_LINKS.map((link) => {
            const hasAccordion = link.href === TREKS_HREF && regions.length > 0;

            if (!hasAccordion) {
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
                <ul
                  id="mobile-treks-panel"
                  hidden={!isTreksExpanded}
                  className="mt-1 space-y-1 border-l-2 border-neutral-100 pl-3"
                >
                  {regions.map((region) => (
                    <li key={region.href}>
                      <Link
                        href={region.href}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-forest-50 hover:text-forest-700"
                      >
                        <span className="flex items-center gap-2.5">
                          <MountainSnow
                            aria-hidden="true"
                            className="size-4 text-saffron-500"
                          />
                          {region.label}
                        </span>
                        <span className="text-xs text-gray-400">{region.count}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={TREKS_HREF}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-saffron-600 transition-colors hover:bg-saffron-50"
                    >
                      View All Treks
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </li>
                </ul>
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
