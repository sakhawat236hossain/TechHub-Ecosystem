"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { uploadImageToCloudinary } from "@/utils";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const password = form.password.value;
    const imageFile = form.image.files[0];

    if (!name || !email || !phone || !password || !imageFile) {
      toast.error("Please fill in all fields and select an image!");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      const imageUrl = await uploadImageToCloudinary(imageFile);
      if (!imageUrl) throw new Error("Image upload failed");

      const userInfo = { name, email, phone, password, image: imageUrl };

      const res = await fetch("/api/public/usersPost", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      if (res.ok) {
        toast.success("Account created! Logging in...", { id: toastId });
        await signIn("credentials", { email, password, callbackUrl: "/" });
      } else {
        const error = await res.json();
        toast.error(error.message || "Registration failed!", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <Toaster position="top-center" />
      <form onSubmit={handleRegister} className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-2xl font-black mb-6 text-zinc-900 dark:text-white text-center">Create Account</h2>
        
        <div className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" className="w-full px-5 py-3 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" />
          <input type="email" name="email" placeholder="Email Address" className="w-full px-5 py-3 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" />
          <input type="tel" name="phone" placeholder="Phone Number" className="w-full px-5 py-3 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" />
          <input type="file" name="image" accept="image/*" className="w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full px-5 py-3 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25">
            {loading ? "Registering..." : "Register Now"}
          </button>
        </div>

        {/* Social Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button onClick={() => signIn("google", { callbackUrl: "/" })} type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-semibold text-sm cursor-pointer"><img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" /> Google</button>
          <button onClick={() => signIn("github", { callbackUrl: "/" })} type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-semibold text-sm cursor-pointer"><img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5 dark:invert" alt="GitHub" /> GitHub</button>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;