
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  Copy,
} from "lucide-react";

const OrderSuccessPage = () => {
  // Temporary demo order data.
  // Later this data will come from your backend API.

  const order = {
    orderId: "RHC-20261101-001",
    orderDate: "01 November 2026",
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Unpaid",

    customer: {
      name: "Siam Miya",
      email: "customer@example.com",
      phone: "017XXXXXXXX",
    },

    shippingAddress: {
      address: "House 12, Road 5, Mirpur 10",
      area: "Mirpur",
      city: "Dhaka",
      postalCode: "1216",
    },

    products: [
      {
        id: "p001",
        name: "Premium Oversized T-Shirt",
        image: "/products/tshirt.jpg",
        price: 850,
        oldPrice: 1100,
        quantity: 2,
        size: "L",
        color: "Black",
      },
      {
        id: "p002",
        name: "Classic Casual Shirt",
        image: "/products/shirt.jpg",
        price: 1250,
        oldPrice: 1500,
        quantity: 1,
        size: "M",
        color: "White",
      },
    ],

    subtotal: 2950,
    discount: 200,
    deliveryCharge: 70,
    total: 2820,
  };

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order.orderId);
    } catch (error) {
      console.error("Could not copy order ID:", error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 sm:py-14 lg:py-16">
      <div className="container px-4 sm:px-6">

        <div className="mx-auto max-w-5xl">

          {/* Success Message */}
          <div className="mb-8 text-center sm:mb-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-green-600">
              Order Confirmation
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Thank You For Your Order!
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Your order has been successfully placed. We will contact you
              shortly to confirm your order.
            </p>

          </div>

          {/* Order ID Card */}
          <div className="mb-6 border border-gray-200 bg-white p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Your Order Number
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">
                    #{order.orderId}
                  </h2>

                  <button
                    type="button"
                    onClick={copyOrderId}
                    aria-label="Copy order number"
                    className="flex h-8 w-8 items-center justify-center border border-gray-200 text-gray-500 transition hover:border-black hover:text-black"
                  >
                    <Copy size={15} />
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                  Order Date: {order.orderDate}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />

                <div>
                  <p className="text-xs text-gray-400">Order Status</p>
                  <p className="mt-1 text-sm font-bold text-gray-950">
                    {order.status}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Order Products */}
          <div className="mb-6 border border-gray-200 bg-white p-5 sm:p-7">

            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-950 sm:text-xl">
                  Ordered Products
                </h2>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  {order.products.length} products in your order
                </p>
              </div>

              <ShoppingBag className="text-gray-400" size={22} />
            </div>

            <div className="divide-y divide-gray-100">
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 py-5 first:pt-0 last:pb-0"
                >

                  {/* Product Image */}
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-gray-100 sm:h-28 sm:w-24">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 80px, 96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-5 text-gray-950 sm:text-base">
                        {product.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span>Size: {product.size}</span>
                        <span>Color: {product.color}</span>
                        <span>Qty: {product.quantity}</span>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-950">
                          ৳{product.price.toLocaleString("en-BD")}
                        </span>

                        {product.oldPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ৳{product.oldPrice.toLocaleString("en-BD")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-[11px] text-gray-400">Total</p>
                      <p className="mt-1 text-sm font-bold text-gray-950">
                        ৳{(product.price * product.quantity).toLocaleString("en-BD")}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer & Summary */}
          <div className="grid gap-6 lg:grid-cols-2">

            {/* Customer Information */}
            <div className="space-y-6">

              <div className="border border-gray-200 bg-white p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-gray-100">
                    <MapPin size={19} />
                  </div>

                  <h2 className="text-lg font-bold text-gray-950">
                    Shipping Address
                  </h2>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <p className="font-semibold text-gray-950">
                    {order.customer.name}
                  </p>

                  <p className="leading-6 text-gray-500">
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.area},{" "}
                    {order.shippingAddress.city}
                    <br />
                    Postal Code: {order.shippingAddress.postalCode}
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 bg-white p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center bg-gray-100">
                    <Phone size={19} />
                  </div>

                  <h2 className="text-lg font-bold text-gray-950">
                    Customer Information
                  </h2>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="shrink-0 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {order.customer.phone}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={16} className="shrink-0 text-gray-400" />
                    <p className="break-all text-sm text-gray-600">
                      {order.customer.email}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Order Summary */}
            <div className="h-fit border border-gray-200 bg-white p-5 sm:p-7">

              <h2 className="text-lg font-bold text-gray-950 sm:text-xl">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-sm">

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ৳{order.subtotal.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Discount</span>
                  <span className="font-medium text-green-600">
                    - ৳{order.discount.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Delivery Charge</span>
                  <span className="font-medium text-gray-900">
                    ৳{order.deliveryCharge.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <div className="flex justify-between gap-3">
                    <span className="font-bold text-gray-950">
                      Total Amount
                    </span>

                    <span className="text-xl font-bold text-gray-950">
                      ৳{order.total.toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>

              </div>

              {/* Payment Information */}
              <div className="mt-7 border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <CreditCard size={19} className="text-gray-500" />

                  <div>
                    <p className="text-xs text-gray-400">
                      Payment Method
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
                  <span className="text-xs text-gray-500">
                    Payment Status
                  </span>

                  <span className="text-xs font-semibold text-amber-600">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Delivery Information */}
          <div className="mt-6 flex gap-4 border border-gray-200 bg-white p-5 sm:p-7">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-black text-white">
              <Truck size={21} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-950">
                What Happens Next?
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-500 sm:text-sm">
                Our team will review and confirm your order. Once your
                package is shipped, you can track its delivery progress
                using your order number.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href={`/track-order?orderId=${encodeURIComponent(order.orderId)}`}
              className="flex h-12 items-center justify-center gap-2 bg-black px-7 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Package size={17} />
              Track Your Order
            </Link>

            <Link
              href="/products"
              className="flex h-12 items-center justify-center gap-2 border border-gray-300 bg-white px-7 text-sm font-semibold text-gray-900 transition hover:border-black hover:bg-gray-50"
            >
              Continue Shopping
              <ArrowRight size={17} />
            </Link>

          </div>

          <p className="mt-8 text-center text-xs leading-6 text-gray-400">
            Thank you for shopping with Rehclub.
            <br />
            We appreciate your trust in us.
          </p>

        </div>
      </div>
    </section>
  );
};

export default OrderSuccessPage;
