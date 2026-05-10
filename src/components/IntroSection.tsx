import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const badgeVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { 
    y: 0, opacity: 1, 
    transition: { type: "spring" as const, bounce: 0.4, duration: 1.2 } 
  }
};

const headlineContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const subtextContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 2.2 }
  }
};

const lineVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, x: 0, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

const logoContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 2.2 }
  }
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, scale: 1, 
    transition: { duration: 0.8, ease: "easeOut" as const } 
  }
};

interface BirdProps {
  startX: string;
  startY: string;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

const Bird = ({ startX, startY, delay, duration, size, color }: BirdProps) => {
  return (
    <motion.div
      className="absolute z-0 pointer-events-none opacity-40"
      initial={{ x: startX, y: startY }}
      animate={{
        x: [startX, `calc(${startX} + 150px)`, `calc(${startX} - 50px)`, `calc(${startX} + 250px)`],
        y: [startY, `calc(${startY} - 80px)`, `calc(${startY} + 40px)`, `calc(${startY} - 120px)`],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear"
      }}
      style={{ left: 0, top: 0 }}
    >
      <motion.svg 
        width={size} height={size} viewBox="0 0 24 24" fill={color}
        animate={{ scaleY: [1, 0.4, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <path d="M22 10.5C18 10.5 15 13 12 15C9 13 6 10.5 2 10.5C1.5 10.5 1 11 1.5 11.5C3 13 6 16 12 19C18 16 21 13 22.5 11.5C23 11 22.5 10.5 22 10.5Z" />
      </motion.svg>
    </motion.div>
  )
};

export default function IntroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [animationsDone, setAnimationsDone] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimationsDone(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const spotlightX = useTransform(springX, x => `calc(${x}px - 150vw)`);
  const spotlightY = useTransform(springY, y => `calc(${y}px - 150vh)`);

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    if (ref.current) {
      mouseX.set(ref.current.offsetWidth / 2);
      mouseY.set(ref.current.offsetHeight / 2);
    } else {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const line1 = "Clothing that feels like".split(" ");
  const line2 = "an identity, not a garment.".split(" ");

  return (
    <section ref={ref} className="bg-black py-28 md:py-36 px-6 text-center overflow-hidden relative min-h-screen flex items-center justify-center">
      
      <motion.div 
        className="absolute -inset-y-[30%] inset-x-0 z-0 pointer-events-none origin-center"
        style={{ y: yBg }}
      >
        <motion.img
          src="/intro-bg.jpg"
          alt="Intro Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <Bird startX="20%" startY="40%" size={24} color="#f43f5e" delay={0} duration={25} />
        <Bird startX="70%" startY="25%" size={16} color="#fb7185" delay={1} duration={35} />
        <Bird startX="85%" startY="60%" size={20} color="#e11d48" delay={2} duration={30} />
        <Bird startX="10%" startY="70%" size={18} color="#f43f5e" delay={0.5} duration={40} />
      </motion.div>

      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, black 0%, transparent 18%, transparent 82%, black 100%)' }} 
      />
      <div className="absolute inset-0 z-0 bg-black/30 pointer-events-none" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 bottom-0 w-[200%] opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, rgba(30,58,138,0.5) 0%, transparent 60%)' }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[20%] bottom-0 w-[200%] opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, rgba(31,41,55,0.6) 0%, transparent 70%)', left: '50%' }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute pointer-events-none"
          style={{ 
            x: spotlightX, 
            y: spotlightY,
            width: '300vw', 
            height: '300vh', 
            background: 'radial-gradient(circle 600px at center, transparent 0%, rgba(0,0,0,0.8) 100%)' 
          }} 
        />
      </div>
      
      <div className="max-w-3xl mx-auto z-10 relative flex flex-col items-center">
        
        <motion.span
          initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={badgeVariants}
          className={`section-badge ${animationsDone ? 'pulse-glow-border' : ''}`}
        >
          Worn by visionaries
        </motion.span>

        <motion.h2
          initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={headlineContainer}
          className={`text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] leading-[0.92] mt-6 ${animationsDone ? 'headline-shimmer' : 'text-white'}`}
          style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}
        >
          <span className="inline-block">
            {line1.map((word, i) => <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">{word}</motion.span>)}
          </span>
          <br className="hidden md:block" />
          <span className="inline-block mt-[0.1em] md:mt-0">
            {line2.map((word, i) => <motion.span key={i} variants={wordVariants} className="inline-block mr-[0.25em]">{word}</motion.span>)}
          </span>
        </motion.h2>

        <motion.p
          initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={subtextContainer}
          className="text-[1.05rem] text-white/72 font-light max-w-2xl mt-8 leading-relaxed"
        >
          <motion.span variants={lineVariants} className="inline-block">We craft sartorial pieces that transcend the ordinary —</motion.span>
          <br className="hidden md:block" />
          <motion.span variants={lineVariants} className="inline-block mt-[0.2em] md:mt-0">timeless, bold, and unmistakably yours.</motion.span>
        </motion.p>

        <motion.div
          initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={logoContainer}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-16 text-sm uppercase font-light text-[#9ca3af]"
        >
          {['Vogue', 'GQ', 'Ssense', 'Farfetch', 'Hypebeast', 'Highsnobiety'].map((partner) => (
            <motion.span 
              key={partner}
              variants={logoVariants}
              className="cursor-pointer tracking-widest inline-block"
              whileHover={{ 
                scale: 1.1,
                color: "#f9a8d4",
                textShadow: "0 0 8px rgba(249,168,212,0.6)",
                transition: { duration: 0.4, ease: "easeInOut" }
              }}
            >
              {partner}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-3 h-[300px] bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </section>
  );
}
