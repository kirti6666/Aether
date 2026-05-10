import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import ParticleTitle from './ParticleTitle';
import LivingBackground from './LivingBackground';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.6], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} style={{ height: '100vh', minHeight: '600px', background: 'black', overflow: 'hidden', position: 'relative' }}>
      <LivingBackground />

      {/* Hero content */}
      <motion.div
        style={{ y, opacity, zIndex: 10, paddingTop: '110px' }}
        className="relative flex flex-col items-center justify-center h-full px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="hero-badge-container inline-flex items-center gap-3 rounded-full px-4 py-2 mb-8 cursor-pointer"
        >
          <span className="badge-new-tag bg-white/10 text-white text-[0.7rem] uppercase tracking-widest font-bold px-3 py-1 rounded-full">New</span>
          <div className="heartbeat-dot" />
          <span className="text-white/80 text-[0.85rem] font-medium tracking-wide">Introducing the Autumn Collection</span>
        </motion.div>

        {/* Title */}
        <div style={{ maxWidth: '960px', width: '100%' }}>
          <ParticleTitle />
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-white/65 text-[1rem] font-light max-w-lg mx-auto"
        >
          Exquisite fabrics. Tailored precision. Crafted for the bold. This is fashion, wildly reimagined.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-6"
        >
          <button className="hero-primary-btn rounded-full px-8 py-3.5 text-white font-medium flex items-center gap-2">
            <span className="relative z-10 flex items-center gap-2">Shop Collection <ArrowUpRight className="w-4 h-4" /></span>
            <div className="hover-fill" />
            <div className="shimmer" />
          </button>
          
          <button className="hero-secondary-btn rounded-full px-6 py-3.5 text-white/70 font-medium flex items-center gap-2">
            <span className="btn-text relative z-10">View Lookbook</span>
            <Play className="play-icon w-4 h-4 relative z-10" />
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute left-0 right-0 z-5"
        style={{
          bottom: 0,
          height: '280px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.9) 80%, black 100%)'
        }}
      />
    </section>
  );
}
