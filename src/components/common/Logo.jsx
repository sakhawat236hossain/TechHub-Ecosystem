import Link from 'next/link';

const Logo = ({ className = "" }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      {/* Icon Part */}
      <div className="bg-blue-600 text-white px-2 py-1 rounded-lg text-lg font-bold transition-transform group-hover:scale-110">
        TH
      </div>
      
      {/* Text Part */}
      <span className="text-xl md:text-2xl font-bold text-blue-600 tracking-tight">
        Tech<span className="text-gray-800">Hub</span>
      </span>
    </Link>
  );
};

export default Logo;