"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { Check, X, Package, Layers, User, Calendar, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

const ManageRequests = () => {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      axios.get(`/api/vendor/getAllProducts/${session.user.email}`)
        .then(res => {
          setRequests(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [session]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#fcfcfc] dark:bg-[#0a0a0a]">
       <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black italic text-[10px] uppercase tracking-[0.3em] text-zinc-500">Accessing Terminal...</p>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] p-5 md:p-10 lg:p-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Header */}
        <div className="mb-12 border-l-4 border-blue-600 pl-6">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter dark:text-white">
            Request <span className="text-blue-600">Feed</span>_
          </h1>
          <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest mt-2">
            Manage incoming asset bookings and purchase intents.
          </p>
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {requests.map((order) => (
            <div 
              key={order._id} 
              className="group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Product Preview & Price */}
              <div className="relative mb-6">
                <div className="relative h-44 w-full rounded-[2rem] overflow-hidden">
                  <Image 
                    src={order.productImages?.[0]} 
                    alt="asset" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                    <span className="text-sm font-black text-blue-600 italic">৳{order.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Information Area */}
              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tight dark:text-white leading-tight">
                    {order.productName}
                  </h3>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">ID: #{order._id.slice(-6)}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-blue-600/10">
                      <Image src={order.buyerImage} alt="buyer" fill className="object-cover" />
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-tighter dark:text-zinc-300 leading-none">{order.buyerName}</p>
                       <p className="text-[9px] font-bold text-zinc-500 uppercase leading-none mt-1">Requester</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Futuristic Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                  <Check size={14} /> Accept
                </button>
                <button className="flex items-center justify-center gap-2 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95">
                  <X size={14} /> Reject
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {requests.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center border-4 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[4rem]">
              <Package className="text-zinc-200 dark:text-zinc-800 mb-4" size={50} />
              <p className="font-black uppercase italic text-zinc-400 tracking-[0.4em] text-xs">No Incoming Data Stream_</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;