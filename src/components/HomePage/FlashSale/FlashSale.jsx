"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Image from "next/image";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-800 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
          {/* Decorative Background Icon */}
          <Zap className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold border border-white/20">
                <Zap size={16} className="fill-current" />
                Limited Time Offer
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-tight">
                FLASH SALE <br />
                <span className="text-yellow-300">UP TO 60% OFF</span>
              </h2>
              <p className="text-orange-50 font-medium max-w-md">
                Grab the most anticipated gadgets before they are gone. High
                demand, low stock!
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="flex gap-4 md:gap-6">
              {[
                { label: "Hours", value: timeLeft.hours },
                { label: "Min", value: timeLeft.minutes },
                { label: "Sec", value: timeLeft.seconds },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-white text-gray-900 w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-black shadow-lg">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="mt-2 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 dark:bg-zinc-100 text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-white/10 transition-all shrink-0"
            >
              Shop Now
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
