import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { TERMS_AND_CONDITIONS } from "@/lib/legal";
import { HERO_SLIDES, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: TERMS_AND_CONDITIONS.title,
  description: TERMS_AND_CONDITIONS.summary,
  alternates: { canonical: `${SITE.url}/terms-and-conditions` },
  openGraph: {
    title: `${TERMS_AND_CONDITIONS.title} | ${SITE.name}`,
    description: TERMS_AND_CONDITIONS.summary,
    url: `${SITE.url}/terms-and-conditions`,
    images: [HERO_SLIDES[0].image],
  },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHero
        title={TERMS_AND_CONDITIONS.title}
        subtitle={TERMS_AND_CONDITIONS.summary}
        image={HERO_SLIDES[0].image}
        imageAlt={HERO_SLIDES[0].imageAlt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: TERMS_AND_CONDITIONS.title },
        ]}
      />
      <section className="py-12">
        <Container>
          <LegalDocumentView doc={TERMS_AND_CONDITIONS} />
        </Container>
      </section>
    </>
  );
}
