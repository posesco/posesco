import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'indigo' | 'slate';
}

const variants = {
  default: "bg-slate-800 border-slate-700 text-slate-300",
  outline: "bg-transparent border-slate-800 text-slate-400",
  indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
  slate: "bg-slate-900 border-slate-800 text-slate-400",
};

export const Badge = ({ children, className, variant = 'default' }: BadgeProps) => {
  return (
    <span className={cn(
      "px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full border transition-colors", 
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
