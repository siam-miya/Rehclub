
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Heart,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import { products } from "@/data/storeData";
import { useStore } from "@/stores/useStore";

const FeaturedProduct = () => {
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  // Get Featured Product
  const product = products.find(
    (item) => item.isFeatured === true
  );

  if (!product) return null;

  const {
    id,
    name,
    slug,
    price,
    oldPrice,
    image,
    description,
    categoryPath = [],
    stock = 0,
  } = product;

  const productId = id ?? slug;

  const normalizedProduct = {
    ...product,
    id: productId,
    image: image || "/logo.png",
  };

  // Product Details URL
  const productDetailsHref = `/products/categories/${[
    ...categoryPath,
    slug,
  ].join("/")}`;

  // Category URL
  const categoryHref =
    categoryPath.length > 0
      ? `/products/categories/${categoryPath.join("/")}`
      : "/products";

  const soldOut = Number(stock) <= 0;

  const isWishlisted = wishlist.some(
    (item) => String(item.id) === String(productId)
  );

  const hasDiscount = Number(oldPrice) > Number(price);

  const discountPercentage = hasDiscount
    ? Math.round(
        ((Number(oldPrice) - Number(price)) /
          Number(oldPrice)) *
          100
      )
    : 0;

  // Add To Cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (soldOut) return;

    addToCart(normalizedProduct, 1);
  };

  // Wishlist
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist(normalizedProduct);
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f6f2] py-9 sm:py-12 md:py-14 lg:py-16 xl:py-20">
      <div className="container min-w-0 px-3 sm:px-5 md:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-7 flex flex-col items-center text-center sm:mb-9 md:mb-10 lg:mb-12">
          <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-gray-900 sm:text-xl sm:tracking-[0.16em] md:text-2xl">
            Featured Product
          </h2>

          <div className="mt-2 h-[2px] w-12 bg-pink-500 sm:w-14" />

          <p className="mt-2 max-w-md px-2 text-xs leading-5 text-gray-500 sm:mt-3 sm:text-sm">
            Handpicked & Special Pick From Our Collection!
          </p>
        </div>

        {/* Featured Product Card */}
        <div className="group grid min-w-0 overflow-hidden bg-white md:grid-cols-2">
          {/* Product Image */}
          <Link
            href={productDetailsHref}
            aria-label={`View ${name}`}
            className="relative block aspect-[4/4.5] min-w-0 overflow-hidden bg-gray-100 sm:aspect-[4/4] md:aspect-auto md:min-h-[440px] lg:min-h-[500px] xl:min-h-[560px]"
          >
            <Image
              src={image || "/logo.png"}
              alt={name || "Featured Product"}
              fill
              unoptimized
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Featured Badge */}
            <span className="absolute left-3 top-3 flex items-center gap-1.5 bg-white px-3 py-2 text-[9px] font-bold uppercase tracking-widest text-black shadow-sm sm:left-5 sm:top-5 sm:gap-2 sm:px-4 sm:text-[10px]">
              <Sparkles size={13} />
              Featured
            </span>

            {/* Discount Badge */}
            {hasDiscount && (
              <span className="absolute bottom-3 left-3 bg-black px-3 py-2 text-[10px] font-semibold text-white sm:bottom-5 sm:left-5 sm:px-4 sm:text-xs">
                SAVE {discountPercentage}%
              </span>
            )}
          </Link>

          {/* Product Details */}
          <div className="flex min-w-0 flex-col justify-center px-4 py-7 sm:px-7 sm:py-9 md:px-8 md:py-10 lg:px-10 lg:py-12 xl:px-14 xl:py-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 sm:text-xs sm:tracking-[0.25em]">
              REHCLUB EXCLUSIVE
            </span>

            <Link href={productDetailsHref}>
              <h3 className="mt-3 break-words text-xl font-bold leading-tight text-gray-900 transition hover:text-gray-600 sm:mt-4 sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl">
                {name}
              </h3>
            </Link>

            <p className="mt-3 max-w-md text-xs leading-6 text-gray-500 sm:mt-5 sm:text-sm sm:leading-7">
              {description ||
                "Discover effortless style and premium quality with our carefully selected collection."}
            </p>

            {/* Price */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-7">
              <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                ৳{Number(price || 0).toLocaleString("en-BD")}
              </span>

              {hasDiscount && (
                <>
                  <span className="text-sm text-gray-400 line-through sm:text-base">
                    ৳{Number(oldPrice).toLocaleString("en-BD")}
                  </span>

                  <span className="text-[10px] font-semibold text-red-600 sm:text-xs">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-4 flex items-center gap-2 sm:mt-5">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  soldOut ? "bg-red-500" : "bg-green-600"
                }`}
              />

              <span className="text-xs font-medium text-gray-500">
                {soldOut ? "Currently Unavailable" : "In Stock"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
              {/* Add To Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={soldOut}
                className="flex min-h-11 flex-1 items-center justify-center gap-2 bg-black px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition duration-300 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-[50px] sm:gap-3 sm:px-6 sm:text-xs sm:tracking-widest"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                aria-label="Toggle wishlist"
                aria-pressed={isWishlisted}
                className={`flex h-11 w-full items-center justify-center border transition duration-300 sm:h-[50px] sm:w-[60px] ${
                  isWishlisted
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-900 hover:border-black hover:bg-black hover:text-white"
                }`}
              >
                <Heart
                  size={19}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Explore Category */}
            <Link
              href={categoryHref}
              className="mt-5 inline-flex w-fit max-w-full items-center gap-2 border-b-2 border-black pb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-900 transition hover:border-black hover:text-gray-500 sm:mt-6 sm:text-xs sm:tracking-widest"
            >
              <span>Explore All Category Products</span>
              <ArrowRight size={14} className="shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
