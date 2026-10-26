
import React from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Men",
    slug: "men",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=600&q=80",
    children: [
      { name: "T-Shirts", slug: "men-t-shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80" },
      { name: "Shirts", slug: "men-shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80" },
      { name: "Polo Shirts", slug: "polo-shirts", image: "https://images.unsplash.com/photo-1625910513413-5fc6b5f2f4b9?auto=format&fit=crop&w=500&q=80" },
      { name: "Jeans", slug: "jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=500&q=80" },
      { name: "Pants & Trousers", slug: "pants", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=500&q=80" },
      { name: "Hoodies", slug: "hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80" },
      { name: "Jackets", slug: "jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80" },
      { name: "Shorts", slug: "shorts", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=500&q=80" },
    ],
  },
  {
    name: "Women",
    slug: "women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    children: [
      { name: "Tops", slug: "women-tops", image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=500&q=80" },
      { name: "Dresses", slug: "dresses", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=500&q=80" },
      { name: "Kurtis", slug: "kurtis", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=500&q=80" },
      { name: "Shirts", slug: "women-shirts", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=500&q=80" },
      { name: "Jeans & Pants", slug: "women-pants", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80" },
      { name: "Co-ord Sets", slug: "co-ord-sets", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80" },
      { name: "Skirts", slug: "skirts", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=500&q=80" },
      { name: "Outerwear", slug: "outerwear", image: "https://images.unsplash.com/photo-1548624149-f5b5b1e2e8e4?auto=format&fit=crop&w=500&q=80" },
    ],
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    children: [
      { name: "Bags", slug: "bags", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80" },
      { name: "Watches", slug: "watches", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80" },
      { name: "Wallets", slug: "wallets", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80" },
      { name: "Belts", slug: "belts", image: "https://images.unsplash.com/photo-1624222247344-550fb8f7a2b0?auto=format&fit=crop&w=500&q=80" },
      { name: "Caps", slug: "caps", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=500&q=80" },
      { name: "Sunglasses", slug: "sunglasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80" },
    ],
  },
  {
    name: "Collections",
    slug: "collections",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80",
    children: [
      { name: "New Arrivals", slug: "new-arrivals" },
      { name: "Best Sellers", slug: "best-sellers" },
      { name: "Everyday Essentials", slug: "essentials" },
      { name: "Premium Collection", slug: "premium" },
    ],
  },
  {
    name: "Sale",
    slug: "sale",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    children: [
      { name: "Men's Sale", slug: "men-sale" },
      { name: "Women's Sale", slug: "women-sale" },
      { name: "Accessories Sale", slug: "accessories-sale" },
    ],
  },
];

const Category = () => {
  return (
    <section className="relative z-40 border-b border-gray-200 bg-white">
      <div className="container px-4 sm:px-6 xl:px-10">
        <div
          aria-label="Product categories"
          className="flex items-center justify-center gap-7 overflow-x-auto sm:justify-start sm:gap-9"
        >
          {categories.map((category) => (
            <div key={category.slug} className="group shrink-0">
              <Link
                href={`/categories/${category.slug}`}
                className={`relative flex items-center gap-1.5 py-4 text-sm font-medium ${
                  category.name === "Sale"
                    ? "text-red-600 hover:text-red-700"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                {category.name}
                <ChevronDown
                  size={14}
                  className="text-gray-400 transition-transform group-hover:rotate-180"
                />
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full" />
              </Link>

              <div className="invisible pointer-events-none absolute left-0 right-0 top-full -translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="border-y border-gray-200 bg-white shadow-xl">
                  <div className="mx-auto max-w-[1500px] px-6 py-8 sm:px-10">
                    <div className="grid gap-8 md:grid-cols-[220px_1fr_240px]">
                      <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[2px] text-gray-400">
                          Explore Category
                        </p>
                        <Link
                          href={`/categories/${category.slug}`}
                          className="inline-flex items-center gap-2 text-2xl font-semibold text-gray-900 hover:text-gray-500"
                        >
                          {category.name}
                          <ArrowRight size={20} />
                        </Link>
                        <p className="mt-3 text-sm leading-6 text-gray-500">
                          Explore the latest styles and find your next favourite.
                        </p>
                        <Link
                          href={`/categories/${category.slug}`}
                          className="mt-5 inline-block border-b border-black pb-1 text-xs font-semibold uppercase tracking-wider"
                        >
                          Shop All {category.name}
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-3">
                        {category.children.map((child) => (
                          <Link
                            key={child.slug}
                            href={`/categories/${child.slug}`}
                            className="group/item flex items-center gap-3 border-b border-gray-100 py-2.5 text-sm text-gray-600 transition hover:text-black"
                          >
                            {child.image ? (
                              <img
                                src={child.image}
                                alt={child.name}
                                loading="lazy"
                                className="h-12 w-10 rounded object-cover"
                              />
                            ) : (
                              <span className="flex h-12 w-10 items-center justify-center rounded bg-gray-100">
                                <ArrowRight size={15} />
                              </span>
                            )}
                            <span className="flex-1">{child.name}</span>
                            <ArrowRight
                              size={13}
                              className="text-gray-300 group-hover/item:text-black"
                            />
                          </Link>
                        ))}
                      </div>

                      <Link
                        href={`/categories/${category.slug}`}
                        className="group/feature relative hidden min-h-64 overflow-hidden bg-gray-100 md:block"
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover/feature:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5 text-white">
                          <p className="text-xs uppercase tracking-widest">
                            Discover
                          </p>
                          <h3 className="mt-1 text-2xl font-semibold">
                            {category.name}
                          </h3>
                          <span className="mt-3 inline-flex items-center gap-2 text-sm">
                            Explore Now <ArrowRight size={15} />
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
