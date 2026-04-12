import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { Badge } from "./Badge";
import { cn } from "../../lib/utils";

interface SkillCardProps {
  title: string;
  icon: any;
  skills: string[];
  className?: string;
}

export const SkillCard = ({ title, icon: Icon, skills, className }: SkillCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlightBg = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(99, 102, 241, 0.15),
      transparent 80%
    )
  `;

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "glass-panel p-6 rounded-2xl group cursor-default relative",
        className
      )}
    >
      {/* Interactive Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlightBg }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
            <Icon size={24} />
          </div>
          <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge 
              key={skill} 
              variant="slate" 
              className="bg-slate-900/40 border-white/5 group-hover:border-indigo-500/30 transition-colors"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
