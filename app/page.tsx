import { Hero } from "@/components/hero/Hero";
import { PopularTreks } from "@/components/treks/PopularTreks";
import { TreksBySeason } from "@/components/seasons/TreksBySeason";
import { WhyChoose } from "@/components/whychoose/WhyChoose";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { GalleryPreview } from "@/components/gallery/GalleryPreview";
import { EnquirySection } from "@/components/enquiry/EnquirySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularTreks />
      <TreksBySeason />
      <WhyChoose />
      <Testimonials />
      <GalleryPreview />
      <EnquirySection />
    </>
  );
}
