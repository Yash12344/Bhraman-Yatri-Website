import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { FeatureCard } from "@/components/whychoose/FeatureCard";
import { FEATURES } from "@/lib/data";

export function WhyChoose() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-heading"
      className="pb-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div id="why-choose-heading">
            <SectionHeading title="Why Choose Bhraman Yatri" />
          </div>
        </FadeIn>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {FEATURES.map((feature, index) => (
            <FadeIn key={feature.id} delay={index * 0.08}>
              <FeatureCard feature={feature} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
