import {
  BarChart3,
  CalendarRange,
  Clock,
  Footprints,
  MapPin,
  Mountain,
  Plane,
  Tent,
  TrainFront,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TrekView } from "@/lib/treks";

interface Fact {
  icon: LucideIcon;
  label: string;
  value: string;
}

/** The brochure's Overview table, rendered as a scannable grid. */
export function QuickFacts({ trek }: { trek: TrekView }) {
  const facts: Fact[] = [
    { icon: MapPin, label: "Region", value: trek.regionLabel },
    { icon: Clock, label: "Duration", value: trek.duration },
    { icon: BarChart3, label: "Difficulty", value: trek.difficultyLabel },
    { icon: Mountain, label: "Max Altitude", value: trek.altitude },
    { icon: Footprints, label: "Trek Distance", value: trek.trekDistance },
    { icon: CalendarRange, label: "Best Season", value: trek.bestSeason },
    { icon: Tent, label: "Base Camp", value: trek.baseCamp },
    { icon: Plane, label: "Nearest Airport", value: trek.nearestAirport },
    { icon: TrainFront, label: "Railway Station", value: trek.railwayStation },
  ];

  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
      {facts.map((fact) => {
        const Icon = fact.icon;
        return (
          <div key={fact.label} className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0">
              <dt className="text-xs uppercase tracking-wide text-gray-500">
                {fact.label}
              </dt>
              <dd className="text-sm font-semibold text-gray-900">{fact.value}</dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
