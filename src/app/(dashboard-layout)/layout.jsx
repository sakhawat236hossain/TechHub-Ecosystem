"use client";
import React, { useState } from 'react';
import { Menu, X, Bell, User as UserIcon } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const userRole = "admin"; 

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex transition-colors duration-500 overflow-hidden text-zinc-900 dark:text-zinc-100">
      
      {/* 1. Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-72 transform transition-transform duration-300 ease-in-out bg-white dark:bg-zinc-900
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
      `}>
        <Sidebar role={userRole} setOpen={setSidebarOpen} />
      </aside>

      {/* Mobile Overlay - Clicking outside sidebar closes it */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Dashboard Header - Sticky and Responsive */}
        <header className="sticky top-0 z-40 h-20 shrink-0 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between px-6 md:px-10">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2.5 bg-blue-600 text-white rounded-xl shadow-lg active:scale-90 transition-transform"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hidden sm:block">
              TechHub <span className="text-blue-600">Ecosystem</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white dark:border-zinc-900"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100 dark:border-zinc-800">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] font-black uppercase leading-tight">Sakhawat Hossain</p>
                <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest leading-none mt-1">{userRole} Account</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 border border-blue-600/20">
                <UserIcon size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* 3. Dynamic Page Content */}
        <main className="p-6 md:p-10 transition-all">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}