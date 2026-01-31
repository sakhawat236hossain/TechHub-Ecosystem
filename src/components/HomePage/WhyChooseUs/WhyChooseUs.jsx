"use client"
import { Truck, ShieldCheck, CreditCard, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    title: "Free Delivery",
    desc: "On all orders over $500",
    icon: <Truck size={40} />,
    borderColor: "group-hover:border-blue-500",
    glow: "group-hover:shadow-blue-500/20",
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    id: 2,
    title: "Official Warranty",
    desc: "100% authentic gadgets",
    icon: <ShieldCheck size={40} />,
    borderColor: "group-hover:border-green-500",
    glow: "group-hover:shadow-green-500/20",
    color: "text-green-600 dark:text-green-400"
  },
  {
    id: 3,
    title: "Secure Payment",
    desc: "Stripe secure checkout",
    icon: <CreditCard size={40} />,
    borderColor: "group-hover:border-purple-500",
    glow: "group-hover:shadow-purple-500/20",
    color: "text-purple-600 dark:text-purple-400"
  },
  {
    id: 4,
    title: "24/7 Support",
    desc: "Dedicated tech experts",
    icon: <Headphones size={40} />,
    borderColor: "group-hover:border-orange-500",
    glow: "group-hover:shadow-orange-500/20",
    color: "text-orange-600 dark:text-orange-400"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 transition-all duration-500 ${service.borderColor} ${service.glow} hover:shadow-2xl hover:-translate-y-2`}
            >
              {/* Subtle Background Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent dark:from-zinc-800/50 dark:to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`${service.color} mb-6 transform group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-zinc-100 mb-3 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* Decorative Corner Element */}
              <div className={`absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${service.color.split(' ')[0].replace('text', 'bg')}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;