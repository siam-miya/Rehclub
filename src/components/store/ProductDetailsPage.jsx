
"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FaHeart,
  FaShoppingBag,
  FaMinus,
  FaPlus,
  FaChevronRight,
  FaWhatsapp,
  FaPhoneAlt,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaShareAlt,
  FaRuler,
  FaImage,
  FaCheck,
  FaShoppingCart,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaSearchPlus,
} from "react-icons/fa";

import { products } from "@/data/storeData";
import { useStore } from "@/stores/useStore";

const WHATSAPP_NUMBER = "8801XXXXXXXXX";
const PHONE_NUMBER = "+8801XXXXXXXXX";

const ProductDetailsPage = ({ productSlug }) => {
  const router = useRouter();
  const relatedSliderRef = useRef(null);

  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const wishlist = useStore((state) => state.wishlist);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [imageFailed, setImageFailed] = useState(false);

  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "50% 50%",
    transform: "scale(1)",
  });

  const product = products.find(
    (item) => item.slug === productSlug
  );

  const images = useMemo(() => {
    if (!product) return [];

    return [
      ...new Set(
        [
          product.image,
          ...(Array.isArray(product.images) ? product.images : []),
        ].filter(
          (image) =>
            typeof image === "string" && image.trim()
        )
      ),
    ];
  }, [product]);

  const sizeGuide =
    product?.sizeGuide || product?.sizeChart || null;

  const sizeColumns = Array.isArray(sizeGuide?.columns)
    ? sizeGuide.columns
    : [];

  const sizeRows = Array.isArray(sizeGuide?.rows)
    ? sizeGuide.rows
    : [];

  const productId = product?.id ?? product?.slug;

  const isWishlisted = Boolean(
    wishlist?.some(
      (item) => String(item.id) === String(productId)
    )
  );

  const closeModals = () => {
    setIsSizeGuideOpen(false);
    setIsLightboxOpen(false);
  };

  const showPreviousImage = () => {
    if (!images.length) return;

    setSelectedImage((current) =>
      current <= 0 ? images.length - 1 : current - 1
    );

    setImageFailed(false);
  };

  const showNextImage = () => {
    if (!images.length) return;

    setSelectedImage((current) =>
      current >= images.length - 1 ? 0 : current + 1
    );

    setImageFailed(false);
  };

  useEffect(() => {
    if (!isLightboxOpen && !isSizeGuideOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModals();
      }

      if (isLightboxOpen && event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (isLightboxOpen && event.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, isSizeGuideOpen, images.length]);

  if (!product) {
    return (
      <main className="container px-4 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
          Our Collection
        </p>

        <h1 className="mt-4 text-3xl font-semibold text-gray-900">
          Product Not Found
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          This product is unavailable or may have been removed.
        </p>

        <Link
          href="/products"
          className="mt-7 inline-flex cursor-pointer items-center gap-2 bg-black px-7 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <FaShoppingBag size={16} />
          Explore Products
        </Link>
      </main>
    );
  }

  const price = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || 0;
  const stock = Math.max(0, Number(product.stock) || 0);
  const soldOut = stock === 0;

  const discount =
    oldPrice > price && oldPrice > 0
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const formatPrice = (amount) =>
    `৳${Number(amount).toLocaleString("en-BD")}`;

  const currentImage = images[selectedImage];

  const categoryPath = Array.isArray(product.categoryPath)
    ? product.categoryPath
    : [];

  const normalizedProduct = {
    ...product,
    id: productId,
    categoryPath,
    image: product.image || images[0] || "",
    selectedColor,
    selectedSize,
  };

  const orderMessage = [
    "Assalamu Alaikum! I want to order this product.",
    "",
    `Product: ${product.name}`,
    `Brand: ${product.brand || "N/A"}`,
    `Price: ${formatPrice(price)}`,
    `Quantity: ${quantity}`,
    selectedColor ? `Color: ${selectedColor}` : "",
    selectedSize ? `Size: ${selectedSize}` : "",
    `Subtotal: ${formatPrice(price * quantity)}`,
    `Product link: ${
      typeof window !== "undefined" ? window.location.href : ""
    }`,
  ]
    .filter(Boolean)
    .join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    orderMessage
  )}`;

  const validateSelection = () => {
    if (soldOut) {
      alert("Sorry, this product is out of stock.");
      return false;
    }

    if (quantity < 1 || quantity > stock) {
      alert("Please select a valid quantity.");
      return false;
    }

    if (product.colors?.length && !selectedColor) {
      alert("Please select a color first.");
      return false;
    }

    if (product.sizes?.length && !selectedSize) {
      alert("Please select a size first.");
      return false;
    }

    return true;
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!validateSelection()) return;

    addToCart(normalizedProduct, quantity);

    alert("Product added to cart successfully!");
  };

  // Buy now
  const handleBuyNow = () => {
    if (!validateSelection()) return;

    addToCart(normalizedProduct, quantity);

    router.push("/checkout");
  };

  // Wishlist
  const handleWishlist = () => {
    toggleWishlist({
      ...product,
      id: productId,
      categoryPath,
      image: product.image || images[0] || "",
    });
  };

  // Share product
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name}`,
          url,
        });
      } catch {
        // User cancelled sharing.
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Product link copied!");
      } catch {
        alert("Please copy the product URL from your browser.");
      }
    }
  };

  // Image zoom
  const handleImageMouseMove = (event) => {
    if (window.matchMedia("(hover: none)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.8)",
    });
  };

  const handleImageMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "50% 50%",
      transform: "scale(1)",
    });
  };

  // Related products slider
  const scrollRelated = (direction) => {
    if (!relatedSliderRef.current) return;

    relatedSliderRef.current.scrollBy({
      left:
        direction *
        relatedSliderRef.current.clientWidth *
        0.8,
      behavior: "smooth",
    });
  };

  const relatedProducts = products
    .filter((item) => item.slug !== product.slug)
    .filter(
      (item) => item.categoryPath?.[0] === categoryPath[0]
    )
    .slice(0, 8);

  const getProductHref = (item) =>
    `/products/categories/${[
      ...(item.categoryPath || []),
      item.slug,
    ].join("/")}`;

  // Related product cart
  const handleRelatedAddToCart = (item) => {
    if (Number(item.stock) <= 0) {
      alert("This product is out of stock.");
      return;
    }

    addToCart(
      {
        ...item,
        id: item.id ?? item.slug,
        categoryPath: Array.isArray(item.categoryPath)
          ? item.categoryPath
          : [],
        image: item.image || "",
        selectedColor: "",
        selectedSize: "",
      },
      1
    );

    alert("Product added to cart successfully!");
  };

  // Related product wishlist
  const handleRelatedWishlist = (item) => {
    toggleWishlist({
      ...item,
      id: item.id ?? item.slug,
      categoryPath: Array.isArray(item.categoryPath)
        ? item.categoryPath
        : [],
      image: item.image || "",
    });
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "shipping", label: "Shipping & Returns" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="container px-4 pb-16 pt-5 sm:px-6 sm:pt-8 lg:px-8">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:mb-9"
        >
          <Link
            href="/"
            className="cursor-pointer transition hover:text-black"
          >
            Home
          </Link>

          <FaChevronRight size={10} />

          <Link
            href="/products"
            className="cursor-pointer transition hover:text-black"
          >
            Shop
          </Link>

          <FaChevronRight size={10} />

          <span className="font-medium text-gray-900">
            {product.name}
          </span>
        </nav>

        {/* Main product layout */}
        <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">

          {/* Image gallery */}
          <div className="min-w-0">
            <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 sm:grid-cols-[84px_minmax(0,1fr)] sm:gap-4">

              {/* Thumbnails */}
              <div className="flex max-h-[620px] flex-col gap-3 overflow-y-auto">
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={selectedImage === index}
                      onClick={() => {
                        setSelectedImage(index);
                        setImageFailed(false);
                        handleImageMouseLeave();
                      }}
                      className={`relative aspect-[3/4] w-full shrink-0 cursor-pointer overflow-hidden border bg-[#f7f7f5] transition ${
                        selectedImage === index
                          ? "border-black"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 64px, 84px"
                        unoptimized
                        className="object-contain p-1"
                      />
                    </button>
                  ))
                ) : (
                  <div className="flex aspect-[3/4] items-center justify-center bg-gray-100">
                    <FaImage size={20} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* Main image */}
              <div
                className="group relative flex aspect-[4/5] min-w-0 items-center justify-center overflow-hidden bg-[#f7f7f5]"
                onMouseMove={handleImageMouseMove}
                onMouseLeave={handleImageMouseLeave}
              >
                {!imageFailed && currentImage ? (
                  <button
                    type="button"
                    onClick={() => {
                      handleImageMouseLeave();
                      setIsLightboxOpen(true);
                    }}
                    aria-label="Open product image gallery"
                    className="absolute inset-0 z-0 h-full w-full cursor-zoom-in overflow-hidden"
                  >
                    <Image
                      key={currentImage}
                      src={currentImage}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized
                      onError={() => setImageFailed(true)}
                      style={zoomStyle}
                      className="object-contain p-3 transition-transform duration-300 ease-out sm:p-6"
                    />
                  </button>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <FaImage size={34} />
                    <span className="text-xs">
                      Product image unavailable
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2 bg-white/90 px-3 py-2 text-[10px] uppercase tracking-wider text-gray-600 opacity-100 shadow-sm transition sm:bottom-5 sm:left-5 sm:opacity-0 sm:group-hover:opacity-100">
                  <FaSearchPlus size={12} />
                  Click to enlarge
                </div>

                {discount > 0 && (
                  <span className="pointer-events-none absolute left-3 top-3 z-10 bg-black px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white sm:left-5 sm:top-5">
                    -{discount}% OFF
                  </span>
                )}

                {soldOut && (
                  <span className="pointer-events-none absolute right-3 top-3 z-10 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-wider sm:right-5 sm:top-5">
                    Sold Out
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleWishlist}
                  aria-label={
                    isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className="absolute bottom-3 right-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center bg-white shadow-sm transition hover:scale-105 sm:bottom-5 sm:right-5 sm:h-11 sm:w-11"
                >
                  <FaHeart
                    size={18}
                    className={
                      isWishlisted ? "text-red-500" : "text-gray-800"
                    }
                  />
                </button>
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-gray-400">
              Premium Quality · Everyday Style
            </p>
          </div>

          {/* Product information */}
          <div className="min-w-0 lg:sticky lg:top-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gray-500">
              {product.brand || "The Collection"}
            </p>

            <div className="mt-3 flex items-start justify-between gap-4">
              <h1 className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl xl:text-4xl">
                {product.name}
              </h1>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label="Toggle wishlist"
                className="shrink-0 cursor-pointer p-2 transition hover:text-red-500"
              >
                <FaHeart
                  size={21}
                  className={isWishlisted ? "text-red-500" : ""}
                />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className="tracking-[0.15em] text-amber-500">
                ☆☆☆☆☆
              </span>
              <span>No reviews yet</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-semibold tracking-tight">
                {formatPrice(price)}
              </span>

              {oldPrice > price && (
                <span className="text-base text-gray-400 line-through">
                  {formatPrice(oldPrice)}
                </span>
              )}

              {discount > 0 && (
                <span className="text-xs font-medium text-red-600">
                  You save {formatPrice(oldPrice - price)}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span
                className={`h-2 w-2 ${
                  soldOut ? "bg-red-500" : "bg-green-600"
                }`}
              />

              <span className={soldOut ? "text-red-600" : "text-gray-600"}>
                {soldOut
                  ? "Currently out of stock"
                  : stock <= 5
                    ? `Only ${stock} items left`
                    : "Available to order"}
              </span>
            </div>

            {product.description && (
              <p className="mt-6 border-b border-gray-200 pb-6 text-sm leading-7 text-gray-600">
                {product.description}
              </p>
            )}

            {/* Color */}
            {product.colors?.length > 0 && (
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider">
                    Color
                  </h2>

                  <span className="text-xs text-gray-500">
                    {selectedColor || "Select a color"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      aria-pressed={selectedColor === color}
                      onClick={() => setSelectedColor(color)}
                      className={`inline-flex min-h-10 cursor-pointer items-center gap-2 border px-3 py-2 text-xs transition ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-black"
                      }`}
                    >
                      {selectedColor === color && (
                        <FaCheck size={11} />
                      )}
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes?.length > 0 && (
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider">
                    Size
                  </h2>

                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="group flex cursor-pointer items-center gap-2 text-xs text-gray-500 transition hover:text-black"
                  >
                    <FaRuler size={12} />
                    <span className="underline underline-offset-4">
                      Size Guide
                    </span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-11 min-w-11 cursor-pointer items-center justify-center border px-4 text-xs transition ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-7 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider">
                  Quantity
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Subtotal: {formatPrice(price * quantity)}
                </p>
              </div>

              <div className="flex h-11 items-center border border-gray-200">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((value) => Math.max(1, value - 1))
                  }
                  className="flex h-full w-10 cursor-pointer items-center justify-center hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaMinus size={12} />
                </button>

                <span className="min-w-8 text-center text-sm tabular-nums">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={soldOut || quantity >= stock}
                  onClick={() =>
                    setQuantity((value) =>
                      Math.min(stock, value + 1)
                    )
                  }
                  className="flex h-full w-10 cursor-pointer items-center justify-center hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>

            {/* Cart + Buy Now */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={soldOut}
                onClick={handleAddToCart}
                className="flex min-h-12 cursor-pointer items-center justify-center gap-2 border border-black px-4 py-3 text-xs font-semibold uppercase tracking-wider transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
              >
                <FaShoppingBag size={15} />
                Add to Cart
              </button>

              <button
                type="button"
                disabled={soldOut}
                onClick={handleBuyNow}
                className="flex min-h-12 cursor-pointer items-center justify-center gap-2 bg-black px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Buy Now
                <FaChevronRight size={12} />
              </button>
            </div>

            {/* WhatsApp + Call */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => {
                  if (!validateSelection()) event.preventDefault();
                }}
                aria-disabled={soldOut}
                className={`flex min-h-12 items-center justify-center gap-2 bg-[#168b50] px-2 py-3 text-[10px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#116f40] sm:text-xs ${
                  soldOut ? "pointer-events-none opacity-50" : "cursor-pointer"
                }`}
              >
                <FaWhatsapp size={17} />
                WhatsApp Order
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex min-h-12 cursor-pointer items-center justify-center gap-2 border border-gray-200 px-2 py-3 text-[10px] font-semibold uppercase tracking-wider transition hover:border-black sm:text-xs"
              >
                <FaPhoneAlt size={14} />
                Call to Order
              </a>
            </div>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="mt-4 flex cursor-pointer items-center gap-2 text-xs text-gray-500 transition hover:text-black"
            >
              <FaShareAlt size={13} />
              Share this product
            </button>

            {/* Delivery benefits */}
            <div className="mt-6 space-y-4 border-y border-gray-200 py-5">
              <div className="flex items-start gap-3">
                <FaTruck size={18} className="mt-0.5 shrink-0" />

                <div>
                  <h3 className="text-xs font-semibold">
                    Delivery Available
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Delivery charges and estimated delivery time are confirmed
                    when placing your order.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaUndo size={17} className="mt-0.5 shrink-0" />

                <div>
                  <h3 className="text-xs font-semibold">
                    Return & Exchange
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Contact our team to confirm the applicable return and
                    exchange policy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaShieldAlt size={18} className="mt-0.5 shrink-0" />

                <div>
                  <h3 className="text-xs font-semibold">
                    Customer Support
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Contact us through WhatsApp or phone for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product tabs */}
        <section className="mt-16 border-t border-gray-200 pt-8 sm:mt-20 sm:pt-10">
          <div className="flex gap-6 overflow-x-auto border-b border-gray-200 sm:justify-center sm:gap-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 cursor-pointer pb-4 text-xs font-semibold uppercase tracking-wider transition ${
                  activeTab === tab.id
                    ? "text-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {tab.label}

                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-black" />
                )}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-4xl py-8">
            {activeTab === "description" && (
              <div className="space-y-4 text-sm leading-7 text-gray-600">
                <h2 className="text-base font-semibold text-gray-900">
                  About {product.name}
                </h2>

                <p>
                  {product.description ||
                    "Explore the product details and contact our team for more information."}
                </p>

                <div className="grid gap-3 border-t border-gray-100 pt-5 sm:grid-cols-2">
                  {product.brand && (
                    <p>
                      <span className="font-medium text-gray-900">
                        Brand:{" "}
                      </span>
                      {product.brand}
                    </p>
                  )}

                  {product.colors?.length > 0 && (
                    <p>
                      <span className="font-medium text-gray-900">
                        Colors:{" "}
                      </span>
                      {product.colors.join(", ")}
                    </p>
                  )}

                  {product.sizes?.length > 0 && (
                    <p>
                      <span className="font-medium text-gray-900">
                        Sizes:{" "}
                      </span>
                      {product.sizes.join(", ")}
                    </p>
                  )}

                  <p>
                    <span className="font-medium text-gray-900">
                      Size guide:{" "}
                    </span>
                    Open the Size Guide above for measurements.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 text-sm leading-7 text-gray-600">
                <h2 className="text-base font-semibold text-gray-900">
                  Shipping & Returns
                </h2>

                <p>
                  Shipping charges, delivery estimates, and return eligibility
                  are confirmed according to your delivery address and the
                  store&apos;s current policy.
                </p>

                <p>
                  For delivery assistance, contact us using the WhatsApp or
                  phone order options above.
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="py-4 text-center">
                <h2 className="text-base font-semibold text-gray-900">
                  Customer Reviews
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  There are no reviews yet for this product.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-10 border-t border-gray-200 pt-10 sm:mt-14 sm:pt-12">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                  Explore More
                </p>

                <h2 className="mt-2 text-xl font-semibold uppercase tracking-tight sm:text-2xl">
                  Related Products
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous related products"
                  onClick={() => scrollRelated(-1)}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center border border-gray-200 transition hover:border-black hover:bg-black hover:text-white"
                >
                  <FaArrowLeft size={13} />
                </button>

                <button
                  type="button"
                  aria-label="Next related products"
                  onClick={() => scrollRelated(1)}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center border border-gray-200 transition hover:border-black hover:bg-black hover:text-white"
                >
                  <FaArrowRight size={13} />
                </button>

                <Link
                  href="/products"
                  className="hidden shrink-0 cursor-pointer text-xs font-medium underline underline-offset-4 hover:text-gray-500 sm:block"
                >
                  View All
                </Link>
              </div>
            </div>

            <div
              ref={relatedSliderRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 sm:gap-5"
              style={{ scrollbarWidth: "none" }}
            >
              {relatedProducts.map((item) => {
                const itemPrice = Number(item.price) || 0;
                const itemOldPrice = Number(item.oldPrice) || 0;
                const itemStock = Number(item.stock) || 0;
                const itemSoldOut = itemStock <= 0;

                const itemDiscount =
                  itemOldPrice > itemPrice && itemOldPrice > 0
                    ? Math.round(
                        ((itemOldPrice - itemPrice) / itemOldPrice) * 100
                      )
                    : 0;

                const itemId = item.id ?? item.slug;

                const itemWishlisted = wishlist.some(
                  (wish) => String(wish.id) === String(itemId)
                );

                return (
                  <article
                    key={item.slug}
                    className="group w-[46%] min-w-0 shrink-0 snap-start bg-white sm:w-[30%] lg:w-[23%] xl:w-[19%]"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <Link
                        href={getProductHref(item)}
                        className="absolute inset-0 cursor-pointer"
                        aria-label={`View ${item.name}`}
                      >
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 20vw"
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-400">
                            <FaImage size={24} />
                          </div>
                        )}
                      </Link>

                      {itemSoldOut ? (
                        <span className="absolute left-2 top-2 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider sm:left-3 sm:top-3 sm:text-[10px]">
                          Sold Out
                        </span>
                      ) : itemDiscount > 0 ? (
                        <span className="absolute left-2 top-2 bg-black px-2 py-1 text-[9px] font-semibold text-white sm:left-3 sm:top-3 sm:text-[10px]">
                          {itemDiscount}% OFF
                        </span>
                      ) : null}

                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 sm:translate-y-3 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <button
                          type="button"
                          disabled={itemSoldOut}
                          aria-label={`Add ${item.name} to cart`}
                          onClick={() => handleRelatedAddToCart(item)}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center bg-white shadow-md transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10"
                        >
                          <FaShoppingCart size={15} />
                        </button>

                        <button
                          type="button"
                          aria-label={`Add ${item.name} to wishlist`}
                          onClick={() => handleRelatedWishlist(item)}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center bg-white shadow-md transition hover:bg-black hover:text-white sm:h-10 sm:w-10"
                        >
                          <FaHeart
                            size={15}
                            className={
                              itemWishlisted ? "text-red-500" : ""
                            }
                          />
                        </button>
                      </div>
                    </div>

                    <div className="pt-3">
                      <Link
                        href={getProductHref(item)}
                        className="cursor-pointer"
                      >
                        <h3 className="line-clamp-2 text-xs font-medium text-gray-800 hover:text-gray-500 sm:text-sm">
                          {item.name}
                        </h3>
                      </Link>

                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPrice(itemPrice)}
                        </span>

                        {itemOldPrice > itemPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatPrice(itemOldPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <Link
              href="/products"
              className="mt-3 inline-flex cursor-pointer text-xs font-medium underline underline-offset-4 hover:text-gray-500 sm:hidden"
            >
              View All Products
            </Link>
          </section>
        )}
      </div>

      {/* SIZE GUIDE MODAL */}
      {isSizeGuideOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsSizeGuideOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="size-guide-title"
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-8 sm:py-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                  Find Your Fit
                </p>

                <h2
                  id="size-guide-title"
                  className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  {sizeGuide?.title || "Size Guide"}
                </h2>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {product.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                aria-label="Close size guide"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border border-gray-200 transition hover:bg-black hover:text-white"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div className="p-5 sm:p-8">
              {sizeColumns.length > 0 && sizeRows.length > 0 ? (
                <>
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs leading-5 text-gray-500">
                      Use the measurements below to choose your size.
                    </p>

                    {sizeGuide?.unit && (
                      <span className="bg-gray-100 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                        Unit: {sizeGuide.unit}
                      </span>
                    )}
                  </div>

                  <div className="overflow-x-auto border border-gray-200">
                    <table className="w-full min-w-max border-collapse text-left text-xs">
                      <thead className="bg-[#f7f7f5]">
                        <tr>
                          {sizeColumns.map((column, index) => (
                            <th
                              key={`${column}-${index}`}
                              className="border-b border-gray-200 px-4 py-4 font-semibold text-gray-900"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {sizeRows.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="transition hover:bg-gray-50"
                          >
                            {sizeColumns.map((column, columnIndex) => (
                              <td
                                key={`${column}-${columnIndex}`}
                                className="border-b border-gray-100 px-4 py-4 text-gray-600 last:border-b-0"
                              >
                                {row[column] ??
                                  row[column.toLowerCase()] ??
                                  "—"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {sizeGuide?.note && (
                    <p className="mt-5 border-l-2 border-black pl-4 text-xs leading-6 text-gray-500">
                      {sizeGuide.note}
                    </p>
                  )}
                </>
              ) : (
                <div className="py-8 text-center sm:py-10">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#f7f7f5]">
                    <FaRuler size={21} className="text-gray-700" />
                  </div>

                  <h3 className="mt-5 text-base font-semibold">
                    Size chart coming soon
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    The size chart for this product has not been added yet.
                    Please contact us for help choosing the right size.
                  </p>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Assalamu Alaikum! I need size guidance for ${product.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800"
                  >
                    <FaWhatsapp size={16} />
                    Ask About Size
                  </a>
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 bg-[#fafafa] px-5 py-4 sm:px-8">
              <p className="text-[10px] leading-5 text-gray-500">
                Measurements and fit can vary by product. If you are between
                sizes, contact our team before ordering.
              </p>
            </div>
          </section>
        </div>
      )}

      {/* IMAGE LIGHTBOX */}
      {isLightboxOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-[110] flex flex-col bg-[#111]"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image gallery`}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-7">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {product.name}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
                Image {selectedImage + 1} of {images.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close image gallery"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border border-white/20 text-white transition hover:bg-white hover:text-black"
            >
              <FaTimes size={16} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-12 py-5 sm:px-20">
            {images.length > 1 && (
              <button
                type="button"
                onClick={showPreviousImage}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/20 text-white transition hover:bg-white hover:text-black sm:left-6 sm:h-12 sm:w-12"
              >
                <FaArrowLeft size={15} />
              </button>
            )}

            {currentImage && (
              <div className="relative h-full w-full">
                <Image
                  key={currentImage}
                  src={currentImage}
                  alt={`${product.name} image ${selectedImage + 1}`}
                  fill
                  sizes="100vw"
                  unoptimized
                  className="select-none object-contain"
                />
              </div>
            )}

            {images.length > 1 && (
              <button
                type="button"
                onClick={showNextImage}
                aria-label="Next image"
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center border border-white/20 text-white transition hover:bg-white hover:text-black sm:right-6 sm:h-12 sm:w-12"
              >
                <FaArrowRight size={15} />
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex shrink-0 justify-center gap-3 overflow-x-auto border-t border-white/10 px-4 py-4">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => {
                    setSelectedImage(index);
                    setImageFailed(false);
                  }}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  className={`relative h-16 w-12 shrink-0 cursor-pointer overflow-hidden border transition sm:h-20 sm:w-16 ${
                    selectedImage === index
                      ? "border-white opacity-100"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="64px"
                    unoptimized
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          )}

          <p className="shrink-0 pb-3 text-center text-[9px] uppercase tracking-[0.2em] text-white/40">
            Press Esc to close · Use ← → to navigate
          </p>
        </div>
      )}
    </main>
  );
};

export default ProductDetailsPage;
