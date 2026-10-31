
"use client";

import { useState } from "react";
import { useStore } from "@/stores/useStore";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  deliveryArea: "inside-dhaka",
  address: "",
  note: "",
};

const inputClass =
  "mt-2 h-12 w-full min-w-0 border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black";

const labelClass = "block text-xs font-semibold text-gray-800 sm:text-sm";

const deliveryOptions = [
  {
    value: "inside-dhaka",
    label: "Inside Dhaka",
    charge: 70,
  },
  {
    value: "outside-dhaka",
    label: "Outside Dhaka",
    charge: 120,
  },
];

const CheckoutFrom = () => {
  const cart = useStore((state) => state.cart);
  const setDeliveryArea = useStore((state) => state.setDeliveryArea);
  const deliveryArea = useStore((state) => state.deliveryArea);

  const [form, setForm] = useState({
    ...initialForm,
    deliveryArea,
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "deliveryArea") {
      setDeliveryArea(value);
    }

    setError("");
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (cart.length === 0) {
      setError("Your cart is empty. Please add products first.");
      return;
    }

    const phone = form.phone.replace(/[\s-]/g, "");

    if (!/^01[3-9]\d{8}$/.test(phone)) {
      setError("Please enter a valid Bangladeshi phone number.");
      return;
    }

    if (!form.name.trim() || !form.address.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setMessage(
      "Your information is valid. Order placement will be available soon."
    );
  };

  return (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-8 sm:space-y-10">

      {/* Customer Information */}
      <section>
        <div className="mb-6 border-b border-gray-200 pb-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            Step 01
          </p>

          <h2 className="text-lg font-bold text-gray-950 sm:text-xl">
            Customer Information
          </h2>

          <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm">
            Enter your details for delivery.
          </p>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">

          {/* Full Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name <span className="text-red-600">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClass}
              required
              maxLength={100}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number <span className="text-red-600">*</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className={inputClass}
              required
              maxLength={20}
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className={labelClass}>
              Gmail / Email Address{" "}
              <span className="font-normal text-gray-400">(Optional)</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={inputClass}
              maxLength={150}
            />
          </div>

          {/* Delivery Location */}
          <div className="sm:col-span-2">
            <p className={labelClass}>
              Delivery Location <span className="text-red-600">*</span>
            </p>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {deliveryOptions.map((option) => {
                const selected = form.deliveryArea === option.value;

                return (
                  <label
                    key={option.value}
                    className={`flex min-h-[82px] cursor-pointer items-center justify-between gap-3 border p-4 transition duration-200 ${
                      selected
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-gray-800 hover:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryArea"
                      value={option.value}
                      checked={selected}
                      onChange={handleChange}
                      className="sr-only"
                    />

                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {option.label}
                      </span>

                      <span
                        className={`mt-1 block text-xs ${
                          selected ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Delivery: ৳{option.charge}
                      </span>
                    </span>

                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
                        selected
                          ? "border-white bg-white text-black"
                          : "border-gray-300"
                      }`}
                    >
                      {selected && (
                        <span className="text-xs font-bold">✓</span>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label htmlFor="address" className={labelClass}>
              Full Delivery Address{" "}
              <span className="text-red-600">*</span>
            </label>

            <textarea
              id="address"
              name="address"
              autoComplete="street-address"
              value={form.address}
              onChange={handleChange}
              placeholder="House, road, area, city and postal details"
              className="mt-2 min-h-28 w-full resize-y border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              required
              maxLength={500}
            />
          </div>

          {/* Order Note */}
          <div className="sm:col-span-2">
            <label htmlFor="note" className={labelClass}>
              Order Note{" "}
              <span className="font-normal text-gray-400">(Optional)</span>
            </label>

            <textarea
              id="note"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Any special instructions for your order?"
              className="mt-2 min-h-24 w-full resize-y border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
              maxLength={500}
            />
          </div>
        </div>
      </section>

      {/* Payment Method */}
      <section>
        <div className="mb-5 border-b border-gray-200 pb-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
            Step 02
          </p>

          <h2 className="text-lg font-bold text-gray-950 sm:text-xl">
            Payment Method
          </h2>
        </div>

        <div className="border border-black bg-gray-50/60 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-black bg-black text-white">
              <span className="text-xs">✓</span>
            </span>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-950">
                Cash on Delivery
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                Pay when your order arrives at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Messages */}
      {error && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700 sm:p-4 sm:text-sm"
        >
          {error}
        </p>
      )}

      {message && (
        <p
          role="status"
          className="border border-green-200 bg-green-50 p-3 text-xs leading-5 text-green-800 sm:p-4 sm:text-sm"
        >
          {message}
        </p>
      )}

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={cart.length === 0}
          className="flex min-h-13 w-full cursor-pointer items-center justify-center border border-black bg-black px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-500 sm:min-h-14 sm:text-sm"
        >
          Place Order
        </button>

        <p className="mt-4 text-center text-[10px] leading-5 text-gray-400 sm:text-xs">
          Please make sure your name, phone number and delivery address are
          correct.
        </p>
      </div>
    </form>
  );
};

export default CheckoutFrom;
