
import React from "react";
import Image from "next/image";
import Link from "next/link";

import PageHero from "../../../components/shared/PageHero";

const AboutPage = () => {
  const features = [
    {
      number: "01",
      title: "Quality First",
      description:
        "We focus on quality materials, thoughtful details, and comfortable designs that last.",
    },
    {
      number: "02",
      title: "Modern Designs",
      description:
        "Our collections combine modern fashion trends with timeless everyday styles.",
    },
    {
      number: "03",
      title: "Customer Satisfaction",
      description:
        "Your satisfaction matters to us. We aim to make every shopping experience simple and enjoyable.",
    },
    {
      number: "04",
      title: "Style for Everyone",
      description:
        "From everyday essentials to statement pieces, we bring styles for both men and women.",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero */}
      <PageHero
        title="About Rehclub"
        subtitle="More than fashion. It's about expressing who you are."
        eyebrow="Our Story"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
        position="center"
      />

      {/* Our Story */}
      <section className="container px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[350px] overflow-hidden bg-gray-100 sm:min-h-[450px]">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85"
              alt="Rehclub fashion collection"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Fashion That
              <br />
              Speaks Your Identity.
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
              <p>
                Welcome to Rehclub — a clothing brand built around
                individuality, confidence, and everyday style.
              </p>

              <p>
                We believe fashion is more than just what you wear.
                It's a way to express your personality, showcase
                your confidence, and create your own identity.
              </p>

              <p>
                Our goal is to bring together quality, comfort,
                and modern design to make fashion accessible
                and enjoyable for everyone.
              </p>
            </div>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center justify-center bg-black px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#F5F5F5]">
        <div className="container grid gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
              What Drives Us
            </p>

            <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">
              Our Mission
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Our mission is to make quality fashion accessible
              through thoughtfully selected clothing that
              combines comfort, style, and value. We want
              everyone to feel confident in what they wear.
            </p>
          </div>

          <div className="border-t border-gray-300 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
              Where We Are Going
            </p>

            <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">
              Our Vision
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              We envision Rehclub as a trusted fashion destination
              where people discover their personal style through
              quality products, inspiring collections, and an
              exceptional shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
            The Rehclub Difference
          </p>

          <h2 className="mt-4 text-3xl font-bold text-black sm:text-4xl">
            Why Choose Rehclub?
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
            We care about every detail, from the products we
            offer to the experience you receive.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="border-t border-gray-200 pt-6"
            >
              <span className="text-sm font-bold text-gray-400">
                {feature.number}
              </span>

              <h3 className="mt-5 text-lg font-bold text-black">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Statement */}
      <section className="relative overflow-hidden bg-[#F5F5F5]">
        <div className="container px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black">
            Rehclub
          </p>

          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Wear What Makes You,
            <span className="text-blue-600"> You.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-black sm:text-base">
            Discover your style. Express your identity.
            Be confident in every moment.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center justify-center text-white bg-black px-8 py-3.5 text-sm font-bold hover:text-black transition-colors hover:bg-white"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
