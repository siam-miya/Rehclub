"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div
      aria-label="Main navigation"
      className="flex items-center gap-8 xl:gap-14"
    >
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href ||
              pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.name}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`relative whitespace-nowrap py-2 text-sm transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:duration-200 ${
              isActive
                ? "font-semibold text-black after:w-full"
                : "font-medium text-gray-600 after:w-0 hover:text-black hover:after:w-full"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
