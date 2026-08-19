import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { BookingForm } from "@/components/booking/BookingForm";
import { TREKS } from "@/lib/treks";
import { HERO_SLIDES, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book Your Trek",
  description: `Book your Himalayan trek with ${SITE.name} and pay securely online.`,
  alternates: { canonical: `${SITE.url}/booking` },
  // A transactional step has nothing to offer search results.
  robots: { index: false, follow: true },
};

export default function BookingPage() {
  // Only the fields the form needs, so the full trek JSON stays server-side.
  const treks = TREKS.map((trek) => ({
    slug: trek.slug,
    name: trek.name,
    startingPrice: trek.startingPrice,
    duration: trek.duration,
  }));

  return (
    <>
      <PageHero
        title="Book Your Trek"
        subtitle="Confirm your details and continue to secure payment."
        image={HERO_SLIDES[0].image}
        imageAlt={HERO_SLIDES[0].imageAlt}
        crumbs={[{ label: "Home", href: "/" }, { label: "Book Your Trek" }]}
      />

      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)] sm:p-8">
            {/* The form reads ?trek= on the client, so it needs a Suspense
                boundary for the static export to prerender around. */}
            <Suspense fallback={<div className="min-h-96" />}>
              <BookingForm treks={treks} />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
