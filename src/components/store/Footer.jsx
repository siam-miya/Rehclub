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
    { label: "Men", href: "/products/categories/men" },
    { label: "Women", href: "/products/categories/women" },
    { label: "New Arrivals", href: "/products" },
    { label: "Best Sellers", href: "/products" },
    { label: "Sale", href: "/products" },
  ];

  const supportLinks = [
    { label: "Track Your Order", href: "/track-order" },
    { label: "Shipping & Returns", href: "/" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
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
      <div className="container w-full px-4 py-10 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-16 xl:px-12">
        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">

          {/* Brand */}
          <div className="col-span-2 min-w-0 sm:col-span-2 lg:col-span-4">
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
                className="h-auto max-h-[55px] w-auto max-w-full object-contain object-left sm:max-h-[60px]"
              />
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-6 text-neutral-400 sm:mt-5 sm:text-sm sm:leading-7">
              Discover modern essentials and timeless fashion designed for
              everyday confidence. Find your style, make it your own.
            </p>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-3 sm:mt-6">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center border border-white/15 text-neutral-300 transition duration-300 hover:border-white hover:bg-white hover:text-black sm:h-10 sm:w-10"
                  >
                    <SocialIcon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop */}
          <div className="min-w-0 lg:col-span-2">
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px] text-white sm:mb-5 sm:text-xs sm:tracking-[2px]">
              Shop
            </h3>

            <ul className="space-y-3">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-block text-xs text-neutral-400 transition duration-200 hover:translate-x-1 hover:text-white sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="min-w-0 lg:col-span-3">
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px] text-white sm:mb-5 sm:text-xs sm:tracking-[2px]">
              Customer Care
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-xs text-neutral-400 transition duration-200 hover:translate-x-1 hover:text-white sm:text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 min-w-0 sm:col-span-2 lg:col-span-3">
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px] text-white sm:mb-5 sm:text-xs sm:tracking-[2px]">
              Get In Touch
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs text-neutral-400 sm:text-sm">
                <FaMapMarkerAlt
                  size={15}
                  className="mt-1 shrink-0 text-neutral-200"
                />
                <span>Dhaka, Bangladesh</span>
              </li>

              <li className="flex items-center gap-3 text-xs text-neutral-400 sm:text-sm">
                <FaPhoneAlt
                  size={14}
                  className="shrink-0 text-neutral-200"
                />
                <a
                  href="tel:+8801000000000"
                  className="break-words transition hover:text-white"
                >
                  +880 1XXX-XXXXXX
                </a>
              </li>

              <li className="flex items-start gap-3 text-xs text-neutral-400 sm:text-sm">
                <FiMail
                  size={16}
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

            <div className="mt-5 flex items-center gap-2 text-[11px] text-neutral-500 sm:mt-6 sm:text-xs">
              <FaTruck size={15} className="shrink-0" />
              <span>Delivery across Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Trust Features */}
        <div className="mt-10 grid grid-cols-1 gap-5 border-y border-white/10 py-6 sm:mt-12 sm:grid-cols-3 sm:gap-4 sm:py-7 lg:mt-14 lg:py-8">
          {trustItems.map((item) => {
            const TrustIcon = item.icon;

            return (
              <div
                key={item.title}
                className="flex min-w-0 items-center gap-3 sm:justify-center lg:justify-start"
              >
                <TrustIcon
                  size={20}
                  className="shrink-0 text-neutral-300 sm:size-[21px]"
                />

                <div className="min-w-0">
                  <p className="text-xs font-medium text-white sm:text-sm">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-neutral-500 sm:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-4 pt-6 text-[11px] text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:text-xs">
          <p>
            © {new Date().getFullYear()} REHCLUB. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-5">
            <Link href="/terms" className="transition hover:text-white">
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
              <FiArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
