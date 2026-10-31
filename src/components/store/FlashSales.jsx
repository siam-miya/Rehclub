
"use client";

import React, { useCallback, useMemo, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import FlashSaleTimer from "./FlashSaleTimer";
import ProductCard from "@/components/store/ProductCard";

import { products } from "@/data/storeData";

const DEFAULT_END_TIME = "2026-11-05T23:59:59+06:00";

const FlashSales = ({ flashSaleData }) => {
  const [isExpired, setIsExpired] = useState(false);

  const handleExpire = useCallback(() => {
    setIsExpired(true);
  }, []);

  const defaultProducts = useMemo(() => {
    const discountedProducts = products.filter(
      (product) =>
        Number(product.oldPrice) > Number(product.price) &&
        Number(product.price) > 0
    );

    return (
      discountedProducts.length > 0 ? discountedProducts : products
    ).slice(0, 8);
  }, []);

  const sale = flashSaleData || {
    isActive: true,
    endTime: DEFAULT_END_TIME,
    products: defaultProducts,
  };

  if (
    !sale?.isActive ||
    isExpired ||
    !Array.isArray(sale.products) ||
    sale.products.length === 0
  ) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-white py-9 sm:py-11 md:py-14 lg:py-16">
      <div className="container min-w-0 px-3 sm:px-5 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center text-center sm:mb-8 md:mb-9">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-600 sm:text-xs sm:tracking-[0.25em]">
            Limited Time Offers
          </p>

          <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-gray-900 sm:text-xl sm:tracking-[0.16em] md:text-2xl">
            Flash Sales
          </h2>

          <div className="mt-2 h-[2px] w-12 bg-pink-500 sm:w-14" />

          <p className="mt-2 max-w-md px-2 text-xs leading-5 text-gray-500 sm:mt-3 sm:text-sm">
            Grab your favorite products before the offer ends.
          </p>

          {/* Countdown */}
          <div className="mt-4 sm:mt-5">
            <FlashSaleTimer
              targetDate={sale.endTime}
              onExpire={handleExpire}
            />
          </div>
        </div>

        {/* Product Slider */}
        <div className="relative min-w-0 px-1 sm:px-2">
          {/* Previous Button */}
          <button
            id="flash-prev"
            type="button"
            aria-label="Previous products"
            className="absolute left-1 top-[38%] z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 sm:left-2 sm:top-1/2 sm:h-9 sm:w-9 md:h-10 md:w-10"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next Button */}
          <button
            id="flash-next"
            type="button"
            aria-label="Next products"
            className="absolute right-1 top-[38%] z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 sm:right-2 sm:top-1/2 sm:h-9 sm:w-9 md:h-10 md:w-10"
          >
            <ChevronRight size={18} />
          </button>

          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: "#flash-prev",
              nextEl: "#flash-next",
            }}
            autoplay={
              sale.products.length > 1
                ? {
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            loop={sale.products.length > 5}
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
            {sale.products.map((product) => (
              <SwiperSlide
                key={product.id || product.slug}
                className="h-auto"
              >
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
