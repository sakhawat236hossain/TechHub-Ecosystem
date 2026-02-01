"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useState } from "react"; 
import { ShieldCheck } from "lucide-react"; 

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, 
    });

    if (res.ok) {
      toast.success("Login Successful!");
      router.push("/"); 
      router.refresh(); 
    } else {
      toast.error("Invalid Email or Password");
    }
  };

  const fillAdminCredentials = () => {
    setEmail("admin@gmail.com");
    setPassword("Ab1234");
    toast.success("Admin Credentials Loaded!", {
      icon: '🔐',
      style: { borderRadius: '10px', background: '#333', color: '#fff' }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <Toaster position="top-center" />
      
      <form onSubmit={handleLogin} className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-2xl font-black mb-6 text-zinc-900 dark:text-white text-center">Welcome Back</h2>
        
        <div className="space-y-4">
          {/* Admin Demo Access Button */}
          <button 
            type="button"
            onClick={fillAdminCredentials}
            className="w-full py-2 mb-2 cursor-pointer bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center justify-center gap-2 text-amber-700 dark:text-amber-500 text-xs font-black uppercase tracking-widest hover:bg-amber-100 transition-all group"
          >
            <ShieldCheck size={16} className="group-hover:scale-110 transition-transform" />
            Quick Admin Login (Demo)
          </button>

          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com" 
              required 
              className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-500 ml-1">Password</label>
            <input 
              type="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
              className="w-full px-5 py-3 mt-1 rounded-xl border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 outline-none focus:border-blue-500 transition" 
            />
          </div>
          
          <button type="submit" className="w-full py-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25">
            Log In
          </button>
        </div>

        <div className="mt-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-zinc-900 px-2 text-zinc-400">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => signIn("google", { callbackUrl: "/" })} type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-semibold text-sm cursor-pointer">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" /> Google
            </button>

            <button onClick={() => signIn("github", { callbackUrl: "/" })} type="button" className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all font-semibold text-sm cursor-pointer">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5 dark:invert" alt="GitHub" /> GitHub
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-500">
          New here? <Link href="/register" className="text-blue-600 font-bold hover:underline">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;