
"use client";

import React from "react";
import Link from "next/link";

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { getNewArrivalProducts } from "@/data/storeData";
import ProductCard from "@/components/store/ProductCard";

const NewArrivals = () => {
  const newArrivals = getNewArrivalProducts();

  return (
    <section className="relative overflow-hidden bg-white py-9 sm:py-11 md:py-14 lg:py-16">
      <div className="container min-w-0 px-3 sm:px-5 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8 md:mb-9">
          <div className="min-w-0">
            <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-gray-900 sm:text-xl sm:tracking-[0.16em] md:text-2xl">
              New Arrivals
            </h2>

            <div className="mt-2 h-[2px] w-10 bg-pink-500 sm:w-12" />

            <p className="mt-2 text-[11px] text-gray-500 sm:text-sm">
              New arrivals product this week!
            </p>
          </div>

          {/* View All Button */}
          <Link
            href="/products"
            className="inline-flex shrink-0 items-center gap-1.5 bg-black px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-gray-800 sm:gap-2 sm:px-5 sm:py-3 sm:text-xs"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Products Slider */}
        {newArrivals.length > 0 ? (
          <div className="relative min-w-0 px-1 sm:px-2">
            {/* Previous Button */}
            <button
              id="new-arrivals-prev"
              type="button"
              aria-label="Previous products"
              className="absolute left-1 top-[38%] z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 sm:left-2 sm:top-1/2 sm:h-9 sm:w-9 md:h-10 md:w-10"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Next Button */}
            <button
              id="new-arrivals-next"
              type="button"
              aria-label="Next products"
              className="absolute right-1 top-[38%] z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 sm:right-2 sm:top-1/2 sm:h-9 sm:w-9 md:h-10 md:w-10"
            >
              <ChevronRight size={18} />
            </button>

            <Swiper
              modules={[Autoplay, Navigation]}
              navigation={{
                prevEl: "#new-arrivals-prev",
                nextEl: "#new-arrivals-next",
              }}
              autoplay={
                newArrivals.length > 1
                  ? {
                      delay: 3500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              loop={newArrivals.length > 5}
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 12,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 14,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 18,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
              className="!overflow-hidden"
            >
              {newArrivals.map((product) => (
                <SwiperSlide
                  key={product.id || product.slug}
                  className="h-auto"
                >
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="py-10 text-center sm:py-12">
            <p className="text-xs font-medium text-gray-500 sm:text-sm">
              No new arrivals available right now.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
