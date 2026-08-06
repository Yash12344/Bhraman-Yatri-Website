/**
 * Single source of truth for trek content.
 *
 * Every trek page, card, filter and season grouping in the app is derived from
 * the JSON files in `data/treks`. Adding a trek means dropping in one more JSON
 * file plus an image named after its slug — no code change anywhere.
 */
import type { Trek } from "@/types/trek";
import { parseSeasonMonths, seasonsFor, type SeasonId } from "@/lib/seasons";
import { trekCardImage } from "@/lib/images";

import brahmatal from "@/data/treks/brahmatal-trek.json";
import chopta from "@/data/treks/chopta-tungnath-trek.json";
import dayara from "@/data/treks/dayara-bugyal-trek.json";
import hampta from "@/data/treks/hampta-pass-trek.json";
import harKiDun from "@/data/treks/har-ki-dun-trek.json";
import kedarkantha from "@/data/treks/kedarkantha-trek.json";
import kuari from "@/data/treks/kuari-pass-trek.json";
import sarPass from "@/data/treks/sar-pass-trek.json";
import valleyOfFlowers from "@/data/treks/valley-of-flowers-trek.json";

const RAW_TREKS = [
  brahmatal,
  chopta,
  dayara,
  hampta,
  harKiDun,
  kedarkantha,
  kuari,
  sarPass,
  valleyOfFlowers,
] as unknown as Trek[];

/**
 * A trek plus the values the UI derives from it. Keeping derivation in one
 * place means pages never re-implement pricing or season logic.
 */
export interface TrekView extends Trek {
  /** Lowest published fare across all departure cities. */
  startingPrice: number;
  /** The full price entry the starting fare came from. */
  startingPriceEntry: Trek["price"][number];
  /** Region with the brochures' spelling inconsistencies reconciled. */
  regionLabel: string;
  /** Difficulty with capitalisation reconciled. */
  difficultyLabel: string;
  /** Season buckets parsed from `bestSeason`. */
  seasons: SeasonId[];
  /** 1-indexed months the trek runs in, parsed from `bestSeason`. */
  months: number[];
  /** Card/banner image, resolved by slug convention. */
  image: string;
  imageAlt: string;
}

/**
 * The brochures spell the same state two ways ("Uttrakhand"/"Uttarakhand") and
 * abbreviate Himachal. Normalised for display and filtering without touching
 * the source JSON.
 */
function normalizeRegion(region: string): string {
  const key = region.trim().toLowerCase().replace(/\s+/g, " ");
  if (key.startsWith("uttra") || key.startsWith("uttara")) return "Uttarakhand";
  if (key.startsWith("himachal")) return "Himachal Pradesh";
  return region.trim();
}

/** "Easy To Moderate" and "Easy to Moderate" are the same grade. */
function normalizeDifficulty(difficulty: string): string {
  return difficulty
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (word === "to" ? "to" : word[0].toUpperCase() + word.slice(1)))
    .join(" ");
}

function toView(trek: Trek): TrekView {
  const startingPriceEntry = trek.price.reduce((cheapest, entry) =>
    entry.amount < cheapest.amount ? entry : cheapest
  );

  return {
    ...trek,
    startingPrice: startingPriceEntry.amount,
    startingPriceEntry,
    regionLabel: normalizeRegion(trek.region),
    difficultyLabel: normalizeDifficulty(trek.difficulty),
    seasons: seasonsFor(trek.bestSeason),
    months: parseSeasonMonths(trek.bestSeason),
    image: trekCardImage(trek.slug),
    imageAlt: `${trek.name} in ${normalizeRegion(trek.region)}`,
  };
}

/** All treks, cheapest first, so listings lead with the accessible options. */
export const TREKS: TrekView[] = RAW_TREKS.map(toView).sort(
  (a, b) => a.startingPrice - b.startingPrice
);

export const TREK_SLUGS: string[] = TREKS.map((trek) => trek.slug);

export function getTrekBySlug(slug: string): TrekView | undefined {
  return TREKS.find((trek) => trek.slug === slug);
}

/** Treks shown in the homepage slider — the shortest, most accessible first. */
export function getFeaturedTreks(limit = 8): TrekView[] {
  return [...TREKS]
    .sort((a, b) => {
      const gradeRank = (t: TrekView) =>
        t.difficultyLabel.startsWith("Easy") ? 0 : 1;
      return gradeRank(a) - gradeRank(b) || a.startingPrice - b.startingPrice;
    })
    .slice(0, limit);
}

export function getTreksBySeason(season: SeasonId): TrekView[] {
  return TREKS.filter((trek) => trek.seasons.includes(season));
}

/**
 * Related treks, scored on how much they share with the current trek. Region
 * matters most, then season overlap, grade, and finally a similar length.
 */
export function getRelatedTreks(slug: string, limit = 3): TrekView[] {
  const current = getTrekBySlug(slug);
  if (!current) return [];

  return TREKS.filter((trek) => trek.slug !== slug)
    .map((trek) => {
      let score = 0;
      if (trek.regionLabel === current.regionLabel) score += 4;
      score += trek.seasons.filter((s) => current.seasons.includes(s)).length * 2;
      if (trek.difficultyLabel === current.difficultyLabel) score += 2;
      if (
        current.durationDays != null &&
        trek.durationDays != null &&
        Math.abs(trek.durationDays - current.durationDays) <= 1
      ) {
        score += 1;
      }
      return { trek, score };
    })
    .sort((a, b) => b.score - a.score || a.trek.startingPrice - b.trek.startingPrice)
    .slice(0, limit)
    .map((entry) => entry.trek);
}

/* ------------------------------------------------------------------ */
/* Filtering                                                           */
/* ------------------------------------------------------------------ */

export interface TrekFilters {
  query: string;
  region: string;
  difficulty: string;
  season: string;
  /** "any" or a 1-indexed month as a string. */
  month: string;
  duration: string;
  maxPrice: number | null;
}

export const EMPTY_FILTERS: TrekFilters = {
  query: "",
  region: "any",
  difficulty: "any",
  season: "any",
  month: "any",
  duration: "any",
  maxPrice: null,
};

/** Duration buckets, derived from the durations actually present. */
export const DURATION_BUCKETS = [
  { value: "any", label: "Any Duration", test: () => true },
  { value: "short", label: "Up to 4 Days", test: (d: number) => d <= 4 },
  { value: "medium", label: "5 – 6 Days", test: (d: number) => d >= 5 && d <= 6 },
  { value: "long", label: "7 Days & above", test: (d: number) => d >= 7 },
] as const;

export function getRegions(): string[] {
  return [...new Set(TREKS.map((t) => t.regionLabel))].sort();
}

export function getDifficulties(): string[] {
  return [...new Set(TREKS.map((t) => t.difficultyLabel))].sort(
    (a, b) => a.length - b.length
  );
}

export function getPriceBounds(): { min: number; max: number } {
  const prices = TREKS.map((t) => t.startingPrice);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function filterTreks(treks: TrekView[], filters: TrekFilters): TrekView[] {
  const query = filters.query.trim().toLowerCase();

  return treks.filter((trek) => {
    if (query) {
      const haystack = [
        trek.name,
        trek.regionLabel,
        trek.baseCamp,
        trek.difficultyLabel,
        trek.bestSeason,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.region !== "any" && trek.regionLabel !== filters.region) return false;
    if (filters.difficulty !== "any" && trek.difficultyLabel !== filters.difficulty) {
      return false;
    }
    if (filters.season !== "any" && !trek.seasons.includes(filters.season as SeasonId)) {
      return false;
    }
    if (filters.month !== "any" && !trek.months.includes(Number(filters.month))) {
      return false;
    }
    if (filters.duration !== "any") {
      const bucket = DURATION_BUCKETS.find((b) => b.value === filters.duration);
      if (bucket && trek.durationDays != null && !bucket.test(trek.durationDays)) {
        return false;
      }
    }
    if (filters.maxPrice != null && trek.startingPrice > filters.maxPrice) return false;
    return true;
  });
}
