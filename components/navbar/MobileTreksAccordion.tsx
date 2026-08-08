"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown, MountainSnow } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RegionWithTreks } from "@/lib/treks";

interface MobileTreksAccordionProps {
  regions: RegionWithTreks[];
  treksHref: string;
}

/**
 * Mobile equivalent of the mega menu: tap a region to reveal its treks.
 * Entirely click-driven — nothing here depends on hover.
 */
export function MobileTreksAccordion({
  regions,
  treksHref,
}: MobileTreksAccordionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <ul className="mt-1 space-y-1 border-l-2 border-neutral-100 pl-3">
      {regions.map((region) => {
        const isOpen = openSlug === region.slug;
        const panelId = `mobile-region-${region.slug}`;

        return (
          <li key={region.slug}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenSlug(isOpen ? null : region.slug)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-forest-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500",
                isOpen ? "bg-forest-50 text-forest-800" : "text-gray-700"
              )}
            >
              <span className="flex items-center gap-2.5">
                <MountainSnow aria-hidden="true" className="size-4 text-saffron-500" />
                {region.label}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{region.count}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-4 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </span>
            </button>

            <ul
              id={panelId}
              hidden={!isOpen}
              className="mt-1 space-y-0.5 border-l border-neutral-100 pl-3"
            >
              {region.treks.map((trek) => (
                <li key={trek.slug}>
                  <Link
                    href={`${treksHref}/${trek.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-forest-50 hover:text-forest-700"
                  >
                    {trek.name}
                    <span className="ml-1.5 text-xs text-gray-400">
                      {trek.durationDays} Days
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`${treksHref}?region=${region.slug}`}
                  className="block rounded-lg px-3 py-2 text-xs font-semibold text-saffron-600 transition-colors hover:bg-saffron-50"
                >
                  All {region.label} treks →
                </Link>
              </li>
            </ul>
          </li>
        );
      })}

      <li>
        <Link
          href={treksHref}
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-saffron-600 transition-colors hover:bg-saffron-50"
        >
          View All Treks
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </li>
    </ul>
  );
}
