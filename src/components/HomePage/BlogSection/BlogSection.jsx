"use client"
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, User, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const blogs = [
  {
    id: 1,
    title: "Top 5 Wireless Mouse in 2026 for Professionals",
    excerpt: "Discover the most ergonomic and high-precision mice that are dominating the workspace this year...",
    date: "Jan 28, 2026",
    author: "Admin",
    image: "https://m.media-amazon.com/images/I/61fLMkhyQeL._AC_SY450_.jpg",
    category: "Gadgets"
  },
  {
    id: 2,
    title: "Why OLED Monitors are the Future of Gaming",
    excerpt: "Deep blacks, infinite contrast, and lightning-fast response times. Is it time to upgrade your setup?",
    date: "Jan 25, 2026",
    author: "Tech Guru",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800",
    category: "Gaming"
  },
  {
    id: 3,
    title: "M4 iPad Pro: The Only Computer You Need?",
    excerpt: "With the power of the M4 chip, Apple is blurring the lines between tablets and laptops even further...",
    date: "Jan 20, 2026",
    author: "Siam",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800",
    category: "Reviews"
  }
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Tech <span className="text-blue-600 dark:text-blue-500">Insights</span>
            </h2>
            <div className="h-1.5 w-12 bg-blue-600 rounded-full"></div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Stay updated with the latest trends and expert reviews.
            </p>
          </div>
          <Link 
            href="/blogs" 
            className="group flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
          >
            View All Stories 
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col"
            >
              <Link href="/blogs" className="block overflow-hidden rounded-[2.5rem] mb-6 shadow-lg border border-gray-100 dark:border-zinc-800">
                <div className="relative h-64 w-full">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    unoptimized 
                  />
                  <div className="absolute top-5 left-5">
                    <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Text Content */}
              <div className="space-y-4 px-2">
                <div className="flex items-center gap-5 text-[11px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-600" /> {blog.date}</span>
                  <span className="flex items-center gap-1.5"><User size={14} className="text-blue-600" /> BY {blog.author}</span>
                </div>
                
                <Link href="/blogs">
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {blog.title}
                    </h3>
                </Link>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed font-medium">
                  {blog.excerpt}
                </p>

                <div className="pt-2">
                  <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white group-hover:gap-4 transition-all duration-300">
                    READ STORY <ArrowRight size={18} className="text-blue-600" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;