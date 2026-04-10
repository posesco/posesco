import React from "react";
import { motion } from "motion/react";
import { Badge } from "./Badge";
import { cn } from "../../lib/utils";

interface SkillCardProps {
  title: string;
  icon: any;
  skills: string[];
  className?: string;
}

export const SkillCard = ({ title, icon: Icon, skills, className }: SkillCardProps) => (
  <motion.div 
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={cn("glass-panel p-6 rounded-2xl group", className)}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold tracking-tight">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Badge key={skill} variant="slate" className="group-hover:border-indigo-500/30 transition-colors">
          {skill}
        </Badge>
      ))}
    </div>
  </motion.div>
);
