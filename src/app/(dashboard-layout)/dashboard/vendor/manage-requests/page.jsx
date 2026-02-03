"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { Check, X, Package, RefreshCw } from "lucide-react";
import Swal from 'sweetalert2'; 

const ManageRequests = () => {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetchRequests();
    }
  }, [session]);

  const fetchRequests = () => {
    axios.get(`/api/vendor/manageRequests/${session.user.email}`)
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const result = await Swal.fire({
      title: `<span style="font-family: 'Inter', sans-serif; font-weight: 900; font-style: italic;">CONFIRM ${newStatus.toUpperCase()}?</span>`,
      text: "Do you want to update the asset status?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'accepted' ? '#10b981' : '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: `YES, ${newStatus.toUpperCase()}`,
      background: '#18181b', 
      color: '#fff',
      customClass: {
        popup: 'rounded-[2rem] border border-zinc-800 shadow-2xl',
        confirmButton: 'rounded-xl font-black px-6 py-3 uppercase tracking-widest text-[10px]',
        cancelButton: 'rounded-xl font-black px-6 py-3 uppercase tracking-widest text-[10px]'
      }
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.patch("/api/vendor/update-status", { orderId, newStatus });

        if (response.status === 200) {
          Swal.fire({
            title: 'PROTOCOL UPDATED',
            text: `Asset is now ${newStatus}.`,
            icon: 'success',
            background: '#18181b',
            color: '#fff',
            timer: 1500,
            showConfirmButton: false
          });

          setRequests((prev) =>
            prev.map((req) => req._id === orderId ? { ...req, status: newStatus } : req)
          );
        }
      } catch (error) {
        Swal.fire('ERROR', 'System synchronization failed.', 'error');
      }
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#fcfcfc] dark:bg-[#0a0a0a]">
       <RefreshCw className="animate-spin text-blue-600" size={30} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] p-5 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-12">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter dark:text-white">
            Asset <span className="text-blue-600">Terminal</span>_
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((order) => (
            <div key={order._id} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-6 flex flex-col group transition-all hover:border-blue-600/30">
              
              <div className="relative h-40 w-full rounded-[1.8rem] overflow-hidden mb-5">
                <Image src={order.productImages?.[0] || "/placeholder.jpg"} alt="asset" fill className="object-cover" />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-md border ${
                  order.status === 'accepted' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20' : 
                  order.status === 'rejected' ? 'bg-red-500/20 text-red-500 border-red-500/20' : 
                  'bg-blue-600 text-white border-blue-600'
                }`}>
                  {order.status}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-black uppercase italic dark:text-white leading-tight">{order.productName}</h3>
                <div className="flex items-center gap-2 mt-2 opacity-60">
                   <div className="w-5 h-5 rounded-full overflow-hidden relative">
                      <Image src={order.buyerImage} alt="buyer" fill className="object-cover" />
                   </div>
                   <span className="text-[9px] font-bold dark:text-white uppercase tracking-widest">{order.buyerName}</span>
                </div>
              </div>

              <div className="flex gap-2 p-1.5 bg-zinc-50 dark:bg-black rounded-[1.5rem] border border-zinc-100 dark:border-zinc-800 shadow-inner">
                <button 
                  onClick={() => handleStatusChange(order._id, "accepted")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 cursor-pointer rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${
                    order.status === "accepted" 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" 
                    : "text-zinc-400 hover:text-emerald-500"
                  }`}
                >
                  <Check size={14} /> Accept
                </button>

                <button 
                  onClick={() => handleStatusChange(order._id, "rejected")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer  font-black text-[9px] uppercase tracking-widest transition-all ${
                    order.status === "rejected" 
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30" 
                    : "text-zinc-400 hover:text-red-500"
                  }`}
                >
                  <X size={14} /> Reject
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;