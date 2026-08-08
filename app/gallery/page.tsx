import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { PageHero } from "@/components/shared/PageHero";
import { Gallery } from "@/components/gallery/Gallery";
import { getSiteGallery } from "@/lib/gallery";
import { HERO_SLIDES, SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from Bhraman Yatri's Himalayan treks — summits, campsites, meadows and the trails in between.",
  alternates: { canonical: `${SITE.url}/gallery` },
  openGraph: {
    title: `Gallery | ${SITE.name}`,
    description: "Photographs from Bhraman Yatri's Himalayan treks.",
    url: `${SITE.url}/gallery`,
    images: [HERO_SLIDES[0].image],
  },
};

export default function GalleryPage() {
  const images = getSiteGallery();

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Moments from the trail, captured by our trekkers and guides."
        image={HERO_SLIDES[0].image}
        imageAlt={HERO_SLIDES[0].imageAlt}
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="py-12">
        <Container>
          {images.length > 0 ? (
            <>
              <p className="mb-6 text-sm text-gray-500">
                {images.length} photograph{images.length === 1 ? "" : "s"}
              </p>
              <Gallery images={images} columns={4} />
            </>
          ) : (
            <p className="py-16 text-center text-sm text-gray-500">
              Photographs will appear here soon.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
