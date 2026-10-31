
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Package,
  CheckCircle2,
  Truck,
  MapPin,
  Clock,
  ShoppingBag,
  ArrowRight,
  PackageCheck,
} from "lucide-react";

const OrderTrack = () => {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  // Temporary demo tracking data
  const demoOrder = {
    id: "RHC-10245",
    date: "01 November 2026",
    total: 2450,
    payment: "Cash on Delivery",
    status: "Shipped",
    estimatedDelivery: "04 November 2026",
    customer: "Customer Name",
    phone: "01XXXXXXXXX",
    address: "Mirpur, Dhaka, Bangladesh",
    items: 2,
    timeline: [
      {
        title: "Order Placed",
        description: "Your order has been successfully placed.",
        date: "01 Nov 2026",
        completed: true,
      },
      {
        title: "Order Confirmed",
        description: "Your order has been confirmed by Rehclub.",
        date: "02 Nov 2026",
        completed: true,
      },
      {
        title: "Shipped",
        description: "Your package has been handed over to the courier.",
        date: "03 Nov 2026",
        completed: true,
      },
      {
        title: "Out for Delivery",
        description: "Your package is on its way to you.",
        date: "Pending",
        completed: false,
      },
      {
        title: "Delivered",
        description: "Your package has been delivered successfully.",
        date: "Pending",
        completed: false,
      },
    ],
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();

    setError("");
    setOrder(null);

    if (!orderId.trim() || !phone.trim()) {
      setError("Please enter your order ID and phone number.");
      return;
    }

    // Demo only. Replace with backend API later.
    if (
      orderId.trim().toUpperCase() === demoOrder.id &&
      phone.trim() === demoOrder.phone
    ) {
      setOrder(demoOrder);
    } else {
      setError("Order not found. Please check your order ID and phone number.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 sm:py-14 lg:py-16">
      <div className="container px-4 sm:px-6">

        {/* Page Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-black text-white">
            <PackageCheck size={27} />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Rehclub Order Service
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            Track Your Order
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
            Stay updated on your order. Enter your order details below to
            check your latest delivery status.
          </p>
        </div>

        {/* Tracking Form */}
        <div className="mx-auto max-w-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-7">
            <h2 className="text-xl font-bold text-gray-950">
              Track Your Package
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Enter your order ID and the phone number used at checkout.
            </p>
          </div>

          <form onSubmit={handleTrackOrder} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">

              {/* Order ID */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Order ID
                </label>

                <div className="relative">
                  <ShoppingBag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. RHC-10245"
                    className="h-12 w-full border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-black focus:bg-white"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>

                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="h-12 w-full border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-black focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 bg-black px-6 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto sm:min-w-48"
            >
              <Search size={17} />
              Track Order
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-5 text-xs text-gray-500">
            <Clock size={14} />
            <span>Need help?</span>
            <Link
              href="/contact"
              className="font-semibold text-black underline underline-offset-4"
            >
              Contact Customer Support
            </Link>
          </div>
        </div>

        {/* Tracking Result */}
        {order && (
          <div className="mx-auto mt-8 max-w-5xl space-y-6">

            {/* Status Header */}
            <div className="border border-gray-200 bg-white p-5 sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Order Number
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-gray-950">
                    #{order.id}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Placed on {order.date}
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="inline-flex items-center gap-2 bg-black px-4 py-2 text-xs font-semibold text-white">
                    <Truck size={15} />
                    {order.status}
                  </span>

                  <p className="mt-3 text-sm text-gray-500">
                    Estimated delivery:{" "}
                    <span className="font-semibold text-gray-900">
                      {order.estimatedDelivery}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">

              {/* Timeline */}
              <div className="border border-gray-200 bg-white p-5 sm:p-8 lg:col-span-2">
                <h3 className="text-lg font-bold text-gray-950">
                  Order Status
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Follow your package delivery progress.
                </p>

                <div className="mt-8">
                  {order.timeline.map((step, index) => (
                    <div key={step.title} className="relative flex gap-4 pb-8 last:pb-0">

                      {index !== order.timeline.length - 1 && (
                        <div
                          className={`absolute left-[15px] top-8 h-full w-px ${
                            step.completed ? "bg-black" : "bg-gray-200"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          step.completed
                            ? "bg-black text-white"
                            : "border border-gray-200 bg-white text-gray-300"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 size={17} />
                        ) : (
                          <Clock size={16} />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className={`text-sm font-bold ${
                            step.completed ? "text-gray-950" : "text-gray-400"
                          }`}>
                            {step.title}
                          </h4>

                          <span className="text-xs text-gray-400">
                            {step.date}
                          </span>
                        </div>

                        <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-6">

                <div className="border border-gray-200 bg-white p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-950">
                    Order Details
                  </h3>

                  <div className="mt-5 space-y-4 text-sm">
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Items</span>
                      <span className="font-medium text-gray-900">
                        {order.items} Items
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Payment</span>
                      <span className="text-right font-medium text-gray-900">
                        {order.payment}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3 border-t border-gray-100 pt-4">
                      <span className="font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="font-bold text-gray-950">
                        ৳{order.total.toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 bg-white p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-950">
                    Delivery Address
                  </h3>

                  <div className="mt-4 flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gray-500" />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {order.customer}
                      </p>

                      <p className="mt-1 break-all text-xs leading-6 text-gray-500">
                        {order.phone}
                        <br />
                        {order.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Link */}
        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-black"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default OrderTrack;
