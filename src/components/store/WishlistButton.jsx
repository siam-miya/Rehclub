"use client";

import { FaHeart } from "react-icons/fa";
import { useStore } from "@/stores/useStore";

export default function WishlistButton({ product }) {
  const isWishlisted = useStore((state) =>
    state.wishlist.some((item) => item.id === product.id)
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
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
    >
      <FaHeart
        className={isWishlisted ? "text-red-500" : "text-gray-500"}
      />
    </button>
  );
}