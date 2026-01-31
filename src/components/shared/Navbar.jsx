"use client"
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Reusable nav links to keep code DRY (Don't Repeat Yourself)
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm font-black uppercase tracking-widest text-gray-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Actions & Mobile Toggle */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Shopping Cart */}
            <Link href="/cart" className="text-gray-600 dark:text-zinc-400 hover:text-blue-600 relative p-2 transition-colors">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">0</span>
            </Link>

            {/* Login Button (Desktop) */}
            <Link href="/login" className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              <User size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Login</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(true)} 
              className="md:hidden text-gray-700 dark:text-zinc-400 p-1 hover:text-blue-600 transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Drawer Content */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[300px] bg-white dark:bg-zinc-900 z-[70] shadow-2xl p-8 md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <Logo />
                <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-zinc-400 p-1 hover:rotate-90 transition-transform duration-300">
                  <X size={32} />
                </button>
              </div>

              {/* Mobile Links List */}
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className="text-lg font-black uppercase tracking-tighter text-gray-800 dark:text-zinc-200 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <hr className="border-gray-100 dark:border-zinc-800 my-4" />
                
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/20"
                >
                  <User size={20} />
                  Login to Account
                </Link>
              </div>

              {/* Footer info in Sidebar */}
              <div className="mt-auto">
                <p className="text-[10px] text-gray-400 dark:text-zinc-600 font-bold uppercase tracking-[0.2em] text-center">
                  © 2026 TECHHUB ECOSYSTEM
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;