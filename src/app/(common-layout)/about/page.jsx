"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Globe,
  Zap,
  Code2,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  // Stats data
  const stats = [
    { label: "Happy Customers", value: "8K+" },
    { label: "Products Sold", value: "25K+" },
    { label: "Brands Available", value: "40+" },
    { label: "Customer Support", value: "24/7" },
  ];

  // Core values
  const coreValues = [
    {
      title: "Latest Gadgets",
      desc: "We curate cutting-edge gadgets and smart accessories from trusted global brands.",
      icon: Zap,
      color: "text-yellow-500",
    },
    {
      title: "Trusted & Secure",
      desc: "Secure payments, genuine products, and complete data protection for every customer.",
      icon: ShieldCheck,
      color: "text-emerald-500",
    },
    {
      title: "Nationwide Delivery",
      desc: "Fast and reliable delivery across the country with real-time order tracking.",
      icon: Globe,
      color: "text-blue-500",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ================= HERO SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
              <Rocket size={14} />
              Our Mission
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9]">
              SMARTER <br />
              <span className="text-blue-600 italic">GADGETS</span> FOR LIFE.
            </h1>

            <p className="text-lg text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
              Welcome to GadgetHub — your trusted destination for premium tech
              gadgets and smart accessories. Since 2026, we’ve been delivering
              innovation, quality, and reliability for modern lifestyles.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-gray-100 dark:border-zinc-800">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white">
                    {stat.value}
                  </h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= IMAGE CARD ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-[3rem] overflow-hidden bg-zinc-900 shadow-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800"
              alt="Gadget Technology"
              fill
              className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent" />

            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
              <Cpu className="text-white mb-4" size={32} />
              <h3 className="text-white font-black text-xl italic uppercase tracking-tighter">
                Premium Gadgets. Real Innovation.
              </h3>
            </div>
          </motion.div>
        </div>

        {/* ================= CORE VALUES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <value.icon
                className={`${value.color} mb-6 group-hover:scale-110 transition-transform`}
                size={40}
              />
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ================= FOUNDER SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-900 rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl shrink-0">
              <Image
                src="https://i.ibb.co.com/rKMCFZC6/photo-2026-01-20-15-19-29.jpg"
                alt="Founder"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>

            <div className="text-center lg:text-left space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-blue-400">
                <Code2 size={20} />
                <span className="font-black uppercase tracking-[0.3em] text-xs">
                  Founder & Developer
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                Md. Sakhawat Hossain
              </h2>

              <p className="text-zinc-400 text-lg font-medium max-w-2xl leading-relaxed">
                "GadgetHub started with a simple mission — make premium gadgets
                accessible to everyone. As a developer and tech enthusiast, I
                built this platform focusing on performance, trust, and modern
                user experience."
              </p>

              <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="px-8 py-3 bg-white text-zinc-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                  Explore Gadgets
                </button>
                <button className="px-8 py-3 bg-zinc-800 text-white rounded-xl font-black text-[10px] uppercase tracking-widest border border-zinc-700 hover:border-blue-500 transition-all">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
};

export default AboutPage;
