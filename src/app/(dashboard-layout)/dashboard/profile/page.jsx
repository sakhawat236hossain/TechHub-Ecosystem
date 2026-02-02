"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Mail, Phone, MapPin, Camera, Edit3, Loader2 } from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [dbUser, setDbUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/public/profile");
        setDbUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchUserProfile();
    }
  }, [session]);

  if (loading) return <div className="text-center py-20 font-black uppercase tracking-widest">Loading Database Records...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
        
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row items-end -mt-12 gap-6 mb-8">
            <div className="w-32 h-32 rounded-3xl border-4 border-white dark:border-zinc-900 overflow-hidden bg-zinc-100">
               <Image 
                  src={dbUser?.image || "/default-avatar.png"} 
                  alt="Profile" width={128} height={128} className="object-cover"
                />
            </div>
            <div className="flex-1 pb-2">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase">
                {dbUser?.name || session?.user?.name}
              </h2>
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest">
                {dbUser?.role || "User"} Account
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-gray-100 dark:border-zinc-800">
            {/* Email (DB) */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 flex items-center gap-4">
              <Mail className="text-blue-600" />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Email Address</p>
                <p className="font-bold dark:text-white">{dbUser?.email}</p>
              </div>
            </div>

            {/* Phone (DB থেকে আসবে) */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 flex items-center gap-4">
              <Phone className="text-emerald-600" />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Phone Number</p>
                <p className="font-bold dark:text-white">{dbUser?.phone || "No phone added"}</p>
              </div>
            </div>

            {/* Address (DB থেকে আসবে) */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 flex items-center gap-4 md:col-span-2">
              <MapPin className="text-purple-600" />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Shipping Address</p>
                <p className="font-bold dark:text-white">{dbUser?.address || "No address found in records"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;