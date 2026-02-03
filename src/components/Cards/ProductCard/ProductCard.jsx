import React from "react";
import Image from "next/image";
import { Tag } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.productName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
          {product.condition}
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2 text-blue-600 text-[10px] font-black uppercase tracking-widest">
          <Tag size={12} /> {product.category}
        </div>
        <h3 className="text-xl font-black text-gray-900 dark:text-white truncate">
          {product.productName}
        </h3>
        <p className="text-2xl font-black text-blue-600">
          ৳{product.price.toLocaleString()}
        </p>

        <Link href={`/products/${product._id}`}>
          <button className="bg-blue-600 hover:bg-black text-white px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
