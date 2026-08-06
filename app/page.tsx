import { Hero } from "@/components/hero/Hero";
import { SearchBar } from "@/components/search/SearchBar";
import { PopularTreks } from "@/components/treks/PopularTreks";
import { TreksBySeason } from "@/components/seasons/TreksBySeason";
import { WhyChoose } from "@/components/whychoose/WhyChoose";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { GalleryPreview } from "@/components/gallery/GalleryPreview";
import { EnquirySection } from "@/components/enquiry/EnquirySection";
import { getDifficulties } from "@/lib/treks";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchBar difficulties={getDifficulties()} />
      <PopularTreks />
      <TreksBySeason />
      <WhyChoose />
      <Testimonials />
      <GalleryPreview />
      <EnquirySection />
    </>
  );
}
