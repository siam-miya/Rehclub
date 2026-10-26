
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Package,
  ShoppingCart,
  Tags,
  ChartNoAxesCombined,
  Settings,
  MessageSquare,
  Image,
  TicketPercent,
  ChevronRight,
} from "lucide-react";

const menuGroups = [
  {
    title: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "Analytics",
        href: "/admin/analytics",
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      {
        label: "Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        label: "Categories",
        href: "/admin/categories",
        icon: Tags,
      },
      {
        label: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
      },
      {
        label: "Customers",
        href: "/admin/customers",
        icon: Users,
      },
      {
        label: "Team Members",
        href: "/admin/team",
        icon: UserCog,
      },
      {
        label: "Coupons",
        href: "/admin/coupons",
        icon: TicketPercent,
      },
    ],
  },
  {
    title: "CONTENT",
    items: [
      {
        label: "Banners",
        href: "/admin/banners",
        icon: Image,
      },
      {
        label: "Reviews",
        href: "/admin/reviews",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col overflow-y-auto border-r border-gray-200 bg-white lg:flex">
      {/* Sidebar Header */}
      <div className="border-b border-gray-100 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Workspace
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-sm font-medium text-gray-700">
            Rehclub Store
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 px-3 py-5">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 text-[11px] font-bold tracking-[0.12em] text-gray-400">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-50 font-semibold text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        className={
                          isActive
                            ? "text-blue-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        }
                      />

                      {item.label}
                    </span>

                    {isActive && (
                      <ChevronRight
                        size={16}
                        className="text-blue-600"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-gray-100 p-4">
        <p className="text-xs text-gray-400">
          Rehclub Admin Panel
        </p>

        <p className="mt-1 text-xs text-gray-500">
          Management Dashboard
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
