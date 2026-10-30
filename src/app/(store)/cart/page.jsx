
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
    <main className="min-h-screen bg-gray-50/50 py-8 sm:py-10">
      <div className="container w-full px-4 sm:px-6 lg:px-8">

        <div className="mb-6">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="transition hover:text-black">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900">Shopping Cart</span>
          </div>

          <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-900 sm:text-3xl">
            Shopping Cart
          </h1>

          {cart.length > 0 && (
            <p className="mt-2 text-xs text-gray-500">
              {cart.length} {cart.length === 1 ? "product" : "products"} in your cart
            </p>
          )}
        </div>

        {cart.length === 0 ? (
          <section className="border border-gray-200 bg-white px-5 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center bg-gray-100 text-gray-500">
              <ShoppingBag size={28} strokeWidth={1.5} />
            </div>

            <h2 className="mt-4 text-lg font-bold uppercase text-gray-900">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-500">
              Looks like you have not added anything to your cart yet.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 bg-black px-6 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gray-800"
            >
              Continue Shopping
              <ArrowRight size={14} />
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">

            <section className="min-w-0 overflow-hidden border border-gray-200 bg-white">
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3 text-center">Price</th>
                      <th className="px-4 py-3 text-center">Quantity</th>
                      <th className="px-4 py-3 text-right">Subtotal</th>
                      <th className="px-4 py-3 text-center">Delete</th>
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

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.cartItemId)}
                                aria-label={`Remove ${item.name} from cart`}
                                title="Remove item"
                                className="absolute -left-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow-sm transition hover:bg-red-700"
                              >
                                <X size={12} strokeWidth={3} />
                              </button>

                              <Image
                                src={item.image || "/logo.png"}
                                alt={item.name || "Product"}
                                fill
                                unoptimized
                                sizes="56px"
                                className="object-contain p-1"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h2 className="line-clamp-2 text-xs font-medium text-gray-900 sm:text-sm">
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

                        <td className="px-4 py-4 text-center font-medium text-gray-700">
                          {formatPrice(item.price)}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center">
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

                              <span className="min-w-[32px] text-center text-xs font-bold tabular-nums text-gray-900">
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

                        <td className="px-4 py-4 text-right font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </td>

                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartItemId)}
                            aria-label={`Delete ${item.name} from cart`}
                            title="Remove"
                            className="inline-flex items-center justify-center p-1.5 text-gray-400 transition hover:text-red-600"
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
            </section>

            <aside className="w-full border border-gray-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="border-b border-gray-200 pb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
                Order Summary
              </h2>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-center justify-between gap-3 text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-gray-600">
                  <span>Delivery</span>
                  <span className="text-right font-medium text-gray-900">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="my-4 border-t border-dashed border-gray-200" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold uppercase text-gray-900">
                  Total
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex h-11 w-full items-center justify-center gap-2 bg-black px-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gray-800"
              >
                Proceed to Checkout
                <ArrowRight size={15} />
              </Link>

              <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                <div className="flex items-start gap-2 text-[11px] leading-5 text-gray-500">
                  <Truck size={14} className="mt-0.5 shrink-0" />
                  <span>Delivery options confirmed at checkout</span>
                </div>

                <div className="flex items-start gap-2 text-[11px] leading-5 text-gray-500">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0" />
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
