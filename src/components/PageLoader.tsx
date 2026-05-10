import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 9999, pointerEvents: 'none' }}
        />
      )}
    </AnimatePresence>
  );
}
