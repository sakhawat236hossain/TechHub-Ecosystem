"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { ShoppingBag, ArrowRight } from "lucide-react";

const BuyNowButton = ({ product }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    if (!session) return toast.error("Log in to initiate procurement!");

    setLoading(true);
    const orderToast = toast.loading("Connecting to secure server...");

    try {
      const orderInfo = {
        productId: product._id,
        productName: product.productName,
        price: product.price,

        productImages: product.images,
        sellerEmail: product.sellerEmail,
        sellerName: product.sellerName,
        sellerImage: product.sellerImage,

        buyerEmail: session.user.email,
        buyerName: session.user.name,
        buyerImage: session.user.image,
      };

      await axios.post("/api/public/orders", orderInfo);

      toast.success("Procurement Initialized! Status: Pending", {
        id: orderToast,
      });
    } catch (error) {
      toast.error("Deployment failed. Check network.", { id: orderToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      disabled={loading}
      className="group w-full h-18 py-5 bg-blue-600 hover:bg-black text-white rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50"
    >
      <ShoppingBag size={18} />
      {loading ? "Processing..." : "Buy Now"}
      <ArrowRight
        size={18}
        className="group-hover:translate-x-2 transition-transform"
      />
    </button>
  );
};

export default BuyNowButton;
