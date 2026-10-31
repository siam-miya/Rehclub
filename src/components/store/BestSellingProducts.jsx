
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

const BestSellingProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sort products by total sold quantity
  const bestSellingProducts = useMemo(() => {
    return [...products]
      .filter((product) => Number(product.soldCount) > 0)
      .sort(
        (a, b) =>
          Number(b.soldCount) - Number(a.soldCount)
      );
  }, []);

  // Pagination
  const totalPages = Math.ceil(
    bestSellingProducts.length / PRODUCTS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = bestSellingProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: document.getElementById("best-selling-products")?.offsetTop - 100,
      behavior: "smooth",
    });
  };

  if (bestSellingProducts.length === 0) return null;

  return (
    <section
      id="best-selling-products"
      className="relative overflow-hidden bg-white py-9 sm:py-11 md:py-14 lg:py-16"
    >
      <div className="container min-w-0 px-3 sm:px-5 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-7 flex flex-col items-center text-center sm:mb-9 md:mb-10">
          <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-gray-900 sm:text-xl sm:tracking-[0.16em] md:text-2xl">
            Best Seller
          </h2>

          <div className="mt-2 h-[2px] w-12 bg-pink-500 sm:w-14" />

          <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-3 sm:text-sm">
            Best seller products this week!
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
            {/* Previous */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-800 transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-800 sm:h-10 sm:w-10"
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
                className={`flex h-9 min-w-9 items-center justify-center border px-2.5 text-xs font-medium transition-all duration-300 sm:h-10 sm:min-w-10 sm:px-3 sm:text-sm ${
                  currentPage === page
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-700 hover:border-black hover:text-black"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-800 transition-all duration-300 hover:border-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-800 sm:h-10 sm:w-10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* View All Products */}
        <div className="mt-9 flex justify-center sm:mt-11 md:mt-12">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-black px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-gray-800 sm:px-8 sm:py-3.5 sm:text-xs"
          >
            View All Products
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;
