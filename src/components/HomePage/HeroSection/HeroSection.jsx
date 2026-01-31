"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "Revolutionize Your Setup",
    subtitle: "Get the latest M3 MacBook Pro and high-end peripherals at unbeatable prices.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600",
    buttonText: "Grab Yours",
    color: "bg-blue-600"
  },
  {
    id: 2,
    title: "Next-Gen Gaming Experience",
    subtitle: "Powerful RTX 4090 builds and 4K 144Hz monitors ready for your command.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600",
    buttonText: "View Deals",
    color: "bg-cyan-500"
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <section className="relative h-[350px] md:h-[500px] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2)), url(${slides[current].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-white">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block text-blue-400 font-bold tracking-widest uppercase text-xs md:text-sm mb-2"
              >
                Exclusive Tech Deal
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm md:text-lg mb-6 text-gray-300 leading-relaxed max-w-lg"
              >
                {slides[current].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link 
                  href="/products" 
                  className={`${slides[current].color} px-8 py-3 rounded-lg font-bold text-base md:text-lg hover:brightness-110 transition-all shadow-lg active:scale-95 inline-block`}
                >
                  {slides[current].buttonText}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <button 
          onClick={prevSlide} 
          className="pointer-events-auto p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white transition-all backdrop-blur-sm border border-white/10"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide} 
          className="pointer-events-auto p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white transition-all backdrop-blur-sm border border-white/10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${index === current ? 'w-8 bg-blue-500' : 'w-3 bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;