import Link from 'next/link';
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, Github, X } from 'lucide-react';
import Logo from '../common/Logo';

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/md.sakhawth.hosain', color: 'hover:text-blue-600' },
    { name: 'X', icon: X, href: 'https://x.com/MdSakhawat21005', color: 'hover:text-sky-500' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/md-sakhawat-hossain-web-developer/', color: 'hover:text-blue-700' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/sakhawat236hossain', color: 'hover:text-gray-900 dark:hover:text-white' },
  ];

  return (
    <footer className="bg-white dark:bg-zinc-950 text-gray-600 dark:text-zinc-400 border-t border-gray-100 dark:border-zinc-900 pt-20 pb-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6">
            <Logo />
            <p className="text-sm leading-relaxed max-w-xs">
              Book your favorite gadgets, tech-tours, and event tickets easily with TechHub Ecosystem. The future is here.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`hover:-translate-y-1 transition-transform duration-300 cursor-pointer ${social.color}`}
                >
                  <social.icon size={20} strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Explore */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-widest text-xs">Explore</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home Feed</Link></li>
              <li><Link href="/products" className="hover:text-blue-600 transition-colors">Tech Store</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">Our Vision</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Expert</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-6 uppercase tracking-widest text-xs">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 italic">
                <Mail size={16} className="text-blue-600" /> hmdsakhawat236@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-600" /> +880 1851121472
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-600" /> Tech Plaza, Dhaka, BD
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800">
            <h3 className="text-gray-900 dark:text-white font-bold mb-2 text-sm">Subscribe</h3>
            <p className="text-xs mb-4 opacity-70">Get the latest tech news first.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="w-full bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-4 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
              <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                Join Community
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 pt-8 border-t border-gray-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">
          <p>© 2026 TechHub Ecosystem. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
          <p>Developed with ❤️ by <a href="https://github.com/sakhawat236hossain" target="_blank" className="text-blue-600 hover:underline">Sakhawat Hossain</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;