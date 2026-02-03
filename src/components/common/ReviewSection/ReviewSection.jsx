"use client";
import React, { useState } from "react";
import { Star, MessageSquare, Send, User } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import axios from "axios";
import Image from "next/image";

const ReviewSection = ({ productId, existingReviews = [] }) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      return toast.error("Please login to transmit feedback_");
    }

    setLoading(true);
    const loadingToast = toast.loading("Syncing review with TechHub...");

    try {
      await axios.post("/api/public/products/review", {
        productId,
        rating,
        comment,
        userName: session.user.name,
        userImage: session.user.image,
        userEmail: session.user.email,
      });

      toast.success("Review deployed successfully!", { id: loadingToast });
      setComment("");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Transmission failed!", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 border-t border-zinc-200 dark:border-zinc-800 pt-16">
      <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-10">
        User Feedback <span className="text-blue-600">_</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
       
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl h-fit">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6 italic">
            Write a Review
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`transition-all ${rating >= num ? "text-yellow-400" : "text-zinc-300"}`}
                >
                  <Star
                    fill={rating >= num ? "currentColor" : "none"}
                    size={28}
                  />
                </button>
              ))}
            </div>
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this tech asset..."
              className="w-full h-32 p-4 rounded-2xl bg-zinc-50 dark:bg-black border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
            />
            <button
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-black transition-all"
            >
              {loading ? "Syncing..." : "Post Review"} <Send size={14} />
            </button>
          </form>
        </div>

        {/* রিভিউ লিস্ট */}
        <div className="lg:col-span-7 space-y-8">
          {existingReviews.length === 0 ? (
            <div className="text-zinc-400 font-bold uppercase italic text-sm tracking-widest">
              No transmissions received yet.
            </div>
          ) : (
            existingReviews.map((rev, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 rounded-[2rem] bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-600 h-fit">
                  <Image
                    src={rev.userImage || "/default-avatar.png"}
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
                      {rev.userName}
                    </p>
                    <div className="flex text-yellow-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    {new Date(rev.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
