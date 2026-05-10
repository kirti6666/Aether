import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!ref.current) return;
    const section = ref.current;
    
    const words = ['T-Shirts', 'Joggers', 'Skirts', 'Tops', 'Accessories', 'Gymwear', 'Bags', 'Hats', 'Shoes'];
    const poolSize = 20;
    const pool: { el: HTMLDivElement }[] = [];
    
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.inset = '0';
    container.style.overflow = 'hidden';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '0';
    
    section.appendChild(container);
    
    for (let i = 0; i < poolSize; i++) {
      const el = document.createElement('div');
      el.style.position = 'absolute';
      el.style.width = '140px';
      el.style.height = '180px';
      el.style.borderRadius = '12px';
      el.style.pointerEvents = 'none';
      el.style.opacity = '0';
      el.style.willChange = 'transform, opacity';
      
      // Styling for text card
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.background = 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01))';
      el.style.border = '1px solid rgba(255, 255, 255, 0.08)';
      el.style.backdropFilter = 'blur(16px)';
      el.style.color = '#fafafa';
      el.style.fontSize = '1.65rem';
      el.style.fontFamily = '"Instrument Serif", serif';
      el.style.fontStyle = 'italic';
      el.style.letterSpacing = '0.02em';
      el.style.textShadow = '0 2px 10px rgba(255, 255, 255, 0.15)';
      el.style.boxShadow = 'inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 15px 35px rgba(0,0,0,0.6)';
      
      el.textContent = words[i % words.length];
      
      container.appendChild(el);
      pool.push({ el });
    }
    
    let idx = 0;
    let lastX = 0;
    let lastY = 0;
    const threshold = 60;
    
    const spawnTrail = (x: number, y: number) => {
      const item = pool[idx % poolSize];
      idx++;
      
      const rect = section.getBoundingClientRect();
      const localX = x - rect.left;
      const localY = y - rect.top;
      
      item.el.style.left = (localX - 80) + 'px';
      item.el.style.top = (localY - 100) + 'px';
      item.el.style.opacity = '0.6';
      item.el.style.transform = `scale(0.8) rotate(${Math.random() * 20 - 10}deg)`;
      item.el.style.transition = 'none';
      
      void item.el.offsetHeight;
      
      item.el.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease';
      item.el.style.opacity = '0';
      item.el.style.transform = `scale(0.6) rotate(${Math.random() * 30 - 15}deg)`;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.sqrt(dx * dx + dy * dy) > threshold) {
        lastX = e.clientX;
        lastY = e.clientY;
        spawnTrail(e.clientX, e.clientY);
      }
    };
    
    section.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      if (section.contains(container)) {
        section.removeChild(container);
      }
    };
  }, []);

  return (
    <section ref={ref} className="bg-black py-28 md:py-40 px-6 relative overflow-hidden cursor-crosshair">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center relative z-10 pointer-events-none">
        <motion.span
          custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}
          className="section-badge"
        >
          Explore
        </motion.span>

        <motion.h2
          custom={1} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}
          className="text-5xl md:text-6xl lg:text-7xl text-white tracking-[-0.04em] leading-[0.9] mt-6"
          style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}
        >
          Your new wardrobe <br /> starts here.
        </motion.h2>

        <motion.p
          custom={2} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}
          className="text-[1.05rem] text-white/70 font-light max-w-md mx-auto mt-8 mb-10 leading-relaxed"
        >
          Explore the latest collection and elevate your daily aesthetic.
        </motion.p>

        <motion.div
          custom={3} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pointer-events-auto"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="liquid-glass-strong group relative overflow-hidden rounded-full px-8 py-3.5 text-white font-medium flex items-center gap-2 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <div className="absolute inset-0 bg-[#f9a8d4]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="group-hover:text-[#f9a8d4] transition-colors duration-300 flex items-center gap-2">
              Shop Collection <ArrowUpRight className="w-4 h-4" />
            </span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="liquid-glass group relative overflow-hidden rounded-full px-8 py-3.5 text-white/80 font-light flex items-center gap-2 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <div className="absolute inset-0 bg-[#f9a8d4]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="group-hover:text-[#f9a8d4] transition-colors duration-300 flex items-center gap-2">
              View Lookbook <ChevronRight className="w-4 h-4" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
