"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Save, ArrowLeft, Tag, DollarSign, Package, Phone, List } from "lucide-react";
import Swal from "sweetalert2";

const EditProductModel = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const [product, setProduct] = useState({
    productName: "",
    brand: "",
    category: "",
    condition: "",
    price: "",
    phone: "",
    warranty: "",
    description: "",
  });

  useEffect(() => {
    const getAssetData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        // আপনার স্ক্রিনশট অনুযায়ী সঠিক এপিআই পাথ এখানে দেওয়া হলো
        const res = await axios.get(`/api/vendor/edit-product/${id}`);
        
        const data = res.data;
        if (data) {
          // স্টেটে ডাটা সেট হওয়া মাত্রই ইনপুট ফিল্ডে ভ্যালুগুলো চলে আসবে
          setProduct({
            productName: data.productName || "",
            brand: data.brand || "",
            category: data.category || "",
            condition: data.condition || "",
            price: data.price || "",
            phone: data.phone || "",
            warranty: data.warranty || "",
            description: data.description || "",
          });
        }
      } catch (err) {
        console.error("Data loading failed:", err);
        // যদি এরর আসে তবে কনসোলে চেক করুন পাথ ঠিক আছে কি না
      } finally {
        setLoading(false);
      }
    };

    getAssetData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // আপডেট করার সময়ও একই এপিআই পাথ ব্যবহার করুন
      const res = await axios.patch(`/api/vendor/edit-product/${id}`, product);
      if (res.status === 200) {
        Swal.fire({
          title: "PROTOCOL UPDATED",
          text: "Asset data synchronized successfully.",
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
          confirmButtonColor: "#2563eb",
        });
        router.push("/dashboard/vendor/my-products");
      }
    } catch (error) {
      Swal.fire("ERROR", "Failed to update asset", "error");
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center font-black italic animate-pulse dark:bg-[#0a0a0a] dark:text-white">
      RETRIEVING ENCRYPTED DATA...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-500 hover:text-blue-600 mb-8 font-bold text-xs uppercase">
          <ArrowLeft size={16} /> Back to Vault
        </button>

        <h1 className="text-5xl font-black uppercase italic dark:text-white mb-10 leading-none">
          Edit <span className="text-blue-600">Asset</span>_
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Asset Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 ml-4">Asset Name</label>
              <div className="relative">
                <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="text"
                  value={product.productName}
                  onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl py-4 pl-14 pr-6 dark:text-white font-bold outline-none focus:ring-2 ring-blue-600/20"
                />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 ml-4">Valuation (BDT)</label>
              <div className="relative">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl py-4 pl-14 pr-6 dark:text-white font-bold outline-none focus:ring-2 ring-blue-600/20"
                />
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 ml-4">Brand</label>
              <div className="relative">
                <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="text"
                  value={product.brand}
                  onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl py-4 pl-14 pr-6 dark:text-white font-bold outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400 ml-4">Phone</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="text"
                  value={product.phone}
                  onChange={(e) => setProduct({ ...product, phone: e.target.value })}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl py-4 pl-14 pr-6 dark:text-white font-bold outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-zinc-400 ml-4">Description</label>
            <textarea
              rows="6"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-6 dark:text-white font-medium outline-none focus:ring-2 ring-blue-600/20"
            ></textarea>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-3 py-5 bg-blue-600 text-white rounded-3xl font-black uppercase italic tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all">
            <Save size={20} /> Update Parameters_
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModel;