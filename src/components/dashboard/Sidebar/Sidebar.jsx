"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; 
import {
  ShoppingBag, Heart, Star, PackagePlus,
  Users, ShieldCheck, LayoutDashboard, LogOut,
  Settings, Layers, UserCircle
} from "lucide-react";
import Logo from "@/components/common/Logo";
import Image from "next/image";

const Sidebar = ({ setOpen }) => {
  const pathname = usePathname();
  const { data: session } = useSession(); 
  const role = session?.user?.role || "user";

  const menuConfig = {
    admin: [
      { label: "Administration", type: "heading" },
      { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
      { name: "Approve Products", href: "/dashboard/admin/approvals", icon: ShieldCheck },
    ],
    vendor: [
      { label: "Vendor Management", type: "heading" },
      { name: "Order Requests", href: "/dashboard/vendor/manage-requests", icon: Layers },
      { name: "Add Product", href: "/dashboard/vendor/add-product", icon: PackagePlus },
      { name: "Inventory", href: "/dashboard/vendor/my-products", icon: ShoppingBag },
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

  const activeMenuItems = [...sharedItems, ...(menuConfig[role] || menuConfig.user)];

  return (
    <div className="h-full bg-white dark:bg-zinc-950 border-r border-zinc-100 dark:border-zinc-900 flex flex-col overflow-hidden transition-colors duration-300">
      
      {/* Logo Section */}
      <div className="pt-8 px-6 pb-4 shrink-0">
        <Logo />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 pt-2 overflow-y-auto space-y-1 custom-scrollbar">
        {activeMenuItems.map((item, index) => {
          if (item.type === "heading") {
            return (
              <p key={index} className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mt-6 mb-2 ml-4">
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
                isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              }`}
            >
              <Icon size={18} />
              <span className="whitespace-nowrap">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* --- User Profile & Action Section --- */}
      <div className="p-4 mt-auto border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="flex items-center gap-2">
          
          {/* Clickable Profile Area */}
          <Link 
            href="/dashboard/profile" 
            className="flex flex-1 items-center gap-3 p-2 rounded-2xl hover:bg-white dark:hover:bg-zinc-900 transition-all group border border-transparent hover:border-zinc-100 dark:hover:border-zinc-800"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <Image
              height={60}
              width={60} 
                src={session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || 'User')}&background=0D8ABC&color=fff`} 
                alt="avatar" 
                className="w-10 h-10 rounded-xl object-cover border-2 border-white dark:border-zinc-800 shadow-sm group-hover:border-blue-500 transition-all"
              />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-zinc-950 rounded-full"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0 text-left">
              <h4 className="text-[11px] font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
                {session?.user?.name || "Guest User"}
              </h4>
              <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1">
                {session?.user?.role || "User"} <ChevronRight size={10} />
              </p>
            </div>
          </Link>

          {/* Settings Quick Access */}
          <Link 
            href="/dashboard/settings" 
            className="p-2.5 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-white dark:hover:bg-zinc-900 rounded-xl transition-all shadow-sm border border-transparent hover:border-zinc-100 dark:hover:border-zinc-700"
            title="Settings"
          >
            <Settings size={18} />
          </Link>
        </div>

        {/* Logout Button */}
        <button 
          onClick={() => signOut()}
          className="mt-3 w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all group"
        >
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          Logout Account
        </button>
      </div>
    </div>
  );
};

// Helper for mobile logic (If needed)
const ChevronRight = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Sidebar;