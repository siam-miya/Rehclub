
"use client";

import React, { useMemo, useState } from "react";
import ProductCard from "@/components/store/ProductCard";
import FilterProduct from "@/components/store/FilterProduct";
import Filter2 from "@/components/store/Filter2";

const CategoryProductsClient = ({ products = [] }) => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("Featured");
  const [columns, setColumns] = useState(3);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const colorMatch =
        !filters.color || product.colors?.includes(filters.color);

      const sizeMatch =
        !filters.size || product.sizes?.includes(filters.size);

      const brandMatch =
        !filters.brands?.length ||
        filters.brands.includes(product.brand);

      return colorMatch && sizeMatch && brandMatch;
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

      // Best selling-এর জন্য প্রকৃত sales data প্রয়োজন।
      // তাই এখানে stock-কে sales হিসেবে ব্যবহার করা হচ্ছে না।
      default:
        break;
    }

    return result;
  }, [products, filters, sort]);

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div>
      {/* Mobile Filter Toggle */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          {filteredProducts.length} products
        </p>

        <button
          type="button"
          onClick={() => setShowFilters((previous) => !previous)}
          aria-expanded={showFilters}
          className="border border-gray-200 px-4 py-2 text-sm transition-colors hover:border-black lg:hidden"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filters + Products */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <FilterProduct
            filters={filters}
            onFilterChange={setFilters}
          />
        </aside>

        <div className="min-w-0">
          <div className="mb-6">
            <Filter2
              onSortChange={setSort}
              onGridChange={setColumns}
            />
          </div>

          {filteredProducts.length > 0 ? (
            <div
              className="grid gap-x-4 gap-y-8 sm:gap-x-5"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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
                className="mt-5 border border-black px-5 py-2 text-sm transition-colors hover:bg-black hover:text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsClient;
