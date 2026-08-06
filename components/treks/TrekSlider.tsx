"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { TrekCard } from "@/components/treks/TrekCard";
import type { TrekView } from "@/lib/treks";

import "swiper/css";

interface TrekSliderProps {
  treks: TrekView[];
  label: string;
}

/** Arrow-navigated trek carousel, shared by any section that needs one. */
export function TrekSlider({ treks, label }: TrekSliderProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <div className="relative">
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
        {treks.map((trek) => (
          <SwiperSlide key={trek.slug} className="h-auto">
            <TrekCard trek={trek} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label={`Previous ${label}`}
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute -left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-gray-700 shadow-md transition-colors hover:bg-forest-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 min-[1380px]:-left-11"
      >
        <ChevronLeft aria-hidden="true" className="size-4" />
      </button>
      <button
        type="button"
        aria-label={`Next ${label}`}
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute -right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-gray-700 shadow-md transition-colors hover:bg-forest-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 min-[1380px]:-right-11"
      >
        <ChevronRight aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
