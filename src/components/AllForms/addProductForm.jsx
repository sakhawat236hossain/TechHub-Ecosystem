"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  PackagePlus, UploadCloud, Phone, Monitor, 
  Truck, Info, ShieldAlert, Cpu, Layers, Image as ImageIcon,
  DollarSign, Tag, Briefcase
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

  const categories = [
    "Laptop", "Smartphone", "Desktop PC", "Gaming Console", 
    "Smart Watch", "Audio & Headphones", "Camera & Optics", 
    "PC Components", "Monitors", "Networking Devices", 
    "Storage (SSD/HDD)", "Peripherals (Keyboard/Mouse)"
  ];

  const onSubmit = (data) => {
    console.log("Validated Data for DB:", data);
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const currentFiles = [...watchedFiles];
      currentFiles[index] = file;
      setValue("files", currentFiles, { shouldValidate: true });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24 px-4">
      {/* Dynamic Header */}
      <header className="relative py-6 border-b border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-600 rounded-3xl shadow-lg shadow-blue-600/20 text-white">
            <PackagePlus size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
              New <span className="text-blue-600">Inventory.</span>
            </h2>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Deployment System v2.0</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        {/* SECTION 1: CORE DETAILS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-[3rem] p-10 border border-gray-100 dark:border-zinc-800 shadow-xl shadow-gray-100/50 dark:shadow-none space-y-8"
        >
          <div className="flex items-center gap-3">
             <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
             <h3 className="font-black text-sm uppercase tracking-widest text-gray-800 dark:text-zinc-200">Core Specifications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Tag size={12}/> Product Name
              </label>
              <input 
                {...register("productName", { required: "Name is required" })}
                className={`input-field ${errors.productName ? 'input-error' : ''}`} 
                placeholder="MacBook Pro M3 Max" 
              />
              {errors.productName && <span className="error-text">{errors.productName.message}</span>}
            </div>

            <div className="group space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Briefcase size={12}/> Brand / Vendor
              </label>
              <input 
                {...register("brand", { required: "Brand is required" })}
                className={`input-field ${errors.brand ? 'input-error' : ''}`} 
                placeholder="Apple / StarTech" 
              />
              {errors.brand && <span className="error-text">{errors.brand.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
              <select {...register("category")} className="input-field cursor-pointer appearance-none bg-no-repeat bg-[right_1.5rem_center]">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Condition</label>
              <select {...register("condition")} className="input-field cursor-pointer appearance-none">
                <option>New (Sealed)</option>
                <option>Used (Like New)</option>
                <option>Refurbished</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <DollarSign size={12}/> Price (BDT)
              </label>
              <input 
                type="number" {...register("price", { required: "Price is required" })}
                className={`input-field ${errors.price ? 'input-error' : ''}`} 
                placeholder="0.00" 
              />
              {errors.price && <span className="error-text">{errors.price.message}</span>}
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: LOGISTICS & MEDIA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-gray-100 dark:border-zinc-800 space-y-8">
            <div className="space-y-6">
              <div className="group space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 transition-colors">
                  <Phone size={12}/> Hotline Support
                </label>
                <input 
                  type="tel" {...register("phone", { required: "Required", pattern: { value: /^[0-9+]{11,14}$/, message: "Invalid" }})}
                  className={`input-field focus:ring-emerald-500/20 ${errors.phone ? 'input-error' : ''}`} 
                  placeholder="+880 1..." 
                />
              </div>
              <div className="group space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 transition-colors">
                  <Monitor size={12}/> Warranty Terms
                </label>
                <input {...register("warranty", { required: "Required" })} className="input-field" placeholder="12 Months Official" />
              </div>
            </div>
          </motion.div>

          {/* Media Upload Area */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-gray-100 dark:border-zinc-800 space-y-6 flex flex-col justify-center">
             <label className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-2"><UploadCloud size={14}/> Asset Documentation (2)</label>
             <div className="grid grid-cols-2 gap-4">
                {[0, 1].map((idx) => (
                  <div key={idx} className="relative group overflow-hidden rounded-[2rem] bg-gray-50 dark:bg-zinc-800/50 border-2 border-dashed border-gray-200 dark:border-zinc-700 hover:border-orange-500/50 transition-all aspect-square flex flex-col items-center justify-center cursor-pointer">
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => handleFileChange(idx, e)} />
                    {watchedFiles[idx] ? (
                      <div className="text-center px-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-500/10 rounded-full inline-block mb-2">
                          <ImageIcon size={20} className="text-orange-600" />
                        </div>
                        <p className="text-[8px] font-black text-gray-500 truncate w-24 uppercase tracking-tighter">{watchedFiles[idx].name}</p>
                      </div>
                    ) : (
                      <div className="text-center group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} className="text-gray-300 mx-auto" />
                        <span className="text-[8px] font-black uppercase text-gray-400 mt-2 block">Upload</span>
                      </div>
                    )}
                  </div>
                ))}
             </div>
             <input type="hidden" {...register("files", { validate: v => v[0] && v[1] || "Upload both images" })} />
             {errors.files && <p className="error-text text-center"><ShieldAlert size={10} className="inline mr-1"/> {errors.files.message}</p>}
          </motion.div>
        </div>

        {/* SECTION 3: DESCRIPTION */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-gray-100 dark:border-zinc-800 space-y-6">
          <div className="flex justify-between items-center px-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-purple-500">Tech Specifications Narrative</label>
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Supports Markdown</span>
          </div>
          <textarea 
            rows="12" 
            {...register("description", { required: "Description is missing", minLength: 50 })}
            placeholder="Go deep into the tech specs, battery performance, screen quality, and thermal performance..."
            className={`input-field min-h-[300px] py-8 px-8 leading-relaxed resize-none ${errors.description ? 'input-error' : ''}`}
          ></textarea>
        </motion.div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end pt-4">
          <button type="submit" className="relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white px-16 py-6 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-blue-600/30 transition-all active:scale-95 flex items-center gap-4">
            <span className="relative z-10">Deploy Asset to Market</span>
            <Truck size={20} className="relative z-10 group-hover:translate-x-4 transition-transform duration-500" />
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
          </button>
        </div>
      </form>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 1.25rem 1.75rem;
          border-radius: 1.5rem;
          background-color: #f8fafc;
          border: 2px solid transparent;
          outline: none;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1e293b;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        :global(.dark) .input-field {
          background-color: #18181b;
          color: #f4f4f5;
        }
        .input-field:focus {
          background-color: transparent;
          border-color: #2563eb;
          box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.1);
        }
        .input-error {
          border-color: #ef4444 !important;
          background-color: #fef2f2 !important;
        }
        :global(.dark) .input-error {
          background-color: #450a0a !important;
        }
        .error-text {
          font-size: 9px;
          font-weight: 800;
          color: #ef4444;
          text-transform: uppercase;
          margin-left: 0.5rem;
          letter-spacing: 0.05em;
        }
        @keyframes shine {
          100% { left: 125%; }
        }
      `}</style>
    </div>
  );
};

export default AddProductForm;