"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../common/Logo";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (href) => pathname === href;

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur border-b border-zinc-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Logo />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition
                  ${
                    isActive(link.href)
                      ? "bg-blue-600 text-white shadow"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-blue-600"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/cart" className="relative p-2">
              <ShoppingCart size={20} />
            </Link>

            {/* Dark mode button (UI only) */}
            <button className="p-2 rounded-xl border dark:border-zinc-800">
              <Sun size={16} className="dark:hidden" />
              <Moon size={16} className="hidden dark:block" />
            </button>

            {/* Dashboard button */}
            {session && (
              <Link
                href="/dashboard"
                className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition
                  ${
                    isActive("/dashboard")
                      ? "bg-blue-700 text-white shadow-lg"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            )}

            {/* Profile */}
            {status === "loading" ? (
              <div className="w-8 h-8 bg-zinc-200 rounded-full" />
            ) : session ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <img
                    src={
                      session.user?.image ||
                      `https://ui-avatars.com/api/?name=${session.user?.name}`
                    }
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown size={14} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-52 bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl shadow-xl p-2"
                    >
                      <p className="px-3 py-2 text-xs font-bold truncate">
                        {session.user?.name}
                      </p>

                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className={`hidden sm:block px-5 py-2 rounded-xl text-xs font-black uppercase
                  ${
                    isActive("/login")
                      ? "bg-blue-700 text-white"
                      : "bg-blue-600 text-white"
                  }`}
              >
                Get Started
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[100]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-[85%] max-w-[320px] bg-white dark:bg-zinc-950 z-[101] p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <Logo />
                <X onClick={() => setIsOpen(false)} />
              </div>

              <div className="space-y-3">
                {[...publicLinks, ...(session ? [{ name: "Dashboard", href: "/dashboard" }] : [])].map(
                  (link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-black uppercase transition
                        ${
                          isActive(link.href)
                            ? "bg-blue-600 text-white shadow"
                            : "bg-zinc-100 dark:bg-zinc-900"
                        }`}
                    >
                      {link.name}
                    </Link>
                  )
                )}

                {session && (
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 font-black uppercase"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
