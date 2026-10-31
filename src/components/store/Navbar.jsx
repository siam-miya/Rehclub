
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Heart,
  Search,
  ShoppingCart,
  UserRound,
  Truck,
  Menu,
  X,
  Home,
  Grid2X2,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import NavLinks from "./NavLinks";
import { useStore, selectCartCount } from "@/stores/useStore";
import { categories } from "@/data/storeData";

const Navbar = () => {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  const cartCount = useStore(selectCartCount);
  const wishlistCount = useStore((state) => state.wishlist.length);

  const formatCount = (count) => (count > 99 ? "99+" : count);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedCategories({});
  };

  const toggleCategory = (slug) => {
    setExpandedCategories((previous) => ({
      ...previous,
      [slug]: !previous[slug],
    }));
  };

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const renderCategoryItems = (items, parentPath = [], depth = 0) => {
    return items.map((category) => {
      const currentPath = [...parentPath, category.slug];
      const pathKey = currentPath.join("/");
      const href = `/products/categories/${pathKey}`;
      const hasChildren = category.children?.length > 0;
      const isExpanded = !!expandedCategories[pathKey];

      return (
        <div key={pathKey} className="w-full">
          <div
            className={`flex items-center justify-between gap-2 rounded-lg transition-colors ${
              depth === 0
                ? "bg-gray-50 px-3 py-3"
                : "px-3 py-2 hover:bg-gray-50"
            }`}
            style={{ marginLeft: depth > 0 ? `${depth * 12}px` : 0 }}
          >
            <Link
              href={href}
              onClick={closeMobileMenu}
              className={`min-w-0 flex-1 truncate ${
                depth === 0
                  ? "text-[14px] font-semibold text-gray-900"
                  : "text-[13px] font-medium text-gray-600"
              }`}
            >
              {category.name}
            </Link>

            {hasChildren && (
              <button
                type="button"
                onClick={() => toggleCategory(pathKey)}
                aria-label={`Expand ${category.name}`}
                aria-expanded={isExpanded}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-500 transition hover:bg-white hover:text-black"
              >
                <ChevronDown
                  size={17}
                  className={`transition-transform duration-300 ${
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
                <div className="ml-3 mt-1 space-y-1 border-l border-gray-200 pl-2">
                  {renderCategoryItems(
                    category.children,
                    currentPath,
                    depth + 1
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="container px-3 sm:px-4 md:px-6 xl:px-10">
          <div className="flex min-h-[66px] items-center justify-between gap-2 sm:min-h-[74px] lg:min-h-[86px] lg:gap-5 xl:gap-6">
            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-9 shrink-0 items-center justify-center rounded-lg text-gray-800 transition hover:bg-gray-100 lg:hidden"
            >
              <Menu size={23} strokeWidth={1.7} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              aria-label="Rehclub home"
              className="relative h-10 w-[112px] shrink-0 sm:h-12 sm:w-32 lg:h-14 lg:w-36"
            >
              <Image
                src="/logo.png"
                alt="Rehclub"
                fill
                priority
                sizes="(max-width: 640px) 112px, 144px"
                className="object-contain object-center lg:object-left"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden min-w-0 flex-1 justify-center lg:flex">
              <NavLinks />
            </div>

            {/* Desktop Search */}
            <form
              action="/search"
              method="GET"
              role="search"
              className="hidden w-[clamp(210px,22vw,300px)] shrink-0 xl:block"
            >
              <div className="flex h-11 items-center rounded-lg border border-gray-300 bg-white transition-colors focus-within:border-black">
                <Search
                  size={18}
                  strokeWidth={1.7}
                  className="ml-3.5 shrink-0 text-gray-500"
                />

                <input
                  type="search"
                  name="q"
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />

                <button
                  type="submit"
                  aria-label="Submit search"
                  className="mr-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-black text-white transition hover:bg-gray-800"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-3 xl:gap-4">
              {/* Mobile Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen((previous) => !previous)}
                aria-label="Toggle search"
                aria-expanded={isSearchOpen}
                className="flex h-10 w-9 items-center justify-center rounded-lg text-gray-800 transition hover:bg-gray-100 xl:hidden"
              >
                {isSearchOpen ? (
                  <X size={21} />
                ) : (
                  <Search size={21} strokeWidth={1.7} />
                )}
              </button>

              {/* Desktop Order Tracking */}
              <Link
                href="/order/order-tracking"
                className="hidden items-center gap-2 text-gray-700 transition hover:text-black md:flex"
              >
                <Truck size={21} strokeWidth={1.6} />
                <span className="whitespace-nowrap text-sm font-medium leading-5">
                  Order
                  <br />
                  Tracking
                </span>
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                aria-label={`Wishlist, ${wishlistCount} items`}
                className="relative hidden h-10 w-9 items-center justify-center rounded-lg text-gray-800 transition hover:bg-gray-100 sm:flex"
              >
                <Heart size={21} strokeWidth={1.7} />
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
                  {formatCount(wishlistCount)}
                </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label={`Shopping cart, ${cartCount} items`}
                className="relative flex h-10 w-9 items-center justify-center rounded-lg text-gray-800 transition hover:bg-gray-100"
              >
                <ShoppingCart size={21} strokeWidth={1.7} />
                <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-semibold text-white">
                  {formatCount(cartCount)}
                </span>
              </Link>

              {/* Desktop Login */}
              <Link
                href="/login"
                className="hidden h-10 items-center gap-2 rounded-lg border border-gray-300 px-3.5 text-gray-800 transition hover:border-black hover:bg-black hover:text-white lg:flex"
              >
                <UserRound size={17} />
                <span className="text-sm font-medium">Login</span>
              </Link>
            </div>
          </div>

          {/* Mobile Search Panel */}
          <div
            className={`grid transition-all duration-300 ease-in-out xl:hidden ${
              isSearchOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <form
                action="/search"
                method="GET"
                role="search"
                className="border-t border-gray-100 py-3"
              >
                <div className="flex h-11 items-center rounded-lg border border-gray-300 bg-gray-50 px-3 focus-within:border-black focus-within:bg-white">
                  <Search size={18} className="shrink-0 text-gray-400" />

                  <input
                    type="search"
                    name="q"
                    placeholder="Search for products..."
                    aria-label="Search products"
                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
                  />

                  <button
                    type="submit"
                    className="rounded-md bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Overlay */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <aside
          className={`absolute bottom-0 left-0 top-0 flex w-[min(88%,380px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex h-[66px] shrink-0 items-center justify-between border-b border-gray-100 px-5">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="relative h-10 w-28"
            >
              <Image
                src="/logo.png"
                alt="Rehclub"
                fill
                sizes="112px"
                className="object-contain object-left"
              />
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200"
            >
              <X size={19} />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
            {/* Greeting Card */}
            <div className="mt-4 overflow-hidden rounded-2xl bg-black p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <UserRound size={25} strokeWidth={1.6} />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/65">
                    Welcome to Rehclub
                  </p>

                  <h3 className="mt-0.5 text-lg font-bold">
                    Hello there!
                  </h3>

                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-white/90 underline underline-offset-4 transition hover:text-white"
                  >
                    Login / Register
                    <ChevronRight size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                  Shop by Category
                </h3>

                <Link
                  href="/products"
                  onClick={closeMobileMenu}
                  className="text-[11px] font-semibold text-gray-500 transition hover:text-black"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-2">
                {renderCategoryItems(categories)}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-7 border-t border-gray-100 pt-5">
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                Quick Links
              </h3>

              <div className="space-y-1">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black"
                >
                  <Home size={18} className="text-gray-400" />
                  Home
                </Link>

                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black"
                >
                  <Info size={18} className="text-gray-400" />
                  About Us
                </Link>

                <Link
                  href="/faqs"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black"
                >
                  <HelpCircle size={18} className="text-gray-400" />
                  FAQs
                </Link>

                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black"
                >
                  <UserRound size={18} className="text-gray-400" />
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Drawer Bottom Help */}
            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-semibold text-gray-800">
                Need help with your order?
              </p>

              <Link
                href="/order/order-tracking"
                onClick={closeMobileMenu}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-black transition hover:underline"
              >
                Track your order
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white shadow-[0_-3px_12px_rgba(0,0,0,0.05)] lg:hidden">
        <div className="mx-auto grid h-[56px] max-w-[600px] grid-cols-5">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 ${
              pathname === "/"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <Home size={18} strokeWidth={1.7} />
            <span className="text-[9px] font-semibold tracking-wide">
              HOME
            </span>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 ${
              pathname === "/wishlist"
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <span className="relative">
              <Heart size={18} strokeWidth={1.7} />

              <span className="absolute -right-2 -top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-black px-1 text-[8px] font-bold text-white ">
                  {formatCount(wishlistCount)} 
              </span>
            </span>

            <span className="text-[9px] font-semibold tracking-wide">
              WISHLIST
            </span>
          </Link>

          {/* Categories */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 ${
              pathname.startsWith("/products")
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <Grid2X2 size={18} strokeWidth={1.7} />
            <span className="text-[9px] font-semibold tracking-wide">
              CATEGORY
            </span>
          </button>

          {/* Order Tracking */}
          <Link
            href="/order/order-tracking"
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 ${
              pathname.startsWith("/order/order-tracking")
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <Truck size={18} strokeWidth={1.7} />

            <span className="text-[9px] font-semibold tracking-wide">
              TRACK
            </span>
          </Link>

          {/* Account */}
          <Link
            href="/login"
            className={`flex flex-col items-center justify-center gap-0.5 transition-colors duration-300 ${
              pathname.startsWith("/login") ||
              pathname.startsWith("/register")
                ? "bg-black text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <UserRound size={18} strokeWidth={1.7} />

            <span className="text-[9px] font-semibold tracking-wide">
              ACCOUNT
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
