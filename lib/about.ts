/**
 * About page content. Lives in `data/about.json` so the operator can reword
 * any of it without touching code.
 *
 * The four figures under "Our Journey At A Glance" are deliberately NOT in
 * that file — they are counted from the trek data at build time, so they can
 * never drift out of date when a trek is added.
 */
import type { LucideIcon } from "lucide-react";
import {
  BadgeIndianRupee,
  Compass,
  Headset,
  ShieldCheck,
  Users,
} from "lucide-react";
import about from "@/data/about.json";
import { TREKS, getRegions, getTreksBySeason } from "@/lib/treks";
import { SEASON_LIST } from "@/lib/seasons";

export const ABOUT = about;

/** Icon names used in `data/about.json`, mapped to the site's icon set. */
const ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  compass: Compass,
  rupee: BadgeIndianRupee,
  users: Users,
  headset: Headset,
};

export function aboutIcon(name: string): LucideIcon {
  return ICONS[name] ?? ShieldCheck;
}

export interface AboutStat {
  id: string;
  value: string;
  label: string;
  description: string;
}

/**
 * The stat values, counted from the data. "Seasons covered" counts only
 * seasons that actually have a trek running in them.
 */
export function getAboutStats(): AboutStat[] {
  const activeSeasons = SEASON_LIST.filter(
    (season) => getTreksBySeason(season.id).length > 0
  );

  const values: Record<string, string> = {
    // "+" because the count is a floor that grows as treks are added.
    treks: `${TREKS.length}+`,
    regions: `${getRegions().length}`,
    seasons: `${activeSeasons.length}`,
    support: "24×7",
  };

  return ABOUT.stats.items.map((item) => ({
    ...item,
    value: values[item.id] ?? "",
  }));
}
