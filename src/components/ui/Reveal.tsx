import React from "react";
import { motion, Variants } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  blur?: boolean;
  duration?: number;
  className?: string;
  viewportOnce?: boolean;
  staggerChildren?: number;
}

export const Reveal = ({ 
  children, 
  delay = 0, 
  y = 20, 
  x = 0, 
  scale = 1,
  rotate = 0,
  blur = false,
  duration = 0.6,
  className,
  viewportOnce = true,
  staggerChildren
}: RevealProps) => {
  const variants: Variants = {
    hidden: { 
      opacity: 0, 
      y, 
      x, 
      scale, 
      rotate,
      filter: blur ? "blur(10px)" : "blur(0px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1, 
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1], // Custom fluid ease
        staggerChildren: staggerChildren,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Wrapper for staggered list items
export const RevealItem = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
