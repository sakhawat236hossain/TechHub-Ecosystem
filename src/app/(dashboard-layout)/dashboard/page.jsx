"use client";
import React from 'react';
import { motion } from 'framer-motion';
// import { useAuth } from '@/providers/AuthProvider'; // Future Auth Integration

const DashboardHome = () => {
  // const { user } = useAuth(); // Assume role comes from here
  const role = "admin"; 

  // Dynamic stats based on role
  const statsConfig = {
    admin: [
      { label: "Total Revenue", value: "$124,250", change: "+14% from last month" },
      { label: "Active Vendors", value: "142", change: "+5 new today" },
      { label: "Pending Approvals", value: "12", change: "High Priority" },
    ],
    user: [
      { label: "Total Orders", value: "08", change: "View History" },
      { label: "Points Earned", value: "1,200", change: "Redeemable" },
      { label: "Active Warranty", value: "02", change: "Checking Status" },
    ]
  };

  const currentStats = statsConfig[role] || statsConfig.user;

  return (
    <div className="space-y-10">
      {/* Dynamic Header based on Role */}
      <header>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none">
          {role} <span className="text-blue-600">Console.</span>
        </h2>
        <p className="text-gray-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-widest mt-2">
          System operational and ready for deployment.
        </p>
      </header>

      {/* Stats Cards with English Comments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentStats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:shadow-2xl hover:shadow-blue-600/5 transition-all group"
          >
            {/* Label for the stat */}
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-blue-600 transition-colors">
               {stat.label}
            </p>
            {/* Main Value */}
            <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter my-4">
              {stat.value}
            </h3>
            {/* Status Indicator */}
            <div className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-50 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 border border-gray-100 dark:border-zinc-700">
               {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Integration area for future charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="h-80 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900 border-2 border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sales Analytics Chart</p>
         </div>
         <div className="h-80 rounded-[2.5rem] bg-gray-50 dark:bg-zinc-900 border-2 border-dashed border-gray-200 dark:border-zinc-800 flex items-center justify-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">User Growth Data</p>
         </div>
      </div>
    </div>
  );
};

export default DashboardHome;