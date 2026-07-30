import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { SeasonCard } from "@/components/seasons/SeasonCard";
import { SEASONS } from "@/lib/data";

export function TreksBySeason() {
  return (
    <section aria-labelledby="treks-by-season-heading" className="pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div id="treks-by-season-heading">
            <SectionHeading title="Treks By Season" />
          </div>
        </FadeIn>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {SEASONS.map((season, index) => (
            <FadeIn key={season.id} delay={index * 0.1}>
              <SeasonCard season={season} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
