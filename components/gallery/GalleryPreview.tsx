import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { FadeIn } from "@/components/shared/FadeIn";
import { Gallery } from "@/components/gallery/Gallery";
import { Button } from "@/components/ui/button";
import { getSiteGallery } from "@/lib/gallery";

/** Homepage teaser — first few photos, linking through to the full gallery. */
export function GalleryPreview() {
  const images = getSiteGallery().slice(0, 6);
  if (images.length === 0) return null;

  return (
    <section aria-labelledby="gallery-preview-heading" className="pb-10">
      <Container>
        <FadeIn>
          <SectionTitle
            id="gallery-preview-heading"
            title="Moments From The Trail"
          />
        </FadeIn>
        <FadeIn delay={0.1} className="mt-6">
          <Gallery images={images} columns={3} />
        </FadeIn>
        <div className="mt-7 flex justify-center">
          <Link href="/gallery">
            <Button variant="dark" size="md" tabIndex={-1}>
              View Full Gallery
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
