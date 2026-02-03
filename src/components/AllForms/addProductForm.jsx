"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react"; 
import {
  PackagePlus,
  UploadCloud,
  Phone,
  Monitor,
  Truck,
  Info,
  ShieldAlert,
  Cpu,
  Tag,
  Briefcase,
  DollarSign,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { uploadImageToCloudinary } from "@/utils";

const AddProductForm = () => {
  const { data: session } = useSession(); 
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      category: "Laptop",
      condition: "New (Sealed)",
      files: [null, null],
    },
  });

  const watchedFiles = watch("files");
  const categories = [
    "Laptop",
    "Smartphone",
    "Desktop PC",
    "Gaming Console",
    "Smart Watch",
    "Audio & Headphones",
    "Camera & Optics",
    "PC Components",
    "Monitors",
    "Networking Devices",
    "Storage (SSD/HDD)",
    "Peripherals (Keyboard/Mouse)",
    "Mouse",
    
  ];

  // --- Main Submit Logic ---
  const onSubmit = async (data) => {
    if (!session) {
      toast.error("You must be logged in to deploy assets!");
      return;
    }

    const toastId = toast.loading("Deploying product to TechHub...");

    try {
      setLoading(true);

      const imageUrls = [];
      for (const file of data.files) {
        if (file) {
          const url = await uploadImageToCloudinary(file);
          if (url) imageUrls.push(url);
        }
      }

      const finalProductData = {
        productName: data.productName,
        brand: data.brand,
        category: data.category,
        condition: data.condition,
        price: Number(data.price),
        phone: data.phone,
        warranty: data.warranty,
        description: data.description,
        images: imageUrls,
        sellerEmail: session.user?.email,
        sellerName: session.user?.name,
        sellerImage: session.user?.image,
        postedAt: new Date().toISOString(),
      };

      const response = await axios.post(
        "/api/vendor/products/post",
        finalProductData,
      );

      if (response.data.success) {
        toast.success("🔥 Product deployed successfully!", { id: toastId });
        reset();
      } else {
        throw new Error(response.data.message || "Failed to post");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(
        error.response?.data?.message || "Deployment failed. Please try again.",
        { id: toastId },
      );
    } finally {
      setLoading(false);
    }
  };

  const onError = (validationErrors) =>
    console.log("❌ Validation Failed:", validationErrors);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const currentFiles = [...watchedFiles];
      currentFiles[index] = file;
      setValue("files", currentFiles, { shouldValidate: true });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-24 px-4 pt-10">
      <header className="border-b-4 border-blue-600 pb-6">
        <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tight uppercase italic">
          Add <span className="text-blue-600">Product</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-2 italic">
          Asset Deployment Console by {session?.user?.name || "Guest"}
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-12">
        {/* SECTION 1: CORE DETAILS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-blue-600">
            <Info size={24} strokeWidth={3} />
            <h3 className="text-xl font-black uppercase italic">
              Step 1: Core Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-sm font-black text-gray-700 dark:text-gray-200 uppercase">
                Product Full Name
              </label>
              <input
                {...register("productName", { required: "Name is required" })}
                placeholder="Ex: Asus ROG Zephyrus G14"
                className={`premium-input ${errors.productName ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-zinc-700"}`}
              />
              {errors.productName && (
                <p className="text-red-500 text-[10px] font-black uppercase mt-1">
                  {errors.productName.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-black b text-gray-700 dark:text-gray-200 uppercase">
                Brand Name
              </label>
              <input
                {...register("brand", { required: "Brand is required" })}
                placeholder="Ex: Apple, HP"
                className={`premium-input ${errors.brand ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-300 dark:border-zinc-700"}`}
              />
              {errors.brand && (
                <p className="text-red-500 text-[10px] font-black uppercase mt-1">
                  {errors.brand.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-3 text-sm font-black">
              <label className="uppercase text-gray-700 dark:text-gray-200">
                Category
              </label>
              <select
                {...register("category")}
                className="premium-input border-gray-300 dark:border-zinc-700 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-3 text-sm font-black">
              <label className="uppercase text-gray-700 dark:text-gray-200">
                Condition
              </label>
              <select
                {...register("condition")}
                className="premium-input border-gray-300 dark:border-zinc-700 cursor-pointer"
              >
                <option>New (Sealed)</option>
                <option>Used (Like New)</option>
                <option>Refurbished</option>
              </select>
            </div>
            <div className="space-y-3 text-sm font-black">
              <label className="uppercase text-gray-700 dark:text-gray-200">
                Price (BDT)
              </label>
              <input
                type="number"
                {...register("price", { required: "Price required", min: 1 })}
                placeholder="95000"
                className="premium-input border-gray-300 dark:border-zinc-700"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: MEDIA & CONTACT */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-600 uppercase font-black italic">
              <Phone size={20} /> Contact & Warranty
            </div>
            <div className="space-y-4">
              <input
                {...register("phone", { required: "Required" })}
                placeholder="Phone Number"
                className="premium-input border-emerald-500/30"
              />
              <input
                {...register("warranty", { required: "Required" })}
                placeholder="Warranty (Ex: 2 Years)"
                className="premium-input border-blue-500/30"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-orange-600 uppercase font-black italic">
              <UploadCloud size={20} /> Images (Min 2)
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="relative h-24 border-2 border-dashed border-gray-400 dark:border-zinc-600 rounded-xl flex items-center justify-center bg-white dark:bg-zinc-900 overflow-hidden"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(i, e)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                  />
                  {watchedFiles[i] ? (
                    <span className="text-[10px] font-black text-orange-600 truncate px-2">
                      {watchedFiles[i].name}
                    </span>
                  ) : (
                    <ImageIcon className="text-gray-400" />
                  )}
                </div>
              ))}
            </div>
            <input
              type="hidden"
              {...register("files", {
                validate: (v) => (v[0] && v[1]) || "Both images are required",
              })}
            />
            {errors.files && (
              <p className="text-red-500 text-[10px] font-black uppercase text-center">
                {errors.files.message}
              </p>
            )}
          </div>
        </section>

        {/* SECTION 3: DESCRIPTION */}
        <section className="space-y-4 pt-6">
          <label className="block text-xl font-black text-purple-600 uppercase italic">
            Step 3: Technical Story
          </label>
          <textarea
            rows="8"
            {...register("description", { required: true, minLength: 50 })}
            placeholder="Describe the product specs in detail..."
            className="premium-input border-gray-300 dark:border-zinc-700 min-h-[200px]"
          ></textarea>
        </section>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-6 rounded-2xl font-black text-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-4 shadow-2xl ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-black text-white cursor-pointer"}`}
        >
          {loading ? (
            <>
              Deploying to Cloud...{" "}
              <Loader2 className="animate-spin" size={28} />
            </>
          ) : (
            <>
              Finalize & Deploy <Truck size={28} />
            </>
          )}
        </button>
      </form>

      {/* Internal CSS for Premium UI */}
      <style jsx>{`
        .premium-input {
          width: 100%;
          padding: 1.25rem;
          border-width: 2px;
          border-style: solid;
          border-radius: 1rem;
          background-color: white;
          color: #1a1a1a;
          font-weight: 700;
          outline: none;
          transition: all 0.2s ease-in-out;
        }
        :global(.dark) .premium-input {
          background-color: #09090b;
          color: #f4f4f5;
        }
        .premium-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
      `}</style>
    </div>
  );
};

export default AddProductForm;
