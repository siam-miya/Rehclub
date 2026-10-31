
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import "swiper/css";

const slides = [
  {
    id: 1,
    eyebrow: "THE NEW SEASON · 2026",
    title: "Style That\nSpeaks For You.",
    description:
      "Discover elevated everyday essentials designed for comfort, confidence, and effortless style.",
    button: "Explore Collection",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=85",
    alt: "Contemporary fashion collection",
  },
  {
    id: 2,
    eyebrow: "MADE FOR EVERYDAY",
    title: "Redefine Your\nEveryday Look.",
    description:
      "Modern silhouettes, premium essentials, and timeless pieces made to be worn your way.",
    button: "Shop Men's Wear",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2200&q=85",
    alt: "Modern fashion editorial",
  },
  {
    id: 3,
    eyebrow: "THE STYLE EDIT",
    title: "Find Your\nSignature Style.",
    description:
      "From statement pieces to everyday favourites, discover a collection that feels like you.",
    button: "Shop Women's Wear",
    href: "/products",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=85",
    alt: "Women's contemporary fashion",
  },
];

const Banner = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      aria-label="Rehclub fashion collections"
      className="relative w-full overflow-hidden bg-[#e8e3dc]"
    >
      <Swiper
        modules={[Autoplay]}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) =>
          setActiveIndex(swiper.realIndex)
        }
        speed={600}
        loop
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex min-h-[480px] items-center sm:min-h-[540px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[680px]">

              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                quality={85}
                className="object-cover object-center"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/15 sm:from-black/65 sm:via-black/35 sm:to-black/10" />

              {/* Content */}
              <div className="container relative z-10 w-full px-12 py-20 sm:px-16 sm:py-24 md:px-16 lg:px-20 xl:px-24">

                <div className="max-w-2xl text-white">

                  {/* Eyebrow */}
                  <div className="mb-4 flex items-center gap-2.5 sm:mb-6 sm:gap-3">
                    <span className="h-px w-7 bg-white/80 sm:w-10" />

                    <p className="text-[9px] font-semibold uppercase tracking-[2px] sm:text-xs sm:tracking-[3px]">
                      {slide.eyebrow}
                    </p>
                  </div>

                  {/* Heading */}
                  <h1 className="whitespace-pre-line text-[34px] font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px]">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-4 max-w-md text-[12px] leading-6 text-white/85 sm:mt-6 sm:max-w-lg sm:text-sm sm:leading-7 md:text-base md:leading-8">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-4 sm:mt-10 sm:gap-5">

                    <Link
                      href={slide.href}
                      className="group/cta inline-flex min-h-11 items-center gap-3 bg-white px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-black transition-colors duration-300 hover:bg-black hover:text-white sm:min-h-12 sm:gap-5 sm:px-7 sm:text-xs"
                    >
                      {slide.button}

                      <ArrowUpRight
                        size={16}
                        className="shrink-0 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 sm:h-[17px] sm:w-[17px]"
                      />
                    </Link>

                    <Link
                      href="/products"
                      className="border-b border-white/60 pb-1 text-[10px] font-medium uppercase tracking-wider text-white transition-colors hover:border-white sm:text-xs"
                    >
                      Discover Rehclub
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous Arrow */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute left-1.5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-white/60 bg-black/10 text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:left-4 sm:h-10 sm:w-10 md:left-6 md:h-12 md:w-12 lg:left-10"
      >
        <ArrowLeft
          size={16}
          strokeWidth={1.5}
          className="sm:h-[19px] sm:w-[19px]"
        />
      </button>

      {/* Next Arrow */}
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperInstance?.slideNext()}
        className="absolute right-1.5 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-white/60 bg-black/10 text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:right-4 sm:h-10 sm:w-10 md:right-6 md:h-12 md:w-12 lg:right-10"
      >
        <ArrowRight
          size={16}
          strokeWidth={1.5}
          className="sm:h-[19px] sm:w-[19px]"
        />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-7 sm:gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => swiperInstance?.slideToLoop(index)}
            className="flex h-6 items-center"
          >
            <span
              className={`block h-[2px] transition-all duration-500 ${
                activeIndex === index
                  ? "w-8 bg-white sm:w-14"
                  : "w-4 bg-white/50 hover:bg-white/80 sm:w-8"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Banner;
