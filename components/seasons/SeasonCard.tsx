import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Snowflake, Sun } from "lucide-react";
import { getTrekById } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { SeasonSection } from "@/lib/types";

interface SeasonCardProps {
  season: SeasonSection;
}

export function SeasonCard({ season }: SeasonCardProps) {
  const isWinter = season.id === "winter";
  const HeaderIcon = isWinter ? Snowflake : Sun;
  const treks = season.trekIds.map(getTrekById);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_30px_-14px_rgba(0,0,0,0.18)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.28)]">
      <h3
        className={cn(
          "flex h-[46px] shrink-0 items-center justify-center gap-2 text-[15px] font-bold uppercase tracking-wide text-white",
          isWinter ? "bg-forest-800" : "bg-saffron-500"
        )}
      >
        <HeaderIcon aria-hidden="true" className="size-4" />
        {season.title}
      </h3>

      <ul className="grid flex-1 grid-cols-1 gap-x-4 gap-y-[21px] px-5 pb-3 pt-[21px] sm:grid-cols-2">
        {treks.map((trek, index) => (
          <li key={`${trek.id}-${index}`} className="flex items-center gap-3">
            <Image
              src={trek.image}
              alt={trek.imageAlt}
              width={42}
              height={42}
              className="size-[42px] shrink-0 rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">{trek.name}</p>
              <p className="text-xs text-gray-500">{trek.days} Days</p>
            </div>
          </li>
        ))}
      </ul>

      <Link
        href={season.viewAllHref}
        className="flex h-[35px] shrink-0 items-center justify-center gap-1 border-t border-gray-100 bg-gray-50 text-sm font-semibold uppercase tracking-wide text-gray-900 transition-colors hover:text-saffron-500"
      >
        {season.viewAllLabel}
        <ChevronRight aria-hidden="true" className="size-4" />
      </Link>
    </article>
  );
}
