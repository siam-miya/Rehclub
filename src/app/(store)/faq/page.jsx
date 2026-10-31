
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaChevronDown,
  FaChevronRight,
  FaSearch,
  FaShoppingBag,
  FaTruck,
  FaCreditCard,
  FaUndoAlt,
  FaUser,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [openQuestion, setOpenQuestion] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "All Questions", icon: <FaQuestionCircle /> },
    { name: "Orders", icon: <FaShoppingBag /> },
    { name: "Shipping", icon: <FaTruck /> },
    { name: "Payment", icon: <FaCreditCard /> },
    { name: "Returns", icon: <FaUndoAlt /> },
    { name: "Account", icon: <FaUser /> },
  ];

  const faqs = [
    {
      id: 1,
      category: "Orders",
      question: "How can I place an order on Rehclub?",
      answer:
        "Browse our products, select your preferred size and color, and add the item to your cart. Then proceed to checkout, provide your delivery information, and confirm your order.",
    },
    {
      id: 2,
      category: "Orders",
      question: "Can I modify or cancel my order?",
      answer:
        "If you need to modify or cancel an order, please contact our support team as soon as possible. Changes may not be possible once the order has been processed or handed over to the courier.",
    },
    {
      id: 3,
      category: "Orders",
      question: "How can I track my order?",
      answer:
        "You can use the Order Tracking option on our website to check your order status. You may need your order ID or the tracking information provided by our team.",
    },
    {
      id: 4,
      category: "Orders",
      question: "How do I know if my order is confirmed?",
      answer:
        "After placing your order, you may receive a confirmation through the contact information you provided. Our team may also contact you to verify your order details.",
    },
    {
      id: 5,
      category: "Shipping",
      question: "How long does delivery take?",
      answer:
        "Delivery time depends on your location and courier service. Our team will provide an estimated delivery timeline when your order is confirmed.",
    },
    {
      id: 6,
      category: "Shipping",
      question: "Do you deliver outside Dhaka?",
      answer:
        "Yes, Rehclub aims to deliver products across Bangladesh, including locations outside Dhaka, subject to courier service availability.",
    },
    {
      id: 7,
      category: "Shipping",
      question: "How much is the delivery charge?",
      answer:
        "Delivery charges may vary depending on your delivery location. The applicable charge will be shown during checkout or communicated before order confirmation.",
    },
    {
      id: 8,
      category: "Payment",
      question: "What payment methods do you accept?",
      answer:
        "Rehclub may offer Cash on Delivery (COD) and supported online payment methods. Available payment options will be displayed during checkout.",
    },
    {
      id: 9,
      category: "Payment",
      question: "Can I pay after receiving my order?",
      answer:
        "If Cash on Delivery is available for your location and order, you can pay the courier representative when your package is delivered.",
    },
    {
      id: 10,
      category: "Payment",
      question: "Is online payment secure?",
      answer:
        "Online payments are processed through the available payment service providers. Please follow the payment provider's instructions and never share your PIN or OTP with anyone.",
    },
    {
      id: 11,
      category: "Returns",
      question: "Can I return or exchange a product?",
      answer:
        "Return and exchange requests are subject to Rehclub's Return & Exchange Policy. Please review the policy and contact our support team before sending a product back.",
    },
    {
      id: 12,
      category: "Returns",
      question: "What should I do if I receive a damaged product?",
      answer:
        "Please contact our support team as soon as possible with your order details and clear photos or videos of the issue. Our team will guide you through the next steps.",
    },
    {
      id: 13,
      category: "Returns",
      question: "Can I exchange an item for a different size?",
      answer:
        "Size exchanges may be possible depending on product availability and our exchange policy. Contact our support team to check the available options.",
    },
    {
      id: 14,
      category: "Account",
      question: "Do I need an account to place an order?",
      answer:
        "Account requirements may depend on the checkout options available on our website. If guest checkout is enabled, you can place an order without creating an account.",
    },
    {
      id: 15,
      category: "Account",
      question: "How can I contact Rehclub?",
      answer:
        "You can reach our team through the Contact Us page on our website. Please include your order ID when asking about an existing order.",
    },
  ];

  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All Questions" ||
        faq.category === activeCategory;

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenQuestion(null);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setOpenQuestion(null);
  };

  return (
    <main className="bg-white text-[#171717]">
      {/* Hero Section */}
      <section className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
        <div className="container px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              Have questions about shopping with Rehclub? Find quick answers
              about orders, payments, delivery, returns, and more.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 border border-[#E5E5E5] bg-white px-4 py-3 transition focus-within:border-black">
              <FaSearch className="shrink-0 text-gray-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search your question..."
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  className="shrink-0 cursor-pointer text-xs font-semibold text-gray-500 transition hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 sm:text-sm">
              <Link href="/" className="transition hover:text-black">
                Home
              </Link>
              <FaChevronRight className="text-[9px]" />
              <span className="font-semibold text-black">FAQ</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            {/* Categories */}
            <aside>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">
                Browse By Category
              </h2>

              <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                {categories.map((category) => {
                  const isActive = activeCategory === category.name;

                  return (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => handleCategoryChange(category.name)}
                      className={`flex shrink-0 cursor-pointer items-center gap-3 whitespace-nowrap rounded-lg border px-4 py-3 text-left text-sm font-medium transition lg:w-full ${
                        isActive
                          ? "border-black bg-black text-white"
                          : "border-[#E5E5E5] bg-white text-gray-600 hover:border-black hover:text-black"
                      }`}
                    >
                      <span>{category.icon}</span>
                      {category.name}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 hidden rounded-xl bg-[#F5F5F5] p-5 lg:block">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
                  <FaEnvelope />
                </div>

                <h3 className="mt-4 text-base font-bold">
                  Still Need Help?
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Can't find the answer you're looking for? Our support team
                  is ready to help.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold transition hover:gap-3"
                >
                  Contact Us
                  <FaChevronRight className="text-[10px]" />
                </Link>
              </div>
            </aside>

            {/* Questions */}
            <div className="min-w-0">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold sm:text-2xl">
                    {activeCategory === "All Questions"
                      ? "All Questions"
                      : activeCategory}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {filteredFAQs.length} questions found
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {filteredFAQs.length > 0 ? (
                  filteredFAQs.map((faq) => {
                    const isOpen = openQuestion === faq.id;

                    return (
                      <div
                        key={faq.id}
                        className={`overflow-hidden rounded-lg border transition ${
                          isOpen
                            ? "border-black"
                            : "border-[#E5E5E5] hover:border-gray-400"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenQuestion(isOpen ? null : faq.id)
                          }
                          aria-expanded={isOpen}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-5"
                        >
                          <span className="flex min-w-0 items-start gap-3">
                            <span className="mt-0.5 hidden text-xs font-bold text-gray-400 sm:block">
                              {String(faq.id).padStart(2, "0")}
                            </span>

                            <span className="text-sm font-semibold leading-6 sm:text-base">
                              {faq.question}
                            </span>
                          </span>

                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                              isOpen
                                ? "rotate-180 bg-black text-white"
                                : "bg-[#F5F5F5] text-black"
                            }`}
                          >
                            <FaChevronDown className="text-xs" />
                          </span>
                        </button>

                        {isOpen && (
                          <div className="border-t border-[#E5E5E5] px-4 py-4 sm:px-5 sm:py-5">
                            <p className="text-sm leading-7 text-gray-600 sm:text-[15px]">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-xl border border-dashed border-[#D5D5D5] px-5 py-14 text-center">
                    <FaSearch className="mx-auto text-3xl text-gray-300" />

                    <h3 className="mt-4 text-lg font-bold">
                      No Questions Found
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Try another search term or select a different category.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        handleSearch("");
                        handleCategoryChange("All Questions");
                      }}
                      className="mt-5 cursor-pointer bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#333]"
                    >
                      Show All Questions
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#E5E5E5] bg-[#F7F7F7]">
        <div className="container px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
              <FaEnvelope className="text-lg" />
            </div>

            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
              Didn't Find Your Answer?
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
              We're always happy to help. Reach out to our team and we'll
              get back to you as soon as possible.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-3 bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#333] active:scale-[0.98]"
            >
              Get In Touch
              <FaChevronRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;
