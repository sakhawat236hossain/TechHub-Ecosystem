"use client";
import {
  Monitor,
  Smartphone,
  Watch,
  Headphones,
  Gamepad2,
  Laptop,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Laptops",
    icon: <Laptop size={32} />,
    count: "45 Items",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  },
  {
    id: 2,
    name: "Phones",
    icon: <Smartphone size={32} />,
    count: "80 Items",
    color:
      "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  },
  {
    id: 3,
    name: "Watches",
    icon: <Watch size={32} />,
    count: "30 Items",
    color:
      "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  },
  {
    id: 4,
    name: "Audio",
    icon: <Headphones size={32} />,
    count: "55 Items",
    color:
      "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
  },
  {
    id: 5,
    name: "Gaming",
    icon: <Gamepad2 size={32} />,
    count: "25 Items",
    color: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
  },
  {
    id: 6,
    name: "Monitors",
    icon: <Monitor size={32} />,
    count: "20 Items",
    color: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
              Featured Categories
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Find the best tech essentials for your need
            </p>
          </div>
          <Link
            href="/products"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200 cursor-pointer"
          >
            View All
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-xl dark:hover:shadow-blue-900/10 hover:border-blue-100 dark:hover:border-blue-900 transition-all cursor-pointer group"
            >
              <div
                className={`p-4 rounded-full mb-4 transition-colors ${cat.color} group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500`}
              >
                {cat.icon}
              </div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {cat.count}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
