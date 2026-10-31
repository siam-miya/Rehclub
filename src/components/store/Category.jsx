
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ChevronDown, ArrowRight } from "lucide-react";
import { categories } from "@/data/storeData";

// Temporary parent category images
const categoryImages = {
  men: {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85",
    alt: "Men's fashion collection",
  },

  women: {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85",
    alt: "Women's fashion collection",
  },
};

const Category = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const getCategoryUrl = (path) =>
    `/products/categories/${path.join("/")}`;

  return (
    <section
      className="relative z-40 hidden border-b border-gray-200 bg-white lg:block"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* Desktop Category Navigation */}
      <div className="container px-4 xl:px-10">
        <nav className="flex min-h-[48px] items-center gap-8">
          {categories.map((category) => {
            const isActive = activeMenu === category.slug;
            const hasChildren = category.children?.length > 0;

            return (
              <div
                key={category.slug}
                className="flex h-12 shrink-0 items-center"
                onMouseEnter={() =>
                  setActiveMenu(hasChildren ? category.slug : null)
                }
              >
                <Link
                  href={getCategoryUrl([category.slug])}
                  onClick={() => setActiveMenu(null)}
                  className={`group flex h-full items-center gap-1.5 border-b-2 text-sm font-semibold transition-colors duration-200 ${
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
              </div>
            );
          })}
        </nav>
      </div>

      {/* Desktop Mega Menu */}
      {categories.map((category) => {
        if (
          activeMenu !== category.slug ||
          !category.children?.length
        ) {
          return null;
        }

        const categoryImage = categoryImages[category.slug];

        return (
          <div
            key={category.slug}
            className="absolute left-0 top-full w-full border-t border-gray-100 bg-white shadow-[0_14px_30px_rgba(0,0,0,0.10)]"
            onMouseEnter={() => setActiveMenu(category.slug)}
          >
            <div className="container px-6 py-8 xl:px-10">

              {/* Header */}
              <div className="mb-7 flex items-center justify-between gap-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">
                    Explore Collection
                  </p>

                  <h2 className="mt-1.5 text-2xl font-bold text-gray-900">
                    {category.name}
                  </h2>
                </div>

                <Link
                  href={getCategoryUrl([category.slug])}
                  onClick={() => setActiveMenu(null)}
                  className="inline-flex shrink-0 items-center gap-2 border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:border-black hover:bg-black hover:text-white"
                >
                  Shop All {category.name}
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Categories + Parent Image */}
              <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-10">

                {/* Child Categories */}
                <div className="grid grid-cols-3 gap-x-8 gap-y-8">
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
                          className="mb-3 inline-block text-sm font-bold text-gray-900 transition-colors hover:text-gray-500"
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
                                  className="text-sm text-gray-500 transition-colors hover:text-black"
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

                {/* Parent Category Image */}
                {categoryImage && (
                  <Link
                    href={getCategoryUrl([category.slug])}
                    onClick={() => setActiveMenu(null)}
                    className="group relative block h-[280px] overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={categoryImage.src}
                      alt={categoryImage.alt}
                      fill
                      unoptimized
                      sizes="300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Image Content */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                        Explore Collection
                      </p>

                      <h3 className="mt-1 text-2xl font-bold text-white">
                        {category.name}
                      </h3>

                      <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white">
                        Shop Collection
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                )}
              </div>

              {/* Footer */}
              <div className="mt-8 border-t border-gray-100 pt-5">
                <Link
                  href={getCategoryUrl([category.slug])}
                  onClick={() => setActiveMenu(null)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-black transition-colors hover:text-gray-500"
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
