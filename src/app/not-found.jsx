
import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[100vh] items-center justify-center bg-white px-4 py-16">
      <div className="container text-center">

        {/* 404 */}
        <h1 className="text-[110px] font-black leading-none tracking-tighter text-black sm:text-[150px]">
          404
        </h1>

        {/* Content */}
        <div className="mx-auto mt-6 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Page Not Found
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
            Sorry, the page you are looking for doesn't exist
            or has been moved. Let's get you back to shopping.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-black px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            <Home size={16} />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-gray-300 px-7 py-3 text-sm font-semibold text-black transition-colors hover:border-black hover:bg-gray-50"
          >
            <Search size={16} />
            Explore Products
          </Link>
        </div>

        {/* Brand */}
        <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
          REHCLUB — Wear Your Identity
        </p>

      </div>
    </main>
  );
};

export default NotFound;
