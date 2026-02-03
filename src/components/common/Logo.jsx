import Link from 'next/link';

const Logo = ({ className = "" }) => {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      {/* Icon Part */}
      <div className="relative overflow-hidden bg-blue-600 text-white px-2 py-1.5 rounded-[10px] text-lg font-black tracking-tighter transition-all duration-300 group-hover:bg-black dark:group-hover:bg-white dark:group-hover:text-black group-hover:rotate-[5deg] shadow-lg shadow-blue-600/20">
        TH
       <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700"></div>
      </div>
      
      {/* Text Part */}
      <div className="flex flex-col leading-none">
        <span className="text-xl md:text-2xl font-black italic tracking-tighter text-blue-600">
          TECH<span className="text-zinc-800 dark:text-zinc-100 transition-colors">HUB</span>
        </span>
        <span className="text-[7px] font-bold uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">
          The Vault
        </span>
      </div>
    </Link>
  );
};

export default Logo;