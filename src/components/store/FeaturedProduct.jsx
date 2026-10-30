
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
    <section className="bg-[#f7f6f2] py-14 md:py-20 lg:py-24">
      <div className="container px-4 sm:px-6 lg:px-10">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-gray-900 sm:text-2xl">
            FEATURED PRODUCT
          </h2>

          <div className="mt-2 h-[2px] w-12 bg-[#e91e63]" />

          <p className="mt-3 text-sm font-medium text-gray-500">
            Handpicked & Special Pick From Our Collection!
          </p>
        </div>

        {/* Featured Product Card */}
        <div className="group grid overflow-hidden bg-white md:grid-cols-2">

          {/* Product Image */}
          <Link
            href={productDetailsHref}
            aria-label={`View ${name}`}
            className="relative block aspect-[4/4.5] overflow-hidden bg-gray-100 md:aspect-auto md:min-h-[520px]"
          >
            <Image
              src={image || "/logo.png"}
              alt={name || "Featured Product"}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Featured Badge */}
            <span className="absolute left-5 top-5 flex items-center gap-2 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-black shadow-sm">
              <Sparkles size={13} />
              Featured
            </span>

            {/* Discount Badge */}
            {hasDiscount && (
              <span className="absolute bottom-5 left-5 bg-black px-4 py-2 text-xs font-semibold text-white">
                SAVE {discountPercentage}%
              </span>
            )}
          </Link>

          {/* Product Details */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 md:px-12 lg:px-16">

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              REHCLUB EXCLUSIVE
            </span>

            <Link href={productDetailsHref}>
              <h3 className="mt-4 text-2xl font-bold leading-tight text-gray-900 transition hover:text-gray-600 sm:text-3xl lg:text-4xl">
                {name}
              </h3>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-500">
              {description ||
                "Discover effortless style and premium quality with our carefully selected collection."}
            </p>

            {/* Price */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">
                ৳{Number(price || 0).toLocaleString("en-BD")}
              </span>

              {hasDiscount && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ৳{Number(oldPrice).toLocaleString("en-BD")}
                  </span>

                  <span className="text-xs font-semibold text-red-600">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mt-5 flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  soldOut ? "bg-red-500" : "bg-green-600"
                }`}
              />

              <span className="text-xs font-medium text-gray-500">
                {soldOut
                  ? "Currently Unavailable"
                  : "In Stock"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              {/* Add To Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={soldOut}
                className="flex flex-1 items-center justify-center gap-3 bg-black px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ShoppingCart size={17} />
                Add to Cart
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                aria-label="Toggle wishlist"
                aria-pressed={isWishlisted}
                className={`flex h-[50px] w-full items-center justify-center gap-2 border px-5 transition sm:w-[60px] ${
                  isWishlisted
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-900 hover:border-black"
                }`}
              >
                <Heart
                  size={19}
                  fill={
                    isWishlisted ? "currentColor" : "none"
                  }
                />
              </button>
            </div>

            {/* Explore Category */}
            <Link
              href={categoryHref}
              className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-black pb-1 text-xs font-bold uppercase tracking-widest text-gray-900 transition hover:border-[#e91e63] hover:text-[#e91e63]"
            >
              Explore All Category Products
              <ArrowRight size={15} />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
