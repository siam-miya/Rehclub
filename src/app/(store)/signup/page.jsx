
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, User, Mail, Lock } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen bg-white py-10 sm:py-14 lg:py-20">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto grid max-w-5xl overflow-hidden border border-gray-200 bg-white shadow-sm lg:grid-cols-2">

          {/* Left Content */}
          <div className="relative hidden min-h-[650px] flex-col justify-between bg-black p-10 text-white lg:flex xl:p-14">
            <div>
              <Link href="/" className="text-3xl font-bold tracking-[0.2em]">
                REHCLUB
              </Link>

              <div className="mt-24">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Welcome to Rehclub
                </p>

                <h2 className="mt-5 text-4xl font-bold leading-tight xl:text-5xl">
                  Style That
                  <br />
                  Defines You.
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-7 text-gray-400">
                  Discover timeless fashion, explore new collections, and
                  express your unique style with Rehclub.
                </p>
              </div>
            </div>

            <p className="text-xs tracking-wide text-gray-500">
              © {new Date().getFullYear()} REHCLUB. All rights reserved.
            </p>
          </div>

          {/* Sign Up Form */}
          <div className="flex items-center justify-center px-5 py-8 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
            <div className="w-full max-w-md">

              <Link
                href="/"
                className="text-xl font-bold tracking-[0.2em] text-black lg:hidden"
              >
                REHCLUB
              </Link>

              <div className="mt-8 lg:mt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                  Create Your Account
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  Join Rehclub
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Create an account and start exploring our latest collections.
                </p>
              </div>

              <form className="mt-8 space-y-5">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      required
                      autoComplete="name"
                      className="h-12 w-full border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      autoComplete="email"
                      className="h-12 w-full border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="h-12 w-full border border-gray-200 bg-gray-50 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-black"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2 text-xs leading-5 text-gray-500">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 shrink-0 accent-black"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/terms" className="font-semibold text-black underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-semibold text-black underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 bg-black px-5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Create Account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-3 border border-gray-200 text-sm font-medium text-gray-700 transition hover:border-black hover:bg-gray-50"
              >
                <span className="font-bold text-base">G</span>
                Continue with Google
              </button>

              <p className="mt-7 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-black underline underline-offset-4 hover:text-gray-600"
                >
                 Login
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
