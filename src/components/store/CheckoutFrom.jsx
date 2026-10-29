
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
  "mt-2 h-12 w-full border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black";

const labelClass = "block text-sm font-medium text-gray-800";

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
    <form onSubmit={handleSubmit} className="space-y-7">
      <section>
        <div className="mb-5 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-950">
            Customer Information
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Enter your details for delivery.
          </p>
        </div>

        <div className="space-y-5">
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

          <div>
            <label htmlFor="email" className={labelClass}>
              Gmail / Email Address{" "}
              <span className="text-gray-400">(Optional)</span>
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
          <div>
            <p className={labelClass}>
              Delivery Location <span className="text-red-600">*</span>
            </p>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {deliveryOptions.map((option) => {
                const selected = form.deliveryArea === option.value;

                return (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-center justify-between border p-4 transition ${
                      selected
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-gray-800 hover:border-black"
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

                    <span>
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
                      className={`flex h-5 w-5 items-center justify-center border ${
                        selected
                          ? "border-white bg-white text-black"
                          : "border-gray-400"
                      }`}
                    >
                      {selected && (
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path
                            d="m4 10 4 4 8-8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
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
              className="mt-2 min-h-28 w-full resize-y border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              required
              maxLength={500}
            />
          </div>

          <div>
            <label htmlFor="note" className={labelClass}>
              Order Note{" "}
              <span className="text-gray-400">(Optional)</span>
            </label>

            <textarea
              id="note"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Any special instructions for your order?"
              className="mt-2 min-h-24 w-full resize-y border border-gray-300 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              maxLength={500}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="border border-gray-200 p-4">
          <p className="text-sm font-semibold text-gray-950">
            Payment Method
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Cash on Delivery
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Pay when your order arrives.
          </p>
        </div>
      </section>

      {error && (
        <p
          role="alert"
          className="border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {message && (
        <p
          role="status"
          className="border border-green-200 bg-green-50 p-4 text-sm text-green-800"
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={cart.length === 0}
        className="flex min-h-14 w-full cursor-pointer items-center justify-center border border-black bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-200 disabled:text-gray-500"
      >
        Place Order
      </button>

      <p className="text-center text-xs leading-5 text-gray-500">
        Please make sure your name, phone number and delivery address are
        correct.
      </p>
    </form>
  );
};

export default CheckoutFrom;
