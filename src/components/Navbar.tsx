import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 2rem)', maxWidth: '56rem', zIndex: 50 }}>
      <motion.div
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.9 }}
        className={`liquid-glass rounded-full px-5 h-14 flex items-center transition-shadow duration-300 ${scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : ''}`}
      >
        <div className="flex-1 text-white text-xl tracking-tight" style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}>
          Aether
        </div>
        <div className="flex shrink-0 gap-6">
          {['Shop', 'Collections', 'About', 'Cart'].map((link) => (
            <a key={link} href="#" className="text-sm text-white/75 hover:text-white font-normal transition-colors">
              {link}
            </a>
          ))}
        </div>
        <div className="flex-1 flex justify-end">
          <button className="bg-white text-black rounded-full px-5 py-1.5 text-sm font-medium flex items-center gap-1 hover:bg-white/90 transition-colors">
            Shop Now <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
