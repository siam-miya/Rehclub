
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { categories } from "@/data/storeData";

const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Blue", value: "#2563eb" },
  { name: "Green", value: "#16a34a" },
  { name: "Red", value: "#dc2626" },
  { name: "Brown", value: "#92400e" },
];

const sizes = ["S", "M", "L", "XL", "XXL", "One Size"];

const brands = [
  "EcoSphere",
  "HorizonEdge",
  "LuxeVibe",
  "NovaCrest",
  "TrueHaven",
  "VertexCore",
];

const FilterProduct = ({
  filters = {},
  onFilterChange = () => {},
}) => {
  const pathname = usePathname();

  const [expandedCategories, setExpandedCategories] = useState([]);

  // Current URL অনুযায়ী parent categories automatically open হবে
  useEffect(() => {
    const prefix = "/products/categories/";

    if (!pathname?.startsWith(prefix)) {
      setExpandedCategories([]);
      return;
    }

    const path = pathname
      .slice(prefix.length)
      .split("/")
      .filter(Boolean);

    const expandedPaths = path.map((_, index) =>
      path.slice(0, index + 1).join("/")
    );

    setExpandedCategories(expandedPaths);
  }, [pathname]);

  const toggleCategory = (path) => {
    setExpandedCategories((previous) =>
      previous.includes(path)
        ? previous.filter(
            (item) => item !== path && !item.startsWith(`${path}/`)
          )
        : [...previous, path]
    );
  };

  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const renderCategories = (items, parentPath = []) =>
    items.map((category) => {
      const path = [...parentPath, category.slug];
      const pathString = path.join("/");
      const href = `/products/categories/${pathString}`;
      const hasChildren = Boolean(category.children?.length);
      const isExpanded = expandedCategories.includes(pathString);
      const isSelected =
        pathname === href || filters.categoryPath === pathString;

      return (
        <div key={pathString} className="min-w-0">
          <div
            className={`flex items-center gap-1 rounded-md transition-colors duration-200 ${
              isSelected ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <Link
              href={href}
              onClick={() => updateFilter("categoryPath", pathString)}
              aria-current={pathname === href ? "page" : undefined}
              className={`min-w-0 flex-1 px-3 py-2.5 text-sm transition-colors ${
                isSelected
                  ? "font-semibold text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {category.name}
            </Link>

            {hasChildren && (
              <button
                type="button"
                aria-label={`Toggle ${category.name} subcategories`}
                aria-expanded={isExpanded}
                onClick={() => toggleCategory(pathString)}
                className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-white hover:text-black"
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ease-in-out ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </div>

          {hasChildren && (
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                isExpanded
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="ml-3 border-l border-gray-200 py-1 pl-2">
                  {renderCategories(category.children, path)}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });

  return (
    <aside className="w-full space-y-8 bg-white p-4 text-gray-800">
      <section>
        <h3 className="mb-4 border-b border-gray-200 pb-3 text-xs font-bold tracking-[0.15em]">
          CATEGORIES
        </h3>

        <div className="space-y-1">{renderCategories(categories)}</div>
      </section>

      <section>
        <h3 className="mb-4 border-b border-gray-200 pb-3 text-xs font-bold tracking-[0.15em]">
          COLOR
        </h3>

        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              type="button"
              title={color.name}
              aria-label={color.name}
              aria-pressed={filters.color === color.name}
              onClick={() =>
                updateFilter(
                  "color",
                  filters.color === color.name ? "" : color.name
                )
              }
              className={`h-7 w-7 rounded-full border border-gray-200 transition-transform hover:scale-110 ${
                filters.color === color.name
                  ? "ring-2 ring-black ring-offset-2"
                  : ""
              }`}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-4 border-b border-gray-200 pb-3 text-xs font-bold tracking-[0.15em]">
          SIZE
        </h3>

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              aria-pressed={filters.size === size}
              onClick={() =>
                updateFilter(
                  "size",
                  filters.size === size ? "" : size
                )
              }
              className={`rounded-sm border px-3 py-2 text-xs transition-colors ${
                filters.size === size
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-4 border-b border-gray-200 pb-3 text-xs font-bold tracking-[0.15em]">
          BRAND
        </h3>

        <div className="space-y-3">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
            >
              <input
                type="checkbox"
                checked={(filters.brands || []).includes(brand)}
                onChange={(event) => {
                  const current = filters.brands || [];

                  updateFilter(
                    "brands",
                    event.target.checked
                      ? [...current, brand]
                      : current.filter((item) => item !== brand)
                  );
                }}
                className="accent-black"
              />
              {brand}
            </label>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={() => onFilterChange({})}
        className="w-full border border-black py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-black hover:text-white"
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default FilterProduct;
