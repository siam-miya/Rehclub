"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { products } from "@/data/storeData";
import ProductCard from "../../components/store/ProductCard";

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
  };

  if (bestSellingProducts.length === 0) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-10">

        {/* Section Heading matching the image */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-gray-900 sm:text-2xl">
            BEST SELLER
          </h2>
          
          {/* Accent Line */}
          <div className="mt-2 h-[2px] w-12 bg-pink-500" />

          <p className="mt-3 text-sm font-medium text-gray-500">
            Best Seller Product This Week!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id ?? product.slug}
              product={product}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">

            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex h-10 w-10 items-center justify-center border border-gray-200 text-gray-800 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-800"
            >
              <ChevronLeft size={18} />
            </button>

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
                className={`flex h-10 min-w-10 items-center justify-center border px-3 text-sm font-medium transition ${
                  currentPage === page
                    ? "border-black bg-black text-white"
                    : "border-gray-200 text-gray-700 hover:border-black"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex h-10 w-10 items-center justify-center border border-gray-200 text-gray-800 transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-gray-800"
            >
              <ChevronRight size={18} />
            </button>

          </div>
        )}

      </div>
    </section>
  );
};

export default BestSellingProducts;