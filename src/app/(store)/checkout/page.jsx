
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
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="cursor-pointer hover:text-black">
            Home
          </Link>

          <span>/</span>
          

          <Link
            href="/products"
            className="cursor-pointer hover:text-black"
          >
            Products
          </Link>

          <span>/</span>

          <span aria-current="page" className="text-black">
            Checkout
          </span>
        </nav>

        <header className="mb-10 border-b border-gray-200 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Secure Checkout
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
            Complete Your Order
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600">
            Enter your delivery details and select your preferred payment
            method to place your order.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
          <section>
            <CheckoutForm />
          </section>

          <aside className="lg:sticky lg:top-8">
            <CheckoutCartSummary />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
