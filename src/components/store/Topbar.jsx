import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Topbar = () => {
  return (
    <section className="bg-black px-4 py-3 text-center text-white">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <p className="text-sm font-medium tracking-wide sm:text-base">
          Free Shipping on Orders Over ৳3000
        </p>

        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm font-md underline-offset-4 transition hover:text-amber-300 hover:underline sm:text-base"
        >
          Shop Now
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default Topbar;
