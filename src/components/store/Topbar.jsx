
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Topbar = () => {
  return (
    <section className="w-full bg-black px-3 py-2.5 text-white sm:px-4 sm:py-3">
      <div className="container flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-3">
        <p className="text-center text-[11px] font-medium tracking-wide sm:text-sm md:text-base">
          Free Shipping on Orders Over ৳3000
        </p>

        <Link
          href="/shop"
          className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold underline-offset-4 transition-colors duration-200 hover:text-amber-300 hover:underline sm:text-sm md:text-base"
        >
          Shop Now
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Link>
      </div>
    </section>
  );
};

export default Topbar;
