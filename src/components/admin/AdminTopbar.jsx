
"use client";

import Link from "next/link";
import { Bell, Menu, Search, UserRound } from "lucide-react";

const AdminTopbar = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Toggle sidebar"
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <Link
          href="/admin"
          className="text-xl font-bold tracking-tight text-gray-900"
        >
          Rehclub<span className="text-blue-600">.</span>
          <span className="ml-2 hidden text-xs font-medium text-gray-400 sm:inline">
            Admin Panel
          </span>
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search */}
        <button
          type="button"
          aria-label="Search"
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* Admin Profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <UserRound size={19} />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Administrator
            </p>
            <p className="text-xs text-gray-500">Rehclub Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
