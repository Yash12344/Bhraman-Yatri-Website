import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { ABOUT } from "@/lib/about";
import { HERO_SLIDES, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: ABOUT.intro.lead,
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: `About Us | ${SITE.name}`,
    description: ABOUT.intro.lead,
    url: `${SITE.url}/about`,
    images: [HERO_SLIDES[2].image],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={ABOUT.hero.title}
        subtitle={ABOUT.hero.subtitle}
        image={HERO_SLIDES[2].image}
        imageAlt={HERO_SLIDES[2].imageAlt}
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Intro */}
      <section className="py-14">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xl font-semibold leading-relaxed text-gray-900 sm:text-2xl">
                {ABOUT.intro.lead}
              </p>
              {ABOUT.intro.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 text-base leading-[1.9] text-gray-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <blockquote className="mx-auto mt-10 max-w-3xl rounded-2xl border-l-4 border-saffron-500 bg-neutral-50 px-6 py-6 text-center text-base italic leading-relaxed text-gray-700 sm:text-lg">
              {ABOUT.intro.pullQuote}
            </blockquote>
          </FadeIn>
        </Container>
      </section>

      {/* Who we are */}
      <section aria-labelledby="who-we-are-heading" className="bg-neutral-50 py-14">
        <Container>
          <FadeIn>
            <SectionTitle id="who-we-are-heading" title={ABOUT.whoWeAre.heading} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mx-auto mt-8 max-w-3xl space-y-5">
              {ABOUT.whoWeAre.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-[1.9] text-gray-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Stats */}
      <section aria-labelledby="glance-heading" className="py-14">
        <Container>
          <FadeIn>
            <SectionTitle id="glance-heading" title={ABOUT.stats.heading} />
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.stats.items.map((stat, index) => (
              <FadeIn key={stat.id} delay={index * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-6 text-center shadow-[0_10px_30px_-22px_rgba(0,0,0,0.3)]">
                  <p className="text-4xl font-extrabold text-saffron-500">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold tracking-wide text-gray-900">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    {stat.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* How we work */}
      <section
        aria-labelledby="how-we-work-heading"
        className="bg-neutral-50 py-14"
      >
        <Container>
          <FadeIn>
            <SectionTitle
              id="how-we-work-heading"
              title={ABOUT.howWeWork.heading}
            />
          </FadeIn>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT.howWeWork.items.map((item, index) => (
              <FadeIn key={item.id} delay={index * 0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.3)]">
                  <span
                    aria-hidden="true"
                    className="flex size-12 items-center justify-center rounded-xl bg-forest-50 text-2xl leading-none"
                  >
                    {item.emoji}
                  </span>
                  <h3 className="mt-4 text-base font-bold tracking-wide text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section aria-labelledby="why-us-heading" className="py-14">
        <Container>
          <FadeIn>
            <SectionTitle id="why-us-heading" title={ABOUT.whyUs.heading} />
          </FadeIn>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {ABOUT.whyUs.items.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <div className="h-full border-t-2 border-saffron-500 pt-5">
                  <h3 className="text-lg font-bold leading-snug tracking-wide text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Our promise */}
      <section aria-labelledby="promise-heading" className="bg-neutral-50 py-14">
        <Container>
          <FadeIn>
            <SectionTitle id="promise-heading" title={ABOUT.promise.heading} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mx-auto mt-8 max-w-3xl text-center">
              <p className="text-xl font-semibold leading-relaxed text-gray-900">
                {ABOUT.promise.lead}
              </p>
              {ABOUT.promise.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-5 text-base leading-[1.9] text-gray-600"
                >
                  {paragraph}
                </p>
              ))}
              <p className="mt-7 text-base font-semibold italic leading-relaxed text-forest-800">
                {ABOUT.promise.closingLine}
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Closing band */}
      <section className="bg-forest-800 py-14 text-white">
        <Container className="text-center">
          <h2 className="text-2xl font-extrabold tracking-wide md:text-3xl">
            {ABOUT.closing.title}
          </h2>
          <p className="mt-3 text-sm font-semibold tracking-[0.2em] text-saffron-400">
            {ABOUT.closing.tagline}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85">
            {ABOUT.closing.line}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
