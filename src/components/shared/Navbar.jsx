"use client"
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600 flex items-center gap-2">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-lg text-lg">TH</span>
              <span className="tracking-tight">TechHub</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Home</Link>
            <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium transition">All Products</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition">Dashboard</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3 md:space-x-5">
            <Link href="/cart" className="text-gray-600 hover:text-blue-600 relative p-2">
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">0</span>
            </Link>

            <Link href="/login" className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-md">
              <User size={18} />
              <span className="text-sm font-semibold">Login</span>
            </Link>

            {/* Mobile Toggle Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(true)} className="text-gray-700 p-1">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Right Side) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            />

            {/* Side Menu */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[280px] bg-white z-[70] shadow-2xl p-6 md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xl font-bold text-blue-600">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 p-1">
                  <X size={28} />
                </button>
              </div>

              <div className="flex flex-col space-y-6 text-lg font-medium">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600">Home</Link>
                <Link href="/products" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600">All Products</Link>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <hr className="border-gray-100" />
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold"
                >
                  <User size={20} />
                  Login
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;