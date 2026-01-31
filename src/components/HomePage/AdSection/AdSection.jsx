"use client"
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import Image from 'next/image';
const adminProducts = [
  {
    id: 1,
    name: "MacBook Pro M3 Max",
    brand: "Apple",
    price: 3499,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600",
    tag: "Admin Choice"
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 399,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600",
    tag: "Premium"
  },
  {
    id: 3,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=600",
    tag: "Top Rated"
  },
  {
    id: 4,
    name: "RTX 4090 Gaming Build",
    brand: "Custom PC",
    price: 4500,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600",
    tag: "Elite"
  },
  {
    id: 5,
    name: "Samsung Odyssey G9",
    brand: "Samsung",
    price: 1299,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600",
    tag: "Best Display"
  },
  {
    id: 6,
    name: "Logitech G Pro X",
    brand: "Logitech",
    price: 149,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600",
    tag: "Esports"
  },
  {
    id: 7,
    name: "PlayStation 5 Slim",
    brand: "Sony",
    price: 499,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=600",
    tag: "Trending"
  },
  {
    id: 8,
    name: "DJI Mavic 3 Pro",
    brand: "DJI",
    price: 2199,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=600",
    tag: "New Arrival"
  }
];

const AdSection = () => {
  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Admin's <span className="text-blue-600 dark:text-blue-500">Selection</span>
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
          </div>
          <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            View All Collection →
          </button>
        </div>

        {/* Product Grid - Desktop: 4 Columns, Tablet: 2 Columns, Mobile: 1 Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl dark:hover:shadow-blue-900/10 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority={product.id <= 4}
                />
                
                {/* Badges & Actions */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">
                    {product.tag}
                  </span>
                </div>
                
                <button className="absolute top-3 right-3 z-10 p-2.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  <Heart size={16} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{product.rating}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-zinc-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-5">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] uppercase font-bold">Price</span>
                    <span className="text-xl font-black text-gray-900 dark:text-white">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                  
                  <button className="flex items-center justify-center bg-zinc-900 dark:bg-blue-600 text-white w-11 h-11 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-90 shadow-lg shadow-blue-900/20">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdSection;