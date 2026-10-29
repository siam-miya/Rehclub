"use client";

import { FaShoppingBag } from "react-icons/fa";
import { useStore } from "@/stores/useStore";

export default function AddToCartButton({ product }) {
  const addToCart = useStore((state) => state.addToCart);

  const soldOut = !product || product.stock <= 0;

  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => addToCart(product, 1)}
      className="w-full bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <FaShoppingBag className="mr-2 inline" />
      {soldOut ? "Sold Out" : "Add to Cart"}
    </button>
  );
}