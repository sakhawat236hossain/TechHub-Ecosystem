"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/Cards/ProductCard/ProductCard';

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/public/latest');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-black uppercase tracking-[0.3em] text-zinc-400 animate-pulse">
        Loading Latest Gear...
      </div>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2">New Arrivals</p>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Products</span>
            </h2>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:text-blue-600 transition-colors group">
            Explore All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* --- Product Mapping --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        {/* Empty State */}
        {products.length === 0 && (
            <p className="text-center text-zinc-500 font-bold uppercase py-10">No products found.</p>
        )}

      </div>
    </section>
  );
};

export default LatestProducts;