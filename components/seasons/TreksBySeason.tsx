import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { SeasonCard } from "@/components/seasons/SeasonCard";
import { SEASONS } from "@/lib/data";

export function TreksBySeason() {
  return (
    <section aria-labelledby="treks-by-season-heading" className="pb-9">
      <Container>
        <FadeIn>
          <div id="treks-by-season-heading">
            <SectionHeading title="Treks By Season" />
          </div>
        </FadeIn>
        <div className="mt-2 grid gap-6 lg:grid-cols-2">
          {SEASONS.map((season, index) => (
            <FadeIn key={season.id} delay={index * 0.1}>
              <SeasonCard season={season} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
