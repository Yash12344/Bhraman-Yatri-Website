import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FadeIn } from "@/components/shared/FadeIn";
import { FeatureCard } from "@/components/whychoose/FeatureCard";
import { FEATURES } from "@/lib/data";

export function WhyChoose() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-heading"
      className="pb-7"
    >
      <Container>
        <FadeIn>
          <div id="why-choose-heading">
            <SectionTitle title="Why Choose Bhraman Yatri" />
          </div>
        </FadeIn>
        <div className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
          {FEATURES.map((feature, index) => (
            <FadeIn key={feature.id} delay={index * 0.08}>
              <FeatureCard feature={feature} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
