
import Link from "next/link";

import ProductDetailsPage from "@/components/store/ProductDetailsPage";
import CategoryProductsClient from "@/components/store/CategoryProductsClient";
import PageHero from "@/components/shared/PageHero";

import {
  categories,
  products,
  findCategoryByPath,
} from "@/data/storeData";

// Generate category and product routes
export const generateStaticParams = () => {
  const paths = [];

  const visit = (items, parentPath = []) => {
    for (const category of items) {
      const path = [...parentPath, category.slug];

      paths.push({ slug: path });

      visit(category.children || [], path);
    }
  };

  visit(categories);

  for (const product of products) {
    if (!product.slug) continue;

    paths.push({
      slug: [
        ...(product.categoryPath || []),
        product.slug,
      ],
    });
  }

  return paths;
};

const CategoryOrProductPage = async ({ params }) => {
  const { slug = [] } = await params;

  if (!slug.length) {
    return (
      <section className="container px-4 py-20 text-center">
        <h1 className="text-xl font-semibold text-black">
          Page Not Found
        </h1>

        <Link
          href="/products"
          className="mt-5 inline-block border border-black px-5 py-3 text-sm transition-colors hover:bg-black hover:text-white"
        >
          Browse All Products
        </Link>
      </section>
    );
  }

  // Check whether URL belongs to a product
  const lastSlug = slug[slug.length - 1];
  const parentPath = slug.slice(0, -1).join("/");

  const matchedProduct = products.find((product) => {
    const productPath = (product.categoryPath || []).join("/");

    return (
      product.slug === lastSlug &&
      productPath === parentPath
    );
  });

  if (matchedProduct) {
    return (
      <ProductDetailsPage productSlug={matchedProduct.slug} />
    );
  }

  // Find category
  const category = findCategoryByPath(slug);

  if (!category) {
    return (
      <section className="container px-4 py-20 text-center sm:py-24">
        <h1 className="text-xl font-semibold text-black sm:text-2xl">
          Page Not Found
        </h1>

        <p className="mt-3 text-xs text-gray-500 sm:text-sm">
          This category or product does not exist.
        </p>

        <Link
          href="/products"
          className="mt-5 inline-block border border-black px-5 py-2.5 text-xs font-medium transition-colors hover:bg-black hover:text-white sm:px-6 sm:py-3 sm:text-sm"
        >
          Browse All Products
        </Link>
      </section>
    );
  }

  // Include products from this category and all child categories
  const categoryPath = slug.join("/");

  const categoryProducts = products.filter((product) => {
    const productPath = (product.categoryPath || []).join("/");

    return (
      productPath === categoryPath ||
      productPath.startsWith(`${categoryPath}/`)
    );
  });

  // Dynamic breadcrumbs
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },

    ...slug.map((part, index) => ({
      label: part.replaceAll("-", " "),
      href:
        index === slug.length - 1
          ? undefined
          : `/products/categories/${slug
              .slice(0, index + 1)
              .join("/")}`,
    })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Explore Collection"
        title={category.name}
        subtitle={`${categoryProducts.length} products in this collection`}
        breadcrumbs={breadcrumbs}
        position="center"
      />

      <section className="container w-full px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-12">
        <CategoryProductsClient
          products={categoryProducts}
        />
      </section>
    </>
  );
};

export default CategoryOrProductPage;
