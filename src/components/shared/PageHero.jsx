import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import banner2 from "@/assets/images/banner2.jpg";

const PageHero = ({
  title = "Our Collection",
  subtitle = "Explore our latest collection",
  eyebrow = "Discover Your Style",
  image = banner2,
  breadcrumbs = [],
  position = "center",
}) => {
  return (
    <section className="relative flex min-h-[260px] items-center overflow-hidden bg-gray-900 sm:min-h-[320px] lg:min-h-[380px]">
      <Image
        src={image || banner2}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div
        className={`relative z-10 mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8 ${
          position === "center" ? "text-center" : "text-left"
        }`}
      >
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {subtitle && (
          <p
            className={`mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base ${
              position === "center" ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        )}

        {breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={`mt-6 ${
              position === "center" ? "flex justify-center" : ""
            }`}
          >
            <ol className="flex flex-wrap items-center gap-2 text-xs text-white/70">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <li
                    key={`${item.label}-${index}`}
                    className="flex items-center gap-2"
                  >
                    {index > 0 && <FaChevronRight size={9} />}

                    {item.href && !isLast ? (
                      <Link
                        href={item.href}
                        className="cursor-pointer transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        className={isLast ? "font-medium text-white" : ""}
                        aria-current={isLast ? "page" : undefined}
                      >
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
};

export default PageHero;