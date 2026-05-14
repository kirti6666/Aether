import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

export default function LivingBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Setup
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  
  const springConfig = { damping: 25, stiffness: 40 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], ["-10px", "10px"]);
  const bgY = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], ["-10px", "10px"]);
  
  const auroraX = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], ["-25px", "25px"]);
  const auroraY = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], ["-25px", "25px"]);
  
  const cloudX = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], ["-35px", "35px"]);
  const cloudY = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], ["-15px", "15px"]);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Shooting Star Setup
  const [stars, setStars] = useState<{ id: number, top: string, left: string, duration: number }[]>([]);
  
  useEffect(() => {
    const spawnStar = () => {
      const newStar = {
        id: Date.now(),
        top: `${Math.random() * 40}%`,
        left: `${Math.random() * 60 + 20}%`,
        duration: Math.random() * 0.5 + 1
      };
      setStars(prev => [...prev, newStar]);
      
      setTimeout(() => {
        setStars(prev => prev.filter(s => s.id !== newStar.id));
      }, 2000);
    };

    const interval = setInterval(() => {
      spawnStar();
    }, Math.random() * 4000 + 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
      
      {/* 0. Base Video with subtle parallax */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute -inset-10">
        <video
          src="/upscaled-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
      </motion.div>

      {/* 1. Aurora / Northern Lights - Removed per user request */}

      {/* 3. Drifting Clouds */}
      <motion.div style={{ x: cloudX, y: cloudY }} className="absolute inset-0 opacity-40">
        <div className="drifting-cloud cloud-layer-1" />
        <div className="drifting-cloud cloud-layer-2" />
      </motion.div>

      {/* 4. God Rays */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
        <div className="god-rays" />
      </div>

      {/* 5. Waterfall Mist */}
      <div className="absolute bottom-0 right-[20%] w-[400px] h-[300px] pointer-events-none mix-blend-screen opacity-50">
        <div className="waterfall-mist" />
      </div>

      {/* 6. Shooting Stars */}
      {stars.map(star => (
        <div 
          key={star.id} 
          className="shooting-star" 
          style={{ top: star.top, left: star.left, animationDuration: `${star.duration}s` }} 
        />
      ))}

      {/* 2. Floating Particles (Integrated into LivingBackground so it inherits the scene depth) */}
      <div className="absolute inset-0 z-10">
        <ParticleCanvas />
      </div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 z-20 bg-black/10 pointer-events-none" />
    </div>
  );
}
