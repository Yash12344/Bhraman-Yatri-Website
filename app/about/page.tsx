import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FadeIn } from "@/components/shared/FadeIn";
import { FeatureCard } from "@/components/whychoose/FeatureCard";
import { Button } from "@/components/ui/button";
import { FEATURES, HERO_SLIDES, SITE } from "@/lib/data";
import { TREKS, getRegions } from "@/lib/treks";
import { SEASON_LIST } from "@/lib/seasons";
import { getTreksBySeason } from "@/lib/treks";

export const metadata: Metadata = {
  title: "About Us",
  description: `${SITE.description} Learn how we plan and run our Himalayan treks.`,
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: `About Us | ${SITE.name}`,
    description: SITE.description,
    url: `${SITE.url}/about`,
    images: [HERO_SLIDES[2].image],
  },
};

export default function AboutPage() {
  // Figures are counted from the trek data, never hardcoded.
  const activeSeasons = SEASON_LIST.filter(
    (season) => getTreksBySeason(season.id).length > 0
  );
  const stats = [
    { value: `${TREKS.length}`, label: "Curated Treks" },
    { value: `${getRegions().length}`, label: "Himalayan Regions" },
    { value: `${activeSeasons.length}`, label: "Seasons Covered" },
    { value: "24×7", label: "Trekker Support" },
  ];

  return (
    <>
      <PageHero
        title="About Bhraman Yatri"
        subtitle={SITE.tagline}
        image={HERO_SLIDES[2].image}
        imageAlt={HERO_SLIDES[2].imageAlt}
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <section className="py-14">
        <Container>
          <FadeIn>
            <SectionTitle
              title="Who We Are"
              subtitle={SITE.description}
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-[0_10px_30px_-22px_rgba(0,0,0,0.3)]"
                >
                  <p className="text-3xl font-extrabold text-saffron-500">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section aria-labelledby="about-why-heading" className="pb-14">
        <Container>
          <FadeIn>
            <SectionTitle id="about-why-heading" title="How We Work" />
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
            {FEATURES.map((feature, index) => (
              <FadeIn key={feature.id} delay={index * 0.08}>
                <FeatureCard feature={feature} />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest-800 py-14 text-white">
        <Container className="text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wide md:text-3xl">
            Ready to walk with us?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80">
            Browse our treks and find the one that matches your fitness, calendar
            and budget.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link href="/treks">
              <Button variant="primary" size="lg" tabIndex={-1}>
                Explore Treks
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="pill" tabIndex={-1}>
                Talk To Us
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
