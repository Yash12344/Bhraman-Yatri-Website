"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeIn } from "@/components/shared/FadeIn";
import { TrekCard } from "@/components/treks/TrekCard";
import { POPULAR_TREKS } from "@/lib/data";

import "swiper/css";

export function PopularTreks() {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <section
      id="popular-treks"
      aria-labelledby="popular-treks-heading"
      className="pb-9 pt-11"
    >
      <Container>
        <FadeIn>
          <div id="popular-treks-heading">
            <SectionHeading title="Popular Treks" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="relative mt-3.5">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={36}
            slidesPerView={1.15}
            breakpoints={{
              540: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="!px-1 !py-2"
          >
            {POPULAR_TREKS.map((trek) => (
              <SwiperSlide key={trek.id} className="h-auto">
                <TrekCard trek={trek} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Previous treks"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute -left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-gray-700 shadow-md transition-colors hover:bg-forest-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 min-[1380px]:-left-11"
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next treks"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute -right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-gray-700 shadow-md transition-colors hover:bg-forest-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 min-[1380px]:-right-11"
          >
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </FadeIn>
      </Container>
    </section>
  );
}
