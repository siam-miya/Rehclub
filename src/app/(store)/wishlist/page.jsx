
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Heart,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";

import { useStore } from "@/stores/useStore";
import { products } from "@/data/storeData";

const formatPrice = (amount) =>
  `৳${Number(amount || 0).toLocaleString("en-BD")}`;

const normalizeId = (id) => (id == null ? "" : String(id));

const Wishlist = () => {
  const wishlist = useStore((state) => state.wishlist);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromWishlist = useStore(
    (state) => state.removeFromWishlist
  );
  const clearWishlist = useStore((state) => state.clearWishlist);

  const getOriginalProduct = (wishlistProduct) =>
    products.find(
      (item) =>
        (wishlistProduct.slug &&
          item.slug === wishlistProduct.slug) ||
        (wishlistProduct.id != null &&
          normalizeId(item.id) === normalizeId(wishlistProduct.id))
    );

  const getProductHref = (wishlistProduct) => {
    const originalProduct = getOriginalProduct(wishlistProduct);
    const slug = wishlistProduct.slug || originalProduct?.slug;

    if (!slug) return "/products";

    const categoryPath =
      Array.isArray(wishlistProduct.categoryPath) &&
      wishlistProduct.categoryPath.length > 0
        ? wishlistProduct.categoryPath
        : originalProduct?.categoryPath || [];

    return `/products/categories/${[
      ...categoryPath,
      slug,
    ].join("/")}`;
  };

  const handleAddSingleToCart = (product) => {
    const originalProduct = getOriginalProduct(product);

    const productToAdd = originalProduct
      ? {
          ...originalProduct,
          id: originalProduct.id ?? originalProduct.slug,
        }
      : product;

    addToCart(productToAdd, 1);
  };

  const handleAddAllToCart = () => {
    if (wishlist.length === 0) return;

    wishlist.forEach((product) => {
      const originalProduct = getOriginalProduct(product);

      const productToAdd = originalProduct
        ? {
            ...originalProduct,
            id: originalProduct.id ?? originalProduct.slug,
          }
        : product;

      addToCart(productToAdd, 1);
    });

    clearWishlist();
  };

  return (
    <main className="min-h-screen bg-white py-8 sm:py-12 lg:py-16">
      <div className="container w-full px-4 sm:px-6 lg:px-10">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-[11px] tracking-wide text-gray-400 sm:mb-10 sm:text-xs">
          <Link
            href="/"
            className="cursor-pointer transition hover:text-black"
          >
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-black">Wishlist</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 border-b border-gray-200 pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:pb-9">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-7 bg-black" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Your Collection
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
              My Wishlist<span className="text-gray-300">.</span>
            </h1>

            <p className="mt-3 max-w-md text-xs leading-6 text-gray-500 sm:text-sm">
              The pieces you love, all in one place. Keep your favorites
              close and shop whenever you're ready.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              type="button"
              onClick={handleAddAllToCart}
              className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 bg-black px-6 text-xs font-semibold text-white transition duration-300 hover:bg-gray-800 sm:w-auto sm:text-sm"
            >
              <ShoppingCart size={16} />
              Move All to Bag
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <section className="flex min-h-[350px] flex-col items-center justify-center border border-gray-200 bg-gray-50/50 px-5 py-16 text-center sm:min-h-[430px]">
            <div className="relative flex h-20 w-20 items-center justify-center border border-gray-200 bg-white">
              <Heart size={30} strokeWidth={1.2} />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-black" />
            </div>

            <span className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              Nothing saved yet
            </span>

            <h2 className="mt-2 text-xl font-bold tracking-tight text-black sm:text-2xl">
              Your wishlist is empty
            </h2>

            <p className="mt-3 max-w-sm text-xs leading-6 text-gray-500 sm:text-sm">
              Found something you love? Tap the heart icon on any product
              to save it here.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex h-12 cursor-pointer items-center justify-center gap-3 bg-black px-7 text-xs font-semibold text-white transition hover:bg-gray-800 sm:text-sm"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          <>
            {/* Wishlist Information */}
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Heart size={15} className="text-black" />
                <p className="text-xs font-medium text-gray-700 sm:text-sm">
                  Saved Items
                  <span className="ml-2 text-gray-400">
                    ({wishlist.length})
                  </span>
                </p>
              </div>

              <span className="text-[10px] uppercase tracking-wider text-gray-400 sm:text-xs">
                Your Favorites
              </span>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4 lg:gap-x-6">

              {wishlist.map((product) => {
                const productHref = getProductHref(product);
                const productKey =
                  product.id ?? product.slug ?? product.name;

                return (
                  <article
                    key={productKey}
                    className="group min-w-0"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <Link
                        href={productHref}
                        aria-label={`View ${product.name} details`}
                        className="block h-full w-full cursor-pointer"
                      >
                        <Image
                          src={product.image || "/logo.png"}
                          alt={product.name || "Product"}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                      </Link>

                      {/* Wishlist Label */}
                      <span className="absolute left-2 top-2 bg-white/95 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-black sm:left-3 sm:top-3 sm:text-[9px]">
                        Saved
                      </span>

                      {/* Remove Button */}
                      <button
                        type="button"
                        aria-label={`Remove ${product.name} from wishlist`}
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center bg-white text-black transition hover:bg-black hover:text-white sm:right-3 sm:top-3 sm:h-9 sm:w-9"
                      >
                        <Trash2 size={14} strokeWidth={1.7} />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="pt-3 sm:pt-4">
                      <Link
                        href={productHref}
                        className="block cursor-pointer"
                      >
                        <h2 className="line-clamp-2 min-h-9 text-xs font-semibold leading-5 text-gray-900 transition group-hover:text-gray-500 sm:min-h-10 sm:text-sm">
                          {product.name}
                        </h2>

                        <p className="mt-1.5 text-sm font-bold tracking-tight text-black sm:text-base">
                          {formatPrice(product.price)}
                        </p>
                      </Link>

                      {/* Add to Cart */}
                      <button
                        type="button"
                        onClick={() => handleAddSingleToCart(product)}
                        className="mt-3 flex h-10 w-full cursor-pointer items-center justify-center gap-2 border border-black bg-white text-[10px] font-semibold uppercase tracking-wider text-black transition duration-300 hover:bg-black hover:text-white sm:mt-4 sm:h-11 sm:text-xs"
                      >
                        <ShoppingBag size={15} />
                        Add to Bag
                      </button>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="mx-auto mt-3 flex cursor-pointer items-center justify-center gap-1.5 text-[10px] text-gray-400 transition hover:text-black sm:text-xs"
                      >
                        <Trash2 size={12} />
                        Remove from Wishlist
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Bottom Section */}
            <div className="mt-12 border-t border-gray-200 pt-7 text-center sm:mt-16 sm:pt-9">
              <p className="text-xs text-gray-500 sm:text-sm">
                Still looking for something special?
              </p>

              <Link
                href="/products"
                className="mt-4 inline-flex cursor-pointer items-center gap-2 border-b border-black pb-1 text-xs font-semibold uppercase tracking-wider text-black transition hover:gap-3 sm:text-sm"
              >
                Continue Shopping
                <ArrowRight size={15} />
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
