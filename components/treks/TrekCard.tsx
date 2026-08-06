import Image from "next/image";
import Link from "next/link";
import { BarChart3, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { TrekView } from "@/lib/treks";

interface TrekCardProps {
  trek: TrekView;
  /** Cards above the fold on the treks listing get eager loading. */
  priority?: boolean;
}

/** The single trek card used by the homepage slider, listing grid and related treks. */
export function TrekCard({ trek, priority = false }: TrekCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-[0_10px_30px_-14px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.3)]">
      <Link
        href={`/treks/${trek.slug}`}
        className="relative block h-[143px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-saffron-500"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={trek.image}
          alt={trek.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3">
          <Badge variant="glass">
            <MapPin aria-hidden="true" className="size-3" />
            {trek.regionLabel}
          </Badge>
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-3 pt-3.5">
        {/* Titles wrap to different line counts, so this block absorbs the
            difference and keeps price + CTA aligned across a row. */}
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">
            <Link
              href={`/treks/${trek.slug}`}
              className="transition-colors hover:text-saffron-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
            >
              {trek.name}
            </Link>
          </h3>

          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock aria-hidden="true" className="size-3.5" />
              {trek.durationDays} Days
            </span>
            <span aria-hidden="true" className="text-gray-300">
              |
            </span>
            <span className="flex items-center gap-1">
              <BarChart3 aria-hidden="true" className="size-3.5" />
              {trek.difficultyLabel}
            </span>
          </div>
        </div>

        <p className="mt-3">
          <span className="text-lg font-bold text-saffron-500">
            {formatPrice(trek.startingPrice)}
          </span>{" "}
          <span className="text-xs text-gray-400">/person</span>
        </p>

        <Link href={`/treks/${trek.slug}`} className="mt-2.5 block">
          <Button variant="dark" size="sm" className="h-8 w-full" tabIndex={-1}>
            View Details
            <span className="sr-only"> for {trek.name}</span>
          </Button>
        </Link>
      </div>
    </article>
  );
}
