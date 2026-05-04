import { motion } from 'motion/react';
import { ReactNode, Key } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  duration?: number;
  once?: boolean;
  distance?: number;
  key?: Key;
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up', 
  className = "", 
  duration = 0.8,
  once = true,
  distance = 40
}: ScrollRevealProps) {
  const directionsInRange = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionsInRange[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      exit={{
        opacity: 0,
        ...directionsInRange[direction === 'none' ? 'none' : direction === 'up' ? 'up' : direction === 'down' ? 'down' : direction === 'left' ? 'left' : 'right']
      }}
      viewport={{ once, margin: "-100px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
