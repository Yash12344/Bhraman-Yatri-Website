/**
 * Derives season tags from the brochures' free-text `bestSeason` strings
 * ("Nov To April", "April to Jun & Oct.", "Round The Year", …).
 *
 * Nothing is invented — the months are read out of the string the brochure
 * prints, then mapped onto the Indian trekking seasons.
 */

export const SEASON_IDS = [
  "winter",
  "spring",
  "summer",
  "monsoon",
  "autumn",
] as const;

export type SeasonId = (typeof SEASON_IDS)[number];

export interface SeasonMeta {
  id: SeasonId;
  label: string;
  /** 1-indexed months belonging to this season. */
  months: number[];
}

export const SEASONS: Record<SeasonId, SeasonMeta> = {
  winter: { id: "winter", label: "Winter", months: [12, 1, 2] },
  spring: { id: "spring", label: "Spring", months: [3, 4] },
  summer: { id: "summer", label: "Summer", months: [5, 6] },
  monsoon: { id: "monsoon", label: "Monsoon", months: [7, 8, 9] },
  autumn: { id: "autumn", label: "Autumn", months: [10, 11] },
};

export const SEASON_LIST: SeasonMeta[] = SEASON_IDS.map((id) => SEASONS[id]);

const MONTH_PATTERNS: [RegExp, number][] = [
  [/\bjan(uary)?\b/i, 1],
  [/\bfeb(ruary)?\b/i, 2],
  [/\bmar(ch)?\b/i, 3],
  [/\bapr(il)?\b/i, 4],
  [/\bmay\b/i, 5],
  [/\bjun(e)?\b/i, 6],
  [/\bjul(y)?\b/i, 7],
  [/\baug(ust)?\b/i, 8],
  [/\bsep(t|tember)?\b/i, 9],
  [/\boct(ober)?\b/i, 10],
  [/\bnov(ember)?\b/i, 11],
  [/\bdec(ember)?\b/i, 12],
];

/** Month numbers mentioned in a clause, in the order they appear. */
function monthsInClause(clause: string): number[] {
  const found: { index: number; month: number }[] = [];
  for (const [pattern, month] of MONTH_PATTERNS) {
    const match = pattern.exec(clause);
    if (match) found.push({ index: match.index, month });
  }
  return found.sort((a, b) => a.index - b.index).map((m) => m.month);
}

/** Inclusive month range that may wrap across the year end (Oct → April). */
function expandRange(from: number, to: number): number[] {
  const months: number[] = [];
  let cursor = from;
  for (let i = 0; i < 12; i++) {
    months.push(cursor);
    if (cursor === to) break;
    cursor = cursor === 12 ? 1 : cursor + 1;
  }
  return months;
}

/**
 * Every month covered by a `bestSeason` string.
 * Returns all twelve for "Round the year" style phrasing.
 */
export function parseSeasonMonths(bestSeason: string): number[] {
  if (/round\s+the\s+year|all\s+year|year\s*round/i.test(bestSeason)) {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }

  const months = new Set<number>();
  for (const clause of bestSeason.split(/&|,|\band\b/i)) {
    const found = monthsInClause(clause);
    if (found.length >= 2) {
      for (const m of expandRange(found[0], found[found.length - 1])) months.add(m);
    } else if (found.length === 1) {
      months.add(found[0]);
    }
  }
  return [...months].sort((a, b) => a - b);
}

/** Season buckets a `bestSeason` string falls into. */
export function seasonsFor(bestSeason: string): SeasonId[] {
  const months = parseSeasonMonths(bestSeason);
  return SEASON_IDS.filter((id) =>
    SEASONS[id].months.some((m) => months.includes(m))
  );
}
