"use client";

import React from "react";
import { FaHeart } from "react-icons/fa";
import { useStore } from "@/stores/useStore";

const WishlistButton = ({ product }) => {
  const isWishlisted = useStore((state) =>
    state.wishlist.some(
      (item) => String(item.id) === String(product.id)
    )
  );

  const toggleWishlist = useStore(
    (state) => state.toggleWishlist
  );

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(product)}
      aria-label={
        isWishlisted ? "Remove from wishlist" : "Add to wishlist"
      }
      aria-pressed={isWishlisted}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm transition duration-200 hover:bg-gray-100 sm:h-10 sm:w-10"
    >
      <FaHeart
        className={`text-[12px] transition-colors duration-200 sm:text-sm ${
          isWishlisted ? "text-red-500" : "text-gray-500"
        }`}
      />
    </button>
  );
};

export default WishlistButton;
