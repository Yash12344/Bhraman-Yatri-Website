import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  CloudRain,
  Flower2,
  Leaf,
  Snowflake,
  Sun,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SeasonId, SeasonMeta } from "@/lib/seasons";
import type { TrekView } from "@/lib/treks";

const SEASON_STYLES: Record<
  SeasonId,
  { icon: LucideIcon; header: string }
> = {
  winter: { icon: Snowflake, header: "bg-forest-800" },
  spring: { icon: Flower2, header: "bg-forest-600" },
  summer: { icon: Sun, header: "bg-saffron-500" },
  monsoon: { icon: CloudRain, header: "bg-forest-700" },
  autumn: { icon: Leaf, header: "bg-saffron-600" },
};

interface SeasonCardProps {
  season: SeasonMeta;
  treks: TrekView[];
  /** Cap the list so cards stay a consistent height. */
  limit?: number;
  /** Card spans the full grid width — lay the list out in more columns. */
  wide?: boolean;
}

export function SeasonCard({
  season,
  treks,
  limit = 6,
  wide = false,
}: SeasonCardProps) {
  const style = SEASON_STYLES[season.id];
  const HeaderIcon = style.icon;
  const shown = treks.slice(0, limit);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-[0_10px_30px_-14px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.28)]">
      <h3
        className={cn(
          "flex h-[46px] shrink-0 items-center justify-center gap-2 text-[15px] font-bold uppercase tracking-wide text-white",
          style.header
        )}
      >
        <HeaderIcon aria-hidden="true" className="size-4" />
        {season.label} Treks
      </h3>

      <ul
        className={cn(
          "grid flex-1 grid-cols-1 gap-x-4 gap-y-[21px] px-5 pb-3 pt-[21px] sm:grid-cols-2",
          wide && "lg:grid-cols-3"
        )}
      >
        {shown.map((trek) => (
          <li key={trek.slug}>
            <Link
              href={`/treks/${trek.slug}`}
              className="flex items-center gap-3 rounded-lg transition-colors hover:text-saffron-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
            >
              <Image
                src={trek.image}
                alt={trek.imageAlt}
                width={42}
                height={42}
                className="size-[42px] shrink-0 rounded-lg object-cover"
              />
              <span>
                <span className="block text-sm font-semibold text-gray-900">
                  {trek.name}
                </span>
                <span className="block text-xs text-gray-500">
                  {trek.durationDays} Days
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={`/treks?season=${season.id}`}
        className="flex h-[35px] shrink-0 items-center justify-center gap-1 border-t border-neutral-100 bg-neutral-50 text-sm font-semibold uppercase tracking-wide text-gray-900 transition-colors hover:text-saffron-500"
      >
        View All {season.label} Treks
        <ChevronRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}
