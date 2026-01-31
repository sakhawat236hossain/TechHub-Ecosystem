"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Camera, Edit3 } from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  // In a real app, this data would come from your AuthProvider
  const user = {
    name: "Md. Sakhawat Hossain",
    email: "hmdsakhawat236@gmail.com",
    phone: "+880 1851121472",
    address: "Dhanmondi, Dhaka, Bangladesh",
    role: "Admin",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm"
      >
        {/* Cover Gradient */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
        
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row items-end -mt-12 gap-6 mb-8">
            {/* Avatar with Upload Icon */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl border-4 border-white dark:border-zinc-900 overflow-hidden bg-gray-100">
                <Image 
                  src={user.image} 
                  alt="Profile" 
                  fill 
                  className="object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={16} />
              </button>
            </div>

            <div className="flex-1 pb-2">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">
                {user.name}
              </h2>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">
                {user.role} Account
              </p>
            </div>

            <button className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all mb-2">
              <Edit3 size={14} />
              Edit Profile
            </button>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50">
              <div className="p-3 bg-blue-100 dark:bg-blue-600/10 text-blue-600 rounded-xl">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                <p className="font-bold text-gray-900 dark:text-white">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-600/10 text-emerald-600 rounded-xl">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                <p className="font-bold text-gray-900 dark:text-white">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 md:col-span-2">
              <div className="p-3 bg-purple-100 dark:bg-purple-600/10 text-purple-600 rounded-xl">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Shipping Address</p>
                <p className="font-bold text-gray-900 dark:text-white">{user.address}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;