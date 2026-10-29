
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Search,
  ShoppingCart,
  UserRound,
  Truck,
} from "lucide-react";

import NavLinks from "./NavLinks";
import { useStore, selectCartCount } from "@/stores/useStore";

const Navbar = () => {
  const cartCount = useStore(selectCartCount);
  const wishlistCount = useStore((state) => state.wishlist.length);

  const formatCount = (count) => (count > 99 ? "99+" : count);

  const badgeClass =
    "absolute -right-1 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold leading-none text-white";

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white">
      <div className="container px-4 sm:px-6 xl:px-10">
        <div className="flex min-h-[88px] items-center gap-7 xl:gap-9">
          <Link
            href="/"
            aria-label="Rehclub home"
            className="relative h-14 w-36 shrink-0"
          >
            <Image
              src="/logo.png"
              alt="Rehclub"
              fill
              priority
              sizes="144px"
              className="object-contain object-left"
            />
          </Link>

          <div className="ml-20 hidden shrink-0 lg:block">
            <NavLinks />
          </div>

          <form
            action="/search"
            method="GET"
            role="search"
            className="ml-auto hidden min-w-0 max-w-[350px] flex-1 xl:block"
          >
            <div className="flex h-11 items-center rounded-lg border border-gray-300 bg-white transition-colors focus-within:border-black">
              <Search
                size={19}
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
                className="mr-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-black text-white transition-colors hover:bg-gray-800"
              >
                <Search size={17} />
              </button>
            </div>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4 xl:ml-0 xl:gap-5">
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-10 w-8 items-center justify-center text-gray-800 transition-colors hover:text-gray-500 xl:hidden"
            >
              <Search size={22} strokeWidth={1.6} />
            </Link>

            <Link
              href="/order-tracking"
              className="hidden items-center gap-2 text-gray-700 transition-colors hover:text-black md:flex"
            >
              <Truck size={22} strokeWidth={1.6} />
              <span className="whitespace-nowrap text-sm font-medium leading-5">
                Order
                <br />
                Tracking
              </span>
            </Link>

            {/* Wishlist count: 0 হলেও দেখাবে */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative flex h-10 w-8 items-center justify-center text-gray-800 transition-colors hover:text-gray-500"
            >
              <Heart size={22} strokeWidth={1.6} />
              <span className={badgeClass}>
                {formatCount(wishlistCount)}
              </span>
            </Link>

            {/* Cart count: 0 হলেও দেখাবে */}
            <Link
              href="/cart"
              aria-label={`Shopping cart, ${cartCount} items`}
              className="relative flex h-10 w-8 items-center justify-center text-gray-800 transition-colors hover:text-gray-500"
            >
              <ShoppingCart size={22} strokeWidth={1.6} />
              <span className={badgeClass}>
                {formatCount(cartCount)}
              </span>
            </Link>

            <Link
              href="/sign-in"
              className="flex h-10 items-center gap-2 rounded-lg border border-gray-300 px-3.5 text-gray-800 transition-colors hover:border-black hover:bg-black hover:text-white sm:px-4"
            >
              <UserRound size={18} strokeWidth={1.7} />
              <span className="whitespace-nowrap text-sm font-medium">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
