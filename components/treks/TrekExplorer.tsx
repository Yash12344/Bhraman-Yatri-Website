"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TrekCard } from "@/components/treks/TrekCard";
import { SEASON_LIST } from "@/lib/seasons";
import {
  DURATION_BUCKETS,
  EMPTY_FILTERS,
  filterTreks,
  type RegionOption,
  type TrekFilters,
  type TrekView,
} from "@/lib/treks";
import { MONTH_OPTIONS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface TrekExplorerProps {
  treks: TrekView[];
  regions: RegionOption[];
  difficulties: string[];
  priceBounds: { min: number; max: number };
}

/**
 * Client-side filtering over the full trek list. Results update as you type;
 * the initial state is seeded from the URL so hero searches deep-link here.
 */
export function TrekExplorer({
  treks,
  regions,
  difficulties,
  priceBounds,
}: TrekExplorerProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<TrekFilters>(EMPTY_FILTERS);

  // Seed from the URL once on mount and whenever the query string changes.
  useEffect(() => {
    setFilters({
      query: searchParams.get("q") ?? "",
      region: searchParams.get("region") ?? "any",
      difficulty: searchParams.get("difficulty") ?? "any",
      season: searchParams.get("season") ?? "any",
      month: searchParams.get("month") ?? "any",
      duration: searchParams.get("duration") ?? "any",
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : null,
    });
  }, [searchParams]);

  const results = useMemo(() => filterTreks(treks, filters), [treks, filters]);

  const update = <K extends keyof TrekFilters>(key: K, value: TrekFilters[K]) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const isFiltered =
    filters.query !== "" ||
    filters.region !== "any" ||
    filters.difficulty !== "any" ||
    filters.season !== "any" ||
    filters.month !== "any" ||
    filters.duration !== "any" ||
    filters.maxPrice !== null;

  const maxPrice = filters.maxPrice ?? priceBounds.max;

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside aria-label="Filter treks">
        <div className="sticky top-[110px] rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-900">
              <SlidersHorizontal aria-hidden="true" className="size-4 text-saffron-500" />
              Filters
            </h2>
            {isFiltered && (
              <button
                type="button"
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="flex items-center gap-1 text-xs font-semibold text-saffron-600 transition-colors hover:text-saffron-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
              >
                <X aria-hidden="true" className="size-3.5" />
                Clear
              </button>
            )}
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="filter-query">Search</Label>
              <div className="relative mt-1.5">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400"
                />
                <Input
                  id="filter-query"
                  type="search"
                  placeholder="Trek name, base camp…"
                  value={filters.query}
                  onChange={(event) => update("query", event.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="filter-region">Destination</Label>
              <Select
                id="filter-region"
                value={filters.region}
                onChange={(event) => update("region", event.target.value)}
                className="mt-1.5"
              >
                <option value="any">All Destinations</option>
                {regions.map((region) => (
                  <option key={region.slug} value={region.slug}>
                    {region.label} ({region.count})
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="filter-difficulty">Difficulty</Label>
              <Select
                id="filter-difficulty"
                value={filters.difficulty}
                onChange={(event) => update("difficulty", event.target.value)}
                className="mt-1.5"
              >
                <option value="any">Any Level</option>
                {difficulties.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="filter-season">Season</Label>
              <Select
                id="filter-season"
                value={filters.season}
                onChange={(event) => update("season", event.target.value)}
                className="mt-1.5"
              >
                <option value="any">Any Season</option>
                {SEASON_LIST.map((season) => (
                  <option key={season.id} value={season.id}>
                    {season.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="filter-month">Month</Label>
              <Select
                id="filter-month"
                value={filters.month}
                onChange={(event) => update("month", event.target.value)}
                className="mt-1.5"
              >
                {MONTH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="filter-duration">Duration</Label>
              <Select
                id="filter-duration"
                value={filters.duration}
                onChange={(event) => update("duration", event.target.value)}
                className="mt-1.5"
              >
                {DURATION_BUCKETS.map((bucket) => (
                  <option key={bucket.value} value={bucket.value}>
                    {bucket.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="filter-price">
                Max Price:{" "}
                <span className="font-bold text-saffron-600">
                  {formatPrice(maxPrice)}
                </span>
              </Label>
              <input
                id="filter-price"
                type="range"
                min={priceBounds.min}
                max={priceBounds.max}
                step={500}
                value={maxPrice}
                onChange={(event) => update("maxPrice", Number(event.target.value))}
                className="mt-2 w-full accent-saffron-500"
              />
              <div className="mt-1 flex justify-between text-[11px] text-gray-400">
                <span>{formatPrice(priceBounds.min)}</span>
                <span>{formatPrice(priceBounds.max)}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div>
        <p aria-live="polite" className="mb-5 text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{results.length}</span>{" "}
          of {treks.length} treks
        </p>

        {results.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((trek, index) => (
              <li key={trek.slug}>
                <TrekCard trek={trek} priority={index < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center">
            <p className="text-base font-semibold text-gray-900">
              No treks match these filters
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Try widening your search — a different season or price range.
            </p>
            <Button
              variant="primary"
              size="md"
              className="mt-5"
              onClick={() => setFilters(EMPTY_FILTERS)}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
