"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  ShoppingBag,
  Heart,
  Star,
  PackagePlus,
  Users,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  Settings,
  Layers
} from "lucide-react";
import Logo from "@/components/common/Logo";

const Sidebar = ({ setOpen }) => {
  const pathname = usePathname();

  // Combined all menu items into one flat array for development
  const allMenuItems = [
    // --- Shared Section ---
    { label: "Overview", type: "heading" },
    { name: "Analytics", href: "/dashboard/vendor/analytics", icon: LayoutDashboard },
    
    // --- Vendor Section ---
    { label: "Vendor Management", type: "heading" },
    { name: "Add Product", href: "/dashboard/vendor/add-product", icon: PackagePlus },
    { name: "Inventory", href: "/dashboard/vendor/inventory", icon: ShoppingBag },
    
    // --- User Section ---
    { label: "User Features", type: "heading" },
    { name: "My Orders", href: "/dashboard/user/orders", icon: Layers },
    { name: "Wishlist", href: "/dashboard/user/wishlist", icon: Heart },
    { name: "My Reviews", href: "/dashboard/user/reviews", icon: Star },
    
    // --- Admin Section ---
    { label: "Administration", type: "heading" },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Approve Products", href: "/dashboard/admin/approvals", icon: ShieldCheck },
    { name: "Global Stats", href: "/dashboard/admin/stats", icon: LayoutDashboard },
  ];

  const isProfileActive = pathname === "/dashboard/profile";

  const handleLinkClick = () => {
    if (setOpen) setOpen(false);
  };

  return (
    <div className="h-full bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-zinc-800 flex flex-col transition-colors duration-300 overflow-hidden">
      
      {/* 1. Header with Logo */}
      <div className="pt-8 px-6 pb-4 shrink-0">
        <Logo />
      </div>

      {/* 2. Unified Navigation Area */}
      <nav className="flex-1 px-4 pt-2 overflow-y-auto scrollbar-hide space-y-1">
        <style jsx>{`
          nav::-webkit-scrollbar { display: none; }
          nav { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {allMenuItems.map((item, index) => {
          // Check if it's a heading for a section
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
              onClick={handleLinkClick}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
              }`}
            >
              <Icon
                size={18}
                className={`${isActive ? "scale-110" : "group-hover:scale-110 transition-transform"}`}
              />
              <span className="whitespace-nowrap tracking-tight">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* 3. Bottom Section: Profile & Sign Out */}
      <div className="p-4 shrink-0 bg-white dark:bg-zinc-900 border-t border-gray-50 dark:border-zinc-800 space-y-1">
        <Link
          href="/dashboard/profile"
          onClick={handleLinkClick}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 group ${
            isProfileActive
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
          }`}
        >
          <Settings
            size={18}
            className={`${isProfileActive ? "scale-110" : "group-hover:scale-110 transition-transform"}`}
          />
          <span className="whitespace-nowrap tracking-tight">
            Account Settings
          </span>
        </Link>

        <button className="flex items-center gap-4 px-4 py-3.5 w-full text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;