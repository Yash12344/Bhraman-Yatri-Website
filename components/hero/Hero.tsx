"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { HERO_SLIDES, SITE } from "@/lib/data";

import "swiper/css";
import "swiper/css/pagination";

export function Hero() {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <section id="home" aria-label="Featured treks" className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        className="hero-swiper h-[440px] md:h-[500px] lg:h-[570px]"
        slidesPerView={1}
        loop
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {HERO_SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent"
              />
              <div className="absolute inset-0 flex items-center">
                <Container>
                  <div className="max-w-2xl pb-10 lg:pb-14">
                    {index === 0 ? (
                      <h1 className="text-5xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
                        {slide.titleTop}
                        <span className="block text-saffron-500">
                          {slide.titleHighlight}
                        </span>
                      </h1>
                    ) : (
                      <p className="text-5xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
                        {slide.titleTop}
                        <span className="block text-saffron-500">
                          {slide.titleHighlight}
                        </span>
                      </p>
                    )}
                    <p className="mt-5 max-w-md text-[18px] leading-[1.3] text-white/90 sm:text-[20px] lg:text-[22px]">
                      {slide.subtitle}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Link href="#popular-treks">
                        <Button variant="primary" size="lg" tabIndex={-1}>
                          Explore Treks
                        </Button>
                      </Link>
                      <a
                        href={SITE.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="pill" tabIndex={-1}>
                          <WhatsAppIcon className="size-5" />
                          Whatsapp Us
                        </Button>
                      </a>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-[43.5%] z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex lg:left-8"
      >
        <ChevronLeft aria-hidden="true" className="size-8" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-[43.5%] z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex lg:right-8"
      >
        <ChevronRight aria-hidden="true" className="size-8" />
      </button>
    </section>
  );
}
