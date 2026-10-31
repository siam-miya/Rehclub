
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  ShieldCheck,
  X,
} from "lucide-react";

import { useStore, selectCartSubtotal } from "@/stores/useStore";

const formatPrice = (amount) =>
  `৳${Number(amount || 0).toLocaleString("en-BD")}`;

const Cart = () => {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const subtotal = useStore(selectCartSubtotal);

  const deliveryEstimate = 0;
  const total = subtotal + deliveryEstimate;

  return (
    <main className="min-h-screen bg-gray-50/50 py-6 sm:py-8 lg:py-10">
      <div className="container w-full px-4 sm:px-6 lg:px-10">

        {/* Breadcrumb & Heading */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 sm:text-xs">
            <Link href="/" className="transition hover:text-black">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">
              Shopping Cart
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-900 sm:text-3xl">
                Shopping Cart
              </h1>

              {cart.length > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  {cart.length} {cart.length === 1 ? "product" : "products"} in your cart
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <section className="border border-gray-200 bg-white px-5 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-gray-100 text-gray-500">
              <ShoppingBag size={28} strokeWidth={1.5} />
            </div>

            <h2 className="mt-5 text-lg font-bold uppercase text-gray-900">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-gray-500 sm:text-sm">
              Looks like you have not added anything to your cart yet.
              Start shopping and discover something you love.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 bg-black px-6 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gray-800"
            >
              Continue Shopping
              <ArrowRight size={14} />
            </Link>
          </section>
        ) : (
          <div className="grid min-w-0 grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-7 xl:grid-cols-[minmax(0,1fr)_370px] xl:gap-8">

            {/* Cart Products */}
            <section className="min-w-0">

              {/* Desktop Table */}
              <div className="hidden overflow-hidden border border-gray-200 bg-white md:block">
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[650px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-600 lg:text-[11px]">
                        <th className="px-4 py-4">Product</th>
                        <th className="px-3 py-4 text-center">Price</th>
                        <th className="px-3 py-4 text-center">Quantity</th>
                        <th className="px-3 py-4 text-right">Subtotal</th>
                        <th className="px-3 py-4 text-center">Delete</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-xs">
                      {cart.map((item) => (
                        <tr
                          key={item.cartItemId}
                          className="transition-colors hover:bg-gray-50/50"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-16 w-14 shrink-0 border border-gray-200 bg-gray-50">
                                <Image
                                  src={item.image || "/logo.png"}
                                  alt={item.name || "Product"}
                                  fill
                                  unoptimized
                                  sizes="56px"
                                  className="object-contain p-1"
                                />
                              </div>

                              <div className="min-w-0">
                                <h2 className="line-clamp-2 text-xs font-semibold text-gray-900 lg:text-sm">
                                  {item.name}
                                </h2>

                                {item.color && (
                                  <p className="mt-1 text-[11px] text-gray-500">
                                    Color: {item.color}
                                  </p>
                                )}

                                {item.size && (
                                  <p className="mt-1 text-[11px] text-gray-500">
                                    Size: {item.size}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-4 text-center font-medium text-gray-700">
                            {formatPrice(item.price)}
                          </td>

                          <td className="px-3 py-4">
                            <div className="flex justify-center">
                              <div className="inline-flex items-center border border-gray-300 bg-white">
                                <button
                                  type="button"
                                  aria-label="Decrease quantity"
                                  disabled={item.quantity <= 1}
                                  onClick={() =>
                                    updateQuantity(
                                      item.cartItemId,
                                      item.quantity - 1
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  <Minus size={12} />
                                </button>

                                <span className="min-w-[30px] text-center text-xs font-bold tabular-nums text-gray-900">
                                  {String(item.quantity).padStart(2, "0")}
                                </span>

                                <button
                                  type="button"
                                  aria-label="Increase quantity"
                                  disabled={item.quantity >= 99}
                                  onClick={() =>
                                    updateQuantity(
                                      item.cartItemId,
                                      item.quantity + 1
                                    )
                                  }
                                  className="flex h-8 w-8 items-center justify-center bg-black text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-4 text-right font-bold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </td>

                          <td className="px-3 py-4 text-center">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.cartItemId)}
                              aria-label={`Remove ${item.name} from cart`}
                              className="inline-flex items-center justify-center p-2 text-gray-400 transition hover:text-red-600"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-gray-700 transition hover:text-black"
                  >
                    <ArrowLeft size={14} />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Mobile Product Cards */}
              <div className="space-y-3 md:hidden">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="border border-gray-200 bg-white p-3 sm:p-4"
                  >
                    <div className="flex gap-3 sm:gap-4">

                      {/* Product Image */}
                      <div className="relative h-[110px] w-[85px] shrink-0 border border-gray-200 bg-gray-50 sm:h-[125px] sm:w-[100px]">
                        <Image
                          src={item.image || "/logo.png"}
                          alt={item.name || "Product"}
                          fill
                          unoptimized
                          sizes="100px"
                          className="object-contain p-1.5"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="line-clamp-2 text-xs font-bold leading-5 text-gray-900 sm:text-sm">
                            {item.name}
                          </h2>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartItemId)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="shrink-0 p-1 text-gray-400 transition hover:text-red-600"
                          >
                            <X size={17} />
                          </button>
                        </div>

                        {item.color && (
                          <p className="mt-1 text-[11px] text-gray-500">
                            Color: {item.color}
                          </p>
                        )}

                        {item.size && (
                          <p className="mt-1 text-[11px] text-gray-500">
                            Size: {item.size}
                          </p>
                        )}

                        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                          <div>
                            <p className="text-[10px] text-gray-400">
                              Unit Price
                            </p>
                            <p className="mt-0.5 text-sm font-bold text-gray-900">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          {/* Quantity */}
                          <div className="inline-flex h-8 items-center border border-gray-300">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                updateQuantity(
                                  item.cartItemId,
                                  item.quantity - 1
                                )
                              }
                              className="flex h-full w-8 items-center justify-center text-gray-600 transition hover:bg-gray-100 disabled:opacity-40"
                            >
                              <Minus size={11} />
                            </button>

                            <span className="min-w-[28px] text-center text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              aria-label="Increase quantity"
                              disabled={item.quantity >= 99}
                              onClick={() =>
                                updateQuantity(
                                  item.cartItemId,
                                  item.quantity + 1
                                )
                              }
                              className="flex h-full w-8 items-center justify-center bg-black text-white transition hover:bg-gray-800 disabled:opacity-40"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Subtotal */}
                    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="text-xs font-medium text-gray-500">
                        Item Subtotal
                      </span>

                      <span className="text-sm font-bold text-black">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="border border-gray-200 bg-white px-4 py-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-gray-700 transition hover:text-black"
                  >
                    <ArrowLeft size={14} />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </section>

            {/* Order Summary */}
            <aside className="w-full border border-gray-200 bg-white p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="border-b border-gray-200 pb-4 text-sm font-bold uppercase tracking-wider text-gray-900">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4 text-xs">
                <div className="flex items-center justify-between gap-3 text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3 text-gray-600">
                  <span>Delivery</span>
                  <span className="max-w-[150px] text-right font-medium text-gray-900">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-dashed border-gray-200" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold uppercase text-gray-900">
                  Total
                </span>

                <span className="text-lg font-bold text-gray-900 sm:text-xl">
                  {formatPrice(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 bg-black px-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gray-800"
              >
                Proceed to Checkout
                <ArrowRight size={15} />
              </Link>

              <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                <div className="flex items-start gap-2.5 text-[11px] leading-5 text-gray-500">
                  <Truck size={15} className="mt-0.5 shrink-0" />
                  <span>Delivery options confirmed at checkout</span>
                </div>

                <div className="flex items-start gap-2.5 text-[11px] leading-5 text-gray-500">
                  <ShieldCheck size={15} className="mt-0.5 shrink-0" />
                  <span>Review your order securely</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
