import Image from "next/image";
import Link from "next/link";
import { BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Trek } from "@/lib/types";

interface TrekCardProps {
  trek: Trek;
}

export function TrekCard({ trek }: TrekCardProps) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_10px_30px_-14px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(0,0,0,0.3)]">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={trek.image}
          alt={trek.imageAlt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {trek.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-saffron-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {trek.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-[15px] font-semibold text-gray-900">{trek.name}</h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock aria-hidden="true" className="size-3.5" />
            {trek.days} Days
          </span>
          <span aria-hidden="true" className="text-gray-300">
            |
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 aria-hidden="true" className="size-3.5" />
            {trek.difficulty}
          </span>
        </div>
        <p className="mt-3">
          <span className="text-lg font-bold text-saffron-500">
            {formatPrice(trek.price)}
          </span>{" "}
          <span className="text-xs text-gray-400">/person</span>
        </p>
        <Link href="#enquiry" className="mt-3 block">
          <Button variant="dark" size="sm" className="w-full" tabIndex={-1}>
            View Details
            <span className="sr-only"> about {trek.name}</span>
          </Button>
        </Link>
      </div>
    </article>
  );
}
