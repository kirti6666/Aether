import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, Sparkles, Zap, Package } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const cards = [
  {
    id: '01',
    icon: Eye,
    title: 'Menswear',
    description: 'Every piece is crafted with meticulous attention to detail. Every thread placed with intent.',
    backHeading: '₹599 OFF',
    backSub: 'on orders above ₹3000',
    backCode: 'AETHER MEN',
    buttonLabel: 'Shop Menswear'
  },
  {
    id: '02',
    icon: Sparkles,
    title: 'Womenswear',
    description: 'Sourced from the finest sustainable mills, ensuring premium quality that feels luxurious and responsible.',
    backHeading: 'Buy 2 Get 1 FREE',
    backSub: 'on any 3 pieces — Limited stock',
    backCode: '',
    buttonLabel: 'Shop Womenswear'
  },
  {
    id: '03',
    icon: Zap,
    title: 'New Arrivals',
    description: 'Exclusive seasonal drops designed for the bold. Small batches, high fidelity, always.',
    backHeading: '₹400 OFF',
    backSub: 'first order',
    backCode: 'NEWDROP',
    buttonLabel: 'See New Arrivals'
  },
  {
    id: '04',
    icon: Package,
    title: 'Shipping',
    description: 'Delivered seamlessly to your door, packaged with elegance. No shipping headaches.',
    backHeading: 'Free accessory worth ₹799',
    backSub: 'on orders above ₹2500 — Today only 🔥',
    backCode: '',
    buttonLabel: 'Grab the Deal'
  }
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-black py-28 md:py-36 px-6 overflow-hidden relative">
      <img
        src="/features-bg.jpg"
        alt="Features Background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50 pointer-events-none"
      />
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          background: 'linear-gradient(to bottom, black 0%, transparent 18%, transparent 82%, black 100%)' 
        }} 
      />
      <div className="absolute inset-0 z-0 bg-black/30 pointer-events-none" />
      
      <div ref={ref} className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <motion.div custom={0} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} className="text-center mb-14">
          <span className="section-badge">The Craft</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-white tracking-[-0.04em] leading-[0.92] mt-6" style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}>
            Tailored with beauty <br /> and comfort in balance.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto w-full">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              custom={idx + 1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group [perspective:1200px] cursor-pointer h-full"
            >
              <div className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* FRONT FACE */}
                <div 
                  className="rounded-3xl p-7 relative overflow-hidden h-full min-h-[240px] w-full flex items-center justify-center text-center [backface-visibility:hidden]"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5)'
                  }}
                >
                  <h3 
                    className="text-white text-4xl md:text-5xl tracking-[-0.02em] leading-tight"
                    style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* BACK FACE */}
                <div 
                  className="absolute inset-0 rounded-3xl p-7 overflow-hidden h-full w-full flex flex-col justify-center items-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    backdropFilter: 'blur(40px)',
                    border: '1px solid rgba(249,168,212,0.2)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5)'
                  }}
                >
                  <div className="w-10 h-10 rounded-full border border-[#f9a8d4]/30 flex items-center justify-center mb-3 text-[#f9a8d4] shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-[#f9a8d4] font-medium text-[1.15rem] mb-1.5 tracking-wide leading-tight">
                    {card.backHeading}
                  </h3>
                  <p className="text-white/70 text-[0.8rem] font-light leading-relaxed max-w-[95%] mx-auto mb-3">
                    {card.backSub}
                  </p>
                  
                  {card.backCode && (
                    <div className="bg-[#f9a8d4]/10 border border-[#f9a8d4]/30 text-[#f9a8d4] px-3 py-1 rounded-md text-[0.7rem] font-medium tracking-widest mb-3">
                      CODE: {card.backCode}
                    </div>
                  )}

                  <button className="mt-auto bg-white/5 hover:bg-[#f9a8d4] text-white hover:text-black border border-white/10 hover:border-transparent transition-colors duration-300 rounded-full px-5 py-2 text-[0.75rem] font-medium w-full">
                    {card.buttonLabel}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
