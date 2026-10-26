"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

import { FiMail, FiPackage, FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  const shopLinks = [
    { label: "Men", href: "/categories/men" },
    { label: "Women", href: "/categories/women" },
    { label: "New Arrivals", href: "/categories/new-arrivals" },
    { label: "Best Sellers", href: "/categories/best-sellers" },
    { label: "Sale", href: "/categories/sale" },
  ];

  const supportLinks = [
    { label: "Track Your Order", href: "/track-order" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/",
      icon: FaFacebookF,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/",
      icon: FaInstagram,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/",
      icon: FaYoutube,
    },
  ];

  const trustItems = [
    {
      title: "Nationwide Delivery",
      description: "Delivery across Bangladesh",
      icon: FaTruck,
    },
    {
      title: "Secure Shopping",
      description: "Shop with confidence",
      icon: FaShieldAlt,
    },
    {
      title: "Order Tracking",
      description: "Stay updated on your order",
      icon: FiPackage,
    },
  ];

  return (
    <footer className="w-full overflow-hidden bg-black text-white">
      {/* Main Footer - mx-auto যুক্ত করা হয়েছে যাতে বড় স্ক্রিনে একদম মাঝে থাকে */}
      <div className="container mx-auto w-full px-4 py-12 sm:px-6 sm:py-14 md:px-8 lg:px-10 lg:py-16 xl:px-12">
        <div className="grid grid-cols-1 gap-13 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-36">
          {/* Brand */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <Link
              href="/"
              aria-label="REHCLUB homepage"
              className="inline-flex max-w-full"
            >
              <Image
                src="/logo.png"
                alt="REHCLUB"
                width={190}
                height={60}
                className="h-auto max-h-[60px] w-auto max-w-full object-contain object-left"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-400">
              Discover modern essentials and timeless fashion designed for
              everyday confidence. Find your style, make it your own.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center border border-white/15 text-neutral-300 transition duration-300 hover:border-white hover:bg-white hover:text-black"
                  >
                    <SocialIcon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop */}
          <div className="min-w-0 lg:col-span-2">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[2px] text-white">
              Shop
            </h3>

            <ul className="space-y-3">
              {shopLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-sm text-neutral-400 transition duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="min-w-0 lg:col-span-3">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[2px] text-white">
              Customer Care
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-sm text-neutral-400 transition duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0 lg:col-span-3">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[2px] text-white">
              Get In Touch
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-neutral-400">
                <FaMapMarkerAlt
                  size={16}
                  className="mt-1 shrink-0 text-neutral-200"
                />
                <span>Dhaka, Bangladesh</span>
              </li>

              <li className="flex items-center gap-3 text-sm text-neutral-400">
                <FaPhoneAlt
                  size={15}
                  className="shrink-0 text-neutral-200"
                />
                <a
                  href="tel:+8801000000000"
                  className="break-words transition hover:text-white"
                >
                  +880 1XXX-XXXXXX
                </a>
              </li>

              <li className="flex items-start gap-3 text-sm text-neutral-400">
                <FiMail
                  size={17}
                  className="mt-0.5 shrink-0 text-neutral-200"
                />
                <a
                  href="mailto:support@rehclub.com"
                  className="break-all transition hover:text-white"
                >
                  support@rehclub.com
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2 text-xs text-neutral-500">
              <FaTruck size={16} className="shrink-0" />
              <span>Delivery across Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Trust Features - এখানেও পারফেক্ট স্পেসিং ও জাস্টিফাই দেওয়া হয়েছে */}
        <div className="mt-12 ml-60 grid grid-cols-1 gap-5 border-y border-white/10 py-7 sm:grid-cols-3 sm:gap-6 lg:mt-16 lg:py-8">
          {trustItems.map((item) => {
            const TrustIcon = item.icon;

            return (
              <div
                key={item.title}
                className="flex min-w-0 items-center gap-3"
              >
                <TrustIcon
                  size={21}
                  className="shrink-0 text-neutral-300"
                />

                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-4 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} REHCLUB. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/contact"
              aria-label="Contact REHCLUB"
              className="inline-flex items-center gap-1 transition hover:text-white"
            >
              Contact
              <FiArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;