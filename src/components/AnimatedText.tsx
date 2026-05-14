import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type AnimatedTextProps = {
  text: string;
  type?: 'heading' | 'paragraph' | 'cardTitle';
  className?: string;
  as?: React.ElementType;
};

export default function AnimatedText({ text, type = 'paragraph', className = '', as: Component = 'p' }: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  if (type === 'heading') {
    return (
      <Component ref={ref} className={className} style={{ overflow: 'hidden' }}>
        <motion.span
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          {text}
        </motion.span>
      </Component>
    );
  }

  if (type === 'paragraph') {
    return (
      <Component ref={ref} className={className}>
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          {text}
        </motion.span>
      </Component>
    );
  }

  if (type === 'cardTitle') {
    const letters = text.split("");
    return (
      <Component ref={ref} className={className}>
        {letters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.04 }}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </Component>
    );
  }

  return <Component className={className}>{text}</Component>;
}
