"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  PackagePlus, UploadCloud, Phone, Monitor, 
  Truck, Info, ShieldAlert, Cpu, Tag, Briefcase, 
  DollarSign, Image as ImageIcon 
} from 'lucide-react';

const AddProductForm = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      category: "Laptop",
      condition: "New (Sealed)",
      files: [null, null]
    }
  });

  const watchedFiles = watch("files");
  const categories = ["Laptop", "Smartphone", "Desktop PC", "Gaming Console", "Smart Watch", "Audio & Headphones", "Camera & Optics", "PC Components", "Monitors", "Networking Devices", "Storage (SSD/HDD)", "Peripherals (Keyboard/Mouse)"];

  const onSubmit = (data) => console.log("Validated Data:", data);

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
        <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-2">Inventory Management System</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        
        {/* SECTION: BASIC INFO */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-blue-600">
            <Info size={24} strokeWidth={3} />
            <h3 className="text-xl font-black uppercase italic">Step 1: Core Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-tighter">Product Full Name</label>
              <input 
                {...register("productName", { required: "Name is required" })}
                placeholder="Ex: Asus ROG Zephyrus G14"
                className={`premium-input ${errors.productName ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-zinc-700'}`}
              />
              {errors.productName && <p className="text-red-500 text-xs font-bold uppercase italic">{errors.productName.message}</p>}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-tighter">Brand Name</label>
              <input 
                {...register("brand", { required: "Brand is required" })}
                placeholder="Ex: ASUS, HP, Apple"
                className={`premium-input ${errors.brand ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-300 dark:border-zinc-700'}`}
              />
              {errors.brand && <p className="text-red-500 text-xs font-bold uppercase italic">{errors.brand.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-3 text-sm font-black">
              <label className="uppercase text-gray-700 dark:text-gray-200">Category</label>
              <select {...register("category")} className="premium-input border-gray-300 dark:border-zinc-700 cursor-pointer">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-3 text-sm font-black">
              <label className="uppercase text-gray-700 dark:text-gray-200">Condition</label>
              <select {...register("condition")} className="premium-input border-gray-300 dark:border-zinc-700 cursor-pointer">
                <option>New (Sealed)</option>
                <option>Used (Like New)</option>
                <option>Refurbished</option>
              </select>
            </div>
            <div className="space-y-3 text-sm font-black">
              <label className="uppercase text-gray-700 dark:text-gray-200">Price (BDT)</label>
              <input 
                type="number" {...register("price", { required: "Required" })}
                placeholder="95000"
                className={`premium-input ${errors.price ? 'border-red-500' : 'border-gray-300 dark:border-zinc-700'}`}
              />
            </div>
          </div>
        </section>

        {/* SECTION: MEDIA & CONTACT */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-600 uppercase font-black italic"><Phone /> Contact & Warranty</div>
            <div className="space-y-4">
               <input {...register("phone", { required: true })} placeholder="Phone Number" className="premium-input border-emerald-500/30" />
               <input {...register("warranty", { required: true })} placeholder="Warranty (Ex: 2 Years)" className="premium-input border-blue-500/30" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-orange-600 uppercase font-black italic"><UploadCloud /> Images (Min 2)</div>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1].map(i => (
                <div key={i} className="relative h-24 border-2 border-dashed border-gray-400 dark:border-zinc-600 rounded-xl flex items-center justify-center hover:border-orange-500 transition-colors">
                  <input type="file" onChange={(e) => handleFileChange(i, e)} className="absolute inset-0 opacity-0 cursor-pointer" />
                  {watchedFiles[i] ? <span className="text-[10px] font-bold text-orange-600 truncate px-2">{watchedFiles[i].name}</span> : <ImageIcon className="text-gray-400" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: DESCRIPTION */}
        <section className="space-y-4 pt-6">
          <label className="block text-xl font-black text-purple-600 uppercase italic">Step 3: Technical Story</label>
          <textarea 
            rows="8" 
            {...register("description", { required: true, minLength: 50 })}
            placeholder="Describe the product specs, health, and why someone should buy it..."
            className="premium-input border-gray-300 dark:border-zinc-700 min-h-[200px] text-lg font-medium"
          ></textarea>
        </section>

        <button type="submit" className="w-full cursor-pointer bg-blue-600 hover:bg-black text-white py-6 rounded-2xl font-black text-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-4 shadow-2xl">
          Finalize & Deploy <Truck size={28} />
        </button>
      </form>

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
          transform: translateY(-2px);
        }
        .premium-input::placeholder {
          color: #94a3b8;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default AddProductForm;