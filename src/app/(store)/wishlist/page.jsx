
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

  // Find the original product and build its exact single-product URL.
  const getProductHref = (wishlistProduct) => {
    const originalProduct = products.find(
      (item) =>
        (wishlistProduct.slug &&
          item.slug === wishlistProduct.slug) ||
        (wishlistProduct.id != null &&
          normalizeId(item.id) === normalizeId(wishlistProduct.id))
    );

    const slug = wishlistProduct.slug || originalProduct?.slug;

    if (!slug) {
      return "/products";
    }

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

  // Move all saved products to cart.
  const handleAddAllToCart = () => {
    if (wishlist.length === 0) return;

    wishlist.forEach((product) => {
      const originalProduct = products.find(
        (item) =>
          (product.slug && item.slug === product.slug) ||
          (product.id != null &&
            normalizeId(item.id) === normalizeId(product.id))
      );

      // Use original product data when available.
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

  // Add one product to cart.
  const handleAddSingleToCart = (product) => {
    const originalProduct = products.find(
      (item) =>
        (product.slug && item.slug === product.slug) ||
        (product.id != null &&
          normalizeId(item.id) === normalizeId(product.id))
    );

    const productToAdd = originalProduct
      ? {
          ...originalProduct,
          id: originalProduct.id ?? originalProduct.slug,
        }
      : product;

    addToCart(productToAdd, 1);
  };

  return (
    <main className="min-h-screen bg-gray-50/70 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <Link
              href="/"
              className="cursor-pointer transition hover:text-black"
            >
              Home
            </Link>

            <span>/</span>
            <span className="text-gray-900">Wishlist</span>
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
                My Wishlist
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Save your favorite products and shop them whenever you like.
              </p>
            </div>

            {wishlist.length > 0 && (
              <button
                type="button"
                onClick={handleAddAllToCart}
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 self-start rounded-lg bg-black px-5 text-sm font-semibold text-white transition hover:bg-gray-800 sm:self-auto"
              >
                <ShoppingCart size={18} />
                Move All to Bag
              </button>
            )}
          </div>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <section className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center sm:py-24">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <Heart size={34} strokeWidth={1.5} />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-gray-950">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Save products you love by clicking the heart icon on a product.
              You can come back to them anytime.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-black px-6 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Explore Products
              <ArrowRight size={17} />
            </Link>
          </section>
        ) : (
          <>
            {/* Wishlist Header */}
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-950">
                  {wishlist.length}
                </span>{" "}
                saved {wishlist.length === 1 ? "product" : "products"}
              </p>

              <span className="text-xs text-gray-500">
                Your saved collection
              </span>
            </div>

            {/* Wishlist Products */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {wishlist.map((product) => {
                const productHref = getProductHref(product);

                return (
                  <article
                    key={product.id}
                    className="group relative min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
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
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Remove from Wishlist */}
                      <button
                        type="button"
                        aria-label={`Remove ${product.name} from wishlist`}
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-sm transition hover:bg-black hover:text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="p-3.5 sm:p-4">
                      <Link
                        href={productHref}
                        className="block cursor-pointer"
                      >
                        <h2 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-gray-900 transition hover:text-gray-500">
                          {product.name}
                        </h2>

                        <p className="mt-2 text-base font-semibold text-gray-950">
                          {formatPrice(product.price)}
                        </p>
                      </Link>

                      {/* Add to Cart */}
                      <button
                        type="button"
                        onClick={() => handleAddSingleToCart(product)}
                        className="mt-4 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 text-xs font-semibold text-gray-900 transition hover:border-black hover:bg-black hover:text-white sm:text-sm"
                      >
                        <ShoppingBag size={16} />
                        Add to Cart
                      </button>

                      {/* Remove Product */}
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 text-xs text-gray-500 transition hover:text-red-600"
                      >
                        <Trash2 size={13} />
                        Remove from Wishlist
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/products"
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 text-sm font-medium text-gray-800 transition hover:border-black hover:text-black"
              >
                <ArrowRight size={16} />
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
