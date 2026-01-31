"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

const brands = [
  { name: "Apple", logo: "https://cdn.worldvectorlogo.com/logos/apple-13.svg" },
  { name: "Samsung", logo: "https://cdn.worldvectorlogo.com/logos/samsung-6.svg" },
  { name: "Logitech", logo: "https://cdn.worldvectorlogo.com/logos/logitech-2.svg" },
  { name: "HP", logo: "https://cdn.worldvectorlogo.com/logos/hp-1.svg" },
  { name: "ASUS", logo: "https://cdn.worldvectorlogo.com/logos/asus-4.svg" }, 
  { name: "Sony", logo: "https://cdn.worldvectorlogo.com/logos/sony-logo-1.svg" },
  { name: "Dell", logo: "https://cdn.worldvectorlogo.com/logos/dell-2.svg" },
  { name: "Intel", logo: "https://cdn.worldvectorlogo.com/logos/intel.svg" },
];

const BrandSlider = () => {
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-20 bg-zinc-100/50 dark:bg-zinc-950 overflow-hidden border-y border-gray-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 mb-14 text-center">
        <h2 className="text-xs md:text-sm font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.4em] mb-3">
          Trusted Partners
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg font-bold">
          Authorized Retailer of Global Tech Giants
        </p>
      </div>

      <div className="relative flex items-center">
        {/* Infinite Scrolling Container */}
        <motion.div 
          className="flex gap-8 md:gap-12 items-center whitespace-nowrap"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div key={index} className="group relative flex-shrink-0">
              {/* Logo Card - Always White Background for visibility */}
              <div className="relative h-20 w-36 md:h-24 md:w-48 bg-white rounded-2xl flex items-center justify-center p-6 shadow-sm border-2 border-transparent group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-all duration-300 transform group-hover:scale-105">
                
                {/* Logo Image */}
                <div className="relative h-full w-full">
                  <Image 
                    src={brand.logo} 
                    alt={brand.name} 
                    fill
                    className="object-contain"
                    unoptimized 
                  />
                </div>

                {/* Background Glow for Dark Mode */}
                <div className="absolute -inset-1 bg-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Stronger Side Fades */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-zinc-100/80 dark:from-zinc-950 via-zinc-100/40 dark:via-zinc-950/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-zinc-100/80 dark:from-zinc-950 via-zinc-100/40 dark:via-zinc-950/50 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default BrandSlider;