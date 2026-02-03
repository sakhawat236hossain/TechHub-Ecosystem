"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react"; // ১. সেশন ইমপোর্ট করুন
import {
  ShoppingBag, Heart, Star, PackagePlus,
  Users, ShieldCheck, LayoutDashboard, LogOut,
  Settings, Layers
} from "lucide-react";
import Logo from "@/components/common/Logo";

const Sidebar = ({ setOpen }) => {
  const pathname = usePathname();
  const { data: session } = useSession(); // ২. সেশন থেকে রোল নিন
  const role = session?.user?.role || "user";

  // ৩. মেনুগুলোকে আলাদাভাবে ডিফাইন করা
  const menuConfig = {
    admin: [
      { label: "Administration", type: "heading" },
      { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
      { name: "Approve Products", href: "/dashboard/admin/approvals", icon: ShieldCheck },
    ],
    vendor: [
      { label: "Vendor Management", type: "heading" },
      { name: "Order Requests", href: "/dashboard/manage-requests", icon: Layers },
      { name: "Add Product", href: "/dashboard/vendor/add-product", icon: PackagePlus },
      { name: "Inventory", href: "/dashboard/vendor/inventory", icon: ShoppingBag },
    ],
    user: [
      { label: "User Features", type: "heading" },
      { name: "My Orders", href: "/dashboard/user/orders", icon: Layers },
      { name: "Wishlist", href: "/dashboard/user/wishlist", icon: Heart },
      { name: "My Reviews", href: "/dashboard/user/reviews", icon: Star },
    ]
  };

  // Shared items for everyone
  const sharedItems = [
    { label: "Overview", type: "heading" },
    { name: "Analytics", href: "/dashboard/analytics", icon: LayoutDashboard },
  ];

  // ৪. রোল অনুযায়ী মেনু ফিল্টার করা
  const activeMenuItems = [...sharedItems, ...(menuConfig[role] || menuConfig.user)];

  return (
    <div className="h-full bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 flex flex-col overflow-hidden">
      <div className="pt-8 px-6 pb-4 shrink-0"><Logo /></div>

      <nav className="flex-1 px-4 pt-2 overflow-y-auto space-y-1">
        {activeMenuItems.map((item, index) => {
          if (item.type === "heading") {
            return (
              <p key={index} className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mt-6 mb-2 ml-4">
                {item.label}
              </p>
            );
          }

          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                isActive ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
              }`}
            >
              <Icon size={18} />
              <span className="whitespace-nowrap">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      {/* Sign out part... */}
    </div>
  );
};

export default Sidebar;