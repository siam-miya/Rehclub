
export const categories = [
  {
    name: "Men",
    slug: "men",
    children: [
      {
        name: "T-Shirts",
        slug: "t-shirts",
        children: [
          { name: "Casual", slug: "casual" },
          { name: "Polo", slug: "polo" },
          { name: "Oversized", slug: "oversized" },
        ],
      },
      {
        name: "Shirts",
        slug: "shirts",
        children: [
          { name: "Casual", slug: "casual" },
          { name: "Formal", slug: "formal" },
        ],
      },
      {
        name: "Bottom Wear",
        slug: "bottom-wear",
        children: [
          { name: "Jeans", slug: "jeans" },
          { name: "Chinos", slug: "chinos" },
          { name: "Trousers", slug: "trousers" },
        ],
      },
    ],
  },
  {
    name: "Women",
    slug: "women",
    children: [
      {
        name: "Dresses",
        slug: "dresses",
        children: [
          { name: "Casual", slug: "casual" },
          { name: "Party", slug: "party" },
        ],
      },
      {
        name: "Tops",
        slug: "tops",
        children: [
          { name: "Casual", slug: "casual" },
          { name: "Crop Tops", slug: "crop-tops" },
        ],
      },
      {
        name: "Bottom Wear",
        slug: "bottom-wear",
        children: [
          { name: "Jeans", slug: "jeans" },
          { name: "Skirts", slug: "skirts" },
        ],
      },
    ],
  },
  {
    name: "Accessories",
    slug: "accessories",
    children: [
      { name: "Bags", slug: "bags" },
      { name: "Caps", slug: "caps" },
      { name: "Belts", slug: "belts" },
    ],
  },
];

export const products = [
  {
    id: "p001",
    name: "Classic Black T-Shirt",
    slug: "classic-black-t-shirt",
    price: 650,
    oldPrice: 850,
    categoryPath: ["men", "t-shirts", "casual"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
    images: [],
    description:
      "A versatile everyday T-shirt with a clean, timeless fit.",
    colors: ["Black", "White"],
    sizes: ["S", "M", "L", "XL"],
    sizeGuide: null,
    brand: "LuxeVibe",
    stock: 20,
    status: "active",
    createdAt: "2026-10-20",
    seo: {
      title: "Classic Black T-Shirt | LuxeVibe",
      description:
        "Shop a classic black T-shirt with a timeless everyday fit.",
    },
  },
  {
    id: "p002",
    name: "Oversized White T-Shirt",
    slug: "oversized-white-t-shirt",
    price: 790,
    oldPrice: 990,
    categoryPath: ["men", "t-shirts", "oversized"],
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=85",
    images: [],
    description:
      "A relaxed oversized silhouette for everyday styling.",
    colors: ["White", "Black"],
    sizes: ["M", "L", "XL", "XXL"],
    sizeGuide: null,
    brand: "TrueHaven",
    stock: 12,
    status: "active",
    createdAt: "2026-10-25",
    seo: {
      title: "Oversized White T-Shirt | TrueHaven",
      description:
        "Discover a relaxed oversized white T-shirt for everyday styling.",
    },
  },
  {
    id: "p003",
    name: "Premium Navy Polo",
    slug: "premium-navy-polo",
    price: 950,
    oldPrice: 1200,
    categoryPath: ["men", "t-shirts", "polo"],
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85",
    images: [],
    description:
      "A smart polo shirt for casual and semi-formal occasions.",
    colors: ["Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
    sizeGuide: null,
    brand: "HorizonEdge",
    stock: 8,
    status: "active",
    createdAt: "2026-10-27",
    seo: {
      title: "Premium Navy Polo | HorizonEdge",
      description:
        "Shop a smart navy polo shirt for casual and semi-formal occasions.",
    },
  },
  {
    id: "p004",
    name: "Casual Cotton Shirt",
    slug: "casual-cotton-shirt",
    price: 1150,
    oldPrice: 1450,
    categoryPath: ["men", "shirts", "casual"],
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=85",
    images: [],
    description:
      "A comfortable cotton shirt for everyday wear.",
    colors: ["White", "Blue"],
    sizes: ["M", "L", "XL"],
    sizeGuide: null,
    brand: "EcoSphere",
    stock: 15,
    status: "active",
    createdAt: "2026-10-26",
    seo: {
      title: "Casual Cotton Shirt | EcoSphere",
      description:
        "Discover a comfortable cotton shirt for everyday wear.",
    },
  },
  {
    id: "p005",
    name: "Women's Casual Dress",
    slug: "womens-casual-dress",
    price: 1450,
    oldPrice: 1800,
    categoryPath: ["women", "dresses", "casual"],
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85",
    images: [],
    description:
      "An elegant casual dress with a comfortable fit.",
    colors: ["Red", "Black"],
    sizes: ["S", "M", "L", "XL"],
    sizeGuide: null,
    brand: "LuxeVibe",
    stock: 10,
    status: "active",
    createdAt: "2026-10-28",
    seo: {
      title: "Women's Casual Dress | LuxeVibe",
      description:
        "Shop an elegant casual dress designed for comfortable everyday styling.",
    },
  },
  {
    id: "p006",
    name: "Women's Crop Top",
    slug: "womens-crop-top",
    price: 550,
    oldPrice: 700,
    categoryPath: ["women", "tops", "crop-tops"],
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85",
    images: [],
    description:
      "A modern crop top designed for versatile outfits.",
    colors: ["White", "Black", "Red"],
    sizes: ["S", "M", "L"],
    sizeGuide: null,
    brand: "NovaCrest",
    stock: 0,
    status: "active",
    createdAt: "2026-10-22",
    seo: {
      title: "Women's Crop Top | NovaCrest",
      description:
        "Discover a modern crop top for versatile everyday outfits.",
    },
  },
  {
    id: "p007",
    name: "Classic Women's Jeans",
    slug: "classic-womens-jeans",
    price: 1350,
    oldPrice: 1600,
    categoryPath: ["women", "bottom-wear", "jeans"],
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=85",
    images: [],
    description:
      "Classic denim jeans designed for everyday comfort.",
    colors: ["Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
    sizeGuide: null,
    brand: "TrueHaven",
    stock: 7,
    status: "active",
    createdAt: "2026-10-24",
    seo: {
      title: "Classic Women's Jeans | TrueHaven",
      description:
        "Shop classic denim jeans designed for everyday comfort.",
    },
  },
  {
    id: "p008",
    name: "Minimal Everyday Bag",
    slug: "minimal-everyday-bag",
    price: 1250,
    oldPrice: 1500,
    categoryPath: ["accessories", "bags"],
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85",
    images: [],
    description:
      "A minimal everyday bag that complements modern outfits.",
    colors: ["Black", "Brown"],
    sizes: ["One Size"],
    sizeGuide: null,
    brand: "VertexCore",
    stock: 5,
    status: "active",
    createdAt: "2026-10-29",
    seo: {
      title: "Minimal Everyday Bag | VertexCore",
      description:
        "Discover a minimal everyday bag for modern outfits.",
    },
  },
];

// Find a category using its complete slug path.
export const findCategoryByPath = (path = []) => {
  let currentCategories = categories;
  let currentCategory = null;

  for (const slug of path) {
    currentCategory = currentCategories.find(
      (category) => category.slug === slug
    );

    if (!currentCategory) return null;

    currentCategories = currentCategory.children || [];
  }

  return currentCategory;
};

// Return every category with its complete URL path.
export const getAllCategoryPaths = (items = categories, parent = []) =>
  items.flatMap((category) => {
    const path = [...parent, category.slug];

    return [
      { ...category, path },
      ...getAllCategoryPaths(category.children || [], path),
    ];
  });

// Find a product by its slug.
export const findProductBySlug = (slug) =>
  products.find((product) => product.slug === slug) || null;

// Get products belonging to a category or one of its subcategories.
export const getProductsByCategoryPath = (path = []) =>
  products.filter((product) => {
    if (!Array.isArray(product.categoryPath)) return false;

    return path.every(
      (slug, index) => product.categoryPath[index] === slug
    );
  });
