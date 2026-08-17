import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BarChart3,
  CalendarRange,
  Clock,
  Mountain,
  Package,
  ShieldAlert,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FadeIn } from "@/components/shared/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { QuickFacts } from "@/components/trek/QuickFacts";
import { Timeline } from "@/components/trek/Timeline";
import { CheckList } from "@/components/trek/CheckList";
import { Gallery } from "@/components/gallery/Gallery";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { TrekCard } from "@/components/treks/TrekCard";
import { getTrekGallery } from "@/lib/gallery";
import { TREKS, getRelatedTreks, getTrekBySlug } from "@/lib/treks";
import { SITE } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface TrekPageProps {
  params: Promise<{ slug: string }>;
}

/** Every trek JSON becomes a statically generated page. */
export function generateStaticParams() {
  return TREKS.map((trek) => ({ slug: trek.slug }));
}

export async function generateMetadata({
  params,
}: TrekPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);
  if (!trek) return { title: "Trek not found" };

  const title = `${trek.name} — ${trek.duration} | ${trek.difficultyLabel}`;
  // Prefer the written hook; fall back to the facts when none is supplied.
  const description = trek.shortOverview
    ? `${trek.shortOverview} ${trek.duration}, ${trek.trekDistance}, from ${formatPrice(trek.startingPrice)} per person.`
    : `${trek.name} in ${trek.regionLabel}: ${trek.duration}, max altitude ${trek.altitude}, ${trek.trekDistance} of trekking. Best season ${trek.bestSeason}. Starting from ${formatPrice(trek.startingPrice)} per person.`;
  const url = `${SITE.url}/treks/${trek.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: trek.image, width: 1200, height: 900, alt: trek.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [trek.image],
    },
  };
}

export default async function TrekPage({ params }: TrekPageProps) {
  const { slug } = await params;
  const trek = getTrekBySlug(slug);
  if (!trek) notFound();

  const gallery = getTrekGallery(trek.slug, trek.name);
  const related = getRelatedTreks(trek.slug);
  const url = `${SITE.url}/treks/${trek.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "All Treks", item: `${SITE.url}/treks` },
      { "@type": "ListItem", position: 3, name: trek.name, item: url },
    ],
  };

  const policyItems = [
    {
      id: "cancellation",
      title: "Cancellation Policy",
      content: (
        <div className="space-y-3">
          <ul className="space-y-2">
            {trek.cancellationPolicy.rules.map((rule, index) => (
              <li key={index} className="flex gap-2">
                <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-saffron-400" />
                <span>
                  <strong className="font-semibold text-gray-900">{rule.window}</strong>{" "}
                  — {rule.outcome}
                </span>
              </li>
            ))}
          </ul>
          {trek.cancellationPolicy.note && <p>{trek.cancellationPolicy.note}</p>}
          {trek.cancellationPolicy.refund && (
            <p>
              <strong className="font-semibold text-gray-900">Refund:</strong>{" "}
              {trek.cancellationPolicy.refund}
            </p>
          )}
        </div>
      ),
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      content: (
        <div className="space-y-3">
          {trek.termsAndConditions.bookingConfirmation && (
            <p>
              <strong className="font-semibold text-gray-900">
                Booking confirmation:
              </strong>{" "}
              {trek.termsAndConditions.bookingConfirmation}
            </p>
          )}
          <ul className="space-y-2">
            {trek.termsAndConditions.keyNotes.map((note, index) => (
              <li key={index} className="flex gap-2">
                <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-saffron-400" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    ...(trek.backpackOffloading.length > 0
      ? [
          {
            id: "offloading",
            title: "Backpack Offloading",
            content: <CheckList items={trek.backpackOffloading} tone="neutral" />,
          },
        ]
      : []),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero banner */}
      <section className="relative h-[380px] md:h-[460px]">
        <Image
          src={trek.image}
          alt={trek.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25"
        />
        <div className="absolute inset-x-0 bottom-0">
          <Container className="pb-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "All Treks", href: "/treks" },
                { label: trek.name },
              ]}
              tone="light"
              className="mb-3"
            />
            <div className="flex flex-wrap gap-2">
              <Badge variant="solid" size="md">
                {trek.regionLabel}
              </Badge>
              <Badge variant="glass" size="md">
                <CalendarRange aria-hidden="true" className="size-3.5" />
                {trek.bestSeason}
              </Badge>
            </div>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold uppercase leading-tight tracking-tight text-white md:text-5xl">
              {trek.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
              <span className="flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-4" />
                {trek.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart3 aria-hidden="true" className="size-4" />
                {trek.difficultyLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <Mountain aria-hidden="true" className="size-4" />
                {trek.altitude}
              </span>
              <span className="text-lg font-bold text-saffron-400">
                From {formatPrice(trek.startingPrice)}
                <span className="text-xs font-normal text-white/80"> /person</span>
              </span>
            </div>
          </Container>
        </div>
      </section>

      <div className="py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="min-w-0 space-y-12">
              {/* Quick facts */}
              <section aria-labelledby="quick-facts-heading">
                <h2
                  id="quick-facts-heading"
                  className="mb-6 text-xl font-bold uppercase tracking-wide text-gray-900"
                >
                  Quick Facts
                </h2>
                <QuickFacts trek={trek} />
              </section>

              {/* Overview — only when the operator has supplied copy. */}
              {(trek.shortOverview || trek.fullOverview) && (
                <section aria-labelledby="overview-heading">
                  <h2
                    id="overview-heading"
                    className="mb-4 text-xl font-bold uppercase tracking-wide text-gray-900"
                  >
                    Overview
                  </h2>
                  {trek.shortOverview && (
                    <p className="text-base leading-relaxed text-gray-700">
                      {trek.shortOverview}
                    </p>
                  )}
                  {trek.fullOverview && (
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {trek.fullOverview}
                    </p>
                  )}
                </section>
              )}

              {/* Highlights — only when supplied. */}
              {trek.highlights.length > 0 && (
                <section aria-labelledby="highlights-heading">
                  <h2
                    id="highlights-heading"
                    className="mb-4 text-xl font-bold uppercase tracking-wide text-gray-900"
                  >
                    Highlights
                  </h2>
                  <CheckList items={trek.highlights} tone="include" />
                </section>
              )}

              {/* Gallery */}
              {gallery.length > 1 && (
                <section aria-labelledby="gallery-heading">
                  <h2
                    id="gallery-heading"
                    className="mb-6 text-xl font-bold uppercase tracking-wide text-gray-900"
                  >
                    Gallery
                  </h2>
                  <Gallery images={gallery} columns={3} />
                </section>
              )}

              {/* Itinerary */}
              <section aria-labelledby="itinerary-heading">
                <h2
                  id="itinerary-heading"
                  className="mb-6 text-xl font-bold uppercase tracking-wide text-gray-900"
                >
                  Day-wise Itinerary
                </h2>
                <Timeline days={trek.itinerary} />
              </section>

              {/* Inclusions & exclusions */}
              <section aria-labelledby="inclusions-heading">
                <h2
                  id="inclusions-heading"
                  className="mb-6 text-xl font-bold uppercase tracking-wide text-gray-900"
                >
                  What&apos;s Included
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="rounded-2xl border border-neutral-100 bg-white p-6">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-forest-700">
                      Inclusions
                    </h3>
                    <CheckList items={trek.inclusions} tone="include" />
                  </div>
                  <div className="rounded-2xl border border-neutral-100 bg-white p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-500">
                      <ShieldAlert aria-hidden="true" className="size-4" />
                      Exclusions
                    </h3>
                    <CheckList items={trek.exclusions} tone="exclude" />
                  </div>
                </div>
              </section>

              {/* Things to carry */}
              {trek.thingsToCarry.length > 0 && (
                <section aria-labelledby="carry-heading">
                  <h2
                    id="carry-heading"
                    className="mb-6 flex items-center gap-2 text-xl font-bold uppercase tracking-wide text-gray-900"
                  >
                    <Package aria-hidden="true" className="size-5 text-saffron-500" />
                    Things To Carry
                  </h2>
                  <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {trek.thingsToCarry.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-saffron-400"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {trek.thingsToCarryNotes.length > 0 && (
                    <ul className="mt-5 space-y-2 rounded-xl bg-saffron-50 p-4">
                      {trek.thingsToCarryNotes.map((note, index) => (
                        <li key={index} className="text-sm leading-relaxed text-saffron-800">
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              {/* Policies */}
              <section aria-labelledby="policies-heading">
                <h2
                  id="policies-heading"
                  className="mb-6 text-xl font-bold uppercase tracking-wide text-gray-900"
                >
                  Policies
                </h2>
                <Accordion items={policyItems} defaultOpen={0} />
              </section>

              {/* FAQs — only when supplied. */}
              {trek.faqs.length > 0 && (
                <section aria-labelledby="faq-heading">
                  <h2
                    id="faq-heading"
                    className="mb-6 text-xl font-bold uppercase tracking-wide text-gray-900"
                  >
                    Frequently Asked Questions
                  </h2>
                  <Accordion
                    items={trek.faqs.map((faq, index) => ({
                      id: `faq-${index}`,
                      title: faq.question,
                      content: <p>{faq.answer}</p>,
                    }))}
                  />
                </section>
              )}
            </div>

            {/* Booking sidebar */}
            <aside className="lg:sticky lg:top-[110px] lg:h-fit">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)]">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Starting from
                </p>
                <p className="mt-1 text-3xl font-extrabold text-saffron-500">
                  {formatPrice(trek.startingPrice)}
                  <span className="text-sm font-normal text-gray-500"> /person</span>
                </p>
                {trek.startingPriceEntry.route && (
                  <p className="mt-1 text-xs text-gray-500">
                    {trek.startingPriceEntry.route}
                  </p>
                )}

                {trek.price.length > 1 && (
                  <ul className="mt-4 space-y-2 border-t border-neutral-100 pt-4">
                    {trek.price.map((entry, index) => (
                      <li
                        key={index}
                        className="flex items-baseline justify-between gap-3 text-sm"
                      >
                        <span className="text-gray-600">{entry.route}</span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(entry.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* One booking form for the whole site, on /booking — this
                    hands off to it with the trek and price prefilled. */}
                <div className="mt-6 border-t border-neutral-100 pt-6">
                  <h2 className="text-base font-bold uppercase tracking-wide text-gray-900">
                    Book This Trek
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    We reply within 24 hours.
                  </p>
                  <Link
                    href={`/booking?trek=${trek.slug}`}
                    className="mt-4 block"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      tabIndex={-1}
                    >
                      Book Now
                      <span className="sr-only"> — {trek.name}</span>
                    </Button>
                  </Link>
                  <a
                    href={SITE.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-forest-700 transition-colors hover:text-forest-800"
                  >
                    <WhatsAppIcon aria-hidden="true" className="size-4" />
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </div>

      {/* Related treks */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="bg-neutral-50 py-12">
          <Container>
            <FadeIn>
              <SectionTitle
                id="related-heading"
                title="You May Also Like"
                subtitle={`Similar treks in ${trek.regionLabel} and beyond.`}
              />
            </FadeIn>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <li key={item.slug}>
                  <FadeIn delay={index * 0.08}>
                    <TrekCard trek={item} />
                  </FadeIn>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <Link href="/treks">
                <Button variant="dark" size="md" tabIndex={-1}>
                  Browse All Treks
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
