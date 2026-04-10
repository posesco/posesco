import React from "react";
import { motion } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  className?: string;
  viewportOnce?: boolean;
}

export const Reveal = ({ 
  children, 
  delay = 0, 
  y = 20, 
  x = 0, 
  scale = 1,
  duration = 0.5,
  className,
  viewportOnce = true
}: RevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: viewportOnce }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
