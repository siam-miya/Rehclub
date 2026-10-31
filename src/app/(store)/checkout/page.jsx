
import Link from "next/link";
import CheckoutForm from "../../../components/store/CheckoutFrom";
import CheckoutCartSummary from "../../../components/store/CheckoutCartSummary";

export const metadata = {
  title: "Checkout | Rehclub",
  description: "Complete your order securely at Rehclub.",
};

const CheckoutPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <div className="container w-full px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 sm:mb-10 sm:text-xs"
        >
          <Link href="/" className="cursor-pointer transition hover:text-black">
            Home
          </Link>

          <span>/</span>

          <Link
            href="/products"
            className="cursor-pointer transition hover:text-black"
          >
            Products
          </Link>

          <span>/</span>

          <span aria-current="page" className="font-medium text-black">
            Checkout
          </span>
        </nav>

        {/* Page Header */}
        <header className="mb-8 border-b border-gray-200 pb-6 sm:mb-10 sm:pb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-xs">
            Secure Checkout
          </p>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
            Complete Your Order
          </h1>

          <p className="mt-3 max-w-xl text-xs leading-6 text-gray-500 sm:text-sm">
            Enter your delivery details and select your preferred payment
            method to place your order.
          </p>
        </header>

        {/* Checkout Layout */}
        <div className="grid min-w-0 grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-14">

          {/* Checkout Form */}
          <section className="min-w-0">
            <CheckoutForm />
          </section>

          {/* Order Summary */}
          <aside className="min-w-0 lg:sticky lg:top-6">
            <CheckoutCartSummary />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
