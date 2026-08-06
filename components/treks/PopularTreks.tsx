import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FadeIn } from "@/components/shared/FadeIn";
import { TrekSlider } from "@/components/treks/TrekSlider";
import { getFeaturedTreks } from "@/lib/treks";

export function PopularTreks() {
  const treks = getFeaturedTreks();

  return (
    <section
      id="popular-treks"
      aria-labelledby="popular-treks-heading"
      className="pb-9 pt-11"
    >
      <Container>
        <FadeIn>
          <SectionTitle id="popular-treks-heading" title="Popular Treks" />
        </FadeIn>
        <FadeIn delay={0.1} className="mt-3.5">
          <TrekSlider treks={treks} label="popular treks" />
        </FadeIn>
      </Container>
    </section>
  );
}
