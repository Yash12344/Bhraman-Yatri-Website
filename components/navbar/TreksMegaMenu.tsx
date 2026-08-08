"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronRight, MountainSnow } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RegionWithTreks } from "@/lib/treks";

interface TreksMegaMenuProps {
  regions: RegionWithTreks[];
  treksHref: string;
}

/**
 * Desktop mega menu: regions on the left, that region's treks on the right.
 * The panel follows whichever region is hovered or keyboard-focused, so it is
 * reachable without a pointer.
 */
export function TreksMegaMenu({ regions, treksHref }: TreksMegaMenuProps) {
  const [activeSlug, setActiveSlug] = useState(regions[0]?.slug ?? "");
  const active = regions.find((r) => r.slug === activeSlug) ?? regions[0];

  if (!active) return null;

  return (
    // pt-3 bridges the gap from the trigger so the menu survives the pointer
    // travelling down into it.
    <div className="invisible absolute left-1/2 top-full z-50 w-[720px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
      <div className="translate-y-1 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)] transition-transform duration-200 group-hover:translate-y-0 group-focus-within:translate-y-0">
        <div className="grid grid-cols-[210px_1fr]">
          {/* Regions */}
          <ul className="border-r border-neutral-100 bg-neutral-50/70 p-2">
            {regions.map((region) => {
              const isActive = region.slug === active.slug;
              return (
                <li key={region.slug}>
                  <Link
                    href={`${treksHref}?region=${region.slug}`}
                    onMouseEnter={() => setActiveSlug(region.slug)}
                    onFocus={() => setActiveSlug(region.slug)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-white text-forest-800 shadow-sm"
                        : "text-gray-600 hover:bg-white/70 hover:text-forest-800"
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <MountainSnow
                        aria-hidden="true"
                        className={cn(
                          "size-4 transition-colors",
                          isActive ? "text-saffron-500" : "text-gray-400"
                        )}
                      />
                      {region.label}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400">{region.count}</span>
                      <ChevronRight
                        aria-hidden="true"
                        className={cn(
                          "size-3.5 transition-all",
                          isActive
                            ? "translate-x-0 text-saffron-500 opacity-100"
                            : "-translate-x-1 opacity-0"
                        )}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Treks in the active region. Keyed so the fade replays on switch. */}
          <div key={active.slug} className="animate-[fadeIn_200ms_ease-out] p-3">
            <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              {active.label} · {active.count} treks
            </p>
            <ul className="grid max-h-[290px] grid-cols-2 gap-1 overflow-y-auto">
              {active.treks.map((trek) => (
                <li key={trek.slug}>
                  <Link
                    href={`${treksHref}/${trek.slug}`}
                    className="group/item block rounded-xl px-3 py-2.5 transition-colors hover:bg-forest-50"
                  >
                    <span className="block truncate text-sm font-medium text-gray-800 transition-colors group-hover/item:text-forest-800">
                      {trek.name}
                    </span>
                    {/* One non-wrapping line — the two-column panel is too
                        narrow for an icon row without it breaking apart. */}
                    <span className="mt-0.5 block truncate whitespace-nowrap text-[11px] text-gray-500">
                      {trek.durationDays} Days
                      <span aria-hidden="true" className="px-1.5 text-gray-300">
                        ·
                      </span>
                      {trek.difficultyLabel}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href={treksHref}
          className="flex items-center justify-center gap-2 border-t border-neutral-100 bg-neutral-50/70 py-3.5 text-sm font-semibold text-saffron-600 transition-colors hover:bg-saffron-50"
        >
          View All Treks
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </div>
  );
}
