import Link from "next/link";
import ProductDetailsPage from "@/components/store/ProductDetailsPage";
import CategoryProductsClient from "@/components/store/CategoryProductsClient";
import PageHero from "@/components/shared/PageHero";

import {
  categories,
  products,
  findCategoryByPath,
} from "@/data/storeData";

export function generateStaticParams() {
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
    paths.push({
      slug: [...product.categoryPath, product.slug],
    });
  }

  return paths;
}

export default async function CategoryOrProductPage({ params }) {
  const { slug = [] } = await params;

  // 1. Check whether this URL belongs to a product.
  const lastSlug = slug[slug.length - 1];

  const matchedProduct = products.find(
    (product) =>
      product.slug === lastSlug &&
      product.categoryPath.join("/") === slug.slice(0, -1).join("/")
  );

  if (matchedProduct) {
    return <ProductDetailsPage productSlug={matchedProduct.slug} />;
  }

  // 2. Find the category.
  const category = findCategoryByPath(slug);

  if (!category) {
    return (
      <section className="container px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Page Not Found</h1>

        <p className="mt-3 text-sm text-gray-500">
          This category or product does not exist.
        </p>

        <Link
          href="/products"
          className="mt-5 inline-block border border-black px-5 py-3 text-sm transition-colors hover:bg-black hover:text-white"
        >
          Browse All Products
        </Link>
      </section>
    );
  }

  // 3. Include products from this category and its children.
  const categoryPath = slug.join("/");

  const categoryProducts = products.filter((product) => {
    const productPath = (product.categoryPath || []).join("/");

    return (
      productPath === categoryPath ||
      productPath.startsWith(`${categoryPath}/`)
    );
  });

  // 4. Dynamic breadcrumbs.
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

      <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <CategoryProductsClient products={categoryProducts} />
      </section>
    </>
  );
}