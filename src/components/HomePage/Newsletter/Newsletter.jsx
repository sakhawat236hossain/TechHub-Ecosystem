"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, Send, CheckCircle2 } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-6 sm:p-10 md:p-16 lg:p-20 shadow-2xl"
        >
          {/* Background Orbs */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-48 h-48 md:w-[400px] md:h-[400px] bg-blue-600/20 rounded-full blur-[60px] md:blur-[100px]" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-48 h-48 md:w-[300px] md:h-[300px] bg-indigo-600/20 rounded-full blur-[60px] md:blur-[100px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Side: Content */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mx-auto lg:mx-0">
                <Sparkles size={12} className="md:size-3.5" />
                Exclusive Member Perk
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter text-white">
                WANT <span className="text-blue-500 italic">10% OFF</span> YOUR <br className="hidden sm:block" />
                NEXT TECH UPGRADE?
              </h2>
              
              <p className="text-zinc-400 text-base md:text-lg lg:text-xl font-medium max-w-2xl mx-auto lg:mx-0">
                Join our ecosystem. Get early access to new gadgets, <br className="hidden md:block" /> 
                tech-tour updates, and exclusive promo codes.
              </p>
            </div>

            {/* Right Side: Form */}
            <div className="lg:col-span-5 relative w-full max-w-md mx-auto">
              {!subscribed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <form 
                    onSubmit={handleSubscribe}
                    className="flex flex-col gap-3"
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 md:left-5 flex items-center pointer-events-none">
                        <Mail className="text-zinc-500 group-focus-within:text-blue-500 transition-colors size-5" />
                      </div>
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-zinc-800/50 border border-zinc-700 text-white px-12 md:px-14 py-4 md:py-5 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all font-bold text-sm"
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                    >
                      Unlock Discount
                      <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                  
                  <p className="text-[9px] md:text-[10px] text-zinc-500 text-center font-bold uppercase tracking-widest leading-relaxed">
                    By subscribing, you agree to our <span className="text-zinc-300 underline cursor-pointer">Privacy Policy</span>. <br />
                    No spam. Just pure tech.
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-blue-600/10 border border-blue-500/20 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] text-center space-y-4 md:space-y-5 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-blue-600/40">
                    <CheckCircle2 size={24} className="md:size-32 text-white" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">Welcome to the Club!</h3>
                    <p className="text-blue-200/80 text-xs md:text-sm font-bold">Check your email. Your code is waiting.</p>
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;