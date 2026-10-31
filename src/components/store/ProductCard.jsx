
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  ShoppingCart,
} from "lucide-react";

import { useStore } from "@/stores/useStore";

const ProductCard = ({ product, className = "" }) => {
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  if (!product) return null;

  const {
    id,
    name,
    slug,
    price,
    oldPrice,
    image,
    categoryPath = [],
    stock = 0,
  } = product;

  const productId = id ?? slug;

  const normalizedProduct = {
    ...product,
    id: productId,
    image: image || "/logo.png",
  };

  const href = `/products/categories/${[
    ...categoryPath,
    slug,
  ].join("/")}`;

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

  const handleAddToCart = () => {
    if (soldOut) return;
    addToCart(normalizedProduct, 1);
  };

  const handleWishlist = () => {
    toggleWishlist(normalizedProduct);
  };

  return (
    <article
      className={`group/product min-w-0 bg-white ${className}`}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-gray-100">

        <Link
          href={href}
          aria-label={`View ${name}`}
          className="absolute inset-0"
        >
          <Image
            src={image || "/logo.png"}
            alt={name || "Product"}
            fill
            unoptimized
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover/product:scale-105"
          />
        </Link>

        {/* Product Status */}
        {soldOut ? (
          <span className="absolute left-1.5 top-1.5 z-10 bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-gray-800 sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[10px]">
            Sold Out
          </span>
        ) : hasDiscount ? (
          <span className="absolute left-1.5 top-1.5 z-10 bg-black px-2 py-1 text-[9px] font-semibold text-white sm:left-3 sm:top-3 sm:px-2.5 sm:py-1.5 sm:text-[10px]">
            {discountPercentage}% OFF
          </span>
        ) : null}

        {/* Product Actions */}
        <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center gap-2 px-2 sm:bottom-3 sm:gap-3 sm:translate-y-3 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover/product:translate-y-0 sm:group-hover/product:opacity-100">

         {/* Add to Cart */}
<button
  type="button"
  disabled={soldOut}
  onClick={handleAddToCart}
  aria-label={`Add ${name} to cart`}
  title="Add to cart"
  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition-colors duration-200 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
>
  <ShoppingCart size={14} className="sm:h-[17px] sm:w-[17px]" />
</button>

{/* Wishlist */}
<button
  type="button"
  onClick={handleWishlist}
  aria-label="Toggle wishlist"
  aria-pressed={isWishlisted}
  title="Wishlist"
  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-md transition-colors duration-200 sm:h-10 sm:w-10 ${
    isWishlisted
      ? "bg-black text-white"
      : "bg-white text-gray-900 hover:bg-black hover:text-white"
  }`}
>
  <Heart
    size={14}
    className="sm:h-[17px] sm:w-[17px]"
    fill={isWishlisted ? "currentColor" : "none"}
  />
</button>
        </div>

        {/* Mobile Wishlist Indicator */}
        {isWishlisted && (
          <span className="absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black text-white sm:hidden">
            <Heart size={12} fill="currentColor" />
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="min-w-0 pt-2.5 sm:pt-3">

        {/* Product Name */}
        <Link href={href}>
          <h3 className="line-clamp-2 min-h-[36px] text-[12px] font-medium leading-[18px] text-gray-800 transition-colors duration-200 hover:text-gray-500 sm:min-h-[42px] sm:text-sm sm:leading-5 md:text-[15px]">
            {name}
          </h3>
        </Link>

        {/* Product Price */}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mt-2">
          <span className="text-[13px] font-bold text-gray-900 sm:text-sm md:text-base">
            ৳{Number(price || 0).toLocaleString("en-BD")}
          </span>

          {hasDiscount && (
            <span className="text-[10px] text-gray-400 line-through sm:text-xs">
              ৳{Number(oldPrice).toLocaleString("en-BD")}
            </span>
          )}
        </div>

        {/* Sold Out Message */}
        {soldOut && (
          <p className="mt-1 text-[10px] font-medium text-red-600 sm:text-xs">
            Currently unavailable
          </p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
