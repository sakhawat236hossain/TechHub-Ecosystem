"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile Sidebar
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop Profile Dropdown
  const { data: session, status } = useSession();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {publicLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 md:space-x-5">
            <Link href="/cart" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 relative p-2 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 bg-blue-600 text-[9px] text-white rounded-full h-4 w-4 flex items-center justify-center font-bold">0</span>
            </Link>

            {/* Auth Condition */}
            {status === "loading" ? (
               <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            ) : session ? (
              /* Desktop Profile Dropdown */
              <div className="relative hidden md:block" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-600 transition-all">
                    <img src={session.user?.image || "https://ui-avatars.com/api/?name=" + session.user?.name} className="w-full h-full object-cover" alt="user" />
                  </div>
                  <ChevronDown size={14} className={`text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl p-2 z-[60]"
                    >
                      <div className="px-4 py-3 border-b border-zinc-50 dark:border-zinc-800 mb-2">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{session.user?.name}</p>
                      </div>
                      
                      <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>

                      <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all cursor-pointer"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
                <span className="text-[10px] font-black uppercase tracking-[0.1em]">Get Started</span>
              </Link>
            )}

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(true)} className="md:hidden text-zinc-700 dark:text-zinc-400 p-1">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)} 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
              className="fixed right-0 top-0 h-full w-[85%] max-w-[320px] bg-white dark:bg-zinc-950 z-[101] shadow-2xl flex flex-col md:hidden" 
            >
              <div className="flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-900">
                <Logo />
                <button onClick={() => setIsOpen(false)} className="text-zinc-400 p-1"><X size={28} /></button>
              </div>

              <div className="p-6 flex flex-col flex-1 overflow-y-auto">
                {/* User Section for Mobile */}
                {session ? (
                  <div className="mb-8 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={session.user?.image || "https://ui-avatars.com/api/?name=" + session.user?.name} className="w-12 h-12 rounded-full border-2 border-blue-600" alt="user" />
                      <div className="overflow-hidden text-left">
                        <p className="text-sm font-black uppercase dark:text-white truncate">{session.user?.name}</p>
                        <p className="text-[10px] font-bold text-zinc-500 truncate">{session.user?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Link 
                        href="/dashboard" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-blue-600 rounded-xl border border-zinc-100 dark:border-zinc-700"
                      >
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                      <button 
                        onClick={() => { signOut(); setIsOpen(false); }}
                        className="flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-950/20 text-[10px] font-black uppercase tracking-widest text-red-600 rounded-xl"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)} className="mb-8 flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs" >
                    <User size={20} /> Login to Account
                  </Link>
                )}

                {/* Nav Links for Mobile */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-2 mb-2">Explore</p>
                  {publicLinks.map((link) => (
                    <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block p-3 text-lg font-black uppercase tracking-tighter text-zinc-800 dark:text-zinc-200" >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto pt-10 text-center">
                   <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">© 2026 TechHub Ecosystem</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;