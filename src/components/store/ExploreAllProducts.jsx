
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { products } from "@/data/storeData";
import ProductCard from "@/components/store/ProductCard";

const PRODUCTS_PER_PAGE = 8;

const ExploreAllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const allProducts = useMemo(() => [...products], []);

  const totalPages = Math.ceil(
    allProducts.length / PRODUCTS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = allProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top:
        (document.getElementById("explore-all-products")?.offsetTop || 0) -
        100,
      behavior: "smooth",
    });
  };

  if (allProducts.length === 0) return null;

  return (
    <section
      id="explore-all-products"
      className="relative overflow-hidden bg-white py-9 sm:py-11 md:py-14 lg:py-16 xl:py-20"
    >
      <div className="container min-w-0 px-3 sm:px-5 md:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-7 flex flex-col items-center text-center sm:mb-9 md:mb-10 lg:mb-12">
          <div className="flex max-w-full items-center justify-center gap-2.5 sm:gap-4">
            <span className="h-[2px] w-6 shrink-0 bg-pink-500 sm:w-10 md:w-16" />

            <h2 className="text-center text-base font-bold uppercase tracking-[0.1em] text-gray-900 sm:text-xl sm:tracking-[0.16em] md:text-2xl">
              Explore All Products
            </h2>

            <span className="h-[2px] w-6 shrink-0 bg-pink-500 sm:w-10 md:w-16" />
          </div>

          <p className="mt-2 max-w-md px-3 text-xs leading-5 text-gray-500 sm:mt-3 sm:text-sm">
            Browse through our complete collection and find your favorite
            style today.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 md:gap-x-6 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-10">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id ?? product.slug}
              product={product}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-9 flex flex-wrap items-center justify-center gap-1.5 sm:mt-12 sm:gap-2">
            {/* Previous Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-200 text-gray-800 transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-800 sm:h-10 sm:w-10"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                aria-label={`Go to page ${page}`}
                aria-current={
                  currentPage === page ? "page" : undefined
                }
                className={`flex h-9 min-w-9 shrink-0 items-center justify-center border px-2.5 text-xs font-medium transition-all duration-300 sm:h-10 sm:min-w-10 sm:px-3 sm:text-sm ${
                  currentPage === page
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-700 hover:border-black hover:text-black"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-200 text-gray-800 transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-800 sm:h-10 sm:w-10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* View All Products Button */}
        <div className="mt-9 flex justify-center sm:mt-11 md:mt-12">
          <Link
            href="/products"
            className="group inline-flex items-center justify-center gap-2 rounded-tr-2xl rounded-bl-2xl border border-black bg-black px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-white hover:text-black sm:gap-3 sm:rounded-tr-3xl sm:rounded-bl-3xl sm:px-8 sm:py-4 sm:text-xs sm:tracking-[0.2em]"
          >
            View All Products

            <ArrowRight
              size={15}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreAllProducts;
