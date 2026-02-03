import React from "react";
import { dbConnect, collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb"; 
import Image from "next/image";
import { 
  ShieldCheck, 
  Phone, 
  Tag, 
  Cpu, 
  Globe, 
  ArrowRight, 
  CheckCircle2,
  Box,
  Truck
} from "lucide-react";

const ProductDetailsPage = async ({ params }) => {
  // ১. Next.js 16 এ params অবশ্যই await করতে হবে
  const { id } = await params;

  // ২. ডাটাবেস থেকে প্রোডাক্ট বের করা
  const productsCollection = await dbConnect(collections.PRODUCTS);
  const product = await productsCollection.findOne({ _id: new ObjectId(id) });

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-zinc-300 dark:text-zinc-800 animate-pulse">
          Asset Not Found_
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        
        {/* Main Grid: Image & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Gallery Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <Image 
                src={product.images?.[0]} 
                alt={product.productName} 
                fill 
                priority
                className="object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white">
                  <Image src={img} alt={`Gallery-${index}`} fill className="object-cover hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1 rounded-full bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-600/20">
                {product.condition}
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                <Box size={14}/> {product.category}
              </span>
            </div>

            <h1 className="text-6xl font-black text-zinc-900 dark:text-white tracking-[-0.04em] leading-[0.9] uppercase italic mb-6">
              {product.productName}
            </h1>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-5xl font-black text-blue-600 tracking-tighter italic">
                ৳{product.price.toLocaleString()}
              </span>
              <span className="text-zinc-400 font-bold text-xs uppercase tracking-widest">Global Asset Value</span>
            </div>

            {/* Tech Bento Grid Mini */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-5 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm group hover:border-blue-600/50 transition-colors">
                <ShieldCheck className="text-emerald-500 mb-2" size={24}/>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Warranty</p>
                <p className="font-bold text-zinc-900 dark:text-white text-sm">{product.warranty}</p>
              </div>
              <div className="p-5 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm group hover:border-blue-600/50 transition-colors">
                <Truck className="text-blue-500 mb-2" size={24}/>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Shipping</p>
                <p className="font-bold text-zinc-900 dark:text-white text-sm">Ready to Deploy</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="space-y-4">
              <button className="group w-full h-18 py-5 bg-blue-600 hover:bg-black text-white rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/20">
                Secure Procurement <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
              </button>
              <button className="w-full h-18 py-5 bg-transparent text-zinc-900 dark:text-white border-2 border-zinc-200 dark:border-zinc-800 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">
                Add to Inventory
              </button>
            </div>

            {/* Seller Quick Profile */}
            <div className="mt-12 p-6 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-600 bg-white">
                  <Image src={product.sellerImage} alt="Seller" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest italic">Asset Manager</p>
                  <p className="text-lg font-black uppercase text-zinc-900 dark:text-white tracking-tighter leading-none">{product.sellerName}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                 <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase">
                   <CheckCircle2 size={12}/> Verified
                 </div>
                 <p className="text-[10px] font-bold text-zinc-400">{product.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specs & Description Section */}
        <div className="mt-24 pt-12 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.4em] italic">Technical Specifications_</h2>
            <p className="text-xl font-medium text-zinc-600 dark:text-zinc-400 leading-[1.8] whitespace-pre-line italic">
              {product.description}
            </p>
          </div>
          <div className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-900/30 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-zinc-400">Security Note_</h3>
             <ul className="space-y-4">
                {["Escrow Protected", "Hardware Inspected", "Global Techhub Standard"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100">
                    <CheckCircle2 className="text-blue-600" size={16}/> {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;