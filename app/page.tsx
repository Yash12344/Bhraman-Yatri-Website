import { TopBar } from "@/components/navbar/TopBar";
import { Navbar } from "@/components/navbar/Navbar";
import { Hero } from "@/components/hero/Hero";
import { SearchBar } from "@/components/search/SearchBar";
import { PopularTreks } from "@/components/treks/PopularTreks";
import { TreksBySeason } from "@/components/seasons/TreksBySeason";
import { WhyChoose } from "@/components/whychoose/WhyChoose";
import { EnquirySection } from "@/components/enquiry/EnquirySection";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <SearchBar />
        <PopularTreks />
        <TreksBySeason />
        <WhyChoose />
        <EnquirySection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
