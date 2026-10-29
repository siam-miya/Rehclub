
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import ProductCard from "@/components/store/ProductCard";
import FilterProduct from "@/components/store/FilterProduct";
import Filter2 from "@/components/store/Filter2";
import PageHero from "@/components/shared/PageHero";

import { products } from "@/data/storeData";

const PRODUCTS_PER_PAGE = 9;

const ProductsPage = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("Featured");
  const [columns, setColumns] = useState(3);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const productCategoryPath = (product.categoryPath || []).join("/");

      const categoryMatch =
        !filters.categoryPath ||
        productCategoryPath === filters.categoryPath ||
        productCategoryPath.startsWith(`${filters.categoryPath}/`);

      const colorMatch =
        !filters.color || product.colors?.includes(filters.color);

      const sizeMatch =
        !filters.size || product.sizes?.includes(filters.size);

      const brandMatch =
        !filters.brands?.length ||
        filters.brands.includes(product.brand);

      return categoryMatch && colorMatch && sizeMatch && brandMatch;
    });

    result = [...result];

    switch (sort) {
      case "Alphabetically, A-Z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "Alphabetically, Z-A":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "Price, low to high":
        result.sort((a, b) => a.price - b.price);
        break;

      case "Price, high to low":
        result.sort((a, b) => b.price - a.price);
        break;

      case "Date, old to new":
        result.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;

      case "Date, new to old":
        result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;

      default:
        break;
    }

    return result;
  }, [filters, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const clearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Page Banner */}
      <PageHero
        eyebrow="Discover Your Style"
        title="All Products"
        subtitle="Explore our latest clothing and accessories collection."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
        position="center"
      />

      <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Product Count and Mobile Filter Button */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            {filteredProducts.length > 0 ? (
              <>
                Showing{" "}
                <span className="font-medium text-gray-900">
                  {startIndex + 1}–
                  {Math.min(
                    startIndex + PRODUCTS_PER_PAGE,
                    filteredProducts.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                products
              </>
            ) : (
              "0 products"
            )}
          </p>

          <button
            type="button"
            onClick={() => setShowFilters((previous) => !previous)}
            aria-expanded={showFilters}
            className="cursor-pointer border border-gray-200 px-4 py-2 text-sm transition-colors hover:border-black lg:hidden"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <FilterProduct
              filters={filters}
              onFilterChange={setFilters}
            />
          </aside>

          {/* Products */}
          <div className="min-w-0">
            <div className="mb-6">
              <Filter2
                onSortChange={setSort}
                onGridChange={setColumns}
              />
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                {/* Product Grid */}
                <div
                  className="grid gap-x-4 gap-y-8 sm:gap-x-5"
                  style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  }}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav
                    className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-gray-100 pt-8"
                    aria-label="Product pagination"
                  >
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="cursor-pointer border border-gray-200 px-3 py-2 text-sm transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      Previous
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => goToPage(page)}
                        aria-current={
                          currentPage === page ? "page" : undefined
                        }
                        className={`h-10 min-w-10 cursor-pointer border px-3 text-sm transition-colors ${
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
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="cursor-pointer border border-gray-200 px-3 py-2 text-sm transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </nav>
                )}

                {/* Page Information */}
                {totalPages > 1 && (
                  <p className="mt-4 text-center text-xs text-gray-400">
                    Page {currentPage} of {totalPages}
                  </p>
                )}
              </>
            ) : (
              <div className="py-20 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing or clearing your filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 cursor-pointer border border-black px-5 py-2 text-sm transition-colors hover:bg-black hover:text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
