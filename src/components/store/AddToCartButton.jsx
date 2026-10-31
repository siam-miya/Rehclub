
"use client";

import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { useStore } from "@/stores/useStore";

const AddToCartButton = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);

  const soldOut = !product || Number(product.stock) <= 0;

  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => addToCart(product, 1)}
      className="flex w-full items-center justify-center gap-2 bg-black px-3 py-2.5 text-xs font-medium text-white transition duration-300 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3 sm:text-sm md:py-3.5"
    >
      <FaShoppingBag className="shrink-0 text-xs sm:text-sm" />

      <span>{soldOut ? "Sold Out" : "Add to Cart"}</span>
    </button>
  );
};

export default AddToCartButton;
