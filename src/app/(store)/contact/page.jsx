
"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "../../../components/shared/PageHero";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

import { ArrowRight, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const whatsappNumber = "8801XXXXXXXXX";

    const message = `
Hello Rehclub!

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
    `;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: FaPhoneAlt,
      title: "Phone Number",
      details: "01XXXXXXXXX",
      link: "tel:+8801XXXXXXXXX",
    },
    {
      icon: FaEnvelope,
      title: "Email Address",
      details: "support@rehclub.com",
      link: "mailto:support@rehclub.com",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Our Location",
      details: "Dhaka, Bangladesh",
      link: null,
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero */}
      <PageHero
        title="Contact Us"
        subtitle="Have a question or need assistance? We are always happy to hear from you."
        eyebrow="Get In Touch"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
        position="center"
      />

      {/* Contact Section */}
      <section className="container px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

          {/* Left Information */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
              Contact Information
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-black sm:text-4xl">
              Let's Start a
              <br />
              Conversation.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              Whether you have a question about our products,
              your order, or anything else, our team is ready
              to help you.
            </p>

            {/* Contact Details */}
            <div className="mt-10 space-y-7">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-gray-100 text-black">
                      <Icon size={17} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-black">
                        {item.title}
                      </h3>

                      {item.link ? (
                        <a
                          href={item.link}
                          className="mt-1 inline-block text-sm text-gray-500 transition-colors hover:text-black"
                        >
                          {item.details}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">
                          {item.details}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Business Hours */}
            <div className="mt-10 border-t border-gray-200 pt-7">
              <div className="flex items-center gap-3">
                <FaClock className="text-gray-500" size={17} />

                <h3 className="text-sm font-bold text-black">
                  Business Hours
                </h3>
              </div>

              <div className="mt-4 flex justify-between gap-4 text-sm">
                <span className="text-gray-500">
                  Saturday – Thursday
                </span>
                <span className="font-medium text-black">
                  10 AM – 10 PM
                </span>
              </div>

              <div className="mt-3 flex justify-between gap-4 text-sm">
                <span className="text-gray-500">
                  Friday
                </span>
                <span className="font-medium text-red-500">
                  Closed
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-gray-200 p-5 sm:p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Fill out the form below and we'll get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-700">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="h-12 w-full border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-700">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="h-12 w-full border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
                  />
                </div>
              </div>

              {/* Phone + Subject */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-700">
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    required
                    className="h-12 w-full border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-700">
                    Subject *
                  </label>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-12 w-full border border-gray-200 bg-white px-4 text-sm text-gray-600 outline-none transition focus:border-black"
                  >
                    <option value="">Select a subject</option>
                    <option value="Product Inquiry">
                      Product Inquiry
                    </option>
                    <option value="Order Related">
                      Order Related
                    </option>
                    <option value="Delivery Related">
                      Delivery Related
                    </option>
                    <option value="Return & Exchange">
                      Return & Exchange
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-700">
                  Your Message *
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={6}
                  required
                  className="w-full resize-none border border-gray-200 bg-white p-4 text-sm outline-none transition focus:border-black"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center gap-2 bg-black px-6 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
              >
                {isSubmitting ? "Please Wait..." : "Send Message"}
                <Send size={15} />
              </button>

              <p className="text-center text-xs text-gray-400">
                Your information will only be used to respond to your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="bg-[#F5F5F5]">
        <div className="container flex flex-col items-center justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:px-10">
          <div>
            <h2 className="text-xl font-bold text-black sm:text-2xl">
              Need help with your order?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Visit our order tracking page to check your order status.
            </p>
          </div>

          <Link
            href="/order/order-tracking"
            className="inline-flex shrink-0 items-center gap-2 bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Track Your Order
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
