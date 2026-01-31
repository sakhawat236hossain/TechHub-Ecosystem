"use client"
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const latestProducts = [
  {
    id: 1,
    name: "iPad Pro M4",
    price: 999,
    category: "Tablets",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600",
  },
  {
    id: 2,
    name: "Keychron Q6 Max",
    price: 210,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1618384881928-0056163359af?q=80&w=600",
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    price: 249,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=600",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 149,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1527814050087-37a3c71eeea3?q=80&w=600",
  },
  {
    id: 5,
    name: "GoPro Hero 12",
    price: 399,
    category: "Cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600",
  },
  {
    id: 6,
    name: "ROG Monitor",
    price: 899,
    category: "Monitors",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600",
  },
  {
    id: 7,
    name: "Gaming Console",
    price: 549,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=600",
  },
  {
    id: 8,
    name: "Smart Watch Ultra",
    price: 799,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1544117518-30df578096a4?q=80&w=600",
  }
];
const LatestProducts = () => {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Latest <span className="text-blue-600 dark:text-blue-500">Arrivals</span>
            </h2>
            <div className="h-1 w-16 bg-blue-600 rounded-full mt-1"></div>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:gap-3 transition-all">
            See All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Products Grid - lg:grid-cols-4 for 4 items per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl p-3 border border-gray-100 dark:border-zinc-800 hover:border-blue-500/30 hover:shadow-xl dark:hover:shadow-blue-900/5 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white dark:bg-zinc-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                   <span className="bg-white/80 dark:bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                     {product.category}
                   </span>
                </div>
              </div>

              {/* Info Section */}
              <div className="px-1 space-y-4">
                <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-zinc-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between pb-2">
                  <p className="text-lg font-black text-gray-900 dark:text-white">
                    ${product.price}
                  </p>
                  
                  <Link 
                    href={`/products/${product.id}`}
                    className="text-[10px] font-bold uppercase tracking-tighter bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all active:scale-95 shadow-sm"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;