
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    eyebrow: "THE NEW SEASON · 2026",
    title: "Style That\nSpeaks For You.",
    description:
      "Discover elevated everyday essentials designed for comfort, confidence, and effortless style.",
    button: "Explore Collection",
    href: "/categories/new-arrivals",
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
    href: "/categories/men",
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
    href: "/categories/women",
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
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="group/banner w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex min-h-[500px] items-center sm:min-h-[600px] lg:min-h-[680px]">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                quality={85}
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />

              <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-24 sm:px-16 lg:px-24">
                <div className="max-w-2xl text-white">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-10 bg-white/80" />
                    <p className="text-[10px] font-semibold uppercase tracking-[3px] sm:text-xs">
                      {slide.eyebrow}
                    </p>
                  </div>

                  <h1 className="whitespace-pre-line text-4xl font-semibold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl xl:text-[82px]">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-lg text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-5 sm:mt-10">
                    <Link
                      href={slide.href}
                      className="group/cta inline-flex min-h-12 items-center gap-5 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black transition-colors duration-300 hover:bg-black hover:text-white sm:px-7"
                    >
                      {slide.button}
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      />
                    </Link>

                    <Link
                      href="/categories/collections"
                      className="border-b border-white/60 pb-1 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:border-white"
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

      {/* Left Arrow */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperInstance?.slidePrev()}
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/60 bg-black/10 text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:left-6 sm:h-12 sm:w-12 lg:left-10"
      >
        <ArrowLeft size={19} strokeWidth={1.5} />
      </button>

      {/* Right Arrow */}
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiperInstance?.slideNext()}
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/60 bg-black/10 text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:right-6 sm:h-12 sm:w-12 lg:right-10"
      >
        <ArrowRight size={19} strokeWidth={1.5} />
      </button>

      {/* Bottom Center Underline Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 sm:bottom-8 sm:gap-3">
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
                  ? "w-10 bg-white sm:w-14"
                  : "w-5 bg-white/50 hover:bg-white/80 sm:w-8"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Banner;
