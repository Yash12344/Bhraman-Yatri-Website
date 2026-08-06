import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { TrekExplorer } from "@/components/treks/TrekExplorer";
import {
  TREKS,
  getDifficulties,
  getPriceBounds,
  getRegions,
} from "@/lib/treks";
import { HERO_SLIDES, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Himalayan Treks",
  description: `Browse all ${TREKS.length} Himalayan treks with Bhraman Yatri — filter by destination, difficulty, season, duration and price.`,
  alternates: { canonical: `${SITE.url}/treks` },
  openGraph: {
    title: `All Himalayan Treks | ${SITE.name}`,
    description: `Browse all ${TREKS.length} Himalayan treks — filter by destination, difficulty, season, duration and price.`,
    url: `${SITE.url}/treks`,
    images: [HERO_SLIDES[0].image],
  },
};

export default function TreksPage() {
  return (
    <>
      <PageHero
        title="All Treks"
        subtitle={`${TREKS.length} handcrafted Himalayan journeys across ${getRegions().length} regions.`}
        image={HERO_SLIDES[1].image}
        imageAlt={HERO_SLIDES[1].imageAlt}
        crumbs={[{ label: "Home", href: "/" }, { label: "All Treks" }]}
      />

      <section className="py-12">
        <Container>
          {/* useSearchParams needs a Suspense boundary during prerender. */}
          <Suspense
            fallback={
              <p className="text-sm text-gray-500">Loading treks…</p>
            }
          >
            <TrekExplorer
              treks={TREKS}
              regions={getRegions()}
              difficulties={getDifficulties()}
              priceBounds={getPriceBounds()}
            />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
