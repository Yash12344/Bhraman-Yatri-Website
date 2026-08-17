import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { LegalDocumentView } from "@/components/legal/LegalDocumentView";
import { PRIVACY_POLICY } from "@/lib/legal";
import { HERO_SLIDES, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.summary,
  alternates: { canonical: `${SITE.url}/privacy-policy` },
  openGraph: {
    title: `${PRIVACY_POLICY.title} | ${SITE.name}`,
    description: PRIVACY_POLICY.summary,
    url: `${SITE.url}/privacy-policy`,
    images: [HERO_SLIDES[2].image],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title={PRIVACY_POLICY.title}
        subtitle={PRIVACY_POLICY.summary}
        image={HERO_SLIDES[2].image}
        imageAlt={HERO_SLIDES[2].imageAlt}
        crumbs={[{ label: "Home", href: "/" }, { label: PRIVACY_POLICY.title }]}
      />
      <section className="py-12">
        <Container>
          <LegalDocumentView doc={PRIVACY_POLICY} />
        </Container>
      </section>
    </>
  );
}
