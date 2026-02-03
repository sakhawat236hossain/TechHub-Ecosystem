"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { Edit3, Trash2, Plus, Box, LayoutGrid, List } from "lucide-react";
import Swal from "sweetalert2";

const MyInventory = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      axios
        .get(`/api/vendor/my-products/${session.user.email}`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [session]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "ARE YOU SURE?",
      text: "This product will be permanently removed from vault!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#18181b",
      confirmButtonText: "YES, DELETE IT",
      background: "#0a0a0a",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/vendor/delete-product/${id}`);
        setProducts(products.filter((p) => p._id !== id));
        Swal.fire({
          title: "DELETED!",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
        });
      } catch (error) {
        Swal.fire("ERROR", "Failed to delete product", "error");
      }
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#fcfcfc] dark:bg-[#0a0a0a]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter dark:text-white">
              My <span className="text-blue-600">Inventory</span>_
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mt-2">
              Manage your listed assets and stock.
            </p>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-blue-600/20">
            <Plus size={16} /> Add New Asset
          </button>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="group bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] overflow-hidden flex flex-col hover:border-blue-600/40 transition-all duration-500"
            >
              {/* Image Preview */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.images?.[0] || "/placeholder.jpg"}
                  alt="product"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">
                    {item.category || "General"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-black uppercase italic dark:text-white truncate mb-1">
                  {item.productName}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-600 font-black text-sm italic">
                    ৳{item.price.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">
                    Qty: {item.stock || 0}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-zinc-50 dark:border-zinc-800">
                  <button className="flex-1 flex items-center justify-center cursor-pointer gap-2 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                    <Edit3 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2.5 cursor-pointer bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/10"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-[3rem]">
            <Box size={40} className="text-zinc-300 mb-4" />
            <p className="font-black uppercase italic text-zinc-400 tracking-widest text-xs">
              Your vault is empty_
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInventory;
