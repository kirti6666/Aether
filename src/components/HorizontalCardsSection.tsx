import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const cardsData = [
  {
    num: "01",
    title: "The Vision",
    body: "Born from darkness, built for those who dare to stand apart",
    bgShift: "#0d1117",
    button: "Shop Now →",
    image: "/card1.png"
  },
  {
    num: "02",
    title: "Collections",
    body: "Seasonal drops crafted for the bold. Limited. Intentional. Yours",
    bgShift: "#0d1a0f",
    button: "Shop Now →",
    image: "/card2.png"
  },
  {
    num: "03",
    title: "Craftsmanship",
    body: "Every stitch deliberate. Every fabric chosen. Nothing accidental",
    bgShift: "#1a0d0d",
    button: "Shop Now →",
    image: "/card3.png"
  },
  {
    num: "04",
    title: "The Experience",
    body: "Unbox a feeling. Wear a statement. Own the room",
    bgShift: "#0f0d1a",
    button: "Shop Now →",
    image: "/card4.png"
  },
  {
    num: "05",
    title: "Own Aether",
    body: "Limited drops. No restocks. Once its gone, its gone forever",
    bgShift: "#111111",
    button: "Shop Now →",
    image: "/card5.png"
  }
];

export default function HorizontalCardsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % cardsData.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getRelativeOffset = (index: number) => {
    let offset = (index - activeIndex + cardsData.length) % cardsData.length;
    if (offset === 4) offset = -1;
    if (offset === 3) offset = -2;
    return offset;
  };

  const getCardStyle = (offset: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const xOffset = isMobile ? 180 : 340; // Tighter spacing on mobile
    
    if (offset === 0) {
      return {
        x: 0,
        z: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
        width: 380, // Reduced from 480
        height: 500, // Reduced from 580
      };
    } else if (offset === 1) {
      return {
        x: xOffset,
        z: -100,
        rotateY: -8,
        scale: 0.85,
        opacity: 0.45,
        zIndex: 5,
        width: 300, // Reduced from 320
        height: 420, // Reduced from 460
      };
    } else if (offset === -1) {
      return {
        x: -xOffset,
        z: -100,
        rotateY: 8,
        scale: 0.85,
        opacity: 0.45,
        zIndex: 5,
        width: 300,
        height: 420,
      };
    } else {
      return {
        x: offset > 0 ? xOffset * 2 : -xOffset * 2,
        z: -200,
        rotateY: 0,
        scale: 0.5,
        opacity: 0,
        zIndex: 0,
        width: 300,
        height: 420,
      };
    }
  };

  return (
    <motion.section
      className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden py-24"
      animate={{ backgroundColor: cardsData[activeIndex].bgShift }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="text-center z-20 w-full px-6 flex-shrink-0 mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] leading-[1.1] text-white" style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>
          The World of Aether
        </h2>
        <p className="mt-4 text-[#9ca3af] text-apple-label">
          You imagine it, We shape it
        </p>
      </div>

      <div className="relative w-full h-[550px] flex items-center justify-center" style={{ perspective: '1200px' }}>
        <AnimatePresence initial={false}>
          {cardsData.map((card, index) => {
            const offset = getRelativeOffset(index);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            return (
              <motion.div
                key={card.num}
                className="absolute flex flex-col items-start text-left overflow-hidden origin-center"
                style={{
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  cursor: !isCenter && isVisible ? 'pointer' : 'default',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, width, height, opacity'
                }}
                initial={false}
                animate={getCardStyle(offset)}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                whileHover={!isCenter && isVisible ? { opacity: 0.7, scale: 0.88 } : {}}
                onClick={() => {
                  if (offset === 1) handleNext();
                  if (offset === -1) handlePrev();
                }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset: dragOffset }) => {
                  if (dragOffset.x < -50) handleNext();
                  else if (dragOffset.x > 50) handlePrev();
                }}
              >
                {/* Image Holder */}
                <div className="w-full aspect-square bg-white/5 relative overflow-hidden flex-shrink-0 border-b border-white/5">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  {/* Dark overlay for side cards */}
                  <motion.div 
                    className="absolute inset-0 bg-black pointer-events-none"
                    animate={{ opacity: isCenter ? 0 : 0.6 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Large Faint Number */}
                <div className="absolute bottom-4 right-4 pointer-events-none select-none text-[#111] leading-none tracking-tighter z-0" style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}>
                  <span style={{ fontSize: isCenter ? '6rem' : '4rem', opacity: 0.15, color: '#fff', transition: 'font-size 0.5s ease' }}>
                    {card.num}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-start w-[75%] p-4 md:p-5 flex-1 justify-center">
                  <div className="w-full">
                    <h3 className="text-white text-apple-h3 mb-1 flex overflow-hidden">
                      {card.title.split("").map((char, charIndex) => (
                        <motion.span
                          key={charIndex}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: isCenter ? 0 : 20, opacity: isCenter ? 1 : 0 }}
                          transition={{ duration: 0.4, delay: charIndex * 0.04, ease: "easeOut" }}
                          style={{ display: "inline-block" }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </h3>

                    <motion.p 
                      className="text-[#9ca3af] text-[15px] leading-[1.6] font-normal line-clamp-2 mt-2"
                      animate={{ opacity: isCenter ? 1 : 0.6 }}
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {card.body}
                    </motion.p>
                  </div>

                  {card.button && (
                    <motion.button 
                      className="mt-1 text-[#f9a8d4] text-[11px] tracking-wider uppercase font-medium hover:text-white transition-colors duration-300"
                      animate={{ opacity: isCenter ? 1 : 0 }}
                    >
                      {card.button}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation UI */}
      <div className="relative flex flex-col items-center gap-8 w-full px-6 z-20 mt-12">
        {/* Arrows (Desktop positioned on sides) */}
        <div className="absolute w-full max-w-[1000px] flex justify-between px-4 md:px-12 top-1/2 -translate-y-1/2 pointer-events-none" style={{ top: '-300px' }}>
          <button 
            onClick={handlePrev}
            className="pointer-events-auto p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6 text-[#f9a8d4] group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={handleNext}
            className="pointer-events-auto p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 group backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6 text-[#f9a8d4] group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-3">
          {cardsData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-[#f9a8d4]' : 'w-2 bg-gray-600 hover:bg-gray-400'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
