import { Car, Clock, Footprints, MapPin, Mountain } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ItineraryDay } from "@/types/trek";

/** Vertical day-by-day itinerary. Metrics render only when the brochure gives them. */
export function Timeline({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="relative space-y-6 border-l-2 border-dashed border-neutral-200 pl-6 sm:pl-8">
      {days.map((day) => {
        const metrics: { icon: LucideIcon; value: string }[] = [
          day.altitude ? { icon: Mountain, value: day.altitude } : null,
          day.driveDistance ? { icon: Car, value: `Drive ${day.driveDistance}` } : null,
          day.trekDistance
            ? { icon: Footprints, value: `Trek ${day.trekDistance}` }
            : null,
          day.duration ? { icon: Clock, value: day.duration } : null,
        ].filter((m): m is { icon: LucideIcon; value: string } => m !== null);

        return (
          <li key={day.day} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[calc(1.5rem+9px)] top-1 flex size-4 items-center justify-center rounded-full bg-saffron-500 ring-4 ring-white sm:-left-[calc(2rem+9px)]"
            />
            <article className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_16px_36px_-22px_rgba(0,0,0,0.35)]">
              <p className="text-xs font-bold uppercase tracking-wider text-saffron-600">
                Day {day.day}
              </p>
              <h3 className="mt-1 text-base font-semibold text-gray-900">
                {day.title}
              </h3>

              {metrics.length > 0 && (
                <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <li
                        key={metric.value}
                        className="flex items-center gap-1.5 text-xs text-gray-600"
                      >
                        <Icon aria-hidden="true" className="size-3.5 text-forest-600" />
                        {metric.value}
                      </li>
                    );
                  })}
                </ul>
              )}

              {(day.pickupPoint || day.dropPoint) && (
                <p className="mt-3 flex items-start gap-1.5 text-xs text-gray-600">
                  <MapPin aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-forest-600" />
                  <span>
                    {day.pickupPoint && <>Pickup: {day.pickupPoint}. </>}
                    {day.dropPoint && <>Drop: {day.dropPoint}.</>}
                  </span>
                </p>
              )}

              {day.description.map((paragraph, index) => (
                <p key={index} className="mt-3 text-sm leading-relaxed text-gray-600">
                  {paragraph}
                </p>
              ))}

              {day.notes.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {day.notes.map((note, index) => (
                    <li
                      key={index}
                      className="flex gap-2 text-sm leading-relaxed text-gray-600"
                    >
                      <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-saffron-400" />
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
