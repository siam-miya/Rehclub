
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
    <article className={`group/product min-w-0 bg-white ${className}`}>
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100">
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
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover/product:scale-105"
          />
        </Link>

        {/* Product Status */}
        {soldOut ? (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-800">
            Sold Out
          </span>
        ) : hasDiscount ? (
          <span className="absolute left-3 top-3 bg-black px-2 py-1 text-[10px] font-semibold text-white">
            {discountPercentage}% OFF
          </span>
        ) : null}

        {/* Product Actions */}
       <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 sm:translate-y-3 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover/product:translate-y-0 sm:group-hover/product:opacity-100">
          <button
            type="button"
            disabled={soldOut}
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
            title="Add to cart"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-md transition hover:bg-black hover:text-white disabled:opacity-50"
          >
            <ShoppingCart size={17} />
          </button>

          <button
            type="button"
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
            aria-pressed={isWishlisted}
            title="Wishlist"
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md transition ${
              isWishlisted
                ? "bg-black text-white"
                : "bg-white text-gray-900 hover:bg-black hover:text-white"
            }`}
          >
            <Heart
              size={17}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </button>
        </div>

        {isWishlisted && (
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white sm:hidden">
            <Heart size={14} fill="currentColor" />
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="pt-3">
        <Link href={href}>
          <h3 className="line-clamp-2 text-sm font-medium text-gray-800 transition hover:text-gray-500">
            {name}
          </h3>
        </Link>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            ৳{Number(price || 0).toLocaleString("en-BD")}
          </span>

          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              ৳{Number(oldPrice).toLocaleString("en-BD")}
            </span>
          )}
        </div>

        {soldOut && (
          <p className="mt-1 text-xs text-red-600">
            Currently unavailable
          </p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
