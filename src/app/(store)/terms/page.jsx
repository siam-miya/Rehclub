
import React from "react";
import Link from "next/link";
import {
  FaChevronRight,
  FaShieldAlt,
  FaShoppingBag,
  FaCreditCard,
  FaTruck,
  FaUndoAlt,
  FaUserShield,
  FaExclamationCircle,
} from "react-icons/fa";

const TermsAndCondition = () => {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: <FaShieldAlt />,
      content: [
        "By accessing or using the Rehclub website, you agree to comply with these Terms & Conditions.",
        "If you do not agree with any part of these terms, please do not use our website or services.",
      ],
    },
    {
      id: "products",
      title: "2. Products & Information",
      icon: <FaShoppingBag />,
      content: [
        "We make every effort to display accurate product descriptions, images, colors, sizes, and prices.",
        "Actual product colors may slightly vary depending on your device screen and display settings.",
        "Product availability, pricing, and descriptions may change without prior notice.",
      ],
    },
    {
      id: "orders",
      title: "3. Orders & Confirmation",
      icon: <FaCreditCard />,
      content: [
        "All orders placed through our website are subject to confirmation and product availability.",
        "We reserve the right to cancel or refuse any order due to incorrect information, stock limitations, or suspected fraudulent activity.",
        "Customers are responsible for providing accurate contact and delivery information.",
      ],
    },
    {
      id: "payment",
      title: "4. Payment Policy",
      icon: <FaCreditCard />,
      content: [
        "Rehclub may offer Cash on Delivery (COD) and other available online payment methods.",
        "Customers must complete payment according to the selected payment method.",
        "Online payment transactions are subject to the terms and security policies of the respective payment providers.",
      ],
    },
    {
      id: "shipping",
      title: "5. Shipping & Delivery",
      icon: <FaTruck />,
      content: [
        "Delivery charges and estimated delivery times may vary depending on the customer's location.",
        "Delivery timelines are estimates and may be affected by weather, courier operations, or other unexpected circumstances.",
        "Customers should provide a complete and accurate delivery address and remain available to receive their orders.",
      ],
    },
    {
      id: "returns",
      title: "6. Return & Exchange Policy",
      icon: <FaUndoAlt />,
      content: [
        "Return and exchange requests must follow Rehclub's applicable Return & Exchange Policy.",
        "Products must meet the eligibility requirements communicated in our return policy.",
        "Customers should contact our support team before sending any product back.",
      ],
    },
    {
      id: "account",
      title: "7. Customer Responsibilities",
      icon: <FaUserShield />,
      content: [
        "Customers must provide truthful, accurate, and up-to-date information when using our website.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "Any misuse of our website, fraudulent activity, or attempt to disrupt our services is prohibited.",
      ],
    },
    {
      id: "intellectual",
      title: "8. Intellectual Property",
      icon: <FaShieldAlt />,
      content: [
        "All website content, including logos, images, graphics, text, designs, and branding, belongs to Rehclub or its respective owners.",
        "You may not copy, reproduce, distribute, or use our content for commercial purposes without prior written permission.",
      ],
    },
    {
      id: "liability",
      title: "9. Limitation of Liability",
      icon: <FaExclamationCircle />,
      content: [
        "Rehclub shall not be responsible for indirect or unexpected losses resulting from the use of our website or services.",
        "We do not guarantee uninterrupted or error-free website operation.",
        "We reserve the right to modify, suspend, or discontinue any part of our services when necessary.",
      ],
    },
    {
      id: "changes",
      title: "10. Changes to These Terms",
      icon: <FaShieldAlt />,
      content: [
        "Rehclub may update these Terms & Conditions at any time.",
        "Updated terms will be published on this page. Continued use of our website after changes means you accept the updated terms.",
      ],
    },
    {
      id: "contact",
      title: "11. Contact Us",
      icon: <FaUserShield />,
      content: [
        "If you have any questions regarding these Terms & Conditions, please contact our support team.",
      ],
    },
  ];

  return (
    <main className="bg-white text-[#171717]">
      {/* Hero Section */}
      <section className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
        <div className="container px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Terms & Conditions
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              Please read these terms carefully before using Rehclub. These
              guidelines explain your rights and responsibilities when
              shopping with us.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 sm:text-sm">
              <Link href="/" className="transition hover:text-black">
                Home
              </Link>
              <FaChevronRight className="text-[9px]" />
              <span className="font-semibold text-black">
                Terms & Conditions
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
          {/* Table of Contents */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-5 sm:p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider">
                On This Page
              </h2>

              <nav className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-xs text-gray-600 transition hover:border-black hover:bg-black hover:text-white sm:text-sm lg:mb-1 lg:border-0 lg:bg-transparent lg:px-2 lg:py-2.5 lg:hover:bg-black lg:hover:text-white"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-5 hidden bg-black p-5 text-white lg:block">
              <FaShieldAlt className="text-2xl" />
              <h3 className="mt-4 text-base font-semibold">
                Shop With Confidence
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                We aim to provide a transparent and reliable shopping
                experience for every customer.
              </p>
            </div>
          </aside>

          {/* Terms Content */}
          <div className="min-w-0">
            <div className="mb-8 border-b border-[#E5E5E5] pb-7">
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                Welcome to <strong className="text-black">Rehclub</strong>.
                These Terms & Conditions govern your access to and use of our
                website, products, and services. By placing an order or using
                our website, you acknowledge that you have read and agreed to
                these terms.
              </p>

              <p className="mt-3 text-xs text-gray-400">
                Please review this page periodically for updates.
              </p>
            </div>

            <div className="space-y-9 sm:space-y-11">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black text-white sm:h-11 sm:w-11">
                      {section.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                        {section.title}
                      </h2>

                      <div className="mt-3 space-y-3">
                        {section.content.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-sm leading-7 text-gray-600 sm:text-[15px] sm:leading-8"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 rounded-xl bg-[#F5F5F5] p-6 sm:mt-16 sm:p-8">
              <h2 className="text-xl font-bold sm:text-2xl">
                Need More Information?
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                Our support team is ready to help you with any questions about
                our policies, orders, or services.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-11 items-center justify-center gap-3 bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#333] active:scale-[0.98]"
              >
                Contact Us
                <FaChevronRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsAndCondition;
