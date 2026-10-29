
"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import FlashSaleTimer from "./FlashSaleTimer";
import { products } from "@/data/storeData";

const DEFAULT_END_TIME = "2026-11-05T23:59:59+06:00";

const formatPrice = (value) => {
  const price = Number(value);

  if (!Number.isFinite(price)) return value || "";

  return `৳${price.toLocaleString("en-BD")}`;
};

const getProductUrl = (product) => {
  const categoryPath = Array.isArray(product.categoryPath)
    ? product.categoryPath
    : [];

  return `/products/categories/${[
    ...categoryPath,
    product.slug,
  ].join("/")}`;
};

const FlashSales = ({ flashSaleData }) => {
  const [isExpired, setIsExpired] = useState(false);

  const handleExpire = useCallback(() => {
    setIsExpired(true);
  }, []);

  // Use actual Rehclub products.
  const defaultProducts = useMemo(() => {
    const discountedProducts = products.filter((product) => {
      return (
        Number(product.oldPrice) > Number(product.price) &&
        Number(product.price) > 0
      );
    });

    // If no discounted products exist, show actual products instead.
    return (
      discountedProducts.length > 0
        ? discountedProducts
        : products
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
    <section className="relative bg-white py-12 sm:py-14">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
            Limited Time Offers
          </p>

          <h2 className="mt-2 text-2xl font-bold uppercase tracking-wide text-gray-950 sm:text-3xl">
            Flash Sales
          </h2>

          <div className="mt-3 h-[2px] w-14 bg-red-600" />

          <p className="mt-3 text-sm text-gray-500">
            Grab your favorite products before the offer ends.
          </p>

          {/* Countdown */}
          <div className="mt-5">
            <FlashSaleTimer
              targetDate={sale.endTime}
              onExpire={handleExpire}
            />
          </div>
        </div>

        {/* Slider */}
        <div className="group relative px-7 sm:px-9">

          {/* Previous Button */}
          <button
            id="flash-prev"
            type="button"
            aria-label="Previous products"
            className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next Button */}
          <button
            id="flash-next"
            type="button"
            aria-label="Next products"
            className="absolute right-0 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={20} />
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
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            className="w-full"
          >
            {sale.products.map((product) => {
              const hasDiscount =
                Number(product.oldPrice) > Number(product.price);

              const discountPercentage = hasDiscount
                ? Math.round(
                    ((Number(product.oldPrice) - Number(product.price)) /
                      Number(product.oldPrice)) *
                      100
                  )
                : 0;

              return (
                <SwiperSlide key={product.id || product.slug}>
                  <Link
                    href={getProductUrl(product)}
                    className="group/card block h-full cursor-pointer border border-gray-100 bg-white p-2 text-center transition hover:border-gray-300 hover:shadow-md"
                  >
                    {/* Product Image */}
                    <div className="relative mb-4 aspect-square w-full overflow-hidden bg-gray-50">
                      <Image
                        src={product.image || "/logo.png"}
                        alt={product.name || "Product"}
                        fill
                        unoptimized
                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover/card:scale-105"
                      />

                      {hasDiscount && (
                        <span className="absolute left-2 top-2 z-10 bg-red-600 px-2 py-1 text-[10px] font-bold text-white">
                          -{discountPercentage}%
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="line-clamp-2 min-h-10 text-xs font-semibold text-gray-900 transition-colors group-hover/card:text-red-600 sm:text-sm">
                      {product.name}
                    </h3>

                    {/* Product Price */}
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                      <span className="text-sm font-bold text-gray-950">
                        {formatPrice(product.price)}
                      </span>

                      {hasDiscount && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
