
import React from "react";
import Link from "next/link";
import {
  FaChevronRight,
  FaShieldAlt,
  FaUser,
  FaDatabase,
  FaCookieBite,
  FaLock,
  FaShareAlt,
  FaUserCheck,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: <FaShieldAlt />,
      content: [
        "Welcome to Rehclub. Your privacy is important to us, and we are committed to protecting your personal information.",
        "This Privacy Policy explains what information we collect, how we use it, and the steps we take to keep it secure when you visit our website or purchase our products.",
      ],
    },
    {
      id: "information",
      title: "2. Information We Collect",
      icon: <FaDatabase />,
      content: [
        "When you use our website or place an order, we may collect the following information:",
      ],
      list: [
        "Full name and contact information.",
        "Phone number and email address.",
        "Delivery address and location details.",
        "Order history and purchase information.",
        "Payment transaction details, where applicable.",
        "Website usage information and device-related data.",
      ],
    },
    {
      id: "usage",
      title: "3. How We Use Your Information",
      icon: <FaUser />,
      content: [
        "We use collected information to provide and improve our services, including:",
      ],
      list: [
        "Processing and confirming customer orders.",
        "Delivering products to the correct address.",
        "Communicating order updates and delivery information.",
        "Providing customer support.",
        "Improving our website, products, and shopping experience.",
        "Preventing fraudulent transactions and unauthorized activities.",
        "Sending promotional updates where permitted.",
      ],
    },
    {
      id: "payment",
      title: "4. Payment Information",
      icon: <FaLock />,
      content: [
        "Rehclub may support Cash on Delivery (COD) and available online payment methods.",
        "Online payments may be processed through third-party payment service providers. Your payment information is handled according to their applicable privacy and security policies.",
        "We do not intentionally store complete payment card credentials on our website.",
      ],
    },
    {
      id: "cookies",
      title: "5. Cookies & Tracking Technologies",
      icon: <FaCookieBite />,
      content: [
        "Our website may use cookies and similar technologies to improve your browsing experience.",
        "Cookies may help us remember your preferences, understand website usage, and improve website performance.",
        "You can manage or disable cookies through your browser settings. However, some website features may not work properly if cookies are disabled.",
      ],
    },
    {
      id: "sharing",
      title: "6. Sharing Your Information",
      icon: <FaShareAlt />,
      content: [
        "We respect your privacy and do not sell your personal information.",
        "We may share necessary information with trusted service providers when required to operate our business, such as:",
      ],
      list: [
        "Courier and delivery companies for order fulfillment.",
        "Payment providers for transaction processing.",
        "Technology and hosting providers for website operations.",
        "Legal authorities when disclosure is required by applicable law.",
      ],
    },
    {
      id: "security",
      title: "7. Data Security",
      icon: <FaLock />,
      content: [
        "We take reasonable technical and organizational measures to protect your personal information against unauthorized access, misuse, loss, or disclosure.",
        "However, no online platform or electronic transmission method can guarantee absolute security.",
      ],
    },
    {
      id: "retention",
      title: "8. Data Retention",
      icon: <FaDatabase />,
      content: [
        "We retain personal information only for as long as reasonably necessary to fulfill orders, provide services, maintain business records, resolve disputes, and comply with applicable legal requirements.",
      ],
    },
    {
      id: "rights",
      title: "9. Your Privacy Rights",
      icon: <FaUserCheck />,
      content: [
        "Depending on applicable laws, you may have the right to:",
      ],
      list: [
        "Request access to your personal information.",
        "Request correction of inaccurate information.",
        "Ask about how your information is being used.",
        "Request deletion of information where legally applicable.",
        "Opt out of promotional communications.",
      ],
    },
    {
      id: "third-party",
      title: "10. Third-Party Websites",
      icon: <FaGlobe />,
      content: [
        "Our website may contain links to third-party websites or services.",
        "Rehclub is not responsible for the privacy practices, content, or security of external websites. We encourage you to review their privacy policies before sharing personal information.",
      ],
    },
    {
      id: "children",
      title: "11. Children's Privacy",
      icon: <FaUser />,
      content: [
        "Our website is not specifically designed to collect personal information from children.",
        "If we become aware that personal information has been collected from a child in circumstances where consent is required, we will take appropriate steps to address it.",
      ],
    },
    {
      id: "updates",
      title: "12. Updates to This Policy",
      icon: <FaShieldAlt />,
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in our business, services, or applicable requirements.",
        "Any updated version will be published on this page. We encourage you to review this page periodically.",
      ],
    },
    {
      id: "contact",
      title: "13. Contact Us",
      icon: <FaEnvelope />,
      content: [
        "If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact our support team.",
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
              Privacy Policy
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              At Rehclub, we value your trust. Learn how we collect, use,
              protect, and manage your personal information when you shop
              with us.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 sm:text-sm">
              <Link href="/" className="transition hover:text-black">
                Home
              </Link>
              <FaChevronRight className="text-[9px]" />
              <span className="font-semibold text-black">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
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
                    className="rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-xs text-gray-600 transition hover:border-black hover:bg-black hover:text-white sm:text-sm lg:mb-1 lg:border-0 lg:bg-transparent lg:px-2 lg:py-2.5"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-5 hidden bg-black p-5 text-white lg:block">
              <FaLock className="text-2xl" />
              <h3 className="mt-4 text-base font-semibold">
                Your Data, Your Trust
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                We are committed to handling your information responsibly
                and transparently.
              </p>
            </div>
          </aside>

          {/* Policy Content */}
          <div className="min-w-0">
            <div className="mb-8 border-b border-[#E5E5E5] pb-7">
              <p className="text-sm leading-7 text-gray-600 sm:text-base">
                This Privacy Policy applies to all visitors, customers, and
                users of the Rehclub website. By using our website, you
                acknowledge that you have read and understood this policy.
              </p>

              <p className="mt-3 text-xs text-gray-400">
                Please review this page periodically for any changes.
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

                      {section.list && (
                        <ul className="mt-4 space-y-3">
                          {section.list.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-sm leading-7 text-gray-600 sm:text-[15px]"
                            >
                              <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 rounded-xl bg-[#F5F5F5] p-6 sm:mt-16 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-black text-white">
                <FaEnvelope className="text-lg" />
              </div>

              <h2 className="mt-5 text-xl font-bold sm:text-2xl">
                Have Questions About Your Privacy?
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                If you need clarification about how we handle your personal
                information, feel free to get in touch with our support team.
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

export default PrivacyPolicy;
