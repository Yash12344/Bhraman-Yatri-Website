import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FadeIn } from "@/components/shared/FadeIn";
import { SeasonCard } from "@/components/seasons/SeasonCard";
import { SEASON_LIST } from "@/lib/seasons";
import { getTreksBySeason } from "@/lib/treks";

/**
 * Season groupings are derived from each trek's `bestSeason` string, so a new
 * trek lands in the right buckets automatically. Seasons with no treks are
 * omitted rather than rendered empty.
 */
export function TreksBySeason() {
  const seasons = SEASON_LIST.map((season) => ({
    season,
    treks: getTreksBySeason(season.id),
  })).filter(({ treks }) => treks.length > 0);

  if (seasons.length === 0) return null;

  return (
    <section aria-labelledby="treks-by-season-heading" className="pb-9">
      <Container>
        <FadeIn>
          <SectionTitle id="treks-by-season-heading" title="Treks By Season" />
        </FadeIn>
        <div className="mt-2 grid gap-6 lg:grid-cols-2">
          {seasons.map(({ season, treks }, index) => {
            // An odd season count leaves a half-width orphan, so the last card
            // spans both columns and spreads its list wider instead.
            const isOrphan =
              seasons.length % 2 === 1 && index === seasons.length - 1;
            return (
              <FadeIn
                key={season.id}
                delay={index * 0.08}
                className={isOrphan ? "lg:col-span-2" : undefined}
              >
                <SeasonCard season={season} treks={treks} wide={isOrphan} />
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
