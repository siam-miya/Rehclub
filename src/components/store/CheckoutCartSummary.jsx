
"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { useStore, selectCartSubtotal } from "@/stores/useStore";

const formatPrice = (amount) =>
  `৳${Number(amount || 0).toLocaleString("en-BD")}`;

const getProductHref = (product) => {
  if (!product?.slug) return "/products";

  const categoryPath = Array.isArray(product.categoryPath)
    ? product.categoryPath
    : [];

  return `/products/categories/${[...categoryPath, product.slug].join("/")}`;
};

const CheckoutCartSummary = () => {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const subtotal = useStore(selectCartSubtotal);
  const deliveryArea = useStore((state) => state.deliveryArea);

  const deliveryCharge =
    deliveryArea === "inside-dhaka" ? 70 : 120;

  const total = subtotal + (cart.length > 0 ? deliveryCharge : 0);

  return (
    <div className="border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-5">
        <h2 className="text-lg font-semibold text-gray-950">
          Order Summary
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {cart.length} {cart.length === 1 ? "product" : "products"} in your bag
        </p>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart */
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-gray-600">
            Your shopping bag is empty.
          </p>

          <Link
            href="/products"
            className="mt-5 inline-flex cursor-pointer border border-black bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Products */}
          <div className="max-h-[420px] space-y-5 overflow-y-auto p-5">
            {cart.map((item) => {
              const itemId =
                item.cartItemId ||
                JSON.stringify([
                  String(item.productId ?? item.id ?? ""),
                  String(item.color || ""),
                  String(item.size || ""),
                ]);

              return (
                <div
                  key={itemId}
                  className="flex items-start gap-4 border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
                >
                  {/* Product Image */}
                  <Link
                    href={getProductHref(item)}
                    aria-label={`View ${item.name}`}
                    className="relative h-24 w-20 shrink-0 cursor-pointer overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={item.image || "/logo.png"}
                      alt={item.name || "Product"}
                      fill
                      unoptimized
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={getProductHref(item)}
                      className="line-clamp-2 cursor-pointer text-sm font-medium text-gray-900 transition hover:text-gray-500"
                    >
                      {item.name}
                    </Link>

                    {/* Color */}
                    {item.color && (
                      <p className="mt-2 text-xs text-gray-500">
                        Color: {item.color}
                      </p>
                    )}

                    {/* Size */}
                    {item.size && (
                      <p className="mt-1 text-xs text-gray-500">
                        Size: {item.size}
                      </p>
                    )}

                    <p className="mt-2 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-gray-950">
                      {formatPrice(
                        Number(item.price) * Number(item.quantity)
                      )}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(itemId)}
                    aria-label={`Remove ${item.name} from cart`}
                    title="Remove product"
                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <FaTimes size={15} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Price Summary */}
          <div className="border-t border-gray-200 p-5">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-gray-600">Subtotal</span>

              <span className="font-medium text-gray-950">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-sm">
              <span className="text-gray-600">Delivery Charge</span>

              <span className="font-medium text-gray-950">
                {formatPrice(deliveryCharge)}
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              {deliveryArea === "inside-dhaka"
                ? "Inside Dhaka delivery"
                : "Outside Dhaka delivery"}
            </p>

            {/* Total */}
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-200 pt-5">
              <span className="font-semibold text-gray-950">
                Total
              </span>

              <span className="text-xl font-semibold text-gray-950">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutCartSummary;
