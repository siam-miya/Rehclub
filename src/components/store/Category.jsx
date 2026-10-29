
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { categories } from "@/data/storeData";

const Category = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const getCategoryUrl = (path) =>
    `/products/categories/${path.join("/")}`;

  return (
    <section
      className="relative z-40 border-b border-gray-200 bg-white"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Parent Category Navigation */}
        <nav className="flex min-h-12 items-center gap-7 overflow-x-auto">
          {categories.map((category) => {
            const isActive = activeMenu === category.slug;
            const hasChildren = category.children?.length > 0;

            return (
              <div
                key={category.slug}
                className="flex h-12 shrink-0 items-center"
                onMouseEnter={() => {
                  if (hasChildren) setActiveMenu(category.slug);
                }}
              >
                <Link
                  href={getCategoryUrl([category.slug])}
                  onClick={() => setActiveMenu(null)}
                  className={`group flex h-full items-center gap-1.5 border-b-2 text-sm font-semibold transition ${
                    isActive
                      ? "border-black text-black"
                      : "border-transparent text-gray-700 hover:border-black hover:text-black"
                  }`}
                >
                  {category.name}

                  {hasChildren && (
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Mobile menu toggle */}
                {hasChildren && (
                  <button
                    type="button"
                    aria-label={`Open ${category.name} menu`}
                    aria-expanded={isActive}
                    onClick={() =>
                      setActiveMenu(isActive ? null : category.slug)
                    }
                    className="ml-1 rounded p-1 md:hidden"
                  >
                    <ChevronDown
                      size={15}
                      className={`transition-transform ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mega Menu */}
      {categories.map((category) => {
        if (
          activeMenu !== category.slug ||
          !category.children?.length
        ) {
          return null;
        }

        return (
          <div
            key={category.slug}
            className="absolute left-0 top-full w-full border-t border-gray-100 bg-white shadow-xl"
            onMouseEnter={() => setActiveMenu(category.slug)}
          >
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                    Explore Collection
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-gray-900">
                    {category.name}
                  </h2>
                </div>

                <Link
                  href={getCategoryUrl([category.slug])}
                  onClick={() => setActiveMenu(null)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 transition hover:text-gray-500"
                >
                  Shop All {category.name}
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
                {category.children.map((child) => {
                  const childPath = [
                    category.slug,
                    child.slug,
                  ];

                  return (
                    <div key={child.slug} className="min-w-0">
                      <Link
                        href={getCategoryUrl(childPath)}
                        onClick={() => setActiveMenu(null)}
                        className="mb-3 inline-block text-sm font-bold text-gray-900 transition hover:text-gray-500"
                      >
                        {child.name}
                      </Link>

                      {child.children?.length > 0 && (
                        <ul className="space-y-2.5">
                          {child.children.map((subchild) => (
                            <li key={subchild.slug}>
                              <Link
                                href={getCategoryUrl([
                                  ...childPath,
                                  subchild.slug,
                                ])}
                                onClick={() => setActiveMenu(null)}
                                className="text-sm text-gray-500 transition hover:text-black"
                              >
                                {subchild.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-gray-100 pt-4">
                <Link
                  href={getCategoryUrl([category.slug])}
                  onClick={() => setActiveMenu(null)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:underline"
                >
                  Discover all {category.name}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Category;
