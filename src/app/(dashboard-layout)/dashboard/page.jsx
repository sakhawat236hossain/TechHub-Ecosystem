"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const DashboardHome = () => {
  const { data: session } = useSession();
  const role = session?.user?.role || "user";
  console.log(session);
  // Role based stats
  const statsConfig = {
    admin: [
      {
        label: "Total Revenue",
        value: "৳124,250",
        change: "+14% from last month",
      },
      { label: "Active Vendors", value: "142", change: "+5 new today" },
    ],
    vendor: [
      { label: "Total Sales", value: "৳45,000", change: "Current Balance" },
      { label: "Pending Requests", value: "05", change: "Needs Action" },
    ],
    user: [
      { label: "Total Orders", value: "08", change: "View History" },
      { label: "Points Earned", value: "1,200", change: "Redeemable" },
    ],
  };

  const currentStats = statsConfig[role] || statsConfig.user;

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none">
          {role} <span className="text-blue-600">Console.</span>
        </h2>
        <p className="text-gray-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-widest mt-2 italic">
          Welcome back, {session?.user?.name || "Operative"}_
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
              {stat.label}
            </p>
            <h3 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
              {stat.value}
            </h3>
            <span className="px-3 py-1 rounded-lg bg-gray-50 dark:bg-zinc-800 text-[10px] font-black uppercase text-zinc-500 border border-gray-100 dark:border-zinc-700">
              {stat.change}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
