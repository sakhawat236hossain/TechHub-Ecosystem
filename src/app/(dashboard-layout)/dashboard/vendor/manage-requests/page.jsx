"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { Check, X, User, Package, Layers } from "lucide-react";

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

  if (loading) return <div className="h-screen flex items-center justify-center font-black italic animate-pulse tracking-[0.3em]">SCANNING INCOMING REQUESTS...</div>;

  return (
    <div className="p-8 bg-[#fcfcfc] dark:bg-[#0a0a0a] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Layers className="text-blue-600" size={32} />
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Incoming Requests <span className="text-blue-600">_</span>
          </h1>
        </div>
        
        <div className="grid gap-6">
          {requests.map((order) => (
            <div key={order._id} className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between shadow-sm hover:border-blue-600/30 transition-all">
              
              <div className="flex items-center gap-6">
                {/* Product Preview */}
                <div className="relative w-24 h-24 rounded-[1.8rem] overflow-hidden border-2 border-zinc-100 dark:border-zinc-800">
                  <Image src={order.productImages?.[0]} alt="Product" fill className="object-cover" />
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-lg font-black uppercase italic tracking-tight mb-1">{order.productName}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-black rounded-full border border-zinc-200 dark:border-zinc-800">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden">
                        <Image src={order.buyerImage} alt="Buyer" fill className="object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase">{order.buyerName}</span>
                    </div>
                    <span className="text-blue-600 font-black text-sm italic">৳{order.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (কাছেই বাটনগুলো রাখলাম, ফাংশন পরে যোগ করবো) */}
              <div className="flex items-center gap-3 mt-6 md:mt-0">
                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20">
                  <Check size={16} /> Accept
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all border border-red-500/20">
                  <X size={16} /> Reject
                </button>
              </div>

            </div>
          ))}

          {requests.length === 0 && (
            <div className="text-center py-24 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[3.5rem]">
              <Package className="mx-auto text-zinc-300 mb-4" size={48} />
              <p className="font-black uppercase italic text-zinc-400 tracking-widest">No Incoming Assets Requests Found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;