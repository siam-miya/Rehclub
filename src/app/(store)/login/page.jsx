
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen bg-white py-10 sm:py-14 lg:py-20">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto grid max-w-5xl overflow-hidden border border-gray-200 bg-white shadow-sm lg:grid-cols-2">

          {/* Left Content */}
          <div className="relative hidden min-h-[600px] flex-col justify-between bg-black p-10 text-white lg:flex xl:p-14">
            <div>
              <Link href="/" className="text-3xl font-bold tracking-[0.2em]">
                REHCLUB
              </Link>

              <div className="mt-24">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
                  Welcome Back
                </p>

                <h2 className="mt-5 text-4xl font-bold leading-tight xl:text-5xl">
                  Good Style.
                  <br />
                  Good Choice.
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-7 text-gray-400">
                  Sign in to discover your favorites, manage your orders, and
                  enjoy a better shopping experience.
                </p>
              </div>
            </div>

            <p className="text-xs tracking-wide text-gray-500">
              © {new Date().getFullYear()} REHCLUB. All rights reserved.
            </p>
          </div>

          {/* Login Form */}
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
                  Your Account
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  Welcome Back
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Sign in to continue your shopping experience.
                </p>
              </div>

              <form className="mt-8 space-y-5">

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
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-gray-500 transition hover:text-black"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
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

                {/* Remember Me */}
                <label className="flex items-center gap-2 text-sm text-gray-500">
                  <input
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 accent-black"
                  />
                  Remember me
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 bg-black px-5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Sign In
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
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-black underline underline-offset-4 hover:text-gray-600"
                >
                  Create Account
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
