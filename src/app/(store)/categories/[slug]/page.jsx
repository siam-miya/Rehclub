
import Link from "next/link";
import { notFound } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Essential Oversized T-Shirt",
    category: ["men", "men-t-shirts", "new-arrivals", "essentials"],
    price: 790,
    oldPrice: 990,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    badge: "BESTSELLER",
  },
  {
    id: 2,
    name: "Premium Casual Shirt",
    category: ["men", "men-shirts", "new-arrivals", "premium"],
    price: 1290,
    oldPrice: 1590,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    badge: "NEW",
  },
  {
    id: 3,
    name: "Classic Polo T-Shirt",
    category: ["men", "polo-shirts", "men-sale"],
    price: 990,
    oldPrice: 1290,
    image: "https://images.unsplash.com/photo-1625910513413-5fc6b5f2f4b9?auto=format&fit=crop&w=600&q=80",
    badge: "",
  },
  {
    id: 4,
    name: "Relaxed Fit Denim Jeans",
    category: ["men", "jeans", "pants", "women-pants"],
    price: 1590,
    oldPrice: 1890,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    badge: "",
  },
  {
    id: 5,
    name: "Everyday Cotton Hoodie",
    category: ["men", "hoodies", "premium"],
    price: 1490,
    oldPrice: 1790,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    badge: "POPULAR",
  },
  {
    id: 6,
    name: "Minimal Casual Jacket",
    category: ["men", "jackets", "premium"],
    price: 2190,
    oldPrice: 2590,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    badge: "",
  },
  {
    id: 7,
    name: "Elegant Women's Top",
    category: ["women", "women-tops", "women-sale"],
    price: 890,
    oldPrice: 1190,
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=600&q=80",
    badge: "SALE",
  },
  {
    id: 8,
    name: "Classic Floral Dress",
    category: ["women", "dresses", "new-arrivals"],
    price: 1690,
    oldPrice: 1990,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=80",
    badge: "NEW",
  },
  {
    id: 9,
    name: "Modern Women's Shirt",
    category: ["women", "women-shirts", "premium"],
    price: 1190,
    oldPrice: 1490,
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=600&q=80",
    badge: "",
  },
  {
    id: 10,
    name: "Premium Co-ord Set",
    category: ["women", "co-ord-sets", "premium", "new-arrivals"],
    price: 1990,
    oldPrice: 2490,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    badge: "TRENDING",
  },
  {
    id: 11,
    name: "Women's Everyday Jeans",
    category: ["women", "women-pants", "jeans"],
    price: 1390,
    oldPrice: 1690,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    badge: "",
  },
  {
    id: 12,
    name: "Luxury Shoulder Bag",
    category: ["accessories", "bags", "premium", "new-arrivals"],
    price: 1890,
    oldPrice: 2290,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    badge: "BESTSELLER",
  },
  {
    id: 13,
    name: "Classic Minimal Watch",
    category: ["accessories", "watches", "premium"],
    price: 2490,
    oldPrice: 2990,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    badge: "POPULAR",
  },
  {
    id: 14,
    name: "Everyday Leather Wallet",
    category: ["accessories", "wallets", "essentials"],
    price: 590,
    oldPrice: 790,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
    badge: "",
  },
  {
    id: 15,
    name: "Premium Sunglasses",
    category: ["accessories", "sunglasses", "accessories-sale"],
    price: 990,
    oldPrice: 1290,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    badge: "SALE",
  },
  {
    id: 16,
    name: "Classic Fashion Belt",
    category: ["accessories", "belts", "essentials"],
    price: 690,
    oldPrice: 890,
    image: "https://images.unsplash.com/photo-1624222247344-550fb8f7a2b0?auto=format&fit=crop&w=600&q=80",
    badge: "",
  },
];

const categoryNames = {
  men: "Men",
  women: "Women",
  accessories: "Accessories",
  "men-t-shirts": "Men's T-Shirts",
  "men-shirts": "Men's Shirts",
  "polo-shirts": "Polo Shirts",
  jeans: "Jeans",
  pants: "Pants & Trousers",
  hoodies: "Hoodies & Sweatshirts",
  jackets: "Jackets",
  shorts: "Shorts",
  "women-tops": "Women's Tops",
  dresses: "Dresses",
  kurtis: "Kurtis",
  "women-shirts": "Women's Shirts",
  "women-pants": "Women's Jeans & Pants",
  "co-ord-sets": "Co-ord Sets",
  skirts: "Skirts",
  outerwear: "Outerwear",
  bags: "Bags",
  watches: "Watches",
  wallets: "Wallets",
  belts: "Belts",
  caps: "Caps",
  sunglasses: "Sunglasses",
  collections: "All Collections",
  "new-arrivals": "New Arrivals",
  "best-sellers": "Best Sellers",
  essentials: "Everyday Essentials",
  premium: "Premium Collection",
  sale: "Sale",
  "men-sale": "Men's Sale",
  "women-sale": "Women's Sale",
  "accessories-sale": "Accessories Sale",
};

function getProducts(slug) {
  if (slug === "collections") {
    return products.filter((product) =>
      product.category.some((category) =>
        ["new-arrivals", "best-sellers", "essentials", "premium"].includes(category)
      )
    );
  }

  if (slug === "sale") {
    return products.filter((product) =>
      product.category.some((category) => category.endsWith("-sale"))
    );
  }

  if (slug === "shorts" || slug === "skirts" || slug === "outerwear" ||
      slug === "kurtis" || slug === "caps") {
    return [];
  }

  if (slug === "best-sellers") {
    return products.filter((product) =>
      ["BESTSELLER", "POPULAR"].includes(product.badge)
    );
  }

  if (slug === "men-sale") {
    return products.filter((product) => product.category.includes("men-sale"));
  }

  if (slug === "women-sale") {
    return products.filter((product) => product.category.includes("women-sale"));
  }

  if (slug === "accessories-sale") {
    return products.filter((product) =>
      product.category.includes("accessories-sale")
    );
  }

  return products.filter((product) => product.category.includes(slug));
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const title = categoryNames[slug];

  if (!title) {
    notFound();
  }

  const categoryProducts = getProducts(slug);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mb-8 border-b border-gray-200 pb-6 sm:mb-10">
          <nav className="mb-4 text-xs text-gray-500">
            <Link href="/" className="hover:text-black">Home</Link>
            {" / "}
            <Link href="/categories/collections" className="hover:text-black">
              Categories
            </Link>
            {" / "}
            <span className="capitalize text-gray-900">{title}</span>
          </nav>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-gray-500">
            REHCLUB COLLECTION
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
            {title}
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Discover your style with Rehclub.
          </p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              {categoryProducts.length} products
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-700">
              <SlidersHorizontal size={16} />
              <span>Filter</span>
              <ArrowUpDown size={15} className="ml-2" />
              <span>Featured</span>
            </div>
          </div>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-10">
            {categoryProducts.map((product) => (
              <article key={product.id} className="group min-w-0">
                <Link
                  href={`/categories/${slug}`}
                  className="relative block overflow-hidden bg-gray-100"
                >
                  <div className="aspect-[3/4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {product.badge && (
                    <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[9px] font-semibold tracking-wider text-gray-900 sm:left-3 sm:top-3 sm:text-[10px]">
                      {product.badge}
                    </span>
                  )}
                </Link>

                <div className="pt-3">
                  <h2 className="text-sm font-medium leading-5 text-gray-900 sm:text-base">
                    {product.name}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-gray-950">
                      ৳{product.price.toLocaleString("en-BD")}
                    </span>

                    {product.oldPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳{product.oldPrice.toLocaleString("en-BD")}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Products Coming Soon
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              We are preparing this collection. Please check back soon.
            </p>
            <Link
              href="/categories/collections"
              className="mt-6 inline-flex bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Explore Collections
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
