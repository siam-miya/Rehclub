
"use client";

import React, { useEffect, useMemo, useState } from "react";

import ProductCard from "@/components/store/ProductCard";
import FilterProduct from "@/components/store/FilterProduct";
import Filter2 from "@/components/store/Filter2";

const PRODUCTS_PER_PAGE = 9;

const CategoryProductsClient = ({ products = [] }) => {
  const [filters, setFilters] = useState({});
  const [filterResetKey, setFilterResetKey] = useState(0);
  const [sort, setSort] = useState("Featured");
  const [columns, setColumns] = useState(3);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile filter drawer scroll lock + Escape key
  useEffect(() => {
    if (!showFilters) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowFilters(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showFilters]);

  // Filter and sort category products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const colorMatch =
        !filters.color ||
        product.colors?.includes(filters.color);

      const sizeMatch =
        !filters.size ||
        product.sizes?.includes(filters.size);

      const brandMatch =
        !filters.brands?.length ||
        filters.brands.includes(product.brand);

      return colorMatch && sizeMatch && brandMatch;
    });

    result = [...result];

    switch (sort) {
      case "Best selling":
        result.sort(
          (a, b) =>
            Number(b.soldCount || 0) -
            Number(a.soldCount || 0)
        );
        break;

      case "Alphabetically, A-Z":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "Alphabetically, Z-A":
        result.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      case "Price, low to high":
        result.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        break;

      case "Price, high to low":
        result.sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
        break;

      case "Date, old to new":
        result.sort(
          (a, b) =>
            new Date(a.createdAt || 0) -
            new Date(b.createdAt || 0)
        );
        break;

      case "Date, new to old":
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );
        break;

      default:
        break;
    }

    return result;
  }, [products, filters, sort]);

  // Check whether all filters are empty
  const areFiltersEmpty = (value = {}) => {
    return (
      !value.color &&
      !value.size &&
      (!value.brands || value.brands.length === 0)
    );
  };

  // Filter changes
  const handleFilterChange = (newFilters) => {
    const updatedFilters = newFilters || {};

    setFilters(updatedFilters);
    setCurrentPage(1);

    if (areFiltersEmpty(updatedFilters)) {
      setFilterResetKey((previous) => previous + 1);
    }
  };

  // Sort changes
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setCurrentPage(1);
  };

  // Grid changes
  const handleGridChange = (newColumns) => {
    const value = Number(newColumns);

    if (value >= 1 && value <= 6) {
      setColumns(value);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setFilterResetKey((previous) => previous + 1);
    setCurrentPage(1);
    setShowFilters(false);
  };

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const safePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex =
    (safePage - 1) * PRODUCTS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    document
      .getElementById("category-products-list")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <>
      {/* Product Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-gray-500 sm:text-sm">
          {filteredProducts.length > 0 ? (
            <>
              Showing{" "}
              <span className="font-semibold text-black">
                {startIndex + 1}–
                {Math.min(
                  startIndex + PRODUCTS_PER_PAGE,
                  filteredProducts.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-black">
                {filteredProducts.length}
              </span>{" "}
              products
            </>
          ) : (
            "0 products"
          )}
        </p>
      </div>

      {/* Mobile Filter Backdrop */}
      <button
        type="button"
        aria-label="Close filters"
        tabIndex={showFilters ? 0 : -1}
        onClick={() => setShowFilters(false)}
        className={`fixed inset-0 z-[55] cursor-pointer bg-black/50 transition-opacity duration-300 lg:hidden ${
          showFilters
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* Main Layout */}
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-10">

        {/* Filter Sidebar / Mobile Drawer */}
        <aside
          id="category-filter-sidebar"
          aria-label="Product filters"
          className={`fixed inset-y-0 left-0 z-[60] w-[min(88vw,340px)] overflow-y-auto overscroll-contain bg-white p-4 shadow-2xl transition-transform duration-300 ease-in-out sm:p-5 lg:sticky lg:top-24 lg:z-auto lg:h-fit lg:w-auto lg:translate-x-0 lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none ${
            showFilters ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4 lg:hidden">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-black">
              Filters
            </h2>

            <button
              type="button"
              onClick={() => setShowFilters(false)}
              aria-label="Close filter panel"
              className="flex h-9 w-9 cursor-pointer items-center justify-center border border-gray-200 text-gray-700 transition hover:border-black hover:text-black"
            >
              <span className="text-xl leading-none">
                &times;
              </span>
            </button>
          </div>

          <FilterProduct
            key={filterResetKey}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Clear Filters */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={clearFilters}
              className="w-full cursor-pointer border border-black px-4 py-3 text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-black hover:text-white"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Product Content */}
        <div
          id="category-products-list"
          className="min-w-0 scroll-mt-24"
        >
          {/* Toolbar */}
          <div className="mb-5 min-w-0 sm:mb-6">
            <Filter2
              onFilterClick={() => setShowFilters(true)}
              onSortChange={handleSortChange}
              onGridChange={handleGridChange}
              columns={columns}
              showFilterButton={true}
            />
          </div>

          {/* Product Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <div
                className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-[repeat(var(--product-columns),minmax(0,1fr))] lg:gap-x-6 xl:gap-x-7"
                style={{
                  "--product-columns": columns,
                }}
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id ?? product.slug}
                    product={product}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  className="mt-10 flex flex-wrap items-center justify-center gap-1.5 border-t border-gray-100 pt-7 sm:mt-12 sm:gap-2 sm:pt-8"
                  aria-label="Category product pagination"
                >
                  <button
                    type="button"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    className="min-h-9 cursor-pointer border border-gray-200 px-2.5 text-xs transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
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
                        safePage === page ? "page" : undefined
                      }
                      className={`h-9 min-w-9 cursor-pointer border px-2 text-xs transition-colors sm:h-10 sm:min-w-10 sm:px-3 sm:text-sm ${
                        safePage === page
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-700 hover:border-black"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    className="min-h-9 cursor-pointer border border-gray-200 px-2.5 text-xs transition-colors hover:border-black disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
                  >
                    Next
                  </button>
                </nav>
              )}

              {totalPages > 1 && (
                <p className="mt-4 text-center text-[11px] text-gray-400 sm:text-xs">
                  Page {safePage} of {totalPages}
                </p>
              )}
            </>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[400px]">
              <h2 className="text-base font-semibold text-black sm:text-lg">
                No products found
              </h2>

              <p className="mt-2 max-w-xs text-xs leading-6 text-gray-500 sm:text-sm">
                We couldn't find products matching your selected
                filters. Try changing or clearing your filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 cursor-pointer border border-black px-5 py-2.5 text-xs font-medium text-black transition-colors hover:bg-black hover:text-white sm:text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryProductsClient;
