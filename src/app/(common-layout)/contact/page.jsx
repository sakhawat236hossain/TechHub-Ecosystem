"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Facebook, Linkedin, Github, X 
} from "lucide-react";

const ContactPage = () => {
  // Social links data
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/md.sakhawth.hosain', color: 'hover:bg-blue-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/md-sakhawat-hossain-web-developer/', color: 'hover:bg-blue-700' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/sakhawat236hossain', color: 'hover:bg-zinc-800' },
    { name: 'X', icon: X, href: 'https://x.com/MdSakhawat21005', color: 'hover:bg-black' },
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Integration logic goes here
  };

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter"
          >
            GET IN <span className="text-blue-600">TOUCH.</span>
          </motion.h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
            Have a question about a product or interested in a tech-tour? 
            Our expert team is here to help you navigate the TechHub ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Contact Information & Socials */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              {/* Contact Card: Email */}
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 dark:border-blue-500/20 transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Email Us</h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors">hmdsakhawat236@gmail.com</p>
                </div>
              </motion.div>

              {/* Contact Card: Phone */}
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-600/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100 dark:border-emerald-500/20 transition-colors">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Call Expert</h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors">+880 1851121472</p>
                </div>
              </motion.div>

              {/* Contact Card: Office */}
              <motion.div whileHover={{ x: 10 }} className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-600/10 flex items-center justify-center text-purple-600 shrink-0 border border-purple-100 dark:border-purple-500/20 transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Visit Office</h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Tech Plaza, Dhanmondi, Dhaka</p>
                </div>
              </motion.div>
            </div>

            {/* NEW: Social Media Links Section */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 ml-1">Follow the Ecosystem</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 text-gray-600 dark:text-zinc-400 transition-all duration-300 ${social.color} hover:text-white hover:border-transparent shadow-sm`}
                  >
                    <social.icon size={20} strokeWidth={2.5} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Support Note Card */}
            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 transition-colors">
              <div className="flex items-center gap-3 text-blue-600 mb-4">
                <MessageSquare size={20} />
                <span className="font-black uppercase tracking-widest text-[10px]">Support Policy</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed font-medium transition-colors">
                Our average response time is <strong>under 2 hours</strong> during business hours. 
                We provide 24/7 technical support for our premium ecosystem members.
              </p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[3rem] border border-gray-100 dark:border-zinc-800 shadow-2xl shadow-gray-200/50 dark:shadow-none transition-colors"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 italic">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold text-gray-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 italic">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@email.com"
                    className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 italic">Inquiry Subject</label>
                <select className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold text-gray-900 dark:text-white appearance-none cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Product Support</option>
                  <option>Tech-Tour Booking</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2 italic">Your Message</label>
                <textarea 
                  rows={5}
                  placeholder="How can we help the future arrive faster for you?"
                  className="w-full bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold text-gray-900 dark:text-white resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                Send Message
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;